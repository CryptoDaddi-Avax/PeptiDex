import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Peptide Dosage Calculator   Reconstitution & Syringe Guide",
    description: "Calculate exact peptide dosages from vial size and concentration. Visual insulin syringe guide shows exactly how many units to draw. Supports all common reconstitution volumes.",
    keywords: ["peptide dosage calculator", "reconstitution calculator", "peptide syringe guide", "how much bacteriostatic water", "insulin syringe units", "peptide mcg calculator"],
    openGraph: {
        title: "Peptide Dosage Calculator   Reconstitution & Visual Syringe Guide | PeptiDex",
        description: "Calculate exact peptide doses with an animated visual syringe guide. Input vial mg, BAC water volume, and desired mcg dose   see exactly how many units to draw.",
        type: "website",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}

