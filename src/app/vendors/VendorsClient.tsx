'use client';

import Link from 'next/link';
import {
  ShieldAlert, CheckCircle2, ArrowRight, ExternalLink,
  Star, FlaskConical, AlertTriangle, Clock, BarChart3, Beaker, Sparkles,
} from 'lucide-react';
import { SHORT_DISCLAIMER } from '@/data/constants';
import { vendorProfiles } from '@/data/vendor-comparison';
import { vendorPricing } from '@/data/vendor-pricing';
import { vendors, injectableVendors, oralVendors, VENDOR_COUNT, type Vendor } from '@/data/vendors';
import { ResearchContextSidebar } from '@/components/research-context-sidebar';
import { VendorOutboundLink } from './vendor-outbound-link';
import RedesignLayout from '@/components/redesign/RedesignLayout';
import './vendors-redesign.css';

/* ── Price preview helper ───────────────────────────────────────────────────
 * Returns a string like "BPC-157 from $39.99 · TB-500 from $39.99"
 * for the 3 most popular peptides that this vendor carries.
 */
const PREVIEW_PEPTIDES = ['bpc-157', 'tb-500', 'ipamorelin'];

function vendorPricePreview(vendorName: string): string {
  const parts: string[] = [];
  for (const slug of PREVIEW_PEPTIDES) {
    const entry = vendorPricing.find((p) => p.slug === slug);
    if (!entry) continue;
    const row = entry.vendors.find((v) => v.vendor === vendorName && v.inStock);
    if (row) parts.push(`${entry.name} from $${row.price_usd}`);
  }
  return parts.join(' · ');
}

/* ── FAQ data ── */
const FAQ_ITEMS = [
  {
    q: "Where can I buy peptides legally?",
    a: "Research peptides can be purchased legally from specialized synthesis laboratories for laboratory use only. Top vendors include Amino Club, Limitless Life, and Ascension Peptides — all provide COA-verified, HPLC-tested compounds. FDA-approved peptides require a prescription. → Read more at peptidex.app/vendors"
  },
  {
    q: "What is a COA for peptides?",
    a: "A Certificate of Analysis (COA) is a lab report verifying peptide purity, typically using HPLC (High-Performance Liquid Chromatography) and Mass Spectrometry. A quality COA confirms >98% purity, correct molecular weight, and absence of endotoxins. Always verify COAs are batch-specific. → Read more at peptidex.app/tools/coa"
  },
  {
    q: "Are research peptides the same as pharmaceutical peptides?",
    a: "Research peptides and pharmaceutical peptides contain the same amino acid sequences, but they differ in regulatory status, manufacturing standards, and intended use. Pharmaceutical peptides (like Ozempic) undergo FDA approval with GMP manufacturing. Research peptides are synthesized for laboratory use and are not approved for human consumption. Quality varies by vendor — always verify with a COA. → Read more at peptidex.app/vendors"
  },
  {
    q: "Do peptides require a prescription?",
    a: "Only FDA-approved peptides require a prescription: Semaglutide (Ozempic/Wegovy), Tirzepatide (Mounjaro/Zepbound), Tesamorelin (Egrifta), and PT-141 (Vyleesi). All other peptides indexed on PeptiDex are research-only compounds sold for laboratory use. → Read more at peptidex.app/faq"
  },
  {
    q: "What is Bio Longevity Labs and why are they triple-tested?",
    a: "Bio Longevity Labs is a premium injectable peptide vendor that subjects every batch to three independent testing protocols: HPLC purity analysis, LC-MS molecular verification, and endotoxin screening. Their PEPTIDEX discount code stacks with any active sitewide sale for maximum savings. → Read more at peptidex.app/vendors/bio-longevity-labs-review"
  }
];

/* ── Badge style helper ── */
function getBadgeClass(vendor: Vendor): string {
  switch (vendor.badgeStyle) {
    case 'gold': return 'vn-tag solid-gold';
    case 'premium': return 'vn-tag solid-premium';
    case 'green': return 'vn-tag green';
    case 'blue': return 'vn-tag solid-blue';
    case 'orange': return 'vn-tag solid-orange';
    default: return 'vn-tag green';
  }
}

