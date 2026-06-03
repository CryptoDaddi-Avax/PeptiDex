'use client';

import Link from 'next/link';
import './Interstitial.css';

/**
 * Interstitial — v13 cinematic full-bleed video band.
 * Positioned between the Bento section and the Tools grid.
 *
 * Video: clip2.mp4 from Cloudflare R2 (same base URL as Hero/Bento).
 * Content: "Every claim here is traceable to a lab report."
 * CTA: "Read our methodology" → /about/methodology
 */

const ArrowRight = () => (
  <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function Interstitial() {
  return (
    <section className="interstitial" id="methodology" aria-label="Accountability">

      {/* Full-bleed background video */}
      <video
        className="interstitial-bg"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        src="https://pub-bb44e23f2db2497da1abd5de2ab102a4.r2.dev/clip2.mp4"
      />

      <div className="interstitial-scrim" aria-hidden="true" />
      <div className="interstitial-grain" aria-hidden="true" />

      {/* Corner crosshairs */}
      <span className="interstitial-corner tl" aria-hidden="true" />
      <span className="interstitial-corner tr" aria-hidden="true" />
      <span className="interstitial-corner bl" aria-hidden="true" />
      <span className="interstitial-corner br" aria-hidden="true" />

      {/* Cinematic stamps */}
      <div className="interstitial-stamp" aria-hidden="true">
        <span className="rec" />REC · 03:21:08
      </div>
      <div className="interstitial-coords" aria-hidden="true">
        LAT 41.882° N · LON 12.483° E
      </div>

      <div className="interstitial-inner">
        <p className="interstitial-eyebrow fade-up">§ 03 / ACCOUNTABILITY</p>
        <h2 className="interstitial-h2 fade-up" style={{ '--delay': '140ms' } as React.CSSProperties}>
          Every claim here is <span className="em">traceable</span> to a lab report.
        </h2>
        <div className="interstitial-cta fade-up" style={{ '--delay': '280ms' } as React.CSSProperties}>
          <Link className="pill-btn pill-outline" href="/about/methodology">
            Read our methodology
            <ArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
}
