'use client';

import Link from 'next/link';
import {
  ShieldAlert, CheckCircle2, ArrowRight, ExternalLink,
  Star, FlaskConical, AlertTriangle, Clock, BarChart3, Beaker,
} from 'lucide-react';
import { SHORT_DISCLAIMER } from '@/data/constants';
import { vendorProfiles } from '@/data/vendor-comparison';
import { vendorPricing } from '@/data/vendor-pricing';
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
    q: 'Where can I buy research peptides?',
    a: 'You can buy research peptides from specialized online synthesis laboratories. The most reliable suppliers prioritize third-party COA testing and verify amino acid sequence purity. Always ensure you are purchasing for laboratory research use only.',
  },
  {
    q: 'What is a COA and why does it matter?',
    a: 'A COA stands for Certificate of Analysis. It is a laboratory report (typically utilizing HPLC and Mass Spectrometry) that verifies the exact purity percentage and molecular weight of a synthesized peptide batch. It matters because it is the only objective proof that a product is pure and free of synthesis byproducts.',
  },
  {
    q: 'Are peptide vendors legitimate?',
    a: 'Yes, legitimate peptide vendors operate as chemical supply companies synthesizing compounds strictly for academic, preclinical, and independent laboratory research. However, the market is largely unregulated, which is why verifying independent purity testing is critical before purchasing.',
  },
  {
    q: 'What is the best peptide company in 2026?',
    a: 'The best peptide company in 2026 depends on your specific research needs, but top-tier vendors consistently provide batch-specific COAs, offer a wide variety of compounds (from BPC-157 to TB-500), maintain domestic shipping infrastructure, and accept secure payments.',
  },
];

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
            <div className="vn-meta-item"><strong>3</strong> verified vendors</div>
            <div className="vn-meta-item"><strong>HPLC</strong> + Mass Spec required</div>
            <div className="vn-meta-item"><strong>Independent</strong> verification</div>
          </div>
        </div>
      </header>

      {/* ═══ VENDORS LIST ═══ */}
      <div className="vn-container">
        <div className="vn-vendor-list reveal">
          
          {/* Amino Club */}
          <div className="vn-vendor-card featured" id="amino-club">
            <div className="vn-vendor-grid">
              <div>
                <div className="vn-vendor-rank"><span>01</span>Ranked source</div>
                <div className="vn-vendor-badges">
                  <span className="vn-tag solid-gold">Editor&apos;s Choice</span>
                  <span className="vn-tag green">✓ COA Verified</span>
                </div>
                <h2 className="vn-vendor-name">Amino Club</h2>
                
                <div className="vn-vendor-rating-row">
                  <div>
                    <div className="vn-rating-stars">★ 4.9<em>/5</em></div>
                    <div className="vn-review-count">400+ reviews</div>
                  </div>
                  <div className="vn-purity-large">
                    <div className="vn-purity-num">99%+</div>
                    <div className="vn-purity-label">Purity verified</div>
                  </div>
                </div>
                
                {/* Price preview strip */}
                {vendorPricePreview('Amino Club') && (
                  <div className="vn-price-preview">
                    {vendorPricePreview('Amino Club')}
                  </div>
                )}

                <div className="vn-vendor-actions">
                  <VendorOutboundLink 
                    href="https://aminoclub.com?utm_source=affiliate_marketing&code=PEPTIDEX" 
                    vendorName="Amino Club" 
                    location="vendor_card_amino_club" 
                    className="vn-btn-primary"
                  >
                    Shop Amino Club <ArrowRight size={14} />
                  </VendorOutboundLink>
                  <VendorOutboundLink 
                    href={vendorProfiles['amino-club']?.coaUrl || '#'} 
                    vendorName="Amino Club" 
                    location="vendor_card_amino_club_coa" 
                    className="vn-btn-ghost"
                  >
                    View sample COA
                  </VendorOutboundLink>
                </div>
                <div className="vn-disclosure">
                  PeptiDex may earn a commission from qualifying purchases at no cost to you. 
                  Our recommendations are based on independent verification, not commercial relationships.
                </div>
              </div>
              
              <div className="vn-vendor-specs">
                <div className="vn-spec-row"><div className="vn-spec-key">COA</div><div className="vn-spec-val"><span className="check">✓</span> Batch-specific COA</div></div>
                <div className="vn-spec-row"><div className="vn-spec-key">Testing</div><div className="vn-spec-val">HPLC, Mass Spec, Endotoxin</div></div>
                <div className="vn-spec-row"><div className="vn-spec-key">Shipping</div><div className="vn-spec-val">2–4 days (US)</div></div>
                <div className="vn-spec-row"><div className="vn-spec-key">Ships to</div><div className="vn-spec-val">USA, International</div></div>
                <div className="vn-spec-row"><div className="vn-spec-key">Catalog</div><div className="vn-spec-val">40+ compounds</div></div>
                <div className="vn-spec-row"><div className="vn-spec-key">Payment</div><div className="vn-spec-val">Card, Crypto, Zelle</div></div>
                <div className="vn-spec-row"><div className="vn-spec-key">Returns</div><div className="vn-spec-val">60-day money-back</div></div>
              </div>
            </div>
          </div>

          {/* Limitless Life */}
          <div className="vn-vendor-card featured" id="limitless-life">
            <div className="vn-vendor-grid">
              <div>
                <div className="vn-vendor-rank"><span>02</span>Ranked source</div>
                <div className="vn-vendor-badges">
                  <span className="vn-tag solid-gold">USA Made</span>
                  <span className="vn-tag green">✓ COA Verified</span>
                </div>
                <h2 className="vn-vendor-name">Limitless Life</h2>
                
                <div className="vn-vendor-rating-row">
                  <div>
                    <div className="vn-rating-stars">★ 4.8<em>/5</em></div>
                    <div className="vn-review-count">300+ reviews</div>
                  </div>
                  <div className="vn-purity-large">
                    <div className="vn-purity-num">99%+</div>
                    <div className="vn-purity-label">Purity verified</div>
                  </div>
                </div>
                
                {/* Price preview strip */}
                {vendorPricePreview('Limitless Life') && (
                  <div className="vn-price-preview">
                    {vendorPricePreview('Limitless Life')}
                  </div>
                )}

                <div className="vn-vendor-actions">
                  <VendorOutboundLink 
                    href="https://www.kb6dp3dq.com/PEPTIDEX/" 
                    vendorName="Limitless Life" 
                    location="vendor_card_limitless_life" 
                    className="vn-btn-primary"
                  >
                    Shop Limitless Life <ArrowRight size={14} />
                  </VendorOutboundLink>
                  <button className="vn-btn-ghost">View sample COA</button>
                </div>
                <div className="vn-disclosure">
                  PeptiDex may earn a commission from qualifying purchases at no cost to you. 
                  Our recommendations are based on independent verification, not commercial relationships.
                </div>
              </div>
              
              <div className="vn-vendor-specs">
                <div className="vn-spec-row"><div className="vn-spec-key">COA</div><div className="vn-spec-val"><span className="check">✓</span> Batch-specific COA</div></div>
                <div className="vn-spec-row"><div className="vn-spec-key">Testing</div><div className="vn-spec-val">HPLC, LC-MS, Endotoxin</div></div>
                <div className="vn-spec-row"><div className="vn-spec-key">Shipping</div><div className="vn-spec-val">3–5 days (US)</div></div>
                <div className="vn-spec-row"><div className="vn-spec-key">Ships to</div><div className="vn-spec-val">USA</div></div>
                <div className="vn-spec-row"><div className="vn-spec-key">Catalog</div><div className="vn-spec-val">90+ compounds</div></div>
                <div className="vn-spec-row"><div className="vn-spec-key">Payment</div><div className="vn-spec-val">Card, Crypto</div></div>
                <div className="vn-spec-row"><div className="vn-spec-key">Returns</div><div className="vn-spec-val">Satisfaction guarantee</div></div>
              </div>
            </div>
          </div>

          {/* Ascension Peptides */}
          <div className="vn-vendor-card featured" id="ascension">
            <div className="vn-vendor-grid">
              <div>
                <div className="vn-vendor-rank"><span>03</span>Ranked source</div>
                <div className="vn-vendor-badges">
                  <span className="vn-tag green">✓ COA Verified</span>
                </div>
                <h2 className="vn-vendor-name">Ascension Peptides</h2>
                
                <div className="vn-vendor-rating-row">
                  <div>
                    <div className="vn-rating-stars">★ 4.7<em>/5</em></div>
                    <div className="vn-review-count">250+ reviews</div>
                  </div>
                  <div className="vn-purity-large">
                    <div className="vn-purity-num">98%+</div>
                    <div className="vn-purity-label">Purity verified</div>
                  </div>
                </div>
                
                {/* Price preview strip */}
                {vendorPricePreview('Ascension Peptides') && (
                  <div className="vn-price-preview">
                    {vendorPricePreview('Ascension Peptides')}
                  </div>
                )}

                <div className="vn-vendor-actions">
                  <VendorOutboundLink 
                    href="https://ascensionpeptides.com/ref/PeptiDex/" 
                    vendorName="Ascension Peptides" 
                    location="vendor_card_ascension" 
                    className="vn-btn-primary"
                  >
                    Shop Ascension Peptides <ArrowRight size={14} />
                  </VendorOutboundLink>
                  <VendorOutboundLink 
                    href={vendorProfiles['ascension-peptides']?.coaUrl || '#'} 
                    vendorName="Ascension Peptides" 
                    location="vendor_card_ascension_coa" 
                    className="vn-btn-ghost"
                  >
                    View sample COA
                  </VendorOutboundLink>
                </div>
                <div className="vn-disclosure">
                  PeptiDex may earn a commission from qualifying purchases at no cost to you. 
                  Our recommendations are based on independent verification, not commercial relationships.
                </div>
              </div>
              
              <div className="vn-vendor-specs">
                <div className="vn-spec-row"><div className="vn-spec-key">COA</div><div className="vn-spec-val"><span className="check">✓</span> COA available</div></div>
                <div className="vn-spec-row"><div className="vn-spec-key">Testing</div><div className="vn-spec-val">HPLC, Mass Spec</div></div>
                <div className="vn-spec-row"><div className="vn-spec-key">Shipping</div><div className="vn-spec-val">3–5 days (US)</div></div>
                <div className="vn-spec-row"><div className="vn-spec-key">Ships to</div><div className="vn-spec-val">USA</div></div>
                <div className="vn-spec-row"><div className="vn-spec-key">Catalog</div><div className="vn-spec-val">60+ compounds</div></div>
                <div className="vn-spec-row"><div className="vn-spec-key">Payment</div><div className="vn-spec-val">Card, Crypto</div></div>
                <div className="vn-spec-row"><div className="vn-spec-key">Returns</div><div className="vn-spec-val">30-day return</div></div>
              </div>
            </div>
          </div>

        </div>
      </div>

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
              <p style={{ flex: 1 }}>Read our comprehensive 5,000-word analysis of Amino Club's operations, purity testing, and customer service.</p>
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
              <p style={{ flex: 1 }}>Learn how to read Amino Club's third-party HPLC and Mass Spectrometry testing documents.</p>
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
          
          <div className="vn-matrix-table">
            <div className="vn-matrix-row header">
              <div className="vn-matrix-cell"></div>
              <div className="vn-matrix-cell featured">Amino Club</div>
              <div className="vn-matrix-cell">Limitless Life</div>
              <div className="vn-matrix-cell">Ascension</div>
            </div>
            <div className="vn-matrix-row"><div className="vn-matrix-cell">Rating</div><div className="vn-matrix-cell">★ 4.9</div><div className="vn-matrix-cell">★ 4.8</div><div className="vn-matrix-cell">★ 4.7</div></div>
            <div className="vn-matrix-row"><div className="vn-matrix-cell">Purity</div><div className="vn-matrix-cell">99%+</div><div className="vn-matrix-cell">99%+</div><div className="vn-matrix-cell">98%+</div></div>
            <div className="vn-matrix-row"><div className="vn-matrix-cell">COA</div><div className="vn-matrix-cell">Batch-specific</div><div className="vn-matrix-cell">Batch-specific</div><div className="vn-matrix-cell">Available</div></div>
            <div className="vn-matrix-row"><div className="vn-matrix-cell">Testing</div><div className="vn-matrix-cell">HPLC, MS, Endotoxin</div><div className="vn-matrix-cell">HPLC, LC-MS, Endotoxin</div><div className="vn-matrix-cell">HPLC, MS</div></div>
            <div className="vn-matrix-row"><div className="vn-matrix-cell">Shipping</div><div className="vn-matrix-cell">2–4 days (US)</div><div className="vn-matrix-cell">3–5 days (US)</div><div className="vn-matrix-cell">3–5 days (US)</div></div>
            <div className="vn-matrix-row"><div className="vn-matrix-cell">International</div><div className="vn-matrix-cell">Yes</div><div className="vn-matrix-cell">No (US only)</div><div className="vn-matrix-cell">No (US only)</div></div>
            <div className="vn-matrix-row"><div className="vn-matrix-cell">Catalog Size</div><div className="vn-matrix-cell">40+</div><div className="vn-matrix-cell">90+</div><div className="vn-matrix-cell">60+</div></div>
            <div className="vn-matrix-row"><div className="vn-matrix-cell">Payment</div><div className="vn-matrix-cell">Card · Crypto · Zelle</div><div className="vn-matrix-cell">Card · Crypto</div><div className="vn-matrix-cell">Card · Crypto</div></div>
            <div className="vn-matrix-row"><div className="vn-matrix-cell">Returns</div><div className="vn-matrix-cell">60-day MBG</div><div className="vn-matrix-cell">Satisfaction</div><div className="vn-matrix-cell">30-day</div></div>
          </div>

          <div style={{ marginTop: '32px', fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--ink-mute)', letterSpacing: '0.05em' }}>
            Data verified as of 2026 Q2. Specifications subject to change.
          </div>
        </div>
      </section>

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
