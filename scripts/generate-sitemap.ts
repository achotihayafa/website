// scripts/generate-sitemap.ts
import fs from 'fs';
import mappingData from '../utils/episode-mapping.json';

async function generate() {
  const SITE_URL = 'https://achotihayafa.com';
  const currentDate = new Date().toISOString().split('T')[0];

  // Pull slugs directly from your official mapping
  const episodeUrls = mappingData.episodes.map(ep => {
    return `
      <url>
        <loc>${SITE_URL}/episodes/${ep.slug}</loc>
        <lastmod>${currentDate}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
      </url>
    `;
  }).join('');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>${SITE_URL}/</loc>
        <lastmod>${currentDate}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>1.0</priority>
      </url>
      <url>
        <loc>${SITE_URL}/episodes</loc>
        <lastmod>${currentDate}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.9</priority>
      </url>
      
      ${episodeUrls}
    </urlset>`;

  // Ensure the formatting is clean and write to public folder
  const formattedSitemap = sitemap.replace(/>\s+</g, '><').trim();
  
  fs.writeFileSync('public/sitemap.xml', formattedSitemap);
  console.log(`✅ Sitemap generated with ${mappingData.episodes.length} episodes!`);
}

generate();