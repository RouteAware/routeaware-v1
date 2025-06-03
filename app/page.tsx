// app/page.tsx
"use client";

import Map from "./components/Map";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-100 text-gray-800 p-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Map Tile */}
        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Map</h2>
          <Map />
        </div>

        {/* Input Form Tile */}
        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Route Input</h2>
          <input
            type="text"
            placeholder="Origin Address"
            className="border p-2 rounded w-full mb-4"
          />
          <input
            type="text"
            placeholder="Destination Address"
            className="border p-2 rounded w-full mb-4"
          />
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Check Route
          </button>
        </div>

        {/* Route Summary Tile */}
        <div className="bg-white rounded-2xl shadow p-6 lg:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Route Summary</h2>
          <div className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-md text-sm font-medium inline-block">
            Coming Soon
          </div>
        </div>
      </div>
    </main>
  );
}
