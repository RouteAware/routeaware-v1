import Parser from 'rss-parser';
import { NextRequest, NextResponse } from 'next/server';

const parser = new Parser();

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
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