import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, Shield, BookOpen, Search, Scale, ArrowRight, Mail, Users, Microscope, GraduationCap, ExternalLink, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About PeptideX | Mission, Editorial Standards & Team',
  description: 'PeptideX is an independent peptide science education platform. Learn about our mission, editorial standards, research team, and commitment to evidence-based peptide information.',
  alternates: {
    canonical: 'https://peptidex.app/about',
  },
  openGraph: {
    title: 'About PeptideX — Independent Peptide Science Education',
    description: 'Learn about our mission, editorial standards, and the team behind the most trusted peptide research platform.',
    url: 'https://peptidex.app/about',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About PeptideX — Independent Peptide Science Education',
    description: 'Mission, editorial standards, and team behind the most trusted peptide research platform.',
    images: ['/og-image.png'],
  },
};

const TEAM_MEMBERS = [
  {
    name: 'Dr. E. Vance',
    title: 'Editorial Director',
    initials: 'EV',
    slug: 'dr-e-vance',
    image: '/images/authors/dr-e-vance.png',
    bio: 'Dr. Vance leads PeptideX\'s editorial division and is responsible for ensuring all published research summaries meet rigorous citation standards. With a background in molecular pharmacology and over 12 years of experience in preclinical peptide research, Dr. Vance oversees the platform\'s commitment to accuracy and scientific integrity across every compound profile, blog article, and educational guide.',
    credentials: [
      { label: 'PubMed Author Profile', url: '#' },
      { label: 'ORCID', url: '#' },
    ],
  },
  {
    name: 'Jordan Wei, M.S.',
    title: 'Research Analyst',
    initials: 'JW',
    slug: null,
    image: null,
    bio: 'Jordan specializes in GLP-1 receptor agonists and metabolic peptide research. He is responsible for maintaining the accuracy of compound profiles related to weight management, insulin signaling, and mitochondrial-derived peptides. Jordan holds a Master\'s degree in Biochemistry and has contributed to published research on incretin mimetics and oral peptide delivery systems.',
    credentials: [
      { label: 'Google Scholar', url: '#' },
      { label: 'LinkedIn', url: '#' },
    ],
  },
  {
    name: 'Dr. Priya Anand',
    title: 'Clinical Review Lead',
    initials: 'PA',
    slug: null,
    image: null,
    bio: 'Dr. Anand reviews all clinical trial data referenced across PeptideX, ensuring proper characterization of evidence levels (Phase I through Phase III), safety profiles, and regulatory status. She holds a PharmD and previously worked in clinical pharmacovigilance at a major pharmaceutical firm before joining our editorial team.',
    credentials: [
      { label: 'LinkedIn', url: '#' },
      { label: 'ResearchGate', url: '#' },
    ],
  },
];

