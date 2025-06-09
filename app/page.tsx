'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { calculateETA } from './utils/calculateETA';
import { RouteWeatherAdvisory } from './utils/fetchBoundingBoxAlerts';
import { fetchCurrentWeather, CurrentWeather } from './utils/fetchCurrentWeather';

const Map = dynamic(() => import('./components/Map'), { ssr: false });

export default function Home() {
  // Route input state
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');

  // Layer toggles
  const [showTraffic, setShowTraffic] = useState(false);
  const [showWeather, setShowWeather] = useState(false);
  const [weatherLayer, setWeatherLayer] = useState('precipitation_new');
  const [weatherOpacity, setWeatherOpacity] = useState(0.5);

  // Trip details
  const [pickupDate, setPickupDate] = useState('');
  const [pickupTime, setPickupTime] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [dailyMiles, setDailyMiles] = useState('');
  const [use24Hour, setUse24Hour] = useState(false);
  const departureTime = pickupDate && pickupTime ? new Date(`${pickupDate}T${pickupTime}`) : undefined;

  // Summary data
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');
  const [trafficDelay, setTrafficDelay] = useState('');
  const [estimatedArrival, setEstimatedArrival] = useState('');
  const [weatherAlerts, setWeatherAlerts] = useState<RouteWeatherAdvisory[]>([]);
  const [routeAdvisories, setRouteAdvisories] = useState<string[]>([]);
  const [error, setError] = useState('');

  // Current weather at endpoints
  const [originWeather, setOriginWeather] = useState<CurrentWeather | null>(null);
  const [destinationWeather, setDestinationWeather] = useState<CurrentWeather | null>(null);

  // Called by Map when route data arrives
  const handleRouteSummary = (dist: string, dur: string, traffic?: string) => {
    setDistance(dist);
    setDuration(dur);
    setTrafficDelay(traffic || '');
    setError('');
    const eta = calculateETA(dist, pickupDate, pickupTime, dailyMiles, use24Hour);
    setEstimatedArrival(eta);
  };

  // Update weather when Map provides endpoint coordinates
  const handleCoordinatesUpdate = async (
    originPos: { lat: number; lng: number },
    destPos: { lat: number; lng: number }
  ) => {
    try {
      const [oW, dW] = await Promise.all([
        fetchCurrentWeather(originPos.lat, originPos.lng),
        fetchCurrentWeather(destPos.lat, destPos.lng),
      ]);
      setOriginWeather(oW);
      setDestinationWeather(dW);
    } catch (err) {
      console.error('Error fetching current weather:', err);
    }
  };

  // Trigger route calculation
  const handleCheckRoute = () => {
    if (!origin || !destination) {
      setError('Please enter both origin and destination.');
      return;
    }
    setDistance(''); setDuration(''); setTrafficDelay('');
    setEstimatedArrival(''); setWeatherAlerts([]); setRouteAdvisories([]);
    setOriginWeather(null); setDestinationWeather(null);
    setError('');
    // Map will react to origin/destination change
  };

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Map Panel */}
        <section className="bg-white shadow rounded-2xl p-4">
          <h2 className="text-xl font-semibold mb-3">Map</h2>
          <div className="flex flex-wrap gap-4 mb-3">
            <label className="flex items-center space-x-2">
              <input type="checkbox" checked={showTraffic} onChange={() => setShowTraffic(!showTraffic)} />
              <span>Traffic</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" checked={showWeather} onChange={() => setShowWeather(!showWeather)} />
              <span>Weather</span>
            </label>
            {showWeather && (
              <>
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
              </>
            )}
            <label className="flex items-center space-x-2">
              <input type="checkbox" checked={use24Hour} onChange={() => setUse24Hour(!use24Hour)} />
              <span>24-Hour</span>
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
            onCoordinatesUpdate={handleCoordinatesUpdate}
          />
        </section>
        {/* Input Panel */}
        <section className="bg-white shadow rounded-2xl p-4">
          <h2 className="text-xl font-semibold mb-3">Route Input</h2>
          <div className="space-y-3">
            <div>
              <label className="block font-medium">Origin</label>
              <input
                type="text" value={origin} onChange={e => setOrigin(e.target.value)}
                placeholder="123 Main St, City" className="w-full px-3 py-2 border rounded" />
            </div>
            <div>
              <label className="block font-medium">Destination</label>
              <input
                type="text" value={destination} onChange={e => setDestination(e.target.value)}
                placeholder="456 Elm St, City" className="w-full px-3 py-2 border rounded" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-medium">Pickup Date</label>
                <input type="date" value={pickupDate} onChange={e => setPickupDate(e.target.value)} className="w-full px-3 py-2 border rounded" />
              </div>
              <div>
                <label className="block font-medium">Pickup Time</label>
                <input type="time" value={pickupTime} onChange={e => setPickupTime(e.target.value)} className="w-full px-3 py-2 border rounded" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-medium">Delivery Date</label>
                <input type="date" value={deliveryDate} onChange={e => setDeliveryDate(e.target.value)} className="w-full px-3 py-2 border rounded" />
              </div>
              <div>
                <label className="block font-medium">Daily Miles</label>
                <input type="number" value={dailyMiles} onChange={e => setDailyMiles(e.target.value)} placeholder="600" className="w-full px-3 py-2 border rounded" />
              </div>
            </div>
            <button onClick={handleCheckRoute} className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
              Check Route
            </button>
          </div>
        </section>
      </div>
      {/* Summary Panel */}
      <section className="bg-white shadow rounded-2xl p-4 mt-6 space-y-4">
        <h2 className="text-xl font-semibold">Route Summary</h2>
        {error && <div className="bg-red-100 text-red-800 p-2 rounded">{error}</div>}
        {!distance && !error && (
          <p className="text-gray-600">Enter route details and click "Check Route" to see summary.</p>
        )}
        {distance && (
          <div className="space-y-2">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Origin</p>
                <p>{origin}</p>
                {originWeather && <p className="text-sm text-blue-600">{originWeather.temp}°F, {originWeather.description}</p>}
              </div>
              <div>
                <p className="text-sm text-gray-500">Destination</p>
                <p>{destination}</p>
                {destinationWeather && <p className="text-sm text-blue-600">{destinationWeather.temp}°F, {destinationWeather.description}</p>}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Distance</p>
                <p>{distance}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Estimated Time</p>
                <p>{duration}</p>
              </div>
            </div>
            {trafficDelay && (
              <div>
                <p className="text-sm text-gray-500">With Traffic</p>
                <p>{trafficDelay}</p>
              </div>
            )}
            {estimatedArrival && (
              <div>
                <p className="text-sm text-gray-500">Estimated Arrival</p>
                <p>{estimatedArrival}</p>
              </div>
            )}
            {(weatherAlerts.length || routeAdvisories.length) > 0 && (
              <div className="pt-2 border-t">
                {weatherAlerts.length > 0 && (
                  <div className="mb-2">
                    <h3 className="font-semibold">Weather Alerts</h3>
                    <ul className="list-disc list-inside text-sm text-red-700">
                      {weatherAlerts.map((a, i) => (
                        <li key={i}>
                          <strong>{a.event}</strong> — <a href={a.link} className="underline" target="_blank" rel="noopener noreferrer">Details</a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {routeAdvisories.length > 0 && (
                  <div>
                    <h3 className="font-semibold">Route Advisories</h3>
                    <ul className="list-disc list-inside text-sm">
                      {routeAdvisories.map((txt, i) => <li key={i}>{txt}</li>)}
                    </ul>
                  </div>
                )}
                {weatherAlerts.length === 0 && routeAdvisories.length === 0 && (
                  <p className="text-sm text-gray-600">No active alerts or advisories.</p>
                )}
              </div>
            )}
            <div className="flex justify-end pt-4 border-t">
              <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                Save Route
              </button>
            </div>
          </div>
        )}
      </section>
    </main>
  );
} 