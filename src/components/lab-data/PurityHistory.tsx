/**
 * PurityHistory — server component embedded on vendor review pages.
 * Shows rolling 12-month purity sparklines for up to 5 peptides.
 * Fetches from mv_purity_rolling + coa_records time-series.
 *
 * Usage (in a vendor review page.tsx):
 *   import { PurityHistory } from "@/components/lab-data/PurityHistory";
 *   <PurityHistory vendorSlug="amino-club" vendorName="Amino Club" />
 */
import React from "react";
import Link from "next/link";
import { getVendorPurityHistory, getCoaTimeSeries, MIN_COA_COUNT } from "@/lib/lab-data-queries";
import { PuritySparkline } from "./PuritySparkline";
import { DataUpdatingPlaceholder } from "./DataUpdatingPlaceholder";

interface Props {
    vendorSlug: string;
    vendorName: string;
}

function purityColor(avg: number): string {
    if (avg >= 99) return "var(--green, #4ade80)";
    if (avg >= 97) return "var(--gold, #c9a961)";
    if (avg >= 95) return "var(--amber, #fb923c)";
    return "var(--red, #f87171)";
}

export async function PurityHistory({ vendorSlug, vendorName }: Props) {
    const rows = await getVendorPurityHistory(vendorSlug, 5);

    // Schema.org Dataset markup
    const datasetSchema = {
        "@context": "https://schema.org",
        "@type": "Dataset",
        "name": `${vendorName} COA Purity History`,
        "description": `Rolling purity data aggregated from publicly-posted Certificates of Analysis for ${vendorName} peptides.`,
        "url": `https://peptidex.app/lab-data`,
        "creator": { "@type": "Organization", "name": "PeptiDex", "url": "https://peptidex.app" },
        "license": "https://peptidex.app/about/lab-data-methodology",
        "isAccessibleForFree": true,
        "measurementTechnique": "HPLC, LC-MS",
        "variableMeasured": "Purity percentage",
    };

    return (
        <section
            aria-label={`${vendorName} purity history`}
            style={{
                borderRadius: 16,
                border: "1px solid var(--line, #2a2a2a)",
                background: "var(--bg-card, #111)",
                padding: "20px 24px",
                marginTop: 24,
            }}
        >
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetSchema) }}
            />

            {/* Header */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                <div>
                    <div style={{
                        fontFamily: "var(--mono, monospace)",
                        fontSize: 9,
                        color: "var(--ink-mute, #555)",
                        textTransform: "uppercase",
                        letterSpacing: "0.1em",
                        marginBottom: 4,
                    }}>
                        § COA Purity Data
                    </div>
                    <h3 style={{
                        fontFamily: "var(--sans, sans-serif)",
                        fontSize: 14,
                        fontWeight: 700,
                        color: "var(--ink, #eee)",
                        margin: 0,
                    }}>
                        Verified Purity History
                    </h3>
                </div>
                <Link
                    href="/about/lab-data-methodology"
                    style={{
                        fontFamily: "var(--mono, monospace)",
                        fontSize: 9,
                        color: "var(--gold, #c9a961)",
                        textDecoration: "none",
                        opacity: 0.8,
                    }}
                >
                    Methodology →
                </Link>
            </div>

            {rows.length === 0 ? (
                <DataUpdatingPlaceholder />
            ) : (
                <>
                    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                        {await Promise.all(rows.map(async (row) => {
                            // Fetch time-series for sparkline
                            const timeSeries = await getCoaTimeSeries(vendorSlug, row.peptide_slug);
                            const sparkData = timeSeries
                                .filter(t => t.purity_pct !== null && t.test_date)
                                .map(t => ({ date: t.test_date!, purity: t.purity_pct! }));

                            const color = row.avg_purity ? purityColor(row.avg_purity) : "var(--ink-mute)";

                            return (
                                <div
                                    key={row.peptide_slug}
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 12,
                                        padding: "10px 0",
                                        borderBottom: "1px solid var(--line, #222)",
                                    }}
                                >
                                    {/* Peptide name */}
                                    <div style={{ flex: "0 0 100px" }}>
                                        <Link
                                            href={`/peptides/${row.peptide_slug}`}
                                            style={{
                                                fontFamily: "var(--sans, sans-serif)",
                                                fontSize: 12,
                                                fontWeight: 600,
                                                color: "var(--ink-dim, #ccc)",
                                                textDecoration: "none",
                                            }}
                                        >
                                            {row.peptide_slug.toUpperCase().replace(/-/g, " ")}
                                        </Link>
                                        <div style={{
                                            fontFamily: "var(--mono, monospace)",
                                            fontSize: 9,
                                            color: "var(--ink-mute, #555)",
                                            marginTop: 2,
                                        }}>
                                            {row.coa_count} COAs
                                        </div>
                                    </div>

                                    {/* Sparkline */}
                                    <div style={{ flex: 1 }}>
                                        <PuritySparkline
                                            data={sparkData}
                                            width={120}
                                            height={32}
                                            color={color}
                                            labelLatest={false}
                                        />
                                    </div>

                                    {/* Avg purity */}
                                    <div style={{ textAlign: "right", flex: "0 0 60px" }}>
                                        {row.avg_purity !== null ? (
                                            <>
                                                <div style={{
                                                    fontFamily: "var(--mono, monospace)",
                                                    fontSize: 14,
                                                    fontWeight: 700,
                                                    color,
                                                }}>
                                                    {row.avg_purity.toFixed(1)}%
                                                </div>
                                                <div style={{
                                                    fontFamily: "var(--mono, monospace)",
                                                    fontSize: 9,
                                                    color: "var(--ink-mute, #555)",
                                                }}>
                                                    avg purity
                                                </div>
                                            </>
                                        ) : (
                                            <DataUpdatingPlaceholder compact />
                                        )}
                                    </div>

                                    {/* Source link */}
                                    {timeSeries[0]?.source_url && (
                                        <a
                                            href={timeSeries[0].source_url}
                                            target="_blank"
                                            rel="noopener noreferrer nofollow"
                                            style={{
                                                fontFamily: "var(--mono, monospace)",
                                                fontSize: 9,
                                                color: "var(--ink-mute, #555)",
                                                textDecoration: "none",
                                                flex: "0 0 36px",
                                                textAlign: "center",
                                            }}
                                            title="View source COA"
                                        >
                                            COA ↗
                                        </a>
                                    )}
                                </div>
                            );
                        }))}
                    </div>

                    {/* Footer note */}
                    <div style={{
                        fontFamily: "var(--mono, monospace)",
                        fontSize: 9,
                        color: "var(--ink-mute, #555)",
                        marginTop: 12,
                        lineHeight: 1.6,
                    }}>
                        Aggregated from publicly-posted COAs · Updated weekly ·{" "}
                        <Link href="/about/lab-data-methodology" style={{ color: "var(--gold, #c9a961)", textDecoration: "none" }}>
                            Full methodology
                        </Link>{" "}
                        · Minimum {MIN_COA_COUNT} COAs to display
                    </div>
                </>
            )}
        </section>
    );
}
