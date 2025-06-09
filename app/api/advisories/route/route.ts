// File: app/api/advisories/route/route.ts

import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const sw = searchParams.get('sw');
  const ne = searchParams.get('ne');
  if (!sw || !ne) {
    return NextResponse.json([], { status: 400 });
  }
  const [swLat, swLng] = sw.split(',').map(Number);
  const [neLat, neLng] = ne.split(',').map(Number);
  const nwsUrl =
    `https://api.weather.gov/alerts/active?boundingBox=${swLat},${swLng},${neLat},${neLng}`;

  try {
    const res = await fetch(nwsUrl);
    if (!res.ok) {
      console.error('NWS API error', res.statusText);
      return NextResponse.json([], { status: 502 });
    }
    const data = await res.json();
    const advisories = (data.features || [])
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  .map((f: any) => f.properties.headline || f.properties.event)
  .filter(Boolean);
    return NextResponse.json(advisories);
  } catch (err) {
    console.error('Error fetching NWS alerts', err);
    return NextResponse.json([], { status: 500 });
  }
}
