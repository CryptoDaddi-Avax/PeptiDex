import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Peptide Cycle Planner & Dosage Calculator | PeptiDex",
    description: "Calculate exact peptide dosages, reconstitute with bacteriostatic water to find ML per unit, track total vial requirements, and compare prices across verified research vendors.",
};

export default function CyclePlannerLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
