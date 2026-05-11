/**
 * Protocol Logs Read API
 * GET /api/protocol-logs?peptide=bpc-157&vendor=amino-club&page=1&limit=20
 */
import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase-server";

export async function GET(request: NextRequest) {
    try {
        const supabase = createServerClient();
        const { searchParams } = new URL(request.url);

        const peptide = searchParams.get("peptide");
        const vendor = searchParams.get("vendor");
        const goal = searchParams.get("goal");
        const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
        const limit = Math.min(50, Math.max(1, parseInt(searchParams.get("limit") || "20")));
        const sort = searchParams.get("sort") || "recent"; // recent | efficacy | verified
        const offset = (page - 1) * limit;

        let query = supabase
            .from("protocol_logs")
            .select("*, profiles!inner(display_name, badge, country_code)", { count: "exact" })
            .eq("status", "published");

        if (peptide) query = query.contains("peptide_slugs", [peptide]);
        if (vendor) query = query.eq("vendor_slug", vendor);
        if (goal) query = query.eq("goal_slug", goal);

        if (sort === "efficacy") query = query.order("efficacy_score", { ascending: false });
        else if (sort === "verified") query = query.order("verification_level", { ascending: false }).order("created_at", { ascending: false });
        else query = query.order("created_at", { ascending: false });

        query = query.range(offset, offset + limit - 1);

        const { data, error, count } = await query;

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({
            logs: data || [],
            pagination: {
                page,
                limit,
                total: count || 0,
                totalPages: Math.ceil((count || 0) / limit),
            },
        });
    } catch {
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
