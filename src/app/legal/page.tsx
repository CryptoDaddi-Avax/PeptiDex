import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Privacy Policy & Terms of Use",
    description: "PeptiDex privacy policy and terms of use. Learn how we handle your data and the terms governing use of our educational peptide research platform.",
};

export default function LegalPage() {
    return (
        <div className="max-w-3xl mx-auto px-4 py-6 md:py-8">
            <h1 className="text-2xl font-bold text-zinc-100 mb-6">Privacy Policy &amp; Terms of Use</h1>
            <p className="text-xs text-zinc-500 mb-8">Last updated: March 17, 2026</p>

            {/* Privacy Policy */}
            <section className="mb-10">
                <h2 className="text-lg font-semibold text-zinc-200 mb-3 flex items-center gap-2">
                    <span className="text-violet-400">🔒</span> Privacy Policy
                </h2>

                <div className="space-y-4 text-sm text-zinc-400 leading-relaxed">
                    <div>
                        <h3 className="text-zinc-300 font-medium mb-1">Information We Collect</h3>
                        <p>
                            PeptiDex is a static educational website. We do <strong className="text-zinc-300">not</strong> collect
                            personal information, require user accounts, or store data on our servers. Any preferences
                            (such as saved stacks or dismissed modals) are stored locally in your browser via localStorage
                            and never transmitted to us.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-zinc-300 font-medium mb-1">Cookies &amp; Tracking</h3>
                        <p>
                            We do not use cookies for tracking or advertising purposes. If analytics are enabled, they use
                            privacy-friendly solutions that do not track individual users or sell data to third parties.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-zinc-300 font-medium mb-1">Third-Party Links</h3>
                        <p>
                            Our site may contain links to external resources such as PubMed studies or vendor websites.
                            We are not responsible for the privacy practices of those sites. We encourage you to review
                            their privacy policies independently.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-zinc-300 font-medium mb-1">Data Security</h3>
                        <p>
                            Since we do not collect or store personal data, there is minimal risk. All site content is
                            served via static files. No databases containing user information are maintained.
                        </p>
                    </div>
                </div>
            </section>

            {/* Terms of Use */}
            <section className="mb-10">
                <h2 className="text-lg font-semibold text-zinc-200 mb-3 flex items-center gap-2">
                    <span className="text-violet-400">📋</span> Terms of Use
                </h2>

                <div className="space-y-4 text-sm text-zinc-400 leading-relaxed">
                    <div>
                        <h3 className="text-zinc-300 font-medium mb-1">Educational Purpose Only</h3>
                        <p>
                            All content on PeptiDex is provided strictly for <strong className="text-zinc-300">educational
                            and informational purposes</strong>. Nothing on this site constitutes medical advice, diagnosis,
                            or treatment recommendations. Always consult a qualified healthcare provider before using any
                            peptide or making health-related decisions.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-zinc-300 font-medium mb-1">Research Status</h3>
                        <p>
                            Most peptides discussed on this platform are <strong className="text-zinc-300">research-only
                            compounds</strong> and are not FDA-approved for human use unless explicitly stated otherwise.
                            Dosages, protocols, and outcomes described are based on published research and community reports,
                            not clinical recommendations.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-zinc-300 font-medium mb-1">No Guarantee of Accuracy</h3>
                        <p>
                            While we strive to present accurate, up-to-date information backed by peer-reviewed research,
                            we make no warranties about the completeness or accuracy of any content. The peptide research
                            landscape evolves rapidly, and information may become outdated.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-zinc-300 font-medium mb-1">Limitation of Liability</h3>
                        <p>
                            PeptiDex and its creators shall not be held liable for any damages, health outcomes, or
                            consequences arising from the use of information presented on this site. Use all information
                            at your own risk and discretion.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-zinc-300 font-medium mb-1">Intellectual Property</h3>
                        <p>
                            All original content, design, and code on PeptiDex is the property of its creators.
                            Research citations and study data belong to their respective authors and publishers.
                            You may reference our content with proper attribution.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-zinc-300 font-medium mb-1">Changes to These Terms</h3>
                        <p>
                            We reserve the right to update these terms at any time. Changes will be reflected on this
                            page with an updated revision date. Continued use of the site constitutes acceptance of
                            any modifications.
                        </p>
                    </div>
                </div>
            </section>

            {/* Contact */}
            <section className="p-4 rounded-2xl bg-zinc-900/50 border border-zinc-800">
                <h2 className="text-sm font-semibold text-zinc-200 mb-2">Questions?</h2>
                <p className="text-xs text-zinc-400">
                    If you have questions about these policies, please reach out via the contact information
                    provided on the site. We aim to respond within 48 hours.
                </p>
            </section>
        </div>
    );
}
