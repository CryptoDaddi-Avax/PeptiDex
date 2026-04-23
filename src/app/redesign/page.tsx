'use client';
import { useState } from 'react';
import { Navigation, Hero, StatsStrip, CommandPalette, Footer } from '@/components/redesign';
import '@/components/redesign/redesign.css';

export default function RedesignPreview() {
  const [paletteOpen, setPaletteOpen] = useState(false);

  return (
    <div style={{ background: 'var(--bg)', color: 'var(--ink)', fontFamily: 'var(--sans)', fontWeight: 300, minHeight: '100vh' }}>
      <Navigation onSearchOpen={() => setPaletteOpen(true)} />
      <CommandPalette isOpen={paletteOpen} onClose={() => setPaletteOpen(false)} />
      <Hero onSearchOpen={() => setPaletteOpen(true)} />
      <StatsStrip />

      {/* Remaining sections (Pathways, Goals, Vendors, etc.) 
          will be componentized in the next pass.
          For now the iframe at /redesign.html has the full preview. */}
      <div style={{ padding: '140px 48px', textAlign: 'center' }}>
        <p style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase' as const, color: 'var(--gold)' }}>
          § More sections coming — Pathways · Goals · Vendors · Journal · Newsletter
        </p>
        <p style={{ color: 'var(--ink-mute)', marginTop: 16 }}>
          See <a href="/redesign.html" style={{ color: 'var(--gold)' }}>/redesign.html</a> for the full static preview.
        </p>
      </div>

      <Footer />
    </div>
  );
}
