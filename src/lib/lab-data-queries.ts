/**
 * Shared DB fetch helpers for lab-data surfaces.
 * All queries hit the materialized view or base tables via service client.
 * Returns null fields when data is insufficient — callers render
 * "Data updating" placeholders instead of misleading numbers.
 */
import { createServerClient } from "@/lib/supabase-server";

// ── Row shapes (matches 004_coa_aggregation.sql) ───────────────────────────

export interface PurityRollingRow {
    vendor_slug: string;
    peptide_slug: string;
    coa_count: number;
    avg_purity: number | null;
    stddev_purity: number | null;
    min_purity: number | null;
    max_purity: number | null;
    latest_test: string | null;
    primary_lab: string | null;
}

export interface TrustScoreRow {
    vendor_slug: string;
    trust_score: number;
    purity_consistency: number;
    coa_recency_score: number;
    lab_credibility: number;
    catalog_coverage: number;
    total_coas: number;
    avg_purity: number | null;
    stddev_purity: number | null;
    last_coa_date: string | null;
    updated_at: string;
}

export interface CoaTimeSeriesRow {
    peptide_slug: string;
    purity_pct: number | null;
    test_date: string | null;
    batch_id: string | null;
    lab_name: string | null;
    source_url: string;
}

// ── Minimum data threshold — below this, show placeholder ────────────────

export const MIN_COA_COUNT = 3;

// ── Queries ───────────────────────────────────────────────────────────────

/** All vendor trust scores, descending */
export async function getAllTrustScores(): Promise<TrustScoreRow[]> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const db = createServerClient() as any;
    const { data } = await db
        .from("vendor_trust_scores")
        .select("*")
        .order("trust_score", { ascending: false });
    return (data || []) as TrustScoreRow[];
}

/** Rolling purity for a specific vendor's top N peptides */
export async function getVendorPurityHistory(
    vendorSlug: string,
    limit = 5
): Promise<PurityRollingRow[]> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const db = createServerClient() as any;
    const { data } = await db
        .from("mv_purity_rolling")
        .select("*")
        .eq("vendor_slug", vendorSlug)
        .gte("coa_count", MIN_COA_COUNT)
        .order("coa_count", { ascending: false })
        .limit(limit);
    return (data || []) as PurityRollingRow[];
}

/** Rolling purity for a specific peptide across all vendors */
export async function getPeptidePurityAcrossVendors(
    peptideSlug: string
): Promise<PurityRollingRow[]> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const db = createServerClient() as any;
    const { data } = await db
        .from("mv_purity_rolling")
        .select("*")
        .eq("peptide_slug", peptideSlug)
        .gte("coa_count", MIN_COA_COUNT)
        .order("avg_purity", { ascending: false });
    return (data || []) as PurityRollingRow[];
}

/** Time-series COA records for a vendor+peptide pair (sparkline data) */
export async function getCoaTimeSeries(
    vendorSlug: string,
    peptideSlug: string
): Promise<CoaTimeSeriesRow[]> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const db = createServerClient() as any;
    const { data } = await db
        .from("coa_records")
        .select("peptide_slug, purity_pct, test_date, batch_id, lab_name, source_url")
        .eq("vendor_slug", vendorSlug)
        .eq("peptide_slug", peptideSlug)
        .eq("flagged", false)
        .not("purity_pct", "is", null)
        .order("test_date", { ascending: true })
        .limit(24); // max 24 months
    return (data || []) as CoaTimeSeriesRow[];
}
