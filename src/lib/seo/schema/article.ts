export function buildArticleSchema({
  headline,
  description,
  datePublished,
  dateModified,
  author,
  image,
  url
}: {
  headline: string;
  description: string;
  datePublished: string;
  dateModified: string;
  author: { name: string; url?: string };
  image?: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": headline,
    "description": description,
    "datePublished": datePublished,
    "dateModified": dateModified,
    "author": {
      "@type": "Person",
      "name": author.name,
      "url": author.url
    },
    "publisher": {
      "@type": "Organization",
      "name": "PeptiDex",
      "logo": {
        "@type": "ImageObject",
        "url": "https://peptidex.app/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url
    },
    "image": image || "https://peptidex.app/api/og?type=default"
  };
}
