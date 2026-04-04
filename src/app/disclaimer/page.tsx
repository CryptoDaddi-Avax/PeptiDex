import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, ShieldAlert, AlertTriangle, Beaker, BookCheck, Link2, RefreshCw } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Medical Disclaimer | PeptideX',
  description: 'Important medical disclaimer for peptidex.app. All content is for educational purposes only and does not constitute medical advice, diagnosis, or treatment.',
  alternates: {
    canonical: 'https://peptidex.app/disclaimer',
  },
  robots: {
    index: true,
    follow: true,
  },
};

const LAST_UPDATED = 'April 3, 2026';

const SECTIONS = [
  {
    id: 'educational-purpose',
    icon: BookCheck,
    iconColor: 'text-violet-400',
    bgColor: 'bg-violet-500/10',
    borderColor: 'border-violet-500/20',
    title: '1. Educational Purpose Only',
    paragraphs: [
      'All content published on peptidex.app — including but not limited to peptide compound profiles, research summaries, dosing protocols, blog articles, educational guides, and interactive tools — is provided strictly for informational and educational purposes only.',
      'Nothing on this website constitutes medical advice, clinical diagnosis, or treatment recommendations. The information presented should not be interpreted as a substitute for the professional judgment of a licensed physician, pharmacist, or other qualified healthcare provider.',
      'PeptideX is an independent educational platform. We are not a medical practice, pharmacy, clinic, or healthcare institution. No provider-patient relationship is created by your use of this website.',
    ],
  },
  {
    id: 'not-a-substitute',
    icon: AlertTriangle,
    iconColor: 'text-amber-400',
    bgColor: 'bg-amber-500/10',
    borderColor: 'border-amber-500/20',
    title: '2. Not a Substitute for Professional Medical Advice',
    paragraphs: [
      'The information provided on peptidex.app should never be used as a substitute for professional medical advice, diagnosis, or treatment. Always seek the counsel of a qualified healthcare provider with any questions you may have regarding a medical condition, medication, therapy, or treatment plan.',
      'Never disregard professional medical advice or delay in seeking it because of something you have read on this website. If you believe you are experiencing a medical emergency, contact your local emergency services immediately.',
      'PeptideX strongly recommends that any individual considering peptide therapy, supplementation, or any related intervention consult with a qualified healthcare professional who can evaluate their specific medical history, current medications, and individual health needs before proceeding.',
    ],
  },
  {
    id: 'no-therapeutic-claims',
    icon: ShieldAlert,
    iconColor: 'text-red-400',
    bgColor: 'bg-red-500/10',
    borderColor: 'border-red-500/20',
    title: '3. No Therapeutic Claims',
    paragraphs: [
      'PeptideX does not sell peptides, prescribe treatments, compound medications, or make therapeutic claims about any compound discussed on this website. We are not a vendor, manufacturer, or distributor of any research chemicals, pharmaceuticals, or dietary supplements.',
      'Research findings referenced on this website are presented as published in peer-reviewed scientific literature, FDA regulatory filings, and established clinical data sources. The inclusion of such information does not imply guaranteed outcomes, therapeutic efficacy, or safety for any individual.',
      'References to \"dosing,\" \"protocols,\" or \"administration\" on this website refer exclusively to methodological parameters reported in published preclinical or clinical research and should never be interpreted as personal dosing instructions or clinical guidance.',
    ],
  },
  {
    id: 'research-context',
    icon: Beaker,
    iconColor: 'text-blue-400',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/20',
    title: '4. Research Context & Regulatory Status',
    paragraphs: [
      'Many peptides discussed on this website are the subject of ongoing scientific research and preclinical investigation. Some compounds referenced may not be approved by the U.S. Food and Drug Administration (FDA) or equivalent regulatory bodies for human therapeutic use. Information about such compounds is presented strictly in an educational and scientific context.',
      'The regulatory status of peptide compounds varies by jurisdiction and is subject to change. PeptideX does not warrant or guarantee the legal status of any compound in any specific country, state, or territory. Users are responsible for understanding and complying with all applicable laws and regulations in their jurisdiction.',
      'Compounds described as \"research-use only\" are intended for authorized laboratory, academic, and in-vitro investigation. They are not approved for human consumption, and any such use is undertaken entirely at the individual\'s own risk and responsibility.',
    ],
  },
  {
    id: 'accuracy',
    icon: RefreshCw,
    iconColor: 'text-emerald-400',
    bgColor: 'bg-emerald-500/10',
    borderColor: 'border-emerald-500/20',
    title: '5. Accuracy & Currency of Information',
    paragraphs: [
      'While PeptideX strives for accuracy and regularly reviews and updates published content, the field of peptide science evolves rapidly. New research, clinical trial results, and regulatory decisions may alter the accuracy or completeness of information previously published on this website.',
      'PeptideX makes no warranties or representations, express or implied, regarding the completeness, accuracy, reliability, suitability, or availability of the information, products, services, or related graphics contained on this website for any purpose.',
      'We encourage all readers to verify information through primary sources — including PubMed, ClinicalTrials.gov, FDA.gov, and the original peer-reviewed publications cited in our content — and to consult qualified healthcare professionals before making any health-related decisions.',
    ],
  },
  {
    id: 'external-links',
    icon: Link2,
    iconColor: 'text-zinc-400',
    bgColor: 'bg-zinc-500/10',
    borderColor: 'border-zinc-500/20',
    title: '6. External Links & Third-Party Resources',
    paragraphs: [
      'PeptideX may contain links to external websites and resources, including but not limited to PubMed, FDA.gov, ClinicalTrials.gov, peer-reviewed journals, and third-party vendor websites. These links are provided for informational reference and reader convenience only.',
      'The inclusion of any external link does not constitute an endorsement, recommendation, or approval by PeptideX of the linked website, its operators, its content, or any products or services offered therein. PeptideX has no control over the content, privacy policies, or practices of third-party websites and assumes no responsibility for their accuracy, legality, or content.',
      'Users who navigate to external websites from peptidex.app do so at their own risk and are subject to the terms, conditions, and privacy policies of those external sites.',
    ],
  },
];

