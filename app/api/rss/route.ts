// File: app/api/rss/route.ts

import Parser from 'rss-parser';
import { NextResponse } from 'next/server';

const parser = new Parser();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');

  if (!url) {
    return NextResponse.json({ error: 'Missing feed URL' }, { status: 400 });
  }

  try {
    const feed = await parser.parseURL(url);
    return NextResponse.json({ items: feed.items });
  } catch (err) {
    console.error('RSS Fetch Error:', err);
    return NextResponse.json({ error: 'Failed to fetch or parse feed' }, { status: 500 });
  }
}