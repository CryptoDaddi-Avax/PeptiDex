import type { Metadata } from "next";
import RedesignLayout from '@/components/redesign/RedesignLayout';
import { ToolsBreadcrumbs } from '@/components/tools/ToolsBreadcrumbs';

export const metadata: Metadata = {
    title: "Peptide Research Tools — Reconstitution Calculator, COA Analyzer, PK Graphs & More",
    description: "Professional-grade peptide research tools: Reconstitution & Concentration Calculator, PK Plasma Graphs, COA Certificate Analyzer, Interaction Checker, Evidence Dashboard, and AI Peptide Advisor.",
    keywords: ["peptide reconstitution calculator", "COA analyzer", "peptide PK graph", "peptide interaction checker", "peptide tools", "peptide half-life calculator", "concentration calculator"],
    openGraph: {
        title: "Peptide Research Tools — Reconstitution Calculator, COA Analyzer & More | PeptiDex",
        description: "Research-grade peptide tools: reconstitution calculator, COA verification, PK plasma curves, evidence dashboard, and AI advisor.",
        type: "website",
    },
};

export default function ToolsGroupLayout({ children }: { children: React.ReactNode }) {
    return (
        <RedesignLayout>
            <ToolsBreadcrumbs />
            {children}
        </RedesignLayout>
    );
}

