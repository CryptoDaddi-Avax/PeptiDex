# AEO System Diagnostic Report
**Generated:** 2026-05-29  
**Classification:** Task 3 — System exists but data is empty / never ran

---

## Executive Summary

The AEO monitoring system is **fully architected and deployed** — all Inngest functions, engine adapters, the admin dashboard, and Supabase table schemas exist in the codebase. However, **zero data has ever been collected**. The system has never executed a real poll.

The root causes, in priority order:

1. **All 4 AI engine API keys are missing from the VPS `.env.local`** — every engine adapter returns `error: 'KEY_NAME not set'` before making any API call. No query has ever been executed.
2. **Inngest keys are missing** — `INNGEST_SIGNING_KEY` and `INNGEST_EVENT_KEY` are not in `.env.local`. Without these, `inngest.send()` fails silently and the cron schedule is not registered with Inngest's servers.
3. **The Supabase AEO tables have never been created** — no migration exists for `aeo_queries`, `aeo_responses`, `aeo_classifications`, `aeo_events`, `aeo_poll_runs`, or `aeo_cost_ledger`. Even if the keys were present, every DB write would fail with "table does not exist."
4. **The query bank in Supabase (`aeo_queries`) is empty** — data exists in `src/data/citation-query-bank.ts` (27 queries) but has never been seeded into the database that the Inngest function reads from.
5. **The dashboard UI renders 100% mock data** — `AeoDashboardClient.tsx` hardcodes all panels; it has no live data fetching and the "Trigger Manual Poll" button has no handler.

---

## 1. What Was Found

### Files Confirmed Present

| Path | Purpose | Status |
|---|---|---|
| `src/app/admin/aeo/page.tsx` | Admin dashboard route | ✅ Exists, deployed |
| `src/app/admin/aeo/AeoDashboardClient.tsx` | Dashboard UI (343 lines) | ✅ Exists — **all mock data** |
| `src/app/admin/aeo/query/[queryId]/page.tsx` | Per-query drilldown | ✅ Exists, deployed |
| `src/app/admin/citations/page.tsx` | Citations list view | ✅ Exists |
| `src/app/admin/citations/dashboard/page.tsx` | Citations dashboard | ✅ Exists |
| `src/app/api/admin/aeo-trigger/route.ts` | Manual poll trigger | ✅ Exists |
| `src/app/api/admin/aeo-diagnose/route.ts` | Engine health check | ✅ Exists |
| `src/app/api/cron/citation-monitor/route.ts` | **Old stub** — body is all `console.log` + comments | ⚠️ Stub only |
| `src/app/api/inngest/route.ts` | Inngest event handler endpoint | ✅ Exists |
| `src/inngest/client.ts` | Inngest client (reads `INNGEST_SIGNING_KEY`) | ✅ Exists |
| `src/inngest/functions/aeo-daily-poll.ts` | Core polling engine (276 lines) | ✅ Exists |
| `src/inngest/functions/aeo-classify-batch.ts` | Claude Haiku classifier (168 lines) | ✅ Exists |
| `src/inngest/functions/aeo-weekly-report.ts` | Weekly digest via Claude Sonnet (166 lines) | ✅ Exists |
| `src/inngest/functions/aeo-cleanup.ts` | Data retention cleanup | ✅ Exists |
| `src/lib/aeo/engines/perplexity.ts` | Perplexity API adapter | ✅ Exists |
| `src/lib/aeo/engines/brave.ts` | Brave Search API adapter | ✅ Exists |
| `src/lib/aeo/engines/anthropic.ts` | Anthropic Claude adapter | ✅ Exists |
| `src/lib/aeo/engines/openai.ts` | OpenAI ChatGPT adapter | ✅ Exists |
| `src/lib/aeo/classifier.ts` | Classification logic (Claude Haiku) | ✅ Exists |
| `src/lib/aeo/cost-guard.ts` | Per-engine budget enforcement | ✅ Exists |
| `src/lib/aeo/alerts.ts` | Email + Slack alert dispatch | ✅ Exists |
| `src/data/citation-query-bank.ts` | 27 query strings (local only) | ✅ Exists |