export default function DisclaimerPage() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://peptidex.app/' },
      { '@type': 'ListItem', position: 2, name: 'Medical Disclaimer', item: 'https://peptidex.app/disclaimer' },
    ],
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 md:py-12 space-y-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm text-zinc-500" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-zinc-300 transition-colors">Home</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-zinc-300 font-medium">Medical Disclaimer</span>
      </nav>

      {/* Header */}
      <header className="space-y-4 pb-8 border-b border-zinc-800">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-zinc-100">
          Medical Disclaimer
        </h1>
        <p className="text-sm text-zinc-500 font-medium">
          Last Updated: {LAST_UPDATED}
        </p>
        <div className="rounded-xl bg-amber-950/25 border border-amber-500/20 p-4 mt-4">
          <div className="flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-amber-200/90 leading-relaxed font-medium">
              <strong>Important:</strong> Please read this disclaimer carefully before using peptidex.app. By accessing and using this website, you acknowledge that you have read, understood, and agree to be bound by the terms outlined below.
            </p>
          </div>
        </div>
      </header>

      {/* Sections */}
      <article className="space-y-8">
        {SECTIONS.map((section) => {
          const Icon = section.icon;
          return (
            <section key={section.id} id={section.id} className="space-y-4">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl ${section.bgColor} border ${section.borderColor} flex items-center justify-center flex-shrink-0`}>
                  <Icon className={`w-5 h-5 ${section.iconColor}`} />
                </div>
                <h2 className="text-xl font-bold text-zinc-100">{section.title}</h2>
              </div>
              <div className="rounded-2xl bg-zinc-900/40 border border-zinc-800 p-6 space-y-4">
                {section.paragraphs.map((p, idx) => (
                  <p key={idx} className="text-sm text-zinc-400 leading-relaxed">
                    {p}
                  </p>
                ))}
              </div>
            </section>
          );
        })}
      </article>

      {/* Governing Law */}
      <section className="pt-8 border-t border-zinc-800 space-y-4">
        <h2 className="text-lg font-bold text-zinc-100">Limitation of Liability</h2>
        <div className="rounded-2xl bg-zinc-900/40 border border-zinc-800 p-6 space-y-4">
          <p className="text-sm text-zinc-400 leading-relaxed">
            To the fullest extent permitted by applicable law, PeptideX and its operators, contributors, and affiliates shall not be liable for any damages — including but not limited to direct, indirect, incidental, consequential, special, or punitive damages — arising from or in connection with your access to, use of, or inability to use this website or any content published herein.
          </p>
          <p className="text-sm text-zinc-400 leading-relaxed">
            Your use of any information on peptidex.app is solely at your own risk. PeptideX expressly disclaims all liability for any actions taken or not taken based on any content on this website.
          </p>
        </div>
      </section>

      {/* Contact for Concerns */}
      <section className="pt-8 border-t border-zinc-800 space-y-4">
        <h2 className="text-lg font-bold text-zinc-100">Questions or Concerns</h2>
        <p className="text-sm text-zinc-400 leading-relaxed">
          If you have any questions about this disclaimer or believe you have identified inaccurate information on our website, please contact us at{' '}
          <a href="mailto:contact@peptidex.app" className="text-violet-400 hover:text-violet-300 font-medium transition-colors">
            contact@peptidex.app
          </a>.
        </p>
      </section>
    </div>
  );
}
