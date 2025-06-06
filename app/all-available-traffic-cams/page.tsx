'use client';

import React from 'react';

export default function AllAvailableTrafficCams() {
  return (
    <div className="bg-white shadow-lg rounded-2xl p-6">
      <h1 className="text-2xl font-bold mb-4 text-blue-700">
        All Available Traffic Cams
      </h1>
      <div className="bg-yellow-100 text-yellow-900 p-4 rounded-lg border border-yellow-300 mb-6">
        🚧 This page is under construction. Check back soon for live traffic cam views and regional snapshots across North America.
      </div>
      <ul className="list-disc list-inside text-gray-800 space-y-2">
        <li>Browse traffic cams by state, city, or interstate corridor</li>
        <li>Live snapshots and refresh timers for each camera</li>
        <li>Favorites system to quickly access key locations</li>
        <li>Overlay camera feeds on your planned route</li>
        <li>Get alerts when nearby cams detect extreme weather</li>
      </ul>
    </div>
  );
}