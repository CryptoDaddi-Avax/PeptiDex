'use client';

import Link from 'next/link';
import {
  ShieldAlert, CheckCircle2, ArrowRight, ExternalLink,
  Star, FlaskConical, AlertTriangle, Clock, BarChart3, Beaker,
} from 'lucide-react';
import { COABadge } from '@/components/coa-badge-modal';
import { SHORT_DISCLAIMER } from '@/data/constants';
import { vendorProfiles } from '@/data/vendor-comparison';
import { ResearchContextSidebar } from '@/components/research-context-sidebar';
import { VendorOutboundLink } from './vendor-outbound-link';
import RedesignLayout from '@/components/redesign/RedesignLayout';
import './vendors-redesign.css';

/* ── FAQ data (shared with JSON-LD in page.tsx) ── */
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

/* ── Stars helper ── */
function Stars({ count, score }: { count: number; score: string }) {
  return (
    <div className="vendor-stars">
      {Array.from({ length: count }, (_, i) => (
        <Star key={i} />
      ))}
      <span className="vendor-stars-score">{score}</span>
    </div>
  );
}

/* ═══════════════════════════════════════════════
 *  Main Component
 * ═══════════════════════════════════════════════ */

export default function VendorsClient() {
  return (
    <RedesignLayout>
      <div className="vendors-wrap">

        {/* ═══ DISCLAIMER ═══ */}
        <div className="vendors-disclaimer">
          <ShieldAlert />
          <p>
            <strong>RESEARCH &amp; EDUCATIONAL USE ONLY:</strong> {SHORT_DISCLAIMER}{' '}
            The vendors listed below operate as raw chemical and laboratory supply companies.
            Their products are not FDA-approved for human or animal consumption.
          </p>
        </div>

        {/* ═══ HERO ═══ */}
        <section className="vendors-hero">
          <div className="vendors-updated-badge">
            <Clock />
            <span>Last Updated: April 2026</span>
          </div>
          <h1 className="vendors-title">
            Best Peptide Vendors 2026,<br />
            <em>Lab-Tested Research Sources</em>
          </h1>
          <p className="vendors-subtitle">
            Finding the <strong>best peptide vendor 2026</strong> requires more than
            just searching for low prices; it requires verifying strict{' '}
            <strong>COA testing</strong> protocols. Our comprehensive review compares
            the most <strong>trusted peptide sources</strong>, analyzing independent
            mass spectrometry reports, shipping reliability, and customer service.
          </p>

          <div className="vendors-stats">
            <div className="vendors-stat">
              <BarChart3 />
              <div>
                <div className="vendors-stat-label">Best Value</div>
                <div className="vendors-stat-value">Amino Club</div>
              </div>
            </div>
            <div className="vendors-stat">
              <ArrowRight />
              <div>
                <div className="vendors-stat-label">Fastest Shipping</div>
                <div className="vendors-stat-value">2-4 Business Days</div>
              </div>
            </div>
            <div className="vendors-stat">
              <Beaker />
              <div>
                <div className="vendors-stat-label">Highest Purity</div>
                <div className="vendors-stat-value">99%+ HPLC Verified</div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ COMPARISON TABLE ═══ */}
        <section className="vendors-table-section">
          <div className="vendors-table-wrap">
            <div className="vendors-table-scroll">
              <table className="vendors-table">
                <thead>
                  <tr>
                    <th>Vendor Name</th>
                    <th>Peptides Offered</th>
                    <th>COA Verified</th>
                    <th>Pricing</th>
                    <th>Our Rating</th>
                    <th style={{ textAlign: 'right' }}>Link</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Amino Club */}
                  <tr className="vendor-row-featured">
                    <td>
                      <div className="vendor-name-cell">
                        <span className="vendor-name">Amino Club</span>
                        <span className="vendor-badge-ec">Editor&apos;s Choice</span>
                      </div>
                    </td>
                    <td>40+ Compounds</td>
                    <td>
                      <COABadge
                        vendorName={vendorProfiles['amino-club'].name}
                        coaUrl={vendorProfiles['amino-club'].coaUrl}
                        lastTestedDate={vendorProfiles['amino-club'].lastTestedDate}
                        testingMethods={vendorProfiles['amino-club'].testingMethods}
                        purity={vendorProfiles['amino-club'].purity}
                      />
                    </td>
                    <td>$$</td>
                    <td><Stars count={5} score="4.9/5" /></td>
                    <td style={{ textAlign: 'right' }}>
                      <VendorOutboundLink href="https://aminoclub.com?utm_source=affiliate_marketing&code=PEPTIDEX" vendorName="Amino Club" location="comparison_table" className="vendor-visit-btn vendor-visit-primary">
                        Visit <ExternalLink />
                      </VendorOutboundLink>
                    </td>
                  </tr>

                  {/* Ascension Peptides */}
                  <tr>
                    <td><span className="vendor-name">Ascension Peptides</span></td>
                    <td>60+ Compounds</td>
                    <td>
                      <COABadge
                        vendorName={vendorProfiles['ascension-peptides'].name}
                        coaUrl={vendorProfiles['ascension-peptides'].coaUrl}
                        lastTestedDate={vendorProfiles['ascension-peptides'].lastTestedDate}
                        testingMethods={vendorProfiles['ascension-peptides'].testingMethods}
                        purity={vendorProfiles['ascension-peptides'].purity}
                      />
                    </td>
                    <td>$$$</td>
                    <td><Stars count={5} score="4.7/5" /></td>
                    <td style={{ textAlign: 'right' }}>
                      <VendorOutboundLink href="https://ascensionpeptides.com/ref/PeptiDex/" vendorName="Ascension Peptides" location="comparison_table" className="vendor-visit-btn vendor-visit-secondary">
                        Visit <ExternalLink />
                      </VendorOutboundLink>
                    </td>
                  </tr>

                  {/* Limitless Life */}
                  <tr>
                    <td>
                      <div className="vendor-name-cell">
                        <span className="vendor-name">Limitless Life</span>
                        <span className="vendor-badge-usa">USA Made</span>
                      </div>
                    </td>
                    <td>90+ Compounds</td>
                    <td>
                      <COABadge
                        vendorName={vendorProfiles['limitless-life'].name}
                        lastTestedDate={vendorProfiles['limitless-life'].lastTestedDate}
                        testingMethods={vendorProfiles['limitless-life'].testingMethods}
                        purity={vendorProfiles['limitless-life'].purity}
                      />
                    </td>
                    <td>$$</td>
                    <td><Stars count={5} score="4.8/5" /></td>
                    <td style={{ textAlign: 'right' }}>
                      <VendorOutboundLink href="https://www.kb6dp3dq.com/PEPTIDEX/" vendorName="Limitless Life" location="comparison_table" className="vendor-visit-btn vendor-visit-secondary">
                        Visit <ExternalLink />
                      </VendorOutboundLink>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ═══ DETAILED REVIEW CARDS ═══ */}
        <h2 className="vendors-reviews-heading">Detailed Lab-Tested Research Sources Reviews</h2>

        {/* Amino Club */}
        <div className="vendor-review-card featured">
          <h3 className="vendor-review-name">
            Amino Club
            <span className="vendor-badge-ec">Editor&apos;s Choice</span>
            <COABadge
              vendorName={vendorProfiles['amino-club'].name}
              coaUrl={vendorProfiles['amino-club'].coaUrl}
              lastTestedDate={vendorProfiles['amino-club'].lastTestedDate}
              testingMethods={vendorProfiles['amino-club'].testingMethods}
              purity={vendorProfiles['amino-club'].purity}
            />
          </h3>
          <p className="vendor-review-desc">
            Amino Club has earned our #1 recommendation for 2026 through a consistent
            track record of verified purity, transparent batch-specific COA
            documentation, and reliable US fulfillment. Their catalog covers 40+ of
            the most in-demand research compounds — all backed by independent
            third-party HPLC and mass spectrometry testing. Competitive pricing,
            typically 15-30% below premium-tier competitors, makes them the best
            overall value in the market.
          </p>
          <div className="vendor-pros-cons">
            <div>
              <span className="vendor-pros-label">Pros</span>
              <ul className="vendor-pro-list">
                <li className="vendor-pro-item"><CheckCircle2 /> Batch-specific third-party COAs on every product</li>
                <li className="vendor-pro-item"><CheckCircle2 /> Consistently ≥99% HPLC purity</li>
                <li className="vendor-pro-item"><CheckCircle2 /> Competitive pricing (15-30% below premium tier)</li>
                <li className="vendor-pro-item"><CheckCircle2 /> Fast domestic US shipping (2-4 business days)</li>
                <li className="vendor-pro-item"><CheckCircle2 /> Top-rated across independent research forums</li>
              </ul>
            </div>
            <div>
              <span className="vendor-cons-label">Cons</span>
              <ul className="vendor-con-list">
                <li className="vendor-con-item"><AlertTriangle /> Catalog still growing (40+ vs 60+ for legacy competitors)</li>
                <li className="vendor-con-item"><AlertTriangle /> International shipping available but US is primary strength</li>
              </ul>
            </div>
          </div>
          <VendorOutboundLink href="https://aminoclub.com?utm_source=affiliate_marketing&code=PEPTIDEX" vendorName="Amino Club" location="vendor_card_amino_club" className="vendor-cta-primary">
            Compare Prices at Amino Club <ArrowRight />
          </VendorOutboundLink>
          <VendorOutboundLink href={vendorProfiles['amino-club']?.coaUrl || '#'} vendorName="Amino Club" location="vendor_card_amino_club_coa" className="vendor-cta-secondary">
            <Beaker /> View Lab Test Results (COA)
          </VendorOutboundLink>
        </div>

        {/* Ascension Peptides */}
        <div className="vendor-review-card">
          <h3 className="vendor-review-name">
            Ascension Peptides
            <COABadge
              vendorName={vendorProfiles['ascension-peptides'].name}
              coaUrl={vendorProfiles['ascension-peptides'].coaUrl}
              lastTestedDate={vendorProfiles['ascension-peptides'].lastTestedDate}
              testingMethods={vendorProfiles['ascension-peptides'].testingMethods}
              purity={vendorProfiles['ascension-peptides'].purity}
            />
          </h3>
          <p className="vendor-review-desc">
            Ascension Peptides has established itself as a premier destination for
            research-grade peptides, offering an extensive catalogue of 60+ verified
            compounds backed by rigorous third-party COA documentation. The premium
            pricing is the main trade-off — they position themselves at the top tier,
            which is justified by catalog breadth.
          </p>
          <div className="vendor-pros-cons">
            <div>
              <span className="vendor-pros-label">Pros</span>
              <ul className="vendor-pro-list">
                <li className="vendor-pro-item"><CheckCircle2 /> Largest peptide catalog (60+ compounds)</li>
                <li className="vendor-pro-item"><CheckCircle2 /> Third-party COA verified</li>
                <li className="vendor-pro-item"><CheckCircle2 /> Fast US shipping</li>
                <li className="vendor-pro-item"><CheckCircle2 /> Strong researcher reputation</li>
              </ul>
            </div>
            <div>
              <span className="vendor-cons-label">Cons</span>
              <ul className="vendor-con-list">
                <li className="vendor-con-item"><AlertTriangle /> Premium pricing tier</li>
              </ul>
            </div>
          </div>
          <VendorOutboundLink href="https://ascensionpeptides.com/ref/PeptiDex/" vendorName="Ascension Peptides" location="vendor_card_ascension" className="vendor-cta-primary">
            Compare Prices at Ascension <ArrowRight />
          </VendorOutboundLink>
          {vendorProfiles['ascension-peptides']?.coaUrl && (
            <VendorOutboundLink href={vendorProfiles['ascension-peptides'].coaUrl} vendorName="Ascension Peptides" location="vendor_card_ascension_coa" className="vendor-cta-secondary">
              <Beaker /> View Lab Test Results (COA)
            </VendorOutboundLink>
          )}
        </div>

        {/* Limitless Life */}
        <div className="vendor-review-card">
          <h3 className="vendor-review-name">
            Limitless Life
            <span className="vendor-badge-usa">USA Made</span>
            <COABadge
              vendorName={vendorProfiles['limitless-life'].name}
              lastTestedDate={vendorProfiles['limitless-life'].lastTestedDate}
              testingMethods={vendorProfiles['limitless-life'].testingMethods}
              purity={vendorProfiles['limitless-life'].purity}
            />
          </h3>
          <p className="vendor-review-desc">
            Limitless Life (Limitless Biotech) stands out as one of the few vendors
            offering <strong>100% USA-manufactured</strong> research peptides under
            full GMP protocols. With 90+ compounds — including peptide capsules,
            blends, bioregulators, and sprays — their catalog breadth rivals the best
            in the industry. Every batch is independently tested via HPLC, LC-MS, and
            endotoxin screens before release. Use code{' '}
            <strong style={{ color: 'var(--green)' }}>PEPTIDEX</strong> for 15% off
            your order.
          </p>
          <div className="vendor-pros-cons">
            <div>
              <span className="vendor-pros-label">Pros</span>
              <ul className="vendor-pro-list">
                <li className="vendor-pro-item"><CheckCircle2 /> 100% USA-manufactured under GMP standards</li>
                <li className="vendor-pro-item"><CheckCircle2 /> Largest catalog: 90+ compounds (capsules, blends, bioregulators)</li>
                <li className="vendor-pro-item"><CheckCircle2 /> HPLC + LC-MS + Endotoxin testing on every batch</li>
                <li className="vendor-pro-item"><CheckCircle2 /> Batch-specific COA with every order</li>
                <li className="vendor-pro-item"><CheckCircle2 /> 15% discount with code PEPTIDEX</li>
              </ul>
            </div>
            <div>
              <span className="vendor-cons-label">Cons</span>
              <ul className="vendor-con-list">
                <li className="vendor-con-item"><AlertTriangle /> US domestic shipping only</li>
                <li className="vendor-con-item"><AlertTriangle /> 3–5 business day dispatch</li>
              </ul>
            </div>
          </div>
          <VendorOutboundLink href="https://www.kb6dp3dq.com/PEPTIDEX/" vendorName="Limitless Life" location="vendor_card_limitless_life" className="vendor-cta-primary">
            Shop Limitless Life (Code: PEPTIDEX) <ArrowRight />
          </VendorOutboundLink>
        </div>

        {/* ═══ HOW WE VET ═══ */}
        <section className="vendors-vetting">
          <h2 className="vendors-vetting-title">How We Vet Peptide Vendors</h2>
          <div className="vendors-vetting-grid">
            <div className="vendors-vetting-item">
              <div className="vendors-vetting-item-icon"><FlaskConical /></div>
              <h3>Independent COA &amp; HPLC</h3>
              <p>
                We mandate that vendors supply verifiable High-Performance Liquid
                Chromatography (HPLC) and Mass Spectrometry documentation from a
                recognized third-party analytical laboratory proving purity higher
                than 99%.
              </p>
            </div>
            <div className="vendors-vetting-item">
              <div className="vendors-vetting-item-icon"><ShieldAlert /></div>
              <h3>Secure Payment Options</h3>
              <p>
                Due to high-risk processing status, legitimate chemical suppliers
                often use alternative gateways. We review their payment security
                infrastructure, favoring companies accepting major credit cards and
                verified crypto portals securely.
              </p>
            </div>
            <div className="vendors-vetting-item">
              <div className="vendors-vetting-item-icon"><CheckCircle2 /></div>
              <h3>Shipping &amp; Fulfillment</h3>
              <p>
                We evaluate domestic dispatch speeds to ensure biologically sensitive
                compounds are not subjected to prolonged transit temperatures. Vendors
                must guarantee swift fulfillment and provide responsive customer support.
              </p>
            </div>
          </div>
        </section>

        {/* ═══ FAQ ═══ */}
        <section className="vendors-faq">
          <h2 className="vendors-faq-title">Frequently Asked Sourcing Questions</h2>
          {FAQ_ITEMS.map((item, i) => (
            <div key={i} className="vendors-faq-item">
              <h3>{item.q}</h3>
              <p>{item.a}</p>
            </div>
          ))}
        </section>

        {/* Research Context Sidebar */}
        <ResearchContextSidebar />

        {/* ═══ FOOTER ═══ */}
        <div className="vendors-footer-links">
          <span className="vendors-footer-label">Explore Research:</span>
          <Link href="/peptides/bpc-157" className="vendors-footer-link">BPC-157 Research</Link>
          <span className="vendors-footer-sep">|</span>
          <Link href="/peptides/tb-500" className="vendors-footer-link">TB-500 Protocols</Link>
          <span className="vendors-footer-sep">|</span>
          <Link href="/stacks/injury-recovery" className="vendors-footer-link">Healing Stacks</Link>
        </div>

        <div className="vendors-disclosure-box">
          <p>
            <strong>AFFILIATE DISCLOSURE:</strong> PeptiDex is a reader-supported
            independent research hub. When you purchase through links on our site,
            we may earn an affiliate commission. This helps maintain our database
            and fund ongoing research operations without impacting our unbiased
            vetting process.
          </p>
          <p>
            <strong>LABORATORY RESEARCH WARNING:</strong> The vendors endorsed on
            this page strictly sell raw analytical chemicals intended for licensed
            professionals and independent laboratory research only. These products
            are NOT FDA-approved for human diagnostics, treatment, or dietary
            supplementation.
          </p>
        </div>

      </div>
    </RedesignLayout>
  );
}
