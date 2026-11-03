'use client';
import { useState } from 'react';
import { Hero, StatsStrip } from '@/components/redesign';

// Navigation, CommandPalette, and Footer are now provided by GlobalShell in root layout

export default function RedesignClient() {
  return (
    <>
      <Hero />
      <StatsStrip />

      {/* Remaining sections (Pathways, Goals, Vendors, etc.)
          will be componentized in the next pass. The static /redesign.html
          preview was removed: it carried unchecked vendor claims. */}
      <div style={{ padding: '140px 48px', textAlign: 'center' }}>
        <p style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase' as const, color: 'var(--gold)' }}>
          § More sections coming — Pathways · Goals · Vendors · Journal · Newsletter
        </p>
      </div>
    </>
  );
}
