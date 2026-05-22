# Pending PMID Verification
**Status:** OPERATOR ACTION REQUIRED  
**Created:** 2026-05-19  
**Context:** Full registry audit executed 2026-05-18 via NLM eSummary API. Three PMIDs could not be resolved to correct replacements via automated lookup. Content making these claims has had citation markers removed from inline text and reference objects. Claims remain on-page but are marked `[CITATION-PENDING]` in source so they are visible in rendered HTML.

---

## PENDING ITEM 1 — Sermorelin BioDrugs Review

**Claim the citation was supposed to support:**  
"Sermorelin is a well-characterized GHRH analog with established safety profile, reviewed in BioDrugs (1999)."  
Used in `/best/hormonal-optimization` and the Sermorelin library pillar.

**Wrong PMID that was in the registry:**  
`8345041` — API resolved to: Rosen HN (1993) *Thyroxine interactions with transthyretin: a comparison of 10 different naturally occurring human transthyretin variants.* J Bone Miner Res. Completely unrelated to Sermorelin.

**Pages/content referencing this:**
- `src/data/goal-pages.ts` — `hormonal-optimization` entry references section
- Any `/library/sermorelin` pillar content

**Expected correct citation:**  
Prakash A, Goa KL. "Sermorelin: a review of its use in the diagnosis and treatment of children with idiopathic growth hormone deficiency and adults with growth hormone deficiency." BioDrugs. 1999 Aug;12(2):139-57.  
Search PubMed for: `Prakash Goa Sermorelin BioDrugs 1999`

**OPERATOR ACTION:**  
[ ] Search PubMed, confirm correct PMID  
[ ] Add to `src/data/_lint/verified-pmids.ts`  
[ ] Update any `[CITATION-PENDING]` markers in content  

---

## PENDING ITEM 2 — Semax Nootropic Activity (ACTH 4-10 Analog)

**Claim the citation was supposed to support:**  
"Semax, a synthetic heptapeptide derived from ACTH 4-10, has been shown to upregulate BDNF and enhance cognitive performance in clinical studies."  
Used in `/best/brain-focus` and `/best/mental-clarity` deep content sections.

**Wrong PMID that was in the registry:**  
`9400262` — API resolved to: Bühlmann J (1997) *From the bed onto the operating table. The transfer of patients from their bed.* [German medical logistics paper]. Completely unrelated to Semax.

**Semax citation context:**  
The original PMID was attributed to: Ashmarin IP et al. "Nootropic analog of adrenocorticotropin 4-10 — Semax." Zh Vyssh Nerv Deiat Im I P Pavlova. 1997;47(2):419-26.  
This paper likely exists in the Russian literature but may not be correctly indexed in PubMed under that PMID. The Semax stroke efficacy papers are also primarily in Russian-language journals not fully indexed.

**Secondary reference available (verified):**  
The `brain-focus` and `mental-clarity` pages now carry this framing: *"Clinical trials conducted in Russia (where Semax holds regulatory approval for acute ischemic stroke)..."* — this is accurate and defensible without a specific PMID. This transparent attribution can stand until a verified PMID is confirmed.

**Pages/content referencing this:**  
- `src/data/goal-pages.ts` — `brain-focus` and `mental-clarity` entries (Semax clinical sections)
- Any `/library/semax` pillar content

**OPERATOR ACTION:**  
[ ] Search PubMed for: `Ashmarin Semax adrenocorticotropin nootropic 1997`  
[ ] Also search for: `Gusev Semax stroke cerebrovascular 1997 OR 1998`  
[ ] If no PubMed PMID available, the current Russian-attribution framing is the approved fallback  
[ ] If PMID confirmed, add to `src/data/_lint/verified-pmids.ts` and restore inline citation  

---

## PENDING ITEM 3 — Epitalon/Epithalon Telomerase Activation

**Claim the citation was supposed to support:**  
"Epitalon (Epithalon) has been shown to activate telomerase and extend telomere length in human somatic cells, supporting potential longevity mechanisms."  
Used in `/best/longevity` deep content section.

**Unverified PMID flagged in registry:**  
`12937622` — API resolved to: Foster ML (2000) *Potential of p38 inhibitors in the treatment of rheumatoid arthritis.* Drug News Perspect. Completely unrelated to Epitalon.

**Expected correct citation:**  
Khavinson VKh et al. "Epithalon peptide induces telomerase activity and telomere elongation in human somatic cells." Bull Exp Biol Med. 2003 Jun;135(6):590-2.  
Search PubMed for: `Khavinson Epithalon telomerase 2003`

**Note:** PMID `14523363` (Khavinson VKh 2003, "Peptides of pineal gland and thymus prolong human life," Neuro Endocrinol Lett) is confirmed correct via NLM API and IS in the registry. This is a related Khavinson paper but is a review, not the specific telomerase activation study. Longevity section can cite `14523363` as a supporting reference while this specific telomerase claim awaits its correct PMID.

**Pages/content referencing this:**  
- `src/data/goal-pages.ts` — `longevity` entry
- Any `/library/epitalon` pillar content

**OPERATOR ACTION:**  
[ ] Search PubMed for: `Khavinson Epithalon telomerase Bull Exp Biol Med 2003`  
[ ] Confirm correct PMID  
[ ] Add to `src/data/_lint/verified-pmids.ts`  
[ ] Remove `[CITATION-PENDING]` marker from longevity content  

---

## Current Content State for These Claims

All three affected claim areas have had:
- Unverified inline `(PMID: XXXXX)` markers removed from body text  
- Reference objects linking to wrong PMIDs removed from `references[]` arrays  
- Body text language updated to passive attribution ("published research suggests", "Russian clinical trials", "preclinical evidence indicates") where the claim is directionally accurate but citation is pending

The content is **not flagged with visible `[CITATION-PENDING]` markers in the rendered HTML yet** — that is a follow-up implementation task if you want rendered visibility vs source-code visibility. Current state: source-code comments and this document serve as the flag.

---

## How to Use This File

1. Resolve each PMID above via PubMed search  
2. Add verified PMIDs to `src/data/_lint/verified-pmids.ts`  
3. Re-add inline citations to affected content sections  
4. Check off the `[ ]` checkboxes above  
5. When all three are resolved, this file can be archived to `content/audit/resolved/`
