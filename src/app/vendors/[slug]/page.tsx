import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ShareBar } from '@/components/share-bar';
import { CiteThisPage } from '@/components/cite-page';
import { AuthorByline } from '@/components/shared/AuthorByline';
import { FeedbackModal } from '@/components/feedback-modal';
import { AffiliateLink } from '@/components/affiliate-link';
import type { AffiliateVendor } from '@/lib/ga4-events';
import { JsonLd } from '@/components/json-ld';
import { PurityHistory } from '@/components/lab-data/PurityHistory';
import { allVendorReviews } from '@/data/reviews';
import { vendorBySlug } from '@/data/vendors';
import { verificationBySlug, getTierLabel } from '@/data/verification-data';
import {
  Star, CheckCircle2, XCircle, Shield, FlaskConical,
  ArrowRight, Calendar, DollarSign, Truck, HelpCircle,
  Award, ExternalLink, BookOpen
} from 'lucide-react';
import './vendor-review.css';

// ── Static generation ────────────────────────────────────────────────
export function generateStaticParams() {
  return allVendorReviews.map((r) => ({ slug: r.slug }));
}

// ── Metadata ─────────────────────────────────────────────────────────
type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const review = allVendorReviews.find((r) => r.slug === slug);
  if (!review) return { title: 'Vendor Not Found' };

  const canonical = `https://peptidex.app/vendors/${slug}`;
  return {
    title: review.titleTag,
    description: review.metaDescription,
    alternates: { canonical },
    openGraph: {
      title: review.titleTag,
      description: review.metaDescription,
      url: canonical,
      type: 'article',
    },
  };
}

// ── Helpers ──────────────────────────────────────────────────────────
const CURRENT_YEAR = new Date().getFullYear();

function renderStars(rating: number) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  return (
    <span className="vr-stars">
      {Array.from({ length: full }, (_, i) => (
        <Star key={`f${i}`} className="w-5 h-5 fill-amber-400 text-amber-400" />
      ))}
      {half && <Star className="w-5 h-5 fill-amber-400/50 text-amber-400" />}
    </span>
  );
}

function tierBadgeClass(tier: string): string {
  if (tier === 'gold') return 'vr-tier-gold';
  if (tier === 'silver') return 'vr-tier-silver';
  if (tier === 'bronze') return 'vr-tier-bronze';
  return 'vr-tier-default';
}

