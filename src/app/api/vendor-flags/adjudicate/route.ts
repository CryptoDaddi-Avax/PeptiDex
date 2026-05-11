/**
 * Admin Adjudication API
 * POST /api/vendor-flags/adjudicate — Resolve a flag (dismiss or uphold+remove)
 */
import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase-server";

export async function POST(request: NextRequest) {
    try {
        const adminKey = request.headers.get("x-admin-key");
        if (adminKey !== process.env.SUPABASE_SERVICE_ROLE_KEY) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
        }

        const supabase = createServerClient();
        const body = await request.json();
        const { flag_id, action, admin_id } = body;

        if (!flag_id || !action || !["dismissed", "upheld"].includes(action)) {
            return NextResponse.json({ error: "flag_id and action (dismissed|upheld) required" }, { status: 400 });
        }

        // Get the flag to find the log_id
        const { data: flag, error: flagError } = await supabase
            .from("vendor_flags")
            .select("log_id")
            .eq("id", flag_id)
            .single();

        if (flagError || !flag) {
            return NextResponse.json({ error: "Flag not found" }, { status: 404 });
        }

        const logId = (flag as Record<string, string>).log_id;

        // Update flag with adjudication
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        await (supabase.from("vendor_flags") as any)
            .update({
                adjudication: action,
                adjudicated_by: admin_id || "admin",
                adjudicated_at: new Date().toISOString(),
            })
            .eq("id", flag_id);

        // If upheld, soft-delete the log
        if (action === "upheld") {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            await (supabase.from("protocol_logs") as any)
                .update({ status: "removed" })
                .eq("id", logId);
        }

        return NextResponse.json({ success: true, action });
    } catch {
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
