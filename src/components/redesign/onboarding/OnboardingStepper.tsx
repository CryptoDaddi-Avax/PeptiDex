'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import { STEPS } from './onboarding-data';
import { setOnboardingStep, setCompleted, setDismissed } from '@/lib/storage/onboarding';
import {
  trackOnboardingStepViewed,
  trackOnboardingStepCompleted,
  trackOnboardingCompleted,
  trackOnboardingDismissed,
} from '@/lib/analytics/onboarding';
import SuppliesStep from './steps/SuppliesStep';
import VendorsStep from './steps/VendorsStep';
import ReconstitutionStep from './steps/ReconstitutionStep';
import DosingStep from './steps/DosingStep';
import ToolkitStep from './steps/ToolkitStep';
import './Onboarding.css';

const STEP_COMPONENTS = [SuppliesStep, VendorsStep, ReconstitutionStep, DosingStep, ToolkitStep];

interface OnboardingStepperProps {
  isOpen: boolean;
  initialStep?: number;
  onClose: () => void;
  onComplete: () => void;
}

export default function OnboardingStepper({ isOpen, initialStep = 0, onClose, onComplete }: OnboardingStepperProps) {
  const [activeStep, setActiveStep] = useState(initialStep);
  const [direction, setDirection] = useState<'forward' | 'back'>('forward');
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  // BUG 2: no contentHeight state needed — CSS handles open/closed via class
  const stepperRef = useRef<HTMLDivElement>(null);
  const startTimeRef = useRef(Date.now());
  const stepStartRef = useRef(Date.now());
  const [stepKey, setStepKey] = useState(0); // force re-render for animation

  // BUG 2 FIX: ResizeObserver height measurement removed.
  // Open/closed state is now controlled purely by the CSS class
  // onboarding-stepper--open which sets height:auto / overflow:visible.
  // This eliminates the scroll-triggered collapse caused by the observer
  // briefly reporting height=0 during sticky-position reflows.

  // Track step viewed
  useEffect(() => {
    if (!isOpen) return;
    const prevTime = Date.now() - stepStartRef.current;
    trackOnboardingStepViewed({
      step_number: activeStep + 1,
      step_name: STEPS[activeStep].gaKey,
      time_on_previous_step_ms: prevTime,
    });
    stepStartRef.current = Date.now();

    // Persist step position
    setOnboardingStep(activeStep);
  }, [activeStep, isOpen]);

  // P2 FIX (defensive layer): if the parent delivers a new initialStep AFTER
  // our first render (e.g. async prop update), sync activeStep to match.
  // With the lazy-initializer fix in new-home-client.tsx, this will NOT fire
  // on a deep-link cold start — it only protects future callers.
  useEffect(() => {
    if (initialStep !== activeStep) {
      setActiveStep(initialStep);
    }
  // We intentionally only react to initialStep changes, not activeStep changes,
  // so the user's own navigation doesn't cause an infinite loop.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialStep]);

  // Scroll into view when opened
  useEffect(() => {
    if (isOpen && stepperRef.current) {
      setTimeout(() => {
        stepperRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, [isOpen]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      // BUG 3 FIX: Don't steal keys while user is typing in an input/textarea/select
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;

      if (e.key === 'Escape') { handleDismiss(); return; }
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); goNext(); return; }
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); goPrev(); return; }

      // BUG 3 FIX: Number keys 1-5 jump to ANY step freely (guard removed).
      // The old guard (completedSteps.has || isActive) blocked forward navigation.
      const num = parseInt(e.key, 10);
      if (num >= 1 && num <= STEPS.length) {
        e.preventDefault();
        goToStep(num - 1);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, activeStep, completedSteps]);

  const goToStep = useCallback((step: number) => {
    if (step === activeStep) return;
    setDirection(step > activeStep ? 'forward' : 'back');
    setStepKey(prev => prev + 1);
    setActiveStep(step);
  }, [activeStep]);

  const goNext = useCallback(() => {
    const dwellTime = Date.now() - stepStartRef.current;
    trackOnboardingStepCompleted({
      step_number: activeStep + 1,
      step_name: STEPS[activeStep].gaKey,
      dwell_time_ms: dwellTime,
    });
    setCompletedSteps(prev => new Set(prev).add(activeStep));

    if (activeStep < STEPS.length - 1) {
      goToStep(activeStep + 1);
    } else {
      // Completed all steps
      trackOnboardingCompleted({
        total_time_ms: Date.now() - startTimeRef.current,
        steps_viewed: Array.from(completedSteps).concat(activeStep),
        affiliate_clicks: 0, // tracked separately
      });
      setCompleted();
      onComplete();
    }
  }, [activeStep, completedSteps, goToStep, onComplete]);

  const goPrev = useCallback(() => {
    if (activeStep > 0) goToStep(activeStep - 1);
  }, [activeStep, goToStep]);

  const handleDismiss = useCallback(() => {
    trackOnboardingDismissed({
      dismissed_at_step: activeStep + 1,
      total_time_ms: Date.now() - startTimeRef.current,
    });
    setDismissed();
    onClose();
  }, [activeStep, onClose]);

  const ActiveComponent = STEP_COMPONENTS[activeStep];

  return (
    <div
      ref={stepperRef}
      id="onboarding-stepper"
      role="region"
      aria-label="Getting started with peptides"
      aria-hidden={!isOpen}
      className={`onboarding-stepper${isOpen ? ' onboarding-stepper--open' : ''}`}
      // BUG 2 FIX: no inline maxHeight — CSS class handles open/close
    >
      <div className="onboarding-stepper__wrap">
        {/* Header */}
        <div className="onboarding-stepper__header">
          <h2 className="onboarding-stepper__title">
            Getting <em>started</em>
          </h2>
          <button
            className="onboarding-stepper__close"
            onClick={handleDismiss}
            aria-label="Close guide"
          >
            ✕
          </button>
        </div>

        <div className="onboarding-stepper__layout">
          {/* Progress Rail */}
          <nav className="onboarding-progress" aria-label="Guide progress">
            <ol className="onboarding-progress__list" role="list">
              {STEPS.map((step, i) => {
                const isActive = i === activeStep;
                const isCompleted = completedSteps.has(i);
                // BUG 3 FIX: all steps are always clickable; 'disabled' class removed.
                return (
                  <li
                    key={step.number}
                    className={`onboarding-progress__item${isActive ? ' onboarding-progress__item--active' : ''}${isCompleted ? ' onboarding-progress__item--completed' : ''}`}
                    aria-current={isActive ? 'step' : undefined}
                    onClick={() => goToStep(i)}
                  >
                    <div className="onboarding-progress__dot">
                      {isCompleted ? '✓' : step.number}
                    </div>
                    <div className="onboarding-progress__label">
                      <h4>{step.title}</h4>
                      <span>{step.subtitle}</span>
                    </div>
                  </li>
                );
              })}
            </ol>
          </nav>

          {/* Active Step */}
          <div className="onboarding-content">
            <div key={stepKey} className={direction === 'back' ? 'onboarding-step--back' : ''}>
              <ActiveComponent />
            </div>

            {/* Navigation */}
            <div className="onboarding-nav" role="navigation" aria-label="Guide navigation">
              {activeStep > 0 && (
                <button
                  className="onboarding-nav__btn onboarding-nav__btn--secondary"
                  onClick={goPrev}
                  aria-label="Previous step"
                >
                  ← Back
                </button>
              )}
              <button
                className="onboarding-nav__btn onboarding-nav__btn--primary"
                onClick={goNext}
                aria-label={activeStep === STEPS.length - 1 ? 'Finish guide' : 'Next step'}
              >
                {activeStep === STEPS.length - 1 ? 'Finish ✓' : 'Next →'}
              </button>
              <span className="onboarding-nav__progress-text">
                Step {activeStep + 1} of {STEPS.length}
              </span>
              <button
                className="onboarding-nav__skip"
                onClick={handleDismiss}
                aria-label="Skip this guide"
              >
                Skip guide
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
