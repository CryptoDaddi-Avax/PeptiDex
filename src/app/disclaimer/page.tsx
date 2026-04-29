import type { Metadata } from 'next';
import Link from 'next/link';
import './disclaimer-redesign.css';

export const metadata: Metadata = {
  title: 'Medical Disclaimer — PeptiDex Research Index',
  description: 'Important medical disclaimer. PeptiDex is for educational research purposes only. Not medical advice. Most peptides discussed are research-only / not FDA-approved.',
  alternates: {
    canonical: 'https://peptidex.app/disclaimer',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function DisclaimerPage() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://peptidex.app/' },
      { '@type': 'ListItem', position: 2, name: 'Disclaimer', item: 'https://peptidex.app/disclaimer' },
    ],
  };

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Medical Disclaimer — PeptiDex Research Index',
    description: 'Important medical disclaimer. PeptiDex is for educational research purposes only. Not medical advice.',
    url: 'https://peptidex.app/disclaimer',
    isPartOf: { '@type': 'WebSite', name: 'PeptiDex', url: 'https://peptidex.app' },
    inLanguage: 'en-US',
  };

  return (
    <main id="main-content">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />

      <header className="page-header">
        <div className="page-header-grid"></div>
        <div className="page-header-wrap">
          <div className="breadcrumb">
            <Link href="/">Home</Link>
            <span className="sep">/</span>
            <span className="current">Medical Disclaimer</span>
          </div>
          <div className="section-label">§ Important Notice</div>
          <h1 className="page-title">Medical <em>disclaimer</em>.</h1>
          <p className="page-subtitle">
            Read this in full before using any information presented on PeptiDex.
          </p>
        </div>
      </header>

      <div className="legal-content reveal">
        <div className="legal-callout">
          <strong>⚠ Educational use only</strong>
          <p>
            All information on PeptiDex is for educational and research purposes only. Nothing on this
            site constitutes medical, pharmaceutical, or therapeutic advice.
          </p>
        </div>

        <h2>Not <em>medical advice</em>.</h2>
        <p>
          The information published on PeptiDex — including peptide profiles, dosing references, protocol
          stacks, and the Cycle Planner — is provided for educational reference. It is not intended to
          diagnose, treat, cure, or prevent any disease or condition.
        </p>
        <p>
          Always consult a qualified medical professional before considering any peptide protocol or compound
          mentioned on this site. The information presented here is no substitute for personalized medical
          evaluation.
        </p>

        <h2>Research-only <em>compounds</em>.</h2>
        <p>
          The vast majority of peptides discussed on PeptiDex are <strong>not FDA-approved</strong> for human
          consumption. They are sold by chemical suppliers strictly for in-vitro laboratory research and
          educational use. Specifically:
        </p>
        <ul>
          <li>Peptides such as BPC-157, TB-500, CJC-1295, Ipamorelin, and others are research compounds — not approved drugs.</li>
          <li>Vendors selling these compounds market them solely for authorized laboratory and educational use.</li>
          <li>FDA-approved exceptions include Semaglutide, Tirzepatide, Tesamorelin, and PT-141 — all of which require a valid prescription for human use.</li>
        </ul>

        <h2>Vendor <em>relationships</em>.</h2>
        <p>
          PeptiDex does not sell, distribute, or endorse any compound for human or animal use. The vendors
          listed in our index operate as raw chemical and laboratory supply companies. Their products are
          intended for authorized laboratory, educational, and research purposes only.
        </p>
        <p>
          PeptiDex may earn affiliate commission on qualifying purchases through links to verified vendors.
          This is disclosed in compliance with FTC guidelines and does not affect our editorial process or
          vendor ranking.
        </p>

        <h2>No <em>warranty</em>.</h2>
        <p>
          PeptiDex makes no representations or warranties regarding the accuracy, completeness, or reliability
          of any information published on this site. Peptide research is an evolving field, and information may
          become outdated. Cross-reference all claims with primary sources (PubMed, Cochrane, etc.) before
          relying on them.
        </p>

        <h2>Assumption of <em>risk</em>.</h2>
        <p>
          Use of any compound discussed on PeptiDex carries inherent risks. Long-term safety data for most
          research peptides is unavailable. By using the information on this site, you acknowledge and accept
          full responsibility for your own decisions and any consequences thereof.
        </p>

        <p className="last-updated">
          Last updated: April 2026. PeptiDex reserves the right to modify this disclaimer at any time.
          Continued use of the site constitutes acceptance of the current version.
        </p>
      </div>

      <div className="disclaimer-strip">
        ⚠ Educational only · Not medical advice · Most peptides are research-only / not FDA-approved
      </div>
    </main>
  );
}
