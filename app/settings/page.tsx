'use client';

import React from 'react';
import { FaToggleOff, FaToggleOn, FaWrench, FaSlidersH, FaGlobeAmericas } from 'react-icons/fa';

export default function SettingsPage() {
  return (
    <main className="min-h-screen bg-gray-100 text-gray-900 p-6">
      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-blue-800 flex items-center gap-2">
            <FaSlidersH /> Settings
          </h1>
          <span className="text-xs text-gray-400 italic">Coming Soon</span>
        </div>

        {/* Info Banner */}
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 p-4 rounded mb-6 shadow-sm">
          <FaWrench className="inline-block mr-2" />
          You’ll soon be able to personalize your RouteAware experience here!
        </div>

        {/* Setting Groups */}
        <div className="space-y-6">
          {/* Theme Mode */}
          <section>
            <h2 className="font-semibold text-gray-700 mb-2">Appearance</h2>
            <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg border">
              <span>Dark / Light / System Mode</span>
              <FaToggleOff className="text-gray-400 text-xl" />
            </div>
          </section>

          {/* Unit Format */}
          <section>
            <h2 className="font-semibold text-gray-700 mb-2">Units & Format</h2>
            <div className="space-y-2">
              <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg border">
                <span>Distance Units</span>
                <span className="text-sm text-gray-500 italic">Miles (default)</span>
              </div>
              <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg border">
                <span>Temperature</span>
                <span className="text-sm text-gray-500 italic">Fahrenheit</span>
              </div>
              <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg border">
                <span>Time Format</span>
                <span className="text-sm text-gray-500 italic">12-hour</span>
              </div>
            </div>
          </section>

          {/* Alerts */}
          <section>
            <h2 className="font-semibold text-gray-700 mb-2">Notifications</h2>
            <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg border">
              <span>Email Alerts for Route Changes</span>
              <FaToggleOn className="text-green-500 text-xl" />
            </div>
          </section>

          {/* Map Overlays */}
          <section>
            <h2 className="font-semibold text-gray-700 mb-2">Map Overlays</h2>
            <div className="grid grid-cols-2 gap-3">
              {['Traffic', 'Radar', 'Weather Layer', 'Cameras'].map((label) => (
                <div
                  key={label}
                  className="flex justify-between items-center bg-gray-50 p-3 rounded-lg border"
                >
                  <span>{label}</span>
                  <FaToggleOff className="text-gray-400 text-xl" />
                </div>
              ))}
            </div>
          </section>

          {/* Region Settings */}
          <section>
            <h2 className="font-semibold text-gray-700 mb-2 flex items-center gap-1">
              <FaGlobeAmericas /> Language & Region
            </h2>
            <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg border">
              <span>Primary Region</span>
              <span className="text-sm text-gray-500 italic">United States</span>
            </div>
          </section>
        </div>

        {/* Footer Note */}
        <p className="text-xs text-center text-gray-400 mt-10">
          RouteAware Settings — More customization options coming soon.
        </p>
      </div>
    </main>
  );
}