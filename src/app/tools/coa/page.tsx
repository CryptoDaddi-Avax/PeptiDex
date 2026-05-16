import type { Metadata } from "next";
import { buildSoftwareApplicationSchema } from "@/lib/seo/schema";
import CoaClient from "./CoaClient";
import { SITE_STATS } from "@/data/site-stats";

export const metadata: Metadata = {
    title: "COA Analyzer — Verify Peptide Certificates of Analysis",
    description:
        `Free COA verification tool: check molecular weight and purity against reference values for ${SITE_STATS.peptides.count} peptides. Detects red flags instantly.`,
    alternates: { canonical: "https://peptidex.app/tools/coa" },
    openGraph: {
        title: "COA Analyzer — Peptide Certificate Verification | PeptiDex",
        description: "Verify peptide COAs by comparing reported molecular weight and purity against expected reference values.",
        url: "https://peptidex.app/tools/coa",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "COA Analyzer | PeptiDex",
        description: "Free tool to verify peptide Certificate of Analysis data against reference molecular weights and purity thresholds.",
    },
};

const schema = buildSoftwareApplicationSchema({
    name: "PeptiDex COA Analyzer",
    description: "Verify peptide Certificate of Analysis against expected molecular weight and purity values.",
    url: "https://peptidex.app/tools/coa",
    applicationCategory: "UtilityApplication",
});

export default function CoaPage() {
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
            <CoaClient />
        </>
    );
}
