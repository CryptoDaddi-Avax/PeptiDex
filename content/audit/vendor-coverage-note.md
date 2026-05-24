# Vendor Coverage & Conversion Optimization Note

* **Date**: 2026-05-24
* **Subject**: Pantheon Peptides & LVLUP Health Coverage Audit

During the numeric consistency audit, we confirmed the following vendor layout state:

1. **Current Layout Mapping**:
   * **Total Vendors in DB**: 6 (Amino Club, Bio Longevity Labs, Limitless Life, Ascension Peptides, Pantheon Peptides, LVLUP Health)
   * **Featured on Homepage**: Top 4 injectable vendors (Amino Club, Bio Longevity Labs, Limitless Life, Ascension Peptides)
   * **Not Featured on Homepage**: Pantheon Peptides (injectable, sortOrder 5) and LVLUP Health (oral specialist, sortOrder 6)

2. **PEPTIDEX Discount Codes Availability**:
   * **Pantheon Peptides**: Active code `PEPTIDEX` is configured in `src/data/vendors.ts` offering **15% off**.
   * **LVLUP Health**: Active code `PEPTIDEX` is configured in `src/data/vendors.ts` offering **15% off**.

3. **Optimization Recommendations for Later Pass**:
   * **Conversion Check**: Pantheon offers high purity and competitive pricing, while LVLUP Health is our only oral specialist. Evaluate if adding a separate "Oral Specialists" card or expanding the featured grid from 4 to 6 on the homepage improves conversion.
   * **Affiliate Revenue**: Both carry the active `PEPTIDEX` discount code; check click-through rates on `/vendors` where they are ranked in full.
