'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import './Hero.css';

/**
 * Hero — v13 homepage hero section.
 *
 * Helix waveform: v13-accurate animated double-helix SVG.
 * Two 240-sample sine wave polylines (phase 0 and π),
 * 30 depth-sorted rungs, lime/paper beads with front/back
 * depth scaling, horizontal-scroll CSS animation (14s linear,
 * seamless loop via 2× width trick).
 */

/* ── Animated helix SVG (matches v13 hero.js exactly) ── */
function HelixSVG() {
  const helix = useMemo(() => {
    const W = 1200;           // total path width (2× viewBox for seamless loop)
    const VB_W = 600;         // viewBox width
    const H = 280;            // viewBox height
    const cy = H / 2;
    const amp = 78;           // amplitude
    const period = 200;       // one full sine wavelength
    const samples = 240;      // polyline density
    const rungCount = 30;     // total rungs along W

    // Generate strand path data
    function strand(phase: number): string {
      let d = '';
      for (let i = 0; i <= samples; i++) {
        const x = (i / samples) * W;
        const y = cy + amp * Math.sin((2 * Math.PI * x) / period + phase);
        d += (i === 0 ? 'M' : 'L') + x.toFixed(2) + ',' + y.toFixed(2) + ' ';
      }
      return d;
    }

    const d1 = strand(0);
    const d2 = strand(Math.PI);

    // Rungs + beads
    const rungs: { x: number; y1: number; y2: number; front: boolean }[] = [];
    const beads1: { x: number; y: number; front: boolean }[] = [];
    const beads2: { x: number; y: number; front: boolean }[] = [];

    for (let r = 0; r < rungCount; r++) {
      const x = (r / rungCount) * W + W / rungCount / 2;
      const y1 = cy + amp * Math.sin((2 * Math.PI * x) / period);
      const y2 = cy + amp * Math.sin((2 * Math.PI * x) / period + Math.PI);
      const isFront = y1 < y2;
      rungs.push({ x, y1, y2, front: isFront });
      beads1.push({ x, y: y1, front: isFront });
      beads2.push({ x, y: y2, front: !isFront });
    }

    return { VB_W, H, cy, W, d1, d2, rungs, beads1, beads2 };
  }, []);

  return (
    <svg
      className="helix-svg"
      viewBox={`0 0 ${helix.VB_W} ${helix.H}`}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="strandLime" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#C4F25C" stopOpacity="0.0" />
          <stop offset="12%"  stopColor="#C4F25C" stopOpacity="0.95" />
          <stop offset="88%"  stopColor="#C4F25C" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#C4F25C" stopOpacity="0.0" />
        </linearGradient>
        <linearGradient id="strandPaper" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#F2EEE5" stopOpacity="0.0" />
          <stop offset="12%"  stopColor="#F2EEE5" stopOpacity="0.7" />
          <stop offset="88%"  stopColor="#F2EEE5" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#F2EEE5" stopOpacity="0.0" />
        </linearGradient>
      </defs>
      <g className="helix-group">
        {/* Dashed center axis */}
        <line
          x1="0" y1={helix.cy}
          x2={helix.W} y2={helix.cy}
          className="helix-axis"
        />
        {/* Strand 1: lime */}
        <path d={helix.d1} className="helix-strand helix-strand-1" />
        {/* Strand 2: paper */}
        <path d={helix.d2} className="helix-strand helix-strand-2" />
        {/* Rungs */}
        {helix.rungs.map((r, i) => (
          <line
            key={`rung-${i}`}
            x1={r.x.toFixed(2)} y1={r.y1.toFixed(2)}
            x2={r.x.toFixed(2)} y2={r.y2.toFixed(2)}
            className={`helix-rung ${r.front ? 'front' : 'back'}`}
          />
        ))}
        {/* Beads — strand 1 (lime) */}
        {helix.beads1.map((b, i) => (
          <circle
            key={`bead1-${i}`}
            cx={b.x.toFixed(2)} cy={b.y.toFixed(2)}
            r="3.2"
            className={`helix-bead helix-bead-a ${b.front ? 'front' : 'back'}`}
          />
        ))}
        {/* Beads — strand 2 (paper) */}
        {helix.beads2.map((b, i) => (
          <circle
            key={`bead2-${i}`}
            cx={b.x.toFixed(2)} cy={b.y.toFixed(2)}
            r="3.2"
            className={`helix-bead helix-bead-b ${b.front ? 'front' : 'back'}`}
          />
        ))}
      </g>
    </svg>
  );
}

