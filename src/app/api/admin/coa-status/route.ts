/**
 * GET /api/admin/coa-status
 * =========================
 * Admin endpoint for crawl health monitoring.
 * Returns: crawl run history, per-vendor trust scores,
 *          flagged records, and catalog coverage stats.
 *
 * Protected by CRON_SECRET (same token as other admin endpoints).
 */
import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase-server";

export const dynamic = "force-dynamic";

// ── DB row shapes (tables from 004_coa_aggregation.sql) ─────────────────────

interface CrawlRun {
    id: string;
    started_at: string;
    finished_at: string | null;
    status: string;
    vendors_hit: number;
    coas_found: number;
    coas_new: number;
    errors: string[];
}

interface TrustScore {
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

interface CoaRow {
    vendor_slug: string;
    peptide_slug: string | null;
    purity_pct: number | null;
    test_date: string | null;
    flagged: boolean;
}

export async function GET(request: NextRequest) {
    // Auth
    const secret = request.headers.get("authorization")?.replace("Bearer ", "")
        || request.nextUrl.searchParams.get("secret");

    if (secret !== process.env.CRON_SECRET) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Use service client; cast to any since new tables aren't in generated types yet
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const db = createServerClient() as any;

    // Fetch last 10 crawl runs
    const { data: runsRaw, error: runsError } = await db
        .from("coa_crawl_runs")
        .select("*")
        .order("started_at", { ascending: false })
        .limit(10);
    const runs = (runsRaw || []) as CrawlRun[];

    // All trust scores
    const { data: scoresRaw } = await db
        .from("vendor_trust_scores")
        .select("*")
        .order("trust_score", { ascending: false });
    const trustScores = (scoresRaw || []) as TrustScore[];

    // Flagged records count
    const { count: flaggedCount } = await db
        .from("coa_records")
        .select("id", { count: "exact", head: true })
        .eq("flagged", true);

    // Per-vendor rows for summary
    const { data: vendorRowsRaw } = await db
        .from("coa_records")
        .select("vendor_slug, peptide_slug, purity_pct, test_date, flagged")
        .order("test_date", { ascending: false });
    const vendorRows = (vendorRowsRaw || []) as CoaRow[];

    // Group by vendor
    const vendorSummary: Record<string, {
        totalCoas: number;
        uniquePeptides: Set<string>;
        recentDate: string | null;
        flaggedCount: number;
        avgPurity: number | null;
    }> = {};

    for (const row of vendorRows) {
        const slug = row.vendor_slug;
        if (!vendorSummary[slug]) {
            vendorSummary[slug] = { totalCoas: 0, uniquePeptides: new Set(), recentDate: null, flaggedCount: 0, avgPurity: null };
        }
        vendorSummary[slug].totalCoas++;
        if (row.peptide_slug) vendorSummary[slug].uniquePeptides.add(row.peptide_slug);
        if (!vendorSummary[slug].recentDate && row.test_date) vendorSummary[slug].recentDate = row.test_date;
        if (row.flagged) vendorSummary[slug].flaggedCount++;
    }

    // Avg purity per vendor
    for (const slug of Object.keys(vendorSummary)) {
        const rows = vendorRows.filter(r => r.vendor_slug === slug && !r.flagged && r.purity_pct !== null);
        if (rows.length > 0) {
            const sum = rows.reduce((s, r) => s + (r.purity_pct as number), 0);
            vendorSummary[slug].avgPurity = Math.round((sum / rows.length) * 100) / 100;
        }
    }

    // Serialize (Sets aren't JSON-serialisable)
    const vendorSummaryJson = Object.fromEntries(
        Object.entries(vendorSummary).map(([k, v]) => [k, {
            totalCoas: v.totalCoas,
            uniquePeptides: v.uniquePeptides.size,
            recentDate: v.recentDate,
            flaggedCount: v.flaggedCount,
            avgPurity: v.avgPurity,
        }])
    );

    const lastRun = runs[0] ?? null;
    const isHealthy = lastRun
        ? lastRun.status === "completed"
            && (Date.now() - new Date(lastRun.started_at).getTime()) < 8 * 24 * 60 * 60 * 1000
        : false;

    return NextResponse.json({
        status: isHealthy ? "healthy" : "degraded",
        lastRun: lastRun ? {
            id: lastRun.id,
            startedAt: lastRun.started_at,
            finishedAt: lastRun.finished_at,
            status: lastRun.status,
            vendorsHit: lastRun.vendors_hit,
            coasFound: lastRun.coas_found,
            coasNew: lastRun.coas_new,
            errorCount: lastRun.errors?.length ?? 0,
            errors: lastRun.errors,
        } : null,
        recentRuns: runs.map(r => ({
            id: r.id,
            date: r.started_at,
            status: r.status,
            found: r.coas_found,
            new: r.coas_new,
            errors: r.errors?.length ?? 0,
        })),
        trustScores,
        vendorSummary: vendorSummaryJson,
        flaggedRecords: {
            count: flaggedCount ?? 0,
        },
        generatedAt: new Date().toISOString(),
        ...(runsError ? { _dbError: (runsError as { message: string }).message } : {}),
    });
}
