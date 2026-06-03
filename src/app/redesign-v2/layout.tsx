import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PeptiDex — The Research Index (Preview)",
  description: "Preview of the redesigned PeptiDex homepage.",
};

export default function RedesignLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
