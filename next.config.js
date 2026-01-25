/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // This ensures all links start with ./ instead of / 
  // making the site "location-agnostic"
  trailingSlash: true, 
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;