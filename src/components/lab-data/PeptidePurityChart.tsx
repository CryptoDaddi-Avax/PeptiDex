/**
 * PeptidePurityChart — server component for peptide pages.
 * Shows average purity across all vendors carrying this peptide, ranked.
 * Falls back to "Data updating" when < MIN_COA_COUNT COAs exist per vendor.
 *
 * Usage (in peptide page.tsx):
 *   import { PeptidePurityChart } from "@/components/lab-data/PeptidePurityChart";
 *   <PeptidePurityChart peptideSlug="bpc-157" peptideName="BPC-157" />
 */
import React from "react";
import Link from "next/link";
import { getPeptidePurityAcrossVendors, MIN_COA_COUNT } from "@/lib/lab-data-queries";
import { DataUpdatingPlaceholder } from "./DataUpdatingPlaceholder";
import { vendors } from "@/data/vendors";

interface Props {
    peptideSlug: string;
    peptideName: string;
}

function purityColor(avg: number): string {
    if (avg >= 99) return "var(--green, #4ade80)";
    if (avg >= 97) return "var(--gold, #c9a961)";
    if (avg >= 95) return "var(--amber, #fb923c)";
    return "var(--red, #f87171)";
}

function vendorDisplayName(slug: string): string {
    const v = vendors.find(v => v.slug === slug);
    return v?.name ?? slug;
}

export async function PeptidePurityChart({ peptideSlug, peptideName }: Props) {
    const rows = await getPeptidePurityAcrossVendors(peptideSlug);

    // Schema.org Dataset
    const datasetSchema = {
        "@context": "https://schema.org",
        "@type": "Dataset",
        "name": `${peptideName} Purity Comparison Across Vendors`,
        "description": `Average HPLC purity percentages for ${peptideName} aggregated from Certificates of Analysis published by verified peptide vendors.`,
        "url": `https://peptidex.app/peptides/${peptideSlug}`,
        "creator": { "@type": "Organization", "name": "PeptiDex", "url": "https://peptidex.app" },
        "license": "https://peptidex.app/about/lab-data-methodology",
        "isAccessibleForFree": true,
        "measurementTechnique": "HPLC, LC-MS",
        "variableMeasured": "Purity percentage",
        "distribution": rows.map(r => ({
            "@type": "DataDownload",
            "name": vendorDisplayName(r.vendor_slug),
            "description": `${r.avg_purity?.toFixed(1)}% avg purity, ${r.coa_count} COAs`,
        })),
    };

    return (
        <section
            aria-label={`${peptideName} purity comparison`}
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
                        § Verified Lab Data
                    </div>
                    <h3 style={{
                        fontFamily: "var(--sans, sans-serif)",
                        fontSize: 14,
                        fontWeight: 700,
                        color: "var(--ink, #eee)",
                        margin: 0,
                    }}>
                        Purity by Vendor — {peptideName}
                    </h3>
                </div>
                <Link
                    href="/lab-data"
                    style={{
                        fontFamily: "var(--mono, monospace)",
                        fontSize: 9,
                        color: "var(--gold, #c9a961)",
                        textDecoration: "none",
                    }}
                >
                    Full lab dashboard →
                </Link>
            </div>

            {rows.length === 0 ? (
                <DataUpdatingPlaceholder
                    message="COA data not yet available for this peptide"
                />
            ) : (
                <>
                    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                        {rows.map((row, i) => {
                            const color = row.avg_purity ? purityColor(row.avg_purity) : "var(--ink-mute)";
                            const barWidth = row.avg_purity
                                ? Math.max(0, ((row.avg_purity - 90) / 10) * 100)
                                : 0;

                            return (
                                <div key={row.vendor_slug} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                    {/* Rank */}
                                    <div style={{
                                        fontFamily: "var(--mono, monospace)",
                                        fontSize: 10,
                                        color: i === 0 ? "var(--gold, #c9a961)" : "var(--ink-mute, #555)",
                                        fontWeight: 700,
                                        width: 18,
                                        textAlign: "center",
                                        flexShrink: 0,
                                    }}>
                                        {i + 1}
                                    </div>

                                    {/* Vendor name */}
                                    <div style={{ flex: "0 0 130px" }}>
                                        <span style={{
                                            fontFamily: "var(--sans, sans-serif)",
                                            fontSize: 12,
                                            fontWeight: 600,
                                            color: "var(--ink-dim, #ccc)",
                                        }}>
                                            {vendorDisplayName(row.vendor_slug)}
                                        </span>
                                        <div style={{
                                            fontFamily: "var(--mono, monospace)",
                                            fontSize: 9,
                                            color: "var(--ink-mute, #555)",
                                        }}>
                                            {row.coa_count} COA{row.coa_count !== 1 ? "s" : ""}
                                            {row.latest_test ? ` · ${row.latest_test}` : ""}
                                        </div>
                                    </div>

                                    {/* Bar */}
                                    <div style={{
                                        flex: 1,
                                        height: 6,
                                        background: "var(--line, #222)",
                                        borderRadius: 3,
                                        overflow: "hidden",
                                    }}>
                                        <div style={{
                                            height: "100%",
                                            width: `${barWidth}%`,
                                            background: color,
                                            borderRadius: 3,
                                            transition: "width 0.4s ease",
                                        }} />
                                    </div>

                                    {/* Value */}
                                    {row.avg_purity !== null ? (
                                        <div style={{
                                            fontFamily: "var(--mono, monospace)",
                                            fontSize: 13,
                                            fontWeight: 700,
                                            color,
                                            flex: "0 0 50px",
                                            textAlign: "right",
                                        }}>
                                            {row.avg_purity.toFixed(1)}%
                                        </div>
                                    ) : (
                                        <DataUpdatingPlaceholder compact />
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    {/* Footer */}
                    <div style={{
                        fontFamily: "var(--mono, monospace)",
                        fontSize: 9,
                        color: "var(--ink-mute, #555)",
                        marginTop: 14,
                        lineHeight: 1.6,
                        borderTop: "1px solid var(--line, #222)",
                        paddingTop: 10,
                    }}>
                        Bars scaled 90–100% · Source: vendor-published COAs ·{" "}
                        <Link href="/about/lab-data-methodology" style={{ color: "var(--gold, #c9a961)", textDecoration: "none" }}>
                            Methodology
                        </Link>{" "}
                        · Min {MIN_COA_COUNT} COAs per vendor to appear
                    </div>
                </>
            )}
        </section>
    );
}
