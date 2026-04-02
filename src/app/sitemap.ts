import { MetadataRoute } from 'next';
import { peptides } from '@/data/peptides';
import { stacks } from '@/data/stacks';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://peptidex.app';
  const currentDate = new Date('2026-04-15');

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
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/stacks`,
      lastModified: currentDate,
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
  ];

  // Blog Post Pages
  const blogPosts = [
    'bpc-157-vs-tb-500',
    'best-peptides-for-fat-loss',
    'how-to-read-a-peptide-coa',
    'ipamorelin-vs-cjc-1295',
    'best-peptide-vendors-2026',
    'are-research-peptides-legal',
  ];

  const blogUrls = blogPosts.map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Dynamic Peptides Pages
  const peptideUrls = peptides.map((peptide) => ({
    url: `${baseUrl}/peptides/${peptide.slug}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // Dynamic Stacks Pages
  const stackUrls = stacks.map((stack) => {
    return {
      url: `${baseUrl}/stacks/${stack.slug}`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    };
  });

  return [...staticPages, ...blogUrls, ...peptideUrls, ...stackUrls];
}
