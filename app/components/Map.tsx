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
  showWeather?: boolean;
  onSummaryUpdate: (distance: string, duration: string, trafficDelay?: string) => void;
}

const containerStyle = {
  width: '100%',
  height: '300px',
};

const center = { lat: 39.5, lng: -98.35 }; // Center of USA

const Map: React.FC<MapProps> = ({ origin, destination, showTraffic, showWeather, onSummaryUpdate }) => {
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
        {showTraffic && <TrafficLayer />}
        {showWeather && (
          <div
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              top: 0,
              left: 0,
              pointerEvents: 'none',
              backgroundImage:
                'url(https://tile.openweathermap.org/map/precipitation_new/4/4/6.png?appid=184c3501ef5981b79c0c15c52146fef2)',
              backgroundSize: 'cover',
              opacity: 0.4,
            }}
          />
        )}
        {directions && <DirectionsRenderer directions={directions} />}
      </GoogleMap>
    </div>
  );
};

export default Map;