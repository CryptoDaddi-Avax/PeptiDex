'use client';
import dynamic from 'next/dynamic';
import StatBar from '@/components/redesign/StatBar';
import Bento from '@/components/redesign/Bento';
import Interstitial from '@/components/redesign/Interstitial';
import ToolsGridV13 from '@/components/redesign/v13/ToolsGridV13';
import GoalsGridV13 from '@/components/redesign/v13/GoalsGridV13';
import QuizCTA from '@/components/redesign/v13/QuizCTA';
import AdvisorSectionV13 from '@/components/redesign/v13/AdvisorSectionV13';

// Dynamic import Hero — video + static SVG, client-only
const Hero = dynamic(() => import('@/components/redesign/Hero'), {
  ssr: false,
  loading: () => null,
});

export default function NewHomeClient({
  skipHero = false,
}: {
  skipHero?: boolean;
}) {
  return (
    <>
      {/* ── v13 sections (vendor grid and onboarding supplies removed) ── */}
      {!skipHero && <Hero />}
      <StatBar />
      <Bento />
      <Interstitial />
      <ToolsGridV13 />
      <GoalsGridV13 />
      <QuizCTA />
      <AdvisorSectionV13 />
    </>
  );
}
