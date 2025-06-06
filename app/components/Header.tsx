'use client';

import React from 'react';
import Image from 'next/image'; // ✅ Make sure this is used

const Header = () => {
  return (
    <header className="w-full bg-white shadow-md px-6 py-4 mb-6 flex flex-col md:flex-row md:items-center md:justify-between rounded-b-xl">
      <Image
        src="/logo.png"
        alt="RouteAware Logo"
        width={200}
        height={60}
        className="h-auto w-auto"
      />
    </header>
  );
};

export default Header;