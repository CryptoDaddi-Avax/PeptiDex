import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Peptide Glossary   82 Terms Explained",
    description: "The most complete peptide glossary available. Plain-English definitions for 82 terms: GHRH, Ghrelin, Bioavailability, Half-Life, COA, HPLC, SubQ, IM, Lyophilization, and more   organized by category.",
    keywords: ["peptide glossary", "peptide terms", "what is GHRH", "what is ghrelin", "peptide bioavailability", "peptide terminology", "research chemical glossary", "peptide dictionary"],
    openGraph: {
        title: "Peptide Glossary   82 Terms Explained in Plain English | PeptiDex",
        description: "Plain-English definitions for 82 peptide research terms. Everything from AUC and bioavailability to lyophilization and HPLC, organized by category.",
        type: "website",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}

