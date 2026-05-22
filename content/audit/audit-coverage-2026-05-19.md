# Citation Audit Coverage Report — 2026-05-19
**Generated:** 2026-05-19 via manual codebase scan  
**Purpose:** Establish full scope of PMID-bearing content across the codebase to determine what was and was not covered by the two-day citation audit  
**Finding:** The prior audits (2026-05-18 and 2026-05-19) were **narrowly scoped**. They covered the registry and goal-pages. Five other content-bearing data files contain PubMed URLs not covered by the gate's regex or by any manual review.

---

## Audit Scope Summary

| File / Directory | PMIDs Present | Audit Status | Gate Coverage |
|-----------------|:---:|:---:|:---:|
| `src/data/_lint/verified-pmids.ts` | 23 | ✅ Fully audited (2026-05-18 + 2026-05-19) | ✅ Yes — the registry IS the gate corpus |
| `src/data/goal-pages.ts` | 17 unique | ✅ Fully audited (2026-05-18 + 2026-05-19) | ✅ Yes — gate scans goal-pages for unregistered PMIDs |
| `src/data/matchups.ts` | 16 unique | ⚠️ **NOT AUDITED** | ❌ No — gate regex does not scan matchups.ts |
| `src/data/stacks.ts` | 18 unique | ⚠️ **NOT AUDITED** | ❌ No — gate does not scan stacks.ts |
| `src/data/stack-interactions.ts` | 36 unique | ⚠️ **NOT AUDITED** | ❌ No — gate does not scan stack-interactions.ts |
| `src/data/peptides.ts` | 623 unique | ⚠️ **NOT AUDITED** | ❌ No — gate does not scan peptides.ts |
| `src/data/blends.ts` | 18 unique | ⚠️ **NOT AUDITED** | ❌ No — gate does not scan blends.ts |
| `src/components/library/pillars/TesamorelinPillar.tsx` | 2 unique | ⚠️ **NOT AUDITED** | ❌ No — gate does not scan component files |
| `src/components/library/pillars/TirzepatidePillar.tsx` | 1 unique | ✅ PMID 35658024 is in registry | ❌ Gate does not scan, but PMID is valid |
| `content/` markdown files | audit docs only | ✅ Not live content | N/A |

**Total unique PMIDs in src/ codebase:** 666  
**Total PMIDs in verified registry:** 23  
**Unregistered PMIDs in src/:** 643 (96.5% not registered)

---

## CRITICAL: Known-Bad PMIDs Remain in matchups.ts

The four PMIDs removed from the registry during the 2026-05-18 audit **are still present in `src/data/matchups.ts`** as active citation links. These were removed from `verified-pmids.ts` and `goal-pages.ts` but matchups.ts was not part of the cleanup scope.

| PMID | Lines | Matchup Claim | NLM Actual Paper |
|------|-------|---------------|-----------------|
| `35653733` | 109, 121, 345, 351 | SURMOUNT-1 Tirzepatide obesity trial | Psychology paper — Han DE et al. (unrelated) |
| `18056898` | 204, 210 | Tesamorelin NEJM 2007 metabolic effects | JAMA brief — Hampton T (unrelated) |
| `9400262` | 254, 260 | Semax ACTH 4-10 nootropic study | German patient transport logistics (unrelated) |
| `8345041` | 438, 444 | Sermorelin BioDrugs 1999 review | Thyroxine/transthyretin — Rosen HN 1993 (unrelated) |

**Corrected replacements available:**
- `35653733` → replace with `35658024` (correct SURMOUNT-1 PMID, already in registry)
- `18056898` → replace with `20554713` (Falutz 2010 Phase 3 pooled analysis, already in registry)
- `9400262` → passive attribution per Russian Literature Policy (Semax)
- `8345041` → operator to verify correct Prakash & Goa BioDrugs PMID (pending PubMed search)

**These ship on the next build unless fixed. Gate will NOT catch them.**

---

## CRITICAL: TesamorelinPillar.tsx Has Two Unregistered PMIDs

`src/components/library/pillars/TesamorelinPillar.tsx` contains two inline PMID references not in the registry and not verified:

| PMID | Line | Claim |
|------|------|-------|
| `20682528` | 33 | "Falutz et al., 2010" — visceral fat without glucose alteration |
| `31607674` | 63 | "Lancet Gastroenterology & Hepatology" — tesamorelin and NAFLD |

Both need NLM verification. Note: `20682528` may be a valid Falutz 2010 paper distinct from `20554713` (which is the pooled Phase 3 J Clin Endocrinol Metab paper). They may be different publications of the same trial data.

---

## peptides.ts — Different Risk Profile (Study Links, Not Inline Claims)

`src/data/peptides.ts` contains **623 unique PubMed URLs** in `key_studies[].pubmed_url` fields. These are bibliography-style links, not inline claim attributions.

**Risk distinction:**
- `goal-pages.ts` pattern: `"...reduces VAT by 18% (PMID: 20554713)..."` — PMID tied to a specific numeric claim
- `peptides.ts` pattern: `{ pubmed_url: "...", summary: "A 2018 study in mice..." }` — independent authored summary with associated link

**Risk level:** Medium. A mismatch between link and summary would be a citational error visible to readers and crawlers, but does not directly assert a false numeric claim. Volume (623) makes individual NLM verification impractical without a script.

**Recommended:** Automated sweep checking that each `pubmed_url` PMID resolves and that the peptide name appears in the NLM title or abstract. Flag any that do not.

---

## stacks.ts and stack-interactions.ts — Moderate Risk

- `stacks.ts`: 18 unique PMIDs in `{ description, pubmed_url }` pattern
- `stack-interactions.ts`: 36 unique PMIDs in `{ type: "pubmed", label, url }` pattern

Neither is gate-scanned. Labels like `"Khavinson et al., 2002 - Bull Exp Biol Med (Epitalon)"` need spot-checking given the known Epitalon citation problems found in goal-pages.

---

## Gate Coverage Gap

`scripts/pmid-gate.mjs --diff` only scans `src/data/goal-pages.ts`. Files outside gate scope:
- `matchups.ts` ← **URGENT — contains known-bad PMIDs**
- `stacks.ts`
- `stack-interactions.ts`
- `peptides.ts`
- `blends.ts`
- All component `.tsx` files including pillars

---

## Recommendations

### Immediate (Before Next Deploy)
- [ ] Fix 4 known-bad PMIDs in `matchups.ts` (see table above)
- [ ] Verify `TesamorelinPillar.tsx` PMIDs `20682528` and `31607674` via NLM API

### Short-Term
- [ ] Expand `pmid-gate.mjs` to also scan `matchups.ts` and `src/components/library/pillars/`
- [ ] Spot-check `stacks.ts` and `stack-interactions.ts` labels against NLM API

### Medium-Term
- [ ] Automated sweep of `peptides.ts` `pubmed_url` entries — check that PMID resolves and peptide name appears in title/MeSH
- [ ] Define registry discipline scope: does the registry need to cover all 666 PMIDs or only inline-claim PMIDs?

---

## Files Explicitly Outside Scope (No Live Citation Content)
- `content/audit/*.md` — internal audit documents
- `scripts/*.mjs` — build tooling
- API routes, test files, config files
- Blog posts: **none found with PMID references** in current scan

---

## Revision History

| Date | Author | Change |
|------|--------|--------|
| 2026-05-19 | Antigravity | Initial coverage report — first full codebase scan |
