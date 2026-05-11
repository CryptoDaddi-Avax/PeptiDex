/**
 * Health-check endpoint to verify Supabase connectivity.
 * GET /api/health → { ok: true, tables: [...], timestamp: ... }
 *
 * Tests both the service-role client (server-side) and verifies
 * that the protocol_logs schema exists.
 *
 * Remove or protect this endpoint before public launch.
 */
import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase-server";

export async function GET() {
    try {
        const supabase = createServerClient();

        // Test 1: Can we connect and query?
        const { data: tables, error: tablesError } = await supabase
            .from("profiles")
            .select("id")
            .limit(1);

        if (tablesError) {
            return NextResponse.json(
                {
                    ok: false,
                    error: tablesError.message,
                    hint: tablesError.hint || "Have you run the SQL migration in Supabase SQL Editor?",
                },
                { status: 500 }
            );
        }

        // Test 2: Can we reach the protocol_logs table?
        const { error: logsError } = await supabase
            .from("protocol_logs")
            .select("id")
            .limit(1);

        if (logsError) {
            return NextResponse.json(
                {
                    ok: false,
                    error: logsError.message,
                    hint: "protocol_logs table not found. Run supabase/migrations/001_protocol_logs.sql",
                },
                { status: 500 }
            );
        }

        // Test 3: Materialized views exist?
        const { error: mvError } = await supabase
            .from("mv_peptide_vendor_stats")
            .select("peptide_slug")
            .limit(1);

        return NextResponse.json({
            ok: true,
            connection: "supabase",
            tables: {
                profiles: "✓",
                protocol_logs: "✓",
                mv_peptide_vendor_stats: mvError ? "✗ (run migration)" : "✓",
            },
            timestamp: new Date().toISOString(),
        });
    } catch (err) {
        return NextResponse.json(
            {
                ok: false,
                error: err instanceof Error ? err.message : "Unknown error",
            },
            { status: 500 }
        );
    }
}
