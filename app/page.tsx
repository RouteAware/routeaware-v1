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
  const [error, setError] = useState('');

  // Layers
  const [showTraffic, setShowTraffic] = useState(false);
  const [showWeather, setShowWeather] = useState(false);
  const [weatherLayer, setWeatherLayer] = useState('precipitation_new');
  const [weatherOpacity, setWeatherOpacity] = useState(0.5);

  // Inputs
  const [pickupDate, setPickupDate] = useState('');
  const [pickupTime, setPickupTime] = useState('');
  const departureTime = pickupDate && pickupTime ? new Date(`${pickupDate}T${pickupTime}`) : undefined;

  const [deliveryDate, setDeliveryDate] = useState('');
  const [dailyMiles, setDailyMiles] = useState('');
  const [use24Hour, setUse24Hour] = useState(false);

  // Summary & alerts
  const [estimatedArrival, setEstimatedArrival] = useState('');
  const [weatherAlerts, setWeatherAlerts] = useState<RouteWeatherAdvisory[]>([]);
  const [routeAdvisories, setRouteAdvisories] = useState<string[]>([]);

  const handleRouteSummary = (dist: string, dur: string, traffic?: string) => {
    setDistance(dist);
    setDuration(dur);
    setTrafficDelay(traffic || '');
    setError('');
    const eta = calculateETA(dist, pickupDate, pickupTime, dailyMiles, use24Hour);
    setEstimatedArrival(eta);
  };

  return (
    <main className="min-h-screen bg-gray-100 text-gray-900 p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Map Tile */}
        <div className="bg-white shadow-lg rounded-2xl p-4">
          <h2 className="text-xl font-semibold mb-2">Map</h2>
          <div className="flex flex-wrap gap-4 mb-3">
            <label className="flex items-center space-x-2">
              <input type="checkbox" checked={showTraffic} onChange={() => setShowTraffic(!showTraffic)} />
              <span>Show Traffic</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" checked={showWeather} onChange={() => setShowWeather(!showWeather)} />
              <span>Show Weather</span>
            </label>
            {showWeather && (
              <div className="flex flex-wrap gap-2">
                <select className="px-2 py-1 border rounded" value={weatherLayer} onChange={e => setWeatherLayer(e.target.value)}>
                  <option value="precipitation_new">Precipitation</option>
                  <option value="clouds_new">Clouds</option>
                  <option value="temp_new">Temperature</option>
                  <option value="wind_new">Wind</option>
                </select>
                <select className="px-2 py-1 border rounded" value={weatherOpacity} onChange={e => setWeatherOpacity(parseFloat(e.target.value))}>
                  <option value={0.3}>Low</option>
                  <option value={0.5}>Medium</option>
                  <option value={0.8}>High</option>
                </select>
              </div>
            )}
            <label className="flex items-center space-x-2">
              <input type="checkbox" checked={use24Hour} onChange={() => setUse24Hour(!use24Hour)} />
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
            onAlertsUpdate={alerts => setWeatherAlerts(alerts)}
            onAdvisoriesUpdate={adv => setRouteAdvisories(adv)}
          />
        </div>

        {/* Input Tile */}
        <div className="bg-white shadow-lg rounded-2xl p-4">
          <h2 className="text-xl font-semibold mb-2">Route Input</h2>
          {/* input fields here, omitted for brevity */}
          <button
            onClick={() => {
              if (!origin || !destination) {
                setError('Please enter both origin and destination.');
                return;
              }
              // Clear summary
              setDistance('');
              setDuration('');
              setTrafficDelay('');
              setEstimatedArrival('');
              setWeatherAlerts([]);
              setRouteAdvisories([]);
              setError('');
            }}
            className="w-full bg-blue-600 text-white py-2 rounded-lg mb-2"
          >
            Check Route
          </button>
        </div>
      </div>

      {/* Route Summary */}
      <div className="bg-white shadow-lg rounded-2xl p-4 mt-6">
        <h2 className="text-xl font-semibold mb-2">Route Summary</h2>
        {error && <div className="bg-red-100 text-red-800 p-3 rounded mb-2">{error}</div>}
        {distance && duration && (
          <div className="space-y-2">
            <p><strong>Distance:</strong> {distance}</p>
            <p><strong>Estimated Time:</strong> {duration}</p>
            {trafficDelay && <p><strong>Time with Traffic:</strong> {trafficDelay}</p>}
            {estimatedArrival && <p><strong>Estimated Arrival:</strong> {estimatedArrival}</p>}
            {deliveryDate && <p><strong>Delivery Date:</strong> {deliveryDate}</p>}

            {/* Weather Alerts */}
            {weatherAlerts.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold">Weather Alerts:</h3>
                <ul className="list-disc list-inside text-sm text-red-700">
                  {weatherAlerts.map((a, i) => (
                    <li key={i}>
                      <strong>{a.event}</strong>{' '}
                      <a href={a.link} target="_blank" rel="noopener noreferrer" className="underline text-blue-600">Details</a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Route Advisories */}
            <div className="mt-4">
              <h3 className="text-lg font-semibold">Route Advisories</h3>
              {routeAdvisories.length > 0 ? (
                <ul className="list-disc list-inside text-sm">
                  {routeAdvisories.map((text, i) => (
                    <li key={i}>{text}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-600">No active advisories for this route.</p>
              )}
            </div>

            {/* Save Route Skeleton */}
            <div className="flex justify-end mt-4">
              <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">Save Route</button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}