import { Metadata } from "next";
import StacksClient from "./StacksClient";

export const metadata: Metadata = {
  title: "Best Peptide Stacks 2026",
  description: "Explore curated, research-backed peptide stacks for body recomposition, muscle growth, & recovery. Learn the synergistic protocols used by the community.",
  alternates: {
    canonical: "https://peptidex.app/stacks",
    languages: {
      "x-default": "https://peptidex.app/stacks",
    },
  },
  openGraph: {
    title: "Best Peptide Stacks 2026 — Research-Backed Protocols",
    description: "Curated, research-backed peptide stacks for body recomposition, muscle growth & recovery. Synergistic combinations with compound roles and evidence levels.",
    url: "https://peptidex.app/stacks",
    type: "website",
    images: [{ url: "https://peptidex.app/og-image.png", width: 1200, height: 630, alt: "PeptiDex Peptide Stacks" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Peptide Stacks 2026",
    description: "Evidence-based stacks for body recomposition, muscle growth & recovery — with compound roles and cited research.",
    images: ["https://peptidex.app/og-image.png"],
  },
};

export default function StacksPage() {
  return <StacksClient />;
}
