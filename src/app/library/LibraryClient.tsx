'use client';

import { useState, useMemo, useTransition, useDeferredValue, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Search, FlaskConical, ChevronRight, TrendingUp } from 'lucide-react';
import RedesignLayout from '@/components/redesign/RedesignLayout';
import { peptides, searchPeptides } from '@/data/peptides';
import { peptideBlends } from '@/data/blends';
import type { Peptide, EvidenceLevel } from '@/data/types';
import './library-redesign.css';

/* ── Constants ── */
const categories = [...new Set(peptides.map((p) => p.category))];
const FEATURED_SLUGS = ['mots-c', 'pt-141', 'retatrutide', 'ss-31', 'tesofensine'];
const EVIDENCE_LEVELS = ['very-strong', 'strong', 'moderate', 'preclinical'] as const;

const EVIDENCE_RANK: Record<string, number> = {
  'very-strong': 5,
  'strong': 4,
  'moderate-strong': 3,
  'moderate': 2,
  'preclinical': 1,
  'emerging': 0,
  'anecdotal': -1,
};

const EVIDENCE_DISPLAY: Record<string, string> = {
  'very-strong': 'Very Strong',
  'strong': 'Strong',
  'moderate-strong': 'Moderate',
  'moderate': 'Moderate',
  'preclinical': 'Preclinical',
  'emerging': 'Emerging',
  'anecdotal': 'Anecdotal',
};

function topEvidence(peptide: Peptide): EvidenceLevel {
  if (!peptide.key_studies?.length) return 'emerging';
  return peptide.key_studies.reduce<EvidenceLevel>(
    (best, study) =>
      (EVIDENCE_RANK[study.evidence_level] ?? 0) > (EVIDENCE_RANK[best] ?? 0)
        ? study.evidence_level
        : best,
    peptide.key_studies[0].evidence_level,
  );
}

function evidenceClass(level: EvidenceLevel): string {
  if (level === 'moderate-strong') return 'moderate';
  return level;
}

/* ── Category counts ── */
const categoryCounts = categories.reduce<Record<string, number>>((acc, cat) => {
  acc[cat] = peptides.filter((p) => p.category === cat).length;
  return acc;
}, {});

/* ── Stats ── */
const fdaApprovedCount = peptides.filter((p) => p.is_fda_approved).length;
const uniqueMechanisms = new Set(peptides.map((p) => p.category)).size;
const totalStudies = peptides.reduce((sum, p) => sum + (p.key_studies?.length ?? 0), 0);

