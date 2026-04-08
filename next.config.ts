import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      {
        protocol: 'https',
        hostname: 'encrypted-tbn0.gstatic.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'madagascar-tourisme.com',
      },
      {
        protocol: 'https',
        hostname: 'www.booking-hotel-madagascar.com',
      },
      {
        protocol: 'https',
        hostname: 'cf.bstatic.com',
      },
      {
        protocol: 'https',
        hostname: 'www.legrandbleunosybe.com',
      },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      
      // Ajoutez ici tous les autres domaines que vous utilisez
    ],
  },
}

export default nextConfig;