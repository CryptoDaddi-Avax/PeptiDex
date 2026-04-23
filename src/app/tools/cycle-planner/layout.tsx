import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Peptide Cycle Planner & Reconstitution Calculator | PeptiDex",
    description: "Calculate peptide reconstitution concentrations, determine diluent volumes for target concentrations, track total vial requirements, and compare prices across verified research vendors.",
};

export default function CyclePlannerLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
