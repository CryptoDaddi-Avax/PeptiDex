import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronRight, ShieldAlert, Star, CheckCircle2, ExternalLink, ArrowRight, Truck, Shield, FlaskConical, CreditCard, RotateCcw, Globe } from 'lucide-react';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { ShareBar } from '@/components/share-bar';
import { getVendorPair, VALID_VENDOR_COMPARISONS, TOP_COMPARISON_PEPTIDES, type VendorProfile } from '@/data/vendor-comparison';
import { vendorPricing } from '@/data/vendor-pricing';
import { SHORT_DISCLAIMER } from '@/data/constants';

// ─── STATIC PARAMS ─────────────────────────────────────────────────
export function generateStaticParams() {
  return VALID_VENDOR_COMPARISONS.map((slug) => ({ slug }));
}

// ─── DYNAMIC METADATA ──────────────────────────────────────────────
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const pair = getVendorPair(slug);
  if (!pair) return {};
  const [a, b] = pair;
  const title = `${a.name} vs ${b.name} — Peptide Vendor Comparison 2026 | PeptiDex`;
  const description = `Wondering if ${a.name} or ${b.name} is better for research-grade peptides in 2026? We compared their pricing, purity, and third-party testing so you don't have to.`;
  return {
    title,
    description,
    alternates: { canonical: `https://peptidex.app/compare/vendors/${slug}` },
    openGraph: {
      title,
      description,
      url: `https://peptidex.app/compare/vendors/${slug}`,
      type: 'article',
      images: [{ url: 'https://peptidex.app/og-image.png', width: 1200, height: 630 }],
    },
    twitter: { card: 'summary_large_image', title, description, images: ['https://peptidex.app/og-image.png'] },
  };
}

// ─── HELPERS ────────────────────────────────────────────────────────
function StarRating({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  return (
    <div className="flex items-center gap-1">
      <div className="flex gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className={`w-4 h-4 ${i < full ? 'text-amber-400 fill-amber-400' : 'text-zinc-700'}`} />
        ))}
      </div>
      <span className="text-sm font-bold text-zinc-200 ml-1">{rating}</span>
    </div>
  );
}

function VendorBadge({ vendor }: { vendor: VendorProfile }) {
  if (!vendor.badge) return null;
  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest bg-violet-500/20 text-violet-300 rounded-md border border-violet-500/30">
      {vendor.badge}
    </span>
  );
}

function getPeptidePrice(peptideName: string, vendorName: string): { price: number; vialMg: number; inStock: boolean } | null {
  const entry = vendorPricing.find(p => p.name === peptideName);
  if (!entry) return null;
  const v = entry.vendors.find(v => v.vendor === vendorName);
  if (!v || v.price_usd === 0) return null;
  return { price: v.price_usd, vialMg: v.vial_mg, inStock: v.inStock };
}

function WinnerIndicator({ aPrice, bPrice }: { aPrice: number | null; bPrice: number | null }) {
  if (aPrice === null || bPrice === null) return null;
  if (aPrice === bPrice) return null;
  const savings = Math.abs(aPrice - bPrice);
  const pct = Math.round((savings / Math.max(aPrice, bPrice)) * 100);
  return (
    <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded-full">
      {pct}% less
    </span>
  );
}

