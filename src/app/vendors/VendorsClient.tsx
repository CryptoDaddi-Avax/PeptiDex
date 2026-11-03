'use client';

/**
 * VendorsClient — /vendors long-form SEO listicle (2026 rebuild).
 * ================================================================
 * Page structure (in order):
 *  1. Hero       — H1, subhead, last-reviewed timestamp, breadcrumb
 *  2. Comparison — <VendorComparisonTable> (sticky desktop, scroll mobile)
 *  3. Ranked sections — <VendorRankCard> × 6 (injectable + oral)
 *  4. Methodology — published ranking criteria + every vendor's score
 *  5. Buyer's guide — ~600 words, internal links to /tools/coa + /library
 *  6. FAQ — <VendorsFAQ> with 8 Q&As
 *
 * Data sources (read-only):
 *   - vendors.ts          → Vendor records, sortOrder, affiliateUrl, etc.
 *   - vendorEditorial.ts  → shortPitch, pros, cons, blurb (DO NOT hardcode here)
 *   - vendorsJsonLd.ts    → VENDORS_FAQ_ITEMS (same source as server JSON-LD)
 */

import Link from 'next/link';
import {
  FlaskConical,
  ShieldCheck,
  CheckCircle2,
  BarChart3,
  BookOpen,
  Microscope,
  Truck,
  CreditCard,
  ArrowRight,
  AlertTriangle,
} from 'lucide-react';
import { vendorsSorted, injectableVendors, oralVendors, VENDOR_COUNT } from '@/data/vendors';
import { RANKING_CRITERIA, RANKING_DISCLOSURE, RANKING_ORDER_RULE } from '@/lib/vendor-criteria';
import { VENDORS_FAQ_ITEMS } from './faqData';
import { VendorComparisonTable } from '@/components/vendors/VendorComparisonTable';
import { VendorRankCard } from '@/components/vendors/VendorRankCard';
import { ShippingInputsTable } from '@/components/vendors/ShippingInputsTable';
import { VendorsFAQ } from '@/components/vendors/VendorsFAQ';
import { DisclaimerCard, InlineDisclaimer } from '@/components/ui/DisclaimerCard';
import { FounderOwnershipDisclosure } from "@/components/disclosures/FounderOwnershipDisclosure";
import './vendors-redesign.css';

// ── Props ─────────────────────────────────────────────────────────────────────

interface VendorsClientProps {
  /** ISO date string from LAST_REVIEWED constant in page.tsx */
  lastReviewed: string;
}

// ── Formatted date helper ─────────────────────────────────────────────────────

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

// ── Main Client Component ─────────────────────────────────────────────────────

