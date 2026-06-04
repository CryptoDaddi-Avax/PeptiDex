import { Metadata } from "next";
import Link from 'next/link';

export const metadata: Metadata = {
    title: "Privacy Policy & Terms of Use",
    description: "PeptiDex privacy policy and terms of use. Learn how we handle your data and the terms governing use of our educational peptide research platform.",
    alternates: { canonical: "https://peptidex.app/legal" },
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
            Privacy Policy<br /><em>&amp; Terms</em>.
          </h1>
          <p className="page-subtitle">How we handle your data and the terms governing use of our educational research platform.</p>
        </div>
      </header>

      <div className="about-content fade-up space-y-16">

            <p style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: 'var(--ink-mute)' }}>Last updated: May 11, 2026</p>

            {/* Privacy Policy */}
            <section>
                <h2>
                    <span style={{ color: 'var(--gold)' }}>🔒</span> Privacy Policy
                </h2>

                <div>
                    <h3>Information We Collect</h3>
                    <p>
                        PeptiDex is an educational research platform. We do <strong>not</strong> collect
                        personal information, require user accounts, or store personally identifiable data on our servers.
                        Any preferences (such as saved stacks or dismissed modals) are stored locally in your browser
                        via <code>localStorage</code> and never transmitted to us.
                    </p>

                    <h3>Cookies &amp; Tracking</h3>
                    <p>
                        We do not use cookies for tracking or advertising purposes. We use Google Analytics 4 (GA4)
                        for aggregate pageview analytics. GA4 data is governed by Google&apos;s privacy policy and
                        does not store personally identifiable information in our systems.
                    </p>

                    <h3>Affiliate Click Tracking</h3>
                    <p>
                        To improve our content and understand which vendor links are most useful to researchers,
                        PeptiDex logs anonymous affiliate click events. Each event records only:
                    </p>
                    <ul>
                        <li>The peptide page visited (e.g. <code>bpc-157</code>)</li>
                        <li>The vendor clicked (e.g. <code>amino-club</code>)</li>
                        <li>The UI location of the link (e.g. <code>pricing_table</code>, <code>buy_box</code>)</li>
                        <li>A <strong>daily-rotating anonymous session token</strong> (see below)</li>
                        <li>A server-side timestamp (UTC)</li>
                    </ul>
                    <p>
                        <strong>Session token design:</strong> The token is a SHA-256
                        hash computed entirely inside your browser. It combines a random seed stored only in your
                        local <code>localStorage</code> (key: <code>_pdx_sid_seed</code>)
                        with the current UTC date. The hash automatically changes every day at midnight UTC.
                        Because only the hash is transmitted — never the seed — the token{' '}
                        <strong>cannot be linked to your identity</strong> and cannot
                        be reversed to find you. We do <strong>not</strong> record your
                        IP address, browser User-Agent, referrer, cookies, or any other identifying information.
                        This data is never shared with or sold to any third party.
                    </p>
                    <p style={{ fontFamily: 'var(--mono)', fontSize: 12, letterSpacing: '0.05em', color: 'var(--ink-mute)', background: 'var(--bg-card)', border: '1px solid var(--line)', borderRadius: 8, padding: '12px 16px' }}>
                        <strong style={{ color: 'var(--ink-dim)' }}>How to opt out:</strong> Clear your browser&apos;s
                        localStorage for <code>peptidex.app</code> to reset your seed. Because no IP or
                        user-agent is stored, there is no persistent identifier to delete beyond the seed.
                    </p>

                    <h3>Affiliate Disclosure</h3>
                    <p>
                        PeptiDex participates in affiliate programs with COA-verified peptide vendors. We may earn
                        a commission when you click a vendor link and make a purchase. This does not increase your
                        cost and does not influence our editorial rankings or content. All affiliate relationships
                        are disclosed on pages where affiliate links appear.
                    </p>

                    <h3>Third-Party Links</h3>
                    <p>
                        Our site contains links to external resources such as PubMed studies and vendor websites.
                        We are not responsible for the privacy practices of those sites. We encourage you to review
                        their privacy policies independently.
                    </p>

                    <h3>Data Security</h3>
                    <p>
                        Affiliate click logs are stored in a secured database accessible only via service-role
                        credentials. No user-identifying fields are stored. The click log data cannot be used
                        to re-identify any individual.
                    </p>
                </div>
            </section>

            {/* Terms of Use */}
            <section>
                <h2>
                    <span style={{ color: 'var(--gold)' }}>📋</span> Terms of Use
                </h2>

                <div>
                    <h3>Educational Purpose Only</h3>
                    <p>
                        All content on PeptiDex is provided strictly for <strong>educational
                        and informational purposes</strong>. Nothing on this site constitutes medical advice, diagnosis,
                        or treatment recommendations. Always consult a qualified healthcare provider before using any
                        peptide or making health-related decisions.
                    </p>

                    <h3>Research Status</h3>
                    <p>
                        Most peptides discussed on this platform are <strong>research-only
                        compounds</strong> and are not FDA-approved for human use unless explicitly stated otherwise.
                        Dosages, protocols, and outcomes described are based on published research and community reports,
                        not clinical recommendations.
                    </p>

                    <h3>No Guarantee of Accuracy</h3>
                    <p>
                        While we strive to present accurate, up-to-date information backed by peer-reviewed research,
                        we make no warranties about the completeness or accuracy of any content. The peptide research
                        landscape evolves rapidly, and information may become outdated.
                    </p>

                    <h3>Limitation of Liability</h3>
                    <p>
                        PeptiDex and its creators shall not be held liable for any damages, health outcomes, or
                        consequences arising from the use of information presented on this site. Use all information
                        at your own risk and discretion.
                    </p>

                    <h3>Intellectual Property</h3>
                    <p>
                        All original content, design, and code on PeptiDex is the property of its creators.
                        Research citations and study data belong to their respective authors and publishers.
                        You may reference our content with proper attribution.
                    </p>

                    <h3>Changes to These Terms</h3>
                    <p>
                        We reserve the right to update these terms at any time. Changes will be reflected on this
                        page with an updated revision date. Continued use of the site constitutes acceptance of
                        any modifications.
                    </p>
                </div>
            </section>

            {/* Contact */}
            <section style={{ background: 'var(--bg-card)', border: '1px solid var(--line)', borderRadius: 12, padding: '24px 28px' }}>
                <h3 style={{ marginTop: 0 }}>Questions?</h3>
                <p>
                    If you have questions about these policies, please reach out via the contact information
                    provided on the site. We aim to respond within 48 hours.
                </p>
            </section>
      </div>
      
    </main>
  );
}
