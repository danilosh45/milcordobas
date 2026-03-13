/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: 'dist',
  
  images: {
    unoptimized: true,
  },
  
  compress: true,
  poweredByHeader: false,
  
  env: {
    NEXT_PUBLIC_ENV: 'production',
    NEXT_PUBLIC_SITE_URL: 'https://milcordobas.club',
  },
  
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
    ];
  },
}

module.exports = nextConfig
