import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Lab Data Methodology — How We Score Vendor Trust | PeptiDex",
    description: "Full disclosure of PeptiDex's vendor trust scoring methodology. Four components: purity consistency, COA recency, lab credibility, and catalog coverage. Every formula published.",
    alternates: { canonical: "https://peptidex.app/about/lab-data-methodology" },
};

export default function LabDataMethodologyPage() {
    return (
        <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
            <div className="page-header">
                <div className="page-header-grid" />
                <div className="page-header-wrap">
                    <nav className="breadcrumb">
                        <Link href="/">Home</Link>
                        <span className="sep">/</span>
                        <Link href="/about">About</Link>
                        <span className="sep">/</span>
                        <span className="current">Lab Data Methodology</span>
                    </nav>
                    <h1 className="page-title">
                        Lab Data <em>Methodology</em>
                    </h1>
                    <p className="page-subtitle">
                        Full disclosure of how we aggregate COA data and compute vendor trust scores.
                        Every formula is published here. No black boxes.
                    </p>
                </div>
            </div>

            <article className="about-content" style={{ maxWidth: 740 }}>

                {/* Overview */}
                <section className="mb-10">
                    <h2 style={h2Style}>Overview</h2>
                    <p style={pStyle}>
                        PeptiDex aggregates publicly-posted Certificates of Analysis (COAs) from verified peptide vendors.
                        We extract purity percentages, test dates, lab names, and batch IDs from these documents, then compute
                        rolling averages and composite trust scores that help researchers evaluate vendor quality over time.
                    </p>
                    <p style={pStyle}>
                        We <strong>never</strong> republish COA documents. We link to the vendor&apos;s original source URL.
                        We <strong>never</strong> access gated or login-required documents. Only publicly-posted COAs are aggregated.
                    </p>
                </section>

                {/* Data Sources */}
                <section className="mb-10">
                    <h2 style={h2Style}>Data Sources</h2>
                    <div style={tableStyle}>
                        <table style={{ width: "100%", borderCollapse: "collapse" }}>
                            <thead>
                                <tr>
                                    <th style={thStyle}>Source</th>
                                    <th style={thStyle}>Description</th>
                                    <th style={thStyle}>Weight</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td style={tdStyle}>Vendor-Published COAs</td>
                                    <td style={tdStyle}>PDFs and documents posted on vendor websites</td>
                                    <td style={tdStyle}>Primary</td>
                                </tr>
                                <tr>
                                    <td style={tdStyle}>Manual Verification</td>
                                    <td style={tdStyle}>COAs manually verified by PeptiDex editorial team</td>
                                    <td style={tdStyle}>Primary</td>
                                </tr>
                                <tr>
                                    <td style={tdStyle}>Community Submissions</td>
                                    <td style={tdStyle}>User-submitted COA data (verified before inclusion)</td>
                                    <td style={tdStyle}>Secondary</td>
                                </tr>
                                <tr>
                                    <td style={tdStyle}>Finnrick Independent Tests</td>
                                    <td style={tdStyle}>Third-party testing database (attributed, not PeptiDex data)</td>
                                    <td style={tdStyle}>Reference only</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* Trust Score Components */}
                <section className="mb-10">
                    <h2 style={h2Style}>Trust Score Computation</h2>
                    <p style={pStyle}>
                        The vendor trust score is a composite of four equally-weighted components, each worth 0–25 points.
                        Total range: 0–100. Updated after each data collection cycle.
                    </p>

                    {/* Component 1 */}
                    <div style={componentStyle}>
                        <h3 style={h3Style}>1. Purity Consistency (0–25 pts)</h3>
                        <p style={pStyle}>Measures standard deviation (σ) across all non-flagged purity measurements for the vendor.</p>
                        <div style={formulaStyle}>
                            σ &lt; 0.5% → 25 pts &nbsp;|&nbsp; σ &lt; 1.0% → 20 pts &nbsp;|&nbsp; σ &lt; 2.0% → 12 pts &nbsp;|&nbsp; σ ≥ 2.0% → 5 pts
                        </div>
                        <p style={{ ...pStyle, fontSize: 12, color: "var(--ink-mute)" }}>
                            With fewer than 2 data points, a neutral score of 15 is assigned.
                        </p>
                    </div>

                    {/* Component 2 */}
                    <div style={componentStyle}>
                        <h3 style={h3Style}>2. COA Recency (0–25 pts)</h3>
                        <p style={pStyle}>Measures the age (in days) of the most recent COA from the vendor.</p>
                        <div style={formulaStyle}>
                            &lt; 30d → 25 pts &nbsp;|&nbsp; &lt; 60d → 20 pts &nbsp;|&nbsp; &lt; 90d → 15 pts &nbsp;|&nbsp; &lt; 180d → 8 pts &nbsp;|&nbsp; ≥ 180d → 3 pts
                        </div>
                    </div>

                    {/* Component 3 */}
                    <div style={componentStyle}>
                        <h3 style={h3Style}>3. Lab Credibility (0–25 pts)</h3>
                        <p style={pStyle}>
                            Percentage of vendor&apos;s COAs issued by labs from our <Link href="/tools/coa" style={{ color: "var(--gold)" }}>Lab Credibility Registry</Link>.
                            Labs are tiered: <strong>Reputable</strong> (Janoshik, Colmaric, MZ Biolabs, etc.),
                            <strong> Acceptable</strong> (GenScript, etc.), <strong>Unverified</strong>, or <strong>Flagged</strong> (in-house/proprietary).
                        </p>
                        <div style={formulaStyle}>
                            100% reputable → 25 pts &nbsp;|&nbsp; &gt;50% reputable → 18 pts &nbsp;|&nbsp; Any reputable → 12 pts &nbsp;|&nbsp; All unknown → 5 pts &nbsp;|&nbsp; Any flagged → 0 pts
                        </div>
                    </div>

                    {/* Component 4 */}
                    <div style={componentStyle}>
                        <h3 style={h3Style}>4. Catalog Coverage (0–25 pts)</h3>
                        <p style={pStyle}>
                            Percentage of the vendor&apos;s listed catalog that has at least one public COA.
                        </p>
                        <div style={formulaStyle}>
                            ≥ 80% → 25 pts &nbsp;|&nbsp; ≥ 50% → 18 pts &nbsp;|&nbsp; ≥ 25% → 12 pts &nbsp;|&nbsp; ≥ 10% → 6 pts &nbsp;|&nbsp; &lt; 10% → 2 pts
                        </div>
                    </div>
                </section>

                {/* Data Collection */}
                <section className="mb-10">
                    <h2 style={h2Style}>Data Collection</h2>
                    <ul style={ulStyle}>
                        <li>Automated crawler runs <strong>weekly</strong> against publicly-accessible vendor COA pages.</li>
                        <li>Maximum 1 request per vendor per 5 seconds. No concurrent vendor hits.</li>
                        <li>PDF text extraction via <code>pdf-parse</code>. Regex-based extraction of purity %, MW, batch ID, test date, lab name.</li>
                        <li>Any purity value outside 85–100% is <strong>flagged for manual review</strong> and excluded from aggregates until verified.</li>
                        <li>Duplicate detection via SHA-256 hash of PDF content — same document is never processed twice.</li>
                        <li>All raw extracted data is stored alongside the structured record for audit purposes.</li>
                    </ul>
                </section>

                {/* Limitations */}
                <section className="mb-10">
                    <h2 style={h2Style}>Limitations &amp; Disclaimers</h2>
                    <ul style={ulStyle}>
                        <li>PeptiDex does not independently verify COA authenticity. We extract data from vendor-published documents.</li>
                        <li>Vendors who do not publish public COAs receive lower coverage scores, not lower purity scores.</li>
                        <li>Trust scores reflect data availability and consistency, not absolute product quality.</li>
                        <li>Lab credibility tiers are editorial classifications based on public reputation and accreditation status.</li>
                        <li>This system is informational only and does not constitute medical or purchasing advice.</li>
                    </ul>
                </section>

                {/* Vendor rights */}
                <section className="mb-10">
                    <h2 style={h2Style}>For Vendors</h2>
                    <p style={pStyle}>
                        If you are a vendor and believe any data is inaccurate, please <Link href="/contact" style={{ color: "var(--gold)" }}>contact us</Link>.
                        We will investigate and correct any errors within 48 hours. Vendors can improve their trust scores by:
                    </p>
                    <ul style={ulStyle}>
                        <li>Publishing more COAs publicly (improves catalog coverage)</li>
                        <li>Using reputable third-party labs (improves lab credibility)</li>
                        <li>Publishing COAs frequently (improves recency)</li>
                        <li>Maintaining consistent purity across batches (improves consistency)</li>
                    </ul>
                </section>

                <p style={{ ...pStyle, fontFamily: "var(--mono)", fontSize: 11, color: "var(--ink-mute)" }}>
                    Last updated: May 2026 · <Link href="/about" style={{ color: "var(--ink-mute)" }}>About PeptiDex</Link> · <Link href="/about/editorial-policy" style={{ color: "var(--ink-mute)" }}>Editorial Policy</Link>
                </p>
            </article>
        </div>
    );
}