/* ── Inline SVG atoms ── */
const ArrowUpRight = () => (
  <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M5 11 11 5M6 5h5v5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const SearchIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.4" />
    <path d="M10.5 10.5 14 14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

const ArrowRight = () => (
  <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" width="12" height="12">
    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function Hero() {
  return (
    <section className="hero" id="top" aria-label="Peptidex hero">

      {/* Full-bleed background video */}
      <video
        className="hero-bg-video"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        src="https://pub-bb44e23f2db2497da1abd5de2ab102a4.r2.dev/clip1.mp4"
      />

      {/* Scrim + grain layers */}
      <div className="hero-scrim" aria-hidden="true" />
      <div className="hero-grain" aria-hidden="true" />

      <div className="hero-inner">

        {/* ── LEFT COLUMN ── */}
        <div className="hero-left">

          <p className="hero-eyebrow fade-up">PEPTIDE INTELLIGENCE / 2026</p>

          <h1 className="hero-h1">
            <span className="line line-1 fade-up">Every peptide,</span>

            <span className="line line-2">
              <em className="em fade-up" style={{ '--delay': '340ms' } as React.CSSProperties}>researched</em>
              <Link
                className="pill-btn pill-glass inline fade-up"
                style={{ '--delay': '120ms' } as React.CSSProperties}
                href="/library"
              >
                <SearchIcon />
                see the library
              </Link>
            </span>

            <span className="line line-3 fade-up" style={{ '--delay': '240ms' } as React.CSSProperties}>sourced &amp; verified.</span>
          </h1>

          <p className="hero-sub fade-up" style={{ '--delay': '400ms' } as React.CSSProperties}>
            The independent peptide research index — 51 profiles, 12 evidence-based stacks, and free tools. Affiliate-funded, never paid placement.
          </p>

          {/* CTAs */}
          <div className="hero-ctas fade-up" style={{ '--delay': '500ms' } as React.CSSProperties}>
            <Link className="pill-btn pill-lime" href="/library">
              Explore the library
              <ArrowUpRight />
            </Link>
            <Link className="ghost-link" href="/quiz">
              Take the 60-second stack quiz
              <ArrowRight />
            </Link>
          </div>

          {/* Trust row */}
          <div className="hero-trust fade-up" style={{ '--delay': '600ms' } as React.CSSProperties}>
            <span className="stars" aria-label="5 out of 5 stars">★★★★★</span>
            <span className="trust-text">
              Read by <strong>researchers, clinicians, and educators</strong>
            </span>
          </div>

        </div>

        {/* ── RIGHT COLUMN ── */}
        <div className="hero-right">
          <div className="helix-card-shell fade-up" style={{ '--delay': '300ms' } as React.CSSProperties}>
            <div className="glass helix-card">

              {/* Status pill */}
              <div className="status-pill">
                <span className="dot" aria-hidden="true" />
                <span className="num">51</span> peptides
                <span className="sep">·</span>
                <span className="num">668+</span> studies
                <span className="sep">·</span>
                <span className="live">INDEXED</span>
              </div>

              {/* Helix stage */}
              <div className="helix-stage">
                <span className="stage-label">HLX-04 · LIVE FEED</span>
                <span className="stage-coords">θ 4.71 · Δ 0.03Å</span>
                <span className="tick tl" aria-hidden="true" />
                <span className="tick tr" aria-hidden="true" />
                <span className="tick bl" aria-hidden="true" />
                <span className="tick br" aria-hidden="true" />
                <HelixSVG />
              </div>

              {/* Readouts */}
              <div className="readouts" role="list">
                <div className="readout" role="listitem">
                  <span className="readout-label">PROFILES</span>
                  <span className="readout-value">51</span>
                </div>
                <div className="readout" role="listitem">
                  <span className="readout-label">STACKS</span>
                  <span className="readout-value">12</span>
                </div>
                <div className="readout" role="listitem">
                  <span className="readout-label">COA PURITY</span>
                  <span className="readout-value">99<span className="em">%</span></span>
                </div>
              </div>

              {/* Floating purity-audit panel */}
              <aside className="purity-panel glass-light" aria-label="Latest purity audit">
                <div className="purity-row">
                  <span className="purity-label">HPLC AUDIT</span>
                  <span className="purity-status">VERIFIED</span>
                </div>
                <div className="purity-bar" role="progressbar" aria-valuenow={99.7} aria-valuemin={0} aria-valuemax={100}>
                  <div className="purity-fill" />
                </div>
                <div className="purity-meta">
                  <span><strong>99.7%</strong></span>
                  <span>2025-11-12</span>
                  <span>LCMS ×2</span>
                </div>
              </aside>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
