import type { Metadata } from 'next';
import Link from 'next/link';
import './about-redesign.css';

export const metadata: Metadata = {
  title: 'About PeptiDex — Independent Peptide Research Index',
  description: 'Why we built the independent, evidence-based peptide research index. Editorial principles, vendor verification, and how to get in touch.',
  alternates: {
    canonical: 'https://peptidex.app/about',
  },
  openGraph: {
    title: 'About PeptiDex — Independent Peptide Research Index',
    description: 'Why we built the independent, evidence-based peptide research index. Editorial principles, vendor verification, and how to get in touch.',
    url: 'https://peptidex.app/about',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About PeptiDex — Independent Peptide Research Index',
    description: 'Why we built the independent, evidence-based peptide research index.',
    images: ['/og-image.png'],
  },
};

export default function AboutPage() {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'PeptiDex',
    alternateName: 'PeptiDex Research Index',
    url: 'https://peptidex.app',
    logo: 'https://peptidex.app/logo.png',
    description: 'The independent, evidence-based peptide research index. Verified vendors, peer-reviewed studies, curated stacks.',
    publishingPrinciples: 'https://peptidex.app/about/editorial-policy',
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://peptidex.app/' },
      { '@type': 'ListItem', position: 2, name: 'About', item: 'https://peptidex.app/about' },
    ],
  };

  const aboutPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About PeptiDex — Independent Peptide Research Index',
    description: 'Why we built the independent, evidence-based peptide research index. Editorial principles, vendor verification, and how to get in touch.',
    url: 'https://peptidex.app/about',
    isPartOf: { '@type': 'WebSite', name: 'PeptiDex', url: 'https://peptidex.app' },
    inLanguage: 'en-US',
  };

  return (
    <main id="main-content">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema) }} />

      <header className="page-header">
        <div className="page-header-grid"></div>
        <div className="page-header-wrap">
          <div className="breadcrumb">
            <Link href="/">Home</Link>
            <span className="sep">/</span>
            <span className="current">About</span>
          </div>
          <div className="section-label">§ About</div>
          <h1 className="page-title">
            Independent.<br /><em>Evidence-based</em>.<br />Unaffiliated.
          </h1>
          <p className="page-subtitle">
            PeptiDex exists because the peptide space is full of misinformation, hype, and conflicts of interest.
            We built the resource we wished existed.
          </p>
        </div>
      </header>

      <div className="about-content reveal">
        <p>
          We started PeptiDex in 2026 with a single observation: <strong>nobody was indexing peptide research the way
          it deserved to be indexed</strong>. Forums had anecdotes. Vendors had marketing copy. Medical journals had
          paywalls. There was no neutral ground.
        </p>

        <p>
          This site is the neutral ground. We aggregate published clinical research, verify vendor sourcing through
          independent third-party COAs, and write articles that don&apos;t lead with a sales pitch.
        </p>

        <h2>What we <em>commit</em> to.</h2>

        <div className="principles">
          <div className="principle">
            <div className="num">§ 01</div>
            <h4>Editorial independence</h4>
            <p>Our editorial decisions are made independently of commercial relationships. We disclose affiliate partnerships and never let them influence what we recommend.</p>
          </div>
          <div className="principle">
            <div className="num">§ 02</div>
            <h4>Verified sourcing</h4>
            <p>Every vendor in our index publishes batch-specific Certificates of Analysis. We require HPLC + Mass Spec verification before any vendor enters the database.</p>
          </div>
          <div className="principle">
            <div className="num">§ 03</div>
            <h4>Honest evidence grades</h4>
            <p>We don&apos;t inflate evidence levels. If something is preclinical, we say so. If a compound has minimal human data, our profile reflects that — even when it&apos;s a popular compound.</p>
          </div>
          <div className="principle">
            <div className="num">§ 04</div>
            <h4>No medical advice</h4>
            <p>We are an educational reference, not a medical practice. We don&apos;t tell you what to do — we give you the data to make informed research decisions in consultation with qualified professionals.</p>
          </div>
        </div>

        <h2>Get in <em>touch</em>.</h2>
        <p>
          For corrections, story tips, vendor verification submissions, or media inquiries, email{' '}
          <a href="mailto:hello@peptidex.app" className="email-link">hello@peptidex.app</a>.
          We respond personally to every email, usually within 24 hours.
        </p>

        <p className="affiliate-note">
          PeptiDex is independent and self-funded. We may earn affiliate commission on qualifying purchases through
          links to verified vendors — this disclosure is required by FTC guidelines and does not affect our editorial.
        </p>
      </div>

      <div className="disclaimer-strip">
        ⚠ Educational only · Not medical advice · Most peptides are research-only / not FDA-approved
      </div>
    </main>
  );
}
