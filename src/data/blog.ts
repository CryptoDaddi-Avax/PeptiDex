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
  lastFactChecked?: string; // ISO date — shown as "Last fact-checked: [date]"
  author: string;
  readingTime: string;     // e.g., "8 min read"
  image: string | null;    // path to featured image or null
  imageAlt?: string;       // Descriptive alt text with primary keyword
  tags: string[];          // lowercase keyword tags
}

export type BlogCategory =
  | 'Research News'
  | 'Peptide Trends'
  | 'Science Explainers'
  | 'Industry Analysis'
  | 'Regulatory Updates'
  | 'GH Peptide Analysis';

export const BLOG_CATEGORIES: BlogCategory[] = [
  'Research News',
  'Peptide Trends',
  'Science Explainers',
  'Industry Analysis',
  'Regulatory Updates',
  'GH Peptide Analysis',
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
    title: 'Tesamorelin: What Sets It Apart from Every Other Growth Hormone Peptide',
    slug: 'tesamorelin-growth-hormone-peptide-comparison',
    excerpt: 'A deep-dive comparison of Tesamorelin vs Sermorelin, CJC-1295, Ipamorelin, and MK-677. Covers FDA approval, visceral fat specificity, clinical evidence, and who Tesamorelin is actually best suited for.',
    category: 'GH Peptide Analysis',
    datePublished: '2026-04-13',
    dateModified: '2026-04-13',
    lastFactChecked: '2026-04-29',
    author: 'PeptideX Editorial',
    readingTime: '15 min read',
    image: '/images/blog/tesamorelin_growth_hormone_comparison.png',
    imageAlt: 'A single glowing amber peptide vial on a dark obsidian surface with GHRH molecular chain diagrams etched around it',
    tags: ['tesamorelin', 'tesamorelin vs sermorelin', 'tesamorelin vs cjc-1295', 'tesamorelin vs ipamorelin', 'growth hormone peptides 2026', 'visceral fat reduction', 'gh peptide comparison', 'ghrh analogs', 'peptide therapy for fat loss', 'tesamorelin anti-aging'],
  },
  {
    title: 'Peptide Stacking in 2026: Why Combination Protocols Are Redefining Results',
    slug: 'peptide-stacking-2026-combination-protocols',
    excerpt: 'A deep dive into peptide stacking protocols — the Wolverine stack (BPC-157 & TB-500), growth hormone synergy (CJC-1295 & Ipamorelin), longevity and cognitive stacks, and how to combine compounds effectively.',
    category: 'Science Explainers',
    datePublished: '2026-04-13',
    dateModified: '2026-04-13',
    lastFactChecked: '2026-04-13',
    author: 'PeptideX Editorial',
    readingTime: '12 min read',
    image: '/images/blog/peptide_stacking_2026_protocols.png',
    imageAlt: 'Glowing translucent peptide vials arranged in an interlocking double-helix formation representing combination therapy stacking',
    tags: ['peptide stacking', 'bpc-157 tb-500 stack', 'cjc-1295 ipamorelin combination', 'growth hormone peptides', 'peptide therapy protocols 2026', 'wolverine stack', 'longevity peptides', 'mots-c', 'semax selank', 'combination peptide therapy'],
  },
  {
    title: 'The 2026 FDA Peptide Reclassification: What It Means for Patients, Providers, and the Future of Peptide Therapy',
    slug: 'fda-peptide-reclassification-patients-providers',
    excerpt: 'A comprehensive analysis of the 2026 FDA peptide reclassification — which 14 peptides are returning to Category 1, what it means for patients and providers, and how to navigate peptide therapy safely.',
    category: 'Regulatory Updates',
    datePublished: '2026-04-13',
    dateModified: '2026-04-13',
    lastFactChecked: '2026-04-13',
    author: 'PeptideX Editorial',
    readingTime: '14 min read',
    image: '/images/blog/fda_peptide_patients_providers.png',
    imageAlt: 'FDA Peptide Reclassification 2026 — gavel with DNA helices and peptide vials representing regulatory change for patients and providers',
    tags: ['peptide therapy 2026', 'fda peptide reclassification', 'bpc-157 legal status', 'peptide compounding', 'growth hormone peptides', 'peptide regulation', 'category 1 peptides', 'tb-500', 'cjc-1295', 'ipamorelin'],
  },
  {
    title: 'Semaglutide vs Tirzepatide: Complete Research Comparison',
    slug: 'semaglutide-vs-tirzepatide',
    excerpt: 'A head-to-head comparison of semaglutide and tirzepatide — mechanisms, clinical trial data, weight loss efficacy, side effect profiles, and which GLP-1 performs better.',
    category: 'Research News',
    datePublished: '2026-04-12',
    dateModified: '2026-04-12',
    lastFactChecked: '2026-04-12',
    author: 'PeptideX Editorial',
    readingTime: '12 min read',
    image: '/images/blog/semaglutide_vs_tirzepatide.png',
    imageAlt: 'Scientific comparison diagram of semaglutide and tirzepatide peptide molecular structures for weight loss research',
    tags: ['semaglutide', 'tirzepatide', 'glp-1', 'weight loss', 'comparison', 'wegovy', 'mounjaro'],
  },
  {
    title: 'Retatrutide: The Triple-Agonist Peptide Explained',
    slug: 'retatrutide-explained',
    excerpt: 'A comprehensive research guide to retatrutide — the first GLP-1/GIP/glucagon triple receptor agonist, its Phase 3 trial status, and what it means for the future of metabolic medicine.',
    category: 'Research News',
    datePublished: '2026-04-12',
    dateModified: '2026-04-12',
    lastFactChecked: '2026-04-12',
    author: 'PeptideX Editorial',
    readingTime: '11 min read',
    image: '/images/blog/retatrutide_triple_agonist.png',
    imageAlt: 'Futuristic triple-helix molecular structure representing the retatrutide triple agonist peptide mechanism',
    tags: ['retatrutide', 'triple agonist', 'glp-1', 'gip', 'glucagon', 'weight loss', 'eli lilly'],
  },
  {
    title: 'Are Peptides Safe? What the Research Says in 2026',
    slug: 'are-peptides-safe',
    excerpt: 'A research-backed safety analysis of popular peptides including BPC-157, semaglutide, and GHK-Cu — covering clinical safety data, purity risks, and side effect profiles.',
    category: 'Science Explainers',
    datePublished: '2026-04-12',
    dateModified: '2026-04-12',
    lastFactChecked: '2026-04-12',
    author: 'Dr. E. Vance',
    readingTime: '10 min read',
    image: '/images/blog/peptide_safety_research.png',
    imageAlt: 'Laboratory safety concept showing a protected peptide solution highlighting research peptide safety and purity',
    tags: ['safety', 'side effects', 'bpc-157', 'ghk-cu', 'semaglutide', 'purity', 'coa', 'research peptides'],
  },
  {
    title: 'Best Peptides for Muscle Growth: Research-Backed Guide',
    slug: 'best-peptides-for-muscle-growth',
    excerpt: 'A research-backed comparison of the best peptides for muscle growth including CJC-1295, Ipamorelin, MK-677, Follistatin-344, and IGF-1 LR3.',
    category: 'Research News',
    datePublished: '2026-04-12',
    dateModified: '2026-04-12',
    lastFactChecked: '2026-04-12',
    author: 'PeptideX Editorial',
    readingTime: '11 min read',
    image: '/images/blog/muscle_growth_peptides.png',
    imageAlt: 'Anatomical silhouette with growth hormone pathways demonstrating the best peptides for muscle growth like CJC-1295 and Ipamorelin',
    tags: ['muscle growth', 'cjc-1295', 'ipamorelin', 'mk-677', 'follistatin', 'igf-1', 'growth hormone'],
  },
  {
    title: 'MK-677 vs Ipamorelin: Which GH Secretagogue Is Better?',
    slug: 'mk-677-vs-ipamorelin',
    excerpt: 'A research-backed comparison of MK-677 (ibutamoren) vs ipamorelin — oral vs injectable GH secretagogues compared on mechanism, side effects, and stacking.',
    category: 'Research News',
    datePublished: '2026-04-12',
    dateModified: '2026-04-12',
    lastFactChecked: '2026-04-12',
    author: 'PeptideX Editorial',
    readingTime: '9 min read',
    image: '/images/blog/mk677_vs_ipamorelin.png',
    imageAlt: 'Comparison of a pill capsule and syringe representing oral MK-677 vs injectable Ipamorelin growth hormone secretagogues',
    tags: ['mk-677', 'ipamorelin', 'growth hormone', 'secretagogue', 'comparison', 'ibutamoren'],
  },
  {
    title: 'CJC-1295 vs Sermorelin: GHRH Analog Comparison',
    slug: 'cjc-1295-vs-sermorelin',
    excerpt: 'A research-backed comparison of CJC-1295 and Sermorelin — two GHRH analogs for growth hormone optimization. DAC vs no-DAC, dosing, and clinical outcomes.',
    category: 'Science Explainers',
    datePublished: '2026-04-12',
    dateModified: '2026-04-12',
    lastFactChecked: '2026-04-12',
    author: 'PeptideX Editorial',
    readingTime: '9 min read',
    image: '/images/blog/cjc_vs_sermorelin.png',
    imageAlt: 'Pituitary gland receiving different growth hormone releasing signals demonstrating CJC-1295 vs Sermorelin mechanisms',
    tags: ['cjc-1295', 'sermorelin', 'ghrh', 'growth hormone', 'comparison', 'dac', 'anti-aging'],
  },
  {
    title: 'Peptide Stacking 101: How to Combine Peptides Safely',
    slug: 'peptide-stacking-guide',
    excerpt: 'A research-backed guide to peptide stacking — principles of safe combination, popular stacks for recovery, body composition, and longevity, timing, and contraindications.',
    category: 'Science Explainers',
    datePublished: '2026-04-12',
    dateModified: '2026-04-12',
    lastFactChecked: '2026-04-12',
    author: 'PeptideX Editorial',
    readingTime: '10 min read',
    image: '/images/blog/peptide_stacking_guide.png',
    imageAlt: 'Glowing molecular test tubes visualizing a peptide stacking protocol for safe combination research',
    tags: ['stacking', 'bpc-157', 'tb-500', 'cjc-1295', 'ipamorelin', 'combinations', 'protocols'],
  },
  {
    title: 'MOTS-c: The Mitochondrial Peptide for Energy & Metabolism',
    slug: 'mots-c-mitochondrial-peptide',
    excerpt: 'A deep dive into MOTS-c — the mitochondrial-derived peptide that mimics exercise, activates AMPK, and shows remarkable potential for metabolic regulation and longevity.',
    category: 'Research News',
    datePublished: '2026-04-12',
    dateModified: '2026-04-12',
    lastFactChecked: '2026-04-12',
    author: 'PeptideX Editorial',
    readingTime: '10 min read',
    image: '/images/blog/mots_c_mitochondrial.png',
    imageAlt: 'Glowing mitochondria emitting energy waves demonstrating the MOTS-c mitochondrial peptide mechanism',
    tags: ['mots-c', 'mitochondria', 'ampk', 'exercise mimetic', 'metabolism', 'longevity', 'aging'],
  },
  {
    title: 'Oral Peptides vs Injectable Peptides: What You Need to Know',
    slug: 'oral-vs-injectable-peptides',
    excerpt: 'A research-backed comparison of oral vs injectable peptide delivery — bioavailability, SNAC technology, orforglipron, and the future of oral peptide formulations.',
    category: 'Science Explainers',
    datePublished: '2026-04-12',
    dateModified: '2026-04-12',
    lastFactChecked: '2026-04-12',
    author: 'PeptideX Editorial',
    readingTime: '10 min read',
    image: '/images/blog/oral_vs_injectable.png',
    imageAlt: 'Split visualization comparing oral pill absorption barriers versus injectable peptide bloodstream delivery',
    tags: ['oral peptides', 'injectable', 'bioavailability', 'semaglutide', 'snac', 'delivery', 'orforglipron'],
  },
  {
    title: '14 Peptides Are Going Legal Again in 2026: What the FDA Reclassification Means',
    slug: 'fda-peptide-reclassification-2026',
    excerpt: 'The FDA is reclassifying 14 restricted peptides from Category 2 back to Category 1. What it means for patients, clinics, and the future of peptide therapy.',
    category: 'Regulatory Updates',
    datePublished: '2026-04-11',
    dateModified: '2026-04-11',
    lastFactChecked: '2026-04-11',
    author: 'PeptideX Editorial',
    readingTime: '10 min read',
    image: '/images/blog/fda_reclassification_2026.png',
    imageAlt: 'Scales of justice intertwined with peptide molecular structures representing the FDA peptide reclassification 2026 regulation',
    tags: ['fda', 'reclassification', 'bpc-157', 'ghk-cu', 'legal', 'category 1', 'compounding pharmacy', 'regulation'],
  },
  {
    title: 'The Oral Peptide Revolution Has Arrived — And It Changes Everything',
    slug: 'oral-peptide-revolution',
    excerpt: 'An independent analysis of the recent FDA approvals for oral GLP-1 and small-molecule peptide therapeutics, and what they mean for the future of longevity and weight loss.',
    category: 'Regulatory Updates',
    datePublished: '2026-04-03',
    dateModified: '2026-04-03',
    lastFactChecked: '2026-04-03',
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
    lastFactChecked: '2026-04-03',
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
    lastFactChecked: '2026-04-29',
    author: 'Dr. E. Vance',
    readingTime: '9 min read',
    image: '/images/blog/bpc_tb_dna.png',
    imageAlt: 'Molecular comparison diagram of BPC-157 and TB-500 peptide structures for tissue repair research',
    tags: ['bpc-157', 'tb-500', 'healing', 'tissue repair', 'comparison'],
  },
  {
    title: 'Best Peptides for Fat Loss: A Research Review',
    slug: 'best-peptides-for-fat-loss',
    excerpt: 'Comparing GLP-1 agonists, AOD-9604, and MOTS-c across clinical trials to determine the most effective peptide pathways for lipid oxidation.',
    category: 'Research News',
    datePublished: '2026-03-20',
    dateModified: '2026-04-01',
    lastFactChecked: '2026-04-01',
    author: 'PeptideX Editorial',
    readingTime: '11 min read',
    image: '/images/blog/fat_loss_lipid.png',
    imageAlt: 'Lipid oxidation molecular pathways representing the best peptides for fat loss like GLP-1 and AOD-9604',
    tags: ['fat loss', 'weight loss', 'semaglutide', 'aod-9604', 'mots-c', 'glp-1'],
  },
  {
    title: 'How to Read a Peptide COA (And Why It Matters)',
    slug: 'how-to-read-a-peptide-coa',
    excerpt: 'Avoid dangerous synthesis byproducts by learning how to properly analyze independent HPLC and mass spectrometry reports before sourcing.',
    category: 'Science Explainers',
    datePublished: '2026-03-15',
    dateModified: '2026-04-01',
    lastFactChecked: '2026-04-01',
    author: 'Dr. E. Vance',
    readingTime: '7 min read',
    image: '/images/blog/coa_lab_graph.png',
    imageAlt: 'HPLC and Mass spectrometry readouts illustrating how to read a peptide COA for quality sourcing',
    tags: ['coa', 'hplc', 'mass spectrometry', 'vendor', 'quality', 'sourcing'],
  },
  {
    title: 'Ipamorelin vs CJC-1295: Stack Comparison Guide',
    slug: 'ipamorelin-vs-cjc-1295',
    excerpt: 'Understanding the synergistic GHRP and GHRH relationship that maximizes endogenous growth hormone pulses without cortisol spikes.',
    category: 'Science Explainers',
    datePublished: '2026-03-10',
    dateModified: '2026-04-01',
    lastFactChecked: '2026-04-01',
    author: 'PeptideX Editorial',
    readingTime: '8 min read',
    image: '/images/blog/cjc_growth_hormone.png',
    imageAlt: 'Endogenous growth hormone pulses representing the Ipamorelin and CJC-1295 peptide stack comparison',
    tags: ['ipamorelin', 'cjc-1295', 'growth hormone', 'stacking', 'ghrp', 'ghrh'],
  },
  {
    title: 'Best Peptide Vendors 2026: Independently Reviewed & COA Verified',
    slug: 'best-peptide-vendors-2026',
    excerpt: 'We independently evaluate peptide vendors based on third-party COA testing, purity verification, shipping speed, and pricing. Updated monthly for April 2026.',
    category: 'Industry Analysis',
    datePublished: '2026-01-15',
    dateModified: '2026-04-12',
    lastFactChecked: '2026-04-12',
    author: 'Dr. E. Vance',
    readingTime: '14 min read',
    image: '/images/blog/vendor_secure_crate.png',
    imageAlt: 'Secure scientific crate representing safe sourcing from the best peptide vendors 2026',
    tags: ['best peptide vendors 2026', 'peptide vendor review', 'where to buy peptides', 'amino club', 'coa', 'research peptides', 'peptide sourcing'],
  },
  {
    title: 'Are Research Peptides Legal? A Country-by-Country Guide',
    slug: 'are-research-peptides-legal',
    excerpt: 'Navigating the complex regulatory landscape of purchasing, owning, and researching peptides across North America, Europe, and Australia.',
    category: 'Regulatory Updates',
    datePublished: '2026-02-28',
    dateModified: '2026-04-01',
    lastFactChecked: '2026-04-01',
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

/** Get blog posts that mention a specific peptide (by name or aliases) */
export function getPostsForPeptide(peptideName: string, aliases: string[] = [], limit = 4): BlogPost[] {
  const searchTerms = [peptideName, ...aliases].map((t) => t.toLowerCase());
  return getAllPosts()
    .filter((post) => {
      const haystack = `${post.title} ${post.excerpt} ${post.tags.join(' ')}`.toLowerCase();
      return searchTerms.some((term) => haystack.includes(term));
    })
    .slice(0, limit);
}

