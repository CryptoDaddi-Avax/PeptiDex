import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, Beaker, ArrowRight, Flame, Heart, Sparkles, Dna, Syringe, Brain, ShieldCheck, Microscope } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Peptide Library — Evidence-Based Compound Profiles | PeptideX',
  description: 'Browse the PeptideX peptide library: detailed, research-backed profiles of 33+ peptide compounds organized by therapeutic category. Includes mechanism of action, clinical data, safety profiles, and cited sources.',
  alternates: {
    canonical: 'https://peptidex.app/peptides',
  },
  openGraph: {
    title: 'The PeptideX Peptide Library — Evidence-Based Compound Profiles',
    description: 'Detailed, research-backed profiles of 33+ peptide compounds organized by therapeutic category. Mechanism of action, clinical data, safety profiles, and cited sources.',
    url: 'https://peptidex.app/peptides',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PeptideX Peptide Library',
    description: '33+ research-backed peptide compound profiles organized by therapeutic category.',
    images: ['/og-image.png'],
  },
};

// ─── CATEGORY DATA ───────────────────────────────────────────────

interface CategoryCard {
  name: string;
  description: string;
  icon: React.ElementType;
  iconColor: string;
  bgGradient: string;
  borderColor: string;
  accentDot: string;
  compounds: { name: string; slug: string }[];
}

