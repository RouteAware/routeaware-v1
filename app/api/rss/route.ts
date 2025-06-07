import { NextResponse } from 'next/server';
import Parser from 'rss-parser';

const parser = new Parser();

const feeds = [
  'https://www.freightwaves.com/feed',
  'https://www.truckinginfo.com/rss/all',
  'https://www.transportdive.com/rss/',
];

export async function GET() {
  try {
    const allFeedItems = await Promise.all(
      feeds.map(async (url) => {
        const feed = await parser.parseURL(url);
        return feed.items.map(item => ({
          title: item.title,
          link: item.link,
          pubDate: item.pubDate,
          source: feed.title,
        }));
      })
    );

    const merged = allFeedItems.flat().sort((a, b) =>
      new Date(b.pubDate || '').getTime() - new Date(a.pubDate || '').getTime()
    );

    return NextResponse.json({ items: merged.slice(0, 25) }); // limit to 25
  } catch (error) {
    console.error('RSS Fetch Error:', error);
    return NextResponse.json({ error: 'Failed to fetch news.' }, { status: 500 });
  }
}