'use client';
import dynamic from 'next/dynamic';
import StatsStrip from '@/components/redesign/StatsStrip';
import GoalsGrid from '@/components/redesign/GoalsGrid';
import VendorSection from '@/components/redesign/VendorSection';

// Navigation, CommandPalette, and Footer are now provided by GlobalShell in root layout

const Hero = dynamic(() => import('@/components/redesign/Hero'), {
  ssr: false,
  loading: () => null,
});

export default function RedesignV2Client() {
  return (
    <>
      <Hero />
      <StatsStrip />
      <GoalsGrid />
      <VendorSection />
    </>
  );
}
