'use client';

import Link from 'next/link';
import '../Sections.css';
import './AdvisorSectionV13.css';

/**
 * AdvisorSectionV13 — v13 AI Advisor showcase (§09).
 * Static visual mockup of the PeptiDex Advisor chat, matching the
 * reference at /_design-reference/v13/index.html §09.
 *
 * This is a display-only component. It does NOT call /api/chat.
 * All chat bubbles are hardcoded from the reference verbatim.
 */
export default function AdvisorSectionV13() {
  return (
    <section className="sec" id="advisor" aria-label="PeptiDex Advisor">
      <div className="sec-inner">
        <header className="sec-head">
          <div className="section-rule fade-up" aria-hidden="true">
            <span className="rule-line" />
            <span className="rule-mark">§<span className="num">09</span></span>
            <span className="rule-line" />
          </div>
          <p className="sec-eyebrow fade-up" style={{ '--delay': '60ms' } as React.CSSProperties}>INTELLIGENCE</p>
          <h2 className="sec-h2 fade-up" style={{ '--delay': '140ms' } as React.CSSProperties}>
            Ask the <span className="em">PeptiDex</span> Advisor.
          </h2>
          <p className="sec-sub fade-up" style={{ '--delay': '240ms' } as React.CSSProperties}>
            AI-powered research summaries grounded in published literature and verified vendor data.
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
                <span className="ico">💊</span>
                <span>Get <strong>dosing protocols</strong> from clinical literature</span>
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
              <span className="chat-sub">GROUNDED IN 668+ STUDIES</span>
            </div>
            <div className="chat-body stagger-children">
              {/* User message 1 */}
              <div className="chat-msg user">
                <div className="chat-bubble">Which peptides are most studied for cutting?</div>
              </div>

              {/* Bot reply 1 */}
              <div className="chat-msg bot">
                <div className="chat-bubble">
                  In the Phase 2 NEJM trial, subjects receiving Retatrutide at 12mg weekly achieved 24.2% body weight loss at 48 weeks. The literature documents combinations pairing it with AOD-9604. Researchers sourcing Retatrutide for laboratory use can verify vendor pricing at{' '}
                  <span className="code-chip">/tools/pricing</span>.
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