/* ── Vendor Card (data-driven) ── */
function VendorCard({ vendor, rank }: { vendor: Vendor; rank: number }) {
  const profile = vendorProfiles[vendor.slug];
  const isBLL = vendor.slug === 'bio-longevity-labs';
  const isFeatured = rank <= 2;

  return (
    <div 
      className={`vn-vendor-card ${isFeatured ? 'featured' : ''} ${isBLL ? 'premium-highlight' : ''}`} 
      id={vendor.slug}
    >
      <div className="vn-vendor-grid">
        <div>
          <div className="vn-vendor-rank"><span>{String(rank).padStart(2, '0')}</span>Ranked source</div>
          <div className="vn-vendor-badges">
            <span className={getBadgeClass(vendor)}>{vendor.badge}</span>
            <span className="vn-tag green">✓ COA Verified</span>
          </div>
          <h2 className="vn-vendor-name">{vendor.name}</h2>
          
          <div className="vn-vendor-rating-row">
            <div>
              <div className="vn-rating-stars">★ {vendor.rating}<em>/5</em></div>
              <div className="vn-review-count">{vendor.ratingCount} reviews</div>
            </div>
            <div className="vn-purity-large">
              <div className="vn-purity-num">{vendor.purity}</div>
              <div className="vn-purity-label">Purity verified</div>
            </div>
          </div>
          
          {/* Stackable discount callout for BLL */}
          {isBLL && vendor.discountStackable && (
            <div className="vn-discount-callout">
              <Sparkles size={14} />
              <span>
                Use code <strong>PEPTIDEX</strong> for {vendor.discountPercent}% off — 
                <em>stacks with any active sale</em> for up to 40%+ savings
              </span>
            </div>
          )}
          
          {/* Regular discount callout */}
          {!isBLL && vendor.discountCode && (
            <div className="vn-discount-callout simple">
              <span>Use code <strong>{vendor.discountCode}</strong> for {vendor.discountPercent}% off</span>
            </div>
          )}
          
          {/* Price preview strip */}
          {vendorPricePreview(vendor.name) && (
            <div className="vn-price-preview">
              {vendorPricePreview(vendor.name)}
            </div>
          )}

          <div className="vn-vendor-actions">
            <VendorOutboundLink 
              href={vendor.affiliateUrl} 
              vendorName={vendor.name} 
              location={`vendor_card_${vendor.slug.replace(/-/g, '_')}`} 
              className="vn-btn-primary"
            >
              Shop {vendor.name} <ArrowRight size={14} />
            </VendorOutboundLink>
            {profile?.coaUrl ? (
              <VendorOutboundLink 
                href={profile.coaUrl} 
                vendorName={vendor.name} 
                location={`vendor_card_${vendor.slug.replace(/-/g, '_')}_coa`} 
                className="vn-btn-ghost"
              >
                View sample COA
              </VendorOutboundLink>
            ) : (
              <button className="vn-btn-ghost">View sample COA</button>
            )}
          </div>
          <div className="vn-disclosure">
            PeptiDex may earn a commission from qualifying purchases at no cost to you. 
            Our recommendations are based on independent verification, not commercial relationships.
          </div>
        </div>
        
        <div className="vn-vendor-specs">
          <div className="vn-spec-row"><div className="vn-spec-key">COA</div><div className="vn-spec-val"><span className="check">✓</span> {vendor.coaStatus}</div></div>
          <div className="vn-spec-row"><div className="vn-spec-key">Testing</div><div className="vn-spec-val">{vendor.testingMethods.join(', ')}</div></div>
          <div className="vn-spec-row"><div className="vn-spec-key">Shipping</div><div className="vn-spec-val">{vendor.shippingSpeed}</div></div>
          <div className="vn-spec-row"><div className="vn-spec-key">Ships to</div><div className="vn-spec-val">{vendor.shipsTo.join(', ')}</div></div>
          <div className="vn-spec-row"><div className="vn-spec-key">Catalog</div><div className="vn-spec-val">{vendor.catalogSize}</div></div>
          <div className="vn-spec-row"><div className="vn-spec-key">Payment</div><div className="vn-spec-val">{vendor.paymentMethods.join(', ')}</div></div>
          <div className="vn-spec-row"><div className="vn-spec-key">Returns</div><div className="vn-spec-val">{vendor.returnPolicy}</div></div>
        </div>
      </div>
    </div>
  );
}

