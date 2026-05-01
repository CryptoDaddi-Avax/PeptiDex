'use client';
import { useState, useEffect, type ReactNode } from 'react';
import Navigation from './Navigation';
import CommandPalette from './CommandPalette';
import Footer from './Footer';
import './redesign.css';

/**
 * RedesignLayout — Shared wrapper for inner pages.
 *
 * What it does:
 *  1. Renders redesign Navigation (sticky, shrink-on-scroll, mobile drawer)
 *  2. Provides CommandPalette (⌘K / Ctrl+K / "/" to open)
 *  3. Renders redesign Footer
 *  4. Wraps {children} in a content region with consistent spacing
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
