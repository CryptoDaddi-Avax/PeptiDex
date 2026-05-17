'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import './AdvisorPreviewBlock.css';

/* ── Static Q&A Preview Data ── */

const EXAMPLE_EXCHANGES = [
  {
    id: 'fat-loss',
    q: 'Best peptide stack for cutting?',
    a: 'In the Phase 2 NEJM trial, subjects receiving Retatrutide at 12mg weekly achieved 24.2% body weight loss at 48 weeks. A common research stack pairs it with AOD-9604 for lipolytic synergy. PEPTIDEX saves 20% on the Retatrutide vial at Amino Club.',
    ts: '10:42 AM',
  },
  {
    id: 'safety-check',
    q: 'Is BPC-157 safe with Tirzepatide?',
    a: 'Yes — no documented mechanism conflicts. BPC-157 acts on VEGFR2/angiogenesis (PMID 14554208); Tirzepatide on GLP-1/GIP. Stack consideration: coordinate injection timing to monitor injection site responses.',
    ts: '10:43 AM',
  },
  {
    id: 'pharmacology',
    q: "What's the half-life of Tesamorelin?",
    a: 'Tesamorelin has a plasma half-life of ~26 minutes under repeated dosing (FDA Egrifta prescribing information), administered subcutaneously once daily. Despite rapid clearance, it sustains effects by triggering endogenous GH pulses that operate on a longer biological timeline.',
    ts: '10:44 AM',
  },
];

/* ── Schema ── */

const advisorSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'PeptiDex AI Advisor',
  applicationCategory: 'HealthApplication',
  url: 'https://peptidex.app/advisor',
  description:
    'AI-powered peptide research assistant providing personalized stack recommendations, dosing protocols from clinical literature, and side-by-side peptide comparisons with citations.',
  featureList: [
    'Personalized peptide stack recommendations',
    'Citation-grounded research answers',
    'Vendor pricing integration',
    'Stack interaction analysis',
  ],
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  provider: {
    '@type': 'Organization',
    name: 'PeptiDex',
    url: 'https://peptidex.app',
  },
};

/* ── Component ── */

export default function AdvisorPreviewBlock() {
  const sectionRef = useRef<HTMLElement>(null);
  const hasTrackedView = useRef(false);
  const [visibleExchanges, setVisibleExchanges] = useState<number[]>([]);

  // Fire advisor_preview_viewed + stagger chat bubble animation
  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          // Analytics: fire once
          if (!hasTrackedView.current) {
            hasTrackedView.current = true;
            if (typeof window !== 'undefined' && typeof (window as any).gtag === 'function') {
              (window as any).gtag('event', 'advisor_preview_viewed', {
                location: 'homepage',
              });
            }
          }

          // Stagger bubble appearance
          EXAMPLE_EXCHANGES.forEach((_, i) => {
            setTimeout(() => {
              setVisibleExchanges((prev) =>
                prev.includes(i) ? prev : [...prev, i]
              );
            }, 300 + i * 400);
          });

          observer.disconnect();
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleCtaClick = () => {
    if (typeof window !== 'undefined' && typeof (window as any).gtag === 'function') {
      (window as any).gtag('event', 'advisor_preview_cta_clicked', {
        location: 'homepage',
      });
    }
  };

  const handleExampleClick = (questionId: string) => {
    if (typeof window !== 'undefined' && typeof (window as any).gtag === 'function') {
      (window as any).gtag('event', 'advisor_preview_example_q_clicked', {
        question_id: questionId,
        location: 'homepage',
      });
    }
  };

  return (
    <section className="advisor-preview" id="advisor-preview" ref={sectionRef}>
      <div className="section-label">§ Intelligence</div>
      <div className="advisor-preview-inner">
        <div className="advisor-glow" aria-hidden="true" />

        {/* Left: Copy + CTA */}
        <div className="advisor-copy">
          <h2 className="advisor-headline">
            Ask the <em>PeptiDex</em><br />Advisor
          </h2>
          <p className="advisor-subhead">
            AI-powered peptide recommendations grounded in published research
            and verified vendor data.
          </p>

          <div className="advisor-capabilities">
            <div className="advisor-cap">
              <span className="advisor-cap-icon">📋</span>
              <span className="advisor-cap-text">
                Build personalized stacks based on your goals
              </span>
            </div>
            <div className="advisor-cap">
              <span className="advisor-cap-icon">💊</span>
              <span className="advisor-cap-text">
                Get dosing protocols from clinical literature
              </span>
            </div>
            <div className="advisor-cap">
              <span className="advisor-cap-icon">🔍</span>
              <span className="advisor-cap-text">
                Compare peptides side-by-side with citations
              </span>
            </div>
          </div>

          <Link
            href="/advisor"
            className="advisor-cta"
            onClick={handleCtaClick}
            id="advisor-preview-cta"
          >
            <span>Open the Advisor</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M1 8h14M9 2l6 6-6 6"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>
          </Link>
        </div>

        {/* Right: Chat preview */}
        <div className="advisor-chat">
          <div className="advisor-chat-header">
            <div className="advisor-chat-dot" />
            <span className="advisor-chat-title">PeptiDex Advisor</span>
          </div>
          <div className="advisor-chat-body">
            {EXAMPLE_EXCHANGES.map((ex, i) => (
              <div
                key={ex.id}
                className={`advisor-exchange${
                  visibleExchanges.includes(i) ? ' visible' : ''
                }`}
              >
                {/* User question */}
                <div
                  className="advisor-q"
                  onClick={() => handleExampleClick(ex.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleExampleClick(ex.id);
                  }}
                >
                  {ex.q}
                </div>
                {/* Advisor answer */}
                <div className="advisor-a">
                  <div className="advisor-a-label">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M12 2a7 7 0 017 7c0 5-7 13-7 13S5 14 5 9a7 7 0 017-7z" />
                      <circle cx="12" cy="9" r="2.5" />
                    </svg>
                    Advisor
                  </div>
                  {ex.a}
                </div>
                <div className="advisor-ts">{ex.ts}</div>
              </div>
            ))}
          </div>
        </div>

        {/* AEO: SoftwareApplication schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(advisorSchema) }}
        />
      </div>
    </section>
  );
}
