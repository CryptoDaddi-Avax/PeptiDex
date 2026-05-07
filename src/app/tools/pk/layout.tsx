import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Peptide PK Plasma Graphs   Half-Life & Concentration Curves",
    description: "Visualize peptide pharmacokinetics: plasma concentration vs. time curves for 51 peptides. See peaks, half-life decay, and multi-dose accumulation for BPC-157, Semaglutide, CJC-1295, and more.",
    keywords: ["peptide pharmacokinetics", "peptide half-life graph", "peptide plasma curve", "BPC-157 half-life", "Semaglutide half-life", "peptide PK model", "peptide concentration curve"],
    openGraph: {
        title: "Peptide PK Plasma Graphs   Pharmacokinetics Visualizer | PeptiDex",
        description: "Interactive pharmacokinetic plasma concentration curves for 51 peptides. Visualize peaks, half-life decay, and accumulation patterns.",
        type: "website",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}

