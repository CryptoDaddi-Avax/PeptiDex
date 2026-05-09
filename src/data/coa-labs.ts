/**
 * COA Lab Credibility Registry
 * ============================
 * Used by the COA Analyzer tool to flag known reputable labs vs unknown.
 * Extend this list as new labs are verified.
 */

export type LabTier = "reputable" | "acceptable" | "unverified" | "flagged";

export interface LabProfile {
  /** Canonical name (lowercase for matching) */
  name: string;
  /** Display name */
  displayName: string;
  tier: LabTier;
  /** Short credibility note shown to the user */
  note: string;
  /** Methods commonly associated with this lab */
  methods?: string[];
  website?: string;
}

export const LAB_REGISTRY: LabProfile[] = [
  // ── Tier 1: Reputable (independently verifiable, widely cited) ──────────────
  {
    name: "janoshik",
    displayName: "Janoshik Analytical",
    tier: "reputable",
    note: "Independent Czech lab widely used in research peptide community. Reports verifiable via batch number on janoshik.com.",
    methods: ["HPLC", "LC-MS", "NMR"],
    website: "https://janoshik.com",
  },
  {
    name: "mz biolabs",
    displayName: "MZ Biolabs",
    tier: "reputable",
    note: "US-based GLP-compliant CRO. Used by multiple tier-1 vendors. Mass spec and purity data verifiable.",
    methods: ["HPLC", "Mass Spec", "Endotoxin"],
    website: "https://mzbiolabs.com",
  },
  {
    name: "colmaric analyticals",
    displayName: "Colmaric Analyticals",
    tier: "reputable",
    note: "Established US analytical lab frequently cited in research peptide COAs. Reports include HPLC and LC-MS.",
    methods: ["HPLC", "LC-MS"],
    website: "https://colmaricanalyticals.com",
  },
  {
    name: "colmaric",
    displayName: "Colmaric Analyticals",
    tier: "reputable",
    note: "Established US analytical lab frequently cited in research peptide COAs. Reports include HPLC and LC-MS.",
    methods: ["HPLC", "LC-MS"],
    website: "https://colmaricanalyticals.com",
  },
  {
    name: "freedom diagnostics",
    displayName: "Freedom Diagnostics",
    tier: "reputable",
    note: "US third-party testing lab with verifiable COA numbers. Commonly provides HPLC purity and identity confirmation.",
    methods: ["HPLC", "Identity confirmation"],
  },
  {
    name: "simec ag",
    displayName: "SIMEC AG",
    tier: "reputable",
    note: "Swiss GMP-accredited analytical laboratory. High credibility for pharmaceutical-grade testing.",
    methods: ["HPLC", "LC-MS", "NMR", "Elemental analysis"],
    website: "https://www.simec.ch",
  },
  {
    name: "eurofins",
    displayName: "Eurofins Scientific",
    tier: "reputable",
    note: "Large accredited global CRO network. COAs from Eurofins carry strong institutional credibility.",
    methods: ["HPLC", "LC-MS", "GC-MS", "NMR"],
    website: "https://www.eurofins.com",
  },
  {
    name: "intertek",
    displayName: "Intertek",
    tier: "reputable",
    note: "Globally accredited testing and certification body. Frequently used for pharmaceutical ingredients.",
    methods: ["HPLC", "LC-MS"],
    website: "https://www.intertek.com",
  },
  {
    name: "sgs",
    displayName: "SGS",
    tier: "reputable",
    note: "Global leader in inspection and testing. ISO 17025 accredited.",
    methods: ["HPLC", "LC-MS", "GC-MS"],
    website: "https://www.sgs.com",
  },

  // ── Tier 2: Acceptable (smaller or less-documented but generally trusted) ───
  {
    name: "acro biosystems",
    displayName: "ACROBiosystems",
    tier: "acceptable",
    note: "Biotechnology company with internal QC. Generally acceptable for research-grade compounds.",
    methods: ["HPLC", "SDS-PAGE"],
  },
  {
    name: "genscript",
    displayName: "Genscript",
    tier: "acceptable",
    note: "Large peptide synthesis CRO with in-house QC. Acceptable for research use.",
    methods: ["HPLC", "Mass Spec"],
    website: "https://www.genscript.com",
  },
  {
    name: "creative peptides",
    displayName: "Creative Peptides",
    tier: "acceptable",
    note: "Peptide manufacturer with in-house analytical testing. Generally acceptable.",
    methods: ["HPLC", "MS"],
  },

  // ── Flagged: known or suspected in-house / unverifiable ─────────────────────
  {
    name: "internal",
    displayName: "Internal Lab (Vendor)",
    tier: "flagged",
    note: "Vendor-internal COAs cannot be independently verified. Always prefer third-party testing.",
    methods: [],
  },
  {
    name: "in-house",
    displayName: "In-House Testing",
    tier: "flagged",
    note: "In-house testing has no independent oversight. Cannot confirm objectivity.",
    methods: [],
  },
  {
    name: "proprietary",
    displayName: "Proprietary Lab",
    tier: "flagged",
    note: "Proprietary/unnamed labs cannot be cross-referenced. Treat results with caution.",
    methods: [],
  },
];

/** Normalise lab name and return its profile, or null if not in registry */
export function lookupLab(rawName: string): LabProfile | null {
  const normalised = rawName.trim().toLowerCase();
  return (
    LAB_REGISTRY.find(lab => normalised.includes(lab.name) || lab.name.includes(normalised)) ?? null
  );
}

export const TIER_STYLES: Record<LabTier, { label: string; color: string; border: string; bg: string }> = {
  reputable:   { label: "✅ Reputable Lab",   color: "text-emerald-400", border: "border-emerald-500/30", bg: "bg-emerald-900/20" },
  acceptable:  { label: "🟡 Acceptable Lab",  color: "text-amber-400",   border: "border-amber-500/30",   bg: "bg-amber-900/20" },
  unverified:  { label: "❓ Unknown Lab",      color: "text-zinc-400",    border: "border-zinc-600/50",    bg: "bg-zinc-900/40" },
  flagged:     { label: "🚫 In-House / Unverifiable", color: "text-red-400", border: "border-red-500/30", bg: "bg-red-900/20" },
};
