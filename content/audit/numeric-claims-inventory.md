# Numeric Claims Inventory

| Number Claimed | Source File | Context | True Value (Proposed) | Status |
|---|---|---|---|---|
| **51** peptides | `src/app/layout.tsx` (L33, L54) | Root metadata description ("51 peptide profiles") | `SITE_STATS.peptides.count` | Mismatch |
| **51** peptides | `src/app/page.tsx` (L6) | Homepage metadata ("51 peptide profiles") | `SITE_STATS.peptides.count` | Mismatch |
| **51** peptides | `src/app/about/page.tsx` (L34) | About page metadata ("51 peptide profiles") | `SITE_STATS.peptides.count` | Mismatch |
| **51** peptides | `src/app/tools/pk/layout.tsx` (L5, 9) | PK tool metadata ("51 peptides") | `SITE_STATS.peptides.count` | Mismatch |
| **51** peptides | `src/app/tools/ToolsClient.tsx` (L42) | Evidence dashboard desc ("All 51 peptides ranked") | `SITE_STATS.peptides.count` | Mismatch |
| **51** peptides | `src/components/redesign/ToolsSection.tsx` (L22) | Tools section desc ("51 peptides ranked") | `SITE_STATS.peptides.count` | Mismatch |
| **51** peptides | `src/app/tools/calculator/page.tsx` (L253) | Calculator page ("supports all 51 peptides") | `SITE_STATS.peptides.count` | Mismatch |
| **51** peptides | `src/data/advisor-engine.ts` (L265) | Advisor prompt ("All 51 peptides") | `SITE_STATS.peptides.count` | Mismatch |
| **33** peptides | `src/app/library/layout.tsx` (L5, L9) | Library metadata ("Browse 33 Research Peptides") | `SITE_STATS.peptides.count` | Mismatch |
| **33+** peptides | `src/app/peptides/page.tsx` (L12, 23, 30) | Peptides index metadata ("33+ peptide compounds") | `SITE_STATS.peptides.count` | Mismatch |
| **33** peptides | `src/app/tools/evidence-map/page.tsx` (L15, 20) | Evidence map title/meta ("33 Compounds Ranked") | `SITE_STATS.peptides.count` | Mismatch |
| **12** stacks | `src/app/layout.tsx` (L33) | Root metadata description ("12 evidence-based stacks") | `SITE_STATS.stacks.count` | Matches |
| **12** stacks | `src/components/lead-magnet-inline.tsx` (L71) | Lead magnet ("12 stacks") | `SITE_STATS.stacks.count` | Matches |
| **6** vendors | `src/lib/email/welcome-sequence.ts` (L13, 138, 144) | Email sequence ("The 6 Vendors We Trust") | `SITE_STATS.vendors.count` | Matches |
| **6** vendors | `src/data/coupon-page-config.ts` (L142, 178) | Coupon FAQ ("verify it monthly across all 6 vendors") | `SITE_STATS.vendors.count` | Matches |
| **6** vendors | `src/app/tools/pricing/PricingClient.tsx` (L716) | Pricing tool UI ("All 6 vendors") | `SITE_STATS.vendors.count` | Matches |
| **6** vendors | `src/components/redesign/onboarding/steps/VendorsStep.tsx` (L8) | Onboarding comment ("Show all 6 vendors") | `SITE_STATS.vendors.count` | Matches |
| **10** tools | `src/app/tools/page.tsx` (L7, 25, 37) | Tools metadata ("10 free interactive... tools") | `SITE_STATS.tools.count` | Needs reconcile |
| **99%**+ | `src/data/vendor-comparison.ts` (L40, 77, 95) | Vendor comparison table ("99%+") | `SITE_STATS.purityThreshold` | Matches |
| **99%**+ | `src/data/vendors.ts` (L64, 121, 153, 185) | Vendor registry purity claim ("99%+") | `SITE_STATS.purityThreshold` | Matches |
| **99%**+ | `src/data/reviews/*.ts` | Vendor reviews ("99%+") | `SITE_STATS.purityThreshold` | Matches |

*Note: 668 studies was not found hardcoded in the codebase text, meaning it might be dynamically calculated or missing. 10 tools is mentioned in tools/page.tsx but more than 10 are rendered.*
