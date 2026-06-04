'use client';
import { useEffect } from 'react';

/**
 * ScrollReveal — faithful port of v13's motion.js observer system.
 *
 * Drives two animation patterns:
 *
 * 1. `.fade-up` elements — individual elements that fade/slide into view
 *    when they cross the viewport threshold. Trigger class: `.is-visible`.
 *
 * 2. `.stagger-children` containers — when the container enters the
 *    viewport, its direct children receive `.fade-up` (if not already
 *    present) and sequential `--delay` values (90ms step) BEFORE
 *    `.is-visible` is added, producing a cascading reveal.
 *
 * Fire-once: each element is unobserved after reveal.
 *
 * Accessibility:
 *  - When `prefers-reduced-motion: reduce` is active, all elements are
 *    immediately made visible with no animation (CSS override + JS guard).
 *
 * SSR safety:
 *  - All DOM access is inside `useEffect` (client-only).
 *  - A MutationObserver catches dynamically rendered content.
 */

const STAGGER_STEP_MS = 90;
const ROOT_MARGIN = '0px 0px -8% 0px';
const THRESHOLD = 0.08;

export default function ScrollReveal() {
  useEffect(() => {
    /* ── Reduced-motion bail-out ── */
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /** Prepare a stagger container: add .fade-up to children + set --delay. */
    function prepStagger(container: Element) {
      if ((container as any).__staggerPrepped) return;
      (container as any).__staggerPrepped = true;
      const kids = container.children;
      for (let i = 0; i < kids.length; i++) {
        const child = kids[i] as HTMLElement;
        child.classList.add('fade-up');
        // Only set --delay if author hasn't supplied one inline.
        const inline = child.style.getPropertyValue('--delay');
        if (!inline) {
          child.style.setProperty('--delay', `${i * STAGGER_STEP_MS}ms`);
        }
      }
    }

    /** Reveal a single element. */
    function reveal(el: Element) {
      el.classList.add('is-visible');
    }

    /** Reveal an entry — if it's a stagger container, prep + fade-up children. */
    function revealEntry(el: Element) {
      if (el.classList.contains('stagger-children')) {
        prepStagger(el);
        const kids = el.children;
        for (let k = 0; k < kids.length; k++) {
          reveal(kids[k]);
        }
      } else {
        reveal(el);
      }
    }

    /* ── Reduced motion: fade-up everything immediately ── */
    if (prefersReducedMotion) {
      document.querySelectorAll('.stagger-children').forEach((sc) => {
        prepStagger(sc);
        const kids = sc.children;
        for (let k = 0; k < kids.length; k++) reveal(kids[k]);
      });
      document.querySelectorAll('.fade-up:not(.is-visible)').forEach(reveal);
      return;
    }

    /* ── IntersectionObserver ── */
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          revealEntry(entry.target);
          io.unobserve(entry.target);
        }
      },
      { root: null, rootMargin: ROOT_MARGIN, threshold: THRESHOLD },
    );

    /** Register all targets in a subtree. */
    function register(root: Element | Document = document) {
      // 1. Stagger containers first — prepStagger adds .fade-up to children
      //    so they're excluded from the standalone .fade-up pass below.
      root.querySelectorAll('.stagger-children').forEach((sc) => {
        if ((sc as any).__staggerPrepped) return;
        prepStagger(sc);
        io.observe(sc);
      });

      // 2. Standalone .fade-up elements (skip children of stagger containers)
      root.querySelectorAll('.fade-up:not(.is-visible)').forEach((el) => {
        if (
          el.parentElement &&
          el.parentElement.classList.contains('stagger-children')
        ) {
          return; // handled by the container observer
        }
        io.observe(el);
      });
    }

    // Initial sweep
    register(document);

    /**
     * MutationObserver — catches .fade-up / .stagger-children elements
     * added by React after the initial render (dynamic imports, route
     * transitions, lazy components).
     */
    const mo = new MutationObserver((mutations) => {
      for (const m of mutations) {
        for (const node of m.addedNodes) {
          if (!(node instanceof HTMLElement)) continue;

          // Is the node itself a target?
          if (node.classList.contains('stagger-children')) {
            prepStagger(node);
            io.observe(node);
          } else if (
            node.classList.contains('fade-up') &&
            !node.classList.contains('is-visible')
          ) {
            const parent = node.parentElement;
            if (!parent || !parent.classList.contains('stagger-children')) {
              io.observe(node);
            }
          }

          // Check descendants
          node.querySelectorAll('.stagger-children').forEach((sc) => {
            if (!(sc as any).__staggerPrepped) {
              prepStagger(sc);
              io.observe(sc);
            }
          });
          node
            .querySelectorAll('.fade-up:not(.is-visible)')
            .forEach((el) => {
              if (
                el.parentElement &&
                el.parentElement.classList.contains('stagger-children')
              ) {
                return;
              }
              io.observe(el);
            });
        }
      }
    });

    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  // This component renders nothing — purely a side-effect mount.
  return null;
}
