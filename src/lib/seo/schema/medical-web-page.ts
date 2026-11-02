export function buildMedicalWebPageSchema({
  name,
  description,
  url,
  lastReviewed,
  about
}: {
  name: string;
  description: string;
  url: string;
  lastReviewed: string;
  about: object;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    "name": name,
    "description": description,
    "url": url,
    "lastReviewed": lastReviewed,
    "isAccessibleForFree": "True",
    "educationalUse": "assignment",
    "educationalLevel": "expert",
    "about": about,
    "author": {
      "@type": "Organization",
      "name": "PeptiDex Editorial Team",
      "url": "https://peptidex.app/team/peptidex-research"
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
