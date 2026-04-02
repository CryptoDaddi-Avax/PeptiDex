import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Research Peptide Vendors   Verified Suppliers with COA",
    description: "Only the most reputable research peptide vendors with independent third-party COA verification (Janoshik HPLC + Mass Spec). Compare Limitless Life Nootropics, Core Peptides, Amino Asylum, and Swiss Chems.",
    keywords: ["research peptide vendors", "buy peptides online", "peptide supplier review", "best peptide source", "verified peptide vendor", "COA tested peptides", "Janoshik tested peptides", "Limitless Life Nootropics", "Core Peptides", "Amino Asylum"],
    openGraph: {
        title: "Research Peptide Vendors   Verified COA Suppliers | PeptiDex",
        description: "Only the most reputable research vendors with Janoshik-verified HPLC and mass spec COAs. Community-vetted and affiliate-linked.",
        type: "website",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}

