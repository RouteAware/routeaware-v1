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
  const [searchQuery, setSearchQuery] = useState('');
  const [sortByState, setSortByState] = useState(true);

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

  const matchesQuery = (a: Advisory) => {
    const q = searchQuery.toLowerCase();
    return (
      a.areaDesc.toLowerCase().includes(q) ||
      a.event.toLowerCase().includes(q) ||
      a.headline.toLowerCase().includes(q)
    );
  };

  const filteredAdvisories = advisories.filter((a) => {
    const eventMatch = filter === 'All' || a.event.toLowerCase().includes(filter.toLowerCase());
    const queryMatch = searchQuery === '' || matchesQuery(a);
    return eventMatch && queryMatch;
  });

  const grouped = groupByState(filteredAdvisories);
  const sortedStates = sortByState ? Object.keys(grouped).sort() : Object.keys(grouped);
  const uniqueEvents = Array.from(new Set(advisories.map((a) => a.event))).sort();

  const getSeverityBadge = (severity: string) => {
    const base = 'inline-block px-2 py-0.5 text-xs font-medium rounded';
    switch (severity.toLowerCase()) {
      case 'severe':
        return `${base} bg-red-600 text-white`;
      case 'moderate':
        return `${base} bg-orange-400 text-white`;
      case 'minor':
        return `${base} bg-yellow-300 text-gray-800`;
      default:
        return `${base} bg-gray-300 text-gray-800`;
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-center">All Active Advisories</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
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

        <div>
          <label className="block mb-1 font-medium">Search (State, Event, or Headline):</label>
          <input
            type="text"
            placeholder="e.g. Texas, Flood, Snow"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg w-full"
          />
        </div>

        <div className="flex items-end">
          <label className="flex items-center space-x-2 text-sm">
            <input
              type="checkbox"
              checked={sortByState}
              onChange={() => setSortByState(!sortByState)}
              className="mr-2"
            />
            <span>Sort States Alphabetically</span>
          </label>
        </div>
      </div>

      {loading && <p className="text-sm text-center">Loading advisories…</p>}
      {error && <p className="text-red-600 text-center">{error}</p>}

      {!loading && !error && (
        <div className="space-y-6">
          {sortedStates.map((state) => (
            <div key={state} className="border-t pt-4">
              <h2 className="text-xl font-semibold text-blue-800 mb-2">
                {state} <span className="text-sm text-gray-500">({grouped[state].length})</span>
              </h2>
              <ul className="space-y-2">
                {grouped[state].map((alert) => (
                  <li key={alert.id} className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold">
                          <span className={getSeverityBadge(alert.severity)}>{alert.severity}</span>{' '}
                          {alert.event}
                        </p>
                        <p className="text-sm text-gray-700">{alert.headline}</p>
                      </div>
                      <a
                        href={alert.uri}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 text-sm underline"
                      >
                        View alert
                      </a>
                    </div>
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