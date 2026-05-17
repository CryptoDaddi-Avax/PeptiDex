'use client';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Navigation from '@/components/redesign/Navigation';
import StatsStrip from '@/components/redesign/StatsStrip';
import CommandPalette from '@/components/redesign/CommandPalette';
import QuizPromoCard from '@/components/redesign/QuizPromoCard';
import AdvisorPreviewBlock from '@/components/redesign/AdvisorPreviewBlock';
import GoalsGrid from '@/components/redesign/GoalsGrid';
import { NewsletterInlineBlock } from '@/components/newsletter/NewsletterInlineBlock';
import ToolsSection from '@/components/redesign/ToolsSection';
import VendorSection from '@/components/redesign/VendorSection';
import Footer from '@/components/redesign/Footer';
import OnboardingStepper from '@/components/redesign/onboarding/OnboardingStepper';
import OnboardingBar from '@/components/redesign/onboarding/OnboardingBar';
import OnboardingTrigger from '@/components/redesign/onboarding/OnboardingTrigger';
import {
  getOnboardingState,
  getOnboardingStep,
  setEngaged,
  setDismissed,
} from '@/lib/storage/onboarding';
import { trackOnboardingStarted, trackOnboardingBarShown } from '@/lib/analytics/onboarding';
import '@/components/redesign/redesign.css';

// Bug 4 fix: Dynamic import Hero so Three.js only loads on the homepage
const Hero = dynamic(() => import('@/components/redesign/Hero'), {
  ssr: false,
  loading: () => null,
});

// ── Helpers ────────────────────────────────────────────────────────────
const DISMISS_RE_SHOW_DAYS = 30;

function readOnboardingState() {
  const state = getOnboardingState();
  const step = getOnboardingStep();
  
  let daysSince = 0;
  if (typeof window !== 'undefined') {
    const ts = window.localStorage.getItem('peptidex_onboarding_ts');
    if (ts) {
      daysSince = Math.floor((Date.now() - new Date(ts).getTime()) / (1000 * 60 * 60 * 24));
    }
  }
  return { state, step, daysSince };
}

/**
 * P2 FIX — Deep-link step resolution.
 *
 * Removed. URL params are now resolved in the server component (page.tsx)
 * and passed as props, eliminating the window.location parse entirely.
 * See: resolveDeepLink() in src/app/page.tsx.
 */

export default function NewHomeClient({
  initialGuideOpen = false,
  initialStep = 0,
  skipHero = false,
}: {
  initialGuideOpen?: boolean;
  initialStep?: number;
  skipHero?: boolean;
}) {
  const [paletteOpen, setPaletteOpen] = useState(false);
  // P2 FIX: Props are resolved server-side in page.tsx, so server and client
  // render the SAME initial step on first paint. No lazy initializer or
  // window.location needed here.
  const [guideOpen, setGuideOpen] = useState<boolean>(initialGuideOpen);
  const [showTrigger, setShowTrigger] = useState(false);
  const [showBar, setShowBar] = useState(false);
  const [resumeStep, setResumeStep] = useState<number>(initialStep);

  // Side-effects for the deep-link case (localStorage + analytics).
  // State is already correct from props; this only runs the post-mount
  // side-effects that require the browser environment.
  useEffect(() => {
    if (initialGuideOpen) {
      setEngaged();
      trackOnboardingStarted('deep_link');
      return;
    }

    const { state, step, daysSince } = readOnboardingState();
    switch (state) {
      case 'new':
        setShowTrigger(true);
        break;
      case 'engaged':
        setShowBar(true);
        setResumeStep(step);
        trackOnboardingBarShown(daysSince);
        break;
      case 'dismissed':
        if (daysSince >= DISMISS_RE_SHOW_DAYS) {
          setShowBar(true);
          setResumeStep(0);
          trackOnboardingBarShown(daysSince);
        }
        break;
      case 'completed':
        // Don't show anything
        break;
    }
  }, [initialGuideOpen]);

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

  function handleGuideOpen() {
    setGuideOpen(true);
    setShowTrigger(false);
    setShowBar(false);
    setEngaged();
    trackOnboardingStarted(showBar ? 'bar' : 'hero_block');
  }

  function handleGuideClose() {
    setGuideOpen(false);
    setShowBar(true);
  }

  function handleGuideComplete() {
    setGuideOpen(false);
    setShowBar(false);
    setShowTrigger(false);
  }

  function handleBarDismiss() {
    setShowBar(false);
    setDismissed();
  }

  return (
    <>
      <Navigation onSearchOpen={() => setPaletteOpen(true)} />
      <CommandPalette isOpen={paletteOpen} onClose={() => setPaletteOpen(false)} />
      {!skipHero && <Hero onSearchOpen={() => setPaletteOpen(true)} />}
      {/* BUG 1 FIX: Trigger lives OUTSIDE <Hero> to avoid overflow:hidden clipping.
          It is conditionally rendered by showTrigger state, same as before. */}
      {showTrigger && !guideOpen && (
        <div className="onboarding-trigger-host">
          <OnboardingTrigger onOpen={handleGuideOpen} />
        </div>
      )}
      <OnboardingStepper
        isOpen={guideOpen}
        initialStep={resumeStep}
        onClose={handleGuideClose}
        onComplete={handleGuideComplete}
      />
      <StatsStrip />
      <QuizPromoCard />
      <AdvisorPreviewBlock />
      <GoalsGrid />
      <NewsletterInlineBlock />
      <ToolsSection />
      <VendorSection />
      <Footer />
      {showBar && !guideOpen && (
        <OnboardingBar
          resumeStep={resumeStep}
          onReopen={handleGuideOpen}
          onDismiss={handleBarDismiss}
        />
      )}
    </>
  );
}
