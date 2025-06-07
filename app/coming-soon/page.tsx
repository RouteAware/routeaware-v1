'use client';

import React from 'react';

const ComingSoonPage = () => {
  const features = [
    {
      title: 'Saved Loads & Routes',
      items: [
        'Save and name frequently used loads',
        'Track active weather and traffic along saved routes',
        'Receive automated email alerts when route conditions change',
        'Custom pickup and delivery windows with ETA calculations',
      ],
    },
    {
      title: 'Route-Aware Weather Intelligence',
      items: [
        'Real-time advisories filtered by your exact route',
        'Daily high/low temperature range forecast',
        'Overnight lows at estimated break point',
        'Weather risk scoring and icon indicators',
        'Weather layer overlay (precipitation, wind, clouds, temp)',
      ],
    },
    {
      title: 'Traffic & Navigation Enhancements',
      items: [
        'Live traffic delay calculations',
        'Toggleable traffic cam map overlay',
        'Clickable alerts and road closures by severity',
        'Distance-based break planning',
      ],
    },
    {
      title: 'Driver & Logistics Tools',
      items: [
        'Driver hours remaining input and tracking',
        'Estimated break city generator (based on drive limits)',
        'Pickup/delivery countdown timers',
        'Mileage-per-day ETA with rest planning',
      ],
    },
    {
      title: 'Shipper/Receiver Insights',
      items: [
        'Save favorite shipper and receiver addresses',
        'Add notes about dock behavior, flexibility, and hours',
        'User-submitted reviews and tags',
        'Show open hours and contact info on route',
      ],
    },
    {
      title: 'Local Services',
      items: [
        'Nearby lumper services based on load location',
        'Lumper contact info and reviews',
        'Trailer yard listings with secure/unsecured status',
        'Truck stop map layer with amenities filter',
      ],
    },
    {
      title: 'User Account & Experience',
      items: [
        'Dark/Light/System mode toggle',
        'Metric/Imperial units and 12h/24h format switch',
        'Screen brightness control for night driving',
        'Profile management & fleet account integration',
      ],
    },
    {
      title: 'Platform Features',
      items: [
        'Web-based version for dispatchers & operations managers',
        'Push/email notifications for saved load conditions',
        'Enterprise login and account team sharing',
        'Ad-free experience for subscribers',
      ],
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-center">Coming Soon to RouteAware</h1>
      <p className="text-gray-700 mb-6 text-center">
        We’re hard at work building the future of logistics intelligence. Below is a full look at the features actively in development or on the near-term roadmap.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {features.map((section, index) => (
          <div key={index} className="bg-gray-50 p-4 rounded-lg border border-gray-200 shadow-sm">
            <h2 className="text-xl font-semibold mb-2 text-blue-800">{section.title}</h2>
            <ul className="list-disc list-inside text-sm text-gray-800 space-y-1">
              {section.items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <p className="text-center text-xs text-gray-400 mt-10">
        Feature roadmap updated June 2025 · v1.0 MVP Live
      </p>
    </div>
  );
};

export default ComingSoonPage;