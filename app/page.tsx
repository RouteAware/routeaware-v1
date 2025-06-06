'use client';

import React, { useState } from 'react';
import Map from './components/Map';

export default function Home() {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const getRouteSummary = async () => {
    setLoading(true);
    setError('');
    setDistance('');
    setDuration('');

    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${encodeURIComponent(
          origin
        )}&destination=${encodeURIComponent(
          destination
        )}&key=AIzaSyBVuvZK_WD_Qxxm-OOvqnJkfN1SzDpz8Do`
      );

      const data = await response.json();

      if (data.status === 'OK') {
        const leg = data.routes[0].legs[0];
        setDistance(leg.distance.text);
        setDuration(leg.duration.text);
      } else {
        setError(`Google Directions API error: ${data.status}`);
      }
    } catch {
      setError('Error fetching route. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 text-gray-900 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">RouteAware Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Map Tile */}
        <div className="bg-white shadow-lg rounded-2xl p-4">
          <h2 className="text-xl font-semibold mb-2">Map</h2>
          <Map origin={origin} destination={destination} />
        </div>

        {/* Input Tile */}
        <div className="bg-white shadow-lg rounded-2xl p-4">
          <h2 className="text-xl font-semibold mb-2">Route Input</h2>
          <input
            type="text"
            placeholder="Origin Address"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            className="w-full mb-2 px-3 py-2 border border-gray-300 rounded-lg"
          />
          <input
            type="text"
            placeholder="Destination Address"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="w-full mb-2 px-3 py-2 border border-gray-300 rounded-lg"
          />
          <button
            onClick={getRouteSummary}
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg"
          >
            {loading ? 'Checking Route…' : 'Check Route'}
          </button>
        </div>
      </div>

      {/* Route Summary */}
      <div className="bg-white shadow-lg rounded-2xl p-4 mt-6">
        <h2 className="text-xl font-semibold mb-2">Route Summary</h2>

        {error && (
          <div className="bg-red-100 text-red-800 p-3 rounded mb-2">{error}</div>
        )}

        {distance && duration ? (
          <div>
            <p>
              <strong>Distance:</strong> {distance}
            </p>
            <p>
              <strong>Estimated Time:</strong> {duration}
            </p>
          </div>
        ) : (
          <span className="inline-block bg-yellow-200 text-yellow-900 text-sm px-3 py-1 rounded-full">
            Coming Soon
          </span>
        )}
      </div>
    </main>
  );
}