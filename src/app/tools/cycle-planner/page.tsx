import { Metadata } from "next";
import CyclePlannerClient from "./CyclePlannerClient";
import { buildSoftwareApplicationSchema } from "@/lib/schema";

export const metadata: Metadata = {
    title: "Peptide Cycle Planner & Cost Estimator",
    description: "Plan your full peptide cycle, determine exact vial counts, generate a shopping list, and estimate full cycle costs.",
    alternates: {
      canonical: "https://peptidex.app/tools/cycle-planner",
    },
};

export default function CyclePlannerPage() {
    const softwareSchema = buildSoftwareApplicationSchema({
        name: "Peptide Cycle Planner",
        description: "Plan your full peptide cycle, determine exact vial counts, generate a shopping list, and estimate full cycle costs.",
        url: "https://peptidex.app/tools/cycle-planner",
        applicationCategory: "UtilityApplication"
    });

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
            <CyclePlannerClient />
        </>
    );
}
