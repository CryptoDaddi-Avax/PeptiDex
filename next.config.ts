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
      // IA Consolidation (added June 2026)
      { source: '/buy', destination: '/where-to-buy', permanent: true },
      { source: '/buy/:slug', destination: '/where-to-buy/:slug', permanent: true },
      { source: '/vs', destination: '/compare', permanent: true },
      { source: '/vs/bpc-157-vs-tb-500', destination: '/compare/bpc-157-vs-tb-500', permanent: true },
      { source: '/vs/semaglutide-vs-tirzepatide', destination: '/compare/semaglutide-vs-tirzepatide', permanent: true },
      { source: '/vs/cjc-1295-vs-ipamorelin', destination: '/compare/cjc-1295-vs-ipamorelin', permanent: true },
      { source: '/vs/ghk-cu-vs-bpc-157', destination: '/compare/ghk-cu-vs-bpc-157', permanent: true },
      { source: '/vs/semax-vs-selank', destination: '/compare/selank-vs-semax', permanent: true },
      { source: '/vs/retatrutide-vs-tirzepatide', destination: '/compare/tirzepatide-vs-retatrutide', permanent: true },
      { source: '/vs/tesamorelin-vs-ipamorelin', destination: '/compare', permanent: true },
      { source: '/vs/epitalon-vs-ghk-cu', destination: '/compare', permanent: true },
      { source: '/vs/sermorelin-vs-ipamorelin', destination: '/compare', permanent: true },
      
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
      // Ascension Peptides deactivated 2026-05-24 — redirect all indexed pages
      { source: '/vendors/ascension-peptides', destination: '/vendors', permanent: true },
      { source: '/vendors/amino-club-vs-ascension', destination: '/vendors/amino-club', permanent: true },
      { source: '/compare/vendors/amino-club-vs-ascension-peptides', destination: '/vendors', permanent: true },
      { source: '/vendors/ascension-peptides-review', destination: '/vendors', permanent: true },
      // fix(seo): B2 — /tools/price-tracker consolidated into /tools/pricing (canonical URL)
      { source: '/tools/price-tracker', destination: '/tools/pricing', permanent: true },
      { source: '/vendors/limitless-life-review', destination: '/vendors/limitless-life', permanent: true },
      { source: '/vendors/pantheon-peptides-review', destination: '/vendors/pantheon-peptides', permanent: true },
      { source: '/vendors/lvlup-health-review', destination: '/vendors/lvlup-health', permanent: true },

      // Blog slug variants — 301 redirects
      { source: '/blog/how-to-read-a-peptide-coa', destination: '/blog/how-to-read-peptide-coa', permanent: true },
      { source: '/blog/best-peptide-vendors-2026', destination: '/blog/best-peptide-vendor-2026', permanent: true },
      { source: '/blog/semaglutide-vs-tirzepatide', destination: '/compare/semaglutide-vs-tirzepatide', permanent: true },
      { source: '/blog/peptide-safety-beginners-guide', destination: '/blog/research-peptide-safety-explained', permanent: true },
      { source: '/blog/peptide-stacking-guide', destination: '/blog/peptide-stacking-2026-combination-protocols', permanent: true },
      { source: '/blog/bpc-157-complete-guide', destination: '/blog/bpc-157-dosage-complete-guide', permanent: true },
      { source: '/blog/ghk-cu-skin-rejuvenation', destination: '/blog/ghk-cu-breakout-peptide-2026', permanent: true },
      { source: '/blog/retatrutide-triple-agonist', destination: '/blog/retatrutide-explained', permanent: true },
      { source: '/blog/tesamorelin-growth-hormone', destination: '/blog/tesamorelin-growth-hormone-peptide-comparison', permanent: true },
      { source: '/blog/mk-677-ibutamoren-guide', destination: '/blog/mk-677-vs-ipamorelin', permanent: true },
      { source: '/blog/peptide-reconstitution-guide', destination: '/guides/reconstitution', permanent: true },

      // Authors → Team redirect
      { source: '/authors/:slug', destination: '/team/:slug', permanent: true },

      // Legacy singles
      { source: '/disclaimer', destination: '/disclaimers', permanent: true },
      { source: '/about/editorial-team', destination: '/about/editorial-policy', permanent: true },
      { source: '/contact', destination: '/about', permanent: true },

      // COA PDF old naming → new naming
      { source: '/coa/retatrutide-amino-club-batch-2604.pdf', destination: '/coa/retatrutide-RT0001.pdf', permanent: true },
      { source: '/coa/tesamorelin-bll-batch-2603.pdf', destination: '/coa/tesamorelin-TES0001.pdf', permanent: true },
      { source: '/coa/semaglutide-limitless-batch-2603.pdf', destination: '/coa', permanent: true },
      { source: '/coa/tirzepatide-bll-batch-2603.pdf', destination: '/coa', permanent: true },
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
