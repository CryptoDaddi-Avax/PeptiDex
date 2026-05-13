import type { Metadata } from "next";
import Link from "next/link";
import { getAllTrustScores, MIN_COA_COUNT } from "@/lib/lab-data-queries";
import { TrustScoreBadge } from "@/components/lab-data/TrustScoreBadge";
import { DataUpdatingPlaceholder } from "@/components/lab-data/DataUpdatingPlaceholder";
import { vendors } from "@/data/vendors";
import { FlaskConical, ExternalLink, Info } from "lucide-react";

export const revalidate = 3600; // ISR: re-fetch from DB every hour

export const metadata: Metadata = {
    title: "Lab Data Dashboard — Vendor Purity Leaderboard",
    description: "Live vendor trust scores computed from aggregated Certificates of Analysis. Ranked by purity consistency, COA recency, lab credibility, and catalog coverage. Full methodology disclosed.",
    alternates: { canonical: "https://peptidex.app/lab-data" },
    openGraph: {
        title: "Peptide Vendor Lab Data — Trust Score Leaderboard | PeptiDex",
        description: "Which peptide vendors publish the most consistent, recent COAs from reputable labs? See the data.",
        url: "https://peptidex.app/lab-data",
        type: "website",
    },
};

// Schema.org Dataset for the leaderboard
function buildDatasetSchema(scores: Awaited<ReturnType<typeof getAllTrustScores>>) {
    return {
        "@context": "https://schema.org",
        "@type": "Dataset",
        "name": "PeptiDex Vendor COA Trust Score Leaderboard",
        "description": "Composite trust scores for peptide vendors computed from aggregated Certificates of Analysis data. Updated weekly from publicly-posted vendor COAs.",
        "url": "https://peptidex.app/lab-data",
        "creator": { "@type": "Organization", "name": "PeptiDex", "url": "https://peptidex.app" },
        "license": "https://peptidex.app/about/lab-data-methodology",
        "isAccessibleForFree": true,
        "measurementTechnique": ["HPLC", "LC-MS", "Mass Spectrometry"],
        "variableMeasured": "Vendor trust score (0–100 composite)",
        "temporalCoverage": "2025/..",
        "distribution": {
            "@type": "DataDownload",
            "encodingFormat": "text/html",
            "contentUrl": "https://peptidex.app/lab-data",
        },
        "hasPart": scores.map(s => ({
            "@type": "Dataset",
            "name": `${vendorDisplayName(s.vendor_slug)} Trust Score`,
            "description": `Trust score: ${s.trust_score}/100. ${s.total_coas} COAs aggregated.`,
        })),
    };
}

function vendorDisplayName(slug: string): string {
    return vendors.find(v => v.slug === slug)?.name ?? slug;
}

function vendorReviewHref(slug: string): string {
    const map: Record<string, string> = {
        "amino-club": "/vendors/amino-club",
        "ascension-peptides": "/vendors/ascension-peptides",
        "bio-longevity-labs": "/vendors/bio-longevity-labs",
        "limitless-life": "/vendors/limitless-life",
        "pantheon-peptides": "/vendors/pantheon-peptides",
        "lvlup-health": "/vendors/lvlup-health",
    };
    return map[slug] ?? "/vendors";
}

function scoreLabel(score: number): string {
    if (score >= 85) return "Excellent";
    if (score >= 70) return "Strong";
    if (score >= 55) return "Good";
    if (score >= 40) return "Fair";
    return "Limited";
}

function scoreColor(score: number): string {
    if (score >= 80) return "var(--green, #4ade80)";
    if (score >= 60) return "var(--gold, #c9a961)";
    if (score >= 40) return "var(--amber, #fb923c)";
    return "var(--ink-mute, #555)";
}

