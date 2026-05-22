# High-Priority Batch Summary: Prompts 1–4
> Reference artifact for analytics review. Generated 2026-05-17.

This document catalogs every file modified across the four high-priority homepage conversion prompts. Use this as your changelog when reviewing GA4 data in 14–30 days.

---

## Prompt 1 — Numeric Claims Standardization

**Goal:** Eliminate hardcoded numeric drift across the codebase. Create a single canonical source for all site-wide statistics and enforce it via an AST-traversal linting gate in the build pipeline.

### New Files
| File | Purpose |
|------|---------|
| `src/data/site-stats.ts` | Canonical source for all platform-wide numeric claims. Keys: `peptides.count`, `stacks.count`, `vendors.count`, `tools.count`, `studies.count`, `purity.threshold` |
| `scripts/seo-lint.mjs` | AST-traversal SEO linter. Runs on every `npm run build`. Checks for hardcoded numeric claims in TSX/TS source files with regex whitelist for safe exceptions |
| `scripts/seo-lint-whitelist.json` | Whitelist of safe numeric patterns that should not trigger the linter |
| `content/audit/numeric-claims-inventory.md` | Pre-refactor audit table of all numeric claims found across the codebase with source file, page URL, context, and status |

### Modified Files
| File | Change |
|------|--------|
| `src/app/page.tsx` | Dynamic injection of `SITE_STATS.peptides.count` and `SITE_STATS.stacks.count` into homepage metadata description |
| `src/app/layout.tsx` | Dynamic injection into root layout OG description |
| `src/components/redesign/StatsStrip.tsx` | All 4 animated stat numbers now pull from `SITE_STATS` |
| Multiple component files | Removal of hardcoded counts (51, 12, 6, 10/12/13, 668, 99%) replaced with `SITE_STATS.*` references |
| `package.json` | `build` script prefixed with `node scripts/seo-lint.mjs &&` to gate builds on lint pass |

### Key Decisions
- Tool count: Updated to actual rendered count (not the marketing "10 free tools" holdover)
- Lint whitelist: PMIDs, zip codes, CSS pixel values, and phone numbers excluded from numeric claim checks

---

## Prompt 2 — Find Your Stack Quiz Promotion (QuizPromoCard)

**Goal:** Promote the existing `/quiz` from a buried Tools page link to a primary above-the-fold homepage feature with analytics and AEO schema.

### New Files
| File | Purpose |
|------|---------|
| `src/components/redesign/QuizPromoCard.tsx` | Client component. IntersectionObserver analytics, `SITE_STATS.studies.count` trust signal, inline `Quiz` JSON-LD schema |
| `src/components/redesign/QuizPromoCard.css` | Dark card design. Gold accents, hover glow, Fraunces/Inter/JetBrains Mono design system |
| `content/audit/quiz-improvements-followup.md` | Audit doc: 4 deferred gaps (schema on /quiz, step analytics, SEO metadata, save-my-stack) with priority rankings and decision framework |

### Modified Files
| File | Change |
|------|--------|
| `src/app/new-home-client.tsx` | Import + insertion of `<QuizPromoCard />` between `<StatsStrip />` and `<GoalsGrid />` |

### Analytics Events Added
- `quiz_promo_card_viewed` — IntersectionObserver, 30% threshold, fires once
- `quiz_promo_card_clicked` — CTA button click

### AEO Schema
- Inline `Quiz` JSON-LD: `name`, `description`, `url`, `provider`, `isAccessibleForFree: true`

### Homepage Render Order After This Prompt
```
Hero → StatsStrip → QuizPromoCard → GoalsGrid → ToolsSection → VendorSection → Footer
```

---

## Prompt 3 — AI Advisor Homepage Promotion (AdvisorPreviewBlock)

**Goal:** Promote `/advisor` from buried Tools page to primary homepage feature via a static chat preview demonstrating the Advisor's voice and capability.

### New Files
| File | Purpose |
|------|---------|
| `src/components/redesign/AdvisorPreviewBlock.tsx` | Split-grid component. Left: copy + capabilities + CTA. Right: static chat preview with 3 verified Q&A exchanges. IntersectionObserver stagger animation, `SoftwareApplication` JSON-LD schema |
| `src/components/redesign/AdvisorPreviewBlock.css` | Split CSS Grid layout. Plasma blue chat bubbles, sequential fade-in animation. Collapses to single column ≤1024px |
| `content/audit/automation-known-issues.md` | Documents Three.js browser crash issue + Option B workaround (`?noHero=1` flag) |
| `src/data/_lint/verified-sources.ts` | **New registry for non-PMID authoritative sources.** Typed `VerifiedSource` interface supporting `pmid`, `fda_label`, `ema_filing`, `manufacturer`, `regulatory`, `other` source types. First entry: FDA Egrifta prescribing information (tesamorelin half-life) |

