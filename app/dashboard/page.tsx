'use client';

export const dynamic = "force-dynamic";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ForecastMap from '../components/ForecastMap';
import {
  FaExclamationTriangle,
  FaRoad,
  FaPlaneDeparture,
  FaShip,
  FaNewspaper,
  FaCog,
  FaUser,
  FaInfoCircle,
  FaTachometerAlt,
} from 'react-icons/fa';

export default function DashboardPage() {
  const cards = [
    {
      href: '/dashboard',
      icon: <FaTachometerAlt className="text-blue-500 text-xl" />,
      title: 'Dashboard',
      description: 'Return to overview',
    },
    {
      href: '/',
      icon: <FaRoad className="text-green-600 text-xl" />,
      title: 'Over the Road',
      description: 'Plan optimized truck routes',
    },
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
      href: '/profile',
      icon: <FaUser className="text-gray-600 text-xl" />,
      title: 'Profile',
      description: 'Your saved loads and routes',
    },
    {
      href: '/about-us',
      icon: <FaInfoCircle className="text-gray-500 text-xl" />,
      title: 'About',
      description: 'Learn more about RouteAware',
    },
    {
      href: '/settings',
      icon: <FaCog className="text-gray-700 text-xl" />,
      title: 'Settings',
      description: 'Customize your experience',
    },
  ];

  const mockArticles = [
    {
      title: 'Severe Weather Threatens Midwest Freight Corridors',
      date: 'Today',
    },
    {
      title: 'Port of LA Expands Gate Hours Amid Congestion',
      date: 'Yesterday',
    },
    {
      title: 'FMCSA Proposes New Hours of Service Exemptions',
      date: '2 days ago',
    },
    {
      title: 'Storms Expected Across Plains Over Weekend',
      date: '3 days ago',
    },
    {
      title: 'Diesel Prices Dip as Supply Rebounds',
      date: '5 days ago',
    },
    {
      title: 'AI Tools Like RouteAware Gaining Industry Attention',
      date: 'Last week',
    },
  ];

  const mockLoads = [
    'Load 12984 – Chicago → Atlanta (Delivered Yesterday)',
    'Load 13002 – Dallas → Charlotte (In Transit)',
    'Load 13017 – Nashville → Denver (Pickup Today)',
  ];

  const mockAdvisories = [
    '⛈️ Severe Thunderstorm Warning – Dallas County, TX (Until 6:30 PM)',
    '🌊 Flash Flood Watch – Cincinnati, OH (Through Tonight)',
    '💨 High Wind Advisory – Kansas City, MO (Gusts up to 55 MPH)',
  ];

  return (
    <main className="min-h-screen bg-gray-100 text-gray-900 px-6 pt-4 pb-2">
      <div className="max-w-6xl mx-auto space-y-5 pb-4">
        {/* Header with larger logo */}
        <div className="bg-white shadow-lg rounded-2xl px-6 py-3 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-blue-700 mb-1">RouteAware Dashboard</h1>
            <p className="text-gray-600 text-sm">At-a-glance access to your tracking and planning tools.</p>
          </div>
          <Image src="/logo.png" alt="RouteAware Logo" width={140} height={140} />
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

        {/* Forecast Weather Map */}
        <div className="bg-white shadow rounded p-4">
          <h3 className="font-semibold mb-2 text-blue-700 text-sm">🌧️ Precipitation Forecast (±6 hours)</h3>
          <ForecastMap />
        </div>

        {/* Extras */}
        <div className="space-y-3">
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded text-blue-900 text-sm">
            🌤️ Current national average: <strong>72°F</strong> with <strong>light wind</strong> reported in most regions.
          </div>

          <div className="bg-white shadow rounded p-4 text-sm">
            <h3 className="font-semibold mb-1 text-gray-700">🧠 Did You Know?</h3>
            <p className="text-gray-500">
              RouteAware pulls alerts straight from the National Weather Service, so you’ll never miss a major weather risk.
            </p>
          </div>

          <div className="bg-white shadow rounded p-4 text-sm">
            <h3 className="font-semibold mb-2 text-red-700">🚨 Active Weather Advisories</h3>
            <ul className="text-gray-700 space-y-1 list-disc list-inside text-xs">
              {mockAdvisories.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="bg-white shadow rounded p-4 text-sm">
            <h3 className="font-semibold mb-2 text-blue-700">📦 Recent Loads</h3>
            <ul className="text-gray-700 space-y-1 list-disc list-inside text-xs">
              {mockLoads.map((load, index) => (
                <li key={index}>{load}</li>
              ))}
            </ul>
          </div>

          <div className="bg-white shadow rounded p-4 text-sm">
            <h3 className="font-semibold mb-2 text-gray-700">📰 Recent News</h3>
            <ul className="text-gray-600 space-y-1 list-disc list-inside text-xs">
              {mockArticles.map((article, index) => (
                <li key={index}>
                  <strong>{article.title}</strong>{' '}
                  <span className="text-gray-400">({article.date})</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}