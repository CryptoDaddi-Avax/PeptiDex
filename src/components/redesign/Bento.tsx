'use client';

import Link from 'next/link';
import './Bento.css';

/**
 * Bento — v13 asymmetric grid section ("The Index").
 *
 * 5 cards matching v13's reference exactly:
 *  A: Peptide Library (2-col span, tall, video bg)
 *  B: COA Verified (light card, video bg, audit bars)
 *  C: Evidence-Based Stacks (wide, sheen hover)
 *  D: PeptiDex Advisor (square, big numeral)
 *  E: The Peptide Brief / newsletter CTA (square, video bg)
 *
 * Card E newsletter: links to #newsletter-inline to scroll to the
 * existing NewsletterInlineBlock. The NewsletterGlobalProvider handles
 * the sticky banner + exit modal sitewide.
 *
 * No hardcoded affiliate URLs — all links are internal routes.
 */

/* ── SVG atoms ── */
const ArrowRight = () => (
  <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function Bento() {
  return (
    <section className="bento" id="index" aria-label="The Index">
      <div className="bento-inner">

        {/* Section header */}
        <header className="bento-head">
          <div className="section-rule fade-up" aria-hidden="true">
            <span className="rule-line" />
            <span className="rule-mark">§<span className="num">02</span></span>
            <span className="rule-line" />
          </div>
          <p className="bento-eyebrow fade-up" style={{ '--delay': '60ms' } as React.CSSProperties}>THE INDEX</p>
          <h2 className="bento-h2 fade-up" style={{ '--delay': '140ms' } as React.CSSProperties}>
            Researched like a library, <span className="em">verified</span> like a lab.
          </h2>
          <p className="bento-sub fade-up" style={{ '--delay': '240ms' } as React.CSSProperties}>
            Every profile traces back to a mechanism, the published studies behind it, and a COA-verified vendor. Nothing here is taken on trust.
          </p>
        </header>

        {/* The bento grid */}
        <div className="bento-grid stagger-children">

          {/* ── CARD A — Peptide Library ── */}
          <article className="bento-card card-a">
            <div className="card-shell glass">
              <div className="card-bg">
                <video
                  className="card-video"
                  muted
                  loop
                  playsInline
                  autoPlay
                  preload="metadata"
                  src="https://pub-bb44e23f2db2497da1abd5de2ab102a4.r2.dev/clip3.mp4"
                />
                <div className="card-scrim card-scrim-dark" aria-hidden="true" />
              </div>
              <div className="card-inner">
                <header className="card-meta">
                  <span className="pill-btn pill-glass tiny">
                    <span className="dot" aria-hidden="true" /> 51 PROFILES
                  </span>
                  <span className="card-id">A · 01</span>
                </header>
                <footer className="card-foot">
                  <h3 className="card-title">Peptide <span className="em">Library</span></h3>
                  <p className="card-desc">51 profiles — mechanism, dosing, half-life, and the published studies behind each one. Search by what you mean, not what you remember.</p>
                  <p className="card-stat">51 PROFILES · MECHANISM TO DOSING</p>
                </footer>
              </div>
              <Link className="card-link" href="/library">Open the Peptide Library</Link>
            </div>
          </article>

          {/* ── CARD B — COA Verified (lime accent, light card) ── */}
          <article className="bento-card card-b">
            <div className="card-shell card-shell-light">
              <div className="card-bg">
                <video
                  className="card-video"
                  muted
                  loop
                  playsInline
                  autoPlay
                  preload="metadata"
                  src="https://pub-bb44e23f2db2497da1abd5de2ab102a4.r2.dev/clip4.mp4"
                />
                <div className="card-scrim card-scrim-lime" aria-hidden="true" />
              </div>
              <div className="card-inner card-inner-light">
                <header className="card-meta">
                  <span className="pill-btn tiny pill-ink">
                    <span className="dot dot-teal" aria-hidden="true" /> VERIFIED
                  </span>
                  <span className="card-id ink">B · 02</span>
                </header>
                <div className="card-body">
                  <h3 className="card-title ink">COA <span className="em">Verified</span></h3>
                  <p className="card-desc ink-soft">HPLC + Mass Spec on every vendor batch — against a 99% purity threshold.</p>

                  <div className="audit-bars">
                    <div className="audit-bar">
                      <span className="audit-label">HPLC</span>
                      <div className="audit-track">
                        <div className="audit-fill" style={{ width: '99.7%' }} />
                      </div>
                      <span className="audit-num">99.7%</span>
                    </div>
                    <div className="audit-bar">
                      <span className="audit-label">MASS SPEC</span>
                      <div className="audit-track">
                        <div className="audit-fill" style={{ width: '98.9%' }} />
                      </div>
                      <span className="audit-num">98.9%</span>
                    </div>
                    <div className="audit-bar">
                      <span className="audit-label">PURITY MIN</span>
                      <div className="audit-track">
                        <div className="audit-fill" style={{ width: '99%' }} />
                      </div>
                      <span className="audit-num">99%</span>
                    </div>
                  </div>
                </div>
              </div>
              <Link className="card-link" href="/coa">See COA verification</Link>
            </div>
          </article>

          {/* ── CARD C — Evidence-Based Stacks (wide, sheen) ── */}
          <article className="bento-card card-c">
            <div className="card-shell glass">
              <div className="card-sheen" aria-hidden="true" />
              <div className="card-inner card-inner-row">
                <div>
                  <header className="card-meta" style={{ marginBottom: 12 }}>
                    <span className="card-id">C · 03</span>
                  </header>
                  <h3 className="card-title">12 Evidence-Based <span className="em">Stacks</span></h3>
                  <p className="card-desc" style={{ marginTop: 8 }}>Synergies grounded in published research — indexed by goal, with full citation trails.</p>
                </div>
                <div className="card-side">
                  <p className="card-stat">{'12 STACKS\nBY RESEARCH GOAL\nFULL CITATIONS'}</p>
                  <Link className="pill-btn pill-glass small" href="/stacks">
                    Browse stacks
                    <ArrowRight />
                  </Link>
                </div>
              </div>
            </div>
          </article>

          {/* ── CARD D — PeptiDex Advisor (square) ── */}
          <article className="bento-card card-d">
            <div className="card-shell glass">
              <div className="card-inner">
                <header className="card-meta">
                  <span className="card-id">D · 04</span>
                </header>
                <div className="card-body card-body-center">
                  <div className="big-num">668<span className="em">+</span></div>
                  <p className="card-desc">peer-reviewed studies grounding the Advisor</p>
                </div>
                <footer className="card-foot">
                  <h3 className="card-title-sm">PeptiDex Advisor</h3>
                </footer>
              </div>
              <Link className="card-link" href="/advisor">Open the PeptiDex Advisor</Link>
            </div>
          </article>

          {/* ── CARD E — The Peptide Brief (newsletter CTA) ── */}
          <article className="bento-card card-e">
            <div className="card-shell glass">
              <div className="card-bg">
                <video
                  className="card-video"
                  muted
                  loop
                  playsInline
                  autoPlay
                  preload="metadata"
                  src="https://pub-bb44e23f2db2497da1abd5de2ab102a4.r2.dev/clip5.mp4"
                />
                <div className="card-scrim card-scrim-dark" aria-hidden="true" />
              </div>
              <div className="card-inner">
                <header className="card-meta">
                  <span className="pill-btn pill-glass tiny">
                    <span className="dot live-dot" aria-hidden="true" /> LIVE
                  </span>
                  <span className="card-id">E · 05</span>
                </header>
                <div className="card-body">
                  <h3 className="card-title">The Peptide Brief</h3>
                  <p className="card-desc">Bi-weekly research updates, vendor pricing, and protocol analyses.</p>
                </div>
              </div>
              {/* Scroll to existing NewsletterInlineBlock — the
                  NewsletterGlobalProvider handles the sticky banner + exit modal. */}
              <a className="card-link" href="#newsletter-inline">Subscribe to The Peptide Brief</a>
            </div>
          </article>

        </div>
      </div>
    </section>
  );
}