### Modified Files
| File | Change |
|------|--------|
| `src/app/new-home-client.tsx` | Import + insertion of `<AdvisorPreviewBlock />` between `<QuizPromoCard />` and `<GoalsGrid />` |
| `src/app/page.tsx` | Added `skipHero` prop from `?noHero=1` query param (automation screenshot workaround) |
| `src/data/_lint/verified-pmids.ts` | Added PMID 25358450 (González-Sales et al., 2015 — tesamorelin population PK study, J Clin Pharmacol) |

### Verified Q&A Copy (Static Preview)
| Q | Source Anchoring |
|---|-----------------|
| "Best peptide stack for cutting?" | Phase 2 NEJM trial, 24.2% body weight at 48 weeks (PMID 37366315) |
| "Is BPC-157 safe with Tirzepatide?" | Mechanism distinction (PMID 14554208), "injection site responses" |
| "What's the half-life of Tesamorelin?" | ~26 min under repeated dosing (FDA Egrifta label, corrected from Falutz 2010 which is efficacy not PK) |

### Analytics Events Added
- `advisor_preview_viewed` — IntersectionObserver, 15% threshold, fires once
- `advisor_preview_cta_clicked` — CTA button click
- `advisor_preview_example_q_clicked` — Q-bubble click with `question_id` payload

### AEO Schema
- Inline `SoftwareApplication` JSON-LD with `featureList`: personalized stacks, citation-grounded answers, vendor pricing integration, stack interaction analysis

### Homepage Render Order After This Prompt
```
Hero → StatsStrip → QuizPromoCard → AdvisorPreviewBlock → GoalsGrid → ToolsSection → VendorSection → Footer
```

---

## Prompt 4 — Newsletter Signup Repositioning (Three Placements)

**Goal:** Reposition the newsletter from the footer to three high-visibility placements across the site with full analytics attribution.

### New Files
| File | Purpose |
|------|---------|
| `src/components/newsletter/newsletter-utils.ts` | Shared utilities: storage keys, state checks (`isSubscribed`, `isBannerDismissed`, etc.), `submitNewsletter()` API wrapper, all 9 `nlAnalytics` event functions |
| `src/components/newsletter/NewsletterStickyBanner.tsx` | Fixed-position bottom banner, sitewide. Visible immediately. Dismissable (7-day localStorage TTL). Posts to `/api/subscribe` with `source: "sticky_banner"` |
| `src/components/newsletter/NewsletterStickyBanner.css` | Single-line desktop / two-line mobile layout. Gold Submit button. Upward drop shadow |
| `src/components/newsletter/NewsletterInlineBlock.tsx` | Mid-page homepage section between GoalsGrid and ToolsSection. IntersectionObserver view tracking. Posts with `source: "inline_homepage"` |
| `src/components/newsletter/NewsletterInlineBlock.css` | Split layout: serif headline (left) + form (right). Gold left border accent |
| `src/components/newsletter/NewsletterExitModal.tsx` | Modal with 5 gating conditions. `?testExitIntent=1` forces open for QA. Posts with `source: "exit_intent"` |
| `src/components/newsletter/NewsletterExitModal.css` | Centered modal, gold top accent bar, backdrop blur |
| `src/components/newsletter/NewsletterGlobalProvider.tsx` | Client wrapper mounting banner + modal sitewide. Reads `?testExitIntent=1` via `useSearchParams`. Increments session page count on mount |

### Modified Files
| File | Change |
|------|--------|
| `src/app/layout.tsx` | Import + mount `<NewsletterGlobalProvider />` wrapped in `<Suspense fallback={null}>` |
| `src/app/new-home-client.tsx` | Import + insertion of `<NewsletterInlineBlock />` between `<GoalsGrid />` and `<ToolsSection />` |

### Exit Modal Gating Logic (All 5 Must Pass)
| Gate | Storage | TTL |
|------|---------|-----|
| Not already subscribed | `localStorage: peptidex_nl_subscribed` | Permanent |
| Banner not dismissed | `localStorage: peptidex_nl_banner_dismissed` | 7 days |
| Modal not shown this session | `sessionStorage: peptidex_nl_exit_shown` | Session |
| Time on site > 90s | `sessionStorage: peptidex_nl_session_start` | Session |
| Pages visited ≥ 2 | `sessionStorage: peptidex_nl_page_count` | Session |

