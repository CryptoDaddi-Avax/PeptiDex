'use client';

import Link from 'next/link';
import { SITE_STATS } from '@/data/site-stats';
import '../Sections.css';
import './AdvisorSectionV13.css';

/**
 * AdvisorSectionV13 — v13 AI Advisor showcase (§07).
 * Static visual mockup of the PeptiDex Advisor chat, matching the
 * reference at /_design-reference/v13/index.html §09.
 *
 * This is a display-only component. It does NOT call /api/chat.
 * All chat bubbles are hardcoded, educational examples only (no dosing,
 * sourcing, or pricing content).
 */
export default function AdvisorSectionV13() {
  return (
    <section className="sec" id="advisor" aria-label="PeptiDex Advisor">
      <div className="sec-inner">
        <header className="sec-head">
          <div className="section-rule fade-up" aria-hidden="true">
            <span className="rule-line" />
            <span className="rule-mark">§<span className="num">07</span></span>
            <span className="rule-line" />
          </div>
          <p className="sec-eyebrow fade-up" style={{ '--delay': '60ms' } as React.CSSProperties}>INTELLIGENCE</p>
          <h2 className="sec-h2 fade-up" style={{ '--delay': '140ms' } as React.CSSProperties}>
            Ask the <span className="em">PeptiDex</span> Advisor.
          </h2>
          <p className="sec-sub fade-up" style={{ '--delay': '240ms' } as React.CSSProperties}>
            AI-powered research summaries grounded in published, peer-reviewed literature.
          </p>
        </header>

        <div className="advisor-grid">
          {/* ── Left column: bullets + CTA ── */}
          <div>
            <ul className="advisor-bullets fade-up">
              <li>
                <span className="ico">📋</span>
                <span>Build <strong>personalized stacks</strong> based on your goals</span>
              </li>
              <li>
                <span className="ico">🧬</span>
                <span>Understand <strong>mechanisms of action</strong> from the literature</span>
              </li>
              <li>
                <span className="ico">🔍</span>
                <span>Compare peptides <strong>side-by-side with citations</strong></span>
              </li>
            </ul>
            <div className="fade-up" style={{ '--delay': '120ms' } as React.CSSProperties}>
              <Link className="btn-inner pill-btn pill-lime" href="/advisor">
                Open the Advisor
                <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M5 11 11 5M6 5h5v5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
          </div>

          {/* ── Right column: chat mockup ── */}
          <div className="glass advisor-chat fade-up" style={{ '--delay': '200ms' } as React.CSSProperties}>
            <div className="chat-head">
              <span className="dot" aria-hidden="true" />
              PeptiDex Advisor
              <span className="chat-sub">GROUNDED IN {SITE_STATS.studies.count}+ STUDIES</span>
            </div>
            <div className="chat-body stagger-children">
              {/* User message 1 */}
              <div className="chat-msg user">
                <div className="chat-bubble">What does the research say about BPC-157 and tissue repair?</div>
              </div>

              {/* Bot reply 1 */}
              <div className="chat-msg bot">
                <div className="chat-bubble">
                  BPC-157 has been studied mainly in rodent models of tendon, ligament, and gut injury, where it was associated with faster healing and increased angiogenesis. Human clinical data remain limited, so findings should be read as preclinical. Full citations are on the{' '}
                  <span className="code-chip">/library/bpc-157</span> profile.
                </div>
                <span className="chat-time">10:42 AM</span>
              </div>

              {/* User message 2 */}
              <div className="chat-msg user">
                <div className="chat-bubble">What&apos;s the half-life of Tesamorelin?</div>
              </div>

              {/* Bot reply 2 */}
              <div className="chat-msg bot">
                <div className="chat-bubble">
                  Tesamorelin has a plasma half-life of ~26 minutes (FDA Egrifta prescribing info), administered subcutaneously once daily.
                </div>
                <span className="chat-time">10:44 AM</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
