// /app/api/flight/route.ts
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

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

    // Step 2: Search state vectors for callsign
    const res = await fetch('https://opensky-network.org/api/states/all', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!res.ok) {
      return NextResponse.json({ error: 'Failed to fetch aircraft states' }, { status: 500 });
    }

    const { states } = await res.json();

    // Filter matching flights by callsign (partial match allowed)
    const matched = (states || []).filter(
      (s: any[]) => s[1] && s[1].toUpperCase().includes(callsign)
    );

    return NextResponse.json({ flights: matched });
  } catch (err) {
    console.error('Flight fetch error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}