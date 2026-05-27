import { MetadataRoute } from 'next';
import { peptides, LAST_UPDATED as PEPTIDES_LAST_UPDATED } from '@/data/peptides';
import { stacks, LAST_UPDATED as STACKS_LAST_UPDATED } from '@/data/stacks';
import { blogPosts } from '@/data/blog';
import { comparisons, LAST_UPDATED as COMPARISONS_LAST_UPDATED } from '@/data/comparisons';
import { LAST_REVIEWED as VENDORS_LAST_REVIEWED } from '@/app/vendors/page';
import { vendorDeals } from '@/data/coupon-deals';
import { getAllAuthorSlugs } from '@/lib/authors';

export const dynamic = 'force-static';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://peptidex.app';
  const currentDate = new Date();
  
  const peptidesDate = new Date(PEPTIDES_LAST_UPDATED);
  const stacksDate = new Date(STACKS_LAST_UPDATED);
  const comparisonsDate = new Date(COMPARISONS_LAST_UPDATED || currentDate);
  const vendorsDate = new Date(VENDORS_LAST_REVIEWED);

  // Core Static Pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/vendors`,
      lastModified: vendorsDate,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/coupon-codes`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/library`,
      lastModified: peptidesDate,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/stacks`,
      lastModified: stacksDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/about/editorial-policy`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/beginners-guide`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/tools/cycle-planner`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/tools/calculator`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/tools/halflife`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/tools/pk`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/tools/coa`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/tools/bloodwork`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/tools/compare`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/tools/interactions`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/tools/vendor-picker`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/glossary`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/quiz`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/legal`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.4,
    },
    {
      url: `${baseUrl}/advisor`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/disclaimers`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.4,
    },
    {
      url: `${baseUrl}/peptides`,
      lastModified: peptidesDate,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/compare`,
      lastModified: comparisonsDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/learn`,
      lastModified: peptidesDate,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/vendors/amino-club`,
      lastModified: vendorsDate,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/vendors/is-amino-club-legit`,
      lastModified: vendorsDate,
      changeFrequency: 'monthly' as const,
      priority: 0.75,
    },
    {
      url: `${baseUrl}/vendors/amino-club-discount-code`,
      lastModified: vendorsDate,
      changeFrequency: 'monthly' as const,
      priority: 0.75,
    },
    {
      url: `${baseUrl}/vendors/amino-club-vs-limitless-life`,
      lastModified: vendorsDate,
      changeFrequency: 'monthly' as const,
      priority: 0.75,
    },
    // DEACTIVATED 2026-05-24: removed from sitemap (vendor deactivated)
    // { url: `${baseUrl}/vendors/amino-club-vs-ascension`, ... }
    {
      url: `${baseUrl}/vendors/amino-club-coa-verification`,
      lastModified: vendorsDate,
      changeFrequency: 'monthly' as const,
      priority: 0.75,
    },
    {
      url: `${baseUrl}/vendors/amino-club-faq`,
      lastModified: vendorsDate,
      changeFrequency: 'monthly' as const,
      priority: 0.75,
    },
    {
      url: `${baseUrl}/vendors/bio-longevity-labs`,
      lastModified: vendorsDate,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/vendors/limitless-life`,
      lastModified: vendorsDate,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    // DEACTIVATED 2026-05-24: removed from sitemap (vendor deactivated)
    // { url: `${baseUrl}/vendors/ascension-peptides`, ... }
    {
      url: `${baseUrl}/vendors/pantheon-peptides`,
      lastModified: vendorsDate,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/vendors/lvlup-health`,
      lastModified: vendorsDate,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
  ];

  // Standard Blog Post Pages
  const blogUrls = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.dateModified || post.datePublished),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  // Dynamic Peptides Pages
  const peptideUrls = peptides
    .map((peptide) => ({
      url: `${baseUrl}/library/${peptide.slug}`,
      lastModified: peptidesDate,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }));

  // Dynamic Stacks Pages
  const stackUrls = stacks.map((stack) => {
    return {
      url: `${baseUrl}/stacks/${stack.slug}`,
      lastModified: stacksDate,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    };
  });

  // Dynamic Learn (Educational Hub) Pages
  const learnUrls = peptides.map((peptide) => ({
    url: `${baseUrl}/learn/${peptide.slug}`,
    lastModified: peptidesDate,
    changeFrequency: 'monthly' as const,
    priority: 0.85,
  }));

  // Dynamic Compare Pages
  const compareUrls = comparisons.map((comp) => ({
    url: `${baseUrl}/compare/${comp.slug}`,
    lastModified: comparisonsDate,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  // Amino Club Dynamic Product Pages
  const aminoClubProducts = ['bpc-157', 'tirzepatide', 'retatrutide', 'tesamorelin', 'semaglutide'];
  const aminoClubUrls = aminoClubProducts.map((slug) => ({
    url: `${baseUrl}/vendors/amino-club/${slug}`,
    lastModified: vendorsDate,
    changeFrequency: 'monthly' as const,
    priority: 0.75,
  }));

  // Where to Buy Pages
  const whereToBuySlugs = [
    'bpc-157', 'tb-500', 'retatrutide', 'tirzepatide', 'semaglutide', 
    'ipamorelin', 'cjc-1295', 'ghk-cu', 'mots-c', 'epitalon'
  ];
  const whereToBuyUrls = whereToBuySlugs.map((slug) => ({
    url: `${baseUrl}/where-to-buy/${slug}`,
    lastModified: vendorsDate,
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  // Reconstitution Calculator Compound Pages
  const reconstitutionSlugs = ['bpc-157'];
  const reconstitutionUrls = [
    {
      url: `${baseUrl}/tools/reconstitution-calculator`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    ...reconstitutionSlugs.map((slug) => ({
      url: `${baseUrl}/tools/reconstitution-calculator/${slug}`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    }))
  ];

  // Author / Team Pages
  const authorSlugs = getAllAuthorSlugs();
  const teamUrls = authorSlugs.map((slug) => ({
    url: `${baseUrl}/team/${slug}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  // Dynamic Buy Pages
  const TARGET_SLUGS = [
    'bpc-157', 'tb-500', 'ghk-cu', 'semaglutide', 'tirzepatide', 
    'retatrutide', 'cjc-1295', 'ipamorelin', 'mk-677', 'sermorelin', 
    'tesamorelin', 'mots-c'
  ];
  const buyUrls = TARGET_SLUGS.map((slug) => ({
    url: `${baseUrl}/buy/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.85,
  }));

  // ── pSEO Drip-Feed: /peptides/[slug]/at/[vendor] ──────────────────────────
  // Decision 3: 6 weeks, 4 waves, 13-14 pages each.
  // Decision 5: HOLD — all launch dates are in the future.
  // Pages appear in sitemap only after their wave launch date.
  //
  // To activate Wave 1: change PSEO_WAVE_1_DATE to today's date and rebuild.
  // Monitor GSC between waves. If >50% "Discovered — not indexed", pause.
  
  const PSEO_WAVE_1_DATE = '2099-01-01'; // HELD — set to real date when ready
  const PSEO_WAVE_2_DATE = '2099-01-01';
  const PSEO_WAVE_3_DATE = '2099-01-01';
  const PSEO_WAVE_4_DATE = '2099-01-01';

  // Wave 1: Highest-search-volume peptides × all vendors
  const WAVE_1_PEPTIDES = ['bpc-157', 'tirzepatide', 'semaglutide'];
  // Wave 2: Second-tier high-volume
  const WAVE_2_PEPTIDES = ['tb-500', 'ipamorelin', 'cjc-1295', 'retatrutide'];
  // Wave 3: Mid-tier compounds
  const WAVE_3_PEPTIDES = ['ghk-cu', 'mk-677', 'sermorelin', 'tesamorelin', 'mots-c'];
  // Wave 4: Everything else (derived dynamically)

  function getPseoWaveDate(peptideSlug: string): string {
    if (WAVE_1_PEPTIDES.includes(peptideSlug)) return PSEO_WAVE_1_DATE;
    if (WAVE_2_PEPTIDES.includes(peptideSlug)) return PSEO_WAVE_2_DATE;
    if (WAVE_3_PEPTIDES.includes(peptideSlug)) return PSEO_WAVE_3_DATE;
    return PSEO_WAVE_4_DATE;
  }

  // Import pair data inline to avoid circular deps
  const { vendorPricing } = await import('@/data/vendor-pricing');
  const VENDOR_NAME_TO_SLUG: Record<string, string> = {
    "Amino Club": "amino-club",
    "Bio Longevity Labs": "bio-longevity-labs",
    "Limitless Life": "limitless-life",
    // DEACTIVATED 2026-05-24: "Ascension Peptides": "ascension-peptides",
    "Pantheon Peptides": "pantheon-peptides",
    "LVLUP Health": "lvlup-health",
  };

  const pseoUrls = vendorPricing.flatMap(entry =>
    entry.vendors
      .map(vp => {
        const vendorSlug = VENDOR_NAME_TO_SLUG[vp.vendor] ?? vp.vendor.toLowerCase().replace(/\s+/g, '-');
        const waveDate = getPseoWaveDate(entry.slug);
        // Only include if wave date has passed
        if (new Date(waveDate) > currentDate) return null;
        return {
          url: `${baseUrl}/peptides/${entry.slug}/at/${vendorSlug}`,
          lastModified: new Date(waveDate),
          changeFrequency: 'weekly' as const,
          priority: 0.8,
        };
      })
      .filter(Boolean)
  ) as MetadataRoute.Sitemap;

  return [
    ...staticPages, 
    ...blogUrls, 
    ...peptideUrls, 
    ...stackUrls, 
    ...learnUrls, 
    ...compareUrls, 
    ...aminoClubUrls,
    {
      url: `${baseUrl}/where-to-buy`,
      lastModified: vendorsDate,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    ...whereToBuyUrls,
    ...reconstitutionUrls,
    ...buyUrls,
    {
      url: `${baseUrl}/buy`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/guides/glp1-alternatives`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    ...teamUrls,
    ...pseoUrls,
    ...vendorDeals.map((d) => ({
      url: `${baseUrl}/coupon-codes/${d.vendorSlug}`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    })),
  ];
}
