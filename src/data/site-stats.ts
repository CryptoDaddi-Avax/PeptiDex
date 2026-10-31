import { peptides } from "./peptides";
import { stacks } from "./stacks";

// Content counts are derived from the data layer so they can never drift
// from what the site actually ships. `studies` is the number of cited
// key_studies (PubMed references) across all peptide profiles.
// Note: peptides/stacks are already part of the global client bundle
// (CommandPalette via GlobalShell), so importing them here adds no weight.
const STUDY_COUNT = peptides.reduce((sum, p) => sum + (p.key_studies?.length ?? 0), 0);

export const SITE_STATS = {
  peptides: { count: peptides.length, label: "Research Peptides" },
  stacks: { count: stacks.length, label: "Curated Stacks" },
  studies: { count: STUDY_COUNT, label: "Peer-Reviewed Studies" },
  vendors: { count: 6, label: "Verified Vendors" },
  tools: { count: 9, label: "Research Tools" },
  purityThreshold: { value: 99, unit: "%", label: "COA Purity Threshold" },
  lastReviewed: "2026-05-15", // ISO date, auto-updated by freshness engine
} as const;
