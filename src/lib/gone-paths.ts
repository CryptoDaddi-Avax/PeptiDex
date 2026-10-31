/**
 * Paths permanently removed from the site. Served as HTTP 410 Gone by middleware.
 */
const GONE_EXACT = [
  "/guides/reconstitution",
  "/blog/peptide-reconstitution-guide",
  "/beginners-guide",
  "/blog/bpc-157-dosage-complete-guide",
  "/blog/bpc-157-complete-guide",
];

// Matches the path itself and any subpath.
const GONE_PREFIX = ["/tools/calculator", "/tools/reconstitution-calculator"];

export function isGonePath(pathname: string): boolean {
  let p = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
  if (p === "") p = "/";
  if (GONE_EXACT.includes(p)) return true;
  return GONE_PREFIX.some((prefix) => p === prefix || p.startsWith(prefix + "/"));
}
