export const DISCLAIMER_TEXT = "FOR RESEARCH AND EDUCATIONAL REFERENCE ONLY. This site is NOT medical advice. Most peptides discussed are research compounds sold for laboratory research use only, are not for human consumption, and are NOT FDA-approved for human use (approved drug products such as tesamorelin (Egrifta) and bremelanotide (Vyleesi) are noted where relevant). Information is compiled from peer-reviewed studies, mostly preclinical or early clinical. Always verify current regulatory status in your jurisdiction.";

export const SHORT_DISCLAIMER = "⚠️ For research use only · Not for human consumption · Not medical advice · Not FDA-approved for human use";

/** Editorial review date — auto-computed from last git commit at build time.
 *  NEXT_PUBLIC_BUILD_DATE is injected by next.config.ts via `git log -1 --format=%cI`.
 *  Falls back to hardcoded date only when env var is absent (e.g. plain `tsc` runs).
 */
const _buildDate = new Date(process.env.NEXT_PUBLIC_BUILD_DATE ?? "2026-05-02T00:00:00Z");
export const LAST_REVIEWED_ISO  = _buildDate.toISOString().slice(0, 10);
export const LAST_REVIEWED_DATE = _buildDate.toLocaleDateString("en-US", {
  month: "long", day: "numeric", year: "numeric",
});

export const EVIDENCE_SCALE: Record<string, { label: string; color: string; description: string }> = {
    "very-strong": { label: "Very Strong", color: "emerald", description: "FDA-approved with extensive Phase 3 RCT data" },
    strong: { label: "Strong", color: "emerald", description: "Multiple human RCTs or FDA-reviewed data" },
    "moderate-strong": { label: "Moderate-Strong", color: "teal", description: "Robust human trials with strong outcomes" },
    moderate: { label: "Moderate", color: "amber", description: "Limited human trials or strong observational data" },
    preclinical: { label: "Preclinical", color: "blue", description: "Animal models and in-vitro studies only" },
    emerging: { label: "Emerging", color: "violet", description: "Early-phase or emerging preclinical data" },
    anecdotal: { label: "Anecdotal", color: "zinc", description: "Case reports or very early-phase data" },
};
