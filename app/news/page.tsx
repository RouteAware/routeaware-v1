export const dynamic = 'force-dynamic'; // Ensure SSR on Vercel edge

import React from 'react';

type RSSItem = {
  title: string;
  link: string;
  pubDate: string;
  contentSnippet?: string;
  content?: string;
};

export default async function NewsPage() {
  const feeds = [
    'https://www.freightwaves.com/feed',
    'https://www.truckinginfo.com/rss/all.aspx',
    'https://www.transportdive.com/feeds/news/',
    'https://www.ttnews.com/rss/front/rss.xml',
  ];

  const articles: RSSItem[] = [];

  try {
    const feedPromises = feeds.map(feed =>
      fetch(`/api/rss?url=${encodeURIComponent(feed)}`).then(res => res.json())
    );
    const feedResults = await Promise.all(feedPromises);

    feedResults.forEach(result => {
      if (Array.isArray(result.items)) {
        articles.push(...(result.items as RSSItem[]));
      }
    });

    articles.sort(
      (a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
    );
  } catch (err) {
    console.error('Failed to load feeds:', err);
  }

  return (
    <div className="bg-white shadow-lg rounded-2xl p-6">
      <h1 className="text-2xl font-bold mb-4 text-blue-700">🚛 Industry News</h1>
      {articles.length === 0 ? (
        <p className="text-gray-600">No articles available.</p>
      ) : (
        <div className="grid gap-4">
          {articles.map((article, idx) => (
            <div
              key={idx}
              className="border border-gray-200 p-4 rounded-xl hover:shadow transition bg-gray-50"
            >
              <h2 className="text-lg font-semibold text-blue-800 mb-1">
                <a
                  href={article.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  {article.title}
                </a>
              </h2>
              <p className="text-sm text-gray-600 mb-1">
                {article.pubDate
                  ? new Date(article.pubDate).toLocaleString()
                  : 'No date'}
              </p>
              <p className="text-sm text-gray-800 line-clamp-3">
                {article.contentSnippet || article.content || 'No summary available.'}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}