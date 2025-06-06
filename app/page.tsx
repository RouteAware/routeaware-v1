'use client';

import React, { useState } from 'react';
import Map from './components/Map';
import Footer from './components/Footer'; // Header removed

export default function Home() {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');
  const [trafficDelay, setTrafficDelay] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRouteSummary = (distance: string, duration: string, traffic?: string) => {
  setDistance(distance);
  setDuration(duration);
  setTrafficDelay(traffic || '');
  setError('');
};

  const handleReset = () => {
    setOrigin('');
    setDestination('');
    setDistance('');
    setDuration('');
    setTrafficDelay('');
    setError('');
  };

  return (
    <>
      <main className="min-h-screen bg-gray-100 text-gray-900 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Map Tile */}
          <div className="bg-white shadow-lg rounded-2xl p-4">
            <h2 className="text-xl font-semibold mb-2">Map</h2>
            <Map origin={origin} destination={destination} onSummaryUpdate={handleRouteSummary} />
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
              onClick={() => {
                if (!origin || !destination) {
                  setError('Please enter both origin and destination.');
                  return;
                }
                setLoading(true);
                setDistance('');
                setDuration('');
                setTrafficDelay('');
                setError('');
                setTimeout(() => setLoading(false), 1000); // simulate loading
              }}
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 rounded-lg mb-2"
            >
              {loading ? 'Checking Route…' : 'Check Route'}
            </button>

            <button
              onClick={handleReset}
              className="w-full bg-gray-300 text-gray-800 py-2 rounded-lg hover:bg-gray-400 transition"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Route Summary */}
        <div className="bg-white shadow-lg rounded-2xl p-4 mt-6">
          <h2 className="text-xl font-semibold mb-2">Route Summary</h2>

          {error && (
            <div className="bg-red-100 text-red-800 p-3 rounded mb-2">{error}</div>
          )}

          {distance && duration && (
            <div>
              <p>
                <strong>Distance:</strong> {distance}
              </p>
              <p>
                <strong>Estimated Time:</strong> {duration}
              </p>
              {trafficDelay && (
                <p>
                  <strong>Time with Traffic:</strong> {trafficDelay}
                </p>
              )}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}