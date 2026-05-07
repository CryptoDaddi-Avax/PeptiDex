export function buildFAQPageSchema(qaPairs: { q: string; a: string }[]) {
  if (!qaPairs || qaPairs.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": qaPairs.map(qa => ({
      "@type": "Question",
      "name": qa.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": qa.a
      }
    }))
  };
}
