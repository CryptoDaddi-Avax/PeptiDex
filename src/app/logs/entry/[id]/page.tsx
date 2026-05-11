import type { Metadata } from "next";
import { createServerClient } from "@/lib/supabase-server";
import { notFound } from "next/navigation";
import Link from "next/link";
import { peptides } from "@/data/peptides";
import { vendors } from "@/data/vendors";
import { VerificationBadge } from "@/components/logs/VerificationBadge";

// Dynamically rendered — each log is unique, no static params
export const dynamic = "force-dynamic";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ id: string }>;
}): Promise<Metadata> {
    const { id } = await params;
    const supabase = createServerClient();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: log } = await (supabase as any)
        .from("protocol_logs")
        .select("peptide_slugs, vendor_slug, efficacy_score")
        .eq("id", id)
        .eq("status", "published")
        .single();

    if (!log) return { title: "Protocol Log | PeptiDex" };

    const pepNames = (log.peptide_slugs as string[]).map(s => peptides.find(p => p.slug === s)?.name || s).join(" + ");
    const vendorName = vendors.find(v => v.slug === log.vendor_slug)?.name || log.vendor_slug;
    const title = `${pepNames} Protocol Log — ${vendorName} | PeptiDex`;

    return {
        title,
        description: `Community-submitted protocol log for ${pepNames} from ${vendorName}. Efficacy: ${log.efficacy_score}/10.`,
        alternates: { canonical: `https://peptidex.app/logs/entry/${id}` },
        robots: { index: true, follow: true },
    };
}

const BADGE_ICON: Record<string, string> = {
    contributor: "🧪",
    verified_buyer: "✅",
    lab_confirmed: "🔬",
};

