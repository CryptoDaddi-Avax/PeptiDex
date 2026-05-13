import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { AutoLink } from '@/components/auto-link';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, Calendar, User, ArrowLeft, ArrowRight, Clock, ShieldAlert, BookOpen, AlertCircle, Scale, FlaskConical, TrendingUp, Landmark, AlertTriangle, CheckCircle2, Stethoscope, Shield, FileSearch, Activity } from 'lucide-react';
import { ShareBar } from '@/components/share-bar';
import { CiteThisPage } from '@/components/cite-page';
import { AuthorBio } from '@/components/author-bio';
import { FeedbackModal } from '@/components/feedback-modal';
import { SHORT_DISCLAIMER } from '@/data/constants';
import { LibraryCallout } from '@/components/library-callout';
import { getAuthorSlug } from '@/data/authors';
import { BlogVendorCallout } from '@/components/blog-vendor-callout';

const POST_TITLE = 'The 2026 FDA Peptide Reclassification: What It Means for Patients, Providers, and the Future of Peptide Therapy';
const POST_DESC = 'A comprehensive analysis of the 2026 FDA peptide reclassification — which 14 peptides are returning to Category 1, what it means for patients and providers, and how to navigate peptide therapy safely.';
const AUTHOR = 'PeptideX Editorial';
const DATE_PUB = '2026-04-13';
const DATE_MOD = '2026-04-13';
const SLUG = 'fda-peptide-reclassification-patients-providers';
const CANONICAL = `https://peptidex.app/blog/${SLUG}`;

export const metadata: Metadata = {
  title: `${POST_TITLE}`,
  description: POST_DESC,
  keywords: [
    'peptide therapy 2026', 'FDA peptide reclassification', 'BPC-157 legal status',
    'peptide compounding', 'growth hormone peptides', 'peptide regulation',
    'Category 1 peptides', 'TB-500', 'CJC-1295', 'Ipamorelin',
    'Category 1 Compounding', 'lab-tested research sources',
  ],
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: POST_TITLE,
    description: POST_DESC,
    url: CANONICAL,
    type: 'article',
    images: [{ url: 'https://peptidex.app/images/blog/fda_peptide_patients_providers.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: POST_TITLE,
    description: 'The most significant regulatory shift in peptide therapy in over a decade — what patients and providers need to know.',
    images: ['https://peptidex.app/images/blog/fda_peptide_patients_providers.png'],
  },
};

/* ─── SCHEMA ──────────────────────────────────────────────────────── */

const blogSchema = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: POST_TITLE,
  description: POST_DESC,
  author: { '@type': 'Organization', name: 'PeptideX Research', url: 'https://peptidex.app' },
  publisher: {
    '@type': 'Organization',
    name: 'PeptideX',
    logo: { '@type': 'ImageObject', url: 'https://peptidex.app/favicon.ico' },
  },
  image: 'https://peptidex.app/images/blog/fda_peptide_patients_providers.png',
  datePublished: `${DATE_PUB}T12:00:00Z`,
  dateModified: `${DATE_MOD}T12:00:00Z`,
  mainEntityOfPage: { '@type': 'WebPage', '@id': CANONICAL },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://peptidex.app/' },
    { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://peptidex.app/blog' },
    { '@type': 'ListItem', position: 3, name: 'FDA Peptide Reclassification 2026', item: CANONICAL },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What does FDA Category 1 vs Category 2 mean for peptides?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Category 1 compounds can be legally prepared by licensed compounding pharmacies with a valid physician prescription. Category 2 compounds are flagged for safety concerns and cannot be legally compounded, effectively cutting off patient access through regulated channels.',
      },
    },
    {
      '@type': 'Question',
      name: 'Which 14 peptides are returning to Category 1 in 2026?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The 14 peptides expected to return include BPC-157, TB-500, CJC-1295, Ipamorelin, AOD-9604, Semax, Selank, GHK-Cu, MOTS-c, KPV, Epitalon, DSIP, GHRP-2, GHRP-6, Kisspeptin-10, Melanotan II, and PEG-MGF.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does reclassification mean these peptides are FDA-approved?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. Category 1 status means these peptides can be compounded legally under a physician\'s prescription. They are still considered off-label therapeutics and have not gone through Phase III clinical trials required for formal FDA drug approval.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are gray-market research peptides safe after the reclassification?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The reclassification applies to compounding pharmacies, not unregulated online vendors. Products sold as "research use only" continue to carry risks related to contamination, mislabeling, and inaccurate dosing regardless of any regulatory changes.',
      },
    },
    {
      '@type': 'Question',
      name: 'What should I do if I want to start peptide therapy in 2026?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Talk to a qualified physician who understands peptide protocols, wait for legal compounding to formally resume, get baseline labs, and stay informed as official FDA guidance is published.',
      },
    },
  ],
};

