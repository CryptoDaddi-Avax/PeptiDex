import type { Metadata } from "next";
import { glossary } from "@/data/glossary";

export const metadata: Metadata = {
    title: `Peptide Glossary   ${glossary.length} Terms Explained`,
    description: `Plain-English definitions for ${glossary.length} peptide research terms: GHRH, Ghrelin, Bioavailability, Half-Life, COA, HPLC, SubQ, IM, Lyophilization, and more   organized by category.`,
    keywords: ["peptide glossary", "peptide terms", "what is GHRH", "what is ghrelin", "peptide bioavailability", "peptide terminology", "research chemical glossary", "peptide dictionary"],
    openGraph: {
        title: `Peptide Glossary   ${glossary.length} Terms Explained in Plain English | PeptiDex`,
        description: `Plain-English definitions for ${glossary.length} peptide research terms. Everything from half-life and bioavailability to lyophilization and HPLC, organized by category.`,
        type: "website",
    },
};

import '@/components/redesign/redesign.css';

export default function GlossaryLayout({ children }: { children: React.ReactNode }) {
    return <div className="redesign-content">{children}</div>;
}

