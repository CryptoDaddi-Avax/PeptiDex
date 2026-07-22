/**
 * Curated allowlist of programmatic peptide comparison pairs.
 * 
 * Each pair generates a page at /compare/[slug-a]-vs-[slug-b].
 * Slugs are alphabetically ordered for canonical URL consistency.
 * 
 * Pairs already covered by hand-built entries in comparisons.ts are EXCLUDED.
 * The page component checks both sources: comparisons.ts first (hand-built),
 * then this allowlist (programmatic).
 * 
 * Selection criteria:
 * 1. High search volume (known comparison queries)
 * 2. Shared research goal (both in same /best/[goal] hub)
 * 3. Same mechanism class (GHRP vs GHRP, GHRH vs GHRH)
 * 4. Interaction relationship (synergy or contraindication)
 */

export interface ComparisonPair {
  /** Alphabetically ordered slug: "aod-9604-vs-bpc-157" */
  slug: string;
  /** Peptide slug A (alphabetically first) */
  slugA: string;
  /** Peptide slug B (alphabetically second) */
  slugB: string;
  /** Why this pair exists: "search-volume" | "shared-goal" | "same-class" | "interaction" */
  reason: 'search-volume' | 'shared-goal' | 'same-class' | 'interaction';
  /** Shared research goals (slug from /best/[goal]) */
  sharedGoals: string[];
  /** Optional hand-written quick verdict override (40-60 words) */
  verdictOverride?: string;
  /** Optional hand-written recommendation override */
  recommendationOverride?: string;
  /** Optional editor note (thin data warning, cross-trial caveat, etc.) */
  editorNote?: string;
  /** Wave number for drip-feed launch (1-4). Wave 1 launches first. */
  wave: 1 | 2 | 3 | 4;
}

/** Helper: create a pair with alphabetically ordered slugs */
function pair(
  a: string,
  b: string,
  reason: ComparisonPair['reason'],
  sharedGoals: string[],
  wave: ComparisonPair['wave'],
  overrides?: Partial<Pick<ComparisonPair, 'verdictOverride' | 'recommendationOverride' | 'editorNote'>>
): ComparisonPair {
  const [slugA, slugB] = [a, b].sort();
  return {
    slug: `${slugA}-vs-${slugB}`,
    slugA,
    slugB,
    reason,
    sharedGoals,
    wave,
    ...overrides,
  };
}

/**
 * Slugs of hand-built comparisons already in comparisons.ts.
 * These are excluded from programmatic generation.
 */
export const EXISTING_COMPARISON_SLUGS = new Set([
  'bpc-157-vs-tb-500',
  'semaglutide-vs-tirzepatide',
  'tirzepatide-vs-retatrutide',
  'cjc-1295-vs-sermorelin',
  'cjc-1295-vs-ipamorelin',
  'ipamorelin-vs-ghrp-2',
  'ipamorelin-vs-ghrp-6',
  'ghrp-2-vs-ghrp-6',
  'tesamorelin-vs-cjc-1295',
  'semaglutide-vs-retatrutide',
  'tirzepatide-vs-semaglutide',
  'selank-vs-semax',
  'bpc-157-vs-kpv',
  'ghk-cu-vs-bpc-157',
  'mots-c-vs-aod-9604',
  'hexarelin-vs-ipamorelin',
  'll-37-vs-thymosin-alpha-1',
  'epitalon-vs-mots-c',
  'pt-141-vs-melanotan-ii',
  'sermorelin-vs-tesamorelin',
  'mk-677-vs-cjc-1295',
  'cjc-1295-dac-vs-no-dac',
  'ghk-cu-vs-argireline',
  'aod-9604-vs-tesamorelin',
  'epitalon-vs-nad',
  'tesofensine-vs-tirzepatide',
  'tirzepatide-vs-wegovy',
]);

