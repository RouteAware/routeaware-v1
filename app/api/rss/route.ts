import { NextResponse } from 'next/server';
import Parser from 'rss-parser';

const parser = new Parser();

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get('url');

  if (!url) {
    return NextResponse.json({ error: 'Missing RSS URL' }, { status: 400 });
  }

  try {
    const feed = await parser.parseURL(url);
    return NextResponse.json(feed);
  } catch (error) {
    console.error('Error parsing RSS:', error);
    return NextResponse.json({ error: 'Failed to parse RSS feed' }, { status: 500 });
  }
}