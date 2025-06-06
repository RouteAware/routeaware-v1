'use client';

import React, { useEffect, useRef } from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

interface MapProps {
  origin: string;
  destination: string;
  onSummaryUpdate: (distance: string, duration: string) => void;
}

const containerStyle = {
  width: '100%',
  height: '300px',
};

const center = { lat: 39.5, lng: -98.35 }; // Default center of US

const Map: React.FC<MapProps> = ({ origin, destination, onSummaryUpdate }) => {
  const mapRef = useRef<google.maps.Map | null>(null);
  const directionsRendererRef = useRef<google.maps.DirectionsRenderer | null>(null);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyBVuvZK_WD_Qxxm-OOvqnJkfN1SzDpz8Do',
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
      },
      (result, status) => {
        if (status === 'OK' && result) {
          if (directionsRendererRef.current) {
            directionsRendererRef.current.setDirections(result);
          }

          const leg = result.routes[0].legs[0];
          onSummaryUpdate(leg.distance?.text || '', leg.duration?.text || '');
        } else {
          onSummaryUpdate('', '');
        }
      }
    );
  }, [isLoaded, origin, destination, onSummaryUpdate]);

  const handleLoad = (map: google.maps.Map) => {
    mapRef.current = map;
    directionsRendererRef.current = new google.maps.DirectionsRenderer();
    directionsRendererRef.current.setMap(map);
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
        options={{
          disableDefaultUI: true,
          zoomControl: true,
        }}
      />
    </div>
  );
};

export default Map;