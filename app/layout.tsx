import './globals.css';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Header from './components/Header';
import Footer from './components/Footer';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'RouteAware',
  description: 'Plan smarter routes with real-time weather, traffic, air cargo, and drayage tracking.',
  icons: {
    icon: '/favicon.ico',
  },
  metadataBase: new URL('https://berouteaware.com'),
  openGraph: {
    title: 'RouteAware',
    description: 'Plan smarter routes with real-time weather, traffic, air cargo, and drayage tracking.',
    url: 'https://berouteaware.com',
    siteName: 'RouteAware',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'RouteAware Logo and Slogan',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RouteAware',
    description: 'Plan smarter routes with live weather, traffic alerts, and tracking tools.',
    images: ['/og-image.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Header />
        <main className="min-h-screen bg-gray-100 text-gray-900 p-6">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}