/* ─── PEPTIDE DATA ─────────────────────────────────────────────────── */

const PEPTIDES = [
  { name: 'BPC-157', desc: 'Tissue repair, gut healing, anti-inflammatory properties', icon: '🧬' },
  { name: 'TB-500 (Thymosin Beta-4)', desc: 'Cell migration, wound healing, muscle recovery', icon: '🩹' },
  { name: 'CJC-1295', desc: 'Growth hormone-releasing hormone analog supporting natural GH production', icon: '📈' },
  { name: 'Ipamorelin', desc: 'Selective growth hormone secretagogue with minimal cortisol effects', icon: '🎯' },
  { name: 'AOD-9604', desc: 'Studied for fat metabolism', icon: '🔥' },
  { name: 'Semax', desc: 'Nootropic peptide associated with cognitive function and BDNF enhancement', icon: '🧠' },
  { name: 'Selank', desc: 'Studied for anxiolytic and stress-resilience properties', icon: '🛡\uFE0F' },
  { name: 'GHK-Cu', desc: 'Copper peptide studied for skin repair and collagen stimulation', icon: '✨' },
  { name: 'MOTS-c', desc: 'Mitochondrial-derived peptide linked to metabolic regulation', icon: '⚡' },
  { name: 'KPV', desc: 'Anti-inflammatory peptide fragment', icon: '💊' },
  { name: 'Epitalon', desc: 'Telomerase-activating tetrapeptide for longevity', icon: '🕰\uFE0F' },
  { name: 'DSIP', desc: 'Delta sleep-inducing peptide', icon: '😴' },
  { name: 'GHRP-2 & GHRP-6', desc: 'Growth hormone-releasing peptides', icon: '💪' },
  { name: 'Kisspeptin-10', desc: 'Hormonal signaling and reproductive health', icon: '🔬' },
  { name: 'Melanotan II', desc: 'Melanocortin receptor agonist', icon: '☀\uFE0F' },
  { name: 'PEG-MGF', desc: 'Pegylated mechano growth factor', icon: '🏋\uFE0F' },
];

const TIMELINE = [
  { date: 'Late 2023\u20132024', text: 'The FDA expands its restricted (Category 2) list, moving 19 widely used peptides out of legal compounding availability.' },
  { date: '2024\u20132025', text: 'With licensed pharmacies unable to compound these peptides, patients turn to unregulated gray-market vendors selling products labeled "for research use only." These lack verified purity, accurate dosing, and sterile manufacturing.' },
  { date: 'Feb 27, 2026', text: 'HHS Secretary Robert F. Kennedy Jr. announces that 14 of the 19 previously restricted peptides will be moved back to Category 1 status.' },
  { date: 'April 2026', text: 'The FDA has not yet published the formally updated Category 1 list. The announcement signals the direction of policy, but formal implementation is still in process.' },
];

const ROADMAP = [
  { step: '1', title: 'Talk to a qualified physician', desc: 'Find a provider who understands peptide protocols, dosing, and monitoring.' },
  { step: '2', title: 'Wait for legal compounding', desc: 'Source from regulated pharmacies rather than unregulated online vendors.' },
  { step: '3', title: 'Get baseline labs', desc: 'So your provider can design an individualized protocol and track progress.' },
  { step: '4', title: 'Stay informed', desc: 'The regulatory landscape is still evolving — stay current on official FDA guidance.' },
];

