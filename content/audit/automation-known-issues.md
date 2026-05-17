# Automation Known Issues

> Standing issues with the automated browser environment that affect screenshot workflows.

---

## Issue 1 — Three.js Hero Component Crashes Headless Browser

**Component:** `src/components/redesign/Hero.tsx`
**Root cause:** The Hero component dynamically injects Three.js r128 from CDN (`cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js`) and creates a WebGL renderer with a full scene graph (12 residues × 4 atoms each + 80 particles + bond cylinders + animation loop). This exceeds the headless Chromium memory allocation available in the automated browser environment.

**Trigger:** Any browser subagent navigation to `http://localhost:3000` (homepage) or `https://peptidex.app` causes the dev server or browser tab to crash before screenshots can be captured.

**Affected workflows:** All homepage screenshot tasks (Phase D QuizPromoCard, Phase E AdvisorPreviewBlock).

**Does NOT affect:** Pages that don't render the Hero (e.g., `/tools`, `/quiz`, `/library/*`, `/advisor`).

---

## Standing Workaround — Option B: Scroll-Position Screenshots

**Chosen approach:** Option B — capture screenshots at scroll positions that don't trigger the Three.js block, or navigate to inner pages that don't load it.

### For homepage screenshots:
1. Use `?noHero=1` query param (see implementation below) to skip the Three.js Hero entirely
2. This renders the homepage starting from StatsStrip, which is where most new section work lives anyway
3. The Hero is a known-stable, rarely-changed component — visual verification of the Hero itself is not needed for most homepage section work

### Implementation:
The `Hero` component is already dynamically imported with `ssr: false` in `new-home-client.tsx`. A `noHero` query parameter can be read server-side in `page.tsx` and passed as a prop to conditionally skip rendering.

**File:** `src/app/new-home-client.tsx`
- Accept optional `skipHero` prop
- When `skipHero=true`, render a lightweight placeholder div instead of the Three.js Hero

This is a **development/automation-only** feature — the query param is never linked to from any page, so production users never see it.

### For non-homepage component screenshots:
- Navigate directly to the page that uses the component (e.g., `/quiz`, `/advisor`, `/tools`)
- These pages use `RedesignLayout` which does NOT include the Three.js Hero

---

## Revision History

| Date | Author | Change |
|------|--------|--------|
| 2026-05-17 | Antigravity | Initial documentation of Three.js crash + Option B workaround |
