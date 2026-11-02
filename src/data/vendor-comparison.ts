/**
 * @deprecated — Use `/data/vendors.ts` instead.
 * This file is preserved as a backward-compatible re-export shim.
 * It will be removed once all imports are migrated to the centralized vendor registry.
 * Migration date: 2026-04-30
 */

import { vendors, type Vendor } from "@/data/vendors";

/**
 * Vendor-level metadata for /compare/vendor comparisons — derived from
 * src/data/vendors.ts so ratings, badges and rank cannot drift from it.
 */
export type VendorProfile = Vendor;

export const vendorProfiles: Record<string, VendorProfile> = Object.fromEntries(
  vendors.map((v) => [v.slug, v])
);

/** The top peptides used for head-to-head price comparison tables. */
export const TOP_COMPARISON_PEPTIDES = [
  "BPC-157",
  "TB-500",
  "Ipamorelin",
  "Tesamorelin",
  "GHK-Cu",
] as const;

/**
 * All valid vendor comparison slugs. The route is always alphabetical:
 * /compare/vendors/amino-club-vs-ascension-peptides
 */
export const VALID_VENDOR_COMPARISONS = [
  "amino-club-vs-limitless-life",
] as const;

export function getVendorPair(slug: string): [VendorProfile, VendorProfile] | null {
  const parts = slug.split("-vs-");
  if (parts.length !== 2) return null;

  // Handle multi-word slugs: "amino-club" vs "ascension-peptides"
  // The slug format is "amino-club-vs-ascension-peptides"
  const vsIndex = slug.indexOf("-vs-");
  if (vsIndex === -1) return null;

  const slugA = slug.substring(0, vsIndex);
  const slugB = slug.substring(vsIndex + 4);

  const a = vendorProfiles[slugA];
  const b = vendorProfiles[slugB];

  if (!a || !b) return null;
  return [a, b];
}

