'use client';
import dynamic from 'next/dynamic';
import StatBar from '@/components/redesign/StatBar';
import Bento from '@/components/redesign/Bento';
import Interstitial from '@/components/redesign/Interstitial';
import ToolsGridV13 from '@/components/redesign/v13/ToolsGridV13';
import GoalsGridV13 from '@/components/redesign/v13/GoalsGridV13';
import QuizCTA from '@/components/redesign/v13/QuizCTA';
import OnboardingAccordion from '@/components/redesign/OnboardingAccordion';
/* Legacy sections — kept in place per guardrails; C.5.4 removes them */
import StatsStrip from '@/components/redesign/StatsStrip';
import QuizPromoCard from '@/components/redesign/QuizPromoCard';
import AdvisorPreviewBlock from '@/components/redesign/AdvisorPreviewBlock';
import GoalsGrid from '@/components/redesign/GoalsGrid';
import { NewsletterInlineBlock } from '@/components/newsletter/NewsletterInlineBlock';
import ToolsSection from '@/components/redesign/ToolsSection';
import VendorSection from '@/components/redesign/VendorSection';

// Dynamic import Hero — video + static SVG, no Three.js, but still client-only
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
      {/* ── v13 sections (matches v13 index.html order) ── */}
      {!skipHero && <Hero />}
      <StatBar />
      <Bento />
      <Interstitial />
      <ToolsGridV13 />
      <GoalsGridV13 />
      <QuizCTA />
      <OnboardingAccordion />

      {/* ── Legacy sections below — left in place per C.5.3 guardrails.
           C.5.4 will remove StatsStrip, QuizPromoCard, AdvisorPreviewBlock,
           GoalsGrid, NewsletterInlineBlock, ToolsSection, VendorSection. ── */}
      <StatsStrip />
      <QuizPromoCard />
      <AdvisorPreviewBlock />
      <GoalsGrid />
      <NewsletterInlineBlock />
      <ToolsSection />
      <VendorSection />
    </>
  );
}
