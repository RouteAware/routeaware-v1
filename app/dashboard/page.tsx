'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  FaExclamationTriangle,
  FaRoad,
  FaPlaneDeparture,
  FaShip,
  FaNewspaper,
  FaCog,
} from 'react-icons/fa';

export default function DashboardPage() {
  const cards = [
    {
      href: '/air-cargo',
      icon: <FaPlaneDeparture className="text-blue-600 text-xl" />,
      title: 'Air Cargo Tracker',
      description: 'Track flights and cargo status',
    },
    {
      href: '/drayage',
      icon: <FaShip className="text-blue-700 text-xl" />,
      title: 'Drayage Lookup',
      description: 'Track vessel and port data',
    },
    {
      href: '/',
      icon: <FaRoad className="text-green-600 text-xl" />,
      title: 'Over the Road',
      description: 'Plan optimized truck routes',
    },
    {
      href: '/all-active-advisories',
      icon: <FaExclamationTriangle className="text-yellow-600 text-xl" />,
      title: 'Active Advisories',
      description: 'Live NWS alerts by state',
    },
    {
      href: '/news',
      icon: <FaNewspaper className="text-indigo-500 text-xl" />,
      title: 'News',
      description: 'Industry & weather headlines',
    },
    {
      href: '/settings',
      icon: <FaCog className="text-gray-700 text-xl" />,
      title: 'Settings',
      description: 'Customize your RouteAware experience',
    },
  ];

  return (
    <main className="min-h-screen bg-gray-100 text-gray-900 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Logo */}
        <div className="flex justify-center py-4">
          <Image src="/logo.png" alt="RouteAware Logo" width={200} height={200} priority />
        </div>

        {/* Header */}
        <div className="bg-white shadow-lg rounded-2xl p-6">
          <h1 className="text-3xl font-bold text-blue-700 mb-2">RouteAware Dashboard</h1>
          <p className="text-gray-600">At-a-glance access to your tracking and planning tools.</p>
        </div>

        {/* Navigation Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {cards.map(({ href, icon, title, description }) => (
            <Link
              key={href}
              href={href}
              className="bg-white rounded-xl shadow hover:shadow-md p-4 flex items-start space-x-4 transition"
            >
              {icon}
              <div>
                <h2 className="font-semibold text-sm">{title}</h2>
                <p className="text-gray-500 text-xs">{description}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Extras */}
        <div className="space-y-4">
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded text-blue-900">
            🌤️ Current national average: <strong>72°F</strong> with <strong>light wind</strong> reported in most regions.
          </div>

          <div className="bg-white shadow rounded p-4">
            <h3 className="text-sm font-semibold mb-1 text-gray-700">🧠 Did You Know?</h3>
            <p className="text-xs text-gray-500">
              RouteAware pulls alerts straight from the National Weather Service, so you’ll never miss a major weather risk.
            </p>
          </div>

          <div className="bg-white shadow rounded p-4">
            <h3 className="text-sm font-semibold mb-2 text-gray-700">🧭 Recent Routes</h3>
            <ul className="text-xs text-gray-600 space-y-1">
              <li>• Atlanta → Chicago (3 days ago)</li>
              <li>• Dallas → Phoenix (5 days ago)</li>
              <li>• Miami → Charlotte (last week)</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}