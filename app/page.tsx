// app/page.tsx

import Map from "./components/Map";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 text-gray-900 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">RouteAware Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow-lg rounded-2xl p-4">
          <h2 className="text-xl font-semibold mb-2">Map</h2>
          <Map />
        </div>
        <div className="bg-white shadow-lg rounded-2xl p-4">
          <h2 className="text-xl font-semibold mb-2">Route Input</h2>
          <input
            type="text"
            placeholder="Origin Address"
            className="w-full mb-2 px-3 py-2 border border-gray-300 rounded-lg"
          />
          <input
            type="text"
            placeholder="Destination Address"
            className="w-full mb-2 px-3 py-2 border border-gray-300 rounded-lg"
          />
          <button className="w-full bg-blue-600 text-white py-2 rounded-lg">Check Route</button>
        </div>
      </div>
      <div className="bg-white shadow-lg rounded-2xl p-4 mt-6">
        <h2 className="text-xl font-semibold mb-2">Route Summary</h2>
        <span className="inline-block bg-yellow-200 text-yellow-900 text-sm px-3 py-1 rounded-full">Coming Soon</span>
      </div>
    </main>
  );
}