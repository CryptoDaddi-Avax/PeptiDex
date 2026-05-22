# Citation Policy — PeptiDex Editorial Standard
**Status:** Active policy — applies to all future content development  
**Effective:** 2026-05-19  
**Authority:** Established as canonical editorial precedent following the May 2026 citation audit (43+ fabricated citations discovered and corrected across goal-pages.ts, verified-pmids.ts, and matchups.ts)

---

## Part 1 — Russian Literature Strategy

### Scope
Peptides developed primarily through Russian research programs with limited or absent PubMed indexing:
- **Tier A (primary Russian-origin):** Semax, Epitalon (Epithalon), Selank, Cortexin, Pinealon, Vilon, Thymalin, DSIP (delta sleep-inducing peptide), Cerebrolysin components
- **Tier B (partial indexing):** Peptides with some English-language PubMed entries but where primary evidence base is Russian regulatory literature

### The Problem
PubMed coverage of Russian clinical research is incomplete and unreliable. The Ashmarin 1997 Semax paper, the Khavinson Epitalon telomerase study, and multiple Selank trials exist in Russian medical literature but are either:
- Not indexed in PubMed at all
- Indexed under incorrect PMIDs due to transliteration errors
- Attributed to incorrect PMIDs through hallucination in earlier content drafts

Fabricating or guessing a PMID to make Russian research appear PubMed-indexed is a critical integrity violation.

### Policy — Four-Level Hierarchy

#### Level 1 — PRIMARY (Preferred)
Cite Russian clinical trial registries, regulatory documents, or institutional research center publications directly.

**Acceptable sources:**
- Russian Academy of Sciences publications (where available in English abstract)
- Institute of Molecular Genetics, Moscow
- Institute of Bioregulation and Gerontology, St. Petersburg (Khavinson group)
- Russian clinical trial registries (RCEC / ClinicalTrials.ru equivalents)
- Russian regulatory approval documents (for Semax: Ministry of Health of the Russian Federation approval 1994)

**Content framing pattern:**
> "Clinical research conducted at [Institution], including [Author group]'s studies published in [Russian journal], demonstrates..."

#### Level 2 — SECONDARY (Acceptable)
English-language review articles that synthesize and summarize Russian primary literature.

**Examples:**
- Reviews in *Peptides*, *Neuropeptides*, *Neurochemical Research* that cite and describe Russian primary studies
- Khavinson VKh et al. (2012). "Peptide regulation of aging." *Neuroendocrinol Lett* — this is PubMed-indexed and can be cited as PMID 14523363 (verified in registry)
- Any English systematic review explicitly referencing Russian primary literature

**Content framing pattern:**
> "As reviewed in [Author et al., Journal, Year], Russian clinical trials demonstrated..."

#### Level 3 — REGULATORY ATTRIBUTION (Acceptable for approved compounds)
For Semax specifically: Russian Ministry of Health approved Semax in 1994 as a nootropic neuroprotective agent for cognitive impairment and acute ischemic stroke. This approval itself is a citeable regulatory fact.

**Content framing pattern:**
> "Semax holds regulatory approval from the Russian Ministry of Health for treatment of cognitive disorders and acute ischemic stroke, based on clinical evidence from Russian regulatory trials."

#### Level 4 — HONEST AGNOSTICISM (Acceptable fallback)
When no verifiable source can be cited, frame claims conservatively without pretending to a precision that doesn't exist in available English-indexed literature.

**Content framing pattern:**
> "Russian clinical research suggests [compound] may [effect], though these studies have limited availability in English-indexed literature. Independent replication in Western clinical trials has not been conducted."

### NEVER Do the Following
- Assign a random PubMed PMID to a Russian study that isn't actually indexed there
- Use a PMID that resolves to an unrelated paper (the errors found in the 2026-05-18 audit)
- Write `(PMID: XXXXXX)` for any Russian study unless that exact PMID has been manually verified via the NLM eSummary API (`https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=pubmed&id=XXXXXX&retmode=json`)

---

## Part 2 — General Citation Integrity Rules

