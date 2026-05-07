import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getPeptideBySlug } from '@/data/peptides';
import { vendorsSorted } from '@/data/vendors';
import { VendorRankCard } from '@/components/vendors/VendorRankCard';
import { PriceComparisonTable } from '@/components/wheretobuy/PriceComparisonTable';
import { VendorsFAQ } from '@/components/vendors/VendorsFAQ';
import { buildBreadcrumbSchema, buildItemListSchema, buildFAQPageSchema } from '@/lib/seo/schema';
import '@/app/vendors/vendors-redesign.css';

const TARGET_SLUGS = [
  'bpc-157', 'tb-500', 'retatrutide', 'tirzepatide', 'semaglutide', 
  'ipamorelin', 'cjc-1295', 'ghk-cu', 'mots-c', 'epitalon'
];

export function generateStaticParams() {
  return TARGET_SLUGS.map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  return params.then(({ slug }) => {
    const peptide = getPeptideBySlug(slug);
    if (!peptide) return { title: "Not Found" };

    const title = `Where to Buy ${peptide.name} Online in 2026 | COA-Verified Vendors | PeptiDex`;
    const description = `Looking for where to buy ${peptide.name}? Compare the best COA-verified vendors for ${peptide.name} based on purity, price, and shipping. Research use only.`;
    const url = `https://peptidex.app/where-to-buy/${slug}`;

    return {
      title,
      description,
      keywords: [
        `where to buy ${peptide.name}`,
        `where to buy ${peptide.name} online`,
        `best place to buy ${peptide.name}`,
        `buy ${peptide.name} 2026`,
        `${peptide.name} vendors`,
        `${peptide.name} price comparison`
      ],
      alternates: {
        canonical: url,
      },
      openGraph: {
        title,
        description,
        url,
        type: 'article',
        images: [{ url: '/og-image.png', width: 1200, height: 630 }],
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: ['/og-image.png'],
      },
    };
  });
}

// Helper to generate dynamic FAQ for this peptide
function generatePeptideFAQ(peptideName: string, slug: string) {
  return [
    {
      q: `Where is the best place to buy ${peptideName} online?`,
      a: `Based on our independent 2026 evaluation, the best place to buy ${peptideName} is from vendors that provide batch-specific HPLC and Mass Spectrometry Certificates of Analysis (COA). We recommend checking our top-ranked vendors above, who all require rigorous third-party testing. Use code PEPTIDEX for exclusive discounts.`,
    },
    {
      q: `Is it legal to buy ${peptideName}?`,
      a: `${peptideName} is available for purchase strictly as a research chemical for laboratory use only. It is not approved by the FDA for human consumption. Always verify the legal status in your local jurisdiction before purchasing. → Read more at peptidex.app/library/${slug}`,
    },
    {
      q: `How do I verify the purity of ${peptideName}?`,
      a: `Always request the Certificate of Analysis (COA) for the specific batch you receive. A legitimate COA for ${peptideName} should show HPLC purity of ≥98% (ideally ≥99%) and Mass Spectrometry confirmation of its exact molecular weight. You can verify any COA using our free COA Analyzer at peptidex.app/tools/coa.`,
    },
    {
      q: `What is the typical price for ${peptideName}?`,
      a: `The price of ${peptideName} varies depending on the vendor, synthesis quality, and vial size. Check our live price comparison table above to compare the cost per vial and cost per mg across verified vendors.`,
    }
  ];
}

