import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Peptide 101   Beginner's Learning Path",
    description: "Learn everything about peptides from scratch. 5 structured modules, 20 lessons, and 15 quizzes covering safety, mechanisms, reconstitution, dosing, stacking, and legal status. Track your progress as you go.",
    keywords: ["peptide beginner guide", "how to use peptides", "peptide 101", "learn about peptides", "peptide education", "how to reconstitute peptides", "peptide stacking guide"],
    openGraph: {
        title: "Peptide 101   Complete Beginner's Learning Path | PeptiDex",
        description: "5 structured modules, 20 lessons and 15 quizzes covering everything you need to know about research peptides   from safety basics to advanced stacking.",
        type: "website",
    },
};

import RedesignLayout from '@/components/redesign/RedesignLayout';

export default function LearnLayout({ children }: { children: React.ReactNode }) {
    return <RedesignLayout>{children}</RedesignLayout>;
}

