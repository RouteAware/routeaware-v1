'use client';

import React from 'react';

const AllActiveAdvisories = () => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h1 className="text-2xl font-bold mb-4">All Active Advisories</h1>
      <div className="bg-yellow-100 text-yellow-800 p-4 rounded-lg mb-4">
        🚧 This page is under construction. 🚧
      </div>
      <ul className="list-disc list-inside text-sm text-gray-700">
        <li>View all current weather advisories in North America</li>
        <li>Filter by type (e.g. wind, snow, flooding)</li>
        <li>See advisory source links and effective timeframes</li>
        <li>Sort by severity or distance from your saved routes</li>
      </ul>
    </div>
  );
};

export default AllActiveAdvisories;