### 4 Engines Confirmed

| Engine | Env Key Required | In `.env.local`? | Notes |
|---|---|---|---|
| **Perplexity** | `PERPLEXITY_API_KEY` | ❌ Missing | Still included (not dropped as remembered) |
| **Brave Search** | `BRAVE_SEARCH_API_KEY` | ❌ Missing | The 4th engine — replaced You/Phind |
| **Anthropic** | `ANTHROPIC_API_KEY` | ❌ Missing | Used for both polling AND classification |
| **OpenAI** | `OPENAI_API_KEY` | ❌ Missing | Only runs on queries flagged `runs_on_openai=true` |

### Supabase Tables Required (None Exist)

```sql
aeo_queries        -- query bank (source: citation-query-bank.ts)
aeo_responses      -- raw engine responses (written by aeo-daily-poll)
aeo_classifications -- Haiku-classified signals (written by aeo-classify-batch)
aeo_events         -- win/loss transitions (written by aeo-classify-batch)
aeo_poll_runs      -- per-engine execution log
aeo_cost_ledger    -- daily cost tracking per engine
```

None of these exist in the production Supabase project `ctihasvwqxfknieznngk`. The migrations exist only as the code's `supabase/` directory contains only the `listings` migration; there is no AEO migration file at all.

### Cron / Scheduling Architecture

The daily poll uses a **belt-and-suspenders** approach (per comment in `aeo-daily-poll.ts` line 112):
1. **Inngest cron:** `TZ=America/New_York 0 6 * * *` — fires `aeo/daily.poll.manual` event at 6am ET daily (requires `INNGEST_SIGNING_KEY` to register)
2. **VPS crontab:** (referenced in code comments, but no crontab entry was found in any file in this repo)

The VPS crontab would need: `0 6 * * * curl -s "https://peptidex.app/api/admin/aeo-trigger?secret=$CRON_SECRET"`

---

## 2. Diagnostic: What's Broken

### Problem 1 — API Keys Not Configured (CRITICAL)
**Evidence:** `.env.local` contains only Supabase + Google Gemini keys. All 4 engine adapters have identical guard at top:
```ts
const apiKey = process.env.BRAVE_SEARCH_API_KEY;
if (!apiKey) return { rawText: '', citedUrls: [], tokens: 0, cost: 0, httpStatus: 0, error: 'BRAVE_SEARCH_API_KEY not set' };
```
Every query returns an error row with `error_message = 'KEY not set'` and `raw_response = ''`. No actual API calls are made.

**Note:** The VPS may have some keys (the system was described as having run during May 23 tests per the code comment in `aeo-daily-poll.ts` line 109). The local `.env.local` doesn't reflect production state. **SSH to VPS and check** `/var/www/peptidex/.env.local` to confirm which keys are set there.

### Problem 2 — Inngest Not Connected (CRITICAL)
**Evidence:** `src/inngest/client.ts` reads `INNGEST_SIGNING_KEY` and `INNGEST_EVENT_KEY` — both absent from `.env.local`. Without these:
- `inngest.send()` in `aeo-trigger/route.ts` throws at runtime
- Inngest's servers cannot verify webhook signatures from `/api/inngest`
- The cron schedule is not synced to Inngest's scheduler

### Problem 3 — No AEO Supabase Migration (CRITICAL)
**Evidence:** `supabase/migrations/` contains only `20260527_vendor_listings.sql`. There is no migration for any `aeo_*` table. Every DB write in the poll functions fails with "table does not exist."

### Problem 4 — Query Bank Not Seeded (BLOCKS DATA COLLECTION)
**Evidence:** `aeo-daily-poll.ts` line 136 reads from `supabase.from('aeo_queries')`. The local data is in `src/data/citation-query-bank.ts` (27 strings) but was never inserted into the DB. Even if keys and tables existed, the poll would return 0 queries and exit immediately.

