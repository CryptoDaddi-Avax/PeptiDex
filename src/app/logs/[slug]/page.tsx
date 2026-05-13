import type { Metadata } from "next";
import { peptides } from "@/data/peptides";
import PeptideLogsClient from "./PeptideLogsClient";
import { notFound } from "next/navigation";

interface Props { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const pep = peptides.find(p => p.slug === slug);
    if (!pep) return { title: "Not Found | PeptiDex" };
    return {
        title: `${pep.name} Protocol Logs | Community Data`,
        description: `Browse real-world ${pep.name} protocol outcomes from verified researchers. Dose, efficacy, side effects, and vendor comparisons.`,
    };
}

export function generateStaticParams() {
    return peptides.slice(0, 52).map(p => ({ slug: p.slug }));
}

export default async function PeptideLogsPage({ params }: Props) {
    const { slug } = await params;
    const pep = peptides.find(p => p.slug === slug);
    if (!pep) notFound();
    return <PeptideLogsClient peptideSlug={slug} peptideName={pep.name} />;
}
