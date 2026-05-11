/**
 * Vendor Flag API
 * POST /api/vendor-flags — Submit a flag on a suspicious log
 * GET  /api/vendor-flags — List flags (admin only, uses service role)
 */
import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { createServerClient as createAdminClient } from "@/lib/supabase-server";

function createRouteClient(request: NextRequest) {
    const response = NextResponse.next();
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() { return request.cookies.getAll(); },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
                },
            },
        }
    );
    return { supabase, response };
}

export async function POST(request: NextRequest) {
    try {
        const { supabase } = createRouteClient(request);
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return NextResponse.json({ error: "Authentication required" }, { status: 401 });

        const body = await request.json();
        const { log_id, vendor_slug, reason } = body;

        if (!log_id || !vendor_slug || !reason?.trim()) {
            return NextResponse.json({ error: "log_id, vendor_slug, and reason are required" }, { status: 400 });
        }

        if (reason.trim().length < 10) {
            return NextResponse.json({ error: "Reason must be at least 10 characters" }, { status: 400 });
        }

        const { error: insertError } = await supabase
            .from("vendor_flags")
            .insert({
                log_id,
                vendor_slug,
                reason: reason.trim().substring(0, 1000),
            });

        if (insertError) {
            return NextResponse.json({ error: insertError.message }, { status: 500 });
        }

        return NextResponse.json({ success: true });
    } catch {
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}

export async function GET(request: NextRequest) {
    try {
        const adminKey = request.headers.get("x-admin-key");
        if (adminKey !== process.env.SUPABASE_SERVICE_ROLE_KEY) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
        }

        const supabase = createAdminClient();
        const { searchParams } = new URL(request.url);
        const status = searchParams.get("status") || "pending";

        // pending = no adjudication, upheld/dismissed = adjudicated
        let query = supabase
            .from("vendor_flags")
            .select(`
                *,
                protocol_logs(
                    id, peptide_slugs, vendor_slug, efficacy_score,
                    side_effect_score, would_repeat, outcome_text,
                    verification_level, created_at,
                    profiles(display_name, badge)
                )
            `)
            .order("created_at", { ascending: false })
            .limit(50);

        if (status === "pending") {
            query = query.is("adjudication", null);
        } else {
            query = query.eq("adjudication", status);
        }

        const { data, error } = await query;
        if (error) return NextResponse.json({ error: error.message }, { status: 500 });
        return NextResponse.json({ flags: data || [] });
    } catch {
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