export default function VendorsClient() {
  return (
    <RedesignLayout>
      {/* ═══ HEADER ═══ */}
      <header className="vn-page-header">
        <div className="vn-header-grid" />
        <div className="vn-header-wrap">
          <nav className="vn-breadcrumb">
            <Link href="/">Home</Link>
            <span className="sep">/</span>
            <span className="current">Vendors</span>
          </nav>
          <div className="vn-section-label">§ Verified Sourcing</div>
          <h1 className="vn-page-title">
            COA-verified <em>vendors</em>.
          </h1>
          <p className="vn-subtitle">
            Every vendor in our index is independently verified with third-party Certificates of Analysis.
            We test purity via HPLC and Mass Spectrometry before any recommendation.
          </p>
          <div className="vn-page-meta">
            <div className="vn-meta-item"><strong>{VENDOR_COUNT}</strong> verified vendors</div>
            <div className="vn-meta-item"><strong>HPLC</strong> + Mass Spec required</div>
            <div className="vn-meta-item"><strong>Independent</strong> verification</div>
          </div>
        </div>
      </header>

      {/* ═══ INJECTABLE VENDORS ═══ */}
      <div className="vn-container">
        <div className="vn-vendor-list reveal">
          {injectableVendors.map((vendor, i) => (
            <VendorCard key={vendor.slug} vendor={vendor} rank={i + 1} />
          ))}
        </div>
      </div>

      {/* ═══ ORAL VENDORS SECTION ═══ */}
      {oralVendors.length > 0 && (
        <section className="vn-oral-section reveal">
          <div className="vn-container">
            <div className="vn-section-label">§ Oral Peptide Sources</div>
            <h2 className="vn-extra-title">Oral formulation <em>specialists</em>.</h2>
            <p className="vn-subtitle" style={{ maxWidth: '600px', marginBottom: '2rem', fontSize: '0.95rem' }}>
              Vendors specializing in oral peptide delivery — capsules, sublingual tablets, and nasal sprays.
            </p>
            <div className="vn-vendor-list">
              {oralVendors.map((vendor, i) => (
                <VendorCard key={vendor.slug} vendor={vendor} rank={injectableVendors.length + i + 1} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══ VENDOR DEEP DIVES ═══ */}
      <section className="vn-extra-section reveal" style={{ borderTop: 'none', paddingTop: 0 }}>
        <div className="vn-container">
          <div className="vn-section-label">§ Deep Dives</div>
          <h2 className="vn-extra-title">Amino Club Resources</h2>
          <p className="vn-subtitle" style={{ maxWidth: '600px', marginBottom: '2rem', fontSize: '0.95rem' }}>
            Looking for more information on our top-rated vendor? Read our comprehensive reviews, comparison guides, and verification reports.
          </p>
          <div className="vn-vetting-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
            <Link href="/vendors/amino-club-review" className="vn-vetting-card" style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', height: '100%' }}>
              <div className="vn-vetting-icon" style={{ color: 'var(--accent-1)' }}><Star size={24} /></div>
              <h3 style={{ color: 'var(--ink)' }}>Full 2026 Review</h3>
              <p style={{ flex: 1 }}>Read our comprehensive 5,000-word analysis of Amino Club&apos;s operations, purity testing, and customer service.</p>
              <span style={{ color: 'var(--accent-1)', fontSize: '0.85rem', fontWeight: 600, marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>Read review <ArrowRight size={14} /></span>
            </Link>
            <Link href="/vendors/amino-club-discount-code" className="vn-vetting-card" style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', height: '100%' }}>
              <div className="vn-vetting-icon" style={{ color: 'var(--accent-1)' }}><Star size={24} /></div>
              <h3 style={{ color: 'var(--ink)' }}>Verified Discount Code</h3>
              <p style={{ flex: 1 }}>Get 15% off your entire order with our exclusive, verified promo code for 2026.</p>
              <span style={{ color: 'var(--accent-1)', fontSize: '0.85rem', fontWeight: 600, marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>Get the code <ArrowRight size={14} /></span>
            </Link>
            <Link href="/vendors/amino-club-coa-verification" className="vn-vetting-card" style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', height: '100%' }}>
              <div className="vn-vetting-icon" style={{ color: 'var(--accent-1)' }}><FlaskConical size={24} /></div>
              <h3 style={{ color: 'var(--ink)' }}>COA Verification Guide</h3>
              <p style={{ flex: 1 }}>Learn how to read Amino Club&apos;s third-party HPLC and Mass Spectrometry testing documents.</p>
              <span style={{ color: 'var(--accent-1)', fontSize: '0.85rem', fontWeight: 600, marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>Read guide <ArrowRight size={14} /></span>
            </Link>
            <Link href="/vendors/is-amino-club-legit" className="vn-vetting-card" style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', height: '100%' }}>
              <div className="vn-vetting-icon" style={{ color: 'var(--accent-1)' }}><ShieldAlert size={24} /></div>
              <h3 style={{ color: 'var(--ink)' }}>Is Amino Club Legit?</h3>
              <p style={{ flex: 1 }}>Our independent verification report analyzing their business operations and Trustpilot reviews.</p>
              <span style={{ color: 'var(--accent-1)', fontSize: '0.85rem', fontWeight: 600, marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>Read report <ArrowRight size={14} /></span>
            </Link>
            <Link href="/vendors/amino-club-vs-limitless-life" className="vn-vetting-card" style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', height: '100%' }}>
              <div className="vn-vetting-icon" style={{ color: 'var(--accent-1)' }}><BarChart3 size={24} /></div>
              <h3 style={{ color: 'var(--ink)' }}>Amino Club vs Limitless</h3>
              <p style={{ flex: 1 }}>A head-to-head comparison of our top two vendors. Which one should you choose for your research?</p>
              <span style={{ color: 'var(--accent-1)', fontSize: '0.85rem', fontWeight: 600, marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>Compare <ArrowRight size={14} /></span>
            </Link>
            <Link href="/vendors/amino-club-faq" className="vn-vetting-card" style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', height: '100%' }}>
              <div className="vn-vetting-icon" style={{ color: 'var(--accent-1)' }}><Beaker size={24} /></div>
              <h3 style={{ color: 'var(--ink)' }}>Comprehensive FAQ</h3>
              <p style={{ flex: 1 }}>Answers to common questions regarding shipping times, international delivery, and payment methods.</p>
              <span style={{ color: 'var(--accent-1)', fontSize: '0.85rem', fontWeight: 600, marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>Read FAQ <ArrowRight size={14} /></span>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ MATRIX SECTION ═══ */}
      <section className="vn-matrix-section reveal">
        <div className="vn-container">
          <div className="vn-section-label">§ Side-by-Side Comparison</div>
          <h2 className="vn-matrix-title">The full <em>matrix</em>.</h2>
          
          <div className="vn-matrix-scroll">
            <div className="vn-matrix-table wide">
              <div className="vn-matrix-row header">
                <div className="vn-matrix-cell"></div>
                {injectableVendors.map((v) => (
                  <div key={v.slug} className={`vn-matrix-cell ${v.slug === 'amino-club' ? 'featured' : ''}`}>{v.name}</div>
                ))}
              </div>
              <div className="vn-matrix-row"><div className="vn-matrix-cell">Rating</div>{injectableVendors.map(v => <div key={v.slug} className="vn-matrix-cell">★ {v.rating}</div>)}</div>
              <div className="vn-matrix-row"><div className="vn-matrix-cell">Purity</div>{injectableVendors.map(v => <div key={v.slug} className="vn-matrix-cell">{v.purity}</div>)}</div>
              <div className="vn-matrix-row"><div className="vn-matrix-cell">COA</div>{injectableVendors.map(v => <div key={v.slug} className="vn-matrix-cell">{v.coaStatus.replace('Batch-specific COA', 'Batch-specific').replace('COA available', 'Available')}</div>)}</div>
              <div className="vn-matrix-row"><div className="vn-matrix-cell">Testing</div>{injectableVendors.map(v => <div key={v.slug} className="vn-matrix-cell">{v.testingMethods.join(', ')}</div>)}</div>
              <div className="vn-matrix-row"><div className="vn-matrix-cell">Shipping</div>{injectableVendors.map(v => <div key={v.slug} className="vn-matrix-cell">{v.shippingSpeed}</div>)}</div>
              <div className="vn-matrix-row"><div className="vn-matrix-cell">International</div>{injectableVendors.map(v => <div key={v.slug} className="vn-matrix-cell">{v.shipsTo.includes('International') ? 'Yes' : 'No (US only)'}</div>)}</div>
              <div className="vn-matrix-row"><div className="vn-matrix-cell">Catalog Size</div>{injectableVendors.map(v => <div key={v.slug} className="vn-matrix-cell">{v.catalogSize.replace(' compounds', '')}</div>)}</div>
              <div className="vn-matrix-row"><div className="vn-matrix-cell">Payment</div>{injectableVendors.map(v => <div key={v.slug} className="vn-matrix-cell">{v.paymentMethods.join(' · ')}</div>)}</div>
              <div className="vn-matrix-row"><div className="vn-matrix-cell">Returns</div>{injectableVendors.map(v => <div key={v.slug} className="vn-matrix-cell">{v.returnPolicy.replace(' guarantee', '').replace(' policy', '').replace('money-back', 'MBG')}</div>)}</div>
              <div className="vn-matrix-row"><div className="vn-matrix-cell">Discount</div>{injectableVendors.map(v => <div key={v.slug} className="vn-matrix-cell">{v.discountCode ? `${v.discountPercent}% off${v.discountStackable ? ' (stacks!)' : ''}` : '—'}</div>)}</div>
            </div>
          </div>

          <div style={{ marginTop: '32px', fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--ink-mute)', letterSpacing: '0.05em' }}>
            Data verified as of 2026 Q2. Specifications subject to change.
          </div>
        </div>
      </section>

      {/* ═══ TOOL CALLOUT ═══ */}
      <div className="vn-container">
        <Link href="/tools/pricing" className="vn-tool-callout">
          <div className="vn-tool-callout-icon"><BarChart3 /></div>
          <div className="vn-tool-callout-text">
            <span className="vn-tool-callout-label">Price Comparison Tool</span>
            <span className="vn-tool-callout-desc">See live cross-vendor pricing for all peptides — cost per vial, per dose, and exclusive PEPTIDEX discounts →</span>
          </div>
        </Link>
      </div>

      {/* ═══ HOW WE VET / FAQ (Preserved for SEO) ═══ */}
      <div className="vn-container">
        <section className="vn-extra-section">
          <div className="vn-section-label">§ Our Methodology</div>
          <h2 className="vn-extra-title">How We Vet Peptide Vendors</h2>
          <div className="vn-vetting-grid">
            <div className="vn-vetting-card">
              <div className="vn-vetting-icon"><FlaskConical size={32} /></div>
              <h3>Independent COA &amp; HPLC</h3>
              <p>We mandate verifiable HPLC and Mass Spectrometry documentation from a recognized third-party analytical laboratory proving purity higher than 99%.</p>
            </div>
            <div className="vn-vetting-card">
              <div className="vn-vetting-icon"><ShieldAlert size={32} /></div>
              <h3>Secure Payment Options</h3>
              <p>Legitimate chemical suppliers often use alternative gateways. We review their payment security infrastructure, favoring major credit cards and verified crypto portals securely.</p>
            </div>
            <div className="vn-vetting-card">
              <div className="vn-vetting-icon"><CheckCircle2 size={32} /></div>
              <h3>Shipping &amp; Fulfillment</h3>
              <p>We evaluate domestic dispatch speeds to ensure biologically sensitive compounds are not subjected to prolonged transit temperatures. Vendors must guarantee swift fulfillment.</p>
            </div>
          </div>
        </section>

        <section className="vn-extra-section" style={{ borderBottom: 'none' }}>
          <div className="vn-section-label">§ Knowledge Base</div>
          <h2 className="vn-extra-title">Frequently Asked Questions</h2>
          <div className="vn-faq-list">
            {FAQ_ITEMS.map((item, i) => (
              <div key={i} className="vn-faq-item">
                <h3>{item.q}</h3>
                <p>{item.a}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

    </RedesignLayout>
  );
}
