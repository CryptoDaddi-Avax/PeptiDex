import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, Shield, BookOpen, Search, Scale, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About PeptiDex | Research Mission, Editorial Standards & Team',
  description: 'Learn about PeptiDex\'s commitment to evidence-based peptide education, our editorial review process, and our research-only mission.',
  alternates: {
    canonical: 'https://peptidex.app/about',
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

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Dr. E. Vance',
    jobTitle: 'Editorial Lead',
    worksFor: {
      '@type': 'Organization',
      name: 'PeptiDex',
      url: 'https://peptidex.app',
    },
    description: 'Dr. E. Vance leads PeptiDex\'s editorial division, ensuring all published research summaries meet rigorous preclinical citation standards. With a background in molecular pharmacology, Dr. Vance oversees the platform\'s commitment to evidence-based peptide education.',
    url: 'https://peptidex.app/about',
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-12 space-y-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />

      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm text-zinc-500" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-zinc-300 transition-colors">Home</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-zinc-300 font-medium">About</span>
      </nav>

      {/* Hero */}
      <header className="space-y-4">
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-zinc-100 leading-tight">
          About PeptiDex &mdash; Our Research Mission &amp; Editorial Standards
        </h1>
        <p className="text-lg text-zinc-400 leading-relaxed max-w-2xl">
          PeptiDex is an independent peptide education platform built for researchers, by researchers. We are not a vendor, clinic, or supplement company. Our sole mission is to deliver transparent, evidence-based peptide research in one centralized hub.
        </p>
      </header>

      {/* Our Mission */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center">
            <Shield className="w-5 h-5 text-violet-400" />
          </div>
          <h2 className="text-2xl font-bold text-zinc-100">Our Mission</h2>
        </div>
        <div className="rounded-2xl bg-zinc-900/50 border border-zinc-800 p-6 md:p-8 space-y-4">
          <p className="text-sm text-zinc-300 leading-relaxed">
            PeptiDex exists to bridge the gap between dense preclinical literature and accessible, structured peptide education. We aggregate data from PubMed-indexed studies, organize it into actionable research profiles, and present it without commercial bias.
          </p>
          <p className="text-sm text-zinc-300 leading-relaxed">
            <strong className="text-zinc-100">We do not sell peptides.</strong> We do not manufacture, compound, or distribute any research chemicals. PeptiDex is strictly an educational platform designed for laboratory professionals, independent researchers, and academic institutions exploring peptide science.
          </p>
          <p className="text-sm text-zinc-300 leading-relaxed">
            All content published on this platform is intended exclusively for educational and research purposes. Nothing on PeptiDex should be interpreted as medical advice, diagnosis, or treatment recommendations.
          </p>
        </div>
      </section>

      {/* Editorial Standards */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-emerald-400" />
          </div>
          <h2 className="text-2xl font-bold text-zinc-100">Our Editorial Standards</h2>
        </div>
        <div className="rounded-2xl bg-zinc-900/50 border border-zinc-800 p-6 md:p-8 space-y-4">
          <p className="text-sm text-zinc-300 leading-relaxed">
            Every peptide profile, blog article, and research summary published on PeptiDex undergoes a rigorous multi-stage editorial review:
          </p>
          <ul className="space-y-3">
            {[
              { label: 'PubMed-First Citations', desc: 'All mechanism, dosing, and safety claims must be anchored to peer-reviewed publications indexed on PubMed or equivalent databases (e.g., ClinicalTrials.gov, Google Scholar).' },
              { label: 'Preclinical Framing', desc: 'We strictly present data in a preclinical research context. All peptide profiles specify whether evidence comes from in-vitro assays, animal models, or human clinical trials.' },
              { label: 'No Medical Advice', desc: 'PeptiDex never provides dosage recommendations intended for human use. Dosing protocols are reported strictly as observed in published research literature.' },
              { label: 'Regular Updates', desc: 'Content is reviewed and updated quarterly to reflect new publications, regulatory changes, and evolving scientific consensus.' },
            ].map((item) => (
              <li key={item.label} className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 flex-shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-zinc-200">{item.label}</p>
                  <p className="text-sm text-zinc-400 leading-relaxed">{item.desc}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="pt-4 border-t border-zinc-800/50">
            <Link href="/about/editorial-policy" className="inline-flex items-center gap-1.5 text-sm text-violet-400 hover:text-violet-300 font-medium transition-colors group">
              Read our full Editorial Policy
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Vendor Review Process */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
            <Search className="w-5 h-5 text-blue-400" />
          </div>
          <h2 className="text-2xl font-bold text-zinc-100">Our Review Process for Vendors</h2>
        </div>
        <div className="rounded-2xl bg-zinc-900/50 border border-zinc-800 p-6 md:p-8 space-y-4">
          <p className="text-sm text-zinc-300 leading-relaxed">
            PeptiDex independently reviews research peptide vendors based on strict, quantifiable criteria. We do not accept payment for favorable placement, and no vendor can influence their review score through advertising.
          </p>
          <p className="text-sm text-zinc-300 leading-relaxed">
            Our vendor evaluation framework requires:
          </p>
          <ul className="space-y-3">
            {[
              { label: 'Third-Party COA Verification', desc: 'Every recommended vendor must provide recent Certificates of Analysis from accredited, independent analytical laboratories (not in-house testing).' },
              { label: 'HPLC Purity Standards', desc: 'Vendors must consistently demonstrate >98% compound purity via High-Performance Liquid Chromatography, with top-tier vendors maintaining >99% standards.' },
              { label: 'Independence Disclosure', desc: 'PeptiDex maintains editorial independence from all vendors. Our reviews are based solely on publicly available COA data, shipping reliability, and catalog breadth.' },
            ].map((item) => (
              <li key={item.label} className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-zinc-200">{item.label}</p>
                  <p className="text-sm text-zinc-400 leading-relaxed">{item.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Affiliate Disclosure */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
            <Scale className="w-5 h-5 text-amber-400" />
          </div>
          <h2 className="text-2xl font-bold text-zinc-100">Affiliate Disclosure</h2>
        </div>
        <div className="rounded-2xl bg-amber-950/20 border border-amber-500/20 p-6 md:p-8 space-y-4">
          <p className="text-sm text-amber-200/90 leading-relaxed font-medium">
            <strong>FTC Compliance Notice:</strong> PeptiDex participates in affiliate partnerships with select research peptide vendors. When you click on a vendor link and make a purchase, PeptiDex may earn a commission at no additional cost to you.
          </p>
          <p className="text-sm text-amber-200/70 leading-relaxed">
            These affiliate relationships do not influence our editorial content, vendor rankings, or review scores. Vendors cannot pay for higher placement. All recommendations are based exclusively on independently verified COA data, pricing transparency, and fulfillment reliability.
          </p>
          <p className="text-sm text-amber-200/70 leading-relaxed">
            Affiliate revenue supports the continued operation of PeptiDex as a free, independent research resource. We believe in full transparency and encourage researchers to verify all vendor claims independently before sourcing materials for their laboratories.
          </p>
        </div>
      </section>

      {/* Editorial Team */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-zinc-100">Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { name: 'Dr. E. Vance', title: 'Editorial Lead', initials: 'EV', color: 'violet', desc: 'Oversees all published research content and ensures adherence to PubMed citation standards.' },
            { name: 'Editorial Team', title: 'Research Division', initials: 'ET', color: 'emerald', desc: 'Cross-disciplinary group specializing in peptide pharmacology and clinical literature review.' },
          ].map((member) => (
            <div key={member.name} className="rounded-2xl bg-zinc-900/50 border border-zinc-800 p-6 space-y-3">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full bg-${member.color}-500/15 border border-${member.color}-500/30 flex items-center justify-center`}>
                  <span className={`text-xs font-bold text-${member.color}-400`}>{member.initials}</span>
                </div>
                <div>
                  <p className="text-sm font-bold text-zinc-100">{member.name}</p>
                  <p className="text-xs text-zinc-500">{member.title}</p>
                </div>
              </div>
              <p className="text-sm text-zinc-400 leading-relaxed">{member.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
