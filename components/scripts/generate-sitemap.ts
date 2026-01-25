// scripts/generate-sitemap.ts
import fs from 'fs';
import { fetchRssFeed } from '../utils/rssParser';

async function generate() {
  const episodes = await fetchRssFeed();
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url><loc>https://achotihayafa.com/</loc></url>
      <url><loc>https://achotihayafa.com/episodes</loc></url>
      ${episodes.map(ep => `
        <url>
          <loc>https://achotihayafa.com/episodes/${encodeURIComponent(ep.title.replace(/\s+/g, '-'))}</loc>
        </url>
      `).join('')}
    </urlset>`;

  fs.writeFileSync('public/sitemap.xml', sitemap);
  console.log('✅ Sitemap generated!');
}

generate();