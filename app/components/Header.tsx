'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Header = () => {
  return (
    <header className="w-full bg-white shadow-md px-6 py-4 mb-6 flex flex-col md:flex-row md:items-center md:justify-between rounded-b-xl">
      <Link href="/" className="flex items-center space-x-3">
        <img
  src="/logo.png"
  alt="RouteAware Logo"
  className="h-16 md:h-20 lg:h-24 w-auto"
/>
      </Link>
      <p className="text-sm text-gray-600 mt-2 md:mt-0">
        Be RouteAware. Plan safer. Drive smarter.
      </p>
    </header>
  );
};

export default Header;