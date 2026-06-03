/**
 * /tools/pricing — Server Component
 * ====================================
 * Canonical price comparison page. Fetches live data from the `listings`
 * Supabase table server-side so HTML contains real rows for crawlers.
 *
 * fix(seo): B2 — /tools/price-tracker has been merged here and redirected.
 * This is now the single canonical price tool URL.
 * All pricing math lives in src/lib/pricing/. The UI is in PricingClient.tsx.
 *
 * If the listings table is empty (migration not yet run), renders gracefully
 * with an empty state via the client component.
 */

import { Metadata } from "next";
import { SITE_STATS } from "@/data/site-stats";
import { createServerClient } from "@/lib/supabase-server";
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

// ─── Minimal row type for the SSR crawler table ──────────────────────────────

interface SSRRow {
    id: string;
    vendor_name: string;
    peptide_name: string;
    route: string;
    vial_size_mg: number | null;
    quantity: number;
    total_mg: number | null;
    price_usd: number;
    price_per_mg_usd: number | null;
    in_stock: boolean;
    last_checked_at: string;
}

// ─── Data fetching ─────────────────────────────────────────────────────────────

async function fetchListings(): Promise<SSRRow[]> {
    try {
        const supabase = createServerClient();
        const { data, error } = await supabase
            .from("listings")
            .select("*")
            .order("price_per_mg_usd", { ascending: true, nullsFirst: false });

        if (error) {
            console.error("[pricing] Supabase query error:", error.message);
            return [];
        }

        return (data ?? []) as SSRRow[];
    } catch (err) {
        console.error("[pricing] Failed to create Supabase client:", err);
        return [];
    }
}

// ─── SSR-rendered listing table (for crawlers) ────────────────────────────────

function SSRListingTable({ listings }: { listings: SSRRow[] }) {
    if (listings.length === 0) return null;
    return (
        <div
            aria-hidden="true"
            style={{ position: "absolute", left: "-9999px", top: 0, width: 1 }}
        >
            <table>
                <caption>Research peptide vendor price listings</caption>
                <thead>
                    <tr>
                        <th>Vendor</th>
                        <th>Peptide</th>
                        <th>Route</th>
                        <th>Vial size (mg)</th>
                        <th>Quantity</th>
                        <th>Total mg</th>
                        <th>Price (USD)</th>
                        <th>$/mg (USD)</th>
                        <th>In stock</th>
                        <th>Last checked</th>
                    </tr>
                </thead>
                <tbody>
                    {listings.map((row) => (
                        <tr key={row.id}>
                            <td>{row.vendor_name}</td>
                            <td>{row.peptide_name}</td>
                            <td>{row.route}</td>
                            <td>{row.vial_size_mg ?? "—"}</td>
                            <td>{row.quantity}</td>
                            <td>{row.total_mg ?? "—"}</td>
                            <td>${row.price_usd.toFixed(2)}</td>
                            <td>{row.price_per_mg_usd !== null ? `$${row.price_per_mg_usd.toFixed(4)}` : "—"}</td>
                            <td>{row.in_stock ? "In stock" : "Out of stock"}</td>
                            <td>{new Date(row.last_checked_at).toLocaleDateString("en-US")}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default async function PricingPage() {
    // Server-side fetch — real data in HTML for crawlers
    const listings = await fetchListings();

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(pricingSchema) }}
            />
            {/* SSR table for crawlers (off-screen, aria-hidden) */}
            <SSRListingTable listings={listings} />
            {/* Client component — uses its own vendorPricing data source */}
            <PricingClient />
        </>
    );
}
