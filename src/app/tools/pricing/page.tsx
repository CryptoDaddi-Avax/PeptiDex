import { Metadata } from "next";
import PricingClient from "./PricingClient";

export const metadata: Metadata = {
    title: "Peptide Pricing Comparison & Cost Estimator",
    description: "Compare peptide vial prices, cost per dose, and sourcing options across top research suppliers.",
    alternates: {
        canonical: "https://peptidex.app/tools/pricing",
    },
};

export default function PricingPage() {
    return <PricingClient />;
}
