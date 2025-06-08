'use client';

import React from 'react';
import { GoogleMap, Marker, InfoWindow, useJsApiLoader } from '@react-google-maps/api';

type Props = {
  flight: {
    icao24: string;
    callsign: string | null;
    latitude: number;
    longitude: number;
    origin_country: string;
    velocity?: number | null;
    true_track?: number | null;
  };
};

const containerStyle = {
  width: '100%',
  height: '400px',
};

export default function AirCargoMap({ flight }: Props) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!, // ✅ Ensure this is in .env
  });

  if (!isLoaded || !flight.latitude || !flight.longitude) return null;

  const position = { lat: flight.latitude, lng: flight.longitude };

  return (
    <GoogleMap mapContainerStyle={containerStyle} center={position} zoom={6}>
      <Marker position={position}>
        <InfoWindow position={position}>
          <div className="text-sm">
            <p><strong>{flight.callsign ?? 'Unknown Flight'}</strong></p>
            <p>From: {flight.origin_country}</p>
            {flight.velocity && <p>Speed: {Math.round(flight.velocity)} m/s</p>}
            {flight.true_track && <p>Heading: {Math.round(flight.true_track)}°</p>}
          </div>
        </InfoWindow>
      </Marker>
    </GoogleMap>
  );
}