// ── Page ─────────────────────────────────────────────────────────────
export default async function VendorReviewPage({ params }: Props) {
  const { slug } = await params;
  const review = allVendorReviews.find((r) => r.slug === slug);
  if (!review) notFound();

  const vendor = vendorBySlug[slug];
  const verification = verificationBySlug[slug];
  const canonical = `https://peptidex.app/vendors/${slug}`;

  // ── JSON-LD schemas ──
  const reviewSchema = {
    '@context': 'https://schema.org',
    '@type': 'Review',
    itemReviewed: {
      '@type': 'Organization',
      name: review.name,
      url: review.affiliateUrl.split('?')[0],
    },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: String(review.overallRating),
      bestRating: '5',
    },
    author: { '@type': 'Organization', name: 'PeptiDex Editorial' },
    publisher: {
      '@type': 'Organization',
      name: 'PeptiDex',
      logo: { '@type': 'ImageObject', url: 'https://peptidex.app/favicon.ico' },
    },
    datePublished: `${review.datePublished}T12:00:00Z`,
    dateModified: `${review.dateModified}T12:00:00Z`,
  };

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `${review.name} Research Peptides`,
    brand: { '@type': 'Brand', name: review.name },
    description: review.metaDescription,
    review: {
      '@type': 'Review',
      reviewRating: {
        '@type': 'Rating',
        ratingValue: String(review.overallRating),
        bestRating: '5',
      },
      author: { '@type': 'Organization', name: 'PeptiDex Editorial' },
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: String(review.overallRating),
      reviewCount: review.ratingCount.replace('+', ''),
      bestRating: '5',
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: review.faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://peptidex.app/' },
      { '@type': 'ListItem', position: 2, name: 'Vendors', item: 'https://peptidex.app/vendors' },
      { '@type': 'ListItem', position: 3, name: `${review.name} Review`, item: canonical },
    ],
  };

  const tier = vendor?.verificationTier || 'unverified';
  const tierLabel = getTierLabel(tier);

  return (
    <main id="main-content">
      {/* JSON-LD */}
      <JsonLd schema={reviewSchema} />
      <JsonLd schema={productSchema} />
      <JsonLd schema={faqSchema} />
      <JsonLd schema={breadcrumbSchema} />

      {/* ══════════ HEADER ══════════ */}
      <header className="page-header">
        <div className="page-header-grid" />
        <div className="page-header-wrap">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span className="sep">/</span>
            <Link href="/vendors">Vendors</Link>
            <span className="sep">/</span>
            <span className="current">{review.name}</span>
          </nav>
          <div className="section-label">§ Vendor Review</div>
          <h1 className="page-title">
            {review.name} Review ({CURRENT_YEAR})<br />
            <em>Pricing, COA &amp; Quality</em>
          </h1>
          <p className="page-subtitle">{review.metaDescription}</p>
          <div className="vr-header-meta">
            <div className="vr-meta-chip">
              <Calendar className="w-4 h-4" />
              <span>Updated {review.dateModified}</span>
            </div>
            <div className="vr-meta-dot" />
            <div className="vr-meta-chip">
              <FlaskConical className="w-4 h-4 text-amber-400" />
              <span className="text-amber-300 font-medium">Independent Analysis</span>
            </div>
          </div>
          <AuthorByline name="PeptiDex Editorial" variant="full" className="mb-6" />
          <div className="mt-4"><ShareBar title={review.titleTag} url={canonical} /></div>
        </div>
      </header>

      <div className="about-content reveal space-y-16">

        {/* ══════════ 1. SUMMARY CARD ══════════ */}
        <section id="summary" className="vr-summary-card">
          <div className="vr-summary-header">
            <div className="vr-score-block">
              <div className="vr-score-number">{review.overallRating}</div>
              <div className="vr-score-label">PeptiDex Score</div>
              {renderStars(review.overallRating)}
              <span className="vr-rating-count">{review.ratingCount} reviews</span>
            </div>
            <div className="vr-summary-stats">
              <div className="vr-stat">
                <span className="vr-stat-key">Verification</span>
                <span className={`vr-tier-badge ${tierBadgeClass(tier)}`}>{tierLabel}</span>
              </div>
              <div className="vr-stat">
                <span className="vr-stat-key">Purity</span>
                <span className="vr-stat-val vr-green">{review.purity}</span>
              </div>
              <div className="vr-stat">
                <span className="vr-stat-key">COA Type</span>
                <span className="vr-stat-val">{review.coaType}</span>
              </div>
              <div className="vr-stat">
                <span className="vr-stat-key">Ships From</span>
                <span className="vr-stat-val">{review.location}</span>
              </div>
              <div className="vr-stat">
                <span className="vr-stat-key">Ships To</span>
                <span className="vr-stat-val">{review.shipsTo.join(', ')}</span>
              </div>
              <div className="vr-stat">
                <span className="vr-stat-key">Catalog</span>
                <span className="vr-stat-val">{review.catalogSize}</span>
              </div>
            </div>
          </div>
          <div className="vr-summary-why">
            <h2 className="vr-summary-headline">{review.verdictHeadline}</h2>
            <p>{review.verdictBody}</p>
          </div>
        </section>

        {/* ══════════ 2. TL;DR ══════════ */}
        <section id="tldr">
          <div className="vr-section-head">
            <Award className="w-6 h-6 text-amber-400 flex-shrink-0" />
            <h2>TL;DR — Why {review.name}?</h2>
          </div>
          <ul className="vr-tldr-list">
            {review.scoreBreakdown.slice(0, 3).map((s, i) => (
              <li key={i} className="vr-tldr-item">
                <span className="vr-tldr-score">{s.score}</span>
                <div>
                  <strong>{s.category}</strong>
                  <span className="vr-tldr-note"> — {s.note}</span>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* ══════════ 3. PROS / CONS ══════════ */}
        <section id="pros-cons">
          <div className="vr-section-head">
            <CheckCircle2 className="w-6 h-6 text-emerald-400 flex-shrink-0" />
            <h2>Pros &amp; Cons</h2>
          </div>
          <div className="vr-proscons-grid">
            <div className="vr-proscons-col vr-pros">
              <h3 className="vr-proscons-label"><CheckCircle2 className="w-4 h-4" /> Pros</h3>
              {review.pros.map((p, i) => (
                <div key={i} className="vr-procon-item">
                  <strong>{p.point}</strong>
                  {p.detail && <p>{p.detail}</p>}
                </div>
              ))}
            </div>
            <div className="vr-proscons-col vr-cons">
              <h3 className="vr-proscons-label"><XCircle className="w-4 h-4" /> Cons</h3>
              {review.cons.map((c, i) => (
                <div key={i} className="vr-procon-item">
                  <strong>{c.point}</strong>
                  {c.detail && <p>{c.detail}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════ 4. COA VERIFICATION ══════════ */}
        <section id="coa">
          <div className="vr-section-head">
            <FlaskConical className="w-6 h-6 text-amber-400 flex-shrink-0" />
            <h2>COA Verification &amp; Purity</h2>
          </div>
          <p className="vr-body-text">{review.coaDescription}</p>

          <div className="vr-testing-grid">
            {review.testingMethods.map((method, i) => (
              <div key={i} className="vr-testing-card">
                <div className="vr-testing-num">§ {String(i + 1).padStart(2, '0')}</div>
                <h3>{method}</h3>
                <p>
                  {method === 'HPLC' && 'High-Performance Liquid Chromatography — separates the mixture to verify purity percentage and detect truncated sequences or synthesis impurities.'}
                  {method === 'Mass Spec' && 'Mass Spectrometry — confirms molecular weight and amino acid sequence integrity, ensuring the correct compound was synthesized.'}
                  {method === 'LC-MS' && 'Liquid Chromatography-Mass Spectrometry — combines separation with mass analysis for both purity and molecular identity in a single run.'}
                  {method === 'Endotoxin' && 'Endotoxin/LAL testing — screens for bacterial lipopolysaccharides that standard purity tests cannot detect.'}
                  {method === 'Karl Fischer' && 'Karl Fischer titration — measures residual water content to verify proper lyophilization.'}
                </p>
              </div>
            ))}
          </div>

          {/* MW/Purity data from verification registry */}
          {verification && verification.vendorCOAs.length > 0 && (
            <div className="vr-coa-table-wrap">
              <h3 className="vr-sub-heading">Verified COA Data</h3>
              <div className="vr-coa-table-scroll">
                <table className="vr-coa-table">
                  <thead>
                    <tr>
                      <th>Peptide</th>
                      <th>Batch</th>
                      <th>Purity</th>
                      <th>MW</th>
                      <th>Methods</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {verification.vendorCOAs.map((coa) => (
                      <tr key={coa.id}>
                        <td className="vr-coa-peptide">{coa.peptide}</td>
                        <td className="vr-coa-mono">{coa.batchId}</td>
                        <td className={`vr-coa-purity ${coa.purity >= 99 ? 'vr-green' : ''}`}>{coa.purity}%</td>
                        <td className="vr-coa-mono">{coa.molecularWeight || '—'}</td>
                        <td className="vr-coa-mono">{coa.methods.join(', ')}</td>
                        <td className="vr-coa-mono">{coa.testDate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {verification.independentTests.length > 0 && (
                <div className="vr-independent-badge">
                  <Shield className="w-4 h-4" />
                  <span>
                    Independent data: {verification.independentTests[0].source} —{' '}
                    {verification.independentTests[0].totalTests} tests,{' '}
                    {verification.independentTests[0].averagePurity}% avg purity,{' '}
                    Grade {verification.independentTests[0].vendorScore}
                  </span>
                </div>
              )}
            </div>
          )}

          {review.coaUrl && (
            <div className="vr-coa-link">
              <AffiliateLink
                href={review.coaUrl}
                vendor={(vendor?.gaKey || 'unknown') as AffiliateVendor | 'unknown'}
                peptide="all"
                source="vendor_review_coa"
                className="vr-btn-outline"
              >
                View Sample COA <ExternalLink className="w-4 h-4" />
              </AffiliateLink>
            </div>
          )}

          {/* Live purity history chart */}
          <PurityHistory vendorSlug={slug} vendorName={review.name} />
        </section>

        {/* ══════════ 5. PRICING BREAKDOWN ══════════ */}
        <section id="pricing">
          <div className="vr-section-head">
            <DollarSign className="w-6 h-6 text-emerald-400 flex-shrink-0" />
            <h2>Pricing Breakdown</h2>
          </div>
          <p className="vr-body-text">
            Pricing below reflects list prices before applying discount codes. With code <strong className="vr-code-inline">PEPTIDEX</strong>{' '}
            ({review.discountPercent}% off{review.discountStackable ? ', stackable with sales' : ''}), effective prices drop further.
          </p>

          <div className="vr-pricing-table-scroll">
            <table className="vr-pricing-table">
              <thead>
                <tr>
                  <th>Compound</th>
                  <th>Vial</th>
                  <th>List Price</th>
                  <th>w/ PEPTIDEX</th>
                  <th>$/mg</th>
                </tr>
              </thead>
              <tbody>
                {review.pricing.map((p) => {
                  const listNum = parseFloat(p.listPrice.replace(/[^0-9.]/g, ''));
                  const vialMg = parseFloat(p.vial.replace(/[^0-9.]/g, ''));
                  const perMg = vialMg > 0 ? (listNum / vialMg).toFixed(2) : '—';
                  return (
                    <tr key={p.slug}>
                      <td>
                        <Link href={`/library/${p.slug}`} className="vr-pricing-link">{p.peptide}</Link>
                      </td>
                      <td className="vr-coa-mono">{p.vial}</td>
                      <td>{p.listPrice}</td>
                      <td className="vr-green">{p.withCode}</td>
                      <td className="vr-coa-mono">${perMg}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {review.pricing[0]?.note && (
            <p className="vr-pricing-note">† {review.pricing.find(p => p.note)?.note}</p>
          )}
        </section>

        {/* ══════════ 6. SHIPPING & SERVICE ══════════ */}
        <section id="shipping">
          <div className="vr-section-head">
            <Truck className="w-6 h-6 text-violet-400 flex-shrink-0" />
            <h2>Shipping, Payments &amp; Service</h2>
          </div>
          <div className="vr-specs-grid">
            <div className="vr-spec-card">
              <span className="vr-spec-key">Shipping Speed</span>
              <span className="vr-spec-val">{review.shippingSpeed}</span>
            </div>
            <div className="vr-spec-card">
              <span className="vr-spec-key">Free Shipping</span>
              <span className="vr-spec-val">{review.shippingCost}</span>
            </div>
            <div className="vr-spec-card">
              <span className="vr-spec-key">Ships To</span>
              <span className="vr-spec-val">{review.shipsTo.join(', ')}</span>
            </div>
            <div className="vr-spec-card">
              <span className="vr-spec-key">Payment Methods</span>
              <span className="vr-spec-val">{review.paymentMethods.join(', ')}</span>
            </div>
            <div className="vr-spec-card">
              <span className="vr-spec-key">Return Policy</span>
              <span className="vr-spec-val">{review.returnPolicy}</span>
            </div>
            <div className="vr-spec-card">
              <span className="vr-spec-key">Review Count</span>
              <span className="vr-spec-val">{review.ratingCount} on Trustpilot</span>
            </div>
          </div>
          {review.shippingDetail.split('\n\n').map((para, i) => (
            <p key={i} className="vr-body-text">{para}</p>
          ))}
        </section>

        {/* ══════════ 7. COMPARISONS ══════════ */}
        <section id="compare">
          <div className="vr-section-head">
            <Shield className="w-6 h-6 text-violet-400 flex-shrink-0" />
            <h2>How {review.name} Compares</h2>
          </div>
          <div className="vr-alt-grid">
            {review.alternatives.map((alt) => (
              <Link key={alt.slug} href={alt.href} className="vr-alt-card">
                <div className="vr-alt-top">
                  <span className="vr-alt-name">{alt.name}</span>
                  <span className="vr-alt-rating">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    {alt.rating}
                  </span>
                </div>
                <p className="vr-alt-best">{alt.bestFor}</p>
                <span className="vr-alt-cta">Read Review →</span>
              </Link>
            ))}
          </div>
        </section>

        {/* ══════════ 8. SUB-PAGES (Related) ══════════ */}
        {review.subPages && review.subPages.length > 0 && (
          <section id="related" className="vr-related-section">
            <div className="vr-section-head">
              <BookOpen className="w-6 h-6 text-amber-400 flex-shrink-0" />
              <h2>Related: {review.name}</h2>
            </div>
            <div className="vr-related-grid">
              {review.subPages.map((sp) => (
                <Link key={sp.slug} href={`/vendors/${sp.slug}`} className="vr-related-card">
                  <span className="vr-related-type">{sp.type.toUpperCase()}</span>
                  <span className="vr-related-label">{sp.label}</span>
                  <ArrowRight className="w-4 h-4 vr-related-arrow" />
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* ══════════ 9. FAQ ══════════ */}
        <section id="faq">
          <div className="vr-section-head">
            <HelpCircle className="w-6 h-6 text-amber-400 flex-shrink-0" />
            <h2>Frequently Asked Questions</h2>
          </div>
          <div className="vr-faq-list">
            {review.faqs.map((f, i) => (
              <div key={i} className="vr-faq-item">
                <h3>{f.q}</h3>
                <p>{f.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ══════════ 10. FINAL VERDICT + CTA ══════════ */}
        <section id="final-verdict">
          <div className="section-label">§ Conclusion</div>
          <h2 className="text-2xl font-bold text-zinc-100 mb-6">Final Verdict</h2>
          <p className="vr-body-text mb-8">{review.finalVerdictBody}</p>

          <div className="vr-final-cta">
            <div className="text-xs font-bold text-amber-400 font-mono mb-4">§ Exclusive Code</div>
            <h3 className="text-2xl font-bold text-zinc-100 mb-4">
              Ready to Source from {review.name}?
            </h3>
            <p className="text-zinc-300 mb-6">
              {review.purity} purity, {review.coaType.toLowerCase()} COAs, {review.returnPolicy.toLowerCase()}.
              {review.discountCode && ` Use code PEPTIDEX for ${review.discountPercent}% off.`}
            </p>
            {review.discountCode && (
              <div className="vr-code-block">
                <span className="vr-code-label">Code:</span>
                <span className="vr-code-value">{review.discountCode}</span>
              </div>
            )}
            <AffiliateLink
              href={review.affiliateUrl}
              vendor={(vendor?.gaKey || 'unknown') as AffiliateVendor | 'unknown'}
              peptide="all"
              source="vendor_review_footer"
              className="vr-btn-primary"
            >
              Shop {review.name} <ArrowRight className="w-5 h-5" />
            </AffiliateLink>
          </div>
        </section>

        {/* ══════════ FOOTER ══════════ */}
        <div className="mb-12"><CiteThisPage title={review.titleTag} url={canonical} /></div>
        <ShareBar title={review.titleTag} url={canonical} />
        <div className="flex items-center justify-between pt-6 border-t border-zinc-800/50 text-xs text-zinc-600">
          <span>Last fact-checked: <time dateTime={review.dateModified}>{review.dateModified}</time></span>
          <FeedbackModal pageUrl={canonical} />
        </div>
      </div>

      <div className="disclaimer-strip">
        ⚠ Educational only · Not medical advice · Most peptides are research-only / not FDA-approved
      </div>
    </main>
  );
}
