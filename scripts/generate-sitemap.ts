import { fetchRssFeed } from '../utils/rssParser';
import fs from 'fs';
import path from 'path';

const SITE_URL = 'https://achotihayafa.com';

async function generateSitemap() {
  // Static pages
  const staticPages = [
    '',
    '/episodes',
  ].map((p) => `${SITE_URL}${p}`);

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
  } catch {
    episodeUrls = [];
  }

  const urls = [...staticPages, ...episodeUrls];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `<url>
  <loc>${url}</loc>
</url>`
  )
  .join('\n')}
</urlset>`;

  const outPath = path.join(process.cwd(), 'public', 'sitemap.xml');
  fs.writeFileSync(outPath, xml, 'utf8');
  // eslint-disable-next-line no-console
  console.log('Sitemap generated at', outPath);
}

generateSitemap();

