export function buildWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "PEPTIDEX",
    "url": "https://peptidex.app/",
    "description": "Independent peptide research index — profiles, evidence-based stacks, reconstitution tools, and COA-verified vendor sourcing.",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://peptidex.app/library?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };
}
