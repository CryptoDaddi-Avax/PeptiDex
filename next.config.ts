import type { NextConfig } from "next";
import { execSync } from "child_process";

// Build-time git commit date — used in footer "Last reviewed" stamp
const gitDate = (() => {
  try {
    return execSync("git log -1 --format=%cI", { encoding: "utf8" }).trim();
  } catch {
    return new Date().toISOString();
  }
})();

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
      { source: '/goals/:slug', destination: '/best/:slug', permanent: true },
      // Legacy route clean-up (added May 2026)
      { source: '/suppliers', destination: '/vendors', permanent: true },
      { source: '/research', destination: '/library', permanent: true },
      { source: '/research/bpc-157', destination: '/library/bpc-157', permanent: true },
      { source: '/research/tb-500', destination: '/library/tb-500', permanent: true },
      // /best/ goal page consolidations — duplicate slug pairs → canonical URLs
      { source: '/best/anti-aging', destination: '/best/longevity', permanent: true },
      { source: '/best/skin-aesthetics', destination: '/best/skin-aesthetic', permanent: true },
      // Vendor review page consolidation — old static pages → dynamic template
      { source: '/vendors/amino-club-review', destination: '/vendors/amino-club', permanent: true },
      { source: '/vendors/bio-longevity-labs-review', destination: '/vendors/bio-longevity-labs', permanent: true },
      { source: '/vendors/ascension-peptides-review', destination: '/vendors/ascension-peptides', permanent: true },
      { source: '/vendors/limitless-life-review', destination: '/vendors/limitless-life', permanent: true },
      { source: '/vendors/pantheon-peptides-review', destination: '/vendors/pantheon-peptides', permanent: true },
      { source: '/vendors/lvlup-health-review', destination: '/vendors/lvlup-health', permanent: true },
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

  // ─── BUILD DATE ─────────────────────────────────────────────────
  // Exposed to the browser so Footer can display a dynamic review date.
  env: {
    NEXT_PUBLIC_BUILD_DATE: gitDate,
  },

  // ─── EXPERIMENTAL ──────────────────────────────────────────────
  experimental: {},
};

export default nextConfig;
