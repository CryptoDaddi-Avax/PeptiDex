import type { Metadata } from "next";
import '@/components/redesign/redesign.css';
import { ToolsBreadcrumbs } from '@/components/tools/ToolsBreadcrumbs';

export const metadata: Metadata = {
    title: "Peptide Research Tools — COA Analyzer, PK Graphs & More",
    description: "Professional-grade peptide research tools: PK Plasma Graphs, COA Certificate Analyzer, Interaction Checker, Evidence Dashboard, and AI Peptide Advisor.",
    keywords: ["COA analyzer", "peptide PK graph", "peptide interaction checker", "peptide tools", "peptide half-life calculator"],
    openGraph: {
        title: "Peptide Research Tools — COA Analyzer & More | PeptiDex",
        description: "Research-grade peptide tools: COA verification, PK plasma curves, evidence dashboard, and AI advisor.",
        type: "website",
    },
};

export default function ToolsGroupLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="redesign-content">
            <ToolsBreadcrumbs />
            {children}
        </div>
    );
}

