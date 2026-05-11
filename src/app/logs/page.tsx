import type { Metadata } from "next";
import LogsBrowseClient from "./LogsBrowseClient";

export const metadata: Metadata = {
    title: "Verified Protocol Logs | Community Research Data | PeptiDex",
    description: "Browse real-world peptide protocol logs from the PeptiDex research community. Filter by peptide, vendor, and goal. Weighted by verification level.",
};

export default function LogsPage() {
    return <LogsBrowseClient />;
}
