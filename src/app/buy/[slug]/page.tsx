import { notFound, permanentRedirect } from 'next/navigation';
import { getPeptideBySlug } from '@/data/peptides';
import { vendorPricing } from '@/data/vendor-pricing';
import { vendors } from '@/data/vendors';
import { BuyPageHero } from '@/components/buy/BuyPageHero';
import { WhereToBuySection } from '@/components/library/WhereToBuySection';
import { VendorMiniCards } from '@/components/buy/VendorMiniCards';
import { QuickReference } from '@/components/buy/QuickReference';
import { TrustBlock } from '@/components/library/TrustBlock';
import { buildBreadcrumbSchema, buildFAQPageSchema } from '@/lib/seo/schema';
import { buildProductSchema } from '@/lib/seo/schema/product';
import { SchemaInjector } from '@/components/schema-injector';
import { ShieldCheck } from 'lucide-react';
import Link from 'next/link';

// ── Discount lookups (single source of truth: vendors.ts) ─────────────────
const _aminoClub    = vendors.find((v) => v.slug === 'amino-club')!;
const _bioLongevity = vendors.find((v) => v.slug === 'bio-longevity-labs')!;
const _limitless    = vendors.find((v) => v.slug === 'limitless-life')!;

const TARGET_SLUGS = [
  'bpc-157', 'tb-500', 'ghk-cu', 'semaglutide', 'tirzepatide', 
  'retatrutide', 'cjc-1295', 'ipamorelin', 'mk-677', 'sermorelin', 
  'tesamorelin', 'mots-c'
];

export function generateStaticParams() {
  return TARGET_SLUGS.map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  return params.then(({ slug }) => {
    const peptide = getPeptideBySlug(slug);
    if (!peptide || !TARGET_SLUGS.includes(slug)) return { title: 'Not Found' };

    const year = new Date().getFullYear();
    const title = `Where to Buy ${peptide.name} Online (${year}): COA-Verified Vendors + PEPTIDEX Discount | PeptiDex`;
    const description = `Looking for where to buy ${peptide.name}? Compare pricing, purity, and shipping from COA-verified research vendors. Save with code PEPTIDEX.`;

    const url = `https://peptidex.app/buy/${slug}`;

    return {
      title,
      description,
      alternates: { canonical: url },
      openGraph: { title, description, url, type: 'website' },
      twitter: { card: 'summary_large_image', title, description },
    };
  });
}

