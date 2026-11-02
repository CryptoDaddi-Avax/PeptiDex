import type { Metadata } from "next";
import { buildSoftwareApplicationSchema } from "@/lib/seo/schema";
import PKClient from "./PKClient";

export const metadata: Metadata = {
    title: "Peptide PK Plasma Curve Simulator — Pharmacokinetics Tool",
    description:
        "Free PK curve simulator: visualize the shape of a peptide's plasma concentration curve over time, from published half-life data.",
    alternates: { canonical: "https://peptidex.app/tools/pk" },
    openGraph: {
        title: "PK Plasma Curve Simulator | PeptiDex",
        description: "Simulate peptide pharmacokinetics: normalized plasma concentration curves from published half-life data.",
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
    description: "Simulate normalized pharmacokinetic plasma concentration curves for peptides from published half-life and time-to-peak data.",
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
