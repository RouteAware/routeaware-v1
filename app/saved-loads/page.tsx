'use client';

import React from 'react';

export default function SavedLoadsPage() {
  return (
    <main className="min-h-screen bg-gray-100 text-gray-900 p-6">
      <div className="bg-white shadow-lg rounded-2xl p-6 text-center">
        <h1 className="text-2xl font-bold mb-2 text-blue-700">Saved Loads</h1>
        <p className="mb-4 text-gray-600">Coming Soon — You’ll be able to:</p>
        <ul className="list-disc list-inside text-left max-w-xl mx-auto text-gray-700">
          <li>View a list of all your saved routes</li>
          <li>Assign custom names to each load</li>
          <li>See weather alerts tied to each saved load</li>
          <li>Receive email notifications when weather changes occur</li>
          <li>Edit or delete saved loads</li>
        </ul>
      </div>
    </main>
  );
}