// ─── PAGE COMPONENT ─────────────────────────────────────────────────
export default async function VendorComparisonPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const pair = getVendorPair(slug);
  if (!pair) notFound();
  const [vendorA, vendorB] = pair;

  const DATE = '2026-04-13';
  const pageUrl = `https://peptidex.app/compare/vendors/${slug}`;

  // Schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://peptidex.app/' },
      { '@type': 'ListItem', position: 2, name: 'Compare', item: 'https://peptidex.app/compare' },
      { '@type': 'ListItem', position: 3, name: `${vendorA.name} vs ${vendorB.name}`, item: pageUrl },
    ],
  };

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `${vendorA.name} vs ${vendorB.name} — Peptide Vendor Comparison 2026`,
    description: `Side-by-side comparison of ${vendorA.name} and ${vendorB.name} for research peptides: pricing, purity, COA testing, and shipping.`,
    image: 'https://peptidex.app/og-image.png',
    author: { '@type': 'Organization', name: 'PeptiDex', url: 'https://peptidex.app' },
    publisher: { '@type': 'Organization', name: 'PeptiDex', logo: { '@type': 'ImageObject', url: 'https://peptidex.app/logo.png' } },
    datePublished: DATE,
    dateModified: DATE,
    mainEntityOfPage: { '@type': 'WebPage', '@id': pageUrl },
  };

  // Build price rows
  const priceRows = TOP_COMPARISON_PEPTIDES.map(name => {
    const a = getPeptidePrice(name, vendorA.name);
    const b = getPeptidePrice(name, vendorB.name);
    return { name, a, b };
  });

  // Count pricing wins
  let aWins = 0;
  let bWins = 0;
  priceRows.forEach(r => {
    if (r.a && r.b) {
      if (r.a.price < r.b.price) aWins++;
      else if (r.b.price < r.a.price) bWins++;
    }
  });

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-12 space-y-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: `${vendorA.name} vs ${vendorB.name} — Vendor Comparison`,
        itemListElement: [vendorA, vendorB].map((v, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          item: {
            '@type': 'Organization',
            name: v.name,
            url: v.affiliateUrl,
            description: `${v.name} is a research peptide vendor with ${v.purity} purity guarantee and ${v.coaStatus.toLowerCase()} COA verification.`,
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: v.rating.toFixed(1),
              bestRating: '5',
              worstRating: '1',
              ratingCount: parseInt(v.ratingCount, 10) || 50,
              reviewCount: parseInt(v.ratingCount, 10) || 50,
            },
          },
        })),
      }) }} />

      <Breadcrumbs items={[
        { name: 'Home', url: 'https://peptidex.app/' },
        { name: 'Compare', url: 'https://peptidex.app/compare' },
        { name: `${vendorA.name} vs ${vendorB.name}` },
      ]} />

      {/* ═══════ HERO ═══════ */}
      <header className="space-y-5">
        <p className="text-xs text-zinc-500 font-medium">Updated: {DATE}</p>
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-zinc-100 leading-tight">
          {vendorA.name} vs {vendorB.name}:
          <br />
          <span className="text-violet-400">Which Peptide Vendor Wins in 2026?</span>
        </h1>

        {/* SEO intro */}
        <p className="text-[15px] md:text-base text-zinc-400 leading-relaxed max-w-3xl">
          Wondering if <strong className="text-zinc-200">{vendorA.name}</strong> or <strong className="text-zinc-200">{vendorB.name}</strong> is better for research-grade peptides in 2026?
          We compared their pricing, purity, and third-party testing so you don&apos;t have to.
          Below you&apos;ll find a side-by-side breakdown of the top 5 peptides by price, shipping logistics,
          COA verification, and our editorial rating — everything you need to make an informed sourcing decision.
        </p>
      </header>

      {/* ═══════ DISCLAIMER ═══════ */}
      <div className="rounded-xl bg-amber-950/25 border border-amber-500/20 p-4">
        <div className="flex items-start gap-2">
          <ShieldAlert className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-amber-400/80 leading-relaxed font-medium">
            <strong>RESEARCH &amp; EDUCATIONAL USE ONLY:</strong> {SHORT_DISCLAIMER} PeptiDex may earn commissions from affiliate links at no cost to you.
          </p>
        </div>
      </div>

      {/* ═══════ QUICK VERDICT CARDS ═══════ */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[vendorA, vendorB].map((v) => (
          <div
            key={v.slug}
            className={`rounded-2xl p-6 border transition-all ${
              v.badge
                ? 'bg-gradient-to-br from-violet-900/15 to-zinc-900 border-violet-500/25'
                : 'bg-zinc-900/50 border-zinc-800'
            }`}
          >
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <h2 className="text-xl font-bold text-zinc-100">{v.name}</h2>
              <VendorBadge vendor={v} />
            </div>
            <StarRating rating={v.rating} />
            <p className="text-xs text-zinc-500 mt-1">{v.ratingCount} reviews</p>
            <div className="flex flex-wrap gap-2 mt-4">
              <span className="flex items-center gap-1 text-[11px] text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-full font-medium">
                <CheckCircle2 className="w-3 h-3" /> {v.purity} purity
              </span>
              <span className="flex items-center gap-1 text-[11px] text-zinc-400 bg-zinc-800/80 px-2 py-1 rounded-full font-medium">
                <FlaskConical className="w-3 h-3" /> {v.coaStatus}
              </span>
              <span className="flex items-center gap-1 text-[11px] text-zinc-400 bg-zinc-800/80 px-2 py-1 rounded-full font-medium">
                <Globe className="w-3 h-3" /> {v.catalogSize}
              </span>
            </div>
            <a
              href={v.affiliateUrl}
              target="_blank"
              rel="nofollow noopener sponsored"
              className={`mt-5 w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all ${
                v.badge
                  ? 'bg-violet-600 hover:bg-violet-500 text-white shadow-lg hover:shadow-violet-600/25'
                  : 'bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-200'
              }`}
            >
              Visit {v.name} <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        ))}
      </section>

      {/* ═══════ PRICING TABLE ═══════ */}
      <section>
        <div className="flex items-center gap-3 mb-5">
          <h2 className="text-2xl font-bold text-zinc-100">Price Comparison — Top 5 Peptides</h2>
        </div>
        <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/40">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-zinc-900/80 border-b border-zinc-700">
                <tr>
                  <th className="px-5 py-4 text-xs font-bold text-zinc-400 uppercase tracking-wider">Peptide</th>
                  <th className="px-5 py-4 text-xs font-bold text-violet-400 uppercase tracking-wider">
                    {vendorA.name}
                    {vendorA.badge && <span className="ml-1.5 text-[8px] text-violet-300 bg-violet-500/20 px-1.5 py-0.5 rounded-full border border-violet-500/30">★</span>}
                  </th>
                  <th className="px-5 py-4 text-xs font-bold text-blue-400 uppercase tracking-wider">{vendorB.name}</th>
                  <th className="px-5 py-4 text-xs font-bold text-zinc-400 uppercase tracking-wider text-right">Winner</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/50">
                {priceRows.map((row) => {
                  const aPrice = row.a?.price ?? null;
                  const bPrice = row.b?.price ?? null;
                  const winner =
                    aPrice !== null && bPrice !== null
                      ? aPrice < bPrice ? 'a' : bPrice < aPrice ? 'b' : 'tie'
                      : null;

                  return (
                    <tr key={row.name} className="hover:bg-zinc-800/20 transition-colors">
                      <td className="px-5 py-4 font-semibold text-zinc-200">{row.name}</td>
                      <td className={`px-5 py-4 ${winner === 'a' ? 'text-emerald-400 font-bold' : 'text-zinc-400'}`}>
                        {row.a ? (
                          <span className="flex items-center gap-2">
                            ${row.a.price.toFixed(2)}
                            <span className="text-[10px] text-zinc-600">/ {row.a.vialMg}mg</span>
                            {winner === 'a' && <WinnerIndicator aPrice={aPrice} bPrice={bPrice} />}
                          </span>
                        ) : (
                          <span className="text-zinc-600">N/A</span>
                        )}
                      </td>
                      <td className={`px-5 py-4 ${winner === 'b' ? 'text-emerald-400 font-bold' : 'text-zinc-400'}`}>
                        {row.b ? (
                          <span className="flex items-center gap-2">
                            ${row.b.price.toFixed(2)}
                            <span className="text-[10px] text-zinc-600">/ {row.b.vialMg}mg</span>
                            {winner === 'b' && <WinnerIndicator aPrice={aPrice} bPrice={bPrice} />}
                          </span>
                        ) : (
                          <span className="text-zinc-600">N/A</span>
                        )}
                      </td>
                      <td className="px-5 py-4 text-right">
                        {winner === 'a' && <span className="text-xs font-bold text-violet-400">{vendorA.name}</span>}
                        {winner === 'b' && <span className="text-xs font-bold text-blue-400">{vendorB.name}</span>}
                        {winner === 'tie' && <span className="text-xs text-zinc-500">Tie</span>}
                        {winner === null && <span className="text-xs text-zinc-600">—</span>}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Summary bar */}
          <div className="px-5 py-3.5 bg-zinc-900/60 border-t border-zinc-800 flex items-center justify-between">
            <span className="text-xs text-zinc-500">Pricing wins (of {priceRows.filter(r => r.a && r.b).length} head-to-head)</span>
            <div className="flex items-center gap-4 text-sm font-bold">
              <span className="text-violet-400">{vendorA.name}: {aWins}</span>
              <span className="text-zinc-600">|</span>
              <span className="text-blue-400">{vendorB.name}: {bWins}</span>
            </div>
          </div>
        </div>
        <p className="text-[11px] text-zinc-600 mt-2">Prices reflect standard single-vial pricing as of {DATE}. Bulk discounts may apply.</p>
      </section>

      {/* ═══════ FULL COMPARISON TABLE ═══════ */}
      <section>
        <h2 className="text-2xl font-bold text-zinc-100 mb-5">Full Vendor Comparison</h2>
        <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/40">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-zinc-900/80 border-b border-zinc-700">
                <tr>
                  <th className="px-5 py-4 text-xs font-bold text-zinc-400 uppercase tracking-wider w-1/3">Category</th>
                  <th className="px-5 py-4 text-xs font-bold text-violet-400 uppercase tracking-wider w-1/3">{vendorA.name}</th>
                  <th className="px-5 py-4 text-xs font-bold text-blue-400 uppercase tracking-wider w-1/3">{vendorB.name}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/50">
                {/* Rating */}
                <tr>
                  <td className="px-5 py-4 text-zinc-400 font-medium flex items-center gap-2">
                    <Star className="w-4 h-4 text-amber-400" /> User Rating
                  </td>
                  <td className="px-5 py-4"><StarRating rating={vendorA.rating} /></td>
                  <td className="px-5 py-4"><StarRating rating={vendorB.rating} /></td>
                </tr>

                {/* Purity */}
                <tr>
                  <td className="px-5 py-4 text-zinc-400 font-medium flex items-center gap-2">
                    <Shield className="w-4 h-4 text-emerald-400" /> Purity Guarantee
                  </td>
                  <td className="px-5 py-4 text-emerald-400 font-semibold">{vendorA.purity}</td>
                  <td className="px-5 py-4 text-emerald-400 font-semibold">{vendorB.purity}</td>
                </tr>

                {/* COA */}
                <tr>
                  <td className="px-5 py-4 text-zinc-400 font-medium flex items-center gap-2">
                    <FlaskConical className="w-4 h-4 text-violet-400" /> COA Status
                  </td>
                  <td className="px-5 py-4">
                    <span className="flex items-center gap-1.5 text-zinc-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" /> {vendorA.coaStatus}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="flex items-center gap-1.5 text-zinc-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" /> {vendorB.coaStatus}
                    </span>
                  </td>
                </tr>

                {/* Testing Methods */}
                <tr>
                  <td className="px-5 py-4 text-zinc-400 font-medium">Testing Methods</td>
                  <td className="px-5 py-4">
                    <div className="flex flex-wrap gap-1.5">
                      {vendorA.testingMethods.map(m => (
                        <span key={m} className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] text-emerald-400 font-medium">{m}</span>
                      ))}
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex flex-wrap gap-1.5">
                      {vendorB.testingMethods.map(m => (
                        <span key={m} className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] text-emerald-400 font-medium">{m}</span>
                      ))}
                    </div>
                  </td>
                </tr>

                {/* Shipping Speed */}
                <tr>
                  <td className="px-5 py-4 text-zinc-400 font-medium flex items-center gap-2">
                    <Truck className="w-4 h-4 text-blue-400" /> Shipping Speed
                  </td>
                  <td className="px-5 py-4 text-zinc-300">{vendorA.shippingSpeed}</td>
                  <td className="px-5 py-4 text-zinc-300">{vendorB.shippingSpeed}</td>
                </tr>

                {/* Shipping Cost */}
                <tr>
                  <td className="px-5 py-4 text-zinc-400 font-medium">Free Shipping</td>
                  <td className="px-5 py-4 text-zinc-300">{vendorA.shippingCost}</td>
                  <td className="px-5 py-4 text-zinc-300">{vendorB.shippingCost}</td>
                </tr>

                {/* Ships To */}
                <tr>
                  <td className="px-5 py-4 text-zinc-400 font-medium flex items-center gap-2">
                    <Globe className="w-4 h-4 text-zinc-400" /> Ships To
                  </td>
                  <td className="px-5 py-4 text-zinc-300">{vendorA.shipsTo.join(", ")}</td>
                  <td className="px-5 py-4 text-zinc-300">{vendorB.shipsTo.join(", ")}</td>
                </tr>

                {/* Catalog Size */}
                <tr>
                  <td className="px-5 py-4 text-zinc-400 font-medium">Catalog Size</td>
                  <td className="px-5 py-4 text-zinc-300">{vendorA.catalogSize}</td>
                  <td className="px-5 py-4 text-zinc-300">{vendorB.catalogSize}</td>
                </tr>

                {/* Payment */}
                <tr>
                  <td className="px-5 py-4 text-zinc-400 font-medium flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-zinc-400" /> Payment
                  </td>
                  <td className="px-5 py-4 text-zinc-300">{vendorA.paymentMethods.join(", ")}</td>
                  <td className="px-5 py-4 text-zinc-300">{vendorB.paymentMethods.join(", ")}</td>
                </tr>

                {/* Return Policy */}
                <tr>
                  <td className="px-5 py-4 text-zinc-400 font-medium flex items-center gap-2">
                    <RotateCcw className="w-4 h-4 text-zinc-400" /> Return Policy
                  </td>
                  <td className="px-5 py-4 text-zinc-300">{vendorA.returnPolicy}</td>
                  <td className="px-5 py-4 text-zinc-300">{vendorB.returnPolicy}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ═══════ EDITORIAL VERDICT ═══════ */}
      <section className="rounded-2xl bg-gradient-to-br from-violet-900/10 to-zinc-900 border border-violet-500/20 p-6 md:p-8 space-y-5">
        <h2 className="text-2xl font-bold text-zinc-100">Our Verdict</h2>
        <p className="text-[15px] text-zinc-300 leading-relaxed">
          Both <strong>{vendorA.name}</strong> and <strong>{vendorB.name}</strong> are verified, reputable sources for research-grade peptides.
          {aWins > bWins ? (
            <> In our head-to-head pricing comparison, <strong className="text-violet-400">{vendorA.name} wins on price</strong> for {aWins} of the top {priceRows.filter(r => r.a && r.b).length} peptides, offering consistently competitive rates alongside {vendorA.purity} purity and {vendorA.coaStatus.toLowerCase()} verification. However, {vendorB.name}&apos;s {vendorB.catalogSize} catalog gives it the edge for researchers needing access to less common compounds.</>
          ) : bWins > aWins ? (
            <> In our head-to-head pricing comparison, <strong className="text-blue-400">{vendorB.name} wins on price</strong> for {bWins} of the top {priceRows.filter(r => r.a && r.b).length} peptides. {vendorA.name} compensates with {vendorA.purity} verified purity and a {vendorA.returnPolicy.toLowerCase()}.</>
          ) : (
            <> In our head-to-head pricing, both vendors are evenly matched. Your choice may come down to catalog breadth, shipping speed, or return policy.</>
          )}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <a
            href={vendorA.affiliateUrl}
            target="_blank"
            rel="nofollow noopener sponsored"
            className="flex items-center justify-center gap-2 py-3.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold text-sm transition-all shadow-lg hover:shadow-violet-600/25"
          >
            Visit {vendorA.name} <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href={vendorB.affiliateUrl}
            target="_blank"
            rel="nofollow noopener sponsored"
            className="flex items-center justify-center gap-2 py-3.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-200 font-bold text-sm transition-all"
          >
            Visit {vendorB.name} <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      <ShareBar title={`${vendorA.name} vs ${vendorB.name} — Vendor Comparison`} url={pageUrl} />

      {/* ═══════ FOOTER LINKS ═══════ */}
      <footer className="pt-6 border-t border-zinc-800 space-y-4">
        <div className="flex flex-wrap gap-4 text-sm font-medium items-center">
          <span className="text-zinc-500">Related:</span>
          <Link href="/vendors" className="text-violet-400 hover:text-violet-300 transition-colors">All Vendors →</Link>
          <span className="text-zinc-700">|</span>
          <Link href="/tools/pricing" className="text-violet-400 hover:text-violet-300 transition-colors">Pricing Tool →</Link>
          <span className="text-zinc-700">|</span>
          <Link href="/tools/compare" className="text-violet-400 hover:text-violet-300 transition-colors">All Comparisons →</Link>
        </div>

        <div className="bg-zinc-900 rounded-xl p-5 border border-zinc-800/50">
          <p className="text-xs text-zinc-500 leading-relaxed text-justify">
            <strong>AFFILIATE DISCLOSURE:</strong> PeptiDex is a reader-supported independent research hub. When you purchase through links on our site, we may earn an affiliate commission. This helps maintain our database and fund ongoing research operations without impacting our unbiased vetting process.
          </p>
        </div>
      </footer>
    </div>
  );
}
