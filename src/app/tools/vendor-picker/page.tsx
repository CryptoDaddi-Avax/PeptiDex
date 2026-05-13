import type { Metadata } from "next";
import Link from "next/link";
import { SmartVendorPicker } from "@/components/tools/SmartVendorPicker";

export const metadata: Metadata = {
    title: "Vendor Picker — Find the Best Peptide Vendor for Your Needs",
    description: "Answer 4 questions — peptide, region, payment preference, and priority — and get one recommended vendor with reasoning. No ads, no sponsored rankings.",
    alternates: { canonical: "https://peptidex.app/tools/vendor-picker" },
    openGraph: {
        title: "Smart Vendor Picker | PeptiDex",
        description: "4 questions. One recommendation. The fastest way to find the right peptide vendor.",
        url: "https://peptidex.app/tools/vendor-picker",
    },
};

export default function VendorPickerPage() {
    return (
        <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
            <div className="page-header">
                <div className="page-header-grid" />
                <div className="page-header-wrap">
                    <nav className="breadcrumb">
                        <Link href="/">Home</Link>
                        <span className="sep">/</span>
                        <Link href="/tools">Tools</Link>
                        <span className="sep">/</span>
                        <span className="current">Vendor Picker</span>
                    </nav>
                    <h1 className="page-title">
                        Smart <em>Vendor</em> Picker
                    </h1>
                    <p className="page-subtitle">
                        4 questions. One recommendation. No sponsorships — purely scored on purity,
                        shipping, COA documentation, and price after discount codes.
                    </p>
                </div>
            </div>

            <div className="about-content" style={{ maxWidth: 560 }}>
                {/* JSON-LD for the tool */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "WebApplication",
                            "name": "PeptiDex Smart Vendor Picker",
                            "url": "https://peptidex.app/tools/vendor-picker",
                            "description": "4-question wizard that recommends the best peptide vendor based on peptide, region, payment, and priority.",
                            "applicationCategory": "HealthApplication",
                            "operatingSystem": "Web",
                        }),
                    }}
                />

                <SmartVendorPicker mode="page" />

                {/* How it works */}
                <section className="mt-10">
                    <h2 style={{ fontFamily: "var(--sans)", fontSize: 16, fontWeight: 600, color: "var(--ink)", marginBottom: 12 }}>
                        How It Works
                    </h2>
                    <div className="space-y-3">
                        {[
                            { n: "1", label: "Pick your peptide", desc: "Search across all 52 peptides in our catalog." },
                            { n: "2", label: "Set your region", desc: "US-only or international — filters out vendors that can't ship to you." },
                            { n: "3", label: "Choose payment method", desc: "Credit card, crypto, or either — eliminates incompatible vendors." },
                            { n: "4", label: "Pick your priority", desc: "Cheapest price, fastest shipping, highest purity, or best COA documentation." },
                        ].map(item => (
                            <div key={item.n} className="flex gap-3 items-start">
                                <div
                                    style={{
                                        width: 28, height: 28, borderRadius: 8,
                                        background: "rgba(201,169,97,0.15)", border: "1px solid rgba(201,169,97,0.3)",
                                        display: "flex", alignItems: "center", justifyContent: "center",
                                        fontFamily: "var(--mono)", fontSize: 12, fontWeight: 700, color: "var(--gold)",
                                        flexShrink: 0,
                                    }}
                                >
                                    {item.n}
                                </div>
                                <div>
                                    <div style={{ fontFamily: "var(--sans)", fontSize: 13, fontWeight: 600, color: "var(--ink)" }}>{item.label}</div>
                                    <div style={{ fontFamily: "var(--sans)", fontSize: 12, color: "var(--ink-dim)" }}>{item.desc}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <p className="mt-6" style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--ink-mute)", lineHeight: 1.6 }}>
                    Scoring is based on verified vendor data: purity claims, testing methods, shipping speeds, COA documentation quality,
                    and post-discount pricing. PeptiDex may earn affiliate commissions from purchases.
                    This does not affect scoring. <Link href="/disclaimer" style={{ color: "var(--ink-mute)" }}>Full disclosure →</Link>
                </p>
            </div>
        </div>
    );
}
