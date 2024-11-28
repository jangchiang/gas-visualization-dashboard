/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  env: {
    PORT: 3002  // Internal port for Node.js
  },
  images: {
    unoptimized: true,
    domains: ['localhost']
  },
  output: 'standalone',
  experimental: {
    largePageDataBytes: 128 * 100000,
  },
};

module.exports = nextConfig;