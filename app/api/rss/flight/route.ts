// /app/api/flight/route.ts
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const rawFlight = searchParams.get('flight');

  if (!rawFlight) {
    return NextResponse.json({ error: 'Missing flight number' }, { status: 400 });
  }

  // Always pad to 8 characters
  const callsign = rawFlight.trim().toUpperCase().padEnd(8, ' ');
  console.log('🔎 Searching for:', JSON.stringify(callsign));

  const clientId = process.env.OPENSKY_CLIENT_ID!;
  const clientSecret = process.env.OPENSKY_CLIENT_SECRET!;

  try {
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

    const now = Math.floor(Date.now() / 1000);
    const past = now - 6 * 60 * 60;

    const flightsRes = await fetch(
      `https://opensky-network.org/api/flights/callsign?callsign=${encodeURIComponent(callsign)}&begin=${past}&end=${now}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const raw = await flightsRes.text();

    if (!flightsRes.ok) {
      console.error('🛑 OpenSky error response:', raw);
      return NextResponse.json({ error: raw }, { status: flightsRes.status });
    }

    const flightData = JSON.parse(raw);
    return NextResponse.json({ flights: flightData });

  } catch (err) {
    console.error('Flight API error:', err);
    return NextResponse.json({ error: 'Internal error while fetching flight data' }, { status: 500 });
  }
}