export const comparisonPairs: ComparisonPair[] = [
  // ═══════════════════════════════════════════════════════
  // TIER 1: HIGH SEARCH VOLUME — Wave 1
  // ═══════════════════════════════════════════════════════

  pair('mk-677', 'ipamorelin', 'search-volume', ['muscle-growth', 'sleep-recovery'], 1,
    { verdictOverride: 'MK-677 is an oral GH secretagogue offering convenience and 24-hour IGF-1 elevation, while Ipamorelin is an injectable GHRP with a cleaner side-effect profile — no cortisol or prolactin elevation. MK-677 causes significant appetite increase and potential insulin resistance; Ipamorelin does not.' }),

  pair('bpc-157', 'ghk-cu', 'search-volume', ['injury-recovery', 'skin-aesthetic'], 1,
    { verdictOverride: 'BPC-157 excels at deep tissue repair — tendons, ligaments, and gut lining — via angiogenesis and VEGF upregulation. GHK-Cu is a copper peptide that promotes surface-level wound healing, collagen remodeling, and skin rejuvenation. For structural injuries, BPC-157 is the clear default; for skin and cosmetic goals, GHK-Cu leads.' }),

  pair('bpc-157', 'll-37', 'search-volume', ['injury-recovery', 'immune-support'], 1),

  pair('cagrilintide', 'semaglutide', 'search-volume', ['fat-loss'], 1),

  pair('cagrilintide', 'tirzepatide', 'search-volume', ['fat-loss'], 1),

  pair('tb-500', 'ghk-cu', 'search-volume', ['injury-recovery'], 1),

  pair('melanotan-ii', 'pt-141', 'search-volume', [], 1,
    { editorNote: 'Both Melanotan II and PT-141 (Bremelanotide) are melanocortin receptor agonists. PT-141 is the FDA-approved derivative specifically targeting sexual function. Melanotan II has broader receptor activity including tanning effects.' }),

  pair('dihexa', 'semax', 'search-volume', ['brain-focus'], 1),

  pair('dsip', 'selank', 'search-volume', ['sleep-recovery'], 1),

  pair('epitalon', 'nad', 'search-volume', ['longevity'], 1),

  pair('glutathione', 'nad', 'search-volume', ['longevity'], 1),

  pair('igf-1-lr3', 'mk-677', 'search-volume', ['muscle-growth'], 1),

  pair('follistatin-344', 'igf-1-lr3', 'search-volume', ['muscle-growth'], 1),

  pair('kpv', 'll-37', 'search-volume', ['immune-support', 'gut-health'], 1),

  pair('mots-c', 'ss-31', 'search-volume', ['longevity'], 1),

  pair('semaglutide', 'tesofensine', 'search-volume', ['fat-loss'], 1),

  pair('thymosin-alpha-1', 'll-37', 'search-volume', ['immune-support'], 1),

  pair('5-amino-1mq', 'aod-9604', 'search-volume', ['fat-loss'], 1),

  pair('cagrilintide', 'retatrutide', 'search-volume', ['fat-loss'], 1),

  pair('ipamorelin', 'tesamorelin', 'search-volume', ['fat-loss', 'hormonal-optimization'], 1),

  // ═══════════════════════════════════════════════════════
  // TIER 2: SHARED GOAL CLUSTER — Wave 2
  // ═══════════════════════════════════════════════════════

  // Fat Loss cluster
  pair('aod-9604', 'semaglutide', 'shared-goal', ['fat-loss'], 2),
  pair('aod-9604', 'tirzepatide', 'shared-goal', ['fat-loss'], 2),
  pair('aod-9604', 'retatrutide', 'shared-goal', ['fat-loss'], 2),
  pair('mots-c', 'semaglutide', 'shared-goal', ['fat-loss', 'metabolic-health'], 2),
  pair('mots-c', 'tirzepatide', 'shared-goal', ['fat-loss'], 2),
  pair('mots-c', 'retatrutide', 'shared-goal', ['fat-loss'], 2),
  pair('retatrutide', 'tesamorelin', 'shared-goal', ['fat-loss'], 2),
  pair('semaglutide', 'tesamorelin', 'shared-goal', ['fat-loss', 'metabolic-health'], 2),
  pair('tesamorelin', 'tirzepatide', 'shared-goal', ['fat-loss'], 2),
  pair('aod-9604', 'cagrilintide', 'shared-goal', ['fat-loss'], 2),
  pair('cagrilintide', 'mots-c', 'shared-goal', ['fat-loss'], 2),
  pair('cagrilintide', 'tesamorelin', 'shared-goal', ['fat-loss'], 2),

  // Muscle Growth cluster
  pair('ipamorelin', 'sermorelin', 'shared-goal', ['muscle-growth', 'hormonal-optimization'], 2),
  pair('cjc-1295', 'igf-1-lr3', 'shared-goal', ['muscle-growth'], 2),
  pair('cjc-1295', 'follistatin-344', 'shared-goal', ['muscle-growth'], 2),
  pair('igf-1-lr3', 'sermorelin', 'shared-goal', ['muscle-growth'], 2),

  // Healing cluster
  pair('kpv', 'tb-500', 'shared-goal', ['healing', 'injury-recovery'], 2),
  pair('bpc-157', 'ss-31', 'shared-goal', ['injury-recovery'], 2),
  pair('ss-31', 'tb-500', 'shared-goal', ['injury-recovery'], 2),
  pair('ghk-cu', 'kpv', 'shared-goal', ['injury-recovery'], 2),
  pair('ghk-cu', 'ss-31', 'shared-goal', ['injury-recovery', 'longevity'], 2),

  // Longevity cluster
  pair('epitalon', 'ghk-cu', 'shared-goal', ['longevity'], 2),
  pair('ghk-cu', 'nad', 'shared-goal', ['longevity'], 2),
  pair('epitalon', 'ss-31', 'shared-goal', ['longevity'], 2),
  pair('nad', 'ss-31', 'shared-goal', ['longevity'], 2),
  pair('epitalon', 'mots-c', 'shared-goal', ['longevity'], 2),
  pair('mots-c', 'nad', 'shared-goal', ['longevity', 'metabolic-health'], 2),

  // ═══════════════════════════════════════════════════════
  // TIER 2B: SAME-CLASS COMPARISONS — Wave 3
  // ═══════════════════════════════════════════════════════

  // GH cluster (same mechanism class)
  pair('mk-677', 'sermorelin', 'same-class', ['muscle-growth', 'hormonal-optimization'], 3),
  pair('mk-677', 'tesamorelin', 'same-class', ['fat-loss'], 3),
  pair('ghrp-2', 'mk-677', 'same-class', ['muscle-growth'], 3),
  pair('ghrp-6', 'mk-677', 'same-class', ['muscle-growth'], 3),
  pair('ghrp-2', 'hexarelin', 'same-class', ['muscle-growth'], 3),
  pair('ghrp-6', 'hexarelin', 'same-class', ['muscle-growth'], 3),
  pair('ghrp-2', 'sermorelin', 'same-class', ['muscle-growth'], 3),

  // Cognitive cluster
  pair('pe-22-28', 'semax', 'same-class', ['brain-focus', 'mental-clarity'], 3),
  pair('pe-22-28', 'selank', 'same-class', ['brain-focus', 'mental-clarity'], 3),
  pair('dihexa', 'pe-22-28', 'same-class', ['brain-focus'], 3),
  pair('dihexa', 'selank', 'same-class', ['brain-focus', 'mental-clarity'], 3),

  // Immune cluster
  pair('bpc-157', 'thymosin-alpha-1', 'same-class', ['immune-support'], 3),
  pair('ghk-cu', 'thymosin-alpha-1', 'same-class', ['immune-support'], 3),

  // ═══════════════════════════════════════════════════════
  // TIER 3: CROSS-CATEGORY — Wave 4
  // ═══════════════════════════════════════════════════════

  pair('gonadorelin', 'kisspeptin-10', 'interaction', ['hormonal-optimization'], 4),
  pair('humanin', 'ss-31', 'same-class', ['longevity'], 4),
  pair('humanin', 'mots-c', 'same-class', ['longevity'], 4),
  pair('kpv', 'vip', 'same-class', ['gut-health'], 4),
  pair('bpc-157', 'larazotide', 'shared-goal', ['gut-health'], 4),
  pair('kpv', 'larazotide', 'shared-goal', ['gut-health'], 4),
  pair('thymalin', 'thymosin-alpha-1', 'same-class', ['immune-support'], 4),
  pair('kisspeptin-10', 'oxytocin', 'same-class', ['hormonal-optimization'], 4),
  pair('dsip', 'pinealon', 'same-class', ['sleep-recovery'], 4),
  pair('cortagen', 'selank', 'same-class', ['mental-clarity'], 4),
  pair('epitalon', 'foxo4-dri', 'same-class', ['longevity'], 4),
  pair('epitalon', 'klotho', 'same-class', ['longevity'], 4),
  pair('ara-290', 'bpc-157', 'interaction', ['injury-recovery'], 4),
  pair('ghk-cu', 'os-01', 'same-class', ['skin-aesthetic'], 4,
    { editorNote: 'OS-01 has very limited published research (1 study). This comparison reflects available data; sections may be sparse.' }),
  pair('argireline', 'os-01', 'same-class', ['skin-aesthetic'], 4,
    { editorNote: 'Both Argireline and OS-01 are cosmetic peptides with limited clinical evidence (1 study each). This comparison reflects available data.' }),
];

