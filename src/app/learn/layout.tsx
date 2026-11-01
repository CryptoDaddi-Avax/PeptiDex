import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Peptide 101 — Beginner's Learning Path",
    description: "Learn the basics of peptides from scratch. 3 structured modules, 12 lessons, and 9 quiz questions covering peptide chemistry, mechanisms, safety, and sourcing. Track your progress as you go.",
    keywords: ["peptide beginner guide", "peptide basics", "peptide 101", "learn about peptides", "peptide education", "peptide research guide"],
    openGraph: {
        title: "Peptide 101 — Complete Beginner's Learning Path | PeptiDex",
        description: "3 structured modules, 12 lessons and 9 quiz questions covering the fundamentals of research peptides, from amino acid basics to safety and sourcing.",
        type: "website",
    },
};

import '@/components/redesign/redesign.css';

export default function LearnLayout({ children }: { children: React.ReactNode }) {
    return <div className="redesign-content">{children}</div>;
}

