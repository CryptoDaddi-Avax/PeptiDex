'use client';
import { useState, useEffect, type ReactNode } from 'react';
import Navigation from './Navigation';
import CommandPalette from './CommandPalette';
import Footer from './Footer';
import ScrollReveal from './ScrollReveal';
import Loader from './Loader';
import Cursor from './Cursor';
import ScrollProgress from './ScrollProgress';
import './redesign.css';

/**
 * GlobalShell — site-wide wrapper rendered in the root layout.
 *
 * Provides:
 *  1. Entrance Loader (sessionStorage-gated, adds body.loaded)
 *  2. Scroll Progress bar (lime gradient at viewport top)
 *  3. Custom Cursor (fine-pointer only dot + ring)
 *  4. Redesign Navigation (sticky, shrink-on-scroll, mobile slide-down)
 *  5. CommandPalette (⌘K / Ctrl+K / "/" to open)
 *  6. Redesign Footer
 *
 * Unlike RedesignLayout, this does NOT wrap {children} in
 * `.redesign-content` — that padding is applied by the per-route
 * layouts so the homepage Hero can remain full-bleed.
 */
export default function GlobalShell({ children }: { children: ReactNode }) {
  const [paletteOpen, setPaletteOpen] = useState(false);

  /* ── Global ⌘K / Ctrl+K / "/" keyboard shortcut ── */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setPaletteOpen((prev) => !prev);
      }
      if (
        e.key === '/' &&
        !paletteOpen &&
        document.activeElement?.tagName !== 'INPUT' &&
        document.activeElement?.tagName !== 'TEXTAREA'
      ) {
        e.preventDefault();
        setPaletteOpen(true);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [paletteOpen]);

  /* ── Lock body scroll when palette is open ── */
  useEffect(() => {
    document.body.style.overflow = paletteOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [paletteOpen]);

  return (
    <>
      {/* ── Entrance Loader (must be before nav — adds body.loaded) ── */}
      <Loader />

      {/* ── Scroll Progress bar ── */}
      <ScrollProgress />

      {/* ── Custom Cursor (fine-pointer only) ── */}
      <Cursor />

      {/* ── Scroll-reveal observer (global IntersectionObserver) ── */}
      <ScrollReveal />

      {/* ── Redesign Navigation ── */}
      <Navigation onSearchOpen={() => setPaletteOpen(true)} />

      {/* ── Command Palette (search overlay) ── */}
      <CommandPalette
        isOpen={paletteOpen}
        onClose={() => setPaletteOpen(false)}
      />

      {/* ── Page Content (no .redesign-content wrapper here) ── */}
      {children}

      {/* ── Redesign Footer ── */}
      <Footer />
    </>
  );
}
