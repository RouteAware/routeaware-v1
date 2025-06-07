'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Header = () => {
  return (
    <header className="w-full bg-white shadow-md px-6 py-4 mb-6 rounded-b-2xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" passHref aria-label="RouteAware Home">
          <div className="flex items-center space-x-2 cursor-pointer">
            <Image
              src="/logo.png"
              alt="RouteAware Logo"
              width={120}
              height={40}
              className="h-auto w-auto"
              priority
            />
          </div>
        </Link>

        {/* Navigation */}
        <nav className="flex flex-wrap justify-center md:justify-end items-center gap-3 text-sm font-medium text-blue-700">
          <Link href="/" className="hover:underline transition">Home</Link>
          <Link href="/dashboard" className="hover:underline transition">Dashboard</Link>
          <Link href="/news" className="hover:underline transition">News</Link> {/* ✅ New Link */}
          <Link href="/saved-loads" className="hover:underline transition">Saved Loads</Link>
          <Link href="/all-active-advisories" className="hover:underline transition">Advisories</Link>
          <Link href="/all-available-traffic-cams" className="hover:underline transition">Traffic Cams</Link>
          <Link href="/profile" className="hover:underline transition">Profile</Link>
          <Link href="/settings" className="hover:underline transition">Settings</Link>
          <Link href="/about-us" className="hover:underline transition">About</Link>
          <Link href="/coming-soon" className="hover:underline transition">Coming Soon</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;