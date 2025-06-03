// app/page.tsx
"use client";

import React from "react";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("@/components/Map"), {
  ssr: false,
});

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-100 text-gray-900 px-4 py-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map Tile */}
        <div className="bg-white rounded-2xl shadow p-4 col-span-1 lg:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Live Map</h2>
          <div className="h-[500px] rounded-xl overflow-hidden">
            <Map />
          </div>
        </div>

        {/* Input Tile */}
        <div className="bg-white rounded-2xl shadow p-6 flex flex-col gap-4">
          <h2 className="text-xl font-semibold">Route Planner</h2>
          <input
            type="text"
            placeholder="Origin Address"
            className="border p-2 rounded w-full"
          />
          <input
            type="text"
            placeholder="Destination Address"
            className="border p-2 rounded w-full"
          />
          <button className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
            Check Route
          </button>
        </div>

        {/* Route Summary Tile */}
        <div className="bg-white rounded-2xl shadow p-6 mt-6 lg:mt-0 col-span-1">
          <h2 className="text-xl font-semibold mb-2">Route Summary</h2>
          <div className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-md text-sm font-medium">
            Coming Soon
          </div>
        </div>
      </div>
    </main>
  );
}
