/**
 * Protocol Log Submission API
 * POST /api/protocol-logs — Submit a new protocol log
 */
import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { sendEmail, logSubmittedEmail } from "@/lib/email";
import { peptides } from "@/data/peptides";
import { vendors } from "@/data/vendors";

function createRouteClient(request: NextRequest) {
    const response = NextResponse.next();

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll();
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value, options }) =>
                        response.cookies.set(name, value, options)
                    );
                },
            },
        }
    );

    return { supabase, response };
}

export async function POST(request: NextRequest) {
    try {
        const { supabase, response } = createRouteClient(request);

        // Verify auth
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        if (authError || !user) {
            return NextResponse.json({ error: "Authentication required" }, { status: 401 });
        }

        const body = await request.json();
        const {
            peptide_slugs,
            vendor_slug,
            dose_mcg,
            frequency,
            route,
            duration_weeks,
            goal_slug,
            efficacy_score,
            side_effect_score,
            would_repeat,
            outcome_text,
            side_effects_noted,
            protocol_start_date,
        } = body;

        // Validate required fields
        if (!peptide_slugs?.length || !vendor_slug || !efficacy_score || !side_effect_score || would_repeat === undefined) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        // 90-day rate limit check
        const ninetyDaysAgo = new Date();
        ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);

        const { data: existing } = await supabase
            .from("protocol_logs")
            .select("id")
            .eq("user_id", user.id)
            .eq("vendor_slug", vendor_slug)
            .contains("peptide_slugs", peptide_slugs)
            .gte("created_at", ninetyDaysAgo.toISOString())
            .limit(1);

        if (existing && existing.length > 0) {
            return NextResponse.json(
                { error: "You already logged this (peptide, vendor) combination within the last 90 days." },
                { status: 429 }
            );
        }

        // Insert the log
        const { data: log, error: insertError } = await supabase
            .from("protocol_logs")
            .insert({
                user_id: user.id,
                peptide_slugs,
                vendor_slug,
                dose_mcg: dose_mcg || null,
                frequency: frequency || null,
                route: route || null,
                duration_weeks: duration_weeks || null,
                goal_slug: goal_slug || null,
                efficacy_score,
                side_effect_score,
                would_repeat,
                outcome_text: outcome_text?.substring(0, 2000) || null,
                side_effects_noted: side_effects_noted || [],
                protocol_start_date: protocol_start_date || null,
                verification_level: "self_reported",
                status: "published",
            })
            .select("id")
            .single();

        if (insertError) {
            console.error("[protocol-logs] Insert error:", insertError);
            return NextResponse.json({ error: insertError.message }, { status: 500 });
        }

        // Increment profile log count (best-effort, non-critical)
        const { data: countData } = await supabase
            .from("protocol_logs")
            .select("id", { count: "exact", head: true })
            .eq("user_id", user.id)
            .eq("status", "published");

        if (countData !== null) {
            await supabase
                .from("profiles")
                .update({ log_count: countData.length || 0 })
                .eq("id", user.id);
        }

        // Send confirmation email (best-effort, non-blocking)
        if (user.email) {
            const pepNames = peptide_slugs.map((s: string) => peptides.find(p => p.slug === s)?.name || s);
            const vName = vendors.find(v => v.slug === vendor_slug)?.name || vendor_slug;
            sendEmail(user.email, logSubmittedEmail({
                displayName: user.user_metadata?.display_name || "Researcher",
                peptideNames: pepNames,
                vendorName: vName,
                efficacy: efficacy_score,
                sideEffects: side_effect_score,
                logId: log?.id || "",
            })).catch(() => {}); // fire-and-forget
        }

        const jsonResponse = NextResponse.json({ success: true, id: log?.id });
        response.cookies.getAll().forEach((cookie) => {
            jsonResponse.cookies.set(cookie.name, cookie.value);
        });
        return jsonResponse;
    } catch (err) {
        console.error("[protocol-logs] Server error:", err);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
