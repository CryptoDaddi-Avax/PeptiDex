import { Metadata } from "next";
import { SITE_STATS } from "@/data/site-stats";
import PricingClient from "./PricingClient";

export const metadata: Metadata = {
    title: "Peptide Price Comparison (2026): Live Vendor Prices + PEPTIDEX Discount",
    description: `Compare peptide prices across ${SITE_STATS.vendors.count} COA-verified vendors. Use code PEPTIDEX for 15–20% off at checkout. Updated May 2026.`,
    alternates: {
        canonical: "https://peptidex.app/tools/pricing",
    },
    openGraph: {
        title: "Peptide Price Comparison (2026) — PEPTIDEX Discount Applied",
        description: `Compare research peptide prices across ${SITE_STATS.vendors.count} COA-verified vendors with PEPTIDEX discount code applied. BPC-157, TB-500, Ipamorelin, and more.`,
        url: "https://peptidex.app/tools/pricing",
        type: "website",
        images: [{ url: "https://peptidex.app/api/og?type=tools&tool=pricing", width: 1200, height: 630 }],
    },
    twitter: {
        card: "summary_large_image",
        title: "Peptide Price Comparison (2026) — PEPTIDEX Discount",
        description: `Compare ${SITE_STATS.vendors.count} COA-verified peptide vendors with PEPTIDEX discount code applied. Live prices for BPC-157, TB-500, Ipamorelin & more.`,
    },
};

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

export default function PricingPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(pricingSchema) }}
            />
            <PricingClient />
        </>
    );
}
