import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Intro to Peptides   What They Are, How They Work & Where to Start",
    description: "The complete beginner's guide to research peptides. Learn what peptides are, how they differ from steroids, how to read a COA, whether you're ready to start, and which peptide to try first based on your goals.",
    keywords: ["what are peptides", "peptides vs steroids", "how do peptides work", "beginner peptide guide", "research peptides explained", "how to read COA", "peptide safety", "start peptides"],
    openGraph: {
        title: "Intro to Peptides   Complete Beginner's Guide | PeptiDex",
        description: "Everything you need before starting research peptides   how they work, comparison tables, COA explainer, readiness checklist, and beginner path picker.",
        type: "website",
    },
};

import '@/components/redesign/redesign.css';

export default function IntroLayout({ children }: { children: React.ReactNode }) {
    return <div className="redesign-content">{children}</div>;
}