/* ─── COMPONENT ────────────────────────────────────────────────────── */

export default function FDAReclassificationPatientsArticle() {
  return (
    <main id="main-content">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Breadcrumbs */}
      
      <header className="page-header">
        <div className="page-header-grid" />
        <div className="page-header-wrap">
          <nav className="breadcrumb">
            <Link href="/">Home</Link>
            <span className="sep">/</span>
            <Link href="/blog">Blog</Link>
            <span className="sep">/</span>
            <span className="current">The 2026 FDA Peptide Reclassification: What It Means for Patients, Providers, and the Future of Peptide Therapy</span>
          </nav>
          <div className="section-label">§ Blog Article</div>
          <h1 className="page-title">
            The 2026 FDA Peptide Reclassification:<br /><em>What It Means for Patients, Providers, and the Future of Peptide Therapy</em>.
          </h1>
          <p className="page-subtitle">
            A comprehensive analysis of the 2026 FDA peptide reclassification — which 14 peptides are returning to Category 1, what it means for patients and providers, and how to navigate peptide therapy safely.
          </p>
          <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-zinc-400">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-amber-400" />
              <Link href={`/about/peptidex-editorial`} className="font-semibold text-zinc-200 hover:text-amber-400 transition-colors">PeptideX Editorial</Link>
            </div>
            <div className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-zinc-500" />
              <span>2026-04-13</span>
            </div>
            <div className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-emerald-500" />
              <span className="text-emerald-400 font-medium">9 Min Read</span>
            </div>
          </div>
        </div>
      </header>

      <div className="about-content reveal space-y-16">


      {/* ═══════ MAIN CONTENT ═══════ */}
      <AutoLink>
      <article className="lg:col-span-8 lg:order-1 prose prose-invert prose-zinc max-w-none prose-h2:text-2xl prose-h2:text-zinc-100 prose-h2:font-bold prose-h2:mb-6 prose-h3:text-xl prose-h3:text-zinc-300 prose-p:text-zinc-400 prose-p:leading-relaxed prose-a:text-amber-400 prose-a:no-underline hover:prose-a:underline hover:prose-a:text-amber-300 prose-strong:text-zinc-200 prose-ul:text-zinc-400 prose-li:marker:text-amber-500 prose-blockquote:border-l-2 prose-blockquote:border-amber-400 prose-blockquote:bg-amber-950/10 prose-blockquote:p-4 prose-blockquote:rounded-r-xl prose-blockquote:text-zinc-300">

        {/* ═══════ LEAD ═══════ */}
        <p className="lead text-xl text-zinc-300 font-medium">
          The peptide therapy landscape just experienced its most significant regulatory shift in over a decade &mdash; and if you&apos;ve been following the conversation around compounds like BPC-157, TB-500, or CJC-1295, this is a development you need to understand.
        </p>

        <p>
          On February 27, 2026, HHS Secretary Robert F. Kennedy Jr. announced that <strong>14 of the 19 peptides</strong> previously restricted under the FDA&apos;s Category 2 list would be moved back to Category 1 status. In practical terms, this means licensed compounding pharmacies can once again prepare these peptides with a valid physician&apos;s prescription &mdash; restoring a regulated pathway that disappeared almost overnight when the FDA expanded its restricted list in late 2023 and 2024.
        </p>

        <p>
          For millions of patients and the clinicians who treat them, this reversal has been a long time coming.
        </p>

        {/* ═══════ CATEGORY EXPLAINER ═══════ */}
        <div className="section-label mt-12 mb-2">§ 01</div>
          <h2 id="understanding-categories">Understanding FDA Category 1 vs. Category 2</h2>

        <p>
          Before diving into what changed, it helps to understand the regulatory framework at play. The FDA classifies bulk drug substances used by compounding pharmacies into two categories under <strong>Section 503A of the Federal Food, Drug, and Cosmetic Act</strong>.
        </p>

        <div className="lg:col-span-8 lg:order-1 prose prose-invert prose-zinc max-w-none prose-h2:text-2xl prose-h2:text-zinc-100 prose-h2:font-bold prose-h2:mb-6 prose-h3:text-xl prose-h3:text-zinc-300 prose-p:text-zinc-400 prose-p:leading-relaxed prose-a:text-amber-400 prose-a:no-underline hover:prose-a:underline hover:prose-a:text-amber-300 prose-strong:text-zinc-200 prose-ul:text-zinc-400 prose-li:marker:text-amber-500 prose-blockquote:border-l-2 prose-blockquote:border-amber-400 prose-blockquote:bg-amber-950/10 prose-blockquote:p-4 prose-blockquote:rounded-r-xl prose-blockquote:text-zinc-300">
          <div className="flex items-start gap-3">
            <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest bg-emerald-500/20 text-emerald-400 rounded border border-emerald-500/30 flex-shrink-0 mt-1">Category 1</span>
            <p className="text-sm text-zinc-300 leading-relaxed">Compounds deemed to have sufficient safety data for use by licensed compounding pharmacies when prescribed by a physician. These can be prepared on an individual-patient basis with proper oversight.</p>
          </div>
          <div className="flex items-start gap-3">
            <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest bg-rose-500/20 text-rose-400 rounded border border-rose-500/30 flex-shrink-0 mt-1">Category 2</span>
            <p className="text-sm text-zinc-300 leading-relaxed">Compounds flagged for significant safety concerns. While on this list, compounding pharmacies <strong>cannot legally prepare them</strong>, effectively cutting off patient access through regulated channels.</p>
          </div>
        </div>

        <p>
          When the FDA moved 19 widely used peptides to Category 2 in 2023 and 2024, it pulled some of the most clinically popular compounds out of the legitimate healthcare pipeline. Patients who had been receiving physician-supervised peptide therapy suddenly lost access to the compounds they relied on.
        </p>

        {/* ═══════ WHAT HAPPENED NEXT ═══════ */}
        <div className="section-label mt-12 mb-2">§ 02</div>
          <h2 id="what-happened-next">What Happened Next Was Predictable &mdash; and Problematic</h2>

        <p>
          With licensed pharmacies unable to compound these peptides, many patients turned to <strong>unregulated gray-market vendors</strong> selling products labeled &ldquo;for research use only.&rdquo; These products lack verified purity, accurate dosing, and sterile manufacturing standards. The very restrictions intended to protect patient safety inadvertently pushed people toward riskier sourcing.
        </p>

        <p>
          The 2026 reclassification aims to correct that trajectory. By restoring Category 1 status to these 14 peptides, the government is reopening a regulated channel &mdash; one that comes with pharmaceutical-grade quality controls, proper dosing oversight, and the involvement of a licensed physician.
        </p>

        {/* ═══════ TIMELINE ═══════ */}
        <div className="lg:col-span-8 lg:order-1 prose prose-invert prose-zinc max-w-none prose-h2:text-2xl prose-h2:text-zinc-100 prose-h2:font-bold prose-h2:mb-6 prose-h3:text-xl prose-h3:text-zinc-300 prose-p:text-zinc-400 prose-p:leading-relaxed prose-a:text-amber-400 prose-a:no-underline hover:prose-a:underline hover:prose-a:text-amber-300 prose-strong:text-zinc-200 prose-ul:text-zinc-400 prose-li:marker:text-amber-500 prose-blockquote:border-l-2 prose-blockquote:border-amber-400 prose-blockquote:bg-amber-950/10 prose-blockquote:p-4 prose-blockquote:rounded-r-xl prose-blockquote:text-zinc-300">
          {TIMELINE.map((item, i) => (
            <div key={i} className="relative">
              <div className="absolute -left-[25px] top-1.5 w-3 h-3 rounded-full bg-rose-500 border-2 border-zinc-950 ring-4 ring-zinc-950" />
              <div className="text-[11px] font-bold uppercase tracking-widest text-rose-400 mb-2">{item.date}</div>
              <p className="text-sm text-zinc-400 leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>

        {/* ═══════ WHICH PEPTIDES ═══════ */}
        <div className="section-label mt-12 mb-2">§ 03</div>
          <h2 id="which-peptides">Which Peptides Are Coming Back?</h2>

        <p>
          The 14 peptides expected to return to Category 1 include some of the most recognized names in regenerative and functional medicine. This represents the <strong>broadest expansion of legal peptide access</strong> since compounding pharmacies first started producing these compounds.
        </p>

        {/* ═══════ PEPTIDE GRID ═══════ */}
        <div className="lg:col-span-8 lg:order-1 prose prose-invert prose-zinc max-w-none prose-h2:text-2xl prose-h2:text-zinc-100 prose-h2:font-bold prose-h2:mb-6 prose-h3:text-xl prose-h3:text-zinc-300 prose-p:text-zinc-400 prose-p:leading-relaxed prose-a:text-amber-400 prose-a:no-underline hover:prose-a:underline hover:prose-a:text-amber-300 prose-strong:text-zinc-200 prose-ul:text-zinc-400 prose-li:marker:text-amber-500 prose-blockquote:border-l-2 prose-blockquote:border-amber-400 prose-blockquote:bg-amber-950/10 prose-blockquote:p-4 prose-blockquote:rounded-r-xl prose-blockquote:text-zinc-300">
          {PEPTIDES.map((p) => (
            <div key={p.name} className="bg-zinc-900/40 border border-zinc-800 rounded-xl p-4 hover:border-rose-500/30 transition-colors group">
              <h4 className="text-sm font-bold text-zinc-100 mb-1 group-hover:text-rose-400 transition-colors flex items-center gap-2">
                <span className="text-base">{p.icon}</span> {p.name}
              </h4>
              <p className="text-xs text-zinc-500 leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>

        {/* ═══════ IMPORTANT CAVEATS ═══════ */}
        <div className="section-label mt-12 mb-2">§ 04</div>
          <h2 id="important-caveats">Important Caveats to Keep in Mind</h2>

        <p>While the announcement is significant, there are critical distinctions every patient and provider must understand.</p>

        <div className="lg:col-span-8 lg:order-1 prose prose-invert prose-zinc max-w-none prose-h2:text-2xl prose-h2:text-zinc-100 prose-h2:font-bold prose-h2:mb-6 prose-h3:text-xl prose-h3:text-zinc-300 prose-p:text-zinc-400 prose-p:leading-relaxed prose-a:text-amber-400 prose-a:no-underline hover:prose-a:underline hover:prose-a:text-amber-300 prose-strong:text-zinc-200 prose-ul:text-zinc-400 prose-li:marker:text-amber-500 prose-blockquote:border-l-2 prose-blockquote:border-amber-400 prose-blockquote:bg-amber-950/10 prose-blockquote:p-4 prose-blockquote:rounded-r-xl prose-blockquote:text-zinc-300">
          <div className="flex items-start gap-4 bg-zinc-900/40 border border-zinc-800 rounded-xl p-5">
            <AlertTriangle className="w-6 h-6 text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-bold text-zinc-100 mb-1">Reclassification ≠ FDA Approval</h4>
              <p className="text-sm text-zinc-400 leading-relaxed">Category 1 status means these peptides can be compounded legally under a physician&apos;s prescription. They are still considered <strong className="text-zinc-200">off-label therapeutics</strong>. They have not gone through the large-scale Phase III clinical trials required for formal FDA drug approval.</p>
            </div>
          </div>
          <div className="flex items-start gap-4 bg-zinc-900/40 border border-zinc-800 rounded-xl p-5">
            <Clock className="w-6 h-6 text-blue-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-bold text-zinc-100 mb-1">Formal Rule Change Still Pending</h4>
              <p className="text-sm text-zinc-400 leading-relaxed">As of April 2026, the FDA has <strong className="text-zinc-200">not yet published</strong> its updated Category 1 list. The announcement signals the direction of policy, but formal implementation is still in process.</p>
            </div>
          </div>
          <div className="flex items-start gap-4 bg-zinc-900/40 border border-zinc-800 rounded-xl p-5">
            <Stethoscope className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-bold text-zinc-100 mb-1">Physician Oversight Remains Essential</h4>
              <p className="text-sm text-zinc-400 leading-relaxed">Even with restored access, these are <strong className="text-zinc-200">not over-the-counter supplements</strong>. They require a valid prescription from a licensed healthcare provider, individualized dosing, and ongoing monitoring.</p>
            </div>
          </div>
          <div className="flex items-start gap-4 bg-zinc-900/40 border border-zinc-800 rounded-xl p-5">
            <Shield className="w-6 h-6 text-rose-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-bold text-zinc-100 mb-1">Gray-Market Products Remain Risky</h4>
              <p className="text-sm text-zinc-400 leading-relaxed">The reclassification applies to <strong className="text-zinc-200">compounding pharmacies, not unregulated online vendors</strong>. Products sold as &ldquo;research use only&rdquo; continue to carry risks related to contamination, mislabeling, and inaccurate dosing.</p>
            </div>
          </div>
        </div>

        {/* ═══════ WHY THIS MATTERS ═══════ */}
        <div className="section-label mt-12 mb-2">§ 05</div>
          <h2 id="future-of-peptide-therapy">Why This Matters for the Future of Peptide Therapy</h2>

        <p>
          The 2026 reclassification reflects a broader shift in how the medical community and regulatory agencies view peptide therapy. Interest in peptides has surged dramatically over the past several years, driven in part by the success of <strong>GLP-1 medications like semaglutide and tirzepatide</strong>. As those compounds brought peptide science into the mainstream conversation, patients and providers began exploring the wider world of peptide-based therapies for recovery, immune support, cognitive function, and longevity.
        </p>

        <p>
          The demand is real. The science, while still developing for many of these compounds, is increasingly supported by preclinical data and clinical observation. And the regulatory environment is beginning to catch up with the reality that physician-supervised peptide therapy occupies a <strong>legitimate space in modern medicine</strong>.
        </p>

        <p>
          For patients, the key takeaway is simple: work with a licensed provider, source from regulated pharmacies, and stay informed as the formal reclassification process unfolds. The pathway to safe, legal peptide therapy is reopening &mdash; and that benefits everyone.
        </p>

        {/* ═══════ CTA EMBED ═══════ */}
        <div className="lg:col-span-8 lg:order-1 prose prose-invert prose-zinc max-w-none prose-h2:text-2xl prose-h2:text-zinc-100 prose-h2:font-bold prose-h2:mb-6 prose-h3:text-xl prose-h3:text-zinc-300 prose-p:text-zinc-400 prose-p:leading-relaxed prose-a:text-amber-400 prose-a:no-underline hover:prose-a:underline hover:prose-a:text-amber-300 prose-strong:text-zinc-200 prose-ul:text-zinc-400 prose-li:marker:text-amber-500 prose-blockquote:border-l-2 prose-blockquote:border-amber-400 prose-blockquote:bg-amber-950/10 prose-blockquote:p-4 prose-blockquote:rounded-r-xl prose-blockquote:text-zinc-300">
          <div className="absolute top-0 right-0 w-32 h-32 bg-violet-500/10 blur-[50px] rounded-full pointer-events-none transition-all group-hover:bg-violet-500/20" />
          <h4 className="text-xl font-bold text-zinc-100 mb-2 flex flex-wrap items-center gap-2">
            <AlertCircle className="w-5 h-5 text-violet-400" /> Looking for verified peptide sources?
          </h4>
          <p className="text-sm text-zinc-300 mb-6 max-w-lg leading-relaxed">
            We aggregate and review the top peptide synthesis labs based strictly on independent HPLC mass spectrometry, pricing, and fulfillment speed.
          </p>
          <Link
            href="/vendors"
            rel="nofollow noopener sponsored"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold transition-all shadow-lg hover:shadow-violet-500/25"
          >
            Compare Trusted Vendors <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        {/* ═══════ WHAT SHOULD YOU DO ═══════ */}
        <div className="section-label mt-12 mb-2">§ 06</div>
          <h2 id="what-to-do">What Should You Do Right Now?</h2>

        <p>
          If you&apos;ve been interested in peptide therapy or were previously using one of the reclassified compounds, here&apos;s a practical roadmap:
        </p>

        {/* ═══════ ROADMAP ═══════ */}
        <div className="lg:col-span-8 lg:order-1 prose prose-invert prose-zinc max-w-none prose-h2:text-2xl prose-h2:text-zinc-100 prose-h2:font-bold prose-h2:mb-6 prose-h3:text-xl prose-h3:text-zinc-300 prose-p:text-zinc-400 prose-p:leading-relaxed prose-a:text-amber-400 prose-a:no-underline hover:prose-a:underline hover:prose-a:text-amber-300 prose-strong:text-zinc-200 prose-ul:text-zinc-400 prose-li:marker:text-amber-500 prose-blockquote:border-l-2 prose-blockquote:border-amber-400 prose-blockquote:bg-amber-950/10 prose-blockquote:p-4 prose-blockquote:rounded-r-xl prose-blockquote:text-zinc-300">
          {ROADMAP.map((item) => (
            <div key={item.step} className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-5 flex gap-4 items-start">
              <div className="w-10 h-10 rounded-xl bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-rose-400 font-extrabold text-lg flex-shrink-0">
                {item.step}
              </div>
              <div>
                <h4 className="text-sm font-bold text-zinc-100 mb-1">{item.title}</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <p>
          The peptide therapy conversation in 2026 is louder than ever. With the right approach, it can also be <strong>safer and more effective than ever</strong>.
        </p>

      </article>
      </AutoLink>

      {/* ═══════ LIBRARY CALLOUT ═══════ */}
      <LibraryCallout currentSlug={SLUG} peptides={[
        { name: 'BPC-157', slug: 'bpc-157' },
        { name: 'TB-500', slug: 'tb-500' },
        { name: 'CJC-1295', slug: 'cjc-1295' },
        { name: 'GHK-Cu', slug: 'ghk-cu' },
      ]} />

      {/* ═══════ CITE ═══════ */}
      <div className="mb-12">
        <CiteThisPage title={POST_TITLE} url={`https://peptidex.app/blog/${SLUG}`} />
      </div>

      {/* ═══════ FAQ SECTION ═══════ */}
      <section className="border-t border-zinc-800 pt-12 mt-12 pb-8">
        <h2 className="text-2xl font-bold text-zinc-100 text-center mb-8">Frequently Asked Questions</h2>
        <div className="max-w-3xl mx-auto space-y-4">
          {faqSchema.mainEntity.map((q, idx) => (
            <div key={idx} className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-md font-bold text-zinc-200 mb-3">{q.name}</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">{q.acceptedAnswer.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════ FOOTER ELEMENTS ═══════ */}
      <ShareBar title={POST_TITLE} url={`https://peptidex.app/blog/${SLUG}`} />
      <BlogVendorCallout />
      <AuthorBio name={AUTHOR} />

      {/* Fact-checked date + Feedback */}
      <div className="flex items-center justify-between pt-6 border-t border-zinc-800/50 text-xs text-zinc-600">
        <span>Last fact-checked: <time dateTime="2026-04-13">2026-04-13</time></span>
        <FeedbackModal pageUrl="https://peptidex.app/blog/fda-peptide-reclassification-patients-providers" />
      </div>

      {/* ═══════ DISCLAIMER ═══════ */}
      

      {/* ═══════ RELATED TOPICS ═══════ */}
      <div className="flex flex-wrap gap-2 pt-4">
        {['peptide therapy 2026', 'FDA peptide reclassification', 'BPC-157 legal status', 'peptide compounding', 'growth hormone peptides', 'peptide regulation', 'Category 1 peptides', 'TB-500', 'CJC-1295', 'Ipamorelin'].map(tag => (
          <span key={tag} className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider bg-zinc-800/60 text-zinc-400 rounded-full border border-zinc-700/50">
            {tag}
          </span>
        ))}
      </div>
          </div>
      <div className="disclaimer-strip">
        ⚠ Educational only · Not medical advice · Most peptides are research-only / not FDA-approved
      </div>
    </main>
  );
}
