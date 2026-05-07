import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "COA Analyzer   Verify Peptide Certificate of Analysis",
    description: "Verify your research peptide supplier's Certificate of Analysis (COA). Enter the reported molecular weight and purity %   get an instant Pass/Fail verdict against lab reference values for 51 peptides.",
    keywords: ["peptide COA", "certificate of analysis", "verify peptide purity", "HPLC purity check", "peptide mass spec", "fake peptide check", "research chemical verification", "peptide quality check"],
    openGraph: {
        title: "COA Analyzer   Verify Your Peptide's Purity & Authenticity | PeptiDex",
        description: "Does your supplier's COA check out? Enter the reported MW and purity % for an instant Pass/Fail verdict against reference values for 51 peptides.",
        type: "website",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}

