// next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Add port configuration
  env: {
    PORT: 8807
  },
  images: {
    unoptimized: true,
    domains: ['localhost']
  },
  // Add output configuration for production
  output: 'standalone',
  // Add experimental features if needed
  experimental: {
    serverActions: true,
  },
  // Add webpack configuration for CSV files
  webpack: (config) => {
    config.module.rules.push({
      test: /\.csv$/,
      loader: 'csv-loader',
      options: {
        dynamicTyping: true,
        header: true,
        skipEmptyLines: true
      }
    });
    return config;
  },
};

module.exports = nextConfig;