import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Peptide Library   Browse 33 Research Peptides",
    description: "Browse the complete PeptiDex peptide library. Research guides for BPC-157, TB-500, CJC-1295, Ipamorelin, Semaglutide, Retatrutide, GHK-Cu, and 17+ more   with clinical studies, dosage protocols, and half-life data.",
    keywords: ["peptide library", "research peptides", "BPC-157 guide", "peptide database", "peptide reference", "peptide mechanisms"],
    openGraph: {
        title: "Peptide Library   Browse 33 Research Peptides | PeptiDex",
        description: "Complete guides for 33 research peptides including BPC-157, TB-500, Semaglutide, and more. Clinical studies, dosing protocols, and half-life data all in one place.",
        type: "website",
    },
};

import RedesignLayout from '@/components/redesign/RedesignLayout';

export default function LibraryGroupLayout({ children }: { children: React.ReactNode }) {
    return <RedesignLayout>{children}</RedesignLayout>;
}