export default function LibraryClient() {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedEvidence, setSelectedEvidence] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const deferredQuery = useDeferredValue(query);
  const deferredCategory = useDeferredValue(selectedCategory);
  const deferredEvidence = useDeferredValue(selectedEvidence);

  /* Scroll reveal */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('in'), i * 40);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -80px 0px' },
    );
    document.querySelectorAll('.lib-reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  /* Featured (trending) peptides */
  const featuredPeptides = useMemo(
    () => FEATURED_SLUGS.map((slug) => peptides.find((p) => p.slug === slug)).filter(Boolean) as Peptide[],
    [],
  );

  /* Filtered results */
  const filtered = useMemo(() => {
    let results = deferredQuery ? searchPeptides(deferredQuery) : peptides;
    if (deferredCategory) {
      results = results.filter((p) => p.category === deferredCategory);
    }
    if (deferredEvidence) {
      results = results.filter((p) => {
        const ev = topEvidence(p);
        return ev === deferredEvidence || (deferredEvidence === 'moderate' && ev === 'moderate-strong');
      });
    }
    return results;
  }, [deferredQuery, deferredCategory, deferredEvidence]);

  const showTrending = !query && !selectedCategory && !selectedEvidence;

  return (
    <RedesignLayout>
      {/* ═══════ PAGE HEADER ═══════ */}
      <header className="lib-page-header">
        <div className="lib-header-grid" />
        <div className="lib-header-wrap">
          <nav className="lib-breadcrumb">
            <Link href="/">Home</Link>
            <span className="sep">/</span>
            <span className="current">Library</span>
          </nav>
          <div className="lib-section-label">§ The Library</div>
          <h1 className="lib-page-title">
            {peptides.length} <em>research</em><br />peptides, indexed.
          </h1>
          <p className="lib-page-subtitle">
            Every compound is categorized by mechanism of action and graded by the strength of
            available clinical evidence. Filter, search, or browse the full catalog.
          </p>
          <div className="lib-page-meta">
            <div className="lib-page-meta-item">
              <strong>{peptides.length}</strong> compounds
            </div>
            <div className="lib-page-meta-item">
              <strong>{uniqueMechanisms}</strong> mechanism classes
            </div>
            <div className="lib-page-meta-item">
              <strong>{totalStudies}+</strong> studies indexed
            </div>
            <div className="lib-page-meta-item">
              <strong>{fdaApprovedCount}</strong> FDA-approved
            </div>
          </div>
        </div>
      </header>

      {/* ═══════ CONTROLS ═══════ */}
      <div className="lib-container">
        <div className="lib-controls">
          {/* Search */}
          <div className="lib-search">
            <Search />
            <input
              type="text"
              id="libSearch"
              placeholder="Search by name or category — e.g. BPC-157, GHRH, fat loss…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            {isPending && <div className="lib-search-spinner" />}
            <span className="lib-count">{filtered.length} shown</span>
          </div>

          {/* Category filters */}
          <div className="lib-filter-row">
            <button
              className={`lib-filter-btn ${!selectedCategory ? 'active' : ''}`}
              onClick={() => startTransition(() => setSelectedCategory(null))}
            >
              All <span className="count">{peptides.length}</span>
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                className={`lib-filter-btn ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() =>
                  startTransition(() =>
                    setSelectedCategory(selectedCategory === cat ? null : cat),
                  )
                }
              >
                {cat} <span className="count">{categoryCounts[cat]}</span>
              </button>
            ))}
          </div>

          {/* Evidence filter */}
          <div className="lib-evidence-filter">
            <span className="lib-ev-label">Evidence:</span>
            <button
              className={`lib-ev-btn ${!selectedEvidence ? 'active' : ''}`}
              onClick={() => startTransition(() => setSelectedEvidence(null))}
            >
              All
            </button>
            {EVIDENCE_LEVELS.map((level) => (
              <button
                key={level}
                className={`lib-ev-btn ${selectedEvidence === level ? 'active' : ''}`}
                onClick={() =>
                  startTransition(() =>
                    setSelectedEvidence(selectedEvidence === level ? null : level),
                  )
                }
              >
                {EVIDENCE_DISPLAY[level]}
              </button>
            ))}
          </div>
        </div>

        {/* ═══════ TRENDING ═══════ */}
        {showTrending && featuredPeptides.length > 0 && (
          <div className="lib-trending-section lib-reveal">
            <div className="lib-section-label">§ Trending in 2026</div>
            <h2 className="lib-trending-title">
              The peptides researchers are <em>talking about</em>.
            </h2>
            <div className="lib-trending-grid">
              {featuredPeptides.map((peptide) => (
                <Link
                  key={peptide.slug}
                  href={`/library/${peptide.slug}`}
                  className="lib-trending-card"
                >
                  <div className="lib-trending-tags">
                    {peptide.is_fda_approved && (
                      <span className="lib-tag gold">FDA</span>
                    )}
                    <span className="lib-tag">Trending</span>
                  </div>
                  <div className="lib-trending-cat">{peptide.category}</div>
                  <h3>{peptide.name}</h3>
                  <p>{peptide.primary_benefits}</p>
                  <div className="lib-trending-arrow">→</div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* ═══════ BLENDS BANNER ═══════ */}
        <div className="lib-blends-banner">
          <Link href="/library/blends" className="lib-blends-link">
            <div className="lib-blends-body">
              <div className="lib-blends-icon">
                <FlaskConical />
              </div>
              <div>
                <p className="lib-blends-title">Peptide Blends</p>
                <p className="lib-blends-sub">
                  {peptideBlends.length} popular combinations — BPC/TB-500, CJC/Ipa &amp; more
                </p>
              </div>
            </div>
            <ChevronRight className="lib-blends-arrow" />
          </Link>
        </div>

        {/* ═══════ FULL INDEX ═══════ */}
        <div className="lib-reveal">
          <div className="lib-section-label">§ Full Index — A to Z</div>
          <div className={`lib-peptide-grid ${isPending ? 'pending' : ''}`}>
            {filtered.map((peptide) => {
              const ev = topEvidence(peptide);
              const benefits = peptide.primary_benefits
                .split(',')
                .map((b) => b.trim())
                .filter(Boolean);

              return (
                <Link
                  key={peptide.slug}
                  href={`/library/${peptide.slug}`}
                  className="lib-peptide-card"
                >
                  <div className="lib-card-top">
                    <div className="lib-card-cat">{peptide.category}</div>
                    {peptide.is_fda_approved && (
                      <span className="lib-fda-mark">FDA</span>
                    )}
                  </div>
                  <h3 className="lib-card-name">{peptide.name}</h3>
                  <ul className="lib-card-benefits">
                    {benefits.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                  <div className="lib-card-bottom">
                    <span className={`lib-evidence-badge ${evidenceClass(ev)}`}>
                      {EVIDENCE_DISPLAY[ev] ?? 'Emerging'}
                    </span>
                    <span className="lib-card-arrow">→</span>
                  </div>
                </Link>
              );
            })}

            {/* Empty state inside grid */}
            {filtered.length === 0 && (
              <div className="lib-empty-state">
                <p>No peptides match your filters.</p>
                <p>Try clearing filters or searching a different term.</p>
              </div>
            )}
          </div>
        </div>

        {/* ═══════ SEO CONTENT ═══════ */}
        {filtered.length > 0 && (
          <div className="lib-seo-block">
            <div className="lib-section-label">§ About the Directory</div>
            <p>
              This comprehensive library indexes synthetic amino acid sequences specifically
              formulated for in-vitro laboratory research. It aggregates pharmacokinetic data,
              half-life degradation metrics, and clinical trial outcomes for educational
              referencing. None of the listed compounds are FDA approved for human therapeutic
              consumption unless explicitly labeled. Always verify chemical purity via rigorous
              third-party HPLC/MS Certificates of Analysis prior to experimental utilization.
            </p>
          </div>
        )}
      </div>

      {/* ═══════ DISCLAIMER STRIP ═══════ */}
      <div className="lib-disclaimer-strip">
        ⚠ Educational only · Not medical advice · Most peptides are research-only / not FDA-approved
      </div>
    </RedesignLayout>
  );
}
