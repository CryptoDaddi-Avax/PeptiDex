export const SITE_STATS = {
  peptides: { count: 51, label: "Research Peptides" },
  stacks: { count: 12, label: "Curated Stacks" },
  studies: { count: 668, label: "Peer-Reviewed Studies" },
  vendors: { count: 6, label: "Verified Vendors" },
  tools: { count: 10, label: "Research Tools" },
  purityThreshold: { value: 99, unit: "%", label: "COA Purity Threshold" },
  lastReviewed: "2026-05-15", // ISO date, auto-updated by freshness engine
} as const;
