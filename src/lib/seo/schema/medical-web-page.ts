export function buildMedicalWebPageSchema({
  name,
  description,
  url,
  lastReviewed,
  reviewedBy,
  about
}: {
  name: string;
  description: string;
  url: string;
  lastReviewed: string;
  reviewedBy: { name: string; url?: string };
  about: object;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    "name": name,
    "description": description,
    "url": url,
    "lastReviewed": lastReviewed,
    "reviewedBy": {
      "@type": "Person",
      "name": reviewedBy.name,
      "url": reviewedBy.url
    },
    "about": about,
    "author": {
      "@type": "Organization",
      "name": "PeptiDex Editorial Team",
      "url": "https://peptidex.app/about"
    },
    "publisher": {
      "@type": "Organization",
      "name": "PeptiDex",
      "logo": {
        "@type": "ImageObject",
        "url": "https://peptidex.app/logo.png"
      }
    }
  };
}
