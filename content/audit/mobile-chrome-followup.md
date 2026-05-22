# Mobile Chrome Follow-up: Scroll-Direction StickyDiscountBanner

**Status:** Queued — do not build until spare cycles available  
**Effort estimate:** ~1 hour  
**Priority:** Low (UX polish, not conversion-critical)

---

## Problem

On mobile viewports (≤768px), the current sticky chrome stack consumes ~17% of viewport:

| Surface | Position | Height | Dismissable? |
|---------|----------|--------|-------------|
| GlobalDisclaimerBanner | Fixed top | ~36px | No (legal) |
| StickyDiscountBanner | Fixed top | ~44px | Yes (7-day TTL) |
| NewsletterStickyBanner | Fixed bottom | ~72px | Yes (7-day TTL) |

On a 667px iPhone SE: ~152px consumed = **22.8% of vertical viewport**.  
Once StickyDiscountBanner is dismissed (7-day TTL), it drops to ~108px = **16.2%**.

The recovery window during active content engagement is the target.

---

## Specification

### Behavior
- **Mobile only** (≤768px) — desktop `StickyDiscountBanner` is unchanged
- **Visible** at page-top (scrollY < 200px)
- **Hides** (slides up off-screen) when user scrolls DOWN past 200px threshold
- **Shows** (slides back down) when user scrolls UP from any position
- Disclaimer banner: **NOT affected** — stays persistent, legal requirement
- Newsletter sticky banner: **NOT affected** — stays pinned at bottom

### Implementation Pattern

```tsx
// Scroll-direction hook (add to StickyDiscountBanner.tsx)
const [hidden, setHidden] = useState(false);

useEffect(() => {
  let lastY = window.scrollY;

  function handleScroll() {
    const isMobile = window.innerWidth <= 768;
    if (!isMobile) return;

    const currentY = window.scrollY;
    if (currentY < 200) {
      setHidden(false); // Always show near top
    } else if (currentY > lastY) {
      setHidden(true);  // Scrolling down → hide
    } else {
      setHidden(false); // Scrolling up → show
    }
    lastY = currentY;
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  return () => window.removeEventListener('scroll', handleScroll);
}, []);
```

### CSS Transition

```css
/* Add to StickyDiscountBanner */
.sticky-discount-banner {
  transition: transform 175ms ease-in-out;
}
.sticky-discount-banner.hidden-mobile {
  transform: translateY(-100%);
}
```

Or inline via the existing Tailwind classes:
```tsx
className={`... transition-transform duration-[175ms] ease-in-out ${
  hidden ? '-translate-y-full' : 'translate-y-0'
}`}
```

### Outcome
- At scroll-top: full chrome visible (expected, user just arrived)
- Once user scrolls into content: 44px recovered (~6% viewport on iPhone SE)
- On scroll-up: banner returns (re-surfaces the deal for users reconsidering)

---

## Files to Modify
- `src/components/promos/StickyDiscountBanner.tsx` — add scroll-direction state hook + conditional class
- No CSS file changes needed if using existing Tailwind transition utilities

---

## Acceptance Criteria
- [ ] Desktop rendering unchanged at all viewport widths
- [ ] Banner hides on scroll-down past 200px on mobile (375px, 390px, 414px viewports)
- [ ] Banner shows on scroll-up from any position
- [ ] Banner always visible when scrollY < 200px (near top)
- [ ] Transition is smooth (150-200ms), not abrupt
- [ ] Dismissed state (7-day TTL) still works correctly after adding behavior
