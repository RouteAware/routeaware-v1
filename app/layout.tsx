import './globals.css';
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Script from 'next/script';
import Footer from './components/Footer';
import { ClientWrapper } from './components/ClientWrapper';
import { ReactNode } from 'react';

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
  metadataBase: new URL('https://berouteaware.com'),
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
    other: [
      { rel: 'icon', url: '/favicon-16x16.png', sizes: '16x16' },
      { rel: 'icon', url: '/favicon-32x32.png', sizes: '32x32' },
    ],
  },
  openGraph: {
    title: 'RouteAware',
    description: 'Plan smarter routes with real-time weather, traffic, air cargo, and drayage tracking.',
    url: 'https://berouteaware.com',
    siteName: 'RouteAware',
    images: [
      {
        url: 'https://berouteaware.com/og-image.png',
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
    images: ['https://berouteaware.com/og-image.png'],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
          crossOrigin="anonymous"
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ClientWrapper>{children}</ClientWrapper>
        <Footer />
        <Analytics /> {/* ✅ Analytics enabled */}
        <SpeedInsights /> {/* ✅ Vercel Speed Insights enabled */}
      </body>
    </html>
  );
}