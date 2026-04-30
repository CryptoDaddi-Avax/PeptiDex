import { notFound } from "next/navigation";
import { peptides, getPeptideBySlug } from "@/data/peptides";
import { stacks } from "@/data/stacks";
import { PeptideDetailRedesign } from "./client";

export function generateStaticParams() {
    return peptides.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    return params.then(({ slug }) => {
        const peptide = getPeptideBySlug(slug);
        if (!peptide) return { title: "Not Found" };

        const halfLifeStr = peptide.half_life_hours
            ? peptide.half_life_hours >= 24
                ? `${(peptide.half_life_hours / 24).toFixed(0)}-day half-life`
                : `${peptide.half_life_hours}h half-life`
            : "";
        const year = new Date().getFullYear();
        const title = `${peptide.name} Dosage, Studies & Side Effects (${year} Research Guide)`;
        const description = `${peptide.name} research guide: mechanism of action, dosing (${peptide.dosing?.typical_dose_mcg?.[0] ?? ""}â€“${peptide.dosing?.typical_dose_mcg?.[1] ?? ""}mcg), ${halfLifeStr}, clinical studies, and safety profile. ${peptide.mechanism.slice(0, 100)}`;
        const url = `https://peptidex.app/library/${slug}`;

        return {
            title,
            description,
            keywords: [
                peptide.name,
                ...(peptide.aliases ?? []),
                `${peptide.name} dosage`,
                `${peptide.name} half-life`,
                `${peptide.name} benefits`,
                `${peptide.name} side effects`,
                `${peptide.name} research`,
                `${peptide.name} protocol`,
                "research peptides",
                peptide.category,
            ],
            alternates: { canonical: url },
            openGraph: {
                type: "article",
                url,
                title,
                description,
                siteName: "PeptiDex",
                images: [{ url: "/og-image.png", width: 1200, height: 630, alt: `${peptide.name} â€” PeptiDex Research Guide` }],
            },
            twitter: {
                card: "summary_large_image",
                title,
                description,
                images: ["/og-image.png"],
            },
        };
    });
}


export default async function PeptideDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const peptide = getPeptideBySlug(slug);
    if (!peptide) notFound();

    const relatedStacks = stacks.filter((s) =>
        s.peptides.some((sp) => sp.name.toLowerCase().includes(peptide.name.toLowerCase()))
    );

    return <PeptideDetailRedesign peptide={peptide} relatedStacks={relatedStacks} />;
}
