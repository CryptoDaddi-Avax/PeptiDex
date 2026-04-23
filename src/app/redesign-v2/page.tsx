'use client';
import { useState, useEffect } from 'react';
import Navigation from '@/components/redesign/Navigation';
import Hero from '@/components/redesign/Hero';
import StatsStrip from '@/components/redesign/StatsStrip';
import CommandPalette from '@/components/redesign/CommandPalette';
import GoalsGrid from '@/components/redesign/GoalsGrid';
import VendorSection from '@/components/redesign/VendorSection';
import Footer from '@/components/redesign/Footer';
import '@/components/redesign/redesign.css';

export default function NewHomepage() {
  const [paletteOpen, setPaletteOpen] = useState(false);

  // Global ⌘K / Ctrl+K / forward-slash listener
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setPaletteOpen((prev) => !prev);
      }
      if (e.key === '/' && !paletteOpen && document.activeElement?.tagName !== 'INPUT') {
        e.preventDefault();
        setPaletteOpen(true);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [paletteOpen]);

  // Lock body scroll when palette is open
  useEffect(() => {
    document.body.style.overflow = paletteOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [paletteOpen]);

  return (
    <>
      <Navigation onSearchOpen={() => setPaletteOpen(true)} />
      <CommandPalette isOpen={paletteOpen} onClose={() => setPaletteOpen(false)} />
      <Hero onSearchOpen={() => setPaletteOpen(true)} />
      <StatsStrip />
      <GoalsGrid />
      <VendorSection />
      <Footer />
    </>
  );
}
