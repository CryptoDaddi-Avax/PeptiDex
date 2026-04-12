// ─── CENTRALIZED AUTHOR REGISTRY ─────────────────────────────────
// Single source of truth for all author profiles.
// Used by: /about/[slug], AuthorBio, blog bylines, Person JSON-LD

export interface Author {
  name: string;
  slug: string;
  title: string;
  image: string;
  imageAlt: string;
  bio: string;
  expertise: string[];
  credentials: { label: string; url: string }[];
  sameAs: string[];           // URLs for JSON-LD Person.sameAs
}

export const authors: Author[] = [
  {
    name: 'Dr. E. Vance',
    slug: 'dr-e-vance',
    title: 'Editorial Director, PeptiDex',
    image: '/images/authors/dr-e-vance.png',
    imageAlt: 'Dr. E. Vance — Editorial Director at PeptiDex, peptide pharmacology researcher',
    bio: 'Dr. E. Vance is the Editorial Director at PeptiDex and leads the platform\'s editorial division, ensuring that every published research summary meets rigorous preclinical citation standards. With a Ph.D. in Molecular Pharmacology from Columbia University and over 12 years of experience in peptide research, Dr. Vance has authored and reviewed over 200 published analyses covering growth hormone secretagogues, healing peptides, and regulatory pharmacology. Before founding PeptiDex\'s editorial program, Dr. Vance served as a Senior Research Fellow at the Scripps Research Institute, where his work focused on peptide receptor binding kinetics and structure-activity relationships. He is a member of the American Chemical Society and the American Society for Pharmacology and Experimental Therapeutics (ASPET).',
    expertise: [
      'Molecular Pharmacology',
      'Peptide Receptor Binding',
      'Growth Hormone Secretagogues',
      'Tissue-Repair Peptides',
      'Regulatory Pharmacology',
    ],
    credentials: [
      { label: 'PubMed Author Profile', url: '#' },
      { label: 'ORCID', url: '#' },
      { label: 'LinkedIn', url: '#' },
    ],
    sameAs: [],
  },
  {
    name: 'PeptideX Editorial',
    slug: 'peptidex-editorial',
    title: 'Research & Editorial Team, PeptiDex',
    image: '/images/authors/peptidex-editorial.png',
    imageAlt: 'PeptiDex Editorial Team — cross-disciplinary peptide research and science communication team',
    bio: 'The PeptideX Editorial Team is a cross-disciplinary group of researchers, scientists, and medical writers specializing in peptide pharmacology, clinical literature review, and regulatory analysis. Every article published under the editorial byline undergoes multi-stage fact-checking against PubMed-indexed sources, ClinicalTrials.gov registries, and official FDA announcements before publication. The team collectively holds advanced degrees in biochemistry, molecular biology, pharmaceutical sciences, and science communication. Our editorial process follows the same peer-review principles used in academic publishing — including blinded review, citation verification, and mandatory conflict-of-interest disclosure — to ensure the highest standard of accuracy across all compound profiles, comparison guides, and educational content.',
    expertise: [
      'Peptide Pharmacology',
      'Clinical Trial Analysis',
      'Regulatory Intelligence',
      'Science Communication',
      'GLP-1 Agonist Research',
    ],
    credentials: [
      { label: 'Editorial Policy', url: '/about/editorial-policy' },
      { label: 'About PeptiDex', url: '/about' },
    ],
    sameAs: ['https://peptidex.app'],
  },
];

// ─── HELPERS ─────────────────────────────────────────────────────

/** Map any author byline string to a canonical author slug */
export function getAuthorSlug(byline: string): string {
  const slugMap: Record<string, string> = {
    'Dr. E. Vance': 'dr-e-vance',
    'PeptideX Editorial': 'peptidex-editorial',
    'Editorial Team': 'peptidex-editorial',
    'Legal Dept': 'peptidex-editorial',
  };
  return slugMap[byline] ?? 'peptidex-editorial';
}

/** Get author by slug */
export function getAuthorBySlug(slug: string): Author | undefined {
  return authors.find((a) => a.slug === slug);
}

/** Get author by display name */
export function getAuthorByName(name: string): Author | undefined {
  const slug = getAuthorSlug(name);
  return getAuthorBySlug(slug);
}

/** Get all author slugs for static generation */
export function getAllAuthorSlugs(): string[] {
  return authors.map((a) => a.slug);
}
