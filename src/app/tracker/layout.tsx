import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Peptide Protocol Tracker   Log Doses & Manage Cycles",
    description: "Track your peptide protocols with the PeptiDex Protocol Tracker. Log doses, view a calendar of injection history, manage multiple active protocols, and enable dosing reminder notifications.",
    keywords: ["peptide tracker", "peptide protocol log", "injection log", "peptide cycle tracker", "dose tracker", "peptide calendar", "peptide reminder"],
    openGraph: {
        title: "Peptide Protocol Tracker   Log Doses & Manage Cycles | PeptiDex",
        description: "Track your peptide cycles with a calendar view, dose log, and push notification reminders for every injection.",
        type: "website",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}

