import type { Metadata } from "next";
import ProfileClient from "./ProfileClient";

export const metadata: Metadata = {
    title: "Your Research Profile",
    description: "Manage your PeptiDex protocol logs, badges, and display settings. Track your contributions to the peptide research community.",
    robots: { index: false, follow: false }, // Private page — no indexing
};

export default function ProfilePage() {
    return <ProfileClient />;
}
