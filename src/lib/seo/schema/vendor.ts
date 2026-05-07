export function buildVendorReviewSchema({
  vendorName,
  vendorUrl,
  ratingValue,
  reviewBody,
  canonical,
  datePublished,
  dateModified,
}: {
  vendorName: string;
  vendorUrl: string;
  ratingValue: number;
  reviewBody: string;
  canonical: string;
  datePublished: string;
  dateModified: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Review',
    name: `${vendorName} Review (2026) — PeptiDex`,
    reviewBody,
    datePublished,
    dateModified,
    author: {
      '@type': 'Organization',
      name: 'PeptiDex',
      url: 'https://peptidex.app',
    },
    itemReviewed: {
      '@type': 'Organization',
      name: vendorName,
      url: vendorUrl,
    },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: ratingValue.toString(),
      bestRating: '5',
      worstRating: '1',
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': canonical },
  };
}

export function buildVendorFAQSchema(faqs: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };
}