// ── Styles ──────────────────────────────────────────────────────────────────

const h2Style: React.CSSProperties = { fontFamily: "var(--sans)", fontSize: 20, fontWeight: 700, color: "var(--ink)", marginBottom: 12, paddingBottom: 8, borderBottom: "1px solid var(--line)" };
const h3Style: React.CSSProperties = { fontFamily: "var(--sans)", fontSize: 15, fontWeight: 600, color: "var(--gold)", marginBottom: 8 };
const pStyle: React.CSSProperties = { fontFamily: "var(--sans)", fontSize: 14, color: "var(--ink-dim)", lineHeight: 1.7, marginBottom: 12 };
const ulStyle: React.CSSProperties = { fontFamily: "var(--sans)", fontSize: 14, color: "var(--ink-dim)", lineHeight: 1.7, paddingLeft: 20, listStyleType: "disc" };
const componentStyle: React.CSSProperties = { marginBottom: 24, padding: 16, borderRadius: 12, background: "var(--bg-card)", border: "1px solid var(--line)" };
const formulaStyle: React.CSSProperties = { fontFamily: "var(--mono)", fontSize: 11, color: "var(--gold)", background: "rgba(201,169,97,0.06)", border: "1px solid rgba(201,169,97,0.15)", padding: "8px 12px", borderRadius: 8, marginTop: 8, marginBottom: 8, lineHeight: 1.8 };
const tableStyle: React.CSSProperties = { borderRadius: 8, overflow: "hidden", border: "1px solid var(--line)" };
const thStyle: React.CSSProperties = { fontFamily: "var(--mono)", fontSize: 10, color: "var(--ink-mute)", textTransform: "uppercase", letterSpacing: "0.1em", textAlign: "left", padding: "8px 12px", background: "var(--bg-soft)", borderBottom: "1px solid var(--line)" };
const tdStyle: React.CSSProperties = { fontFamily: "var(--sans)", fontSize: 13, color: "var(--ink-dim)", padding: "8px 12px", borderBottom: "1px solid var(--line)" };
