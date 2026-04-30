import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: process.env.BUILD_MOBILE === 'true' ? 'export' : undefined,

  // ─── IMAGE OPTIMIZATION ────────────────────────────────────────
  images: {
    // Enable Next.js built-in image optimization
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
  },

  // ─── COMPRESSION ───────────────────────────────────────────────
  compress: true,

  // ─── 301 REDIRECTS — Legacy URL migrations ─────────────────────
  async redirects() {
    return [
      { source: '/peptides', destination: '/library', permanent: true },
      { source: '/peptides/:slug', destination: '/library/:slug', permanent: true },
      { source: '/compare', destination: '/tools/compare', permanent: true },
      { source: '/learn', destination: '/intro', permanent: true },
      { source: '/goals/:slug', destination: '/best/:slug', permanent: true },
    ];
  },

  // ─── HEADERS ───────────────────────────────────────────────────
  async headers() {
    return [
      {
        // Static assets: aggressive caching
        source: '/:path*.(png|jpg|jpeg|gif|svg|webp|avif|ico|woff|woff2|ttf|eot)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        // JS/CSS bundles from Next.js (hashed filenames = safe to cache forever)
        source: '/_next/static/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        // Optimized images from Next.js
        source: '/_next/image/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=2592000, stale-while-revalidate=86400' },
        ],
      },
      {
        // HTML pages: short cache, always revalidate
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
    ];
  },

  // ─── EXPERIMENTAL ──────────────────────────────────────────────
  experimental: {
    optimizeCss: true,
  },
};

export default nextConfig;
