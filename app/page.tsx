'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import Footer from './components/Footer';
import { calculateETA } from './utils/calculateETA';

const Map = dynamic(() => import('./components/Map'), { ssr: false });

export default function Home() {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');
  const [trafficDelay, setTrafficDelay] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showTraffic, setShowTraffic] = useState(true);
  const [showWeather, setShowWeather] = useState(false);
  const [weatherLayer, setWeatherLayer] = useState('precipitation_new');
  const [weatherOpacity, setWeatherOpacity] = useState(0.5);
  const [pickupTime, setPickupTime] = useState('');
  const [pickupDate, setPickupDate] = useState('');
  const [dailyMiles, setDailyMiles] = useState('');
  const [estimatedArrival, setEstimatedArrival] = useState('');

  const handleRouteSummary = (distance: string, duration: string, traffic?: string) => {
    setDistance(distance);
    setDuration(duration);
    setTrafficDelay(traffic || '');
    setError('');

    const eta = calculateETA(distance, pickupDate, pickupTime, dailyMiles);
    setEstimatedArrival(eta);
  };

  const handleReset = () => {
    setOrigin('');
    setDestination('');
    setDistance('');
    setDuration('');
    setTrafficDelay('');
    setPickupTime('');
    setPickupDate('');
    setDailyMiles('');
    setEstimatedArrival('');
    setError('');
  };

  return (
    <>
      <main className="min-h-screen bg-gray-100 text-gray-900 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Map Tile */}
          <div className="bg-white shadow-lg rounded-2xl p-4">
            <h2 className="text-xl font-semibold mb-2">Map</h2>

            {/* Layer Toggles */}
            <div className="flex flex-wrap gap-4 mb-3">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={showTraffic}
                  onChange={() => setShowTraffic(!showTraffic)}
                />
                <span>Show Traffic</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={showWeather}
                  onChange={() => setShowWeather(!showWeather)}
                />
                <span>Show Weather</span>
              </label>
              {showWeather && (
                <div className="flex flex-wrap gap-2">
                  <select
                    className="px-2 py-1 border border-gray-300 rounded"
                    value={weatherLayer}
                    onChange={(e) => setWeatherLayer(e.target.value)}
                  >
                    <option value="precipitation_new">Precipitation</option>
                    <option value="clouds_new">Clouds</option>
                    <option value="temp_new">Temperature</option>
                    <option value="wind_new">Wind</option>
                  </select>
                  <select
                    className="px-2 py-1 border border-gray-300 rounded"
                    value={weatherOpacity}
                    onChange={(e) => setWeatherOpacity(parseFloat(e.target.value))}
                  >
                    <option value="0.3">Low</option>
                    <option value="0.5">Medium</option>
                    <option value="0.8">High</option>
                  </select>
                </div>
              )}
            </div>

            <Map
              origin={origin}
              destination={destination}
              onSummaryUpdate={handleRouteSummary}
              showTraffic={showTraffic}
              showWeather={showWeather}
              weatherLayer={weatherLayer}
              weatherOpacity={weatherOpacity}
            />
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
            <input
              type="date"
              value={pickupDate}
              onChange={(e) => setPickupDate(e.target.value)}
              className="w-full mb-2 px-3 py-2 border border-gray-300 rounded-lg"
            />
            <input
              type="time"
              value={pickupTime}
              onChange={(e) => setPickupTime(e.target.value)}
              className="w-full mb-2 px-3 py-2 border border-gray-300 rounded-lg"
            />
            <input
              type="number"
              placeholder="Daily Mileage (e.g., 600)"
              value={dailyMiles}
              onChange={(e) => setDailyMiles(e.target.value)}
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
                setEstimatedArrival('');
                setError('');
                setTimeout(() => setLoading(false), 1000);
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
            <div className="space-y-1">
              <p><strong>Distance:</strong> {distance}</p>
              <p><strong>Estimated Time:</strong> {duration}</p>
              {trafficDelay && <p><strong>Time with Traffic:</strong> {trafficDelay}</p>}
              {estimatedArrival && <p><strong>Estimated Arrival:</strong> {estimatedArrival}</p>}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}