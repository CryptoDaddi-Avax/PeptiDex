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
    images: [{ url: 'https://peptidex.app/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About PeptiDex — Independent Peptide Research Index',
    description: 'Why we built the independent, evidence-based peptide research index.',
    images: ['https://peptidex.app/og-image.png'],
  },
};

export default function AboutPage() {
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

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Is PeptiDex the same as the PEPTIDEX iOS tracker app?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. PeptiDex (peptidex.app) is an independent research index. We are not affiliated with the "PEPTIDEX: Peptide Tracker" app on the Apple App Store (peptidex.site) developed by Maximilian Karmann. We do not offer an iOS app.'
        }
      },
      {
        '@type': 'Question',
        name: 'Is PeptiDex a peptide vendor?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No, we are strictly an independent research index and educational hub. We do not manufacture, sell, or distribute any peptides or research chemicals. We provide unbiased vendor reviews and COA verification data to help researchers find trusted sources.'
        }
      },
      {
        '@type': 'Question',
        name: 'Who runs PeptiDex?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'PeptiDex is managed by an independent editorial team and supported by expert reviewers dedicated to curating evidence-based peptide science. We do not accept sponsorships from vendors to influence our reviews or rankings.'
        }
      }
    ]
  };

  return (
    <main id="main-content">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

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
          paywalls. There was no neutral ground. Researchers were left navigating a fragmented landscape of conflicting 
          protocols, unverified suppliers, and poorly substantiated claims.
        </p>

        <p>
          This site is the neutral ground. We aggregate published clinical research, verify vendor sourcing through
          independent third-party COAs, and write articles that don&apos;t lead with a sales pitch. Our mission is to 
          bring clarity, rigor, and transparency to peptide science, empowering researchers with the data they need to 
          conduct safe, effective, and reproducible studies.
        </p>

        <h2>Our Editorial Team</h2>
        <p>
          PeptiDex is maintained by an independent group of researchers, data analysts, and writers dedicated to 
          curating evidence-based peptide science. We do not have a medical board or clinical staff on payroll, 
          which allows us to remain entirely free from pharmaceutical or vendor influence.
        </p>
        <p>
          Meet the team behind the research:
        </p>
        <ul>
          <li>
            <Link href="/team/peptidex-research" className="text-emerald-400 font-bold hover:underline">PeptiDex Research Team</Link> — Our core editorial staff responsible for vendor verification, data aggregation, and library curation.
          </li>
          <li>
            <Link href="/team/dr-e-vance" className="text-emerald-400 font-bold hover:underline">Dr. E. Vance, PhD</Link> — Independent contributor and principal author of our educational library.
          </li>
          <li>
            <span className="text-emerald-400 font-bold">Legal &amp; Compliance</span> — Manages our regulatory tracking and terms of service.
          </li>
        </ul>

        <h2>Who We Are / Who We&apos;re Not</h2>
        
        <p>
          As PeptiDex has grown to serve tens of thousands of researchers monthly, several unrelated entities have 
          emerged using identical or similar names. <strong>To be absolutely clear, PeptiDex (peptidex.app) is an 
          independent entity and has ZERO affiliation with any of the following products or companies:</strong>
        </p>
        
        <ul>
          <li><strong>Not the iOS Tracker App:</strong> We are not affiliated with the "PEPTIDEX: Peptide Tracker" application available on the Apple App Store, nor its associated website (peptidex.site) developed by Maximilian Karmann. PeptiDex (peptidex.app) does not currently operate a mobile app.</li>
          <li><strong>Not a Vendor:</strong> We are not affiliated with the peptide vendor operating at peptidex.org. We do not synthesize, manufacture, sell, or distribute peptides. We are purely an educational and verification platform.</li>
          <li><strong>Not a Skincare Brand:</strong> We have no connection to "PeptiDex Essence," the skincare product sold by jessicawellness.com or similar cosmetic brands using the name.</li>
        </ul>
        
        <p>
          Our independence is our most valuable asset. If you are interacting with an app, a storefront, or a physical product bearing the PeptiDex name, it is not us.
        </p>

        <h2>What we <em>commit</em> to.</h2>

        <div className="principles">
          <div className="principle">
            <div className="num">§ 01</div>
            <h4>Editorial independence</h4>
            <p>Our editorial decisions are made independently of commercial relationships. We disclose affiliate partnerships and never let them influence what we recommend. If a vendor&apos;s quality drops, we report it. If independent lab data reveals impurities, we publish it unfiltered. Our loyalty is to the research community, not to the suppliers.</p>
          </div>
          <div className="principle">
            <div className="num">§ 02</div>
            <h4>Verified sourcing</h4>
            <p>Every vendor in our index publishes batch-specific Certificates of Analysis. We require HPLC + Mass Spec verification before any vendor enters the database. Through our independent verification dashboard, we aggregate these COAs alongside community submissions and independent third-party lab testing results to provide a comprehensive, 360-degree view of vendor reliability.</p>
          </div>
          <div className="principle">
            <div className="num">§ 03</div>
            <h4>Honest evidence grades</h4>
            <p>We don&apos;t inflate evidence levels. If something is preclinical, we say so. If a compound has minimal human data, our profile reflects that — even when it&apos;s a popular compound. We cite peer-reviewed literature, clinical trial data, and established physiological mechanisms, deliberately avoiding the exaggerated claims often found in marketing materials.</p>
          </div>
          <div className="principle">
            <div className="num">§ 04</div>
            <h4>No medical advice</h4>
            <p>We are an educational reference, not a medical practice. We don&apos;t tell you what to do — we give you the data to make informed research decisions in consultation with qualified professionals. The information provided on PeptiDex is intended solely for laboratory, educational, and research purposes.</p>
          </div>
        </div>

        <h2>Frequently Asked Questions</h2>
        
        <div className="faq-section">
          <div className="faq-item">
            <h3>Is PeptiDex the same as the PEPTIDEX iOS tracker app?</h3>
            <p>No. PeptiDex (peptidex.app) is an independent research index. We are not affiliated with the "PEPTIDEX: Peptide Tracker" app on the Apple App Store (peptidex.site) developed by Maximilian Karmann. We do not offer an iOS app.</p>
          </div>
          <div className="faq-item">
            <h3>Is PeptiDex a peptide vendor?</h3>
            <p>No, we are strictly an independent research index and educational hub. We do not manufacture, sell, or distribute any peptides or research chemicals. We provide unbiased vendor reviews and COA verification data to help researchers find trusted sources.</p>
          </div>
          <div className="faq-item">
            <h3>Who runs PeptiDex?</h3>
            <p>PeptiDex is managed by an independent editorial team and supported by expert reviewers dedicated to curating evidence-based peptide science. We do not accept sponsorships from vendors to influence our reviews or rankings.</p>
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

      
    </main>
  );
}