const CATEGORIES: CategoryCard[] = [
  {
    name: 'Weight Loss & Metabolic Peptides',
    description: 'GLP-1 receptor agonists, dual/triple agonists, and small-molecule metabolic modulators driving the most active area of clinical peptide research.',
    icon: Flame,
    iconColor: 'text-orange-400',
    bgGradient: 'from-orange-500/5 to-transparent',
    borderColor: 'border-orange-500/20 hover:border-orange-500/40',
    accentDot: 'bg-orange-500',
    compounds: [
      { name: 'Semaglutide', slug: 'semaglutide' },
      { name: 'Tirzepatide', slug: 'tirzepatide' },
      { name: 'Retatrutide', slug: 'retatrutide' },
      { name: 'Tesofensine', slug: 'tesofensine' },
      { name: 'AOD-9604', slug: 'aod-9604' },
      { name: 'Cagrilintide', slug: 'cagrilintide' },
    ],
  },
  {
    name: 'Healing & Recovery Peptides',
    description: 'Tissue repair, wound healing, and musculoskeletal recovery compounds with extensive preclinical and emerging clinical evidence.',
    icon: Heart,
    iconColor: 'text-rose-400',
    bgGradient: 'from-rose-500/5 to-transparent',
    borderColor: 'border-rose-500/20 hover:border-rose-500/40',
    accentDot: 'bg-rose-500',
    compounds: [
      { name: 'BPC-157', slug: 'bpc-157' },
      { name: 'TB-500', slug: 'tb-500' },
      { name: 'GHK-Cu', slug: 'ghk-cu' },
      { name: 'KPV', slug: 'kpv' },
    ],
  },
  {
    name: 'Anti-Aging & Skin Peptides',
    description: 'Longevity-focused compounds targeting telomere maintenance, collagen synthesis, gene expression modulation, and cellular regeneration.',
    icon: Sparkles,
    iconColor: 'text-violet-400',
    bgGradient: 'from-violet-500/5 to-transparent',
    borderColor: 'border-violet-500/20 hover:border-violet-500/40',
    accentDot: 'bg-violet-500',
    compounds: [
      { name: 'GHK-Cu', slug: 'ghk-cu' },
      { name: 'Epitalon', slug: 'epitalon' },
      { name: 'Glutathione', slug: 'glutathione' },
      { name: 'NAD+', slug: 'nad' },
    ],
  },
  {
    name: 'Longevity & Mitochondrial Peptides',
    description: 'Mitochondrial-derived and mitochondria-targeting peptides being investigated for age-related metabolic decline and cellular energy optimization.',
    icon: Dna,
    iconColor: 'text-cyan-400',
    bgGradient: 'from-cyan-500/5 to-transparent',
    borderColor: 'border-cyan-500/20 hover:border-cyan-500/40',
    accentDot: 'bg-cyan-500',
    compounds: [
      { name: 'MOTS-c', slug: 'mots-c' },
      { name: 'SS-31', slug: 'ss-31' },
      { name: 'Epitalon', slug: 'epitalon' },
      { name: 'NAD+', slug: 'nad' },
    ],
  },
  {
    name: 'Growth Hormone Peptides',
    description: 'GHRH analogs, growth hormone releasing peptides, and secretagogues that stimulate endogenous GH production through distinct receptor pathways.',
    icon: Syringe,
    iconColor: 'text-emerald-400',
    bgGradient: 'from-emerald-500/5 to-transparent',
    borderColor: 'border-emerald-500/20 hover:border-emerald-500/40',
    accentDot: 'bg-emerald-500',
    compounds: [
      { name: 'CJC-1295', slug: 'cjc-1295' },
      { name: 'Ipamorelin', slug: 'ipamorelin' },
      { name: 'Sermorelin', slug: 'sermorelin' },
      { name: 'MK-677', slug: 'mk-677' },
      { name: 'Tesamorelin', slug: 'tesamorelin' },
      { name: 'GHRP-2', slug: 'ghrp-2' },
      { name: 'GHRP-6', slug: 'ghrp-6' },
      { name: 'Hexarelin', slug: 'hexarelin' },
      { name: 'IGF-1 LR3', slug: 'igf-1-lr3' },
      { name: 'Follistatin-344', slug: 'follistatin-344' },
    ],
  },
  {
    name: 'Cognitive & Nootropic Peptides',
    description: 'Neuropeptides investigated for cognitive enhancement, neuroprotection, anxiolysis, and neurotransmitter modulation in preclinical models.',
    icon: Brain,
    iconColor: 'text-amber-400',
    bgGradient: 'from-amber-500/5 to-transparent',
    borderColor: 'border-amber-500/20 hover:border-amber-500/40',
    accentDot: 'bg-amber-500',
    compounds: [
      { name: 'Semax', slug: 'semax' },
      { name: 'Selank', slug: 'selank' },
      { name: 'DSIP', slug: 'dsip' },
    ],
  },
  {
    name: 'Immune Modulation Peptides',
    description: 'Thymic peptides, antimicrobial peptides, and immunomodulators with applications in immune reconstitution, pathogen defense, and inflammation.',
    icon: ShieldCheck,
    iconColor: 'text-blue-400',
    bgGradient: 'from-blue-500/5 to-transparent',
    borderColor: 'border-blue-500/20 hover:border-blue-500/40',
    accentDot: 'bg-blue-500',
    compounds: [
      { name: 'Thymosin Alpha-1', slug: 'thymosin-alpha-1' },
      { name: 'LL-37', slug: 'll-37' },
      { name: 'KPV', slug: 'kpv' },
    ],
  },
];

// ─── FAQ DATA ────────────────────────────────────────────────────

const FAQ_ITEMS = [
  {
    question: 'What are peptides?',
    answer: 'Peptides are short chains of amino acids — typically between 2 and 50 — linked by peptide bonds. They serve as signaling molecules in the body, influencing processes ranging from immune response and tissue repair to metabolism and hormone regulation. Over 80 peptide-based drugs have been approved by the FDA.',
  },
  {
    question: 'Are peptides safe?',
    answer: 'Safety varies significantly by compound, dosage, and route of administration. FDA-approved peptide drugs like semaglutide and tirzepatide have undergone rigorous clinical trials. Many other peptides are still in research phases. Always consult a healthcare provider before using any peptide therapy.',
  },
  {
    question: 'What is the difference between a peptide and a protein?',
    answer: 'The distinction is primarily one of size. Peptides are generally defined as chains of 2–50 amino acids, while proteins are larger chains typically exceeding 50 amino acids. Both are built from the same amino acid building blocks, but their size differences influence their biological behavior, stability, and how they interact with cellular receptors.',
  },
  {
    question: 'Do peptides require a prescription?',
    answer: 'It depends on the peptide. FDA-approved peptide medications like semaglutide (Ozempic, Wegovy) and tirzepatide (Mounjaro, Zepbound) require a prescription. Many other peptides are available through compounding pharmacies with a prescription, while some are sold for research use only and are not approved for human consumption.',
  },
];

