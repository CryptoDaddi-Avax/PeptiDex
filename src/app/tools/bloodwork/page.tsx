import type { Metadata } from "next";
import { buildSoftwareApplicationSchema } from "@/lib/seo/schema";
import BloodworkClient from "./BloodworkClient";

export const metadata: Metadata = {
    title: "Bloodwork Analyzer — Peptide Recommendations from Lab Results",
    description:
        "Free bloodwork analyzer: enter lab results for 8 biomarkers and get evidence-based peptide recommendations for out-of-range values.",
    alternates: { canonical: "https://peptidex.app/tools/bloodwork" },
    openGraph: {
        title: "Bloodwork Analyzer — Peptide Recommendations | PeptiDex",
        description: "Input your lab results and get personalized peptide insights based on biomarker analysis.",
        url: "https://peptidex.app/tools/bloodwork",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Bloodwork Analyzer | PeptiDex",
        description: "Free tool: enter biomarker values to get evidence-based peptide recommendations.",
    },
};

const schema = buildSoftwareApplicationSchema({
    name: "PeptiDex Bloodwork Analyzer",
    description: "Analyze lab results against optimal biomarker ranges and receive evidence-based peptide recommendations.",
    url: "https://peptidex.app/tools/bloodwork",
    applicationCategory: "UtilityApplication",
});

export default function BloodworkPage() {
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
            <BloodworkClient />
        </>
    );
}
