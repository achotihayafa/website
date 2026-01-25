// Add or update this file to enable static export with Next.js 13+
// See: https://nextjs.org/docs/app/building-your-application/deploying/static-exports

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,    // Required for static export
  reactStrictMode: true,
};

export default nextConfig;

// Rename this file to: next.config.cjs