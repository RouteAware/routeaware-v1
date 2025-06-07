'use client';

import React from 'react';
import { FaMapMarkedAlt, FaBell, FaExclamationTriangle, FaRoad } from 'react-icons/fa';

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-gray-100 text-gray-900 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white shadow-lg rounded-2xl p-6">
          <h1 className="text-3xl font-bold text-blue-700 mb-2">RouteAware Dashboard</h1>
          <p className="text-gray-600">At-a-glance insights for your routes, alerts, and tools.</p>
          <div className="mt-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 p-4 rounded">
            🚧 This dashboard is under construction — full feature release coming soon.
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl shadow p-4 flex items-center space-x-4">
            <FaMapMarkedAlt className="text-blue-500 text-xl" />
            <div>
              <h2 className="font-semibold text-sm">Saved Routes</h2>
              <p className="text-gray-500 text-xs">0 routes saved</p>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow p-4 flex items-center space-x-4">
            <FaBell className="text-red-500 text-xl" />
            <div>
              <h2 className="font-semibold text-sm">Weather Alerts</h2>
              <p className="text-gray-500 text-xs">Live NWS sync</p>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow p-4 flex items-center space-x-4">
            <FaExclamationTriangle className="text-yellow-600 text-xl" />
            <div>
              <h2 className="font-semibold text-sm">Active Advisories</h2>
              <p className="text-gray-500 text-xs">0 current advisories</p>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow p-4 flex items-center space-x-4">
            <FaRoad className="text-green-600 text-xl" />
            <div>
              <h2 className="font-semibold text-sm">Traffic Snapshot</h2>
              <p className="text-gray-500 text-xs">Check cam status</p>
            </div>
          </div>
        </div>

        {/* Placeholder for route planning */}
        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-xl font-semibold text-blue-700 mb-2">Quick Plan</h2>
          <p className="text-sm text-gray-600 mb-4">Instantly generate a new route from here. Coming soon!</p>
          <div className="bg-gray-100 border border-dashed border-gray-300 rounded-lg p-8 text-center text-gray-400">
            Route Planning Widget Placeholder
          </div>
        </div>
      </div>
    </main>
  );
}