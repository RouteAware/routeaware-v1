'use client';

import React from 'react';
import { FaCloudSunRain, FaBell, FaEdit, FaTrash, FaTruck, FaRoute } from 'react-icons/fa';

export default function SavedLoadsPage() {
  const placeholderLoads = [
    {
      id: 1,
      name: 'Florida to Texas Run',
      origin: 'Orlando, FL',
      destination: 'Dallas, TX',
      status: 'Weather Alert Active',
    },
    {
      id: 2,
      name: 'Northeast LTL',
      origin: 'Boston, MA',
      destination: 'Newark, NJ',
      status: 'All Clear',
    },
  ];

  return (
    <main className="min-h-screen bg-gray-100 text-gray-900 p-6">
      <div className="bg-white shadow-lg rounded-2xl p-6 max-w-5xl mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-blue-700">Saved Loads</h1>
          <p className="text-gray-600">Manage your routes, monitor alerts, and stay in control.</p>
          <div className="mt-4 bg-yellow-100 text-yellow-800 border border-yellow-300 rounded-lg px-4 py-2 inline-block">
            🚧 Full Feature Coming Soon — Preview Below
          </div>
        </div>

        {/* Load Cards Preview */}
        <div className="grid gap-4 md:grid-cols-2 mt-6">
          {placeholderLoads.map((load) => (
            <div key={load.id} className="border border-gray-200 rounded-xl p-4 bg-gray-50 shadow-sm">
              <h2 className="text-lg font-semibold text-blue-800 flex items-center gap-2">
                <FaTruck /> {load.name}
              </h2>
              <p className="text-sm mt-1 text-gray-600 flex items-center gap-2">
                <FaRoute /> {load.origin} → {load.destination}
              </p>
              <p className="mt-2 text-sm text-gray-700 flex items-center gap-2">
                <FaCloudSunRain /> <strong>Status:</strong> {load.status}
              </p>

              <div className="flex justify-end gap-3 mt-4 text-sm text-blue-600">
                <button className="flex items-center gap-1 hover:underline">
                  <FaEdit /> Edit
                </button>
                <button className="flex items-center gap-1 hover:underline text-red-600">
                  <FaTrash /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Future Capabilities List */}
        <div className="mt-10 border-t pt-6">
          <h3 className="text-xl font-semibold mb-2">What You’ll Be Able to Do:</h3>
          <ul className="list-disc list-inside text-gray-800 space-y-1">
            <li>Save routes and assign them custom load names</li>
            <li>View live weather alerts for each saved route</li>
            <li>Get email and push notifications when route conditions change</li>
            <li>Edit or remove saved loads as needed</li>
            <li>Sort and search saved loads by region, date, or status</li>
            <li>Set pickup/delivery windows and monitor countdowns</li>
            <li>Share loads with teammates (future enterprise option)</li>
          </ul>
        </div>

        <p className="text-center text-xs text-gray-400 mt-10">
          Saved Load Management launching Summer 2025 · RouteAware v1.1
        </p>
      </div>
    </main>
  );
}