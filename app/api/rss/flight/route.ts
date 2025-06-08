// /app/api/flight/route.ts
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const rawFlight = searchParams.get('flight'); // e.g. "AAL123"

  if (!rawFlight) {
    return NextResponse.json({ error: 'Missing flight number' }, { status: 400 });
  }

  // Format the callsign: uppercase and pad to 8 characters with spaces
  const callsign = rawFlight.toUpperCase().padEnd(8, ' ');

  const clientId = process.env.OPENSKY_CLIENT_ID!;
  const clientSecret = process.env.OPENSKY_CLIENT_SECRET!;

  try {
    // STEP 1: Get access token from OpenSky
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

    // STEP 2: Use access token to fetch flights matching the formatted callsign
    const now = Math.floor(Date.now() / 1000);
    const past = now - 6 * 60 * 60; // look back 6 hours

    const url = `https://opensky-network.org/api/flights/callsign?callsign=${encodeURIComponent(
      callsign
    )}&begin=${past}&end=${now}`;

    const flightsRes = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!flightsRes.ok) {
      throw new Error(`Flight data fetch failed with status ${flightsRes.status}`);
    }

    const flightData = await flightsRes.json();
    return NextResponse.json({ flights: flightData });

  } catch (err) {
    console.error('Flight API error:', err);
    return NextResponse.json({ error: 'Internal error while fetching flight data' }, { status: 500 });
  }
}