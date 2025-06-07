'use client';

import React from 'react';
import Image from 'next/image';
import logo from '@/public/logo.png'; // Update this path if your logo is located elsewhere

const AboutUs = () => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 max-w-4xl mx-auto">
      <div className="flex justify-center mb-4">
        <Image src={logo} alt="RouteAware Logo" width={100} height={100} />
      </div>

      <h1 className="text-3xl font-bold mb-4 text-center">About RouteAware</h1>

      <p className="mb-4 text-gray-800 leading-relaxed">
        RouteAware was born out of a simple but urgent need: making routes safer, smarter, and more predictable
        for the people who power our supply chain. Founded by a logistics specialist with deep family ties to
        aviation and freight, RouteAware is more than an app—it&apos;s a tool built from firsthand experience in the
        transportation world.
      </p>

      <p className="mb-4 text-gray-800 leading-relaxed">
        After years of managing high-value component repairs, coordinating freight across continents, and hearing
        stories from drivers delayed by snowstorms, traffic jams, or closed docks, we saw a gap. Most routing tools
        were designed for navigation—not for real-time decision-making based on weather, traffic, and operational
        timing. RouteAware closes that gap.
      </p>

      <p className="mb-4 text-gray-800 leading-relaxed">
        Whether you&apos;re an account manager keeping freight on time or a driver navigating unpredictable roads,
        RouteAware helps you stay informed with live traffic overlays, severe weather alerts, estimated arrival
        times, and even route-specific break suggestions. From small fleets to large logistics teams, we&apos;re building
        RouteAware to become the trusted sidekick for smarter freight movement.
      </p>

      <p className="mb-4 text-gray-800 leading-relaxed">
        Built in the U.S. with a focus on American infrastructure, RouteAware integrates public data like the National
        Weather Service and combines it with your real-time route to offer proactive insights that help reduce delays,
        minimize risk, and increase efficiency.
      </p>

      <p className="mb-4 text-gray-800 leading-relaxed">
        Thank you for joining us on this journey. Our mission is simple: help you Be RouteAware—every mile of the way.
      </p>

      <p className="text-sm text-gray-500 italic text-center">&mdash; The RouteAware Team</p>
    </div>
  );
};

export default AboutUs;