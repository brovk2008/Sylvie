/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@sylvie/fashion-ontology'],
  images: {
    domains: ['images.unsplash.com'],
  },
};

module.exports = nextConfig;
