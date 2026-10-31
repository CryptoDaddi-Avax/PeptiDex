import type { Metadata } from "next";
import { peptides } from "@/data/peptides";

const count = peptides.length;

export const metadata: Metadata = {
    title: `Peptide Library — Browse ${count} Research Peptides`,
    description: `Browse the complete PeptiDex peptide library. Research guides for BPC-157, TB-500, CJC-1295, Ipamorelin, GHK-Cu, and ${count - 5} more, with clinical studies, mechanisms, and half-life data.`,
    keywords: ["peptide library", "research peptides", "BPC-157 guide", "peptide database", "peptide reference", "peptide mechanisms"],
    openGraph: {
        title: `Peptide Library — Browse ${count} Research Peptides | PeptiDex`,
        description: `Complete guides for ${count} research peptides including BPC-157, TB-500, GHK-Cu, and more. Clinical studies, mechanisms, and half-life data all in one place.`,
        type: "website",
    },
};

import '@/components/redesign/redesign.css';

export default function LibraryGroupLayout({ children }: { children: React.ReactNode }) {
    return <div className="redesign-content">{children}</div>;
}

