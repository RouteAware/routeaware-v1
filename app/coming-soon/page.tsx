'use client';

import React from 'react';

const ComingSoonPage = () => {
  return (
    <div className="bg-white shadow-lg rounded-2xl p-6">
      <h1 className="text-3xl font-bold mb-4 text-center text-blue-700">🚧 Coming Soon</h1>
      <p className="text-center text-gray-700 mb-6">
        This page is under construction. Here's what's coming:
      </p>
      <ul className="list-disc list-inside text-gray-800">
        <li>Real-time feature updates</li>
        <li>Dynamic routing enhancements</li>
        <li>User-customized alerts</li>
        <li>Expanded carrier insights</li>
      </ul>
    </div>
  );
};

export default ComingSoonPage;