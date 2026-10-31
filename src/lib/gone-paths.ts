/**
 * Paths permanently removed from the site. Served as HTTP 410 Gone by middleware.
 */
const GONE_EXACT = [
  "/guides/reconstitution",
  "/blog/peptide-reconstitution-guide",
  "/beginners-guide",
  "/blog/bpc-157-dosage-complete-guide",
  "/blog/bpc-157-complete-guide",
  // Weight-loss / metabolic content removed 2026-10-31
  "/blog/oral-peptide-revolution",
  "/blog/oral-vs-injectable-peptides",
  "/compare/oral-vs-injectable-peptides",
  "/blog/best-peptides-for-fat-loss",
  "/best/fat-loss",
  "/best/metabolic-health",
  "/goals/fat-loss",
  "/goals/metabolic-health",
  "/stacks/fat-loss-focus-stack",
  "/stacks/metabolic-insulin-sensitivity-stack",
];

// Matches the path itself and any subpath.
const GONE_PREFIX = ["/tools/calculator", "/tools/reconstitution-calculator"];

// Any URL naming a removed compound (library, learn, logs, peptides/*/at/*,
// buy, where-to-buy, vendor product pages, compare/vs pairs, blog, COA PDFs).
// Kept in sync with REMOVED_SLUG_PATTERN in next.config.ts.
export const REMOVED_COMPOUND_PATTERN =
  /retatrutide|tirzepatide|semaglutide|cagrilintide|cagrisema|tesofensine|glp-?1|wegovy|ozempic|mounjaro|zepbound|rybelsus|saxenda|liraglutide|orforglipron/i;

export function isGonePath(pathname: string): boolean {
  let p = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
  if (p === "") p = "/";
  if (GONE_EXACT.includes(p)) return true;
  if (REMOVED_COMPOUND_PATTERN.test(p)) return true;
  return GONE_PREFIX.some((prefix) => p === prefix || p.startsWith(prefix + "/"));
}
