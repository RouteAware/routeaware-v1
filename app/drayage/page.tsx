'use client';

import React, { useState } from 'react';

export default function DrayagePage() {
  const [vesselId, setVesselId] = useState('');
  const [trackingData, setTrackingData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTrack = async () => {
    if (!vesselId.trim()) return;
    setLoading(true);
    setError('');
    setTrackingData(null);

    try {
      const res = await fetch(`/api/track-ship?vessel=${encodeURIComponent(vesselId.trim())}`);
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setTrackingData(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch tracking data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-2xl p-6">
      <h1 className="text-2xl font-bold mb-4 text-blue-700">🚢 Drayage Tracker</h1>
      <p className="text-gray-700 mb-4">Enter a vessel name or IMO number to track its voyage.</p>

      <div className="flex flex-col sm:flex-row gap-2 mb-6">
        <input
          type="text"
          value={vesselId}
          onChange={(e) => setVesselId(e.target.value)}
          placeholder="e.g. CMA CGM LAPEROUSE"
          className="border border-gray-300 rounded-lg px-4 py-2 w-full sm:w-64"
        />
        <button
          onClick={handleTrack}
          className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-2 rounded disabled:opacity-50"
          disabled={loading}
        >
          {loading ? 'Searching...' : 'Track Vessel'}
        </button>
      </div>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      {trackingData && !error && (
        <div className="bg-gray-50 border rounded-lg p-4 space-y-2">
          <p><strong>Vessel:</strong> {trackingData.vessel}</p>
          <p><strong>Status:</strong> {trackingData.status}</p>
          <p><strong>Origin:</strong> {trackingData.origin}</p>
          <p><strong>Destination:</strong> {trackingData.destination}</p>
          <p><strong>ETA:</strong> {new Date(trackingData.eta).toLocaleString()}</p>
          <p className="text-sm text-gray-500">
            Last Updated: {new Date(trackingData.lastUpdated).toLocaleString()}
          </p>
        </div>
      )}
    </div>
  );
}