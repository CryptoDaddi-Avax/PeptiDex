'use client';
import dynamic from 'next/dynamic';
import StatsStrip from '@/components/redesign/StatsStrip';
import QuizPromoCard from '@/components/redesign/QuizPromoCard';
import AdvisorPreviewBlock from '@/components/redesign/AdvisorPreviewBlock';
import GoalsGrid from '@/components/redesign/GoalsGrid';
import { NewsletterInlineBlock } from '@/components/newsletter/NewsletterInlineBlock';
import ToolsSection from '@/components/redesign/ToolsSection';
import VendorSection from '@/components/redesign/VendorSection';
import OnboardingAccordion from '@/components/redesign/OnboardingAccordion';

// Bug 4 fix: Dynamic import Hero so Three.js only loads on the homepage
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
