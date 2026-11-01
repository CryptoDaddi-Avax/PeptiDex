import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Intro to Peptides — What They Are, How They Work & Where to Start",
    description: "The complete beginner's guide to research peptides. Learn what peptides are, how they differ from steroids, how to read a COA, and how compounds are studied in published research.",
    keywords: ["what are peptides", "peptides vs steroids", "how do peptides work", "beginner peptide guide", "research peptides explained", "how to read COA", "peptide safety", "peptide research basics"],
    openGraph: {
        title: "Intro to Peptides — Complete Beginner's Guide | PeptiDex",
        description: "A structured introduction to research peptides: how they work, how they are studied, and how to read a COA.",
        type: "website",
    },
};

import '@/components/redesign/redesign.css';

export default function IntroLayout({ children }: { children: React.ReactNode }) {
    return <div className="redesign-content">{children}</div>;
}
