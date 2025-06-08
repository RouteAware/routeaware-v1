'use client';

import { usePathname } from 'next/navigation';
import Header from './Header';

export function ClientWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <>
      {pathname !== '/dashboard' && <Header />}
      <main className="min-h-screen bg-gray-100 text-gray-900 p-6">{children}</main>
    </>
  );
}