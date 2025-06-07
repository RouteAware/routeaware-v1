// app/api/track-ship/route.ts
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const vessel = searchParams.get('vessel');

  if (!vessel) {
    return NextResponse.json({ error: 'Missing vessel or IMO number' }, { status: 400 });
  }

  // Simulated mock response for now
  const mockData = {
    vessel: vessel.toUpperCase(),
    status: 'En Route',
    location: {
      lat: 36.7783,
      lon: -122.417,
    },
    origin: 'Los Angeles (USLAX)',
    destination: 'Shanghai (CNSHA)',
    eta: '2025-06-11T12:00:00Z',
    lastUpdated: new Date().toISOString(),
  };

  return NextResponse.json(mockData);
}