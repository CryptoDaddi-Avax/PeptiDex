import type { Metadata } from "next";
import Link from "next/link";
import { buildHowToSchema, buildSoftwareApplicationSchema } from "@/lib/seo/schema";
import { EmbedModal } from "@/components/embed-modal";
import CalculatorClient from "./CalculatorClient";

export const metadata: Metadata = {
    title: "Peptide Reconstitution Calculator — Free BAC Water Tool",
    description:
        "Free reconstitution calculator for any peptide. Enter vial size and BAC water volume to get exact syringe units instantly.",
    alternates: { canonical: "https://peptidex.app/tools/calculator" },
    openGraph: {
        title: "Peptide Reconstitution Calculator — Free BAC Water Tool | PeptiDex",
        description:
            "Free reconstitution calculator for any research peptide. Get exact concentrations, syringe units, and doses-per-vial.",
        url: "https://peptidex.app/tools/calculator",
        type: "website",
        images: [{ url: "https://peptidex.app/og-image.png", width: 1200, height: 630 }],
    },
    twitter: {
        card: "summary_large_image",
        title: "Peptide Reconstitution Calculator | PeptiDex",
        description:
            "Free tool: enter vial mg, BAC water mL, and target dose to calculate exact syringe units for any peptide.",
    },
};

// ── JSON-LD schemas (server-rendered for crawlers) ─────────────────────

const softwareSchema = buildSoftwareApplicationSchema({
    name: "PeptiDex Reconstitution Calculator",
    description:
        "Calculate solution concentrations and volumetric measurements for peptide reconstitution.",
    url: "https://peptidex.app/tools/calculator",
    applicationCategory: "UtilityApplication",
});

const howToSchema = buildHowToSchema({
    name: "How to Reconstitute Peptides",
    description:
        "Step-by-step guide to calculating and measuring peptide reconstitution.",
    totalTime: "PT5M",
    supply: ["Lyophilized Peptide", "Bacteriostatic Water"],
    tool: ["Graduated Pipette"],
    steps: [
        {
            name: "Step 1: Reconstitution",
            text: "Add bacteriostatic water to the lyophilized peptide. The ratio determines the concentration.",
        },
        {
            name: "Step 2: Concentration Calculation",
            text: "Divide total peptide mass by diluent volume to find the concentration in mcg/mL.",
        },
        {
            name: "Step 3: Volumetric Measurement",
            text: "Divide the target dose by the concentration to find the volume to dispense in mL.",
        },
    ],
});

const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://peptidex.app/" },
        { "@type": "ListItem", position: 2, name: "Tools", item: "https://peptidex.app/tools" },
        { "@type": "ListItem", position: 3, name: "Calculator", item: "https://peptidex.app/tools/calculator" },
    ],
};

