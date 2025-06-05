'use client';

import React from 'react';
import { GoogleMap, useLoadScript } from '@react-google-maps/api';

// Centered on continental U.S.
const center = { lat: 39.5, lng: -98.35 };

// Style for the map container
const containerStyle = {
  width: '100%',
  height: '300px',
};

const Map = () => {
  // Load Google Maps JS API with your key from .env
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
  });

  // Show an error if loading fails
  if (loadError) {
    return <div className="bg-red-100 text-red-800 p-4 rounded">Error loading map</div>;
  }

  // Show a loading state while the map is initializing
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
        options={{
          disableDefaultUI: true, // Hide map controls
          zoomControl: true,      // But keep zoom buttons
        }}
      >
        {/* Map is loaded — ready for directions rendering next */}
      </GoogleMap>
    </div>
  );
};

export default Map;