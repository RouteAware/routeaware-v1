'use client';

import React from 'react';
import Image from 'next/image';

const Header = () => {
  return (
    <header className="w-full bg-white shadow-md px-6 py-2 mb-4 flex flex-col md:flex-row md:items-center md:justify-between rounded-b-xl">
      <Image
        src="/logo.png"
        alt="RouteAware Logo"
        width={120}   // ⬅️ Adjusted from 200 to 120
        height={40}
        className="h-auto w-auto"
      />
    </header>
  );
};

export default Header;