export default function VendorsClient({ lastReviewed }: VendorsClientProps) {
  return (
    <>

      {/* ═══════════════════════════════════════════════════════════════════
          1. HERO
          ═══════════════════════════════════════════════════════════════════ */}
      <header className="vn-page-header">
        <div className="vn-header-grid" aria-hidden="true" />
        <div className="vn-header-wrap">

          {/* Breadcrumb */}
          <nav className="vn-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span className="sep" aria-hidden="true">/</span>
            <span className="current">Vendors</span>
          </nav>

          {/* Last reviewed timestamp */}
          <div className="vn-last-reviewed" aria-label={`Last updated ${formatDate(lastReviewed)}`}>
            Last updated: <time dateTime={lastReviewed}>{formatDate(lastReviewed)}</time>
          </div>

          {/* H1 — exact string required by SEO spec */}
          <h1 className="vn-page-title">
            Best Place to Buy Peptides Online (2026): {VENDOR_COUNT} COA-Verified Vendors Ranked
          </h1>

          {/* 2-sentence subhead — must include "where to buy peptides" */}
          <p className="vn-subtitle">
            PeptiDex compares <strong>where to buy peptides online</strong> in 2026 by
            scoring every vendor on the same {RANKING_CRITERIA.length} published criteria —
            COA availability, third-party lab testing, price per mg, shipping, payment
            options and returns — using each vendor&apos;s own published information.
            PeptiDex does not test products.
          </p>

          {/* Page stats */}
          <div className="vn-page-meta">
            <div className="vn-meta-item">
              <strong>{VENDOR_COUNT}</strong> vendors
            </div>
            <div className="vn-meta-item">
              <strong>{RANKING_CRITERIA.length}</strong> published criteria
            </div>
            <div className="vn-meta-item">
              <a href="#how-we-rank"><strong>How</strong> we rank</a>
            </div>
            <div className="vn-meta-item">
              <strong>Updated</strong> {formatDate(lastReviewed)}
            </div>
          </div>
        </div>
      </header>

      <div className="vn-container" style={{ marginTop: '2rem' }}>
        <DisclaimerCard variant="vendor" />
        <FounderOwnershipDisclosure />
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          2. QUICK COMPARISON TABLE
          ═══════════════════════════════════════════════════════════════════ */}
      <div className="vn-container">
        <VendorComparisonTable vendors={vendorsSorted} />
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          3. RANKED INJECTABLE VENDOR SECTIONS
          ═══════════════════════════════════════════════════════════════════ */}
      <div className="vn-container">
        <div className="vn-section-label" style={{ marginTop: '80px' }}>§ Injectable Vendors — Ranked</div>
        <div className="vrk-list">
          {injectableVendors.map((vendor, i) => (
            <VendorRankCard
              key={vendor.slug}
              vendor={vendor}
              rank={i + 1}
            />
          ))}
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          3b. ORAL VENDORS (separate section, continues rank numbering)
          ═══════════════════════════════════════════════════════════════════ */}
      {oralVendors.length > 0 && (
        <section className="vn-oral-section">
          <div className="vn-container">
            <div className="vn-section-label">§ Oral Peptide Sources</div>
            <p className="vn-subtitle" style={{ maxWidth: '600px', marginBottom: '2rem', fontSize: '0.95rem' }}>
              Vendors specializing in oral peptide delivery — capsules, sublingual tablets, and
              nasal sprays for needle-free research protocols.
            </p>
            <div className="vrk-list">
              {oralVendors.map((vendor, i) => (
                <VendorRankCard
                  key={vendor.slug}
                  vendor={vendor}
                  rank={injectableVendors.length + i + 1}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════════════════════
          3.5 POPULAR PEPTIDES QUICK LINKS
          ═══════════════════════════════════════════════════════════════════ */}
      <section className="vn-extra-section" id="popular-peptides" aria-labelledby="popular-peptides-heading">
        <div className="vn-container">
          <div className="vn-section-label">§ Specific Compounds</div>
          <h2 className="vn-extra-title" id="popular-peptides-heading">
            Where to Buy <em>Specific Peptides</em>
          </h2>
          <p className="vmeth-intro">
            Looking for a specific compound? Check out our dedicated sourcing guides comparing vendor pricing and availability for the most popular research peptides:
          </p>
          <div className="flex flex-wrap gap-3 mt-6">
            {['bpc-157', 'tb-500', 'ghk-cu', 'ipamorelin', 'cjc-1295'].map((slug) => (
              <Link
                key={slug}
                href={`/where-to-buy/${slug}`}
                className="px-5 py-3 rounded-xl border border-zinc-700 bg-zinc-900/50 hover:border-violet-500/50 hover:bg-violet-500/10 text-zinc-300 hover:text-white transition-all font-semibold uppercase tracking-wider text-sm flex items-center gap-2"
              >
                {slug.toUpperCase()} <ArrowRight className="w-4 h-4 text-violet-400" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          3.6 IN-DEPTH VENDOR REVIEWS
          ═══════════════════════════════════════════════════════════════════ */}
      <section className="vn-extra-section" id="vendor-reviews" aria-labelledby="vendor-reviews-heading">
        <div className="vn-container">
          <div className="vn-section-label">§ In-Depth Reviews</div>
          <h2 className="vn-extra-title" id="vendor-reviews-heading">
            Full Vendor <em>Review Pages</em>
          </h2>
          <p className="vmeth-intro">
            Each vendor has a dedicated long-form review with COA analysis, pricing breakdown, community sentiment, and FAQ — written to YMYL editorial standards.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            {vendorsSorted.map(v => (
              <Link
                key={v.slug}
                href={`/vendors/${v.slug}`}
                className="block rounded-xl border border-zinc-800 bg-zinc-900/30 hover:border-violet-500/40 hover:bg-violet-500/5 p-5 transition-all group"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono text-violet-400 uppercase tracking-wider">{v.badge}</span>
                  <span className="text-sm font-bold text-amber-400">{v.criteria.total}/{v.criteria.max}</span>
                </div>
                <h3 className="font-bold text-zinc-100 group-hover:text-white mb-1">{v.name}</h3>
                <p className="text-xs text-zinc-500 mb-3">
                  {v.discountPercent ? `${v.discountPercent}% code${v.discountStackable ? ' (stackable)' : ''}` : 'No code'} · {v.catalogSize}
                </p>
                <FounderOwnershipDisclosure vendorSlug={v.slug} variant="inline" />
                <span className="text-xs font-semibold text-violet-400 flex items-center gap-1">
                  Read full review <ArrowRight className="w-3 h-3" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          4. METHODOLOGY — "How We Rank Vendors" (E-E-A-T signal)
          ═══════════════════════════════════════════════════════════════════ */}
      <section className="vn-extra-section" id="how-we-rank" aria-labelledby="methodology-heading">
        <div className="vn-container">
          <div className="vn-section-label">§ Our Methodology</div>
          <h2 className="vn-extra-title" id="methodology-heading">
            How We <em>Rank</em> Peptide Vendors
          </h2>
          <p className="vmeth-intro">
            Every vendor is scored out of 100 on the criteria below. The inputs are each
            vendor&apos;s own published information (COA policy, testing methods, shipping,
            payment and return terms) and the list prices we have checked. PeptiDex does
            not test products. Commission and ownership are not criteria.
          </p>

          <div className="vmeth-grid">
            {RANKING_CRITERIA.map(c => (
              <div className="vmeth-card" key={c.key}>
                <h3>{c.label} ({c.max} pts)</h3>
                <p>{c.rule}</p>
              </div>
            ))}
          </div>

          <div style={{ overflowX: 'auto', marginTop: '2rem' }}>
            <table className="vct-table" data-criteria-scores>
              <thead>
                <tr className="vct-head-row">
                  <th className="vct-th">Rank</th>
                  <th className="vct-th">Vendor</th>
                  {RANKING_CRITERIA.map(c => (
                    <th className="vct-th" key={c.key}>{c.label} /{c.max}</th>
                  ))}
                  <th className="vct-th">Total /100</th>
                </tr>
              </thead>
              <tbody>
                {vendorsSorted.map((v, i) => (
                  <tr className="vct-row" key={v.slug}>
                    <td className="vct-td">#{i + 1}</td>
                    <td className="vct-td">
                      {v.name}
                      {v.category === 'oral' && ' (oral)'}
                      <FounderOwnershipDisclosure vendorSlug={v.slug} variant="inline" />
                    </td>
                    {v.criteria.parts.map(part => (
                      <td className="vct-td" key={part.key} title={part.basis}>{part.points}</td>
                    ))}
                    <td className="vct-td"><strong>{v.criteria.total}</strong></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="vmeth-intro" data-ranking-order-rule style={{ marginTop: '0.75rem' }}>{RANKING_ORDER_RULE}</p>

          <ShippingInputsTable vendors={vendorsSorted} />

          <div className="vmeth-note">
            <AlertTriangle size={14} />
            <span>
              <strong>Affiliate disclosure:</strong> {RANKING_DISCLOSURE}{' '}
              <Link href="/about/methodology#vendor-ranking">Full methodology →</Link>
            </span>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          5. BUYER'S GUIDE — ~600 words, internal links to /tools/coa + /library
          ═══════════════════════════════════════════════════════════════════ */}
      <section className="vn-extra-section" id="buyers-guide" aria-labelledby="buyers-guide-heading">
        <div className="vn-container">
          <div className="vn-section-label">§ Buyer's Guide</div>
          <h2 className="vn-extra-title" id="buyers-guide-heading">
            What to Look For When <em>Buying Peptides</em>
          </h2>

          <div className="vbg-content">

            <div className="vbg-section">
              <h3 className="vbg-h3">
                <ShieldCheck size={18} /> Always Start with the COA
              </h3>
              <p>
                A Certificate of Analysis is the single most important document in any
                peptide purchase. Before placing an order, verify that the vendor provides
                a <em>batch-specific</em> COA — tied to the exact lot number that will be
                in your shipment. A generic COA covering an entire production run is a red
                flag. Use our free{' '}
                <Link href="/tools/coa" className="vbg-link">COA Analyzer tool</Link>{' '}
                to validate any COA you receive against known molecular weight references.
              </p>
            </div>

            <div className="vbg-section">
              <h3 className="vbg-h3">
                <Microscope size={18} /> Understand the Testing Methods
              </h3>
              <p>
                <strong>HPLC (High-Performance Liquid Chromatography)</strong> measures
                purity percentage by separating the peptide compound from impurities.
                A result of ≥98% is the research minimum; ≥99% is the gold standard.
              </p>
              <p>
                <strong>LC-MS (Liquid Chromatography–Mass Spectrometry)</strong> goes
                further by confirming the molecular identity of the compound — verifying
                that what's in the vial matches the labeled peptide sequence at the
                molecular weight level. This is the most rigorous standard and should be
                required for any extended research protocol.
              </p>
              <p>
                <strong>Endotoxin/LAL screening</strong> tests for bacterial
                lipopolysaccharides that can contaminate improperly synthesized batches.
                While less commonly offered, it significantly reduces risk in injectable
                research contexts.
              </p>
              <p>
                You can browse{' '}
                <Link href="/library" className="vbg-link">our peptide research library</Link>{' '}
                to find compound-specific purity benchmarks and what each testing method
                verifies for the peptide you're researching.
              </p>
            </div>

            <div className="vbg-section">
              <h3 className="vbg-h3">
                <Truck size={18} /> Shipping and Cold-Chain Handling
              </h3>
              <p>
                Most peptides are stable at room temperature when lyophilized (freeze-dried)
                for short transit durations. However, some liquid formulations require
                refrigeration. Verify with your chosen vendor whether
                your specific compound ships with cold packs and whether the estimated
                transit time is within the stability window for that formulation. Stated
                dispatch times range from same day to 3–5 business days of processing — see
                each vendor&apos;s shipping terms in the table above.
              </p>
            </div>

            <div className="vbg-section">
              <h3 className="vbg-h3">
                <CreditCard size={18} /> Payment Methods and Red Flags
              </h3>
              <p>
                Research peptide vendors frequently operate outside standard payment
                processors due to category restrictions. Crypto payments (Bitcoin, USDC)
                and ACH/Zelle are common and not inherently suspicious. However, be cautious
                of vendors that <em>only</em> accept irreversible payment methods with no
                chargeback path, offer no return policy, or lack verifiable business
                registration. All vendors in this index provide at least one major credit
                card option or a documented dispute resolution process.
              </p>
            </div>

            <div className="vbg-section">
              <h3 className="vbg-h3">
                <BookOpen size={18} /> Legal Status and Research-Only Use
              </h3>
              <p>
                Research peptides are sold exclusively for laboratory and scientific
                research purposes. They are not approved by the FDA for human consumption,
                and purchasing them for personal use outside a research context may violate
                federal or local regulations. The legal status varies by country —
                particularly in Canada, the UK, and Australia, where import and
                possession rules differ significantly from the US. Always verify local
                regulations before ordering and consult a licensed practitioner for any
                therapeutic application.
              </p>
              <p>
                FDA-approved peptides (e.g. Tesamorelin, PT-141)
                require a valid prescription and must be obtained from a licensed pharmacy.
                See{' '}
                <Link href="/library" className="vbg-link">our library</Link>{' '}
                for the legal status of each compound.
              </p>
            </div>

            {/* Internal tool callout */}
            <Link href="/tools/pricing" className="vn-tool-callout" aria-label="Open price comparison tool">
              <div className="vn-tool-callout-icon"><BarChart3 /></div>
              <div className="vn-tool-callout-text">
                <span className="vn-tool-callout-label">Price Comparison Tool</span>
                <span className="vn-tool-callout-desc">
                  Compare live cross-vendor pricing for BPC-157, TB-500, Ipamorelin, and
                  20+ other peptides — cost per vial, per mg, with PEPTIDEX discounts
                  applied →
                </span>
              </div>
            </Link>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          6. FAQ
          ═══════════════════════════════════════════════════════════════════ */}
      <div className="vn-container">
        <VendorsFAQ faqs={VENDORS_FAQ_ITEMS} />
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          FOOTER DISCLAIMER
          ═══════════════════════════════════════════════════════════════════ */}
      <div className="vn-container" style={{ marginBottom: '4rem' }}>
        <InlineDisclaimer type="affiliate" />
      </div>

    </>
  );
}
