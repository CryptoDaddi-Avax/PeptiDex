import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Peptide Cycle Planner & Price Comparison",
    description: "Plan peptide research cycles, track total vial requirements across a cycle, and compare prices across verified research vendors.",
};

export default function CyclePlannerLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
