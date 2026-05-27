/**
 * Library-specific JSON-LD schema generators
 * Centralizes MedicalWebPage, Drug enrichment, and FAQPage for /library/[slug] pages.
 */

// ── Types ────────────────────────────────────────────────────────────────────

export interface LibraryMedicalWebPageParams {
  name: string;
  description: string;
  url: string;
  dateModified: string;
  datePublished?: string;
  reviewedBy?: { name: string; url?: string };
  about: object;
  keywords?: string[];
}

export interface LibraryFAQParams {
  q: string;
  a: string;
}

// ── MedicalWebPage ───────────────────────────────────────────────────────────

export function buildLibraryMedicalWebPageSchema(params: LibraryMedicalWebPageParams) {
  const { name, description, url, dateModified, datePublished, reviewedBy, about, keywords } = params;
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    name,
    description,
    url,
    datePublished: datePublished ?? '2026-01-15',
    dateModified,
    lastReviewed: dateModified,
    ...(reviewedBy
      ? {
          reviewedBy: {
            '@type': 'Person',
            name: reviewedBy.name,
            ...(reviewedBy.url ? { url: reviewedBy.url } : {}),
          },
        }
      : {}),
    author: {
      '@type': 'Person',
      name: 'Dr. E. Vance',
      url: 'https://peptidex.app/team/peptidex-research',
    },
    publisher: {
      '@type': 'Organization',
      name: 'PeptiDex',
      url: 'https://peptidex.app',
      logo: {
        '@type': 'ImageObject',
        url: 'https://peptidex.app/logo.png',
      },
    },
    about,
    ...(keywords && keywords.length > 0 ? { keywords: keywords.join(', ') } : {}),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
  };
}

// ── Expanded FAQPage ─────────────────────────────────────────────────────────

export function buildLibraryFAQSchema(qaPairs: LibraryFAQParams[]) {
  if (!qaPairs || qaPairs.length === 0) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: qaPairs.map((qa) => ({
      '@type': 'Question',
      name: qa.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: qa.a,
      },
    })),
  };
}
