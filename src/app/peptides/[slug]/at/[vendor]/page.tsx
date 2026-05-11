import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { peptides, getPeptideBySlug } from "@/data/peptides";
import { vendors } from "@/data/vendors";
import { getPseoPair, getPseoStaticParams, hasPricingData } from "@/lib/pseo-pairs";
import { generatePseoSchema } from "@/lib/pseo-schema";
import { PeptideVendorContent } from "./PeptideVendorContent";
import { PeptideVendorLogsClient } from "./PeptideVendorLogsClient";

// ── Static Params ────────────────────────────────────────────────────────────
// Decision 1: Dynamic. Pages exist only if vendor-pricing.ts has a real row.
// BUT: we still generate params for ALL combinations so that non-priced pages
// can render a noindex + fallback instead of 404 (preserves any existing links).

export function generateStaticParams() {
    const params: { slug: string; vendor: string }[] = [];
    for (const p of peptides) {
        for (const v of vendors) {
            params.push({ slug: p.slug, vendor: v.slug });
        }
    }
    return params;
}

// ── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string; vendor: string }>;
}): Promise<Metadata> {
    const { slug, vendor } = await params;
    const peptide = getPeptideBySlug(slug);
    const vendorObj = vendors.find(v => v.slug === vendor);
    if (!peptide || !vendorObj) return { title: "Not Found" };

    const pair = getPseoPair(slug, vendor);

    if (!pair) {
        // No pricing data — noindex this page
        return {
            title: `${peptide.name} from ${vendorObj.name} | PeptiDex`,
            robots: { index: false, follow: false },
        };
    }

    // Pricing-verified pair — full SEO metadata
    const discountedPrice = pair.pricing.price_usd * (1 - (pair.vendor.discountPercent ?? 0) / 100);
    const title = `Buy ${peptide.name} from ${vendorObj.name} — $${discountedPrice.toFixed(2)}/vial | PeptiDex`;
    const description = `${vendorObj.name} sells ${peptide.name} (${pair.pricing.vial_mg}mg vials) for $${pair.pricing.price_usd.toFixed(2)} before discount. ${vendorObj.purity} purity, ${vendorObj.coaStatus}. Compare with verified vendors.`;

    return {
        title,
        description,
        alternates: { canonical: `https://peptidex.app/peptides/${slug}/at/${vendor}` },
        openGraph: { title, description, url: `https://peptidex.app/peptides/${slug}/at/${vendor}` },
    };
}

// ── Page Component ───────────────────────────────────────────────────────────

export default async function PeptideAtVendorPage({
    params,
}: {
    params: Promise<{ slug: string; vendor: string }>;
}) {
    const { slug, vendor } = await params;
    const peptide = getPeptideBySlug(slug);
    const vendorObj = vendors.find(v => v.slug === vendor);
    if (!peptide || !vendorObj) notFound();

    const pair = getPseoPair(slug, vendor);
    const hasPricing = pair !== null;

    // ── Schema.org JSON-LD (only for pricing-verified pages) ────────────
    let schemaJsonLd: Record<string, unknown> | null = null;
    if (pair) {
        const discountedPrice = pair.pricing.price_usd * (1 - (pair.vendor.discountPercent ?? 0) / 100);
        schemaJsonLd = generatePseoSchema({
            pair,
            discountedPrice,
            // logCount and avgEfficacy will be populated when Supabase
            // build-time queries are available. For now, uses vendor-level
            // rating (per Decision 2: deterministic switch at logCount >= 5).
        });
    }

    return (
        <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
            {/* ── Schema.org JSON-LD ── */}
            {schemaJsonLd && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJsonLd) }}
                />
            )}

            {/* ── Page Header ── */}
            <div className="page-header">
                <div className="page-header-grid" />
                <div className="page-header-wrap">
                    <nav className="breadcrumb">
                        <Link href="/">Home</Link>
                        <span className="sep">/</span>
                        <Link href="/peptides">Peptides</Link>
                        <span className="sep">/</span>
                        <Link href={`/peptides/${slug}`}>{peptide.name}</Link>
                        <span className="sep">/</span>
                        <span className="current">{vendorObj.name}</span>
                    </nav>
                    <h1 className="page-title">
                        {hasPricing ? (
                            <>Buying <em>{peptide.name}</em> from {vendorObj.name}</>
                        ) : (
                            <><em>{peptide.name}</em> × {vendorObj.name}</>
                        )}
                    </h1>
                    <p className="page-subtitle">
                        {hasPricing ? (
                            <>
                                ${pair!.pricing.price_usd.toFixed(2)}/{pair!.pricing.vial_mg}mg vial
                                {(vendorObj.discountPercent ?? 0) > 0 && (
                                    <> · {vendorObj.discountPercent}% off with code {vendorObj.discountCode}</>
                                )}
                                {" "}· {vendorObj.purity} purity · {vendorObj.coaStatus}
                            </>
                        ) : (
                            <>Community-verified protocol data for {peptide.name} purchased from {vendorObj.name}.</>
                        )}
                    </p>
                </div>
            </div>

            {/* ── Content Body ── */}
            {pair ? (
                <>
                    <PeptideVendorContent pair={pair} />
                    <div className="about-content" style={{ maxWidth: 900 }}>
                        <div style={{
                            marginBottom: 32,
                            padding: "24px 28px",
                            background: "var(--bg-card)",
                            border: "1px solid var(--line)",
                            borderRadius: 16,
                        }}>
                            <h2 style={{
                                fontFamily: "var(--serif)",
                                fontSize: 20,
                                fontWeight: 600,
                                color: "var(--ink)",
                                marginBottom: 16,
                            }}>
                                Community Protocol Data
                            </h2>
                            <PeptideVendorLogsClient
                                peptideSlug={slug}
                                peptideName={peptide.name}
                                vendorSlug={vendor}
                                vendorName={vendorObj.name}
                                affiliateUrl={vendorObj.affiliateUrl}
                            />
                        </div>
                    </div>
                </>
            ) : (
                <PeptideVendorLogsClient
                    peptideSlug={slug}
                    peptideName={peptide.name}
                    vendorSlug={vendor}
                    vendorName={vendorObj.name}
                    affiliateUrl={vendorObj.affiliateUrl}
                />
            )}
        </div>
    );
}
