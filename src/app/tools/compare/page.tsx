import { Metadata } from "next";
import CompareClient from "./CompareClient";

export const metadata: Metadata = {
    title: "Compare Peptides Side-by-Side | Protocol & Half-Life Data",
    description: "Build custom comparison tables for any 2-3 peptides. Compare half-life, clinical evidence, synergies, and pricing instantly.",
    alternates: {
        canonical: "https://peptidex.app/tools/compare",
    },
};

export default function ComparePage() {
    return <CompareClient />;
}
