'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { SITE_STATS } from '@/data/site-stats';
import './QuizPromoCard.css';

export default function QuizPromoCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const hasTrackedView = useRef(false);

  // Fire quiz_promo_card_viewed once when the card enters the viewport
  useEffect(() => {
    if (!cardRef.current || hasTrackedView.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || hasTrackedView.current) return;
          hasTrackedView.current = true;
          observer.disconnect();

          if (typeof window !== 'undefined' && typeof (window as any).gtag === 'function') {
            (window as any).gtag('event', 'quiz_promo_card_viewed', {
              location: 'homepage',
            });
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  const handleCtaClick = () => {
    if (typeof window !== 'undefined' && typeof (window as any).gtag === 'function') {
      (window as any).gtag('event', 'quiz_promo_card_clicked', {
        location: 'homepage',
      });
    }
  };

  const quizSchema = {
    '@context': 'https://schema.org',
    '@type': 'Quiz',
    name: 'PeptiDex Stack Finder Quiz',
    description:
      'Answer 5 quick questions about your goals, experience, and budget to receive a personalized peptide stack recommendation backed by published research.',
    url: 'https://peptidex.app/quiz',
    about: {
      '@type': 'Thing',
      name: 'Research Peptides',
      description: 'Personalized peptide stack recommendations based on individual research goals.',
    },
    educationalLevel: 'Beginner',
    isAccessibleForFree: true,
    provider: {
      '@type': 'Organization',
      name: 'PeptiDex',
      url: 'https://peptidex.app',
    },
  };

  return (
    <section className="quiz-promo" id="quiz-promo" ref={cardRef}>
      <div className="section-label">§ Personalized</div>
      <div className="quiz-promo-card">
        <div className="quiz-promo-glow" aria-hidden="true" />

        <div className="quiz-promo-body">
          <h2 className="quiz-promo-headline">
            Get Your Custom Peptide<br />
            Stack in <em>60 Seconds</em>
          </h2>

          <p className="quiz-promo-subhead">
            5 quick questions → personalized peptide recommendations backed by published research
          </p>

          <div className="quiz-promo-trust">
            <span className="quiz-trust-pill">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Based on {SITE_STATS.studies.count}+ studies
            </span>
            <span className="quiz-trust-pill">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Vendor pricing included
            </span>
            <span className="quiz-trust-pill">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              PEPTIDEX coupon auto-applied
            </span>
          </div>

          <div className="quiz-promo-cta-row">
            <Link
              href="/quiz"
              className="quiz-promo-cta"
              onClick={handleCtaClick}
              id="quiz-promo-start"
            >
              <span>Start the Quiz</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M1 8h14M9 2l6 6-6 6" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </Link>
            <span className="quiz-promo-noemail">No email required to see results</span>
          </div>
        </div>

        {/* AEO: Quiz schema for AI engine extraction */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(quizSchema) }}
        />
      </div>
    </section>
  );
}
