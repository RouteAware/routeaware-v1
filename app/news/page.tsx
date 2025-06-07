'use client';

import React, { useEffect, useState } from 'react';

type RSSItem = {
  title: string;
  link: string;
  pubDate: string;
  contentSnippet?: string;
  content?: string;
};

export default function NewsPage() {
  const [articles, setArticles] = useState<RSSItem[]>([]);
  const [loading, setLoading] = useState(true);

  const feeds: string[] = [
    'https://www.freightwaves.com/feed',
    'https://www.truckinginfo.com/rss/all.aspx',
    'https://www.transportdive.com/feeds/news/',
    'https://www.ttnews.com/rss/front/rss.xml',
  ];

  useEffect(() => {
    const fetchFeeds = async () => {
      try {
        const allArticles: RSSItem[] = [];

        for (const feed of feeds) {
          const response = await fetch(`/api/rss?url=${encodeURIComponent(feed)}`);
          const result = await response.json();
          if (result.items) allArticles.push(...result.items);
        }

        allArticles.sort(
          (a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
        );

        setArticles(allArticles);
      } catch (err) {
        console.error('Error fetching feeds:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFeeds();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // feeds is static and won't change, so safe to skip

  return (
    <div className="bg-white shadow-lg rounded-2xl p-6">
      <h1 className="text-2xl font-bold mb-4 text-blue-700">🚛 Industry News</h1>
      {loading ? (
        <p className="text-gray-600">Loading news...</p>
      ) : articles.length === 0 ? (
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