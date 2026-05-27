/**
 * /tools/price-tracker — Server Component
 * =========================================
 * This page reads ONLY from the `listings` Supabase table.
 * It does NOT fetch external sites, scrape vendors, or call pricing APIs.
 * All pricing math lives in src/lib/pricing/. The UI is in PriceTrackerClient.tsx.
 *
 * SSR strategy: data is fetched server-side so the HTML contains real rows
 * for Google and LLM crawlers. The client component receives the pre-fetched
 * rows as props and handles filtering/sorting on the client.
 *
 * If the listings table is empty (migration not yet run), renders gracefully
 * with an empty state rather than erroring.
 */

import { Metadata } from "next";
import { createServerClient } from "@/lib/supabase-server";
import PriceTrackerClient, { type ListingRow } from "./PriceTrackerClient";

// ─── Metadata ─────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Peptide Price Tracker (2026): Vendor Listings Sorted by $/mg",
  description:
    "Compare research peptide prices across verified vendors — sorted by real USD cost-per-mg. " +
    "BPC-157, TB-500, Semaglutide, Tirzepatide, Ipamorelin and more. Affiliate rankings never alter order.",
  alternates: {
    canonical: "https://peptidex.app/tools/price-tracker",
  },
  openGraph: {
    title: "Peptide Price Tracker — Sorted by $/mg (USD)",
    description:
      "Live vendor listings for research peptides, normalized to USD $/mg. " +
      "Filter by route, stock, and 3rd-party testing.",
    url: "https://peptidex.app/tools/price-tracker",
    type: "website",
    images: [
      {
        url: "https://peptidex.app/api/og?type=tools&tool=price-tracker",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Peptide Price Tracker — $/mg Normalized | PeptiDex",
    description:
      "Research peptide prices sorted by USD $/mg. Filter by vendor, route, stock.",
  },
};

// ─── JSON-LD Schema ────────────────────────────────────────────────────────────

const pageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Peptide Price Tracker 2026",
  url: "https://peptidex.app/tools/price-tracker",
  description:
    "Live research peptide price comparison across verified vendors, sorted by USD cost-per-mg.",
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home",  item: "https://peptidex.app" },
      { "@type": "ListItem", position: 2, name: "Tools", item: "https://peptidex.app/tools" },
      { "@type": "ListItem", position: 3, name: "Price Tracker", item: "https://peptidex.app/tools/price-tracker" },
    ],
  },
};

// ─── Data fetching ─────────────────────────────────────────────────────────────

async function fetchListings(): Promise<ListingRow[]> {
  try {
    const supabase = createServerClient();
    const { data, error } = await supabase
      .from("listings")
      .select("*")
      .order("price_per_mg_usd", { ascending: true, nullsFirst: false });

    if (error) {
      // Table may not exist yet if migration hasn't run — degrade gracefully
      console.error("[price-tracker] Supabase query error:", error.message);
      return [];
    }

    return (data ?? []) as ListingRow[];
  } catch (err) {
    // Service role key not configured in this environment
    console.error("[price-tracker] Failed to create Supabase client:", err);
    return [];
  }
}

// ─── SSR-rendered listing table (for crawlers) ────────────────────────────────
// Positioned off-screen visually but present in HTML. Mirrors the pattern from
// src/app/tools/evidence/page.tsx (SSRRankingTable).

function SSRListingTable({ listings }: { listings: ListingRow[] }) {
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

export default async function PriceTrackerPage() {
  // Server-side Supabase fetch — data is in HTML for crawlers
  const listings = await fetchListings();

  return (
    <>
      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />

      {/* SSR table for crawlers (off-screen, aria-hidden) */}
      <SSRListingTable listings={listings} />

      {/* Client component receives pre-fetched rows as props */}
      <PriceTrackerClient listings={listings} />
    </>
  );
}
