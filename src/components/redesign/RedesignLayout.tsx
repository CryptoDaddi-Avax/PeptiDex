'use client';
import { useState, useEffect, type ReactNode } from 'react';
import Navigation from './Navigation';
import CommandPalette from './CommandPalette';
import Footer from './Footer';
import './redesign.css';

/**
 * RedesignLayout — Shared wrapper for inner pages migrating to the new design system.
 *
 * What it does:
 *  1. Hides legacy layout shell (Header, BottomNav, Footer, popups) via injected <style>
 *  2. Renders redesign Navigation (sticky, shrink-on-scroll, mobile drawer)
 *  3. Provides CommandPalette (⌘K / Ctrl+K / "/" to open)
 *  4. Renders redesign Footer
 *  5. Wraps {children} in a content region with consistent spacing
 *
 * Usage:
 *   import RedesignLayout from '@/components/redesign/RedesignLayout';
 *   export default function SomePage() {
 *     return <RedesignLayout>{...page content...}</RedesignLayout>;
 *   }
 */
export default function RedesignLayout({ children }: { children: ReactNode }) {
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
      {/* ── Hide legacy layout shell ── */}
      <style>{`
        #site-header-container,
        #site-footer-container,
        #site-bottomnav-container,
        #site-lead-container,
        #site-mobilesource-container,
        #site-first-visit-container,
        #site-pwa-container,
        #site-disclaimer-container {
          display: none !important;
        }
        #main-content {
          padding-bottom: 0 !important;
          min-height: 100vh !important;
        }
        body {
          background: var(--bg, #0a0a0b) !important;
          font-family: var(--sans) !important;
        }
      `}</style>

      {/* ── Redesign Navigation ── */}
      <Navigation onSearchOpen={() => setPaletteOpen(true)} />

      {/* ── Command Palette (search overlay) ── */}
      <CommandPalette
        isOpen={paletteOpen}
        onClose={() => setPaletteOpen(false)}
      />

      {/* ── Page Content ── */}
      <div className="redesign-content">
        {children}
      </div>

      {/* ── Redesign Footer ── */}
      <Footer />
    </>
  );
}
