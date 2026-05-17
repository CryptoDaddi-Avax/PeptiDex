# Quiz Improvements Follow-Up

> Audit findings from the QuizPromoCard homepage promotion build (May 2026).  
> These items are deferred until initial homepage promotion data validates the investment.

---

## Priority 1 — Schema Markup on /quiz (HIGHEST)

**Gap:** The `/quiz` page and its results view have zero JSON-LD schema. Neither `Quiz`, `ItemList`, nor `HowTo` structured data is emitted.

**Impact:** AI engines cannot extract or cite the quiz as an interactive tool. The QuizPromoCard on the homepage *does* inject `Quiz` schema, but the quiz page itself is invisible to structured data crawlers. This means AI citations will reference the homepage promo but dead-end when the engine follows through to `/quiz`.

**Fix scope:** ~30 minutes
- Add `Quiz` schema to the quiz page layout
- Add `ItemList` schema to the results view (listing recommended peptides)
- Add `HowTo` schema mapping the 5 quiz steps

---

## Priority 2 — Analytics Events on Quiz Steps (HIGH)

**Gap:** The quiz page fires zero analytics events. We cannot measure:
- `quiz_started` — user began the quiz
- `quiz_step_completed` — user answered question N
- `quiz_completed` — user reached results (with stack name payload)
- `quiz_result_to_vendor_click` — user clicked "Buy from Amino Club" on a result peptide

**Impact:** Without these events, we cannot evaluate whether the homepage QuizPromoCard promotion is driving meaningful conversions. The `quiz_promo_card_clicked` event tells us people *go to* the quiz, but without completion/vendor-click events we don't know if they *convert*.

**Fix scope:** ~20 minutes
- Add `gtag` event calls at each quiz step transition
- Add event on results render with stack name
- Add event on affiliate link clicks with peptide + vendor payload

---

## Priority 3 — SEO Metadata on /quiz (MEDIUM)

**Gap:** The quiz layout (`src/app/quiz/layout.tsx`) is a bare wrapper with no `Metadata` export. No title, description, OG image, or Twitter card.

**Current state:**
```tsx
export default function QuizLayout({ children }) {
  return <RedesignLayout>{children}</RedesignLayout>;
}
```

**Impact:** The quiz page inherits the generic site-wide metadata from `layout.tsx`. If an AI engine or search engine links directly to `/quiz`, the SERP snippet will show the generic PeptiDex description rather than quiz-specific copy.

**Fix scope:** ~10 minutes
- Add `Metadata` export with quiz-specific title/description
- Add OG image (can use the existing `/api/og` endpoint with a `type=quiz` param)

---

## Priority 4 — "Save My Stack" Feature (LOW)

**Gap:** Quiz results are ephemeral — if the user navigates away, their recommended stack is lost. There is no localStorage persistence or "bookmark this result" feature.

**Impact:** Users who want to reference their result later must retake the quiz. This is a friction point but not a conversion blocker (the affiliate links work fine on first visit).

**Fix scope:** ~45 minutes
- Save quiz answers + result to localStorage
- Show "Your saved stack" banner if returning user has a saved result
- Add "Save My Stack" button that persists the result

---

## Decision Framework

If `quiz_promo_card_clicked` events show **>5% CTR** from homepage impressions within the first 2 weeks:
→ Immediately execute Priority 1 + Priority 2 (schema + analytics)

If quiz completion rate (measurable after Priority 2) exceeds **40%**:
→ Execute Priority 3 (SEO metadata) to capture organic quiz traffic

If quiz generates **>10 vendor clicks/day**:
→ Consider Priority 4 (save feature) to improve repeat engagement
