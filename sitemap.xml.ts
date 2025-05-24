// Remove any export default or React component export from this file.
// This file should only export getServerSideProps and nothing else for a working dynamic sitemap in Next.js.

export const getServerSideProps = async ({ res }: { res: any }) => {
  const SITE_URL = 'https://achotihayafa.com';

  // Static pages
  const staticPages = [
    '',
    '/episodes',
  ].map((path) => `${SITE_URL}${path}`);

  // Dynamic episode pages
  let episodeUrls: string[] = [];
  try {
    const { fetchRssFeed } = await import('../utils/rssParser');
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
    episodeUrls = [];
  }

  const urls = [...staticPages, ...episodeUrls];

  res.setHeader('Content-Type', 'application/xml');
  res.write(
    `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `<url>
  <loc>${url}</loc>
</url>`
  )
  .join('\n')}
</urlset>`
  );
  res.end();

  return { props: {} };
};

