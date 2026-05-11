/**
 * Cron: Send follow-up reminders for protocol logs
 * GET /api/cron/reminders — Called by Vercel Cron or external scheduler
 *
 * Sends reminders to users who logged protocols 4+ weeks ago
 * and haven't been reminded in the last 30 days.
 */
import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase-server";
import { sendEmail, followUpReminderEmail } from "@/lib/email";
import { peptides } from "@/data/peptides";
import { vendors } from "@/data/vendors";

export async function GET(request: NextRequest) {
    // Verify cron secret
    const authHeader = request.headers.get("authorization");
    const cronSecret = process.env.CRON_SECRET;

    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const supabase = createServerClient();

    // Find logs from 4+ weeks ago where user hasn't been reminded recently
    const fourWeeksAgo = new Date();
    fourWeeksAgo.setDate(fourWeeksAgo.getDate() - 28);

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sb = supabase as any;

    const { data: logs, error } = await sb
        .from("protocol_logs")
        .select("id, user_id, peptide_slugs, vendor_slug, created_at, profiles(display_name)")
        .eq("status", "published")
        .lte("created_at", fourWeeksAgo.toISOString())
        .limit(50);

    if (error || !logs) {
        return NextResponse.json({ error: error?.message || "No logs" }, { status: 500 });
    }

    let sent = 0;

    for (const log of logs) {
        // Check if already reminded recently
        const { data: existingReminder } = await sb
            .from("log_reminders")
            .select("id")
            .eq("log_id", log.id)
            .gte("sent_at", thirtyDaysAgo.toISOString())
            .limit(1);

        if (existingReminder && existingReminder.length > 0) continue;

        // Get user email
        const { data: { user } } = await supabase.auth.admin.getUserById(log.user_id);
        if (!user?.email) continue;

        const weeksAgo = Math.round((Date.now() - new Date(log.created_at).getTime()) / (7 * 24 * 60 * 60 * 1000));
        const pepNames = (log.peptide_slugs as string[]).map(s => peptides.find(p => p.slug === s)?.name || s);
        const vName = vendors.find(v => v.slug === log.vendor_slug)?.name || log.vendor_slug;
        const displayName = (log.profiles as Record<string, string>)?.display_name || "Researcher";

        const success = await sendEmail(user.email, followUpReminderEmail({
            displayName,
            peptideNames: pepNames,
            vendorName: vName,
            weeksAgo,
            logId: log.id,
        }));

        if (success) {
            // Record reminder
            await sb.from("log_reminders").insert({
                log_id: log.id,
                user_id: log.user_id,
                sent_at: new Date().toISOString(),
            });
            sent++;
        }
    }

    return NextResponse.json({ success: true, sent, checked: logs.length });
}
