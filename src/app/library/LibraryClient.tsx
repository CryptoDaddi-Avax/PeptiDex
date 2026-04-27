'use client';

import { useState, useMemo, useTransition, useDeferredValue, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Search, FlaskConical, TrendingUp, ChevronRight, BadgeCheck } from 'lucide-react';
import RedesignLayout from '@/components/redesign/RedesignLayout';
import PeptideCardRedesign from '@/components/redesign/PeptideCardRedesign';
import { peptides, searchPeptides } from '@/data/peptides';
import { peptideBlends } from '@/data/blends';
import './library-redesign.css';

const categories = [...new Set(peptides.map((p) => p.category))];

const FEATURED_SLUGS = ['retatrutide', 'mots-c', 'pt-141', 'ss-31', 'tesofensine'];

export default function LibraryClient() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const deferredQuery = useDeferredValue(query);
  const deferredCategory = useDeferredValue(selectedCategory);
  const isInitialMount = useRef(true);

  const featuredPeptides = useMemo(
    () => FEATURED_SLUGS.map((slug) => peptides.find((p) => p.slug === slug)).filter(Boolean),
    [],
  );

  const filtered = useMemo(() => {
    let results = deferredQuery ? searchPeptides(deferredQuery) : peptides;
    if (deferredCategory) {
      results = results.filter((p) => p.category === deferredCategory);
    }
    return results;
  }, [deferredQuery, deferredCategory]);

  return (
    <RedesignLayout>
      {/* ═══════ HERO ═══════ */}
      <section className="library-hero">
        <div className="library-section-label">§ 01 — Research Index</div>
        <h1 className="library-title">Peptide Library</h1>
        <p className="library-subtitle">
          {peptides.length} compounds indexed · Evidence-graded · Peer-cited
        </p>
      </section>

      {/* ═══════ SEARCH ═══════ */}
      <div className="library-search-wrap">
        <Search className="library-search-icon" />
        <input
          type="text"
          placeholder="Search peptides, benefits, categories…"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            isInitialMount.current = false;
          }}
          className="library-search"
        />
        {isPending && <div className="library-search-spinner" />}
      </div>

      {/* ═══════ CATEGORY FILTERS ═══════ */}
      <div className="library-filters">
        <button
          onClick={() =>
            startTransition(() => {
              setSelectedCategory(null);
              isInitialMount.current = false;
            })
          }
          className={`filter-pill ${!selectedCategory ? 'active' : ''}`}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() =>
              startTransition(() => {
                setSelectedCategory(selectedCategory === cat ? null : cat);
                isInitialMount.current = false;
              })
            }
            className={`filter-pill ${selectedCategory === cat ? 'active' : ''}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* ═══════ TRENDING SECTION ═══════ */}
      {!query && !selectedCategory && featuredPeptides.length > 0 && (
        <section className="library-trending">
          <div className="library-trending-label">
            <TrendingUp />
            <span>Trending in 2026</span>
          </div>
          <div className="trending-grid">
            {featuredPeptides.map(
              (peptide) =>
                peptide && (
                  <div
                    key={peptide.slug}
                    className="trending-card"
                    onClick={() => router.push(`/library/${peptide.slug}`)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') router.push(`/library/${peptide.slug}`);
                    }}
                  >
                    <h3 className="trending-card-name">
                      {peptide.name}
                      {peptide.is_fda_approved && (
                        <BadgeCheck className="fda-icon" />
                      )}
                    </h3>
                    <div className="trending-card-category">{peptide.category}</div>
                    <p className="trending-card-benefits">{peptide.primary_benefits}</p>
                    <div className="trending-card-tag">
                      <TrendingUp />
                      <span>Trending</span>
                    </div>
                  </div>
                ),
            )}
          </div>
        </section>
      )}

      {/* ═══════ BLENDS BANNER ═══════ */}
      <div className="library-blends">
        <Link href="/library/blends" className="blends-link">
          <div className="blends-link-body">
            <div className="blends-icon-wrap">
              <FlaskConical />
            </div>
            <div>
              <p className="blends-link-title">Peptide Blends</p>
              <p className="blends-link-sub">
                {peptideBlends.length} popular combinations — BPC/TB-500, CJC/Ipa &amp; more
              </p>
            </div>
          </div>
          <ChevronRight className="blends-arrow" />
        </Link>
      </div>

      {/* ═══════ CARD GRID ═══════ */}
      <div className={`library-grid ${isPending ? 'pending' : ''}`}>
        {filtered.map((peptide) => (
          <PeptideCardRedesign key={peptide.slug} peptide={peptide} />
        ))}
      </div>

      {/* ═══════ EMPTY STATE ═══════ */}
      {filtered.length === 0 && (
        <div className="library-empty">
          <p className="library-empty-text">No peptides match your search.</p>
          <p className="library-empty-detail">Try a broader term or clear filters.</p>
        </div>
      )}

      {/* ═══════ SEO CONTENT BLOCK ═══════ */}
      {filtered.length > 0 && (
        <div className="library-seo">
          <div className="library-seo-inner">
            <h3>About the Peptide Directory</h3>
            <p>
              This comprehensive library indexes synthetic amino acid sequences specifically
              formulated for in-vitro laboratory research. It aggregates pharmacokinetic data,
              half-life degradation metrics, and clinical trial outcomes for educational
              referencing. By providing structured, peer-reviewed data vectors on compounds
              ranging from BPC-157 tissue repair to advanced GLP-1 metabolic agonists,
              researchers can efficiently map mechanism-of-action hypotheses. None of the
              listed compounds are FDA approved for human therapeutic consumption. Always
              verify chemical purity via rigorous third-party HPLC/MS Certificates of Analysis
              prior to experimental utilization.
            </p>
          </div>
        </div>
      )}
    </RedesignLayout>
  );
}
