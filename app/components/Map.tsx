'use client';

import React, { useEffect, useState } from 'react';
import { GoogleMap, useLoadScript, DirectionsRenderer } from '@react-google-maps/api';

interface MapProps {
  origin: string;
  destination: string;
}

const containerStyle = {
  width: '100%',
  height: '300px',
};

// Default center: continental US
const defaultCenter = {
  lat: 39.5,
  lng: -98.35,
};

const Map: React.FC<MapProps> = ({ origin, destination }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
  });

  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);

  useEffect(() => {
    if (!isLoaded || !origin || !destination) {
      setDirections(null); // Reset if incomplete inputs
      return;
    }

    const directionsService = new google.maps.DirectionsService();
    directionsService.route(
      {
        origin,
        destination,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === 'OK' && result) {
          setDirections(result);
        } else {
          console.error('Directions request failed:', status);
          setDirections(null); // Clear on error
        }
      }
    );
  }, [isLoaded, origin, destination]);

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
        center={directions ? undefined : defaultCenter}
        zoom={4}
        options={{
          disableDefaultUI: true,
          zoomControl: true,
        }}
      >
        {directions && <DirectionsRenderer directions={directions} />}
      </GoogleMap>
    </div>
  );
};

export default Map;