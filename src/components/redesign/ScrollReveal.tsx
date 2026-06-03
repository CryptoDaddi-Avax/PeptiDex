'use client';
import { useEffect } from 'react';

/**
 * ScrollReveal — global IntersectionObserver for `.reveal` elements.
 *
 * Watches the DOM (including dynamically-rendered content) for elements
 * with `class="reveal"` and toggles `class="in"` when they scroll into
 * view. Each element is unobserved after reveal so the animation fires
 * only once.
 *
 * Ported from the v13 static design reference (redesign.html L3179-3187).
 *
 * Accessibility:
 *  - When `prefers-reduced-motion: reduce` is active, the observer is
 *    never created and all `.reveal` elements are immediately made visible
 *    (handled via CSS override in redesign.css + JS guard here).
 *  - The CSS transition that drives the animation is the existing rule in
 *    redesign.css — this component only manages the `.in` class toggle.
 *
 * SSR safety:
 *  - All `window`/`document`/`IntersectionObserver` access is inside
 *    `useEffect`, which only runs on the client.
 */
export default function ScrollReveal() {
  useEffect(() => {
    /* ── Reduced-motion bail-out ── */
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      // Immediately reveal everything — the CSS fallback in redesign.css
      // handles the visual side, but elements may be added after the
      // stylesheet loads, so we also force the class here.
      document.querySelectorAll('.reveal').forEach((el) => {
        el.classList.add('in');
      });
      return;
    }

    /* ── IntersectionObserver for scroll-reveal ── */
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            // Stagger siblings that enter the viewport in the same frame
            setTimeout(() => entry.target.classList.add('in'), i * 40);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -80px 0px' },
    );

    /** Observe all `.reveal` elements currently in the DOM. */
    function observeAll() {
      document.querySelectorAll('.reveal:not(.in)').forEach((el) => {
        io.observe(el);
      });
    }

    // Initial sweep
    observeAll();

    /**
     * MutationObserver — picks up `.reveal` elements added by React after
     * the initial render (e.g. dynamically imported sections, route
     * transitions, lazy-loaded components).
     */
    const mo = new MutationObserver((mutations) => {
      let hasNew = false;
      for (const m of mutations) {
        for (const node of m.addedNodes) {
          if (node instanceof HTMLElement) {
            if (node.classList?.contains('reveal') && !node.classList.contains('in')) {
              io.observe(node);
              hasNew = true;
            }
            // Also check descendants
            if (node.querySelectorAll) {
              node.querySelectorAll('.reveal:not(.in)').forEach((el) => {
                io.observe(el);
                hasNew = true;
              });
            }
          }
        }
      }
      // No-op if nothing new — avoid unnecessary re-scans
      void hasNew;
    });

    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  // This component renders nothing — it's purely a side-effect mount.
  return null;
}