export default async function BuyPeptidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  if (!TARGET_SLUGS.includes(slug)) {
    const libraryEntry = getPeptideBySlug(slug);
    if (libraryEntry) {
      permanentRedirect(`/library/${slug}`);
    }
    notFound();
  }

  const peptide = getPeptideBySlug(slug);
  if (!peptide) notFound();

  const pricingEntry = vendorPricing.find((p) => p.slug === slug);
  const year = new Date().getFullYear();

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', url: 'https://peptidex.app' },
    { name: 'Where to Buy', url: 'https://peptidex.app/buy' },
    { name: peptide.name, url: `https://peptidex.app/buy/${slug}` }
  ]);

  const faqSchema = buildFAQPageSchema([
    { q: `Where is the best place to buy ${peptide.name}?`, a: `Amino Club and Bio Longevity Labs are highly rated sources for ${peptide.name}, both offering independent COAs and fast shipping.` },
    { q: `How much does ${peptide.name} cost?`, a: `Pricing for ${peptide.name} varies by vial size and vendor. Use code PEPTIDEX at Amino Club or Bio Longevity Labs to save ${_bioLongevity.discountPercent}-${_aminoClub.discountPercent}%.` },
    { q: `Is ${peptide.name} legal to buy?`, a: `In the United States, ${peptide.name} is generally sold legally as a research chemical not for human consumption, unless it is an FDA-approved compound requiring a prescription.` },
    { q: `How do I verify ${peptide.name} purity?`, a: `Always demand a batch-specific Certificate of Analysis (COA) from a third-party laboratory proving HPLC purity of 98%+ before purchasing ${peptide.name}.` },
    { q: `What's the PEPTIDEX discount code for ${peptide.name}?`, a: `Use code PEPTIDEX for ${_aminoClub.discountPercent}% off at Amino Club, or ${_bioLongevity.discountPercent}% off at Bio Longevity Labs and Limitless Life.` },
    { q: `Can I buy ${peptide.name} with a credit card?`, a: `Yes, select verified vendors on our list offer traditional credit card processing for ${peptide.name} purchases.` }
  ]);

  // Generate Product schema with Offers
  const inStockVendors = pricingEntry?.vendors.filter(v => v.inStock) ?? [];
  const productOffers = inStockVendors.map(v => {
    const vendorData = vendors.find(vd => vd.name === v.vendor);
    return {
        vendor: v.vendor,
        vendorUrl: vendorData ? `https://${vendorData.domainMatch}` : "https://peptidex.app/vendors",
        affiliateUrl: v.affiliateUrl,
        price_usd: v.price_usd,
        vial_mg: v.vial_mg,
        inStock: v.inStock,
        hasCoupon: !!vendorData?.discountCode,
        couponCode: vendorData?.discountCode,
        discountPct: vendorData?.discountPercent,
    };
  });

  const productSchema = buildProductSchema({
    id: `https://peptidex.app/buy/${slug}#product`,
    name: peptide.name,
    description: `Where to buy ${peptide.name}. Compare verified vendors, pricing, and active discount codes.`,
    offers: productOffers,
    dateModified: new Date().toISOString().split('T')[0],
  });

  const allSchemas: Record<string, unknown>[] = [breadcrumbSchema];
  if (faqSchema) {
      allSchemas.push(faqSchema);
  }
  if (productOffers.length > 0) {
    allSchemas.push(productSchema);
  }

  return (
    <main id="main-content">
      <SchemaInjector schema={allSchemas} />

      <BuyPageHero 
        peptideName={peptide.name} 
        subhead={`Compare verified vendors, pricing, and active discount codes for ${peptide.name} research.`} 
      />

      <div className="about-content reveal space-y-16">
        <WhereToBuySection 
          peptideName={peptide.name} 
          peptideSlug={peptide.slug} 
          pricingEntry={pricingEntry} 
          allVendors={vendors} 
        />

        <div className="mt-8 mb-16">
          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-6">
            <h3 className="text-lg font-bold text-emerald-400 flex items-center gap-2 mb-2">
              <ShieldCheck className="w-5 h-5" /> Why these vendors?
            </h3>
            <p className="text-zinc-300 text-sm leading-relaxed mb-3">
              The vendors listed above have passed PeptiDex's rigorous verification standards. They provide 
              transparent, third-party batch testing (COAs) utilizing both HPLC and Mass Spectrometry, ensuring 
              that the {peptide.name} you receive is authentic and highly pure ({'>'}98%).
            </p>
            <Link href="/about/methodology" className="text-emerald-400 hover:text-emerald-300 text-sm font-semibold underline underline-offset-4">
              Read our full vendor verification methodology
            </Link>
          </div>
        </div>

        <VendorMiniCards 
          peptideName={peptide.name} 
          pricingEntry={pricingEntry} 
          allVendors={vendors} 
        />

        <div className="mt-16 mb-12">
          <QuickReference peptide={peptide} />
        </div>

        <article className="prose prose-invert prose-violet max-w-none mb-16">
          <h2>How We Verify {peptide.name} Purity</h2>
          <p>
            Because {peptide.name} is often sold as a research chemical, it is not subject to FDA 
            manufacturing oversight. This means the market is flooded with under-dosed, impure, or completely 
            fake products. We protect researchers by demanding transparency.
          </p>
          <p>
            For a vendor to be listed on this page, they must provide a valid Certificate of Analysis (COA) 
            from an independent, US-based analytical laboratory (like MZ Biolabs or Janoshik). This COA must 
            prove that the {peptide.name} batch meets or exceeds 98% purity via High-Performance Liquid Chromatography (HPLC).
          </p>
          <p>
            <Link href="/tools/coa">Learn how to read and verify a COA yourself.</Link>
          </p>

          <h2>Frequently Asked Questions</h2>
          
          <h4 className="font-bold text-zinc-100">Where is the best place to buy {peptide.name}?</h4>
          <p>Amino Club and Bio Longevity Labs are highly rated sources for {peptide.name}, both offering independent COAs and fast shipping.</p>

          <h4 className="font-bold text-zinc-100">How much does {peptide.name} cost?</h4>
          <p>Pricing for {peptide.name} varies by vial size and vendor. Use code PEPTIDEX at Amino Club or Bio Longevity Labs to save {_bioLongevity.discountPercent}-{_aminoClub.discountPercent}% off list prices.</p>

          <h4 className="font-bold text-zinc-100">Is {peptide.name} legal to buy?</h4>
          <p>In the United States, {peptide.name} is generally sold legally strictly as a research chemical not for human consumption, unless it is an FDA-approved compound requiring a prescription.</p>

          <h4 className="font-bold text-zinc-100">What is the discount code for {peptide.name}?</h4>
          <p>Use code <strong>PEPTIDEX</strong> for {_aminoClub.discountPercent}% off at Amino Club, or {_bioLongevity.discountPercent}% off at Bio Longevity Labs, Pantheon Peptides, and Limitless Life.</p>
        </article>

        <TrustBlock />
      </div>
    </main>
  );
}
