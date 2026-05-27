import type { Metadata } from "next";
import { buildSoftwareApplicationSchema } from "@/lib/seo/schema";
import PKClient from "./PKClient";

export const metadata: Metadata = {
    title: "Peptide PK Plasma Curve Simulator — Pharmacokinetics Tool",
    description:
        "Free PK curve simulator: visualize plasma concentration over time for any peptide with adjustable dose and frequency.",
    alternates: { canonical: "https://peptidex.app/tools/pk" },
    openGraph: {
        title: "PK Plasma Curve Simulator | PeptiDex",
        description: "Simulate peptide pharmacokinetics with adjustable dosing frequency and concentration curves.",
        url: "https://peptidex.app/tools/pk",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "PK Plasma Curve Simulator | PeptiDex",
        description: "Free pharmacokinetics tool: model peptide plasma concentration over time.",
    },
};

const schema = buildSoftwareApplicationSchema({
    name: "PeptiDex PK Curve Simulator",
    description: "Simulate pharmacokinetic plasma concentration curves for peptides with adjustable dose and frequency parameters.",
    url: "https://peptidex.app/tools/pk",
    applicationCategory: "UtilityApplication",
});

export default async function PKPage({ searchParams }: { searchParams: Promise<{ peptide?: string }> }) {
    const { peptide } = await searchParams;
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
            <PKClient initialPeptide={peptide} />
        </>
    );
}
