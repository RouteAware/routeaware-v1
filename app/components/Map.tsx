'use client';

import React, { useEffect, useRef, useState } from 'react';
import {
  GoogleMap,
  useJsApiLoader,
  DirectionsRenderer,
  TrafficLayer,
} from '@react-google-maps/api';

interface MapProps {
  origin: string;
  destination: string;
  showTraffic?: boolean;
  onSummaryUpdate: (distance: string, duration: string, trafficDelay?: string) => void;
}

const containerStyle = {
  width: '100%',
  height: '300px',
};

const center = { lat: 39.5, lng: -98.35 }; // Center of USA

const Map: React.FC<MapProps> = ({ origin, destination, showTraffic = false, onSummaryUpdate }) => {
  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);
  const mapRef = useRef<google.maps.Map | null>(null);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
    libraries: ['places'],
  });

  useEffect(() => {
    if (!isLoaded || !origin || !destination) return;

    const directionsService = new google.maps.DirectionsService();

    directionsService.route(
      {
        origin,
        destination,
        travelMode: google.maps.TravelMode.DRIVING,
        drivingOptions: {
          departureTime: new Date(),
          trafficModel: google.maps.TrafficModel.BEST_GUESS,
        },
        provideRouteAlternatives: false,
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK && result) {
          setDirections(result);

          const leg = result.routes[0].legs[0];
          const distanceText = leg.distance?.text || '';
          const durationText = leg.duration?.text || '';
          const trafficText = leg.duration_in_traffic?.text || '';

          onSummaryUpdate(distanceText, durationText, trafficText);
        } else {
          setDirections(null);
          onSummaryUpdate('', '', '');
        }
      }
    );
  }, [isLoaded, origin, destination, onSummaryUpdate]);

  const handleLoad = (map: google.maps.Map) => {
    mapRef.current = map;
  };

  if (loadError) {
    return <div className="bg-red-100 text-red-800 p-4 rounded">Error loading map</div>;
  }

  if (!isLoaded) {
    return (
      <div className="bg-gray-200 h-[300px] flex items-center justify-center rounded-xl">
        Loading map…
      </div>
    );
  }

  return (
    <div className="w-full h-[300px] bg-gray-200 rounded-xl overflow-hidden">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={4}
        onLoad={handleLoad}
        options={{ disableDefaultUI: true, zoomControl: true }}
      >
        {directions && <DirectionsRenderer directions={directions} />}
        {showTraffic && <TrafficLayer />}
      </GoogleMap>
    </div>
  );
};

export default Map;