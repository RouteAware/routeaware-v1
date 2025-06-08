'use client';

import React, { ReactNode } from 'react';
import { useJsApiLoader } from '@react-google-maps/api';

export function MapProvider({ children }: { children: ReactNode }) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries: ['places'], // only call this ONCE app-wide
    version: 'weekly',
  });

  if (!isLoaded) {
    return (
      <div className="text-center py-10 text-gray-500">
        Loading Google Maps…
      </div>
    );
  }

  return <>{children}</>;
}