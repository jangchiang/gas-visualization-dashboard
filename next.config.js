/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  env: {
    PORT: 8807
  },
  images: {
    unoptimized: true,
    domains: ['localhost']
  },
  output: 'standalone',
  experimental: {
    serverActions: true,
  },
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
  // Add this for handling large files
  experimental: {
    largePageDataBytes: 128 * 100000, // Increase the limit to 12.8MB
  },
};

module.exports = nextConfig;