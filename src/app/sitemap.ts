import { MetadataRoute } from 'next';
import { peptides, LAST_UPDATED as PEPTIDES_LAST_UPDATED } from '@/data/peptides';
import { stacks, LAST_UPDATED as STACKS_LAST_UPDATED } from '@/data/stacks';
import { blogPosts } from '@/data/blog';
import { comparisons, LAST_UPDATED as COMPARISONS_LAST_UPDATED } from '@/data/comparisons';
import { LAST_REVIEWED as VENDORS_LAST_REVIEWED } from '@/app/vendors/page';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
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
      url: `${baseUrl}/disclaimer`,
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
      url: `${baseUrl}/vendors/amino-club-review`,
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
    {
      url: `${baseUrl}/vendors/amino-club-vs-ascension`,
      lastModified: vendorsDate,
      changeFrequency: 'monthly' as const,
      priority: 0.75,
    },
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
    ...whereToBuyUrls
  ];
}
