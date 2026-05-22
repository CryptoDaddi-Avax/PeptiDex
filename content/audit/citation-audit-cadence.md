# Citation Audit Cadence — Option C Implementation
**Decision:** Option C (pre-deploy diff gate + weekly full-corpus cron)  
**Rationale:** Pre-deploy diff gate catches errors before they ship. Weekly cron catches registry drift from NLM updates or newly discovered mismatches in existing entries. Neither alone is sufficient.

---

## Architecture Overview

```
npm run build
    └── prebuild hook
            └── scripts/pmid-gate.mjs --diff
                    ├── Scans goal-pages.ts for all referenced PMIDs
                    ├── Compares against verified-pmids.ts registry
                    ├── Calls NLM eSummary API for unregistered PMIDs only
                    ├── exit 0 → build continues
                    └── exit 1 → build blocked, error logged

Every Sunday 02:00 UTC (Hostinger cron)
    └── GET /api/cron/pmid-weekly-audit
            ├── Checks ALL PMIDs in verified-pmids.ts via NLM API
            ├── Runs title token-overlap match detection
            ├── Persists results to Supabase: citation_audit_runs table
            └── Returns JSON delta report
```

---

## Component 1 — Pre-Deploy Diff Gate

**File:** `scripts/pmid-gate.mjs`  
**Trigger:** `npm run build` (via `prebuild` hook in package.json)  
**Mode:** `--diff` — only checks PMIDs referenced in goal-pages.ts that are NOT yet in the registry

**What it catches:**
- New content added during a dev session that references a PMID not yet in `verified-pmids.ts`
- Typos in PMID numbers (wrong numeric ID that resolves to a different paper)
- Copy-paste errors where an existing PMID is attached to the wrong claim

**What it does NOT catch:**
- Drift in existing registered PMIDs (NLM records changing — extremely rare, but possible for corrected publications)
- Wrong registry entries that were present before this gate was introduced (those are caught by the weekly cron)

**Performance impact:** Adds approximately 0.4s per unregistered PMID found. If all build PMIDs are already registered (normal case after initial onboarding), the gate runs in ~1 second with zero API calls. The first build after adding new content with new PMIDs may take 5–15 seconds extra.

**To run manually:**
```bash
npm run pmid:audit          # full corpus (all registry PMIDs)
node scripts/pmid-gate.mjs  # same as above
node scripts/pmid-gate.mjs --diff  # diff only (same as prebuild)
```

---

## Component 2 — Weekly Full-Corpus Cron

**File:** `src/app/api/cron/pmid-weekly-audit/route.ts`  
**Trigger:** Hostinger VPS cron job, every Sunday 02:00 UTC  
**Auth:** `Authorization: Bearer $CRON_SECRET` header required in production

**Hostinger cron entry** (add to VPS crontab):
```cron
0 2 * * 0 curl -s -H "Authorization: Bearer $CRON_SECRET" https://peptidex.app/api/cron/pmid-weekly-audit >> /var/log/peptidex-pmid-audit.log 2>&1
```

**Supabase table required** (`citation_audit_runs`):
```sql
create table citation_audit_runs (
  id           bigserial primary key,
  run_date     timestamptz not null,
  total_checked integer not null,
  verified_count integer not null,
  error_count  integer not null,
  mismatch_count integer not null,
  errors       jsonb,
  mismatches   jsonb,
  created_at   timestamptz default now()
);
```

**What it catches:**
- Existing registry entries that have drifted (NLM corrects a paper, PMID gets updated)
- Mismatches introduced when wrong PMIDs were manually added to the registry
- Accumulation of errors between weekly runs (delta reporting shows new issues only)

**Output:** JSON response with `corpus_health: "CLEAN" | "ERRORS_FOUND"` and full detail arrays. Persisted to Supabase for historical trending.

---

## Component 3 — Registry Discipline Rules (Permanent Policy)

These rules apply to all future content development on this project:

### Rule 1 — Registry Before Content
No PMID may appear in `goal-pages.ts`, library pages, or spoke articles until it is added to `verified-pmids.ts` with NLM-verified authors, title, journal, and year. The pre-deploy gate enforces this automatically.

### Rule 2 — Claim-to-PMID Specificity
Each citation must be matched to the specific claim it supports. A PMID that proves "Tesamorelin reduces VAT by 18%" cannot be used to support "Tesamorelin improves insulin sensitivity" even if the same paper exists. The registry's `title` field must describe the specific claim relevance.

### Rule 3 — Russian Literature Policy
Semax, Selank, Epithalon, and similar Russian-developed peptides have primary evidence in Russian-language journals not fully indexed in PubMed. Policy:
- Use transparent attribution: "published in Russian regulatory-approval clinical literature" or "Institute of Molecular Genetics, Moscow"
- Do NOT use a PMID unless it resolves correctly via NLM API
- If a PubMed PMID is later found, add to registry and restore inline citation

### Rule 4 — No Template Reuse of PMIDs Across Claim Types
The `26195973` error propagated to 6 pages because a GHK-Cu PMID was templated across skin/collagen sections. When adding a new goal page using a template, all PMIDs must be re-verified against the new page's specific claims — do not assume a PMID valid for claim A supports claim B even if both are about the same peptide.

---

## Comparison: Option A vs B vs C

| Dimension | Option A (Build-only) | Option B (Cron-only) | Option C (Both) |
|-----------|----------------------|---------------------|-----------------|
| Catches errors before ship | ✅ Always | ❌ Up to 7 days lag | ✅ Always |
| Catches registry drift | ❌ Only new additions | ✅ Weekly | ✅ Weekly |
| Build time impact | ~5-60s on new content | None | ~1-5s normal, 5-60s on new content |
| Requires VPS cron setup | No | Yes | Yes |
| Supabase schema required | No | Yes | Yes |
| **Decision** | | | **✅ SELECTED** |

**Why not Option A only:** Existing registry entries that were wrong before the gate existed (like the 7 errors in this audit) would never be caught — the gate only checks NEW unregistered PMIDs.

**Why not Option B only:** An error introduced today could ship, index in Google/AI engines, and live for up to 7 days before being caught. For E-E-A-T purposes, a citation error that Google's crawlers have indexed is more damaging than one that never shipped.

---

## Implementation Status

| Component | Status |
|-----------|--------|
| `scripts/pmid-gate.mjs` | ✅ Created |
| `package.json` prebuild hook | ✅ Wired (`"prebuild": "node scripts/pmid-gate.mjs --diff"`) |
| `package.json` pmid:audit script | ✅ Added |
| `/api/cron/pmid-weekly-audit/route.ts` | ✅ Created |
| Hostinger crontab entry | ⏳ Operator adds to VPS |
| Supabase `citation_audit_runs` table | ⏳ Operator creates via migration |
| Baseline audit documented | ✅ `citation-integrity-audit-2026-05-18.md` |
