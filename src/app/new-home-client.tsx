'use client';
import dynamic from 'next/dynamic';
import StatBar from '@/components/redesign/StatBar';
import Bento from '@/components/redesign/Bento';
import StatsStrip from '@/components/redesign/StatsStrip';
import QuizPromoCard from '@/components/redesign/QuizPromoCard';
import AdvisorPreviewBlock from '@/components/redesign/AdvisorPreviewBlock';
import GoalsGrid from '@/components/redesign/GoalsGrid';
import { NewsletterInlineBlock } from '@/components/newsletter/NewsletterInlineBlock';
import ToolsSection from '@/components/redesign/ToolsSection';
import VendorSection from '@/components/redesign/VendorSection';
import OnboardingAccordion from '@/components/redesign/OnboardingAccordion';

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
      {!skipHero && <Hero />}
      <StatBar />
      <Bento />
      {/* ── Legacy sections below — left in place per C.5.2 guardrails.
           C.5.4 will remove AdvisorPreviewBlock, NewsletterInlineBlock,
           VendorSection, StatsStrip, QuizPromoCard, and GoalsGrid. ── */}
      <StatsStrip />
      <QuizPromoCard />
      <AdvisorPreviewBlock />
      <GoalsGrid />
      <OnboardingAccordion />
      <NewsletterInlineBlock />
      <ToolsSection />
      <VendorSection />
    </>
  );
}
