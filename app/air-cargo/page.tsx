'use client';

import React, { useState } from 'react';

type FlightData = {
  icao24: string;
  firstSeen: number;
  estDepartureAirport: string | null;
  lastSeen: number;
  estArrivalAirport: string | null;
  callsign: string | null;
};

export default function AirCargoPage() {
  const [flightNum, setFlightNum] = useState<string>('');
  const [flights, setFlights] = useState<FlightData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const searchFlight = async (): Promise<void> => {
    if (!flightNum.trim()) return;

    setLoading(true);
    setError('');
    setFlights([]);

    try {
      const res = await fetch(`/api/flight?flight=${encodeURIComponent(flightNum.trim())}`);
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Unknown error');

      setFlights(data.flights ?? []);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Failed to fetch flight data';
      console.error('Flight fetch error:', message);
      setError(message);
    } finally {
      setLoading(false);
    }
  };

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

      {flights.length > 0 ? (
        <div className="space-y-4">
          {flights.map((f, i) => (
            <div
              key={`${f.icao24}-${f.firstSeen}-${i}`}
              className="border border-gray-200 p-4 rounded-xl bg-gray-50"
            >
              <h2 className="font-semibold text-blue-800 mb-1">
                {f.callsign ?? 'Unknown Flight'}
              </h2>
              <p className="text-sm text-gray-600">
                From ICAO: <strong>{f.estDepartureAirport ?? 'N/A'}</strong> → To ICAO:{' '}
                <strong>{f.estArrivalAirport ?? 'N/A'}</strong>
              </p>
              <p className="text-sm text-gray-600">
                Departure:{' '}
                {f.firstSeen
                  ? new Date(f.firstSeen * 1000).toLocaleString()
                  : 'N/A'}
              </p>
              <p className="text-sm text-gray-600">
                Arrival:{' '}
                {f.lastSeen
                  ? new Date(f.lastSeen * 1000).toLocaleString()
                  : 'N/A'}
              </p>
            </div>
          ))}
        </div>
      ) : (
        !loading &&
        !error && <p className="text-gray-500">No recent flight history found.</p>
      )}
    </div>
  );
}