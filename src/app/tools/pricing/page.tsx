/**
 * /tools/pricing — Server Component
 * ====================================
 * Canonical price comparison page. Prices come from src/data/vendor-pricing.ts
 * and are rendered by PricingClient.
 *
 * fix(seo): B2 — /tools/price-tracker has been merged here and redirected.
 * This is now the single canonical price tool URL.
 * All pricing math lives in src/lib/pricing/. The UI is in PricingClient.tsx.
 */

import { Metadata } from "next";
import { SITE_STATS } from "@/data/site-stats";
import PricingClient from "./PricingClient";

// ─── Metadata ─────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
    title: "Peptide Price Comparison 2026 — $/mg Sorted | PeptiDex",
    description: `Compare research peptide prices across ${SITE_STATS.vendors.count} COA-verified vendors, sorted by USD $/mg. Use code PEPTIDEX for 15–20% off. Updated 2026.`,
    alternates: {
        canonical: "https://peptidex.app/tools/pricing",
    },
    openGraph: {
        title: "Peptide Price Comparison 2026 — PEPTIDEX Discount Applied",
        description: `Compare research peptide prices across ${SITE_STATS.vendors.count} COA-verified vendors with PEPTIDEX discount code applied. BPC-157, TB-500, Ipamorelin, and more.`,
        url: "https://peptidex.app/tools/pricing",
        type: "website",
        images: [{ url: "https://peptidex.app/api/og?type=tools&tool=pricing", width: 1200, height: 630 }],
    },
    twitter: {
        card: "summary_large_image",
        title: "Peptide Price Comparison 2026 — PEPTIDEX Discount",
        description: `Compare ${SITE_STATS.vendors.count} COA-verified peptide vendors with PEPTIDEX discount code applied. Live prices for BPC-157, TB-500, Ipamorelin & more.`,
    },
};

// ─── JSON-LD Schema ────────────────────────────────────────────────────────────

const pricingSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Peptide Price Comparison 2026",
    "url": "https://peptidex.app/tools/pricing",
    "description": `Side-by-side peptide price comparison across ${SITE_STATS.vendors.count} COA-verified research vendors with PEPTIDEX discount codes.`,
    "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://peptidex.app" },
            { "@type": "ListItem", "position": 2, "name": "Tools", "item": "https://peptidex.app/tools" },
            { "@type": "ListItem", "position": 3, "name": "Price Comparison", "item": "https://peptidex.app/tools/pricing" },
        ]
    }
};

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function PricingPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(pricingSchema) }}
            />
            {/* Client component — uses the vendorPricing data source */}
            <PricingClient />
        </>
    );
}