/** Get all programmatic pairs for a given wave (1-4) */
export function getPairsForWave(wave: number): ComparisonPair[] {
  return comparisonPairs.filter((p) => p.wave <= wave);
}

/** Get all programmatic pairs that involve a given peptide slug */
export function getPairsForPeptide(slug: string): ComparisonPair[] {
  return comparisonPairs.filter((p) => p.slugA === slug || p.slugB === slug);
}

/** Check if a slug (either order) is in the programmatic allowlist */
export function isProgrammaticPair(slug: string): ComparisonPair | undefined {
  // Direct match
  const direct = comparisonPairs.find((p) => p.slug === slug);
  if (direct) return direct;
  // Reverse match (will redirect)
  const parts = slug.split('-vs-');
  if (parts.length === 2) {
    const [a, b] = parts;
    const reversed = `${b}-vs-${a}`;
    return comparisonPairs.find((p) => p.slug === reversed);
  }
  return undefined;
}

/** Wave launch dates — set to future dates to hold, past dates to activate */
export const WAVE_DATES = {
  1: '2026-07-25',  // Launch immediately after approval
  2: '2026-08-08',  // +2 weeks
  3: '2026-08-22',  // +4 weeks
  4: '2026-09-05',  // +6 weeks
} as const;

/** Check if a wave is active (launch date has passed) */
export function isWaveActive(wave: number): boolean {
  const date = WAVE_DATES[wave as keyof typeof WAVE_DATES];
  if (!date) return false;
  return new Date(date) <= new Date();
}

/** Get all currently active pairs (based on wave dates) */
export function getActivePairs(): ComparisonPair[] {
  return comparisonPairs.filter((p) => isWaveActive(p.wave));
}
