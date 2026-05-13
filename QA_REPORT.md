# QA Report: Onboarding Feature — P0 Bug Fix Verification

**Updated:** 2026-05-12 | **Status: 🟡 CONDITIONAL PASS** (P0s resolved; P1 hydration mismatch remains)

---

## Executive Summary

All three P0 blockers documented in the original QA audit have been **resolved and verified** via automated browser testing. The onboarding feature can now be shipped pending resolution of the pre-existing hydration mismatch in `VendorSection.tsx` (tracked as P1 — not caused by onboarding code).

---

## Bug Fixes Applied

### BUG 1 — Hero trigger does not render on cold start ✅ FIXED

**Root cause:** `OnboardingTrigger` was rendered inside `<Hero>` which has `overflow: hidden` in CSS. The trigger block was being clipped by the hero container and never visible on screen.

**Fix:** Moved `OnboardingTrigger` out of `Hero.tsx` entirely. It now renders in `new-home-client.tsx` as a sibling element after `<Hero>`, wrapped in `.onboarding-trigger-host` which has matching left padding (48px desktop, 16px mobile).

**Files changed:**
- `src/components/redesign/Hero.tsx` — removed trigger import, props, and render
- `src/app/new-home-client.tsx` — added trigger import + conditional render outside hero
- `src/components/redesign/onboarding/Onboarding.css` — added `.onboarding-trigger-host` layout styles

**Verification:** ✅ PASS — Trigger visible immediately on cold start at 1440px and 375px. No horizontal overflow. No bar shown on first visit.

---

### BUG 2 — Scroll causes guide to collapse unexpectedly ✅ FIXED

**Root cause:** The stepper used `ResizeObserver` on the content div to measure height and set an inline `style={{ maxHeight }}`. During page scroll, `position: sticky` on the progress rail caused brief layout reflows. The observer would fire with `height=0` during these reflows, collapsing the `max-height` and hiding the panel behind `overflow: hidden`.

**Fix:** Removed `ResizeObserver`, `contentHeight` state, `contentRef`, and the inline `maxHeight` style entirely. The open/closed state is now controlled exclusively by CSS:
- **Closed:** `.onboarding-stepper { max-height: 0; overflow: hidden; }`
- **Open:** `.onboarding-stepper--open { max-height: none; overflow: visible; }`

`max-height: none` means no JS measurement can ever interfere. `overflow: visible` also fixes the sticky rail clipping.

**Files changed:**
- `src/components/redesign/onboarding/OnboardingStepper.tsx` — removed ResizeObserver logic, inline style
- `src/components/redesign/onboarding/Onboarding.css` — open class gets `max-height: none; overflow: visible`

**Verification:** ✅ PASS — Guide remains open and stable through full page scroll down and back up.

---

### BUG 3 — Keyboard nav (1-5, arrows) and rail clicks don't work ✅ FIXED

**Root cause (keyboard):** The number key handler had a guard: `completedSteps.has(num - 1) || num - 1 === activeStep`. This meant you could only press a number key to navigate to a step you'd already completed or were currently on. Pressing `3` from Step 1 always failed because Step 2 wasn't completed.

**Root cause (rail):** The `onClick` handler used `isAccessible && goToStep(i)` where `isAccessible = isCompleted || isActive`. Same restriction — unvisited steps silently swallowed clicks.

**Fix:**
- Keyboard handler: Removed the completion guard. Keys `1-5` now jump to any step freely when the guide is open and focus is not on an input/textarea/select.
- Rail: Removed `isAccessible` check. Every step `<li>` now calls `goToStep(i)` unconditionally. The `--disabled` CSS class is also removed since all steps are reachable.
- Input guard added: `if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;` prevents keys from firing when user is typing.

**Files changed:**
- `src/components/redesign/onboarding/OnboardingStepper.tsx` — keyboard handler + rail click handler

**Verification:** ✅ PASS
- Key `3` → jumps to Step 3 ✓
- Key `1` → jumps back to Step 1 ✓
- Arrow Right → advances to next step ✓
- Escape → collapses guide ✓
- Rail click on Step 4 → navigates to Step 4 ✓

---

### BONUS: Deep Link `?step=` Parameter ✅ FIXED (was silently broken)

**Root cause:** `setResumeStep(urlStep)` was accidentally omitted during a prior multi-replace conflict.

**Fix:** Restored the `setResumeStep(urlStep)` call in the deep-link handler. Also hardened against invalid inputs: `parseInt` result is checked with `isNaN()` before clamping.

**Verification:** ✅ PASS
- `?guide=1&step=3` → opens on Step 3 ✓
- `?guide=1&step=99` → clamps to Step 5 ✓
- `?guide=1&step=abc` → defaults to Step 1 ✓

---

## Remaining Issues

| Priority | Issue | Status |
|---|---|---|
| P1 | Hydration mismatch: `VendorSection.tsx` renders `50` on server, `15` on client for `discountPercent` | **Pre-existing, not caused by onboarding. Tracked separately.** |
| P1 | Hydration mismatch: `AuthorByline` date differs between SSR and client on `/best/[slug]` pages | **Pre-existing, not caused by onboarding.** |

---

## Screenshot Evidence

| Check | Screenshot | Result |
|---|---|---|
| Cold start trigger visible | `click_feedback_1778582795524.png` | ✅ Trigger visible below hero CTAs |
| Bar shows for engaged user | `click_feedback_1778582869763.png` | ✅ Correct — bar shown for `engaged` state |
| Guide stable after scroll | `click_feedback_1778582959917.png` | ✅ Guide remains open |
| Deep link opens on correct step | `click_feedback_1778583007394.png` | ✅ |
