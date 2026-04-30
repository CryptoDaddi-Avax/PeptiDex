'use client';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Navigation from '@/components/redesign/Navigation';
import StatsStrip from '@/components/redesign/StatsStrip';
import CommandPalette from '@/components/redesign/CommandPalette';
import GoalsGrid from '@/components/redesign/GoalsGrid';
import VendorSection from '@/components/redesign/VendorSection';
import Footer from '@/components/redesign/Footer';
import '@/components/redesign/redesign.css';

// Bug 4 fix: Dynamic import Hero so Three.js only loads on the homepage
const Hero = dynamic(() => import('@/components/redesign/Hero'), {
  ssr: false,
  loading: () => null,
});

export default function NewHomeClient() {
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
          background: #0a0a0b !important;
        }
      `}</style>
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
