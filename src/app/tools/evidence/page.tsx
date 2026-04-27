import { Metadata } from "next";
import EvidenceClient from "./EvidenceClient";

export const metadata: Metadata = {
    title: "Peptide Evidence Dashboard | Clinical Trials & Research Ranking",
    description: "Explore all peptides ranked by the strength of their clinical evidence. From FDA-approved phase 3 trials to anecdotal emerging research.",
    alternates: {
        canonical: "https://peptidex.app/tools/evidence",
    },
};

export default function EvidencePage() {
    return <EvidenceClient />;
}
