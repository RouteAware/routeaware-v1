'use client';

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-gray-100 text-gray-900 p-6">
      <div className="bg-white shadow-lg rounded-2xl p-6">
        <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4 rounded">
          🚧 This page is under construction — Coming Soon!
        </div>
        <ul className="list-disc pl-6 text-gray-700">
          <li>Quick view of saved routes</li>
          <li>Active advisories across saved lanes</li>
          <li>Recent traffic cam alerts</li>
          <li>Route planning shortcuts</li>
        </ul>
      </div>
    </main>
  );
}