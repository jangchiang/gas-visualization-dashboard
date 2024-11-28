/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    domains: ['localhost']
  },
  // Remove output: 'standalone' and env.PORT since we're using PM2
};

module.exports = nextConfig;