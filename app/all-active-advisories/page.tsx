'use client';

import React, { useEffect, useState } from 'react';

interface NWSFeature {
  id: string;
  properties: {
    areaDesc: string;
    event: string;
    severity: string;
    headline: string;
    description: string;
    instruction: string;
    sent: string;
    effective: string;
    ends: string;
    uri: string;
  };
}

interface Advisory {
  id: string;
  areaDesc: string;
  event: string;
  severity: string;
  headline: string;
  description: string;
  instruction: string;
  sent: string;
  effective: string;
  ends: string;
  uri: string;
}

const AllActiveAdvisories = () => {
  const [advisories, setAdvisories] = useState<Advisory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    const fetchAdvisories = async () => {
      try {
        const res = await fetch('https://api.weather.gov/alerts/active');
        if (!res.ok) throw new Error('Failed to fetch advisories');
        const data = await res.json();
        const alerts: Advisory[] = data.features.map((f: NWSFeature) => ({
          id: f.id,
          areaDesc: f.properties.areaDesc,
          event: f.properties.event,
          severity: f.properties.severity,
          headline: f.properties.headline,
          description: f.properties.description,
          instruction: f.properties.instruction,
          sent: f.properties.sent,
          effective: f.properties.effective,
          ends: f.properties.ends,
          uri: f.properties.uri,
        }));
        setAdvisories(alerts);
        setLoading(false);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Unknown error');
        }
        setLoading(false);
      }
    };
    fetchAdvisories();
  }, []);

  const groupByState = (items: Advisory[]) => {
    const groups: { [key: string]: Advisory[] } = {};
    items.forEach((item) => {
      const states = item.areaDesc.split(', ');
      states.forEach((state) => {
        if (!groups[state]) groups[state] = [];
        groups[state].push(item);
      });
    });
    return groups;
  };

  const filteredAdvisories = filter === 'All'
    ? advisories
    : advisories.filter((a) => a.event.toLowerCase().includes(filter.toLowerCase()));

  const grouped = groupByState(filteredAdvisories);

  const uniqueEvents = Array.from(new Set(advisories.map(a => a.event))).sort();

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h1 className="text-2xl font-bold mb-4">All Active Advisories</h1>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Filter by Event Type:</label>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg w-full"
        >
          <option value="All">All</option>
          {uniqueEvents.map((event) => (
            <option key={event} value={event}>{event}</option>
          ))}
        </select>
      </div>

      {loading && <p className="text-sm">Loading advisories…</p>}
      {error && <p className="text-red-600">{error}</p>}
      {!loading && !error && (
        <div className="space-y-4">
          {Object.keys(grouped).map((state) => (
            <div key={state} className="border-t pt-2">
              <h2 className="text-lg font-semibold text-blue-700">{state}</h2>
              <ul className="list-disc list-inside text-sm text-gray-800">
                {grouped[state].map((alert) => (
                  <li key={alert.id} className="mb-1">
                    <strong>{alert.event}:</strong> {alert.headline}{' '}
                    <a
                      href={alert.uri}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      View alert
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllActiveAdvisories;