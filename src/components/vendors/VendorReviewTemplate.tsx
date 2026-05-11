import Link from 'next/link';
import { Star, ShieldCheck, ExternalLink, AlertTriangle, CheckCircle2, XCircle, ArrowRight, FlaskConical, Truck, CreditCard, RotateCcw, Globe, Package } from 'lucide-react';
import type { VendorReviewData } from '@/data/vendor-review-types';
import { AuthorByline } from '@/components/shared/AuthorByline';
import { LAST_REVIEWED_DATE, LAST_REVIEWED_ISO } from '@/data/constants';
import { AffiliateLink } from '@/components/affiliate-link';

function Stars({ rating, max = 5 }: { rating: number; max?: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of ${max} stars`}>
      {Array.from({ length: max }).map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${i < Math.round(rating) ? 'fill-amber-400 text-amber-400' : 'text-zinc-700'}`}
        />
      ))}
    </div>
  );
}

export function VendorReviewTemplate({ review }: { review: VendorReviewData }) {
  const canonical = `https://peptidex.app/vendors/${review.slug}-review`;
  const discountedPrice = (price: string) => {
    if (price.startsWith('$')) {
      const n = parseFloat(price.replace('$', ''));
      return `$${(n * (1 - review.discountPercent / 100)).toFixed(2)}`;
    }
    return price;
  };

  return (
    <main id="main-content">
      {/* ── Breadcrumb ── */}
      <header className="page-header">
        <div className="page-header-grid" />
        <div className="page-header-wrap">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span className="sep">/</span>
            <Link href="/vendors">Vendors</Link>
            <span className="sep">/</span>
            <span className="current">{review.name} Review</span>
          </nav>

          {/* Affiliate disclosure — above fold */}
          <div className="rounded-lg border border-amber-500/20 bg-amber-950/10 px-4 py-2 mt-4 mb-4 text-xs text-zinc-400 flex items-center gap-2">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
            <span><strong className="text-amber-400">Affiliate disclosure:</strong> PeptiDex may earn a commission when you purchase through links on this page. Rankings are not influenced by commercial relationships. <Link href="/disclaimer" className="text-amber-400 hover:underline">Full disclaimer →</Link></span>
          </div>

          <div className="section-label">§ Vendor Review</div>
          <h1 className="page-title">{review.name}<br /><em>2026 review</em>.</h1>
          <p className="page-subtitle">{review.tagline}</p>

          <div className="flex flex-wrap items-center gap-4 mt-4">
            <Stars rating={review.overallRating} />
            <span className="text-2xl font-bold text-zinc-100">{review.overallRating}/5</span>
            <span className="text-sm text-zinc-500">({review.ratingCount} reviews)</span>
          </div>

          <AuthorByline name="PeptiDex Editorial" date={LAST_REVIEWED_DATE} variant="compact" className="mt-4" />
          <div className="mt-4 mb-2">
          <AffiliateLink
              href={review.affiliateUrl}
              vendor={undefined}
              peptide="all"
              source="vendor_review"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-all shadow-lg hover:shadow-emerald-500/25"
            >
              Visit {review.name} <ArrowRight className="w-4 h-4" />
            </AffiliateLink>
            {review.discountCode && (
              <p className="mt-2 text-xs text-zinc-400">
                Use code{' '}
                <span className="text-emerald-400 font-bold px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                  {review.discountCode}
                </span>{' '}
                for {review.discountPercent}% off
                {review.discountStackable ? ' (stackable with sitewide sales)' : ''}
              </p>
            )}
          </div>
        </div>
      </header>

      <div className="about-content reveal space-y-16">

        {/* ── Quick Verdict ── */}
        <section id="verdict">
          <div className="section-label">§ Quick Verdict</div>
          <h2 className="text-2xl font-bold text-zinc-100 mb-4">{review.verdictHeadline}</h2>
          <div className="rounded-xl border border-emerald-500/20 bg-emerald-950/15 p-6">
            <div className="flex items-center gap-2 mb-3">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <span className="text-xs font-bold font-mono text-emerald-400 uppercase tracking-wider">GEO Quick Answer</span>
            </div>
            <p className="text-zinc-300 leading-relaxed">{review.verdictBody}</p>
          </div>
        </section>

        {/* ── At a Glance ── */}
        <section id="at-a-glance">
          <div className="section-label">§ At a Glance</div>
          <h2 className="text-2xl font-bold text-zinc-100 mb-6">Key stats</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: <FlaskConical className="w-5 h-5 text-amber-400" />, label: 'Purity', value: review.purity },
              { icon: <ShieldCheck className="w-5 h-5 text-emerald-400" />, label: 'COA Type', value: review.coaType },
              { icon: <Package className="w-5 h-5 text-violet-400" />, label: 'Catalog', value: review.catalogSize },
              { icon: <Truck className="w-5 h-5 text-blue-400" />, label: 'Shipping', value: review.shippingSpeed },
              { icon: <Globe className="w-5 h-5 text-teal-400" />, label: 'Ships To', value: review.shipsTo.join(', ') },
              { icon: <CreditCard className="w-5 h-5 text-pink-400" />, label: 'Payment', value: review.paymentMethods.join(', ') },
              { icon: <RotateCcw className="w-5 h-5 text-orange-400" />, label: 'Returns', value: review.returnPolicy },
              { icon: <Star className="w-5 h-5 text-amber-400 fill-amber-400" />, label: 'Rating', value: `${review.overallRating}/5 (${review.ratingCount})` },
            ].map(({ icon, label, value }) => (
              <div key={label} className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-4">
                <div className="flex items-center gap-2 mb-2">{icon}<span className="text-xs font-mono text-zinc-500 uppercase tracking-wider">{label}</span></div>
                <p className="text-sm font-semibold text-zinc-200">{value}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {review.testingMethods.map(m => (
              <span key={m} className="px-3 py-1 rounded-full text-xs font-bold bg-violet-500/10 border border-violet-500/20 text-violet-300">{m}</span>
            ))}
          </div>
        </section>

        {/* ── Pros & Cons ── */}
        <section id="pros-cons">
          <div className="section-label">§ Pros & Cons</div>
          <h2 className="text-2xl font-bold text-zinc-100 mb-6">Pros &amp; Cons</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-xl border border-emerald-500/20 bg-emerald-950/10 p-6">
              <h3 className="font-bold text-emerald-400 mb-4 flex items-center gap-2"><CheckCircle2 className="w-5 h-5" /> Pros</h3>
              <ul className="space-y-3">
                {review.pros.map((p, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-zinc-200">{p.point}</p>
                      {p.detail && <p className="text-xs text-zinc-500 mt-0.5">{p.detail}</p>}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-red-500/20 bg-red-950/10 p-6">
              <h3 className="font-bold text-red-400 mb-4 flex items-center gap-2"><XCircle className="w-5 h-5" /> Cons</h3>
              <ul className="space-y-3">
                {review.cons.map((c, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <XCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-zinc-200">{c.point}</p>
                      {c.detail && <p className="text-xs text-zinc-500 mt-0.5">{c.detail}</p>}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ── COA + Testing ── */}
        <section id="coa">
          <div className="section-label">§ COA Verification</div>
          <h2 className="text-2xl font-bold text-zinc-100 mb-4">COA &amp; Testing methodology</h2>
          <p className="text-zinc-400 leading-relaxed mb-6">{review.coaDescription}</p>
          {review.coaUrl && (
            <a href={review.coaUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold text-violet-400 hover:text-violet-300 transition-colors mb-6">
              <ExternalLink className="w-4 h-4" /> View sample COA PDF →
            </a>
          )}
          {/* COA Screenshot — replace src with a real screenshot from this vendor's COA page */}
          <div className="relative rounded-xl overflow-hidden border border-zinc-800 mb-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/coa-sample-placeholder.png"
              alt={`${review.name} Certificate of Analysis sample — replace with real COA screenshot`}
              className="w-full max-h-64 object-cover object-top opacity-70"
              loading="lazy"
            />
            <div className="absolute inset-0 flex items-end p-4 bg-gradient-to-t from-zinc-950/90 via-transparent">
              <p className="text-xs font-mono text-amber-400">
                ⚠ TODO: Replace with a real COA screenshot from {review.name}. Upload to <code>/public/images/{review.slug}-coa.png</code> and update the <code>src</code> above.
              </p>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            {review.testingMethods.map(m => (
              <div key={m} className="flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900/50 px-4 py-2">
                <FlaskConical className="w-4 h-4 text-amber-400" />
                <span className="text-sm font-semibold text-zinc-200">{m}</span>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-zinc-500">
            Use our <Link href="/tools/coa" className="text-violet-400 hover:underline">free COA Analyzer tool</Link> to validate any COA you receive from {review.name}.
          </p>
        </section>

        {/* ── Pricing ── */}
        <section id="pricing">
          <div className="section-label">§ Pricing</div>
          <h2 className="text-2xl font-bold text-zinc-100 mb-6">Pricing &amp; discount</h2>
          {review.discountCode && (
            <div className="mb-6 rounded-xl border border-amber-500/20 bg-amber-950/10 p-4 flex flex-wrap items-center gap-4">
              <div>
                <p className="text-xs font-mono text-amber-400 uppercase tracking-wider mb-1">Exclusive Code</p>
                <p className="text-2xl font-mono font-bold text-amber-400">{review.discountCode}</p>
              </div>
              <div className="text-sm text-zinc-400">
                Save <strong className="text-amber-400">{review.discountPercent}%</strong> at checkout
                {review.discountStackable && <span className="ml-2 text-emerald-400 text-xs font-semibold">(stackable with sitewide sales)</span>}
              </div>
            </div>
          )}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-800">
                  <th className="text-left py-3 px-4 text-xs font-mono text-zinc-500 uppercase tracking-wider">Peptide</th>
                  <th className="text-left py-3 px-4 text-xs font-mono text-zinc-500 uppercase tracking-wider">Vial</th>
                  <th className="text-left py-3 px-4 text-xs font-mono text-zinc-500 uppercase tracking-wider">List Price</th>
                  <th className="text-left py-3 px-4 text-xs font-mono text-zinc-500 uppercase tracking-wider">With {review.discountCode}</th>
                </tr>
              </thead>
              <tbody>
                {review.pricing.map((p, i) => (
                  <tr key={i} className="border-b border-zinc-800/50 hover:bg-zinc-900/30 transition-colors">
                    <td className="py-3 px-4">
                      <Link href={`/library/${p.slug}`} className="font-semibold text-zinc-200 hover:text-violet-400 transition-colors">{p.peptide}</Link>
                    </td>
                    <td className="py-3 px-4 text-zinc-400">{p.vial}</td>
                    <td className="py-3 px-4 text-zinc-400">{p.listPrice}</td>
                    <td className="py-3 px-4 font-semibold text-emerald-400">{p.withCode}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-xs text-zinc-500">
            Prices are per vendor website as of {review.dateModified}. Verify current pricing at <AffiliateLink href={review.affiliateUrl} peptide="all" source="vendor_review_pricing" className="text-violet-400 hover:underline">{review.websiteDisplay}</AffiliateLink> before purchasing.
            Compare cross-vendor pricing at our <Link href="/tools/pricing" className="text-violet-400 hover:underline">pricing tool</Link>.
          </p>
        </section>

        {/* ── Customer Sentiment ── */}
        <section id="reviews">
          <div className="section-label">§ Community Sentiment</div>
          <h2 className="text-2xl font-bold text-zinc-100 mb-6">What customers are saying</h2>
          <p className="text-xs text-zinc-500 mb-6 italic">PeptiDex does not independently verify individual customer reviews. The following is a synthesis of publicly available review data. All claims are attributed to their source platforms.</p>
          <div className="space-y-6">
            {review.sentiment.map((s, i) => (
              <div key={i} className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-6">
                <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
                  <div>
                    <h3 className="font-bold text-zinc-100">{s.platform}</h3>
                    <p className="text-xs text-zinc-500">{s.count} reviews · Avg: <strong className="text-amber-400">{s.rating}</strong></p>
                  </div>
                  <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-xs text-zinc-500 hover:text-zinc-300 flex items-center gap-1 transition-colors">
                    View on {s.platform} <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <p className="text-zinc-400 text-sm leading-relaxed mb-4">{s.summary}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs font-bold text-emerald-400 mb-2">Common positives</p>
                    <ul className="space-y-1">
                      {s.positives.map((p, j) => (
                        <li key={j} className="text-xs text-zinc-400 flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />{p}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-red-400 mb-2">Common negatives</p>
                    <ul className="space-y-1">
                      {s.negatives.map((n, j) => (
                        <li key={j} className="text-xs text-zinc-400 flex items-start gap-2">
                          <XCircle className="w-3.5 h-3.5 text-red-500 flex-shrink-0 mt-0.5" />{n}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Shipping ── */}
        <section id="shipping">
          <div className="section-label">§ Shipping & Service</div>
          <h2 className="text-2xl font-bold text-zinc-100 mb-6">Shipping &amp; customer service</h2>
          <div className="space-y-4 text-zinc-400 leading-relaxed text-sm">
            {review.shippingDetail.split('\n\n').map((para, i) => <p key={i}>{para}</p>)}
          </div>
        </section>

        {/* ── Best For ── */}
        <section id="best-for">
          <div className="section-label">§ Buyer Match</div>
          <h2 className="text-2xl font-bold text-zinc-100 mb-6">Who is {review.name} best for?</h2>
          <ul className="space-y-3">
            {review.bestFor.map((b, i) => (
              <li key={i} className="flex items-start gap-3 rounded-xl border border-zinc-800 bg-zinc-900/20 p-4">
                <CheckCircle2 className="w-4 h-4 text-violet-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-zinc-300">{b}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* ── Internal library links ── */}
        <section>
          <div className="section-label">§ Related Research</div>
          <h2 className="text-2xl font-bold text-zinc-100 mb-4">Peptides this vendor carries</h2>
          <div className="flex flex-wrap gap-3">
            {review.libraryLinks.map(l => (
              <Link key={l.slug} href={`/library/${l.slug}`} className="flex items-center gap-2 px-4 py-2 rounded-xl border border-zinc-800 bg-zinc-900/30 hover:border-violet-500/40 hover:bg-violet-500/5 text-zinc-300 hover:text-white transition-all text-sm font-medium">
                {l.name} <ArrowRight className="w-3.5 h-3.5 text-violet-400" />
              </Link>
            ))}
          </div>
          <div className="flex flex-wrap gap-3 mt-4">
            <Link href="/tools/coa" className="text-xs text-zinc-500 hover:text-violet-400 transition-colors">COA Analyzer →</Link>
            <Link href="/tools/pricing" className="text-xs text-zinc-500 hover:text-violet-400 transition-colors">Price Comparison →</Link>
            <Link href="/tools/calculator" className="text-xs text-zinc-500 hover:text-violet-400 transition-colors">Reconstitution Calculator →</Link>
          </div>
        </section>

        {/* ── Alternatives ── */}
        <section id="alternatives">
          <div className="section-label">§ Alternatives</div>
          <h2 className="text-2xl font-bold text-zinc-100 mb-6">How {review.name} compares</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-800">
                  <th className="text-left py-3 px-4 text-xs font-mono text-zinc-500 uppercase tracking-wider">Vendor</th>
                  <th className="text-left py-3 px-4 text-xs font-mono text-zinc-500 uppercase tracking-wider">Rating</th>
                  <th className="text-left py-3 px-4 text-xs font-mono text-zinc-500 uppercase tracking-wider">Best For</th>
                  <th className="py-3 px-4" />
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-zinc-800/50 bg-violet-500/5">
                  <td className="py-3 px-4 font-semibold text-violet-300">{review.name} <span className="text-xs text-zinc-500">(this review)</span></td>
                  <td className="py-3 px-4"><Stars rating={review.overallRating} /><span className="ml-2 text-zinc-400 text-xs">{review.overallRating}</span></td>
                  <td className="py-3 px-4 text-zinc-400">{review.tagline.split(' with ')[0]}</td>
                  <td className="py-3 px-4" />
                </tr>
                {review.alternatives.map((alt, i) => (
                  <tr key={i} className="border-b border-zinc-800/50 hover:bg-zinc-900/30 transition-colors">
                    <td className="py-3 px-4 font-semibold text-zinc-200">{alt.name}</td>
                    <td className="py-3 px-4"><Stars rating={alt.rating} /><span className="ml-2 text-zinc-400 text-xs">{alt.rating}</span></td>
                    <td className="py-3 px-4 text-zinc-400">{alt.bestFor}</td>
                    <td className="py-3 px-4">
                      <Link href={alt.href} className="text-xs text-violet-400 hover:text-violet-300 flex items-center gap-1 font-semibold">
                        Read review <ArrowRight className="w-3 h-3" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-xs text-zinc-500">
            Full comparison: <Link href="/vendors" className="text-violet-400 hover:underline">Vendor Rankings Hub →</Link>
          </p>
        </section>

        {/* ── FAQ ── */}
        <section id="faq">
          <div className="section-label">§ FAQ</div>
          <h2 className="text-2xl font-bold text-zinc-100 mb-6">Frequently asked questions</h2>
          <div className="space-y-4">
            {review.faqs.map((faq, i) => (
              <div key={i} className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-6">
                <h3 className="font-bold text-zinc-100 mb-2">{faq.q}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Final Verdict ── */}
        <section id="final-verdict">
          <div className="section-label">§ Final Verdict</div>
          <h2 className="text-2xl font-bold text-zinc-100 mb-6">Editorial score breakdown</h2>
          <div className="space-y-3 mb-8">
            {review.scoreBreakdown.map((s, i) => (
              <div key={i} className="flex items-center justify-between rounded-lg border border-zinc-800 bg-zinc-900/20 p-4 flex-wrap gap-2">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-zinc-200">{s.category}</p>
                  <p className="text-xs text-zinc-500 mt-0.5">{s.note}</p>
                </div>
                <span className="text-lg font-bold text-amber-400 flex-shrink-0">{s.score}</span>
              </div>
            ))}
            <div className="flex items-center justify-between rounded-xl border border-amber-500/30 bg-amber-950/15 p-5">
              <span className="font-bold text-zinc-100 text-lg">Overall</span>
              <div className="flex items-center gap-3">
                <Stars rating={review.overallRating} />
                <span className="text-2xl font-bold text-amber-400">{review.overallRating}/5</span>
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-6 mb-8">
            <p className="text-zinc-300 leading-relaxed">{review.finalVerdictBody}</p>
          </div>
          <AffiliateLink
            href={review.affiliateUrl}
            peptide="all"
            source="vendor_review_footer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-all shadow-lg hover:shadow-emerald-500/25"
          >
            Visit {review.name} — Use code {review.discountCode} <ArrowRight className="w-5 h-5" />
          </AffiliateLink>
        </section>

        {/* ── Author ── */}
        <AuthorByline name="PeptiDex Editorial" variant="full" />

        <div className="flex items-center justify-between pt-6 border-t border-zinc-800/50 text-xs text-zinc-600">
          <span>Last reviewed: <time dateTime={LAST_REVIEWED_ISO}>{LAST_REVIEWED_DATE}</time></span>
        </div>
      </div>

      <div className="disclaimer-strip">
        ⚠ Educational only · Not medical advice · Research compounds not approved by FDA for human consumption
      </div>
    </main>
  );
}
