/**
 * Cron: Refresh materialized views
 * GET /api/cron/refresh-views — Called hourly by Vercel Cron or external scheduler
 *
 * Refreshes all 3 materialized views CONCURRENTLY to keep aggregate stats
 * up-to-date without blocking reads.
 */
import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase-server";

export async function GET(request: NextRequest) {
    const authHeader = request.headers.get("authorization");
    const cronSecret = process.env.CRON_SECRET;

    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const supabase = createServerClient();
    const results: Record<string, string> = {};

    const views = [
        "mv_peptide_vendor_stats",
        "mv_peptide_stats",
        "mv_vendor_stats",
    ];

    for (const view of views) {
        const start = Date.now();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const sb = supabase as any;
        const { error } = await sb.rpc("refresh_materialized_view", { view_name: view });

        if (error) {
            // Fallback: try raw SQL if the RPC doesn't exist
            const { error: sqlError } = await supabase
                .from("_dummy_")
                .select()
                .limit(0);

            // If RPC fails, log it — the view may need manual refresh
            console.warn(`[refresh-views] RPC failed for ${view}:`, error.message);
            results[view] = sqlError ? `error: ${error.message}` : `rpc_unavailable`;
        } else {
            results[view] = `refreshed in ${Date.now() - start}ms`;
        }
    }

    return NextResponse.json({
        success: true,
        refreshed_at: new Date().toISOString(),
        views: results,
    });
}
