import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen } from "lucide-react";
import { glossary } from "@/data/glossary";
import GlossaryClient from "./GlossaryClient";

export const metadata: Metadata = {
    title: "Peptide Glossary — Terms, Acronyms & Definitions",
    description:
        `${glossary.length}+ peptide terms explained in plain English. Searchable glossary covering pharmacology, chemistry, and administration.`,
    alternates: { canonical: "https://peptidex.app/glossary" },
    openGraph: {
        title: "Peptide Glossary — Terms, Acronyms & Definitions | PeptiDex",
        description: `${glossary.length}+ peptide science terms explained in plain English. Filter by category, search by keyword.`,
        url: "https://peptidex.app/glossary",
        type: "website",
        images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    },
    twitter: {
        card: "summary_large_image",
        title: "Peptide Glossary | PeptiDex",
        description: `${glossary.length}+ terms covering peptide pharmacology, chemistry, administration, and clinical research.`,
    },
};

const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://peptidex.app/" },
        { "@type": "ListItem", position: 2, name: "Glossary", item: "https://peptidex.app/glossary" },
    ],
};

// Build a DefinedTermSet schema for rich results
const definedTermSetSchema = {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    name: "Peptide Research Glossary",
    description: "A comprehensive glossary of peptide science terms covering pharmacology, biology, chemistry, administration, and clinical research.",
    url: "https://peptidex.app/glossary",
    hasDefinedTerm: glossary.slice(0, 30).map((term) => ({
        "@type": "DefinedTerm",
        name: term.term,
        description: term.definition,
    })),
};

export default function GlossaryPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSetSchema) }}
            />

            {/* ── Server-rendered above-the-fold content ── */}
            <div className="max-w-3xl mx-auto px-4 pt-6 md:pt-8">
                <nav aria-label="Breadcrumb" className="flex items-center gap-2 mb-4">
                    <Link href="/" className="text-zinc-500 hover:text-amber-400 transition-colors text-xs">Home</Link>
                    <span className="text-zinc-700 text-xs">/</span>
                    <span className="text-zinc-200 font-medium text-xs">Glossary</span>
                </nav>

                <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center">
                        <BookOpen className="w-5 h-5 text-violet-400" />
                    </div>
                    <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-zinc-100">Peptide Glossary</h1>
                </div>

                <p className="text-[15px] text-zinc-400 leading-relaxed mb-2 max-w-xl">
                    <strong className="text-zinc-300">{glossary.length} terms</strong> covering
                    every concept you&apos;ll encounter in peptide research — from amino acid
                    chemistry and pharmacokinetic abbreviations to administration routes and
                    clinical trial phases. Each definition is written in plain English and
                    cross-linked to relevant compound profiles in our{" "}
                    <Link href="/library" className="text-violet-400 hover:text-violet-300 transition-colors underline underline-offset-2">
                        peptide library
                    </Link>
                    . Use the search bar and category filters below to find exactly what
                    you need.
                </p>
            </div>

            {/* ── Client-rendered interactive glossary ── */}
            <GlossaryClient />
        </>
    );
}
