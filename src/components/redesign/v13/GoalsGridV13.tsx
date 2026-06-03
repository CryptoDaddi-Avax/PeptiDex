'use client';

import Link from 'next/link';
import '../Sections.css';

/**
 * GoalsGridV13 — v13 research goals grid (§05).
 * 12 glass cards with emojis linking to /best/[slug].
 *
 * All slugs verified against src/data/goal-pages.ts:
 *  body-recomposition ✅, injury-recovery ✅, mental-clarity ✅,
 *  fat-loss ✅, muscle-growth ✅, immune-support ✅,
 *  sleep-recovery ✅, longevity ✅, skin-aesthetic ✅,
 *  gut-health ✅, hormonal-optimization ✅, metabolic-health ✅
 */

const GOALS = [
  { emoji: '🏋️', label: 'Body Recomposition',   slug: 'body-recomposition' },
  { emoji: '🩹', label: 'Injury Recovery',       slug: 'injury-recovery' },
  { emoji: '🧠', label: 'Mental Clarity',        slug: 'mental-clarity' },
  { emoji: '🔥', label: 'Fat Loss',              slug: 'fat-loss' },
  { emoji: '💪', label: 'Muscle Growth',          slug: 'muscle-growth' },
  { emoji: '🛡️', label: 'Immune Support',        slug: 'immune-support' },
  { emoji: '🌙', label: 'Sleep / Recovery',       slug: 'sleep-recovery' },
  { emoji: '⏳', label: 'Longevity',              slug: 'longevity' },
  { emoji: '✨', label: 'Skin & Aesthetics',      slug: 'skin-aesthetic' },
  { emoji: '🫁', label: 'Gut Health',             slug: 'gut-health' },
  { emoji: '⚡', label: 'Hormonal',               slug: 'hormonal-optimization' },
  { emoji: '🔬', label: 'Metabolic Health',       slug: 'metabolic-health' },
];

export default function GoalsGridV13() {
  return (
    <section className="sec" id="goals" aria-label="Research goals">
      <div className="sec-inner">
        <header className="sec-head">
          <div className="section-rule fade-up" aria-hidden="true">
            <span className="rule-line" />
            <span className="rule-mark">§<span className="num">05</span></span>
            <span className="rule-line" />
          </div>
          <p className="sec-eyebrow fade-up" style={{ '--delay': '60ms' } as React.CSSProperties}>RESEARCH GOALS</p>
          <h2 className="sec-h2 fade-up" style={{ '--delay': '140ms' } as React.CSSProperties}>
            What are you <span className="em">optimizing</span> for?
          </h2>
          <p className="sec-sub fade-up" style={{ '--delay': '240ms' } as React.CSSProperties}>
            Start from a goal and we&apos;ll point you to the peptides and stacks researched for it.
          </p>
        </header>

        <div className="goals-grid stagger-children">
          {GOALS.map((goal) => (
            <Link className="goal-card glass" href={`/best/${goal.slug}`} key={goal.slug}>
              <span className="goal-emoji">{goal.emoji}</span>
              <span className="goal-label">{goal.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
