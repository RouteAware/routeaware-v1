'use client';

import React, { useState } from 'react';

type TrackingResponse = Record<string, unknown> | { error: string };

export default function DrayagePage() {
  const [vesselId, setVesselId] = useState('');
  const [trackingData, setTrackingData] = useState<TrackingResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const handleTrack = async () => {
    if (!vesselId.trim()) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/track-ship?vessel=${encodeURIComponent(vesselId)}`);
      const data = await res.json();
      setTrackingData(data);
    } catch (err) {
      console.error('Tracking error:', err);
      setTrackingData({ error: 'Failed to fetch tracking data' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-2xl p-6">
      <h1 className="text-2xl font-bold mb-4 text-blue-700">🚢 Drayage Tracker</h1>
      <p className="text-gray-700 mb-4">
        Enter a vessel or ship number to retrieve current voyage information.
      </p>

      <div className="flex flex-col sm:flex-row gap-2 mb-4">
        <input
          type="text"
          value={vesselId}
          onChange={(e) => setVesselId(e.target.value)}
          placeholder="Enter vessel or IMO number"
          className="border rounded px-4 py-2 w-full sm:w-auto"
        />
        <button
          onClick={handleTrack}
          className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-2 rounded"
        >
          Track Vessel
        </button>
      </div>

      {loading && <p className="text-gray-500">Loading...</p>}

      {trackingData && (
        <div className="mt-4 bg-gray-50 p-4 rounded border">
          {'error' in trackingData ? (
            <p className="text-red-600">{(trackingData as { error: string }).error}</p>
          ) : (
            <pre className="text-sm whitespace-pre-wrap">
              {JSON.stringify(trackingData, null, 2)}
            </pre>
          )}
        </div>
      )}
    </div>
  );
}