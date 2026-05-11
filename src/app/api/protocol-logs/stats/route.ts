/**
 * Aggregation Stats API
 * GET /api/protocol-logs/stats?peptide=bpc-157
 * GET /api/protocol-logs/stats?vendor=amino-club
 * GET /api/protocol-logs/stats?peptide=bpc-157&vendor=amino-club  (the killer pair)
 */
import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase-server";

export async function GET(request: NextRequest) {
    try {
        const supabase = createServerClient();
        const { searchParams } = new URL(request.url);

        const peptide = searchParams.get("peptide");
        const vendor = searchParams.get("vendor");

        // Pair query — the killer view
        if (peptide && vendor) {
            const { data, error } = await supabase
                .from("mv_peptide_vendor_stats")
                .select("*")
                .eq("peptide_slug", peptide)
                .eq("vendor_slug", vendor)
                .single();

            if (error) return NextResponse.json({ stats: null, message: "No data yet" });
            return NextResponse.json({ stats: data });
        }

        // Peptide-only query
        if (peptide) {
            const { data: peptideStats } = await supabase
                .from("mv_peptide_stats")
                .select("*")
                .eq("peptide_slug", peptide)
                .single();

            const { data: vendorBreakdown } = await supabase
                .from("mv_peptide_vendor_stats")
                .select("*")
                .eq("peptide_slug", peptide)
                .order("log_count", { ascending: false });

            return NextResponse.json({
                stats: peptideStats || null,
                vendors: vendorBreakdown || [],
            });
        }

        // Vendor-only query
        if (vendor) {
            const { data: vendorStats } = await supabase
                .from("mv_vendor_stats")
                .select("*")
                .eq("vendor_slug", vendor)
                .single();

            const { data: peptideBreakdown } = await supabase
                .from("mv_peptide_vendor_stats")
                .select("*")
                .eq("vendor_slug", vendor)
                .order("log_count", { ascending: false });

            return NextResponse.json({
                stats: vendorStats || null,
                peptides: peptideBreakdown || [],
            });
        }

        return NextResponse.json({ error: "Provide ?peptide= or ?vendor= parameter" }, { status: 400 });
    } catch {
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
