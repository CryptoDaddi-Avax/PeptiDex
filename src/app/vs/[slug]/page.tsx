import { notFound } from "next/navigation";
import { matchups, getMatchup } from "@/data/matchups";
import { getPeptideBySlug } from "@/data/peptides";
import { Metadata } from "next";
import VsPageClient from "./client";

export function generateStaticParams() {
    return matchups.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const matchup = getMatchup(slug);
    if (!matchup) return { title: "Not Found" };

    return {
        title: matchup.title,
        description: matchup.metaDescription,
        keywords: [
            matchup.peptideA, matchup.peptideB,
            `${matchup.peptideA} vs ${matchup.peptideB}`,
            `${matchup.peptideB} vs ${matchup.peptideA}`,
            `${matchup.peptideA} comparison`,
            `${matchup.peptideB} comparison`,
            "peptide comparison",
        ],
        openGraph: {
            type: "article",
            title: matchup.title,
            description: matchup.metaDescription,
            siteName: "PeptiDex",
        },
    };
}

export default async function VsPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const matchup = getMatchup(slug);
    if (!matchup) notFound();

    // Grab peptide data for extra context
    const pepA = getPeptideBySlug(matchup.peptideA.toLowerCase().replace(/[^a-z0-9]+/g, "-"));
    const pepB = getPeptideBySlug(matchup.peptideB.toLowerCase().replace(/[^a-z0-9]+/g, "-"));

    // FAQ JSON-LD
    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: matchup.faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
            <VsPageClient matchup={matchup} pepA={pepA ?? undefined} pepB={pepB ?? undefined} />
        </>
    );
}
