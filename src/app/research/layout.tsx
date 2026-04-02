import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Research Hub   Peptide Clinical Studies & Evidence",
    description: "Explore the PeptiDex Research Hub: peer-reviewed clinical studies, evidence levels, and scientific breakdowns for BPC-157, TB-500, Semaglutide, Thymosin Alpha-1 and more.",
    keywords: ["peptide clinical studies", "peptide research", "BPC-157 studies", "peptide evidence", "PUBMED peptides", "peptide science"],
    openGraph: {
        title: "Research Hub   Peptide Clinical Studies & Evidence | PeptiDex",
        description: "Peer-reviewed clinical studies and evidence breakdowns for 33 research peptides.",
        type: "website",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}

