import { Metadata } from "next";
import CyclePlannerClient from "./CyclePlannerClient";

export const metadata: Metadata = {
    title: "Peptide Cycle Planner & Cost Estimator",
    description: "Plan your full peptide cycle, determine exact vial counts, generate a shopping list, and estimate full cycle costs.",
    alternates: {
      canonical: "https://peptidex.app/tools/cycle-planner",
    },
};

export default function CyclePlannerPage() {
    return <CyclePlannerClient />;
}
