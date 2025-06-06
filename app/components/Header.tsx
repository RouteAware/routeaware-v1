'use client';

import React from 'react';

const Header = () => {
  return (
    <header className="w-full bg-white shadow-md px-6 py-4 mb-6 flex flex-col md:flex-row md:items-center md:justify-between rounded-b-xl">
      <h1 className="text-2xl font-bold text-blue-700">RouteAware</h1>
      <p className="text-sm text-gray-600 mt-1 md:mt-0">Be RouteAware. Plan safer. Drive smarter.</p>
    </header>
  );
};

export default Header;