import type { Metadata } from "next";
import ToolsClient from "./ToolsClient";

export const metadata: Metadata = {
    title: "Free Peptide Research Tools — Cycle Planner, Comparison, Pricing",
    description: "10 free interactive peptide research tools: Cycle Planner, Evidence Dashboard, Peptide Comparison, Price Comparison, Reconstitution Calculator, COA Analyzer, PK Plasma Curves, and more.",
    keywords: [
        "peptide research tools",
        "peptide reconstitution calculator",
        "peptide comparison tool",
        "peptide cycle planner",
        "COA analyzer",
        "peptide PK graph",
        "peptide interaction checker",
        "peptide half-life calculator",
        "peptide price comparison",
        "peptide evidence dashboard",
    ],
    alternates: {
        canonical: "https://peptidex.app/tools",
    },
    openGraph: {
        title: "Free Peptide Research Tools — Cycle Planner, Comparison, Pricing | PeptiDex",
        description: "10 free interactive peptide research tools for dosing, comparison, pricing, and pharmacokinetics.",
        url: "https://peptidex.app/tools",
        type: "website",
    },
};

export default function ToolsPage() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "CollectionPage",
                name: "Free Peptide Research Tools",
                url: "https://peptidex.app/tools",
                description: "10 free interactive peptide research tools for dosing, comparison, pricing, and pharmacokinetics.",
                isPartOf: { "@type": "WebSite", url: "https://peptidex.app" },
            },
            ...[
                { name: "Cycle Planner", url: "https://peptidex.app/tools/cycle-planner", desc: "Plan your full peptide cycle with exact vial counts, dosing schedules, and vendor sourcing." },
                { name: "Evidence Dashboard", url: "https://peptidex.app/tools/evidence", desc: "51 peptides ranked by strength of clinical evidence with study counts." },
                { name: "Peptide Comparison", url: "https://peptidex.app/tools/compare", desc: "Compare 2-3 peptides side-by-side across mechanisms, dosing, and safety." },
                { name: "Price Comparison", url: "https://peptidex.app/tools/pricing", desc: "Cross-vendor pricing: cost per vial, per dose, and exclusive PEPTIDEX discounts." },
                { name: "Reconstitution Calculator", url: "https://peptidex.app/tools/calculator", desc: "BAC water volumes, concentration math, and syringe-unit conversions." },
                { name: "COA Analyzer", url: "https://peptidex.app/tools/coa", desc: "Verify any Certificate of Analysis with MW and purity checks against lab reference values." },
                { name: "PK Plasma Curves", url: "https://peptidex.app/tools/pk", desc: "Visualize pharmacokinetic plasma concentration curves and half-life decay." },
                { name: "Interaction Checker", url: "https://peptidex.app/tools/interactions", desc: "Check synergies, cautions, and contraindications between peptide selections." },
                { name: "Blood Work Analyzer", url: "https://peptidex.app/tools/bloodwork", desc: "Input your lab results and get personalized peptide suggestions based on biomarkers." },
                { name: "Half-Life Visualizer", url: "https://peptidex.app/tools/halflife", desc: "See how multiple peptides' plasma levels overlap throughout the day." },
            ].map((tool) => ({
                "@type": "WebApplication",
                name: tool.name,
                url: tool.url,
                description: tool.desc,
                applicationCategory: "HealthApplication",
                operatingSystem: "Any",
                offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
            })),
        ],
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <ToolsClient />
        </>
    );
}