### Problem 5 — Dashboard Shows Mock Data (UX ISSUE, Non-Blocking)
**Evidence:** `AeoDashboardClient.tsx` lines 13–71 define hardcoded `mockKPIs`, `mockEngineHealth`, `mockHeatmapData`, etc. with no Supabase fetch. The "Trigger Manual Poll" button has no `onClick`. Dashboard URL `https://peptidex.app/admin/aeo` shows permanently static data regardless of what's in the DB.

---

## 3. Smallest Set of Fixes to Get Running

In dependency order — do not skip steps:

### Step 1 — Create the AEO Supabase schema (PRODUCTION DB, irreversible but additive)
Write and run a SQL migration in Supabase SQL Editor creating:
```sql
-- aeo_queries, aeo_responses, aeo_classifications, aeo_events, aeo_poll_runs, aeo_cost_ledger
-- With RLS: anon read on aeo_poll_runs, service_role write-all
```

### Step 2 — Seed `aeo_queries` from the local query bank (PRODUCTION DB, reversible)
Write a one-shot seed script that reads `citation-query-bank.ts` (27 queries) and inserts them into `aeo_queries` with `is_active=true` and appropriate `priority` values.

### Step 3 — Set API keys on VPS (PRODUCTION, irreversible without key rotation)
SSH to VPS → `nano /var/www/peptidex/.env.local` → add:
```
PERPLEXITY_API_KEY=pplx-...
BRAVE_SEARCH_API_KEY=BSA...
ANTHROPIC_API_KEY=sk-ant-...
OPENAI_API_KEY=sk-...
INNGEST_SIGNING_KEY=signkey-...
INNGEST_EVENT_KEY=...
CRON_SECRET=...
```
Then: `pm2 restart peptidex`

### Step 4 — Sync Inngest functions
After keys are set: visit `https://peptidex.app/api/inngest` in a browser or send a PUT to tell Inngest to sync. Or use Inngest dashboard → Apps → Sync.

### Step 5 — Verify with the diagnose endpoint (read-only, ~$0.02 cost)
```
GET https://peptidex.app/api/admin/aeo-diagnose?secret=<CRON_SECRET>
```
Should return `allEnginesOk: true` with `httpStatus: 200` for all 4 engines.

### Step 6 — Trigger first manual poll
```
GET https://peptidex.app/api/admin/aeo-trigger?secret=<CRON_SECRET>
```
Watch Inngest dashboard for the run. First run will produce ~108 responses (27 queries × 4 engines), then the classify-batch will run and populate `aeo_classifications`.

### Step 7 — Wire up the dashboard to live data
Replace the 6 `mock*` constants in `AeoDashboardClient.tsx` with Supabase fetch calls via a server action or API route. Add an `onClick` handler to the "Trigger Manual Poll" button calling `/api/admin/aeo-trigger`.

---

## 4. What the System Will Produce Once Running

**Daily cost estimate** (per the code's budget caps):
- Perplexity: up to $2.00/day (27 queries × ~$0.004 + tokens)
- Brave Search: up to $2.00/day (27 queries × $0.005)
- Anthropic: up to $1.00/day (27 queries × ~$0.01 + Haiku classifier)
- OpenAI: up to $1.50/day (subset of queries flagged `runs_on_openai`)
- **Total: up to $6.50/day; monthly cap set at $240**

**Data volume per day:**
- 108 rows in `aeo_responses` (27 queries × 4 engines)
- 108 rows in `aeo_classifications` (after Haiku processes each)
- Win/loss events in `aeo_events` (only on transitions — 0 on day 1)
- 5 rows in `aeo_poll_runs` (1 per engine + 1 global)
- 5 rows updated in `aeo_cost_ledger`

**Weekly report:** Claude Sonnet digest sent via Resend email + Slack every Sunday 6am ET (requires `RESEND_API_KEY` and `SLACK_WEBHOOK_URL` — also missing from `.env.local`, status on VPS unknown).
