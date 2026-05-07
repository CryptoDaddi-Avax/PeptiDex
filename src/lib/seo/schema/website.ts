export function buildWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "PeptiDex",
    "url": "https://peptidex.app/",
    "description": "Research-Grade Peptide Reference, Stacks & Trusted Vendor Sourcing",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://peptidex.app/research?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };
}
