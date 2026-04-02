import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Peptide Tools   Dosage Calculator, COA Analyzer, PK Graphs & More",
    description: "Professional-grade peptide research tools: Dosage Calculator with Visual Syringe Guide, PK Plasma Graphs, COA Certificate Analyzer, Interaction Checker, Evidence Dashboard, and AI Peptide Advisor.",
    keywords: ["peptide dosage calculator", "COA analyzer", "peptide PK graph", "peptide interaction checker", "peptide tools", "peptide half-life calculator", "reconstitution calculator"],
    openGraph: {
        title: "Peptide Tools   Dosage Calculator, COA Analyzer & More | PeptiDex",
        description: "Research-grade peptide tools: dosage calculator, COA verification, PK plasma curves, evidence dashboard, and AI advisor.",
        type: "website",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}

