# Extended PMID Audit — Goal Pages (All Slugs)
**Generated:** 2026-05-19 via `node scripts/pmid-gate.mjs --diff`  
**Scope:** All PMIDs referenced in `goal-pages.ts` not yet in `verified-pmids.ts`  
**Finding:** 24 unregistered PMIDs found. 21 are clearly wrong (verified via NLM API). 3 are legitimate papers that need to be added to the registry.

> [!CAUTION]
> This is a **second wave** of fabricated citations beyond the 7 fixed on 2026-05-18. These exist in goal pages not yet deep-audited (longevity, immune-support, hormonal-optimization, metabolic-health, gut-health, sleep-recovery, skin-aesthetic, mental-clarity). The scope of the original problem was larger than the body-recomposition audit captured.

---

## 🚨 Clearly Wrong PMIDs (21 confirmed via NLM API)

These PMIDs exist in PubMed but resolve to completely unrelated papers:

| PMID | NLM-Resolved Title (truncated) | Expected Claim | Goal Page |
|------|-------------------------------|---------------|-----------|
| `6149463` | Pheochromocytoma: diagnosis, localization and management | Unknown | TBD |
| `6100589` | Hepatocellular carcinoma in two brothers | Unknown | TBD |
| `27914948` | Triazolopyridine ethers as mGlu(2) positive allosteric modulators | Unknown | TBD |
| `20593777` | Au(I)...Cu(I) interactions in vapochromic sensor | Unknown | TBD |
| `22464738` | Ankle dorsiflexor strength and walking speed | Unknown | TBD |
| `16922784` | A complication of temperature monitoring | Unknown | TBD |
| `12937617` | Endosulfines: Novel regulators of insulin secretion | Unknown | TBD |
| `24706522` | Physical and psychological factors and wish to hasten death in advanced cancer | Unknown | TBD |
| `12937622` | Potential of p38 inhibitors in rheumatoid arthritis | Unknown | TBD (Epitalon) |
| `16216966` | Traumatic pseudoaneurysm of descending thoracic aorta | Unknown | TBD |
| `11756779` | Spiradenocylindroma of the kidney | Unknown | TBD |
| `10828840` | GH secretagogues ipamorelin and GHRP-6 increase bone mineral density | ⚠️ Possibly intended | TBD |
| `10420556` | Analytical characteristics of interneuronal functional connections [Russian] | Unknown (Semax-adjacent?) | TBD |
| `24434250` | Mental health & substance use: challenges for older adults | Unknown | TBD |
| `30302251` | Variable response of telangiectasias to KTP laser | Unknown | TBD |
| `19840484` | Effects of sodium ozagrel in primary thrombocytosis | Unknown | TBD |
| `21235336` | De novo bone formation after sinus lift procedure | Unknown | TBD |
| `25565345` | Young women's access to and use of contraceptives | Unknown | TBD |
| `23812836` | Quantification of mitral valve regurgitation via 3D echocardiography | Unknown | TBD |
| `21775364` | The Supplementary Pension Fund Register | Unknown | TBD |
| `32701508` | Fourman LT 2020 Tesamorelin NAFLD — JCI Insight | ✅ CORRECT (body-recomp) | body-recomposition |

**Note on `32701508`:** This IS a correct Tesamorelin paper. It's unregistered because it was added to goal-pages after the registry addition script ran. Add to registry and it clears.

---

## ✅ Legitimate Papers That Need Registry Addition (3)

| PMID | NLM Title | Relevance | Action |
|------|-----------|-----------|--------|
| `16822960` | Once-daily administration of CJC-1295, a long-acting GHRH analog | CJC-1295 GH pharmacokinetics | Add to registry |
| `18644225` | The human tri-peptide GHK and tissue remodeling | GHK-Cu tissue remodeling mechanism | Add to registry |
| `32257855` | Beyond the androgen receptor: the role of GH secretagogues in the modern era | GH secretagogue overview | Add to registry |

---

## 🔧 Recommended Action Plan

### Phase 1 — Emergency: Remove All Wrong Inline Citations (Before Next Deploy)

Run a targeted sweep of `goal-pages.ts` to identify which goal page sections contain these wrong PMIDs and remove the inline `(PMID: XXXXX)` markers and reference objects.

Priority: **All 20 clearly wrong PMIDs must be removed before next production deploy.**

The pre-deploy gate currently returns exit 0 for unregistered PMIDs (warnings only). **Once the wrong PMIDs are removed from goal-pages.ts and the 3 legitimate ones are added to the registry, update the gate to exit 1 for any unregistered PMID** — making registration mandatory before deploy.

### Phase 2 — Hardening: Make Gate Blocking for Unregistered PMIDs

In `scripts/pmid-gate.mjs`, change the unregistered PMID handling from `warnings.push()` to `errors.push()`. This makes registration mandatory before any PMID-cited content can deploy.

### Phase 3 — Rebuild Affected Content Sections

For each goal page with removed citations, rebuild the citation-less claim with either:
- A verified correct PMID (after operator research)
- Transparent passive attribution ("published research suggests...")
- Removal of the specific quantitative claim if no valid citation exists

---

## Affected Goal Pages (Estimate)

Based on the PMID patterns, the likely affected goal pages are:
- `/best/longevity` — Epitalon (12937622), GHK-Cu (multiple)
- `/best/immune-support` — Multiple unknown
- `/best/hormonal-optimization` — Sermorelin (removed), possibly others
- `/best/metabolic-health` — MOTS-c adjacent, Tesamorelin
- `/best/gut-health` — BPC-157 adjacent
- `/best/sleep-recovery` — DSIP-related
- `/best/skin-aesthetic` — GHK-Cu (26195973 already fixed, but others possible)
- `/best/mental-clarity` — Selank/Semax (already cleaned, others possible)

**Next step:** Run `grep -n "PMID" src/data/goal-pages.ts` to map every PMID reference to its line and goal section, then cross-reference with the wrong PMID list above.
