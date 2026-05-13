import type { Metadata } from "next";
import ModerationClient from "./ModerationClient";

export const metadata: Metadata = {
    title: "Moderation Queue | Admin",
    robots: { index: false, follow: false },
};

export default function ModerationPage() {
    return <ModerationClient />;
}
