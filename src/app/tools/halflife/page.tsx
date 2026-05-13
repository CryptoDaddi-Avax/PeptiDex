import type { Metadata } from "next";
import { buildSoftwareApplicationSchema } from "@/lib/seo/schema";
import HalfLifeClient from "./HalfLifeClient";

export const metadata: Metadata = {
    title: "Peptide Half-Life Visualizer — Decay Curve Overlay Tool",
    description:
        "Free half-life visualizer: compare up to 8 peptide decay curves side-by-side. Adjust injection times to optimize protocol timing.",
    alternates: { canonical: "https://peptidex.app/tools/halflife" },
    openGraph: {
        title: "Peptide Half-Life Visualizer | PeptiDex",
        description: "Compare peptide plasma decay curves side-by-side with adjustable injection timing.",
        url: "https://peptidex.app/tools/halflife",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Peptide Half-Life Visualizer | PeptiDex",
        description: "Free tool to visualize and compare peptide half-life decay curves.",
    },
};

const schema = buildSoftwareApplicationSchema({
    name: "PeptiDex Half-Life Visualizer",
    description: "Visualize peptide plasma decay curves and compare half-lives across multiple compounds.",
    url: "https://peptidex.app/tools/halflife",
    applicationCategory: "UtilityApplication",
});

export default function HalfLifePage() {
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
            <HalfLifeClient />
        </>
    );
}