export default async function LogDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const supabase = createServerClient();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: log } = await (supabase as any)
        .from("protocol_logs")
        .select(`
            *,
            profiles(display_name, badge, country_code)
        `)
        .eq("id", id)
        .eq("status", "published")
        .single();

    if (!log) notFound();

    const pepNames = (log.peptide_slugs as string[]).map((s: string) => peptides.find(p => p.slug === s)?.name || s);
    const vendorObj = vendors.find(v => v.slug === log.vendor_slug);
    const primarySlug = (log.peptide_slugs as string[])[0];

    const dateStr = new Date(log.created_at).toLocaleDateString("en-US", {
        year: "numeric", month: "long", day: "numeric",
    });

    return (
        <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
            {/* JSON-LD */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Review",
                        "itemReviewed": {
                            "@type": "Drug",
                            "name": pepNames.join(" + "),
                        },
                        "reviewRating": {
                            "@type": "Rating",
                            "ratingValue": log.efficacy_score,
                            "bestRating": 10,
                        },
                        "author": { "@type": "Person", "name": log.profiles?.display_name || "Anonymous Researcher" },
                        "datePublished": log.created_at,
                        "reviewBody": log.outcome_text || "",
                        "publisher": { "@type": "Organization", "name": "PeptiDex" },
                    }),
                }}
            />

            <div className="page-header">
                <div className="page-header-grid" />
                <div className="page-header-wrap">
                    <nav className="breadcrumb">
                        <Link href="/">Home</Link>
                        <span className="sep">/</span>
                        <Link href="/logs">Logs</Link>
                        <span className="sep">/</span>
                        {primarySlug && <Link href={`/logs/${primarySlug}`}>{pepNames[0]}</Link>}
                        {primarySlug && <span className="sep">/</span>}
                        <span className="current">Log Detail</span>
                    </nav>
                    <h1 className="page-title">
                        <em>{pepNames.join(" + ")}</em> Protocol Log
                    </h1>
                    <p className="page-subtitle">
                        {vendorObj?.name} · {dateStr}
                    </p>
                </div>
            </div>

            <div className="about-content" style={{ maxWidth: 740 }}>

                {/* ── Verification status ── */}
                <div className="flex items-center gap-3 mb-6 p-4 rounded-xl" style={{ background: "var(--bg-card)", border: "1px solid var(--line)" }}>
                    <VerificationBadge level={log.verification_level} size="md" />
                    <span style={{ fontFamily: "var(--sans)", fontSize: 13, color: "var(--ink-dim)" }}>
                        {log.verification_level === "verified_buyer"
                            ? "Purchase receipt verified via OCR — carries 2× weight in aggregates"
                            : log.verification_level === "lab_confirmed"
                            ? "Lab-confirmed data — carries 3× weight in aggregates"
                            : "Self-reported — carries 1× weight in aggregates"}
                    </span>
                </div>

                {/* ── Scorecard ── */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="rounded-xl p-5 text-center" style={{ background: "var(--bg-card)", border: "1px solid var(--line)" }}>
                        <div style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--ink-mute)", textTransform: "uppercase", letterSpacing: "0.12em" }}>Efficacy</div>
                        <div style={{ fontFamily: "var(--sans)", fontSize: 48, fontWeight: 700, color: "var(--gold)", lineHeight: 1.1 }}>{log.efficacy_score}</div>
                        <div style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--ink-mute)" }}>out of 10</div>
                    </div>
                    <div className="rounded-xl p-5 text-center" style={{ background: "var(--bg-card)", border: "1px solid var(--line)" }}>
                        <div style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--ink-mute)", textTransform: "uppercase", letterSpacing: "0.12em" }}>Side Effects</div>
                        <div style={{ fontFamily: "var(--sans)", fontSize: 48, fontWeight: 700, lineHeight: 1.1, color: log.side_effect_score <= 3 ? "var(--green)" : "var(--amber)" }}>
                            {log.side_effect_score}
                        </div>
                        <div style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--ink-mute)" }}>out of 10</div>
                    </div>
                </div>

                {/* ── Protocol details ── */}
                <div className="rounded-xl p-5 mb-6" style={{ background: "var(--bg-card)", border: "1px solid var(--line)" }}>
                    <h2 style={{ fontFamily: "var(--sans)", fontSize: 14, fontWeight: 600, color: "var(--ink)", marginBottom: 16 }}>Protocol Details</h2>
                    <dl className="space-y-3">
                        {[
                            { label: "Peptide(s)", value: pepNames.join(" + ") },
                            { label: "Vendor", value: vendorObj?.name || log.vendor_slug },
                            log.dose_mcg && { label: "Dose", value: `${log.dose_mcg} mcg` },
                            log.frequency && { label: "Frequency", value: log.frequency.replace(/_/g, "/") },
                            log.duration_weeks && { label: "Duration", value: `${log.duration_weeks} weeks` },
                            log.route && { label: "Route", value: log.route },
                            log.goal_slug && { label: "Goal", value: log.goal_slug.replace(/-/g, " ").replace(/\b\w/g, (c: string) => c.toUpperCase()) },
                            { label: "Would Repeat", value: log.would_repeat ? "✓ Yes" : "✗ No" },
                        ].filter(Boolean).map((row) => {
                            const r = row as { label: string; value: string };
                            return (
                                <div key={r.label} className="flex items-start justify-between gap-4 py-2 border-b" style={{ borderColor: "var(--line)" }}>
                                    <dt style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--ink-mute)", textTransform: "uppercase", letterSpacing: "0.08em", flexShrink: 0 }}>{r.label}</dt>
                                    <dd style={{ fontFamily: "var(--sans)", fontSize: 13, color: "var(--ink)", fontWeight: 500, textAlign: "right" }}>{r.value}</dd>
                                </div>
                            );
                        })}
                    </dl>
                </div>

                {/* ── Outcome text ── */}
                {log.outcome_text && (
                    <div className="rounded-xl p-5 mb-6" style={{ background: "var(--bg-card)", border: "1px solid var(--line)" }}>
                        <h2 style={{ fontFamily: "var(--sans)", fontSize: 14, fontWeight: 600, color: "var(--ink)", marginBottom: 12 }}>Outcome Report</h2>
                        <p style={{ fontFamily: "var(--serif)", fontSize: 16, color: "var(--ink-dim)", lineHeight: 1.7, fontStyle: "italic" }}>
                            &ldquo;{log.outcome_text}&rdquo;
                        </p>
                    </div>
                )}

                {/* ── Side effects noted ── */}
                {log.side_effects_noted?.length > 0 && (
                    <div className="rounded-xl p-5 mb-6" style={{ background: "var(--bg-card)", border: "1px solid var(--line)" }}>
                        <h2 style={{ fontFamily: "var(--sans)", fontSize: 14, fontWeight: 600, color: "var(--ink)", marginBottom: 12 }}>Side Effects Noted</h2>
                        <div className="flex flex-wrap gap-2">
                            {(log.side_effects_noted as string[]).map(se => (
                                <span key={se} style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--amber)", background: "rgba(212,131,42,0.1)", border: "1px solid rgba(212,131,42,0.2)", padding: "4px 10px", borderRadius: 6 }}>
                                    {se.replace(/_/g, " ")}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* ── Submitter ── */}
                <div className="flex items-center justify-between p-4 rounded-xl mb-6" style={{ background: "var(--bg-soft)", border: "1px solid var(--line)" }}>
                    <div className="flex items-center gap-2">
                        <span>{BADGE_ICON[log.profiles?.badge || "contributor"]}</span>
                        <span style={{ fontFamily: "var(--sans)", fontSize: 13, color: "var(--ink-dim)" }}>
                            {log.profiles?.display_name || "Anonymous Researcher"}
                            {log.profiles?.country_code && <span className="ml-1 opacity-50">({log.profiles.country_code})</span>}
                        </span>
                    </div>
                    <span style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--ink-mute)" }}>{dateStr}</span>
                </div>

                {/* ── Navigation ── */}
                <div className="flex gap-4 flex-wrap">
                    {primarySlug && (
                        <Link
                            href={`/logs/${primarySlug}`}
                            className="px-5 py-2.5 rounded-lg font-semibold transition-all hover:scale-[1.02]"
                            style={{ background: "var(--bg-card)", border: "1px solid var(--line-strong)", color: "var(--ink)", fontFamily: "var(--sans)", fontSize: 13 }}
                        >
                            ← All {pepNames[0]} logs
                        </Link>
                    )}
                    {vendorObj && primarySlug && (
                        <Link
                            href={`/peptides/${primarySlug}/at/${log.vendor_slug}`}
                            className="px-5 py-2.5 rounded-lg font-semibold transition-all hover:scale-[1.02]"
                            style={{ background: "var(--bg-card)", border: "1px solid var(--line-strong)", color: "var(--ink)", fontFamily: "var(--sans)", fontSize: 13 }}
                        >
                            {pepNames[0]} × {vendorObj.name} data →
                        </Link>
                    )}
                    <Link
                        href={`/log-protocol?peptide=${primarySlug}&vendor=${log.vendor_slug}`}
                        className="px-5 py-2.5 rounded-lg font-semibold transition-all hover:scale-[1.02]"
                        style={{ background: "linear-gradient(135deg, var(--gold) 0%, var(--amber) 100%)", color: "#0a0a0b", fontFamily: "var(--sans)", fontSize: 13 }}
                    >
                        Log Your Protocol →
                    </Link>
                </div>

                {/* ── Disclaimer ── */}
                <p className="mt-8" style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--ink-mute)", lineHeight: 1.6 }}>
                    This is a community-submitted protocol log for research purposes only. It is not medical advice.
                    Verification level: <strong>{log.verification_level.replace(/_/g, " ")}</strong>.
                    {" "}<Link href="/disclaimer" style={{ color: "var(--ink-mute)" }}>Full disclaimer →</Link>
                </p>
            </div>
        </div>
    );
}
