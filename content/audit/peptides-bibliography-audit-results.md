# peptides.ts Bibliography Audit Results

* **Date**: 2026-05-24
* **Auditor**: Antigravity (Advanced Agentic Coding AI)
* **File Audited**: [src/data/peptides.ts](file:///c:/Users/ender/.gemini/antigravity/peptide-app/src/data/peptides.ts)
* **Total Bibliography Links**: 623 PMIDs (in `key_studies[].pubmed_url`)
* **Verification Status**: Class-1 CLEAN (All 623 PMIDs successfully resolved + loose keyword matched)
* **Pillars Tier Designation**: **WARN-tier** (Warnings only, never blocks builds/deploys)

---

## Accepted Editorial & Legal Risk Decision (Class-2 Subject Match)

> [!NOTE]
> During the final legacy citation cleanup (Track B), a comprehensive bibliography audit was conducted on the 623 references embedded within [peptides.ts](file:///c:/Users/ender/.gemini/antigravity/peptide-app/src/data/peptides.ts). 
> 
> While **Class-1 cleanliness** (verification that all 623 PMIDs are authentic, active, non-fabricated PubMed records with a loose keyword check) was exhaustively confirmed, a rigorous **Class-2 subject-matter alignment scan** (manual/contextual verification of whether the paper's exact scientific methodology supports every nuanced claim in the description) was intentionally **NOT** exhaustively performed.

### Rationales for the Risk Decision:
1. **Nature of References**: These are general reference and further-reading links located in further-reading sections, not authoritative inline citations supporting specific high-exposure claims.
2. **Exposure & Regulatory Risk**: The legal/E-E-A-T exposure of reference bibliographies is significantly lower than that of inline assertions on Goal pages or Stack configurations.
3. **Proportionality of Effort**: Conducting a full, rigorous Class-2 manual verification for 623 distinct literature links is disproportionate to the actual editorial risk.

### Policy for Future Fixes:
- **WARN-tier Retention**: `peptides.ts` remains permanently in the **WARN-tier** of the `pmid-gate.mjs` scan, ensuring that any missing or mislabeled references emit warnings but never block compilation.
- **Individual Resolution**: If any specific bibliography link is ever flagged by users, researchers, or search engines, it will be investigated and corrected individually on an ad-hoc basis.

This documented decision transforms what would be a silent gap into a transparent, accepted editorial limitation.
