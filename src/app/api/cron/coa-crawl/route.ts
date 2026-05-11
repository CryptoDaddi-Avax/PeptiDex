/**
 * COA Crawler Cron Endpoint
 * GET /api/cron/coa-crawl
 * Protected by CRON_SECRET. Schedule: weekly via Vercel Cron.
 */
import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase-server";
import { runCrawl } from "@/lib/coa-crawler";

export const maxDuration = 300; // 5 min timeout for serverless

export async function GET(request: NextRequest) {
    // Auth check
    const secret = request.headers.get("authorization")?.replace("Bearer ", "")
        || request.nextUrl.searchParams.get("secret");

    if (secret !== process.env.CRON_SECRET) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const supabase = createServerClient();
        const result = await runCrawl(supabase);

        return NextResponse.json({
            success: true,
            runId: result.runId,
            totalFound: result.totalFound,
            totalNew: result.totalNew,
            vendors: result.results.map(r => ({
                vendor: r.vendorSlug,
                found: r.found,
                new: r.newInserts,
                errors: r.errors.length,
            })),
        });
    } catch (err) {
        return NextResponse.json(
            { error: (err as Error).message },
            { status: 500 }
        );
    }
}
