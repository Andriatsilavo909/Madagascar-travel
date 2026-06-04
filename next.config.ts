import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // accepte tous les domaines HTTPS
      },
      {
        protocol: 'http',
        hostname: '**', // accepte tous les domaines HTTP
      },
    ],
  },
}

export default nextConfig;