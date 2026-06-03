'use client';

import Link from 'next/link';
import '../Sections.css';

/**
 * QuizCTA — v13 personalized quiz section (§06).
 * Glass card with badge, chip tags, and lime CTA → /quiz.
 *
 * This is a NEW component — the old QuizPromoCard is left intact
 * for redesign-v2 and will be removed in C.5.4.
 */

const ArrowUpRight = () => (
  <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M5 11 11 5M6 5h5v5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function QuizCTA() {
  return (
    <section className="sec" id="quiz-cta" aria-label="Personalized peptide stack quiz">
      <div className="sec-inner">
        <header className="sec-head" style={{ maxWidth: 760 }}>
          <div className="section-rule fade-up" aria-hidden="true">
            <span className="rule-line" />
            <span className="rule-mark">§<span className="num">06</span></span>
            <span className="rule-line" />
          </div>
          <p className="sec-eyebrow fade-up" style={{ '--delay': '60ms' } as React.CSSProperties}>PERSONALIZED</p>
          <h2 className="sec-h2 fade-up" style={{ '--delay': '140ms' } as React.CSSProperties}>
            Get your custom peptide stack in <span className="em">60 seconds</span>.
          </h2>
          <p className="sec-sub fade-up" style={{ '--delay': '240ms' } as React.CSSProperties}>
            5 quick questions → personalized peptide recommendations backed by published research.
          </p>
        </header>

        <div className="quiz-card glass fade-up" style={{ '--delay': '320ms' } as React.CSSProperties}>
          <span className="quiz-badge">
            <span className="dot" aria-hidden="true" />
            5 QUESTIONS · NO ACCOUNT
          </span>

          <div className="quiz-chips">
            <span className="quiz-chip">
              <span className="qc-dot" aria-hidden="true" />
              Based on <strong>668+ studies</strong>
            </span>
            <span className="quiz-chip">
              <span className="qc-dot" aria-hidden="true" />
              Vendor pricing included
            </span>
            <span className="quiz-chip">
              <span className="qc-dot" aria-hidden="true" />
              <strong>PEPTIDEX</strong> coupon auto-applied
            </span>
          </div>

          <div className="quiz-cta-inner">
            <Link className="pill-btn pill-lime" href="/quiz">
              Start the Quiz
              <ArrowUpRight />
            </Link>
            <p className="quiz-fine">No email required to see results</p>
          </div>
        </div>
      </div>
    </section>
  );
}
