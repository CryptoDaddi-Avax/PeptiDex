export function buildOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "PeptiDex",
    "alternateName": ["PeptiDex Research Index", "peptidex.app"],
    "url": "https://peptidex.app",
    "description": "PeptiDex (peptidex.app) is the independent peptide research index — 33 peptide profiles, 12 evidence-based stacks, free reconstitution & cycle-planning tools, and COA verification. Not affiliated with any tracker app or vendor.",
    "logo": "https://peptidex.app/logo.png",
    "sameAs": [
      "https://twitter.com/peptidex",
      "https://facebook.com/peptidex",
      "https://github.com/peptidex",
      "https://www.crunchbase.com/organization/peptidex"
    ]
  };
}

export function buildWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "PeptiDex",
    "url": "https://peptidex.app/",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://peptidex.app/library?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };
}

export function buildBreadcrumbSchema(items: { name: string; url?: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url || undefined
    }))
  };
}

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

export function buildHowToSchema({
  name,
  description,
  steps,
  totalTime,
  supply,
  tool
}: {
  name: string;
  description: string;
  steps: { name: string; text: string; url?: string }[];
  totalTime?: string;
  supply?: string[];
  tool?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": name,
    "description": description,
    "totalTime": totalTime,
    "supply": supply?.map(s => ({ "@type": "HowToSupply", "name": s })),
    "tool": tool?.map(t => ({ "@type": "HowToTool", "name": t })),
    "step": steps.map(s => ({
      "@type": "HowToStep",
      "name": s.name,
      "text": s.text,
      "url": s.url
    }))
  };
}

export function buildDrugSchema({
  name,
  alternateName,
  description,
  mechanismOfAction,
  clinicalPharmacology
}: {
  name: string;
  alternateName?: string[];
  description: string;
  mechanismOfAction: string;
  clinicalPharmacology?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Drug",
    "name": name,
    "alternateName": alternateName,
    "description": description,
    "mechanismOfAction": mechanismOfAction,
    "clinicalPharmacology": clinicalPharmacology,
    "legalStatus": "Research chemical, not approved for human use"
  };
}

export function buildSoftwareApplicationSchema({
  name,
  description,
  url,
  applicationCategory
}: {
  name: string;
  description: string;
  url: string;
  applicationCategory: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": name,
    "description": description,
    "url": url,
    "applicationCategory": applicationCategory,
    "operatingSystem": "All"
  };
}
