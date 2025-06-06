'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Header = () => {
  return (
    <header className="w-full bg-white shadow-md px-6 py-2 mb-4 flex flex-col md:flex-row md:items-center md:justify-between rounded-b-xl">
      {/* Logo linked to home */}
      <Link href="/" passHref>
        <Image
          src="/logo.png"
          alt="RouteAware Logo"
          width={120}
          height={40}
          className="h-auto w-auto cursor-pointer"
        />
      </Link>

      {/* Nav Links */}
      <nav className="mt-2 md:mt-0 space-x-4 text-sm text-blue-700 font-medium flex flex-wrap justify-start md:justify-end">
        <Link href="/">Home</Link>
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/about-us">About</Link>
        <Link href="/settings">Settings</Link>
        <Link href="/profile">Profile</Link>
        <Link href="/coming-soon">Coming Soon</Link>
        <Link href="/all-active-advisories">Advisories</Link>
        <Link href="/all-available-traffic-cams">Traffic Cams</Link>
        <Link href="/saved-loads">Saved Loads</Link>
      </nav>
    </header>
  );
};

export default Header;