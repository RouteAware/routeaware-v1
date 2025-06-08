// /app/api/flight/route.ts
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

type FlightState = [
  icao24: string,
  callsign: string | null,
  origin_country: string,
  time_position: number | null,
  last_contact: number,
  longitude: number | null,
  latitude: number | null,
  baro_altitude: number | null,
  on_ground: boolean,
  velocity: number | null,
  true_track: number | null,
  vertical_rate: number | null,
  sensors: number[] | null,
  geo_altitude: number | null,
  squawk: string | null,
  spi: boolean,
  position_source: number,
  category?: number
];

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const rawFlight = searchParams.get('flight');

  if (!rawFlight) {
    return NextResponse.json({ error: 'Missing flight number' }, { status: 400 });
  }

  const callsign = rawFlight.trim().toUpperCase();

  const clientId = process.env.OPENSKY_CLIENT_ID!;
  const clientSecret = process.env.OPENSKY_CLIENT_SECRET!;

  try {
    // Step 1: Get access token
    const tokenRes = await fetch('https://opensky-network.org/oauth2/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: clientId,
        client_secret: clientSecret,
      }),
    });

    const tokenData = await tokenRes.json();
    const accessToken = tokenData.access_token;

    if (!accessToken) {
      return NextResponse.json({ error: 'Authentication failed' }, { status: 500 });
    }

    // Step 2: Fetch all state vectors
    const res = await fetch('https://opensky-network.org/api/states/all', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!res.ok) {
      return NextResponse.json({ error: 'Failed to fetch aircraft states' }, { status: 500 });
    }

    const { states }: { states: FlightState[] } = await res.json();

    // Filter matching flights by callsign
    const matched = (states || []).filter(
      (s) => s[1] && s[1].toUpperCase().includes(callsign)
    );

    return NextResponse.json({ flights: matched });
  } catch (err) {
    console.error('Flight fetch error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}