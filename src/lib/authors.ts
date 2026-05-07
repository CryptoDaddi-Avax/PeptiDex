// Single-author setup. PeptiDex is a one-person independent research project.
// Legacy slugs ('dr-e-vance', 'peptidex-editorial') are kept as URL aliases so
// existing internal links keep working — they all resolve to the same author.

import peptidexResearch from '@/content/authors/peptidex-research.json';

export type AuthorRole = 'editor' | 'reviewer' | 'fact-checker' | 'contributor';

export interface Author {
  slug: string;
  name: string;
  title: string;
  role: AuthorRole;
  credentials: string[];
  specialties: string[];
  bio: string;
  photo: string;
  imageAlt: string;
  sameAs: string[];
  alumniOf?: string[];
  worksFor?: string;
  reviewedPages?: string[];

  // legacy aliases used by older call sites
  image: string;
  expertise: string[];
  links: { label: string; url: string }[];
}

interface RawAuthor {
  slug?: string;
  name?: string;
  title?: string;
  role?: string;
  credentials?: string[];
  specialties?: string[];
  expertise?: string[];
  bio?: string;
  photo?: string;
  image?: string;
  imageAlt?: string;
  sameAs?: string[];
  alumniOf?: string[];
  worksFor?: string;
  reviewedPages?: string[];
}

const RAW: RawAuthor[] = [peptidexResearch];

/** Slugs that should redirect/canonicalize to a primary author slug. */
const SLUG_ALIASES: Record<string, string> = {
  'dr-e-vance': 'peptidex-research',
  'peptidex-editorial': 'peptidex-research',
};

function labelForUrl(url: string): string {
  if (url.includes('linkedin.com')) return 'LinkedIn';
  if (url.includes('orcid.org')) return 'ORCID';
  if (url.includes('scholar.google')) return 'Google Scholar';
  if (url.includes('researchgate.net')) return 'ResearchGate';
  if (url.includes('pubmed')) return 'PubMed';
  if (url.startsWith('/')) return 'Profile';
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return 'Profile';
  }
}

function normalize(data: RawAuthor): Author {
  const photo = data.photo ?? data.image ?? '';
  const specialties = data.specialties ?? data.expertise ?? [];
  const allSameAs = data.sameAs ?? [];
  const verifiedSameAs = allSameAs.filter((s) => !s.startsWith('['));
  const links = verifiedSameAs.map((url) => ({ label: labelForUrl(url), url }));
  const role = (data.role ?? 'contributor') as AuthorRole;

  return {
    slug: data.slug ?? '',
    name: data.name ?? '',
    title: data.title ?? '',
    role,
    credentials: data.credentials ?? [],
    specialties,
    bio: data.bio ?? '',
    photo,
    imageAlt: data.imageAlt ?? `${data.name ?? 'Contributor'} — PeptiDex`,
    sameAs: allSameAs,
    alumniOf: data.alumniOf,
    worksFor: data.worksFor,
    reviewedPages: data.reviewedPages,
    image: photo,
    expertise: specialties,
    links,
  };
}

const AUTHORS: Author[] = RAW.map(normalize);

export function getAllAuthors(): Author[] {
  return AUTHORS;
}

/** Look up an author by primary slug or any legacy alias. */
export function getAuthorBySlug(slug: string): Author | undefined {
  const canonical = SLUG_ALIASES[slug] ?? slug;
  return AUTHORS.find((a) => a.slug === canonical);
}

/** Returns primary slugs *and* aliases so generateStaticParams covers existing URLs. */
export function getAllAuthorSlugs(): string[] {
  const primary = AUTHORS.map((a) => a.slug);
  const aliases = Object.keys(SLUG_ALIASES);
  return Array.from(new Set([...primary, ...aliases]));
}

/** The canonical slug for any input slug (primary or alias). */
export function getCanonicalSlug(slug: string): string {
  return SLUG_ALIASES[slug] ?? slug;
}

export function getAuthorsByRole(role: AuthorRole): Author[] {
  return AUTHORS.filter((a) => a.role === role);
}

const BYLINE_TO_SLUG: Record<string, string> = {
  'PeptiDex Research': 'peptidex-research',
  'PeptiDex Editorial': 'peptidex-research',
  'PeptideX Editorial': 'peptidex-research',
  'Editorial Team': 'peptidex-research',
  'Dr. E. Vance': 'peptidex-research',
  'Legal Dept': 'peptidex-research',
};

export function getAuthorSlug(byline: string): string {
  if (BYLINE_TO_SLUG[byline]) return BYLINE_TO_SLUG[byline];
  const match = AUTHORS.find((a) => a.name === byline || a.slug === byline);
  return match?.slug ?? 'peptidex-research';
}

export function getAuthorByName(name: string): Author | undefined {
  return getAuthorBySlug(getAuthorSlug(name));
}

export function getPersonSchema(author: Author, baseUrl = 'https://peptidex.app') {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: author.name,
    description: author.bio.split('\n\n')[0],
    url: `${baseUrl}/team/${author.slug}`,
    worksFor: {
      '@type': 'Organization',
      name: author.worksFor || 'PeptiDex',
      url: baseUrl,
    },
    knowsAbout: author.specialties.filter((s) => !s.startsWith('[')),
  };
  if (author.title) schema.jobTitle = author.title;
  if (author.photo) schema.image = `${baseUrl}${author.photo}`;
  const verifiedSameAs = author.sameAs.filter((s) => !s.startsWith('['));
  if (verifiedSameAs.length > 0) schema.sameAs = verifiedSameAs;
  return schema;
}
