// ─── CENTRALIZED BLOG POST REGISTRY ──────────────────────────────
// Single source of truth for all blog posts metadata.
// Used by: /blog index, RSS feed, related posts, sitemap

export interface BlogPost {
  title: string;
  slug: string;
  excerpt: string;
  category: BlogCategory;
  datePublished: string;   // ISO date YYYY-MM-DD
  dateModified: string;    // ISO date YYYY-MM-DD
  author: string;
  readingTime: string;     // e.g., "8 min read"
  image: string | null;    // path to featured image or null
  tags: string[];          // lowercase keyword tags
}

export type BlogCategory =
  | 'Research News'
  | 'Peptide Trends'
  | 'Science Explainers'
  | 'Industry Analysis'
  | 'Regulatory Updates';

export const BLOG_CATEGORIES: BlogCategory[] = [
  'Research News',
  'Peptide Trends',
  'Science Explainers',
  'Industry Analysis',
  'Regulatory Updates',
];

// Map old categories to new for backwards compatibility
function mapCategory(old: string): BlogCategory {
  const map: Record<string, BlogCategory> = {
    'Research': 'Research News',
    'Protocols': 'Science Explainers',
    'Vendor News': 'Industry Analysis',
    'Stacks': 'Science Explainers',
    'Beginner Guides': 'Science Explainers',
    'Research Trends': 'Peptide Trends',
  };
  return map[old] || (old as BlogCategory);
}

export const blogPosts: BlogPost[] = [
  {
    title: 'The Oral Peptide Revolution Has Arrived — And It Changes Everything',
    slug: 'oral-peptide-revolution',
    excerpt: 'An independent analysis of the recent FDA approvals for oral GLP-1 and small-molecule peptide therapeutics, and what they mean for the future of longevity and weight loss.',
    category: 'Regulatory Updates',
    datePublished: '2026-04-03',
    dateModified: '2026-04-03',
    author: 'PeptideX Editorial',
    readingTime: '12 min read',
    image: null,
    tags: ['oral peptides', 'glp-1', 'fda', 'semaglutide', 'orforglipron', 'weight loss'],
  },
  {
    title: 'GHK-Cu: The Breakout Peptide of 2026',
    slug: 'ghk-cu-breakout-peptide-2026',
    excerpt: 'An independent analysis of GHK-Cu, the copper tripeptide seeing a 1,000% surge in anti-aging, longevity, and skin regeneration research in 2026.',
    category: 'Peptide Trends',
    datePublished: '2026-04-02',
    dateModified: '2026-04-03',
    author: 'PeptideX Editorial',
    readingTime: '10 min read',
    image: null,
    tags: ['ghk-cu', 'copper peptide', 'anti-aging', 'longevity', 'skin regeneration'],
  },
  {
    title: 'BPC-157 vs TB-500: What the Research Actually Shows',
    slug: 'bpc-157-vs-tb-500',
    excerpt: 'An in-depth analysis of the synergistic mechanisms between BPC-157 and TB-500 for musculoskeletal tissue repair and inflammation reduction.',
    category: 'Research News',
    datePublished: '2026-03-28',
    dateModified: '2026-04-01',
    author: 'Dr. E. Vance',
    readingTime: '9 min read',
    image: '/images/blog/bpc_tb_dna.png',
    tags: ['bpc-157', 'tb-500', 'healing', 'tissue repair', 'comparison'],
  },
  {
    title: 'Best Peptides for Fat Loss: A Research Review',
    slug: 'best-peptides-for-fat-loss',
    excerpt: 'Comparing GLP-1 agonists, AOD-9604, and MOTS-c across clinical trials to determine the most effective peptide pathways for lipid oxidation.',
    category: 'Research News',
    datePublished: '2026-03-20',
    dateModified: '2026-04-01',
    author: 'PeptideX Editorial',
    readingTime: '11 min read',
    image: '/images/blog/fat_loss_lipid.png',
    tags: ['fat loss', 'weight loss', 'semaglutide', 'aod-9604', 'mots-c', 'glp-1'],
  },
  {
    title: 'How to Read a Peptide COA (And Why It Matters)',
    slug: 'how-to-read-a-peptide-coa',
    excerpt: 'Avoid dangerous synthesis byproducts by learning how to properly analyze independent HPLC and mass spectrometry reports before sourcing.',
    category: 'Science Explainers',
    datePublished: '2026-03-15',
    dateModified: '2026-04-01',
    author: 'Dr. E. Vance',
    readingTime: '7 min read',
    image: '/images/blog/coa_lab_graph.png',
    tags: ['coa', 'hplc', 'mass spectrometry', 'vendor', 'quality', 'sourcing'],
  },
  {
    title: 'Ipamorelin vs CJC-1295: Stack Comparison Guide',
    slug: 'ipamorelin-vs-cjc-1295',
    excerpt: 'Understanding the synergistic GHRP and GHRH relationship that maximizes endogenous growth hormone pulses without cortisol spikes.',
    category: 'Science Explainers',
    datePublished: '2026-03-10',
    dateModified: '2026-04-01',
    author: 'PeptideX Editorial',
    readingTime: '8 min read',
    image: '/images/blog/cjc_growth_hormone.png',
    tags: ['ipamorelin', 'cjc-1295', 'growth hormone', 'stacking', 'ghrp', 'ghrh'],
  },
  {
    title: 'Best Peptide Vendors 2026: Our Sourcing Criteria',
    slug: 'best-peptide-vendors-2026',
    excerpt: 'A transparent look into our rigorous 5-point vetting process used to evaluate and rank research chemical suppliers globally.',
    category: 'Industry Analysis',
    datePublished: '2026-03-05',
    dateModified: '2026-04-01',
    author: 'PeptideX Editorial',
    readingTime: '6 min read',
    image: '/images/blog/vendor_secure_crate.png',
    tags: ['vendors', 'sourcing', 'coa', 'quality', 'review'],
  },
  {
    title: 'Are Research Peptides Legal? A Country-by-Country Guide',
    slug: 'are-research-peptides-legal',
    excerpt: 'Navigating the complex regulatory landscape of purchasing, owning, and researching peptides across North America, Europe, and Australia.',
    category: 'Regulatory Updates',
    datePublished: '2026-02-28',
    dateModified: '2026-04-01',
    author: 'PeptideX Editorial',
    readingTime: '9 min read',
    image: '/images/blog/legal_gavel_hologram.png',
    tags: ['legal', 'regulation', 'fda', 'australia', 'europe', 'research peptides'],
  },
];

// ─── HELPERS ─────────────────────────────────────────────────────

/** Get all posts sorted by date descending */
export function getAllPosts(): BlogPost[] {
  return [...blogPosts].sort((a, b) =>
    new Date(b.datePublished).getTime() - new Date(a.datePublished).getTime()
  );
}

/** Get post by slug */
export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

/** Get posts by category */
export function getPostsByCategory(category: BlogCategory): BlogPost[] {
  return getAllPosts().filter((p) => p.category === category);
}

/** Get related posts (same category or overlapping tags, excluding self) */
export function getRelatedPosts(slug: string, limit = 3): BlogPost[] {
  const current = getPostBySlug(slug);
  if (!current) return [];

  return getAllPosts()
    .filter((p) => p.slug !== slug)
    .map((p) => {
      let score = 0;
      if (p.category === current.category) score += 3;
      const overlap = p.tags.filter((t) => current.tags.includes(t)).length;
      score += overlap;
      return { post: p, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((r) => r.post);
}

/** Format date for display */
export function formatDate(isoDate: string): string {
  return new Date(isoDate + 'T00:00:00').toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
