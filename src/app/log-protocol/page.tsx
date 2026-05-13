import type { Metadata } from "next";
import LogProtocolClient from "./LogProtocolClient";

export const metadata: Metadata = {
    title: "Log Your Protocol",
    description: "Share your peptide protocol outcomes with the research community. Log dose, duration, vendor, efficacy, and side effects. Earn Verified Buyer badges.",
    robots: { index: true, follow: true },
};

export default function LogProtocolPage() {
    return <LogProtocolClient />;
}
