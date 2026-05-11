import type { Metadata } from "next";
import InteractionsClient from "./InteractionsClient";

export const metadata: Metadata = {
  title: "Peptide Stack Conflict Checker — Interaction Analyzer | PeptiDex",
  description:
    "Check interactions between up to 6 peptides at once. Severity-graded warnings (SAFE → DO NOT STACK), PubMed citations, and alternative recommendations. Free research tool.",
  alternates: { canonical: "https://peptidex.app/tools/interactions" },
  openGraph: {
    title: "Peptide Stack Interaction Checker — Free Tool | PeptiDex",
    description:
      "Analyze up to 6 peptides for conflicts. SAFE to DO NOT STACK severity grading with citations.",
    url: "https://peptidex.app/tools/interactions",
    type: "website",
  },
};

const schemaJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      name: "PeptiDex Stack Conflict Checker",
      url: "https://peptidex.app/tools/interactions",
      description:
        "Interactive tool for checking interactions between up to 6 research peptides. Provides severity-graded warnings (SAFE, CAUTION, WARNING, DO NOT STACK) with PubMed-cited evidence and alternative compound suggestions.",
      applicationCategory: "HealthApplication",
      operatingSystem: "Any",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
      },
      creator: {
        "@type": "Organization",
        name: "PeptiDex",
        url: "https://peptidex.app",
      },
      featureList: [
        "Multi-peptide selector (up to 6)",
        "Severity-graded conflict analysis (SAFE/CAUTION/WARNING/DO_NOT_STACK)",
        "PubMed-cited evidence for each interaction pair",
        "Alternative compound suggestions on conflicts",
        "Save to Cycle Planner integration",
        "52+ interaction pairs in database",
      ],
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://peptidex.app" },
        { "@type": "ListItem", position: 2, name: "Tools", item: "https://peptidex.app/tools" },
        {
          "@type": "ListItem",
          position: 3,
          name: "Stack Conflict Checker",
          item: "https://peptidex.app/tools/interactions",
        },
      ],
    },
  ],
};

export default function InteractionsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJsonLd) }}
      />
      <InteractionsClient />
    </>
  );
}
