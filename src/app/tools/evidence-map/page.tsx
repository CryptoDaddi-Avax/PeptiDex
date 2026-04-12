import type { Metadata } from "next";
import { peptides } from "@/data/peptides";
import { EvidenceMapClient } from "./client";
import { Beaker, Calendar } from "lucide-react";

export const metadata: Metadata = {
    title: "Peptide Evidence Map: 33 Compounds Ranked by Scientific Evidence [2026]",
    description:
        "Interactive visualization of 33 research peptides ranked by scientific evidence — from FDA-approved compounds to emerging research. Filter by goal, compare evidence tiers, and explore clinical trial data. Updated April 2026.",
    keywords: [
        "peptide research evidence",
        "which peptides have clinical trials",
        "FDA approved peptides",
        "peptide evidence levels",
        "peptide clinical data 2026",
        "research peptides ranked",
        "peptide evidence map",
    ],
    alternates: { canonical: "https://peptidex.app/tools/evidence-map" },
    openGraph: {
        title: "Peptide Evidence Map: 33 Compounds Ranked by Scientific Evidence [2026]",
        description:
            "The most comprehensive visual overview of peptide research evidence. 33 compounds mapped across 4 evidence tiers — from FDA-approved to emerging research. Filter by goal, explore clinical data.",
        url: "https://peptidex.app/tools/evidence-map",
        type: "website",
        images: [
            {
                url: "https://peptidex.app/api/og?type=evidence-map",
                width: 1200,
                height: 630,
                alt: "Peptide Evidence Map — 33 compounds ranked by scientific evidence",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Peptide Evidence Map: 33 Compounds by Evidence Level [2026]",
        description:
            "Interactive visualization of 33 peptides ranked by FDA approval, clinical trials, and preclinical data. The definitive research reference.",
    },
};

export default function EvidenceMapPage() {
    // Compute counts for schema
    const fdaCount = peptides.filter((p) => p.is_fda_approved).length;
    const totalStudies = peptides.reduce(
        (sum, p) => sum + p.key_studies.length,
        0
    );

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
            {
                "@type": "Question",
                name: "How many peptides have FDA approval?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: `Currently ${fdaCount} peptides in our database have FDA approval: Semaglutide (Ozempic/Wegovy), Tirzepatide (Mounjaro/Zepbound), Tesamorelin (Egrifta), and PT-141/Bremelanotide (Vyleesi). Each is approved for specific clinical indications.`,
                },
            },
            {
                "@type": "Question",
                name: "How are evidence tiers determined?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "Evidence tiers are determined by the highest-quality study available for each peptide: FDA Approved (regulatory approval), Strong Clinical (Phase 2/3 human RCTs), Moderate/Preclinical (animal models and mechanistic studies), and Emerging (limited published data). Our editorial team reviews each classification monthly.",
                },
            },
            {
                "@type": "Question",
                name: "How many peptide studies are referenced?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: `The PeptiDex evidence map references ${totalStudies} peer-reviewed studies across ${peptides.length} peptide compounds, sourced primarily from PubMed and indexed clinical trial databases.`,
                },
            },
        ],
    };

    const datasetSchema = {
        "@context": "https://schema.org",
        "@type": "Dataset",
        name: "PeptiDex Peptide Evidence Map",
        description: `Evidence-ranked database of ${peptides.length} research peptides with ${totalStudies} referenced PubMed studies across 4 evidence tiers.`,
        url: "https://peptidex.app/tools/evidence-map",
        creator: {
            "@type": "Organization",
            name: "PeptiDex",
            url: "https://peptidex.app",
        },
        dateModified: "2026-04-12",
        license: "https://creativecommons.org/licenses/by-nc/4.0/",
        keywords: [
            "peptides",
            "clinical evidence",
            "FDA approved",
            "research chemicals",
            "pharmacology",
        ],
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
            {/* Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetSchema) }}
            />

            {/* Header */}
            <header className="text-center mb-10 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest">
                    <Beaker className="w-3.5 h-3.5" /> Interactive Research Tool
                </div>
                <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-zinc-100 leading-tight">
                    Peptide Evidence Map
                </h1>
                <p className="text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed">
                    {peptides.length} research peptides ranked by scientific
                    evidence &mdash; from FDA-approved compounds to emerging
                    research. Filter by goal, compare evidence tiers, and
                    explore clinical data.
                </p>
                <div className="flex items-center justify-center gap-4 text-xs text-zinc-500">
                    <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        Last updated: April 2026
                    </span>
                    <span>&bull;</span>
                    <span>{totalStudies} referenced studies</span>
                    <span>&bull;</span>
                    <span>{fdaCount} FDA-approved</span>
                </div>
            </header>

            {/* Client-side interactive map */}
            <EvidenceMapClient peptides={peptides} />
        </div>
    );
}