export default function CalculatorPage() {
    return (
        <>
            {/* ── Server-rendered JSON-LD ── */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />

            {/* ── Server-rendered editorial header ── */}
            <header
                className="cmp-hero"
                style={{
                    position: "relative",
                    overflow: "hidden",
                    padding: "64px 24px 48px",
                    background: "var(--bg)",
                    borderBottom: "1px solid var(--line)",
                }}
            >
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        backgroundImage:
                            "linear-gradient(var(--line) 1px, transparent 1px), linear-gradient(90deg, var(--line) 1px, transparent 1px)",
                        backgroundSize: "80px 80px",
                        maskImage:
                            "radial-gradient(ellipse at 70% 30%, black 0%, transparent 70%)",
                        WebkitMaskImage:
                            "radial-gradient(ellipse at 70% 30%, black 0%, transparent 70%)",
                        opacity: 0.4,
                        pointerEvents: "none",
                    }}
                />
                <div
                    style={{
                        maxWidth: 800,
                        margin: "0 auto",
                        position: "relative",
                    }}
                >
                    <div
                        style={{
                            fontFamily: "var(--mono)",
                            fontSize: 11,
                            letterSpacing: "0.2em",
                            textTransform: "uppercase",
                            color: "var(--ink-mute)",
                            marginBottom: 32,
                            display: "flex",
                            alignItems: "center",
                            gap: 12,
                        }}
                    >
                        <Link
                            href="/"
                            style={{
                                color: "var(--ink-mute)",
                                textDecoration: "none",
                            }}
                        >
                            Home
                        </Link>
                        <span style={{ color: "var(--line-strong)" }}>/</span>
                        <Link
                            href="/tools"
                            style={{
                                color: "var(--ink-mute)",
                                textDecoration: "none",
                            }}
                        >
                            Tools
                        </Link>
                        <span style={{ color: "var(--line-strong)" }}>/</span>
                        <span style={{ color: "var(--gold)" }}>Calculator</span>
                    </div>
                    <div
                        style={{
                            fontFamily: "var(--mono)",
                            fontSize: 11,
                            letterSpacing: "0.25em",
                            textTransform: "uppercase",
                            color: "var(--gold)",
                            marginBottom: 24,
                            display: "flex",
                            alignItems: "center",
                            gap: 12,
                        }}
                    >
                        <span
                            style={{
                                width: 32,
                                height: 1,
                                background: "var(--gold)",
                                display: "inline-block",
                            }}
                        />
                        § Interactive Tool
                    </div>
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                        <h1
                            style={{
                                fontFamily: "var(--serif)",
                                fontSize: "clamp(40px, 6vw, 64px)",
                                fontWeight: 300,
                                lineHeight: 1,
                                letterSpacing: "-0.03em",
                                margin: 0,
                                maxWidth: 600,
                            }}
                        >
                            Reconstitution{" "}
                            <em
                                style={{
                                    fontStyle: "italic",
                                    color: "var(--gold)",
                                }}
                            >
                                Calculator
                            </em>
                            .
                        </h1>
                        <div className="mt-2 hidden sm:block">
                            <EmbedModal
                                title="Peptide Reconstitution Calculator"
                                path="/tools/calculator"
                            />
                        </div>
                    </div>
                    <p
                        style={{
                            fontSize: 18,
                            color: "var(--ink-dim)",
                            maxWidth: 680,
                            lineHeight: 1.6,
                        }}
                    >
                        Calculate solution concentrations and volumetric
                        measurements for peptide reconstitution. Need a trusted
                        source for your research? Compare{" "}
                        <Link
                            href="/where-to-buy"
                            style={{
                                color: "var(--gold)",
                                textDecoration: "underline",
                                textUnderlineOffset: 2,
                            }}
                        >
                            where to buy peptides online
                        </Link>{" "}
                        from our verified vendors.
                    </p>

                    {/* ── Substantive SEO intro (server-rendered) ── */}
                    <div
                        style={{
                            marginTop: 24,
                            padding: "16px 20px",
                            background: "rgba(56, 189, 248, 0.04)",
                            border: "1px solid rgba(56, 189, 248, 0.12)",
                            borderRadius: 12,
                        }}
                    >
                        <p
                            style={{
                                fontSize: 14,
                                color: "var(--ink-dim)",
                                lineHeight: 1.7,
                                margin: 0,
                            }}
                        >
                            Reconstitution is the process of dissolving a
                            freeze-dried (lyophilized) peptide into a measurable
                            liquid solution using bacteriostatic water. Getting
                            the math right matters — an incorrect
                            water-to-powder ratio changes the concentration of
                            every dose drawn from the vial. This calculator
                            handles the C₁V₁&nbsp;=&nbsp;C₂V₂ dilution math
                            automatically: enter your vial size in milligrams,
                            the volume of BAC water you plan to add, and the
                            target dose in micrograms. It returns the solution
                            concentration (mcg/mL), the exact volume to draw on
                            a U-100 insulin syringe, and the total number of
                            doses per vial. The tool supports all 51 peptides in
                            our library plus popular blends, and pre-fills
                            typical protocol values when a compound is selected.
                        </p>
                    </div>

                    <div className="sm:hidden mt-6">
                        <EmbedModal
                            title="Peptide Reconstitution Calculator"
                            path="/tools/calculator"
                        />
                    </div>
                </div>
            </header>

            {/* ── Client-rendered interactive calculator ── */}
            <CalculatorClient />
        </>
    );
}
