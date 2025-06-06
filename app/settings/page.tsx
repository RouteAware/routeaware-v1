'use client';

import React from "react";

export default function SettingsPage() {
  return (
    <main className="min-h-screen bg-gray-100 text-gray-900 p-6">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-6">
        <h1 className="text-2xl font-bold mb-4">Settings</h1>

        <div className="bg-yellow-100 text-yellow-800 p-4 rounded mb-6">
          Coming Soon — This page will allow you to customize your preferences!
        </div>

        <ul className="list-disc list-inside text-sm text-gray-700">
          <li>Toggle between dark mode, light mode, and system mode</li>
          <li>Select units (miles/km, °F/°C)</li>
          <li>Enable or disable route alert emails</li>
          <li>Choose 12-hour or 24-hour time format</li>
          <li>Control map overlays (traffic, radar, cams)</li>
          <li>Set language or region preferences</li>
        </ul>
      </div>
    </main>
  );
}