// ─── PAGE COMPONENT ──────────────────────────────────────────────

export default function PeptideLibraryPage() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://peptidex.app/' },
      { '@type': 'ListItem', position: 2, name: 'Peptide Library', item: 'https://peptidex.app/peptides' },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_ITEMS.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  const collectionPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'The PeptideX Peptide Library',
    description: 'Evidence-based compound profiles of 33+ peptide compounds organized by therapeutic category.',
    url: 'https://peptidex.app/peptides',
    publisher: {
      '@type': 'Organization',
      name: 'PeptideX',
      url: 'https://peptidex.app',
    },
  };

  const totalCompounds = new Set(CATEGORIES.flatMap(c => c.compounds.map(p => p.slug))).size;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 md:py-12 space-y-14">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPageSchema) }} />

      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm text-zinc-500" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-zinc-300 transition-colors">Home</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-zinc-300 font-medium">Peptide Library</span>
      </nav>

      {/* ═══════ HEADER ═══════ */}
      <header className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center flex-shrink-0">
            <Microscope className="w-6 h-6 text-violet-400" />
          </div>
          <div>
            <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight text-zinc-100 leading-tight">
              The PeptideX Peptide Library
            </h1>
            <p className="text-sm text-violet-400 font-medium mt-1">Evidence-Based Compound Profiles</p>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="flex flex-wrap items-center gap-4 p-4 rounded-xl bg-zinc-900/50 border border-zinc-800">
          <div className="flex items-center gap-2">
            <Beaker className="w-4 h-4 text-violet-400" />
            <span className="text-sm text-zinc-300 font-semibold">{totalCompounds} Compounds</span>
          </div>
          <div className="w-px h-4 bg-zinc-700" />
          <div className="flex items-center gap-2">
            <span className="text-sm text-zinc-300 font-semibold">{CATEGORIES.length} Categories</span>
          </div>
          <div className="w-px h-4 bg-zinc-700" />
          <div className="flex items-center gap-2">
            <span className="text-sm text-zinc-400 font-medium">All profiles cite peer-reviewed sources</span>
          </div>
        </div>

        {/* Intro */}
        <div className="space-y-4">
          <p className="text-[15px] text-zinc-300 leading-relaxed">
            The PeptideX Peptide Library provides detailed, research-backed profiles of peptide compounds across major therapeutic categories. Each profile includes a comprehensive breakdown of mechanism of action, published research findings from PubMed-indexed studies and registered clinical trials, documented safety information and side effect data, dosing protocols as reported in the literature, and fully cited primary sources.
          </p>
          <p className="text-[15px] text-zinc-300 leading-relaxed">
            This library is designed as a reference resource for researchers, students, healthcare professionals, and anyone seeking reliable, evidence-based peptide information — organized for rapid lookup and cross-referencing. Whether you are investigating a specific compound for a literature review, comparing mechanisms across peptide classes, or simply trying to understand what the published data actually says, our profiles provide structured, transparent analysis in one centralized hub.
          </p>
          <p className="text-sm text-zinc-500 leading-relaxed italic">
            All information is presented for educational purposes only. PeptideX does not sell peptides, prescribe treatments, or make therapeutic claims. Consult a qualified healthcare provider before starting any peptide therapy.
          </p>
        </div>
      </header>

      {/* ═══════ CATEGORY CARDS ═══════ */}
      <section className="space-y-6">
        <h2 className="text-xl font-bold text-zinc-100 uppercase tracking-wider text-sm">Browse by Category</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.name}
                className={`rounded-2xl bg-gradient-to-br ${cat.bgGradient} bg-zinc-900/40 border ${cat.borderColor} p-6 space-y-4 transition-all duration-300 group`}
              >
                {/* Header */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-zinc-800/80 border border-zinc-700/50 flex items-center justify-center">
                    <Icon className={`w-5 h-5 ${cat.iconColor}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base font-bold text-zinc-100">{cat.name}</h3>
                    <p className="text-xs text-zinc-500 font-medium">{cat.compounds.length} compound{cat.compounds.length !== 1 ? 's' : ''}</p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-zinc-400 leading-relaxed">{cat.description}</p>

                {/* Compound Tags */}
                <div className="flex flex-wrap gap-2">
                  {cat.compounds.map((compound) => (
                    <Link
                      key={compound.slug}
                      href={`/peptides/${compound.slug}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800/80 border border-zinc-700/50 text-xs font-semibold text-zinc-300 hover:text-white hover:border-zinc-500 transition-colors"
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${cat.accentDot} flex-shrink-0`} />
                      {compound.name}
                    </Link>
                  ))}
                </div>

                {/* Browse All */}
                <div className="pt-2">
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-500 group-hover:text-zinc-300 transition-colors">
                    Browse all {cat.compounds.length} profiles
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ═══════ FULL A-Z INDEX ═══════ */}
      <section className="space-y-6 pt-8 border-t border-zinc-800">
        <h2 className="text-xl font-bold text-zinc-100">Complete A–Z Index</h2>
        <p className="text-sm text-zinc-400">Quick access to every compound in the library.</p>
        <div className="flex flex-wrap gap-2">
          {Array.from(new Set(CATEGORIES.flatMap(c => c.compounds)))
            .filter((compound, index, self) => self.findIndex(c => c.slug === compound.slug) === index)
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((compound) => (
              <Link
                key={compound.slug}
                href={`/peptides/${compound.slug}`}
                className="px-4 py-2 rounded-xl bg-zinc-900/50 border border-zinc-800 text-sm font-semibold text-zinc-300 hover:text-white hover:border-violet-500/40 hover:bg-violet-500/5 transition-all"
              >
                {compound.name}
              </Link>
            ))}
        </div>
      </section>

      {/* ═══════ FAQ SECTION ═══════ */}
      <section className="space-y-6 pt-8 border-t border-zinc-800">
        <h2 className="text-2xl font-bold text-zinc-100 text-center">Frequently Asked Questions</h2>
        <div className="max-w-3xl mx-auto space-y-4">
          {FAQ_ITEMS.map((faq, idx) => (
            <div key={idx} className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-base font-bold text-zinc-200 mb-3">{faq.question}</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════ CTA ═══════ */}
      <section className="rounded-2xl bg-gradient-to-br from-violet-900/30 to-zinc-900 border border-violet-500/20 p-6 md:p-8 text-center space-y-4">
        <h2 className="text-xl font-bold text-zinc-100">Ready to dive deeper?</h2>
        <p className="text-sm text-zinc-400 max-w-lg mx-auto">
          Our interactive tools let you compare peptides side-by-side, plan research cycles, and check compound interactions.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link href="/tools/cycle-planner" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold text-sm transition-all shadow-lg hover:shadow-violet-500/20">
            Cycle Planner <ArrowRight className="w-4 h-4" />
          </Link>
          <Link href="/beginners-guide" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-bold text-sm transition-colors border border-zinc-700">
            Beginner&apos;s Guide <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Disclaimer */}
      <div className="pt-8 border-t border-zinc-800">
        <p className="text-xs text-zinc-500 leading-relaxed text-center">
          All peptide information is presented for educational and research purposes only. PeptideX does not sell peptides. Consult a qualified healthcare provider before starting any therapy. <Link href="/disclaimer" className="text-violet-400 hover:text-violet-300 transition-colors">Read our full medical disclaimer.</Link>
        </p>
      </div>
    </div>
  );
}
