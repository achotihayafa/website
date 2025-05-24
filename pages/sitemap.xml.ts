// ...sitemap.xml.ts - Next.js API route for dynamic sitemap generation...

import { NextApiRequest, NextApiResponse } from 'next';
import { fetchRssFeed } from '../utils/rssParser';

const SITE_URL = 'https://achotihayafa.com';

function generateSitemap(urls: string[]) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `<url>
  <loc>${url}</loc>
</url>`
  )
  .join('\n')}
</urlset>`;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Static pages
  const staticPages = [
    '',
    '/episodes',
  ].map((path) => `${SITE_URL}${path}`);

  // Dynamic episode pages
  let episodeUrls: string[] = [];
  try {
    const episodes = await fetchRssFeed();
    episodeUrls = episodes.map((ep: any) => {
      let id = ep.id;
      if (typeof id === 'object' && id !== null) {
        const obj = id as Record<string, unknown>;
        if ('_' in obj) id = obj._ as string;
        else if ('$' in obj) id = obj.$ as string;
        else id = String(id);
      }
      return `${SITE_URL}/episodes/${id}`;
    });
  } catch (e) {
    // fallback: no dynamic episodes
    episodeUrls = [];
  }

  const urls = [...staticPages, ...episodeUrls];

  res.setHeader('Content-Type', 'application/xml');
  res.write(generateSitemap(urls));
  res.end();
}