### Rule 1 — Registry Before Content
No PMID may appear in `goal-pages.ts`, `matchups.ts`, library pillars, or any user-facing content file until it is:
1. Added to `src/data/_lint/verified-pmids.ts` with NLM-verified `authors`, `title`, `journal`, and `year`
2. Verified via NLM eSummary API with confirmed title token overlap ≥ 20%

The pre-deploy gate enforces this for goal-pages. Until the gate is expanded to cover matchups.ts and pillar components, manual discipline applies.

### Rule 2 — Claim-to-PMID Specificity
A PMID must be matched to the specific claim it supports. A paper proving "Tesamorelin reduces VAT by 18%" cannot be used to support "Tesamorelin improves insulin sensitivity" even if it's the same paper. The registry `title` field should describe the specific claim relevance, not just the paper abstract subject.

### Rule 3 — No Template Reuse Across Claim Types
When adding a new goal page or matchup using a template from an existing page, all PMIDs must be re-verified against the new page's specific claims. The GHK-Cu PMID 26195973 propagated to 6 pages incorrectly because it was copied as a template default without per-page claim verification.

### Rule 4 — Passive Attribution Standards
When a citation is pending verification, content must use honest passive attribution:

**Acceptable passive framing:**
- "Preclinical studies suggest..." (for animal model data only)
- "Published research indicates..." (vague but not false)
- "Russian clinical research suggests..." (honest geographic attribution)
- "Early clinical data shows..." (for Phase 1/2 data without specific trial citation)

**Not acceptable:**
- `(PMID: XXXXXX)` for any unverified paper
- Specific trial names (STEP 1, SURMOUNT-1) without the correct PMID citation
- Journal names ("published in NEJM") without verified PMID

### Rule 5 — No Citation for Regulatory Facts That Don't Need One
Some facts are publicly established without requiring a PMID:
- FDA approval status and indication (cite the FDA label, not a journal paper)
- Mechanism of action descriptions (general pharmacology, acceptable without PMID)
- Investigational status ("not FDA-approved") — no citation needed

Over-citing these with incorrect PMIDs creates more risk than under-citing. Use `src/data/_lint/verified-sources.ts` for FDA label citations.

---

## Part 3 — Source Types and Tier System

| Source Type | Registry File | Examples | Framing |
|------------|:---:|---------|---------|
| PubMed-indexed academic paper | `verified-pmids.ts` | NEJM, JAMA, Cell Metab | `(PMID: XXXXXX)` inline |
| FDA prescribing information / label | `verified-sources.ts` | Egrifta, Ozempic labels | "Per FDA prescribing information" |
| EMA filing | `verified-sources.ts` | EMA assessment reports | "Per EMA assessment" |
| Russian institutional publication | `verified-sources.ts` | Institute of Bioregulation | "Published by [institution]" |
| Clinical trial registry entry | `verified-sources.ts` | ClinicalTrials.gov NCT# | "Registered Phase [X] trial (NCT#)" |
| Regulatory approval document | `verified-sources.ts` | Ministry of Health approvals | "Regulatory approval for [indication]" |

---

## Part 4 — Audit and Maintenance

### Pre-Deploy Gate
`npm run build` triggers `node scripts/pmid-gate.mjs --diff` which scans `goal-pages.ts` for unregistered PMIDs and blocks the build if any are found. This gate must be expanded to cover `matchups.ts` and component pillar files.

### Weekly Cron
Every Sunday 02:00 UTC, `GET /api/cron/pmid-weekly-audit` checks all 23 (and growing) registry PMIDs against NLM API. Results stored in Supabase `citation_audit_runs` table. `corpus_health: "CLEAN"` indicates all registry entries match their NLM records.

### Cadence for Expanding the Registry
Each time a new peptide content area is built:
1. Identify all claims requiring citation
2. Search PubMed for the correct paper
3. Verify via NLM API
4. Add to `verified-pmids.ts` first
5. Only then write the `(PMID: XXXXXX)` inline reference

---

## Revision History

| Date | Author | Change |
|------|--------|--------|
| 2026-05-19 | Antigravity | Initial policy document — Russian Literature Strategy codified following May 2026 audit findings |
