import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Best Peptide Stacks 2026",
  description: "Explore curated, research-backed peptide stacks for fat loss, muscle growth, & recovery. Learn the synergistic protocols used by the community.",
  alternates: {
    canonical: "https://peptidex.app/stacks",
    languages: {
      "x-default": "https://peptidex.app/stacks",
    },
  },
  openGraph: {
    images: [{ url: "/og-image.png" }],
  },
};

export default function StacksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