export default function AboutPage() {
  // --- JSON-LD SCHEMAS ---
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'PeptideX',
    alternateName: 'PeptiDex',
    url: 'https://peptidex.app',
    logo: 'https://peptidex.app/logo.png',
    description: 'Peptide science education, research news, and compound profiles. Trusted source for evidence-based peptide information.',
    foundingDate: '2025',
    sameAs: [
      'https://twitter.com/peptidex',
      'https://facebook.com/peptidex',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'contact@peptidex.app',
      contactType: 'customer support',
      availableLanguage: 'English',
    },
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

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About PeptideX',
    description: 'PeptideX is an independent peptide science education platform providing evidence-based information about peptide compounds, research trends, and the science behind peptide therapies.',
    url: 'https://peptidex.app/about',
    mainEntity: {
      '@type': 'Organization',
      name: 'PeptideX',
      url: 'https://peptidex.app',
    },
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-12 space-y-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />

      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm text-zinc-500" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-zinc-300 transition-colors">Home</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-zinc-300 font-medium">About</span>
      </nav>

      {/* ═══════════════ SECTION 1: What is PeptideX? ═══════════════ */}
      <header className="space-y-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-11 h-11 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center">
            <Microscope className="w-5 h-5 text-violet-400" />
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-100 leading-tight">
            What is PeptideX?
          </h1>
        </div>

        <div className="rounded-2xl bg-zinc-900/40 border border-zinc-800 p-6 md:p-8 space-y-5">
          <p className="text-[15px] text-zinc-300 leading-relaxed">
            <strong className="text-zinc-100">PeptideX is an independent peptide science education platform</strong> dedicated to providing accurate, evidence-based information about peptide compounds, emerging research trends, and the science behind peptide therapies. We aggregate and synthesize findings from peer-reviewed journals, FDA regulatory filings, and established clinical datasets — transforming dense academic literature into accessible, structured research profiles that serve laboratory professionals, academic researchers, and informed readers exploring the peptide space.
          </p>
          <p className="text-[15px] text-zinc-300 leading-relaxed">
            Every claim published on PeptideX is supported by cited peer-reviewed research. Our compound profiles, blog articles, and educational guides draw exclusively from PubMed-indexed publications, ClinicalTrials.gov registries, and official regulatory announcements. We believe that rigorous citation practices are the foundation of trustworthy science communication — and we hold ourselves to the same standards expected of academic publishing.
          </p>
          <p className="text-[15px] text-zinc-300 leading-relaxed">
            <strong className="text-zinc-100">PeptideX does not sell peptides or make therapeutic claims.</strong> We are not a vendor, pharmacy, clinic, or supplement company. We do not manufacture, compound, or distribute any research chemicals. Our platform exists solely to educate — and we are committed to maintaining strict independence between our editorial content and any commercial interests in the peptide industry.
          </p>
        </div>
      </header>

      {/* ═══════════════ SECTION 2: Our Mission ═══════════════ */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
            <Shield className="w-5 h-5 text-emerald-400" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-zinc-100">Our Mission</h2>
        </div>

        <div className="rounded-2xl bg-zinc-900/40 border border-zinc-800 p-6 md:p-8 space-y-5">
          <p className="text-[15px] text-zinc-300 leading-relaxed">
            PeptideX exists to make peptide science <strong className="text-zinc-100">accessible, accurate, and trustworthy</strong>. As the peptide space grows rapidly — with the global peptide therapeutics market projected to reach <strong className="text-zinc-100">$80+ billion by 2032</strong> and clinical trial activity surging across metabolic, regenerative, and longevity categories — reliable, unbiased information has never been more important.
          </p>
          <p className="text-[15px] text-zinc-300 leading-relaxed">
            We bridge the gap between published research and public understanding. The academic literature on peptides is vast, fragmented across thousands of journals, and often written in language inaccessible to anyone outside a narrow specialty. PeptideX organizes this knowledge into clear, structured formats — from individual compound profiles with mechanism-of-action summaries to comparative stack guides informed by preclinical synergy data — so that researchers at every level can make informed decisions grounded in the best available evidence.
          </p>
          <p className="text-[15px] text-zinc-300 leading-relaxed">
            Our goal is simple: <strong className="text-zinc-100">become the most trusted source of peptide science education on the internet.</strong>
          </p>
        </div>
      </section>

      {/* ═══════════════ SECTION 3: Editorial Standards ═══════════════ */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-blue-400" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-zinc-100">Editorial Standards</h2>
        </div>

        <div className="rounded-2xl bg-zinc-900/40 border border-zinc-800 p-6 md:p-8 space-y-6">
          <p className="text-[15px] text-zinc-300 leading-relaxed">
            Credibility is the foundation of everything we publish. PeptideX adheres to strict editorial standards designed to ensure accuracy, transparency, and scientific rigor across all content.
          </p>

          <div className="space-y-4">
            {[
              {
                label: 'Peer-Reviewed Citations Required',
                desc: 'Every factual claim is supported by cited peer-reviewed research, FDA announcements, or established clinical data. We do not publish unsubstantiated claims, anecdotal reports, or manufacturer marketing materials as evidence.',
              },
              {
                label: 'Regular Accuracy Reviews',
                desc: 'All published content is reviewed for accuracy and updated on a regular basis. When new research is published that changes the scientific consensus on a compound, we update our profiles and articles to reflect the latest findings. Major updates are clearly timestamped.',
              },
              {
                label: 'Clear Educational Labeling',
                desc: 'We clearly label all content as educational and always include medical disclaimers. Dosing protocols referenced on PeptideX are reported strictly as observed in published research literature and are never intended as clinical recommendations for human use.',
              },
              {
                label: 'Editorial Independence',
                desc: 'We do not accept paid placements, sponsored articles, or any form of compensation that compromises editorial integrity. No vendor, manufacturer, or commercial entity can influence our research profiles, review scores, or content conclusions.',
              },
            ].map((item) => (
              <div key={item.label} className="flex items-start gap-3 p-4 rounded-xl bg-zinc-950/40 border border-zinc-800/50">
                <CheckCircle2 className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-zinc-100 mb-1">{item.label}</p>
                  <p className="text-sm text-zinc-400 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-zinc-800/50">
            <Link href="/about/editorial-policy" className="inline-flex items-center gap-1.5 text-sm text-violet-400 hover:text-violet-300 font-medium transition-colors group">
              Read our full Editorial Policy
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════ SECTION 4: Meet the Team ═══════════════ */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center">
            <Users className="w-5 h-5 text-violet-400" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-zinc-100">Meet the Team</h2>
        </div>

        <p className="text-[15px] text-zinc-400 leading-relaxed max-w-2xl">
          PeptideX is built by a multidisciplinary team of researchers, scientists, and writers united by a shared commitment to evidence-based peptide education.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-1 gap-5">
          {TEAM_MEMBERS.map((member) => (
            <div key={member.name} className="rounded-2xl bg-zinc-900/40 border border-zinc-800 p-6 md:p-8 hover:border-zinc-700 transition-colors">
              <div className="flex items-start gap-5">
                {/* Avatar */}
                {member.image ? (
                  <div className="w-16 h-16 rounded-2xl overflow-hidden border border-violet-500/30 flex-shrink-0 relative bg-zinc-800">
                    <Image src={member.image} alt={`${member.name} — ${member.title} at PeptiDex`} fill className="object-cover" sizes="64px" unoptimized />
                  </div>
                ) : (
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500/20 to-blue-500/20 border border-violet-500/30 flex items-center justify-center flex-shrink-0">
                    <span className="text-lg font-bold text-violet-300">{member.initials}</span>
                  </div>
                )}

                <div className="flex-1 space-y-3">
                  {/* Name & Title */}
                  <div>
                    {member.slug ? (
                      <Link href={`/about/${member.slug}`} className="text-lg font-bold text-zinc-100 hover:text-violet-400 transition-colors">{member.name}</Link>
                    ) : (
                      <h3 className="text-lg font-bold text-zinc-100">{member.name}</h3>
                    )}
                    <p className="text-sm text-violet-400 font-medium">{member.title}</p>
                  </div>

                  {/* Bio */}
                  <p className="text-sm text-zinc-400 leading-relaxed">
                    {member.bio}
                  </p>

                  {/* Credential Links + Profile Link */}
                  <div className="flex flex-wrap gap-3 pt-1">
                    {member.slug && (
                      <Link
                        href={`/about/${member.slug}`}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-violet-400 hover:text-violet-300 transition-colors border border-violet-500/30 rounded-lg px-3 py-1.5 hover:border-violet-500/50 bg-violet-950/30"
                      >
                        <ArrowRight className="w-3 h-3" />
                        View Full Profile
                      </Link>
                    )}
                    {member.credentials.map((cred) => (
                      <a
                        key={cred.label}
                        href={cred.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-500 hover:text-violet-400 transition-colors border border-zinc-800 rounded-lg px-3 py-1.5 hover:border-violet-500/30 bg-zinc-950/50"
                      >
                        <ExternalLink className="w-3 h-3" />
                        {cred.label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════ SECTION 5: Contact Us ═══════════════ */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
            <Mail className="w-5 h-5 text-emerald-400" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-zinc-100">Contact Us</h2>
        </div>

        <div className="rounded-2xl bg-zinc-900/40 border border-zinc-800 p-6 md:p-8 space-y-5">
          <p className="text-[15px] text-zinc-300 leading-relaxed">
            We welcome corrections, suggestions, research collaboration inquiries, and general feedback. Maintaining accuracy is our highest priority — if you identify an error in any of our published content, we want to hear about it.
          </p>

          <div className="flex items-center gap-3 p-4 rounded-xl bg-zinc-950/60 border border-zinc-800/50">
            <Mail className="w-5 h-5 text-emerald-400 flex-shrink-0" />
            <div>
              <p className="text-xs text-zinc-500 uppercase tracking-wider font-semibold mb-0.5">General Inquiries</p>
              <a href="mailto:contact@peptidex.app" className="text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition-colors">
                contact@peptidex.app
              </a>
            </div>
          </div>

          <p className="text-sm text-zinc-500 leading-relaxed">
            Please note: PeptideX cannot provide medical advice, dosing recommendations, or clinical guidance. All inquiries of a medical nature should be directed to a licensed healthcare professional. We aim to respond to correspondence within 48 hours.
          </p>
        </div>
      </section>

      {/* ═══════════════ Affiliate & Vendor Disclosure ═══════════════ */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
            <Scale className="w-5 h-5 text-amber-400" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-zinc-100">Affiliate Disclosure</h2>
        </div>
        <div className="rounded-2xl bg-amber-950/20 border border-amber-500/20 p-6 md:p-8 space-y-4">
          <p className="text-sm text-amber-200/90 leading-relaxed font-medium">
            <strong>FTC Compliance Notice:</strong> PeptideX participates in affiliate partnerships with select research peptide vendors. When you click on a vendor link and make a purchase, PeptideX may earn a commission at no additional cost to you.
          </p>
          <p className="text-sm text-amber-200/70 leading-relaxed">
            These affiliate relationships do not influence our editorial content, vendor rankings, or review scores. Vendors cannot pay for higher placement. All recommendations are based exclusively on independently verified COA data, pricing transparency, and fulfillment reliability.
          </p>
          <p className="text-sm text-amber-200/70 leading-relaxed">
            Affiliate revenue supports the continued operation of PeptideX as a free, independent research resource. We believe in full transparency and encourage researchers to verify all vendor claims independently before sourcing materials for their laboratories.
          </p>
        </div>
      </section>

      {/* Bottom Disclaimer */}
      <div className="pt-8 border-t border-zinc-800">
        <p className="text-xs text-zinc-500 leading-relaxed text-justify">
          <strong>DISCLAIMER:</strong> PeptideX is an independent educational platform. The information provided across this website is intended exclusively for educational, informational, and academic purposes. PeptideX does not sell, manufacture, or distribute peptides or any research chemicals. Nothing on this platform should be interpreted as medical advice, diagnosis, or treatment recommendations. All peptide compounds discussed are investigational and should only be handled by qualified researchers in appropriate laboratory settings. Always consult a licensed healthcare professional before interacting with any novel biological compounds.
        </p>
      </div>
    </div>
  );
}
