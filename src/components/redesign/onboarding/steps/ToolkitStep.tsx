'use client';
import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import type { OnboardingTool } from '@/data/onboarding-tools';
import { ONBOARDING_TOOLS } from '@/data/onboarding-tools';
import {
  setCompleted,
  resetOnboarding,
} from '@/lib/storage/onboarding';
import {
  trackOnboardingToolLaunched,
  trackOnboardingCompleted,
} from '@/lib/analytics/onboarding';
import StepCallout from '../StepCallout';

// ── SVG icon map — keyed by tool slug ─────────────────────────────────────────
const TOOL_ICONS: Record<string, React.ReactNode> = {
  reconstitution_calculator: (
    // Beaker + liquid drop
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 3h6M9 3v6l-4 8a2 2 0 0 0 1.8 2.9h10.4A2 2 0 0 0 19 17l-4-8V3" />
      <path d="M7.5 14h9" />
    </svg>
  ),
  cycle_planner: (
    // Calendar grid — dosage tracker
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
      <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01" />
    </svg>
  ),
  peptide_library: (
    // Stack of books / library
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 19V6a2 2 0 0 1 2-2h13" />
      <path d="M4 19a2 2 0 0 0 2 2h13V8H6a2 2 0 0 0-2 2v9z" />
      <path d="M8 12h6M8 16h4" />
    </svg>
  ),
  half_life_calculator: (
    // Sine-wave / decay curve — half-life
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 17c2-4 4-8 6-8s3 4 5 4 3-4 5-4" />
      <path d="M3 7h18" strokeDasharray="2 3" />
    </svg>
  ),
  evidence_dashboard: (
    // Bar chart — ranked evidence
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 20h18M7 20V10M12 20V4M17 20v-6" />
    </svg>
  ),
  coa_analyzer: (
    // Shield checkmark — verification / COA
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 2l7 3v5c0 5-3.5 9.5-7 11C8.5 19.5 5 15 5 10V5l7-3z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  ),
};

// Fallback for unknown slugs
const FALLBACK_ICON = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 8v4M12 16v.5" />
  </svg>
);

// ── <ToolCard /> ──────────────────────────────────────────────────────────────
interface ToolCardProps {
  tool: OnboardingTool;
  onLaunch: (slug: string) => void;
}

function ToolCard({ tool, onLaunch }: ToolCardProps) {
  const icon = TOOL_ICONS[tool.slug] ?? FALLBACK_ICON;

  if (tool.comingSoon) {
    return (
      <div
        className="toolkit-card toolkit-card--soon"
        aria-label={`${tool.title} — coming soon`}
        role="listitem"
      >
        <div className="toolkit-card__icon" aria-hidden="true">{icon}</div>
        <div className="toolkit-card__text">
          <h4>{tool.title}</h4>
          <p>{tool.desc}</p>
        </div>
        <span className="toolkit-card__badge toolkit-card__badge--soon">SOON</span>
      </div>
    );
  }

  return (
    <Link
      href={tool.href}
      className="toolkit-card"
      role="listitem"
      onClick={() => onLaunch(tool.slug)}
      aria-label={`Open ${tool.title}`}
    >
      <div className="toolkit-card__icon" aria-hidden="true">{icon}</div>
      <div className="toolkit-card__text">
        <h4>{tool.title}</h4>
        <p>{tool.desc}</p>
      </div>
      {tool.badge && (
        <span className="toolkit-card__badge">{tool.badge}</span>
      )}
      {/* "Open tool →" CTA — visually conveyed by arrow; screen-readers get aria-label */}
      <svg
        className="toolkit-card__arrow"
        width="14"
        height="14"
        viewBox="0 0 16 16"
        fill="none"
        aria-hidden="true"
      >
        <path d="M1 8h14M9 2l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </Link>
  );
}

// ── <CompletionCard /> ────────────────────────────────────────────────────────
function CompletionCard({ onRestart }: { onRestart: () => void }) {
  useEffect(() => {
    setCompleted();
    // Fire analytics — stepper owns the authoritative total_time_ms
    trackOnboardingCompleted({
      total_time_ms: 0,
      steps_viewed: [0, 1, 2, 3, 4],
      affiliate_clicks: 0,
    });
  }, []);

  return (
    <div
      className="toolkit-completion"
      role="region"
      aria-label="Onboarding complete"
    >
      {/* Animated ring + check — clinical/premium, no confetti */}
      <div className="toolkit-completion__mark" aria-hidden="true">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <circle
            cx="16" cy="16" r="15"
            stroke="var(--gold)"
            strokeWidth="1.5"
            strokeDasharray="94.2"
            strokeDashoffset="0"
          />
          <path
            d="M10 16.5l4.5 4.5 7.5-9"
            stroke="var(--gold)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <h4 className="toolkit-completion__title">You&apos;re ready.</h4>
      <p className="toolkit-completion__body">
        You now understand sourcing, reconstitution, dosing math, and the full
        research toolkit. Most researchers never get this far before their first
        vial. You did — before yours arrived.
      </p>

      {/* Primary CTA — bookmark prompt */}
      <a
        href="/"
        className="onboarding-nav__btn onboarding-nav__btn--primary toolkit-completion__cta"
        aria-label="Start your research on peptidex.app"
      >
        Bookmark peptidex.app — your research starts here
      </a>

      {/* Restart guide */}
      <button
        className="toolkit-completion__restart"
        onClick={onRestart}
        aria-label="Restart the getting started guide from the beginning"
        type="button"
      >
        ↺ Restart guide from Step 1
      </button>
    </div>
  );
}

// ── <ToolkitStep /> ───────────────────────────────────────────────────────────
export default function ToolkitStep() {
  const [showCompletion, setShowCompletion] = useState(false);

  /** Fire `onboarding_tool_launched` with the payload shape in the spec. */
  const handleToolLaunch = useCallback((slug: string) => {
    trackOnboardingToolLaunched({ tool: slug, step_number: 5 });
  }, []);

  function handleRestart() {
    resetOnboarding();
    window.location.href = '/?guide=1&step=1';
  }

  return (
    <div className="onboarding-step" role="tabpanel" aria-labelledby="step-5-title">

      {/* ── Header ── */}
      <h3 className="onboarding-step__title" id="step-5-title">
        Explore the Full <em>Toolkit</em>
      </h3>
      <p className="onboarding-step__subtitle">
        You&apos;ve got the fundamentals. Now put them to work. These free, interactive
        tools handle the math, planning, and verification so you can focus on your
        research — not spreadsheets. No account required.
      </p>

      <StepCallout icon="🧰">
        <strong>Why this matters:</strong> The difference between a productive research
        protocol and a frustrating one is having the right tools. Everything here is
        free, independent, and built by researchers — not vendors.
      </StepCallout>

      {/* ── Tool card grid ── */}
      <div
        className="toolkit-grid"
        role="list"
        aria-label="PeptiDex research tools"
      >
        {ONBOARDING_TOOLS.map((tool) => (
          <ToolCard key={tool.slug} tool={tool} onLaunch={handleToolLaunch} />
        ))}
      </div>

      {/* ── Completion trigger / card ── */}
      {!showCompletion && (
        <button
          className="toolkit-completion__trigger"
          type="button"
          onClick={() => setShowCompletion(true)}
          aria-label="Mark guide as complete and show completion card"
        >
          I&apos;ve reviewed all the tools →
        </button>
      )}

      {showCompletion && <CompletionCard onRestart={handleRestart} />}
    </div>
  );
}
