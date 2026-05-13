# QA Report V2: Onboarding Feature Audit (Production Build)

**Date:** 2026-05-12
**Status:** 🟢 PASS (Ready for deployment)

---

## Executive Summary

A full 9-phase QA audit was conducted on a **production build** (`npm run build && npm start`) of peptidex.app to verify the fixes implemented during the previous development cycle. The critical P0 blockers have been fully resolved. Step 3 (Reconstitution) mathematically matches the main calculator perfectly. Lighthouse metrics show excellent Accessibility and Best Practices, though Performance has room for improvement.

---

## 9-Phase QA Audit Log

All testing was performed interactively via browser automation against `localhost:3000`.

| Phase | Description | Result | Notes |
| :--- | :--- | :--- | :--- |
| **Phase 1** | **Cold Start Render** | ✅ PASS | Cleared `localStorage`. "New to Peptides?" trigger block is visible immediately below the Hero. Persistent bottom bar is correctly hidden. |
| **Phase 2** | **Guide Open + Scroll** | ✅ PASS | Clicked trigger. Guide expands smoothly. Scrolled down 1000px and back up; guide remained fully open and stable without unexpected collapse. |
| **Phase 3** | **Deep Link Navigation** | ✅ PASS | Navigating to `?guide=1&step=3` correctly opens the guide. (Note: minor mobile timing issue logged below). |
| **Phase 4** | **Keyboard Navigation** | ✅ PASS | Tested keys `1-5` and arrow keys. Guide correctly navigates between steps regardless of completion status. |
| **Phase 5** | **Progress Rail Clicks** | ✅ PASS | Clicked non-sequential steps in the left progress rail (e.g., jumping from Step 1 to Step 4). Navigation was immediate and accurate. |
| **Phase 6** | **Step 3 Mini-Calculator (End-to-End)** | ✅ PASS | Inputs: 5mg Vial, 2mL BAC Water, 250mcg Dose.<br>Results: **2,500 mcg/mL**, **0.100 mL Draw**, **10 Syringe Units**.<br>Tested reactivity (changed to 10mg -> 5 units). *Mathematically matches main calculator exactly.* |
| **Phase 7** | **Step 5 Handoff (Completion)** | ✅ PASS | "Explore the Full Toolkit" tools handoff cards function properly. Completing the guide correctly closes the stepper. |
| **Phase 8** | **Warm-state Collapsed Bar** | ✅ PASS | Closed guide. Refreshed page. The bottom persistent "New here? Open the guide" bar is correctly visible, and the hero trigger block is hidden. |
| **Phase 9** | **30-day Dismiss Re-show** | ✅ PASS | Dismissed the bar (clicks 'X'). Refresh confirmed it stayed hidden. Executed JS to mutate `onboarding_ts` to 31 days ago (`localStorage.setItem('onboarding_ts', new Date(Date.now() - 31 * 24 * 60 * 60 * 1000).toISOString())`). Refresh correctly brought the persistent bar back. |

---

## Issue Comparison vs Previous QA_REPORT.md

### 🐛 Bugs Now FIXED
1. **P0: Hero trigger does not render on cold start** — Fixed. Trigger is fully visible, having been moved outside the `overflow: hidden` hero container.
2. **P0: Scroll causes guide to collapse unexpectedly** — Fixed. Replaced fragile `ResizeObserver` / inline max-height logic with robust `display: none` / `display: block` CSS classes.
3. **P0: Keyboard nav and progress rail clicks blocked** — Fixed. Removed completion guards; users can now freely navigate to any step.
4. **P0: Step 3 missing calculator** — Fixed. Full 3-phase component (Understand, Calculate, Graduate) built and integrated with shared math utility.
5. **Bonus: Deep Link `?step=`** — Fixed. `setResumeStep(urlStep)` properly restores deep-linked steps.

### ⚠️ Bugs STILL PRESENT
These issues were present before the onboarding work and are tracked separately:
1. **P1: Hydration Mismatch (`VendorSection.tsx`)** — Renders `50` on server vs `15` on client for `discountPercent`.
2. **P1: Hydration Mismatch (`AuthorByline`)** — Date strings differ between SSR and client on `/best/[slug]` pages.

### 🆕 NEW BUGS Introduced
1. **P2: Deep-link React state timing** — On mobile, deep-linking to a specific step (e.g., `?guide=1&step=3`) may cause the user to briefly see Step 1's content. This occurs because the `OnboardingStepper` uses `useState(initialStep)` which does not automatically sync when the parent updates the prop after the initial render cycle. (Non-blocking).

---

## Production Performance (Lighthouse)
Scores captured via `npx lighthouse` against the production build:

*   **Performance:** 56/100
*   **Accessibility:** 96/100
*   **Best Practices:** 100/100
*   **SEO:** 92/100

*(Note: The Performance score is heavily impacted by the `VendorSection` hydration mismatch which blocks the main thread, emphasizing the need to fix that P1 issue next).*
