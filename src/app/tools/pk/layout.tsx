import type { Metadata } from "next";
import { SITE_STATS } from "@/data/site-stats";

export const metadata: Metadata = {
    title: "Peptide PK Plasma Graphs   Half-Life & Concentration Curves",
    description: `Visualize peptide pharmacokinetics: plasma concentration vs. time curves for ${SITE_STATS.peptides.count} peptides. See time to peak and half-life decay for BPC-157, Ipamorelin, CJC-1295, and more.`,
    keywords: ["peptide pharmacokinetics", "peptide half-life graph", "peptide plasma curve", "BPC-157 half-life", "CJC-1295 half-life", "peptide PK model", "peptide concentration curve"],
    openGraph: {
        title: "Peptide PK Plasma Graphs   Pharmacokinetics Visualizer | PeptiDex",
        description: `Interactive pharmacokinetic plasma concentration curves for ${SITE_STATS.peptides.count} peptides. Visualize peaks and half-life decay.`,
        type: "website",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}

