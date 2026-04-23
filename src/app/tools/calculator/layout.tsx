import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Peptide Reconstitution & Concentration Calculator | PeptiDex",
    description: "Calculate peptide reconstitution concentrations for laboratory research. Input lyophilized peptide mass, diluent volume, and target concentration to determine precise volumetric measurements. Supports common research-grade reconstitution protocols.",
    keywords: ["peptide reconstitution calculator", "concentration calculator", "peptide dilution tool", "bacteriostatic water volume", "mcg per mL calculator", "laboratory peptide calculator"],
    openGraph: {
        title: "Peptide Reconstitution & Concentration Calculator | PeptiDex",
        description: "Laboratory-grade reconstitution calculator for peptide research. Determine solution concentrations and volumetric measurements from lyophilized peptide mass and diluent volume.",
        type: "website",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
