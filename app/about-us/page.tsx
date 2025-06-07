'use client';

import React from 'react';
import Image from 'next/image';

const AboutUs = () => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 max-w-4xl mx-auto text-center">
      {/* Logo */}
      <div className="flex justify-center mb-6">
        <Image
          src="/logo.png" // Make sure this file is in your /public folder
          alt="RouteAware Logo"
          width={500}
          height={500}
          priority
        />
      </div>

      <h1 className="text-3xl font-bold mb-4 text-blue-700">About our company</h1>

      <p className="mb-4 text-gray-800 leading-relaxed text-left">
        RouteAware was born out of a simple but urgent need: making routes safer, smarter, and more predictable
        for the people who power our supply chain. Founded by a logistics specialist with deep family ties to
        aviation and freight, RouteAware is more than an app—it's a tool built from firsthand experience in the
        transportation world.
      </p>

      <p className="mb-4 text-gray-800 leading-relaxed text-left">
        After years of managing high-value component repairs, coordinating freight across continents, and hearing
        stories from drivers delayed by snowstorms, traffic jams, or closed docks, we saw a gap. Most routing tools
        were designed for navigation—not for real-time decision-making based on weather, traffic, and operational
        timing. RouteAware closes that gap.
      </p>

      <p className="mb-4 text-gray-800 leading-relaxed text-left">
        Whether you're an account manager keeping freight on time or a driver navigating unpredictable roads,
        RouteAware helps you stay informed with live traffic overlays, severe weather alerts, estimated arrival
        times, and even route-specific break suggestions. From small fleets to large logistics teams, we’re building
        RouteAware to become the trusted sidekick for smarter freight movement.
      </p>

      <p className="mb-4 text-gray-800 leading-relaxed text-left">
        Built in the U.S. with a focus on American infrastructure, RouteAware integrates public data like the National
        Weather Service and combines it with your real-time route to offer proactive insights that help reduce delays,
        minimize risk, and increase efficiency.
      </p>

      <p className="mb-4 text-gray-800 leading-relaxed text-left">
        Thank you for joining us on this journey. Our mission is simple: help you Be RouteAware&mdash;every mile of the way.
      </p>

      <p className="text-sm text-gray-500 italic text-left">&mdash; The RouteAware Team</p>
    </div>
  );
};

export default AboutUs;