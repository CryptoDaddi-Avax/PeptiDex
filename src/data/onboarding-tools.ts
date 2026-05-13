/**
 * Onboarding Step 5 — Toolkit Cross-sell Data
 * =============================================
 * Each entry represents one PeptiDex tool surfaced to the warm user
 * at the end of the onboarding flow.
 *
 * INSTRUCTIONS: Replace [TOOL_NAME] / [TOOL_DESCRIPTION] placeholders
 * with real copy before production launch.  The `slug` field drives the
 * `onboarding_tool_launched` GA4 event payload — keep it stable once set.
 */

export interface OnboardingTool {
  /** URL-path to the tool page (used as the card href). */
  href: string;
  /** Stable analytics slug — snake_case, no leading slash. */
  slug: string;
  /** Display title shown on the card. */
  title: string;
  /** One-line description shown beneath the title. */
  desc: string;
  /** Optional badge label (e.g. "ESSENTIAL", "POPULAR"). */
  badge?: string;
  /** Whether to render the card as "coming soon" (non-clickable). */
  comingSoon?: boolean;
}

// ─────────────────────────────────────────────────────────────────────────────
// Toolkit items — populated with initial tools + 2 placeholders.
// Add / reorder freely; the grid layout adapts automatically.
// ─────────────────────────────────────────────────────────────────────────────
export const ONBOARDING_TOOLS: OnboardingTool[] = [
  {
    href: '/tools/calculator',
    slug: 'reconstitution_calculator',
    title: 'Reconstitution Calculator',
    desc: 'Calculate BAC water volumes, solution concentrations, and exact syringe-unit draw marks — from vial to needle in one step.',
    badge: 'ESSENTIAL',
  },
  {
    href: '/tools/cycle-planner',
    slug: 'cycle_planner',
    title: 'Dosage Tracker',
    desc: 'Map your full research protocol end-to-end — vial counts, dosing schedules, total cost, and vendor sourcing on a single timeline.',
    badge: 'POPULAR',
  },
  {
    href: '/peptides',
    slug: 'peptide_library',
    title: 'Peptide Library',
    desc: 'Browse 51+ research-grade peptides ranked by clinical evidence — filterable by goal, mechanism, and half-life.',
  },
  {
    href: '/tools/interactions',
    slug: 'half_life_calculator',
    title: 'Half-Life Calculator',
    desc: 'Model peptide clearance curves for any compound. Understand active windows and plan your injection timing with precision.',
  },
  // ── PLACEHOLDER — replace with real tool before launch ──────────────────
  {
    href: '/tools/evidence',
    slug: 'evidence_dashboard',
    title: '[TOOL_NAME]',
    desc: '[TOOL_DESCRIPTION — one clear sentence explaining the key benefit for a first-time researcher.]',
    comingSoon: true,
  },
  // ── PLACEHOLDER — replace with real tool before launch ──────────────────
  {
    href: '/tools/coa',
    slug: 'coa_analyzer',
    title: '[TOOL_NAME]',
    desc: '[TOOL_DESCRIPTION — one clear sentence explaining the key benefit for a first-time researcher.]',
    comingSoon: true,
  },
];
