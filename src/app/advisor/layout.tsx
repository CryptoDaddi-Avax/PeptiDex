import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "AI Peptide Advisor   Personalized Peptide Recommendations",
    description: "Chat with the PeptiDex AI Advisor for personalized peptide recommendations based on your goals. Get stack suggestions, dosing help, interaction checks, and research summaries   instantly, no account needed.",
    keywords: ["peptide advisor", "best peptide for fat loss", "best peptide for muscle", "peptide recommendations", "peptide stack advice", "what peptide should I use", "AI peptide guide"],
    openGraph: {
        title: "AI Peptide Advisor   Personalized Recommendations | PeptiDex",
        description: "Get personalized peptide recommendations from the PeptiDex AI. Goal-based suggestions, stack analysis, dosing guidance   all in one chat interface.",
        type: "website",
    },
};

import RedesignLayout from '@/components/redesign/RedesignLayout';

export default function AdvisorLayout({ children }: { children: React.ReactNode }) {
    return <RedesignLayout>{children}</RedesignLayout>;
}