export default async function LabDataPage() {
    const scores = await getAllTrustScores();
    const hasData = scores.length > 0;
    const lastUpdated = scores[0]?.updated_at
        ? new Date(scores[0].updated_at).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
        : null;

    return (
        <div style={{ background: "var(--bg, #0a0a0a)", minHeight: "100vh" }}>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(buildDatasetSchema(scores)) }}
            />

            {/* ── Page Header ─────────────────────────────────────────────── */}
            <div className="page-header">
                <div className="page-header-grid" />
                <div className="page-header-wrap">
                    <nav className="breadcrumb">
                        <Link href="/">Home</Link>
                        <span className="sep">/</span>
                        <span className="current">Lab Data</span>
                    </nav>
                    <div className="section-label">§ Aggregated COA Data</div>
                    <h1 className="page-title">
                        Vendor <em>Trust Score</em> Leaderboard
                    </h1>
                    <p className="page-subtitle">
                        Composite trust scores computed from{" "}
                        {hasData
                            ? `${scores.reduce((s, r) => s + r.total_coas, 0)} Certificates of Analysis`
                            : "aggregated Certificates of Analysis"
                        }{" "}
                        published by verified vendors. Updated weekly.{" "}
                        <Link href="/about/lab-data-methodology" style={{ color: "var(--gold, #c9a961)" }}>
                            Full methodology →
                        </Link>
                    </p>
                    {lastUpdated && (
                        <p style={{
                            fontFamily: "var(--mono, monospace)",
                            fontSize: 11,
                            color: "var(--ink-mute, #555)",
                            marginTop: 8,
                        }}>
                            Last updated: {lastUpdated}
                        </p>
                    )}
                </div>
            </div>

            <div className="about-content" style={{ maxWidth: 800 }}>

                {/* ── Score component key ─────────────────────────────────── */}
                <section style={{
                    background: "var(--bg-card, #111)",
                    border: "1px solid var(--line, #222)",
                    borderRadius: 12,
                    padding: "16px 20px",
                    marginBottom: 32,
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 16,
                    alignItems: "center",
                }}>
                    <Info size={14} color="var(--ink-mute, #555)" style={{ flexShrink: 0 }} />
                    <span style={{ fontFamily: "var(--sans, sans-serif)", fontSize: 12, color: "var(--ink-dim, #aaa)", flex: 1 }}>
                        Trust score (0–100) = Purity Consistency + COA Recency + Lab Credibility + Catalog Coverage (25 pts each).
                        Requires min {MIN_COA_COUNT} COAs per vendor to display.
                    </span>
                    <Link
                        href="/about/lab-data-methodology"
                        style={{
                            fontFamily: "var(--mono, monospace)",
                            fontSize: 10,
                            color: "var(--gold, #c9a961)",
                            textDecoration: "none",
                            flexShrink: 0,
                        }}
                    >
                        Full methodology →
                    </Link>
                </section>

                {/* ── Leaderboard ─────────────────────────────────────────── */}
                {!hasData ? (
                    <DataUpdatingPlaceholder message="Leaderboard data updating — first crawl pending" />
                ) : (
                    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                        {scores.map((row, i) => {
                            const name = vendorDisplayName(row.vendor_slug);
                            const color = scoreColor(row.trust_score);
                            const reviewHref = vendorReviewHref(row.vendor_slug);

                            return (
                                <article
                                    key={row.vendor_slug}
                                    style={{
                                        borderRadius: 16,
                                        border: `1px solid ${i === 0 ? "rgba(201,169,97,0.3)" : "var(--line, #222)"}`,
                                        background: i === 0
                                            ? "rgba(201,169,97,0.04)"
                                            : "var(--bg-card, #111)",
                                        padding: "20px 24px",
                                        position: "relative",
                                        overflow: "hidden",
                                    }}
                                >
                                    {/* Rank glow for #1 */}
                                    {i === 0 && (
                                        <div style={{
                                            position: "absolute",
                                            top: -20,
                                            right: -20,
                                            width: 80,
                                            height: 80,
                                            background: "radial-gradient(circle, rgba(201,169,97,0.15) 0%, transparent 70%)",
                                            pointerEvents: "none",
                                        }} />
                                    )}

                                    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16 }}>
                                        {/* Left: rank + name */}
                                        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                                            <div style={{
                                                fontFamily: "var(--mono, monospace)",
                                                fontSize: 24,
                                                fontWeight: 700,
                                                color: i === 0 ? "var(--gold, #c9a961)" : "var(--ink-mute, #555)",
                                                minWidth: 28,
                                            }}>
                                                {i + 1}
                                            </div>
                                            <div>
                                                <Link
                                                    href={reviewHref}
                                                    style={{
                                                        fontFamily: "var(--sans, sans-serif)",
                                                        fontSize: 16,
                                                        fontWeight: 700,
                                                        color: "var(--ink, #eee)",
                                                        textDecoration: "none",
                                                        display: "block",
                                                        marginBottom: 4,
                                                    }}
                                                >
                                                    {name}
                                                </Link>
                                                <span style={{
                                                    fontFamily: "var(--mono, monospace)",
                                                    fontSize: 10,
                                                    color,
                                                    textTransform: "uppercase",
                                                    letterSpacing: "0.08em",
                                                    fontWeight: 600,
                                                }}>
                                                    {scoreLabel(row.trust_score)}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Right: trust badge */}
                                        <TrustScoreBadge
                                            score={row.trust_score}
                                            size="lg"
                                            breakdown={{
                                                purityConsistency: row.purity_consistency,
                                                coaRecency: row.coa_recency_score,
                                                labCredibility: row.lab_credibility,
                                                catalogCoverage: row.catalog_coverage,
                                            }}
                                        />
                                    </div>

                                    {/* Component bars */}
                                    <div style={{
                                        display: "grid",
                                        gridTemplateColumns: "1fr 1fr",
                                        gap: "8px 20px",
                                        marginTop: 16,
                                    }}>
                                        {[
                                            { label: "Purity Consistency", value: row.purity_consistency },
                                            { label: "COA Recency", value: row.coa_recency_score },
                                            { label: "Lab Credibility", value: row.lab_credibility },
                                            { label: "Catalog Coverage", value: row.catalog_coverage },
                                        ].map(comp => (
                                            <div key={comp.label}>
                                                <div style={{
                                                    display: "flex",
                                                    justifyContent: "space-between",
                                                    marginBottom: 3,
                                                }}>
                                                    <span style={{
                                                        fontFamily: "var(--mono, monospace)",
                                                        fontSize: 9,
                                                        color: "var(--ink-mute, #555)",
                                                        textTransform: "uppercase",
                                                        letterSpacing: "0.07em",
                                                    }}>
                                                        {comp.label}
                                                    </span>
                                                    <span style={{
                                                        fontFamily: "var(--mono, monospace)",
                                                        fontSize: 9,
                                                        color: scoreColor(comp.value * 4),
                                                        fontWeight: 600,
                                                    }}>
                                                        {comp.value}/25
                                                    </span>
                                                </div>
                                                <div style={{
                                                    height: 4,
                                                    background: "var(--line, #222)",
                                                    borderRadius: 2,
                                                    overflow: "hidden",
                                                }}>
                                                    <div style={{
                                                        height: "100%",
                                                        width: `${(comp.value / 25) * 100}%`,
                                                        background: scoreColor(comp.value * 4),
                                                        borderRadius: 2,
                                                    }} />
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Stats row */}
                                    <div style={{
                                        display: "flex",
                                        gap: 20,
                                        marginTop: 14,
                                        paddingTop: 12,
                                        borderTop: "1px solid var(--line, #1e1e1e)",
                                        flexWrap: "wrap",
                                    }}>
                                        {[
                                            { label: "Total COAs", value: row.total_coas },
                                            { label: "Avg Purity", value: row.avg_purity ? `${row.avg_purity.toFixed(1)}%` : "—" },
                                            { label: "Purity σ", value: row.stddev_purity ? `±${row.stddev_purity.toFixed(2)}%` : "—" },
                                            { label: "Latest COA", value: row.last_coa_date ?? "—" },
                                        ].map(stat => (
                                            <div key={stat.label}>
                                                <div style={{ fontFamily: "var(--mono, monospace)", fontSize: 9, color: "var(--ink-mute, #555)", textTransform: "uppercase", letterSpacing: "0.07em" }}>
                                                    {stat.label}
                                                </div>
                                                <div style={{ fontFamily: "var(--mono, monospace)", fontSize: 13, fontWeight: 700, color: "var(--ink-dim, #ccc)", marginTop: 2 }}>
                                                    {stat.value}
                                                </div>
                                            </div>
                                        ))}

                                        {/* Review link */}
                                        <div style={{ marginLeft: "auto" }}>
                                            <Link
                                                href={reviewHref}
                                                style={{
                                                    display: "inline-flex",
                                                    alignItems: "center",
                                                    gap: 4,
                                                    fontFamily: "var(--mono, monospace)",
                                                    fontSize: 10,
                                                    color: "var(--gold, #c9a961)",
                                                    textDecoration: "none",
                                                    textTransform: "uppercase",
                                                    letterSpacing: "0.06em",
                                                }}
                                            >
                                                Full review <ExternalLink size={10} />
                                            </Link>
                                        </div>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                )}

                {/* ── Vendors not yet in leaderboard ────────────────────── */}
                {(() => {
                    const rankedSlugs = new Set(scores.map(s => s.vendor_slug));
                    const missing = vendors.filter(v => !rankedSlugs.has(v.slug));
                    if (!missing.length) return null;
                    return (
                        <section style={{ marginTop: 40 }}>
                            <h2 style={{ fontFamily: "var(--sans, sans-serif)", fontSize: 14, fontWeight: 700, color: "var(--ink-dim, #aaa)", marginBottom: 12 }}>
                                Vendors Pending Data Collection
                            </h2>
                            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                                {missing.map(v => (
                                    <Link
                                        key={v.slug}
                                        href={vendorReviewHref(v.slug)}
                                        style={{
                                            fontFamily: "var(--sans, sans-serif)",
                                            fontSize: 12,
                                            color: "var(--ink-mute, #555)",
                                            background: "var(--bg-card, #111)",
                                            border: "1px solid var(--line, #222)",
                                            borderRadius: 8,
                                            padding: "6px 12px",
                                            textDecoration: "none",
                                            display: "inline-flex",
                                            alignItems: "center",
                                            gap: 4,
                                        }}
                                    >
                                        <FlaskConical size={10} />
                                        {v.name}
                                        <span style={{ fontSize: 9, opacity: 0.5 }}>— crawl pending</span>
                                    </Link>
                                ))}
                            </div>
                        </section>
                    );
                })()}

                {/* ── Methodology CTA ──────────────────────────────────────── */}
                <section style={{
                    marginTop: 40,
                    padding: "20px 24px",
                    borderRadius: 14,
                    border: "1px solid rgba(201,169,97,0.2)",
                    background: "rgba(201,169,97,0.04)",
                }}>
                    <h2 style={{ fontFamily: "var(--sans, sans-serif)", fontSize: 15, fontWeight: 700, color: "var(--ink, #eee)", margin: "0 0 8px" }}>
                        How trust scores are calculated
                    </h2>
                    <p style={{ fontFamily: "var(--sans, sans-serif)", fontSize: 13, color: "var(--ink-dim, #aaa)", lineHeight: 1.7, margin: "0 0 12px" }}>
                        Every number on this page is derived from publicly-posted Certificates of Analysis only.
                        No vendor pays to appear here. Trust scores reflect data availability and consistency — not product endorsement.
                    </p>
                    <Link
                        href="/about/lab-data-methodology"
                        style={{
                            fontFamily: "var(--mono, monospace)",
                            fontSize: 11,
                            color: "var(--gold, #c9a961)",
                            textDecoration: "none",
                            textTransform: "uppercase",
                            letterSpacing: "0.08em",
                        }}
                    >
                        Read the full methodology →
                    </Link>
                </section>

            </div>
        </div>
    );
}
