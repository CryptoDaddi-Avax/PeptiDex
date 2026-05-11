import { Metadata } from "next";
import Link from 'next/link';

export const metadata: Metadata = {
    title: "Privacy Policy & Terms of Use",
    description: "PeptiDex privacy policy and terms of use. Learn how we handle your data and the terms governing use of our educational peptide research platform.",
};

export default function LegalPage() {
    return (
        <main id="main-content">
      <header className="page-header">
        <div className="page-header-grid" />
        <div className="page-header-wrap">
          <nav className="breadcrumb">
            <Link href="/">Home</Link>
            <span className="sep">/</span>
            <span className="current">Legal</span>
          </nav>
          <div className="section-label">§ Legal</div>
          <h1 className="page-title">
            Privacy Policy<br /><em>& Terms</em>.
          </h1>
          <p className="page-subtitle">How we handle your data and the terms governing use of our educational research platform.</p>
        </div>
      </header>

      <div className="about-content reveal space-y-16">

            <h1 className="text-2xl font-bold text-zinc-100 mb-6">Privacy Policy &amp; Terms of Use</h1>
            <p className="text-xs text-zinc-500 mb-8">Last updated: May 11, 2026</p>

            {/* Privacy Policy */}
            <section className="mb-10">
                <h2 className="text-lg font-semibold text-zinc-200 mb-3 flex items-center gap-2">
                    <span className="text-violet-400">🔒</span> Privacy Policy
                </h2>

                <div className="space-y-4 text-sm text-zinc-400 leading-relaxed">
                    <div>
                        <h3 className="text-zinc-300 font-medium mb-1">Information We Collect</h3>
                        <p>
                            PeptiDex is an educational research platform. We do <strong className="text-zinc-300">not</strong> collect
                            personal information, require user accounts, or store personally identifiable data on our servers.
                            Any preferences (such as saved stacks or dismissed modals) are stored locally in your browser
                            via <code className="text-zinc-300">localStorage</code> and never transmitted to us.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-zinc-300 font-medium mb-1">Cookies &amp; Tracking</h3>
                        <p>
                            We do not use cookies for tracking or advertising purposes. We use Google Analytics 4 (GA4)
                            for aggregate pageview analytics. GA4 data is governed by Google&apos;s privacy policy and
                            does not store personally identifiable information in our systems.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-zinc-300 font-medium mb-1">Affiliate Click Tracking</h3>
                        <p>
                            To improve our content and understand which vendor links are most useful to researchers,
                            PeptiDex logs anonymous affiliate click events. Each event records only:
                        </p>
                        <ul className="mt-2 space-y-1 list-disc list-inside text-zinc-500">
                            <li>The peptide page visited (e.g. <code className="text-zinc-400">bpc-157</code>)</li>
                            <li>The vendor clicked (e.g. <code className="text-zinc-400">amino-club</code>)</li>
                            <li>The UI location of the link (e.g. <code className="text-zinc-400">pricing_table</code>, <code className="text-zinc-400">buy_box</code>)</li>
                            <li>A <strong className="text-zinc-300">daily-rotating anonymous session token</strong> (see below)</li>
                            <li>A server-side timestamp (UTC)</li>
                        </ul>
                        <p className="mt-3">
                            <strong className="text-zinc-300">Session token design:</strong> The token is a SHA-256
                            hash computed entirely inside your browser. It combines a random seed stored only in your
                            local <code className="text-zinc-300">localStorage</code> (key: <code className="text-zinc-300">_pdx_sid_seed</code>)
                            with the current UTC date. The hash automatically changes every day at midnight UTC.
                            Because only the hash is transmitted — never the seed — the token{' '}
                            <strong className="text-zinc-300">cannot be linked to your identity</strong> and cannot
                            be reversed to find you. We do <strong className="text-zinc-300">not</strong> record your
                            IP address, browser User-Agent, referrer, cookies, or any other identifying information.
                            This data is never shared with or sold to any third party.
                        </p>
                        <div className="mt-3 rounded-lg border border-zinc-800 bg-zinc-900/40 px-4 py-3">
                            <p className="text-xs text-zinc-500">
                                <strong className="text-zinc-400">How to opt out:</strong> Clear your browser&apos;s
                                localStorage for <code>peptidex.app</code> to reset your seed. Because no IP or
                                user-agent is stored, there is no persistent identifier to delete beyond the seed.
                            </p>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-zinc-300 font-medium mb-1">Affiliate Disclosure</h3>
                        <p>
                            PeptiDex participates in affiliate programs with COA-verified peptide vendors. We may earn
                            a commission when you click a vendor link and make a purchase. This does not increase your
                            cost and does not influence our editorial rankings or content. All affiliate relationships
                            are disclosed on pages where affiliate links appear.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-zinc-300 font-medium mb-1">Third-Party Links</h3>
                        <p>
                            Our site contains links to external resources such as PubMed studies and vendor websites.
                            We are not responsible for the privacy practices of those sites. We encourage you to review
                            their privacy policies independently.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-zinc-300 font-medium mb-1">Data Security</h3>
                        <p>
                            Affiliate click logs are stored in a secured database accessible only via service-role
                            credentials. No user-identifying fields are stored. The click log data cannot be used
                            to re-identify any individual.
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
      <div className="disclaimer-strip">
        ⚠ Educational only · Not medical advice · Most peptides are research-only / not FDA-approved
      </div>
    </main>
  );
}
