'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const navItems = [
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Over the Road', href: '/' },
  { label: 'Air Cargo', href: '/air-cargo' },
  { label: 'Drayage', href: '/drayage' },
  { label: 'News', href: '/news' },                // ✅ Inserted here
  { label: 'Profile', href: '/profile' },
  { label: 'About', href: '/about-us' },
  { label: 'Advisories', href: '/all-active-advisories' },
  { label: 'Settings', href: '/settings' },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-screen-xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.png"
            alt="RouteAware Logo"
            width={200} // ⬅️ 3x size
            height={200}
          />
        </Link>
        <nav className="flex space-x-6">
          {navItems.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className={clsx(
                'text-sm font-medium hover:text-blue-700 transition',
                pathname === href ? 'text-blue-700 underline' : 'text-gray-700'
              )}
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}