### Analytics Events Added (All 9)
| Event | Trigger |
|-------|---------|
| `newsletter_sticky_banner_viewed` | Mount + IntersectionObserver |
| `newsletter_sticky_banner_dismissed` | × button click |
| `newsletter_sticky_banner_submitted` | Successful form submit |
| `newsletter_inline_block_viewed` | IntersectionObserver, 30% threshold |
| `newsletter_inline_block_submitted` | Successful form submit |
| `newsletter_exit_intent_shown` | Modal triggered |
| `newsletter_exit_intent_submitted` | Successful form submit |
| `newsletter_exit_intent_dismissed` | Modal dismissed |

### Email Provider Integration
No changes to backend. All three surfaces use existing `/api/subscribe` endpoint:
- Supabase `newsletter_subscribers` upsert with `source` column
- Beehiiv push (`BEEHIIV_PUBLICATION_ID` env var)
- Resend welcome drip sequence trigger
- Attribution query: `SELECT source, COUNT(*) FROM newsletter_subscribers GROUP BY source`

### Z-Index Stack (No Conflicts)
| Surface | Position | Z-Index |
|---------|----------|---------|
| Disclaimer banner | Fixed top | Site default |
| Vendor discount banner | Fixed top | `z-[101]` |
| Newsletter sticky banner | Fixed bottom | `z-90` |
| Newsletter exit modal backdrop | Fixed fullscreen | `z-[200]` |
| Newsletter exit modal | Fixed center | `z-[201]` |
| Vendor exit intent modal | Fixed center | `z-[200/201]` (separate trigger logic) |

### Copy Notes
- "Read by researchers and biohackers" — subscriber count dropped per audit (no verified figure in codebase)
- Gold (#c9a961) used consistently on all 3 Subscribe buttons — no red introduced

### Homepage Final Render Order
```
Hero → StatsStrip → QuizPromoCard → AdvisorPreviewBlock → GoalsGrid
     → NewsletterInlineBlock → ToolsSection → VendorSection → Footer (existing signup)
```
Plus sitewide (all pages): sticky newsletter banner at bottom + exit modal

---

## Infrastructure Improvements (Cross-Prompt)

### Automation Workarounds
| Query Param | Effect | Use Case |
|-------------|--------|----------|
| `?noHero=1` | Skips Three.js Hero component | Screenshot capture without browser crash |
| `?testExitIntent=1` | Forces newsletter exit modal open immediately | Screenshot/QA of exit modal |

### Registry Files
| File | Purpose |
|------|---------|
| `src/data/_lint/verified-pmids.ts` | Academic citation registry. 17 verified PMIDs as of 2026-05-17 |
| `src/data/_lint/verified-sources.ts` | Non-PMID authoritative sources. Supports `fda_label`, `ema_filing`, `manufacturer`, `regulatory`. First entry: FDA Egrifta label |
| `scripts/seo-lint.mjs` | Build-time AST linter — blocks hardcoded numeric claims |
| `scripts/seo-lint-whitelist.json` | Safe numeric patterns whitelist |

### Content Audit Files
| File | Contents |
|------|---------|
| `content/audit/numeric-claims-inventory.md` | Pre-refactor numeric audit table |
| `content/audit/quiz-improvements-followup.md` | 4 deferred quiz gaps with priority rankings |
| `content/audit/automation-known-issues.md` | Three.js browser crash + workaround documentation |
| `content/audit/high-priority-batch-summary.md` | This file |

---

## Analytics Review Checklist (14-Day Mark)

Run these queries in GA4 after 14 days to evaluate the four placements:

```
quiz_promo_card_viewed → quiz_promo_card_clicked  (CTR target: >5%)
advisor_preview_viewed → advisor_preview_cta_clicked  (CTR target: >3%)
newsletter_sticky_banner_viewed → newsletter_sticky_banner_submitted  (CVR target: >0.5%)
newsletter_inline_block_viewed → newsletter_inline_block_submitted  (CVR target: >1%)
newsletter_exit_intent_shown → newsletter_exit_intent_submitted  (CVR target: >8%)
```

And in Supabase:
```sql
SELECT source, COUNT(*) as subscribers
FROM newsletter_subscribers
WHERE created_at > '2026-05-17'
GROUP BY source
ORDER BY subscribers DESC;
```

---

## Mobile Chrome Stack Note

Current sitewide sticky surfaces on mobile viewports:
1. GlobalDisclaimerBanner (top) — cannot move, legal requirement
2. StickyDiscountBanner (top) — vendor promo
3. NewsletterStickyBanner (bottom) — newsletter

On a 667px iPhone SE: ~80–100px consumed by sticky chrome. **Proposed follow-up:** Add scroll-direction behavior to `StickyDiscountBanner` on mobile (hide on scroll-down, show on scroll-up). This is a standard mobile pattern and would recover ~44px of content viewport when users are actively reading. Separate decision — not implemented in this batch.
