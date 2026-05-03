export const DISCLAIMER_TEXT = "EDUCATIONAL AND INFORMATIONAL ONLY. This app is NOT medical advice. Peptides are often research chemicals only and NOT FDA-approved for human use (except specific approved ones like Tirzepatide/Semaglutide under prescription). Consult a licensed healthcare professional before considering any peptide. Information is compiled from peer-reviewed studies (mostly preclinical or early clinical); individual results vary and risks exist. Always verify latest regulatory status. Prominent disclaimers must appear on EVERY screen and recommendation in the app.";

export const SHORT_DISCLAIMER = "⚠️ Educational only · Not medical advice · Consult a doctor · Most peptides are research-only / not FDA-approved for human use";

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
