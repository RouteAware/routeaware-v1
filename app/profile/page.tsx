'use client';

import React from 'react';
import { FaUser, FaEnvelope, FaMapMarkedAlt, FaBell, FaRegEdit, FaCogs, FaTruck } from 'react-icons/fa';

const ProfilePage = () => {
  return (
    <main className="min-h-screen bg-gray-100 text-gray-900 p-6">
      <div className="bg-white rounded-2xl shadow-xl p-6 max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <FaUser className="text-blue-700 text-3xl" />
          <h1 className="text-3xl font-bold text-blue-800">Your Profile</h1>
        </div>

        {/* Account Info */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold flex items-center gap-2 mb-2">
            <FaEnvelope className="text-gray-500" /> Account Details
          </h2>
          <p className="text-gray-700">
            Email: <span className="italic text-gray-500">user@example.com</span>
          </p>
          <p className="text-gray-700">
            Subscription: <span className="italic text-gray-500">Free (MVP Access)</span>
          </p>
        </section>

        {/* Saved Loads */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold flex items-center gap-2 mb-2">
            <FaMapMarkedAlt className="text-gray-500" /> Saved Loads
          </h2>
          <p className="text-gray-600">
            You’ll be able to view, name, and manage saved loads and routes — with real-time alert integration.
          </p>
        </section>

        {/* Preferences */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold flex items-center gap-2 mb-2">
            <FaCogs className="text-gray-500" /> Preferences
          </h2>
          <p className="text-gray-600">
            Display settings, unit formats, and alert preferences will be accessible here.
          </p>
        </section>

        {/* Coming Soon */}
        <section className="bg-yellow-50 border border-yellow-300 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-yellow-700 mb-2 flex items-center gap-2">
            <FaBell /> What’s Coming
          </h3>
          <ul className="list-disc list-inside text-sm text-yellow-800 space-y-1">
            <li><FaRegEdit className="inline mr-1" /> Edit profile and email</li>
            <li><FaMapMarkedAlt className="inline mr-1" /> Upload/save custom routes</li>
            <li><FaBell className="inline mr-1" /> Enable notifications when conditions change</li>
            <li><FaTruck className="inline mr-1" /> Fleet/driver profile integration</li>
            <li><FaCogs className="inline mr-1" /> View historical ETA and load history</li>
          </ul>
        </section>

        {/* Footer Note */}
        <p className="text-xs text-center text-gray-400 mt-10">
          Profile Tools Coming Soon · v1.0 MVP
        </p>
      </div>
    </main>
  );
};

export default ProfilePage;