/**
 * COA Crawler Orchestrator
 * ========================
 * Runs all adapters, validates, deduplicates, and inserts into Supabase.
 * Recalculates trust scores after each run.
 */

import type { VendorCoaAdapter, RawCoaEntry, CrawlResult } from "./types";
import { calculateTrustScore } from "./trust-calculator";
import { lookupLab } from "@/data/coa-labs";
import { AminoClubAdapter } from "./adapters/amino-club";
import { AscensionAdapter } from "./adapters/ascension";

// Register all adapters — Phase 1: Amino Club + Ascension Peptides
const ADAPTERS: VendorCoaAdapter[] = [
    new AminoClubAdapter(),
    new AscensionAdapter(),
    // new BioLongevityAdapter(),  // Phase 2
    // new PantheonAdapter(),      // Phase 2
];

interface OrchestratorResult {
    runId: string;
    results: CrawlResult[];
    totalFound: number;
    totalNew: number;
}

export async function runCrawl(supabase: ReturnType<typeof import("@/lib/supabase-server").createServerClient>): Promise<OrchestratorResult> {
    const runId = `crawl_${Date.now()}`;

    // Create audit log entry
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (supabase as any).from("coa_crawl_runs").insert({
        id: runId,
        started_at: new Date().toISOString(),
        status: "running",
    });

    const results: CrawlResult[] = [];
    let totalFound = 0;
    let totalNew = 0;

    for (const adapter of ADAPTERS) {
        const result: CrawlResult = {
            vendorSlug: adapter.vendorSlug,
            found: 0,
            newInserts: 0,
            errors: [],
        };

        try {
            const entries = await adapter.discover();
            result.found = entries.length;

            for (const entry of entries) {
                try {
                    const insertResult = await insertCoaRecord(supabase, entry, adapter.vendorSlug, runId);
                    if (insertResult.isNew) result.newInserts++;
                } catch (err) {
                    result.errors.push(`Insert failed for ${entry.peptideSlug}: ${(err as Error).message}`);
                }
            }

            // Recalculate trust score for this vendor
            await recalcTrustScore(supabase, adapter.vendorSlug);
        } catch (err) {
            result.errors.push(`Adapter error: ${(err as Error).message}`);
        }

        totalFound += result.found;
        totalNew += result.newInserts;
        results.push(result);

        // 5s cooldown between vendors
        await new Promise(r => setTimeout(r, 5000));
    }

    // Refresh materialized view
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (supabase as any).rpc("refresh_coa_views");

    // Update audit log
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (supabase as any).from("coa_crawl_runs").update({
        finished_at: new Date().toISOString(),
        status: "completed",
        vendors_hit: results.length,
        coas_found: totalFound,
        coas_new: totalNew,
        errors: results.flatMap(r => r.errors),
    }).eq("id", runId);

    return { runId, results, totalFound, totalNew };
}

// ── Insert with validation ──────────────────────────────────────────────────

async function insertCoaRecord(
    supabase: ReturnType<typeof import("@/lib/supabase-server").createServerClient>,
    entry: RawCoaEntry,
    vendorSlug: string,
    runId: string
): Promise<{ isNew: boolean }> {
    // Validation: flag outliers
    let flagged = false;
    let flagReason: string | null = null;

    if (entry.purity !== undefined && (entry.purity < 85 || entry.purity > 100)) {
        flagged = true;
        flagReason = `Purity ${entry.purity}% outside expected range (85-100%)`;
    }

    // Resolve lab tier
    let labTier: string | null = null;
    if (entry.labName) {
        const lab = lookupLab(entry.labName);
        labTier = lab?.tier ?? "unverified";
    }

    const row = {
        vendor_slug: vendorSlug,
        peptide_slug: entry.peptideSlug,
        batch_id: entry.batchId || null,
        test_date: entry.testDate || null,
        purity_pct: entry.purity ?? null,
        molecular_weight: entry.molecularWeight || null,
        lab_name: entry.labName || null,
        lab_tier: labTier,
        test_methods: entry.methods || [],
        source_url: entry.sourceUrl,
        source_type: "crawler",
        pdf_hash: entry.pdfHash || null,
        raw_extracted: entry as unknown as Record<string, unknown>,
        flagged,
        flag_reason: flagReason,
        crawl_run_id: runId,
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await (supabase as any)
        .from("coa_records")
        .upsert(row, {
            onConflict: "vendor_slug,peptide_slug,batch_id,source_url",
            ignoreDuplicates: true,
        });

    if (error) throw new Error(error.message);
    return { isNew: !error };
}

// ── Recalculate trust score ──────────────────────────────────────────────────

async function recalcTrustScore(
    supabase: ReturnType<typeof import("@/lib/supabase-server").createServerClient>,
    vendorSlug: string
) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: rows } = await (supabase as any)
        .from("coa_records")
        .select("purity_pct, test_date, lab_name, lab_tier, peptide_slug")
        .eq("vendor_slug", vendorSlug)
        .eq("flagged", false);

    if (!rows || rows.length === 0) return;

    const result = calculateTrustScore(vendorSlug, rows);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (supabase as any)
        .from("vendor_trust_scores")
        .upsert({
            vendor_slug: vendorSlug,
            trust_score: result.trustScore,
            purity_consistency: result.purityConsistency,
            coa_recency_score: result.coaRecencyScore,
            lab_credibility: result.labCredibility,
            catalog_coverage: result.catalogCoverage,
            total_coas: result.totalCoas,
            avg_purity: result.avgPurity,
            stddev_purity: result.stddevPurity,
            last_coa_date: result.lastCoaDate,
            updated_at: new Date().toISOString(),
        }, { onConflict: "vendor_slug" });
}
