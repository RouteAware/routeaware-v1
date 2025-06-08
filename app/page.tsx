'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { calculateETA } from './utils/calculateETA';
import { RouteWeatherAdvisory } from './utils/fetchBoundingBoxAlerts';

const Map = dynamic(() => import('./components/Map'), { ssr: false });

export default function Home() {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');
  const [trafficDelay, setTrafficDelay] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Phase 1
  const [showTraffic, setShowTraffic] = useState(false); // Step 1/5: default off
  const [showWeather, setShowWeather] = useState(false);
  const [weatherLayer, setWeatherLayer] = useState('precipitation_new');
  const [weatherOpacity, setWeatherOpacity] = useState(0.5);

  // Phase 1 inputs
  const [pickupDate, setPickupDate] = useState('');
  const [pickupTime, setPickupTime] = useState('');
  const departureTime = pickupDate && pickupTime ? new Date(`${pickupDate}T${pickupTime}`) : undefined;

  // Phase 2
  const [deliveryDate, setDeliveryDate] = useState(''); // Step 2/5
  const [dailyMiles, setDailyMiles] = useState('');

  // Phase 1.5
  const [use24Hour, setUse24Hour] = useState(false); // Step 4/5

  // Summary & alerts
  const [estimatedArrival, setEstimatedArrival] = useState('');
  const [weatherAlerts, setWeatherAlerts] = useState<RouteWeatherAdvisory[]>([]);

  const handleRouteSummary = (dist: string, dur: string, traffic?: string) => {
    setDistance(dist);
    setDuration(dur);
    setTrafficDelay(traffic || '');
    setError('');

    const eta = calculateETA(dist, pickupDate, pickupTime, dailyMiles, use24Hour);
    setEstimatedArrival(eta);
  };

  const handleReset = () => {
    setOrigin('');
    setDestination('');
    setDistance('');
    setDuration('');
    setTrafficDelay('');
    setPickupDate('');
    setPickupTime('');
    setDeliveryDate('');
    setDailyMiles('');
    setUse24Hour(false);
    setEstimatedArrival('');
    setWeatherAlerts([]);
    setError('');
    setLoading(false);
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

              {/* 24-hour toggle */}
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={use24Hour}
                  onChange={() => setUse24Hour(!use24Hour)}
                />
                <span>Use 24-hour format</span>
              </label>
            </div>

            <Map
              origin={origin}
              destination={destination}
              departureTime={departureTime}
              showTraffic={showTraffic}
              showWeather={showWeather}
              weatherLayer={weatherLayer}
              weatherOpacity={weatherOpacity}
              onSummaryUpdate={handleRouteSummary}
              onAlertsUpdate={(alerts) => setWeatherAlerts(alerts)}
            />
          </div>

          {/* Input Tile */}
          <div className="bg-white shadow-lg rounded-2xl p-4">
            <h2 className="text-xl font-semibold mb-2">Route Input</h2>
            <label htmlFor="origin" className="block mb-1 font-medium">
              Origin Address:
            </label>
            <input
              id="origin"
              type="text"
              placeholder="123 Main St, City, State"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              className="w-full mb-2 px-3 py-2 border border-gray-300 rounded-lg"
            />
            <label htmlFor="destination" className="block mb-1 font-medium">
              Destination Address:
            </label>
            <input
              id="destination"
              type="text"
              placeholder="456 Elm St, City, State"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full mb-2 px-3 py-2 border border-gray-300 rounded-lg"
            />
            <label htmlFor="pickupDate" className="block mb-1 font-medium">
              Pickup Date:
            </label>
            <input
              id="pickupDate"
              type="date"
              value={pickupDate}
              onChange={(e) => setPickupDate(e.target.value)}
              className="w-full mb-2 px-3 py-2 border border-gray-300 rounded-lg"
            />
            <label htmlFor="pickupTime" className="block mb-1 font-medium">
              Pickup Time:
            </label>
            <input
              id="pickupTime"
              type="time"
              value={pickupTime}
              onChange={(e) => setPickupTime(e.target.value)}
              className="w-full mb-2 px-3 py-2 border border-gray-300 rounded-lg"
            />
            <label htmlFor="deliveryDate" className="block mb-1 font-medium">
              Delivery Date (optional):
            </label>
            <input
              id="deliveryDate"
              type="date"
              value={deliveryDate}
              onChange={(e) => setDeliveryDate(e.target.value)}
              className="w-full mb-2 px-3 py-2 border border-gray-300 rounded-lg"
            />
            <label htmlFor="dailyMiles" className="block mb-1 font-medium">
              Daily Mileage (miles):
            </label>
            <input
              id="dailyMiles"
              type="number"
              placeholder="e.g., 600"
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
                setWeatherAlerts([]);
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
          {error && <div className="bg-red-100 text-red-800 p-3 rounded mb-2">{error}</div>}
          {distance && duration && (
            <div className="space-y-1">
              <p><strong>Distance:</strong> {distance}</p>
              <p><strong>Estimated Time:</strong> {duration}</p>
              {trafficDelay && <p><strong>Time with Traffic:</strong> {trafficDelay}</p>}
              {estimatedArrival && <p><strong>Estimated Arrival:</strong> {estimatedArrival}</p>}
              {deliveryDate && <p><strong>Delivery Date:</strong> {deliveryDate}</p>}
              {weatherAlerts.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-lg font-semibold">Weather Alerts:</h3>
                  <ul className="list-disc list-inside text-sm text-red-700 space-y-1">
                    {weatherAlerts.map((alert, idx) => (
                      <li key={idx}>
                        <strong>{alert.event}</strong>{' '}
                        <a href={alert.link} target="_blank" rel="noopener noreferrer" className="underline text-blue-600">Details</a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </>
  );
}