export default async function WhereToBuyPeptidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  if (!TARGET_SLUGS.includes(slug)) {
    notFound();
  }

  const peptide = getPeptideBySlug(slug);
  if (!peptide) notFound();

  // Filter vendors that carry this compound
  const carryingVendors = vendorsSorted.filter(vendor => {
    return !vendor.compounds || vendor.compounds.includes(slug);
  });

  const faqs = generatePeptideFAQ(peptide.name, slug);

  // JSON-LD Schemas
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "PeptiDex", url: "https://peptidex.app" },
    { name: "Where to Buy Peptides", url: "https://peptidex.app/where-to-buy" },
    { name: `Where to Buy ${peptide.name}`, url: `https://peptidex.app/where-to-buy/${slug}` }
  ]);

  const itemListSchema = buildItemListSchema({
    name: `Best Places to Buy ${peptide.name} Online`,
    description: `Ranking of COA-verified research peptide vendors that carry ${peptide.name}.`,
    items: carryingVendors.map((v) => ({
      name: v.name,
      description: v.tagline,
      url: `https://peptidex.app/where-to-buy/${slug}#${v.slug}`
    }))
  });

  const faqSchema = buildFAQPageSchema(faqs);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <header className="vn-page-header">
        <div className="vn-header-grid" aria-hidden="true" />
        <div className="vn-header-wrap">
          <nav className="vn-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span className="sep" aria-hidden="true">/</span>
            <Link href="/where-to-buy">Where to Buy</Link>
            <span className="sep" aria-hidden="true">/</span>
            <span className="current">{peptide.name}</span>
          </nav>

          <h1 className="vn-page-title">
            Where to Buy {peptide.name} Online (2026): {carryingVendors.length} Verified Vendors
          </h1>

          <p className="vn-subtitle" style={{ maxWidth: '800px' }}>
            {peptide.name} {peptide.aliases.length > 0 ? `(${peptide.aliases.join(', ')})` : ''} is a widely researched {peptide.category.toLowerCase()} known primarily for {peptide.primary_benefits.toLowerCase()}. 
            Below is our updated 2026 directory of independent, COA-verified vendors that carry {peptide.name}.
            Read the full <Link href={`/library/${slug}`} className="text-amber-500 hover:underline">research profile and dosage guide for {peptide.name}</Link>.
          </p>
        </div>
      </header>

      <div className="vn-container">
        <PriceComparisonTable peptideSlug={slug} peptideName={peptide.name} />
      </div>

      <div className="vn-container">
        <div className="vn-section-label" style={{ marginTop: '80px' }}>§ Verified Vendors Carrying {peptide.name}</div>
        <div className="vrk-list">
          {carryingVendors.map((vendor, i) => (
            <VendorRankCard
              key={vendor.slug}
              vendor={vendor}
              rank={i + 1}
            />
          ))}
        </div>
      </div>

      <section className="vn-extra-section" id="verify-purity">
        <div className="vn-container">
          <div className="vn-section-label">§ Buyer's Guide</div>
          <h2 className="vn-extra-title">
            How to Verify <em>{peptide.name}</em> Purity
          </h2>
          <div className="vbg-content">
            <p style={{ fontFamily: 'var(--serif)', fontSize: '17px', lineHeight: '1.75', color: 'var(--ink-dim)', marginBottom: '16px' }}>
              When sourcing {peptide.name} for research, the only acceptable proof of purity is a batch-specific Certificate of Analysis (COA) from an independent testing laboratory. Do not accept generic COAs that cover multiple batches or COAs issued by the vendor's own facility.
            </p>
            <p style={{ fontFamily: 'var(--serif)', fontSize: '17px', lineHeight: '1.75', color: 'var(--ink-dim)', marginBottom: '16px' }}>
              <strong>Look for two key tests:</strong>
              <br />
              1. <strong>HPLC (High-Performance Liquid Chromatography)</strong>: Confirms the purity percentage. For {peptide.name}, you should demand ≥99% purity.
              <br />
              2. <strong>Mass Spectrometry (MS)</strong>: Confirms the exact molecular identity of the compound.
            </p>
            <p style={{ fontFamily: 'var(--serif)', fontSize: '17px', lineHeight: '1.75', color: 'var(--ink-dim)' }}>
              If you have received a COA for {peptide.name} and want to verify its authenticity, use our free <Link href="/tools/coa" className="vbg-link">COA Analyzer</Link> to cross-reference the data against established molecular baselines.
            </p>
          </div>
        </div>
      </section>

      <div className="vn-container">
        <VendorsFAQ faqs={faqs} />
      </div>

      <div className="vn-container">
        <div className="vn-page-footer-note">
          <p>
            <strong>Research Use Only.</strong> {peptide.name} and all other peptides listed on PeptiDex are
            sold by third-party vendors for laboratory and scientific research purposes
            only. They are not intended for human consumption, therapeutic use, or
            veterinary application.{' '}
            <Link href="/disclaimer" style={{ color: 'var(--gold)' }}>
              Read full disclaimer →
            </Link>
          </p>
          <p>
            <strong>Affiliate Disclosure.</strong> Some links on this page are affiliate
            links marked with <code>rel="sponsored nofollow"</code>. PeptiDex may
            earn a commission at no cost to you.
          </p>
        </div>
      </div>
    </>
  );
}
