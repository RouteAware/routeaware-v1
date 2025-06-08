'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { GoogleMap, Marker, InfoWindow, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px',
};

type FlightState = [
  string,                 // 0: icao24
  string | null,          // 1: callsign
  string,                 // 2: origin_country
  number | null,          // 3: time_position
  number,                 // 4: last_contact
  number | null,          // 5: longitude
  number | null,          // 6: latitude
  number | null,          // 7: baro_altitude
  boolean,                // 8: on_ground
  number | null,          // 9: velocity
  number | null,          // 10: true_track
  number | null,          // 11: vertical_rate
  number[] | null,        // 12: sensors
  number | null,          // 13: geo_altitude
  string | null,          // 14: squawk
  boolean,                // 15: spi
  number                  // 16: position_source
];

type FlightData = {
  icao24: string;
  callsign: string | null;
  origin_country: string;
  time_position: number | null;
  last_contact: number;
  longitude: number | null;
  latitude: number | null;
  baro_altitude: number | null;
  on_ground: boolean;
  velocity: number | null;
  true_track?: number | null;
};

export default function AirCargoPage() {
  const [flightNum, setFlightNum] = useState<string>('');
  const [flight, setFlight] = useState<FlightData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  });

  const searchFlight = useCallback(async (): Promise<void> => {
    if (!flightNum.trim()) return;

    setLoading(true);
    setError('');
    setFlight(null);

    try {
      const res = await fetch(`/api/flight?flight=${encodeURIComponent(flightNum.trim())}`);
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Unknown error');

      const firstMatch = (data.flights ?? []).find(
        (f: FlightState) => f[1]?.toUpperCase().includes(flightNum.trim().toUpperCase())
      );

      if (!firstMatch) throw new Error('No matching flights found.');

      setFlight({
        icao24: firstMatch[0],
        callsign: firstMatch[1],
        origin_country: firstMatch[2],
        time_position: firstMatch[3],
        last_contact: firstMatch[4],
        longitude: firstMatch[5],
        latitude: firstMatch[6],
        baro_altitude: firstMatch[7],
        on_ground: firstMatch[8],
        velocity: firstMatch[9],
        true_track: firstMatch[10],
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch flight data';
      console.error('Flight fetch error:', message);
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [flightNum]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (flightNum.trim()) searchFlight();
    }, 30000);
    return () => clearInterval(interval);
  }, [flightNum, searchFlight]);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg">
      <h1 className="text-2xl font-bold text-blue-700 mb-4">✈️ Air Cargo Tracker</h1>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
        <input
          value={flightNum}
          onChange={(e) => setFlightNum(e.target.value)}
          placeholder="Enter flight number (e.g. AAL123)"
          className="border border-gray-300 rounded-lg px-4 py-2 w-full sm:w-64"
        />
        <button
          onClick={searchFlight}
          disabled={loading}
          className="bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition disabled:opacity-50"
        >
          {loading ? 'Searching…' : 'Track Flight'}
        </button>
      </div>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      {isLoaded && flight && flight.latitude && flight.longitude ? (
        <div className="space-y-4">
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={{ lat: flight.latitude, lng: flight.longitude }}
            zoom={6}
          >
            <Marker position={{ lat: flight.latitude, lng: flight.longitude }}>
              <InfoWindow position={{ lat: flight.latitude, lng: flight.longitude }}>
                <div className="text-sm">
                  <p><strong>{flight.callsign ?? 'Unknown Flight'}</strong></p>
                  <p>From: {flight.origin_country}</p>
                  {flight.velocity && <p>Speed: {Math.round(flight.velocity)} m/s</p>}
                  {flight.true_track && <p>Heading: {Math.round(flight.true_track)}°</p>}
                </div>
              </InfoWindow>
            </Marker>
          </GoogleMap>

          <div className="border border-gray-200 p-4 rounded-xl bg-gray-50">
            <h2 className="font-semibold text-blue-800 mb-1">
              {flight.callsign ?? 'Unknown Flight'}
            </h2>
            <p className="text-sm text-gray-600">
              From: <strong>{flight.origin_country}</strong>
            </p>
            <p className="text-sm text-gray-600">
              Last Seen:{' '}
              {flight.last_contact
                ? new Date(flight.last_contact * 1000).toLocaleString()
                : 'N/A'}
            </p>
            <p className="text-sm text-gray-600">
              Altitude: {flight.baro_altitude ? `${Math.round(flight.baro_altitude)} m` : 'N/A'}
            </p>
            <p className="text-sm text-gray-600">
              Velocity: {flight.velocity ? `${Math.round(flight.velocity)} m/s` : 'N/A'}
            </p>
            <p className="text-sm text-gray-600">
              On Ground: {flight.on_ground ? 'Yes' : 'No'}
            </p>
          </div>
        </div>
      ) : (
        !loading && !error && <p className="text-gray-500">No recent flight data found.</p>
      )}
    </div>
  );
}