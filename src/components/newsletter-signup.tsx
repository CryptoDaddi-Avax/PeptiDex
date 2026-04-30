"use client";
import { useState } from "react";
import { CheckCircle } from "lucide-react";

interface NewsletterSignupProps {
    source?: string;
}

export function NewsletterSignup({ source = "footer" }: NewsletterSignupProps) {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!email || status === "loading") return;
        setStatus("loading");

        try {
            // TODO: Wire up to your actual email provider (ConvertKit / Mailchimp / Buttondown)
            // For now, this posts to /api/subscribe which logs the email
            await fetch("/api/subscribe", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, source }),
            });
            setStatus("success");
        } catch {
            setStatus("error");
        }
    }

    if (status === "success") {
        return (
            <div className="newsletter-signup">
                <div className="newsletter-success">
                    <CheckCircle size={32} />
                    <h3 className="newsletter-title">Welcome <em>aboard</em>.</h3>
                    <p>First issue arrives this Friday.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="newsletter-signup">
            <div className="newsletter-label">§ Stay Current</div>
            <h3 className="newsletter-title">The Peptide <em>Brief</em>.</h3>
            <p className="newsletter-subtitle">
                Bi-weekly research updates, vendor news, and editorial analysis. No spam.
            </p>
            <form className="newsletter-form" onSubmit={handleSubmit}>
                <input
                    type="email"
                    inputMode="email"
                    required
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="newsletter-input"
                />
                <button
                    type="submit"
                    disabled={!email || status === "loading"}
                    className="newsletter-submit"
                >
                    {status === "loading" ? "…" : "Subscribe"}
                </button>
            </form>
            {status === "error" && (
                <p style={{ fontSize: 12, color: '#e74c3c', marginTop: 8 }}>
                    Something went wrong. Try again.
                </p>
            )}
            <p className="newsletter-fine">No spam. Unsubscribe anytime. We respect your inbox.</p>
        </div>
    );
}
