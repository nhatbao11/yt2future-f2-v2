import createNextIntlPlugin from 'next-intl/plugin';
import type { NextConfig } from 'next';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https' as const,
        hostname: 'lh3.googleusercontent.com',
        pathname: '/**'
      },
      {
        protocol: 'https' as const,
        hostname: 'res.cloudinary.com',
        pathname: '/**'
      },
    ],
  },
  async rewrites() {
    // Chỉ dùng rewrite khi development (local)
    // Production sẽ dùng Nginx làm reverse proxy
    if (process.env.NODE_ENV === 'development') {
      return [
        {
          source: '/api/:path*',
          destination: 'http://localhost:5000/api/:path*',
        },
      ];
    }
    return [];
  },
};

export default withNextIntl(nextConfig);