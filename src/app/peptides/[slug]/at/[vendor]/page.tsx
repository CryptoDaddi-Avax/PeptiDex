import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { peptides, getPeptideBySlug } from "@/data/peptides";
import { vendors } from "@/data/vendors";
import { vendorPricing } from "@/data/vendor-pricing";
import { PeptideVendorLogsClient } from "./PeptideVendorLogsClient";

// ── Vendor name → slug mapping (matches vial-optimizer.ts) ──────────────────
const VENDOR_NAME_TO_SLUG: Record<string, string> = {
    "Amino Club": "amino-club",
    "Bio Longevity Labs": "bio-longevity-labs",
    "Limitless Life": "limitless-life",
    "Ascension Peptides": "ascension-peptides",
    "Pantheon Peptides": "pantheon-peptides",
    "LVLUP Health": "lvlup-health",
};

/**
 * Returns true if vendor-pricing.ts has at least one pricing row
 * for this (peptideSlug, vendorSlug) pair.
 */
function hasPricingData(peptideSlug: string, vendorSlug: string): boolean {
    const entry = vendorPricing.find(p => p.slug === peptideSlug);
    if (!entry) return false;
    return entry.vendors.some(v => {
        const resolvedSlug = VENDOR_NAME_TO_SLUG[v.vendor] ?? v.vendor.toLowerCase().replace(/\s+/g, "-");
        return resolvedSlug === vendorSlug;
    });
}

export function generateStaticParams() {
    const params: { slug: string; vendor: string }[] = [];
    for (const p of peptides) {
        for (const v of vendors) {
            params.push({ slug: p.slug, vendor: v.slug });
        }
    }
    return params;
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string; vendor: string }>;
}): Promise<Metadata> {
    const { slug, vendor } = await params;
    const peptide = getPeptideBySlug(slug);
    const vendorObj = vendors.find(v => v.slug === vendor);
    if (!peptide || !vendorObj) return { title: "Not Found" };

    const hasPricing = hasPricingData(slug, vendor);

    const title = `${peptide.name} from ${vendorObj.name} — Community Protocol Data | PeptiDex`;
    const description = `Community-verified efficacy, side effects, and outcome reports for ${peptide.name} purchased from ${vendorObj.name}. Weighted by verification level.`;

    return {
        title,
        description,
        alternates: { canonical: `https://peptidex.app/peptides/${slug}/at/${vendor}` },
        openGraph: { title, description, url: `https://peptidex.app/peptides/${slug}/at/${vendor}` },
        // ── SEO TRIAGE: noindex pages without pricing data ──────────────
        // These ~232 pages have no vendor pricing and are near-empty.
        // noindex prevents Google from treating them as doorway pages.
        // Remove this guard once the pSEO content template populates them.
        ...(hasPricing ? {} : {
            robots: {
                index: false,
                follow: false,
            },
        }),
    };
}

export default async function PeptideAtVendorPage({
    params,
}: {
    params: Promise<{ slug: string; vendor: string }>;
}) {
    const { slug, vendor } = await params;
    const peptide = getPeptideBySlug(slug);
    const vendorObj = vendors.find(v => v.slug === vendor);
    if (!peptide || !vendorObj) notFound();

    return (
        <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
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
                        <em>{peptide.name}</em> × {vendorObj.name}
                    </h1>
                    <p className="page-subtitle">
                        Community-verified protocol data for {peptide.name} purchased from {vendorObj.name}.
                        Weighted by verification level (lab-confirmed 3×, verified buyer 2×, self-reported 1×).
                    </p>
                </div>
            </div>

            <PeptideVendorLogsClient
                peptideSlug={slug}
                peptideName={peptide.name}
                vendorSlug={vendor}
                vendorName={vendorObj.name}
                affiliateUrl={vendorObj.affiliateUrl}
            />
        </div>
    );
}
