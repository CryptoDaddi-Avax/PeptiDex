'use client';

import Link from 'next/link';
import './Hero.css';

/**
 * Hero — v13 homepage hero section.
 *
 * DELETED from previous version:
 *  - Entire Three.js scene (CDN script injection, useEffect with
 *    Scene/PerspectiveCamera/WebGLRenderer, SphereGeometry atoms,
 *    CylinderGeometry bonds, BufferGeometry particles, DirectionalLight,
 *    PointLight, AmbientLight, animation loop, IntersectionObserver-gated
 *    lazy loading, resize handler, visibility observer)
 *  - "BACKBONE CHAIN / C62H98N16O22" coordinate labels
 *  - "BPC-157 — RESEARCH PEPTIDE / TISSUE REPAIR · ANGIOGENESIS" label
 *  - "The reference for peptide research." headline
 *  - "Enter the library" / "Search the index" CTAs
 *  - "Vol. I · Edition 2026" bottom meta bar
 *  - All useRef hooks (canvasRef, containerRef)
 *  - Grid background + radial gradient background effects
 *
 * REPLACED with v13 reference:
 *  - Full-bleed <video> background (Cloudflare R2)
 *  - Scrim + grain overlay layers
 *  - 2-column grid: headline/CTAs left, helix-card right
 *  - Inline "see the library" pill-in-headline pattern
 *  - Static helix SVG waveform in the helix-card
 *  - Purity audit panel with animated bar
 *  - Trust row with 5-star glyphs
 */

/* ── Static helix SVG (replaces Three.js) ── */
function HelixSVG() {
  // 8-node zigzag waveform matching v13's helix visual
  const nodes = [
    { cx: 60,  cy: 180, type: 'lime' },
    { cx: 130, cy: 80,  type: 'paper' },
    { cx: 200, cy: 160, type: 'teal' },
    { cx: 270, cy: 70,  type: 'paper' },
    { cx: 340, cy: 170, type: 'lime' },
    { cx: 410, cy: 85,  type: 'paper' },
    { cx: 480, cy: 175, type: 'teal' },
    { cx: 540, cy: 90,  type: 'lime' },
  ];

  return (
    <svg
      className="helix-svg-static"
      viewBox="0 0 600 280"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      {/* Bonds */}
      {nodes.map((node, i) => {
        if (i === nodes.length - 1) return null;
        const next = nodes[i + 1];
        return (
          <line
            key={`bond-${i}`}
            className="helix-bond"
            x1={node.cx}
            y1={node.cy}
            x2={next.cx}
            y2={next.cy}
          />
        );
      })}
      {/* Nodes */}
      {nodes.map((node, i) => (
        <circle
          key={`node-${i}`}
          className={`helix-node-${node.type}`}
          cx={node.cx}
          cy={node.cy}
          r={node.type === 'lime' ? 9 : node.type === 'teal' ? 7 : 8}
        />
      ))}
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
