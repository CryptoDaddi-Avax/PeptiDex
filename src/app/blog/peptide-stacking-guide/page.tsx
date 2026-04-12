import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { AutoLink } from '@/components/auto-link';
import Link from 'next/link';
import { Calendar, User, ShieldAlert, BookOpen, AlertCircle, ArrowRight } from 'lucide-react';
import { ShareBar } from '@/components/share-bar';
import { CiteThisPage } from '@/components/cite-page';
import { AuthorBio } from '@/components/author-bio';
import { SHORT_DISCLAIMER } from '@/data/constants';
import { LibraryCallout } from '@/components/library-callout';
import { getAuthorSlug } from '@/data/authors';
import { BlogVendorCallout } from '@/components/blog-vendor-callout';

const POST_TITLE = 'Peptide Stacking 101: How to Combine Peptides Safely';
const POST_DESC = 'A research-backed guide to peptide stacking — covering principles of safe combination, popular stacks for recovery, body composition, and longevity, timing protocols, and contraindications.';
const AUTHOR = 'PeptideX Editorial';
const DATE_PUB = '2026-04-12';
const DATE_MOD = '2026-04-12';

export const metadata: Metadata = {
  title: `${POST_TITLE} | PeptiDex Research Blog`,
  description: POST_DESC,
  keywords: 'peptide stacking, how to stack peptides, peptide combinations, BPC-157 TB-500 stack, CJC-1295 ipamorelin stack, peptide timing, peptide contraindications',
  alternates: { canonical: 'https://peptidex.app/blog/peptide-stacking-guide' },
  openGraph: {
    title: `${POST_TITLE} | PeptiDex Research`,
    description: POST_DESC,
    url: 'https://peptidex.app/blog/peptide-stacking-guide',
    type: 'article',
    images: [{
      url: `https://peptidex.app/api/og?type=blog&title=${encodeURIComponent(POST_TITLE)}`,
      width: 1200,
      height: 630,
      alt: POST_TITLE,
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${POST_TITLE} | PeptiDex Research`,
    description: POST_DESC,
  },
};

export default function PeptideStackingGuidePage() {
  const articleSchema = {
    '@context': 'https://schema.org', '@type': 'Article', headline: POST_TITLE, description: POST_DESC,
    image: 'https://peptidex.app/og-image.png',
    author: { '@type': 'Organization', name: AUTHOR },
    publisher: { '@type': 'Organization', name: 'PeptiDex', logo: { '@type': 'ImageObject', url: 'https://peptidex.app/logo.png' } },
    datePublished: DATE_PUB, dateModified: DATE_MOD,
  };

  const faqSchema = {
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: 'What is peptide stacking?', acceptedAnswer: { '@type': 'Answer', text: 'Peptide stacking is the practice of using two or more peptide compounds simultaneously or in sequence to achieve synergistic effects. The principle is that peptides operating through complementary mechanisms can produce combined outcomes greater than either compound alone. For example, stacking a GHRH analog (CJC-1295) with a GHRP (Ipamorelin) amplifies growth hormone release through two distinct pituitary pathways.' } },
      { '@type': 'Question', name: 'What is the most popular peptide stack?', acceptedAnswer: { '@type': 'Answer', text: 'The CJC-1295 + Ipamorelin stack is widely regarded as the gold standard for growth hormone optimization. For tissue recovery, the BPC-157 + TB-500 stack is the most commonly researched. For metabolic and body composition goals, combinations of GLP-1 agonists with GH secretagogues are gaining traction in clinical settings.' } },
      { '@type': 'Question', name: 'Can you mix peptides in the same syringe?', acceptedAnswer: { '@type': 'Answer', text: 'Some peptides can be mixed in the same syringe (e.g., CJC-1295 and Ipamorelin are commonly co-administered). However, this should only be done when there is no known chemical incompatibility between the peptides. Different pH requirements, aggregation risks, or chelation effects (especially with metal-binding peptides like GHK-Cu) can degrade one or both compounds. When in doubt, administer separately.' } },
      { '@type': 'Question', name: 'How long should a peptide stack cycle last?', acceptedAnswer: { '@type': 'Answer', text: 'Cycle length depends on the compounds used. GH secretagogue stacks (CJC-1295 + Ipamorelin) are typically run for 12-16 weeks followed by a 4-8 week break. Tissue repair stacks (BPC-157 + TB-500) are often used for 4-8 weeks targeting a specific injury. Metabolic peptides (GLP-1 agonists) may be used continuously under medical supervision. Always include bloodwork monitoring.' } },
      { '@type': 'Question', name: 'What peptides should NOT be stacked together?', acceptedAnswer: { '@type': 'Answer', text: 'Avoid stacking peptides that target the same receptor redundantly without additive benefit — such as two different GHRPs (e.g., Ipamorelin + GHRP-6) or two GLP-1 agonists (semaglutide + tirzepatide). Also avoid combining IGF-1 LR3 with growth-promoting compounds in individuals with any history of malignancy. Copper-binding peptides (GHK-Cu) should not be mixed in the same syringe with peptides that may chelate or degrade in the presence of metal ions.' } },
    ],
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-12 relative space-y-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Breadcrumbs items={[{ name: 'Home', url: 'https://peptidex.app/' }, { name: 'Blog', url: 'https://peptidex.app/blog' }, { name: POST_TITLE }]} />
      <div className="rounded-xl bg-amber-950/25 border border-amber-500/20 p-4"><div className="flex items-start gap-2"><ShieldAlert className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" /><p className="text-sm text-amber-400/80 leading-relaxed font-medium"><strong>RESEARCH USE ONLY:</strong> {SHORT_DISCLAIMER}</p></div></div>

      <header className="space-y-6">
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-zinc-100 leading-tight">{POST_TITLE}</h1>
        <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-400 border-t border-b border-zinc-800/50 py-4">
          <div className="flex items-center gap-2"><User className="w-4 h-4 text-violet-400" /><Link href={`/about/${getAuthorSlug(AUTHOR)}`} className="font-semibold text-zinc-200 hover:text-violet-400 transition-colors">{AUTHOR}</Link></div>
          <div className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
          <div className="flex items-center gap-2"><Calendar className="w-4 h-4 text-zinc-500" /><span>Updated: {DATE_MOD}</span></div>
          <div className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
          <div className="flex items-center gap-2"><BookOpen className="w-4 h-4 text-emerald-500" /><span className="text-emerald-400 font-medium">10 Min Read</span></div>
        </div>
        <ShareBar title={POST_TITLE} url={`https://peptidex.app/blog/peptide-stacking-guide`} />
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <aside className="lg:col-span-4 lg:order-2">
          <div className="sticky top-24 rounded-2xl bg-zinc-900/40 border border-zinc-800 p-6 space-y-4 shadow-xl">
            <h3 className="font-bold text-zinc-100 uppercase tracking-widest text-xs">Table of Contents</h3>
            <ul className="space-y-3 text-sm font-medium text-zinc-400">
              <li><a href="#intro" className="hover:text-violet-400 transition-colors block">1. Why Stack Peptides?</a></li>
              <li><a href="#principles" className="hover:text-violet-400 transition-colors block">2. Core Stacking Principles</a></li>
              <li><a href="#recovery" className="hover:text-violet-400 transition-colors block">3. Recovery Stack</a></li>
              <li><a href="#gh" className="hover:text-violet-400 transition-colors block">4. GH Optimization Stack</a></li>
              <li><a href="#metabolic" className="hover:text-violet-400 transition-colors block">5. Metabolic Stack</a></li>
              <li><a href="#longevity" className="hover:text-violet-400 transition-colors block">6. Longevity Stack</a></li>
              <li><a href="#contraindications" className="hover:text-violet-400 transition-colors block">7. Contraindications</a></li>
            </ul>
          </div>
        </aside>

        <AutoLink>
        <main className="lg:col-span-8 lg:order-1 prose prose-invert prose-zinc max-w-none prose-h2:text-2xl prose-h2:mt-12 prose-h3:text-lg prose-a:text-violet-400 hover:prose-a:text-violet-300">
          <p className="lead text-xl text-zinc-300 font-medium" id="intro">
            The idea behind <strong>peptide stacking</strong> is simple: peptides that work through different biological mechanisms can produce synergistic effects when combined. But the execution requires understanding receptor pharmacology, timing, compatibility, and risk management.
          </p>
          <p>This guide covers the core principles, the four most popular stack categories, timing protocols, and critical contraindications every researcher should know.</p>

          <h2 id="principles">Core Stacking Principles</h2>
          <p>Effective peptide stacking follows three rules:</p>
          <ol>
            <li><strong>Complementary pathways:</strong> Stack compounds that activate different receptor systems. A GHRH (like <Link href="/library/cjc-1295">CJC-1295</Link>) paired with a GHRP (like <Link href="/library/ipamorelin">Ipamorelin</Link>) produces synergistic GH release because they stimulate the pituitary through two independent mechanisms — amplifying GH output 3-6x beyond either compound alone.¹</li>
            <li><strong>Non-redundant mechanisms:</strong> Avoid stacking two compounds that target the same receptor identically. Two GHRPs (e.g., Ipamorelin + GHRP-6) compete for the same binding site, producing diminishing returns with additive side effects.</li>
            <li><strong>Risk-aware titration:</strong> Start each compound at its lowest effective dose before combining. Never introduce multiple new peptides simultaneously — always baseline one before adding another.</li>
          </ol>

          <h2 id="recovery">Stack 1: Injury Recovery</h2>
          <div className="rounded-xl bg-zinc-900/60 border border-zinc-800 p-5 my-6">
            <h4 className="font-bold text-emerald-400 mb-2">BPC-157 + TB-500</h4>
            <p className="text-sm text-zinc-300 mb-3">The most widely researched tissue repair combination.</p>
            <ul className="text-sm text-zinc-400 space-y-1">
              <li><strong><Link href="/library/bpc-157">BPC-157</Link>:</strong> Promotes angiogenesis (new blood vessel formation) and localized tendon/ligament repair via VEGFR2 upregulation</li>
              <li><strong><Link href="/library/tb-500">TB-500</Link>:</strong> Upregulates actin to facilitate systemic cell migration and broad inflammation reduction</li>
              <li><strong>Synergy:</strong> TB-500 mobilizes repair cells systemically; BPC-157 builds the vascular infrastructure to deliver them precisely to the injury site</li>
              <li><strong>Duration:</strong> 4-8 weeks targeting the specific injury</li>
            </ul>
          </div>

          <h2 id="gh">Stack 2: Growth Hormone Optimization</h2>
          <div className="rounded-xl bg-zinc-900/60 border border-zinc-800 p-5 my-6">
            <h4 className="font-bold text-violet-400 mb-2">CJC-1295 + Ipamorelin</h4>
            <p className="text-sm text-zinc-300 mb-3">The gold standard GH peptide stack.</p>
            <ul className="text-sm text-zinc-400 space-y-1">
              <li><strong>CJC-1295 (GHRH):</strong> Primes the pituitary to produce GH and sustains the release window</li>
              <li><strong>Ipamorelin (GHRP):</strong> Triggers clean, pulsatile GH release without cortisol/prolactin elevation</li>
              <li><strong>Timing:</strong> Best administered together before bed to amplify the natural nocturnal GH surge</li>
              <li><strong>Duration:</strong> 12-16 weeks, followed by 4-8 week break</li>
              <li><strong>Monitoring:</strong> IGF-1 levels, fasting glucose, insulin at baseline and 8 weeks</li>
            </ul>
          </div>

          <h2 id="metabolic">Stack 3: Metabolic / Body Composition</h2>
          <div className="rounded-xl bg-zinc-900/60 border border-zinc-800 p-5 my-6">
            <h4 className="font-bold text-amber-400 mb-2">GLP-1 Agonist + MOTS-c + AOD-9604</h4>
            <p className="text-sm text-zinc-300 mb-3">Multi-pathway metabolic optimization.</p>
            <ul className="text-sm text-zinc-400 space-y-1">
              <li><strong><Link href="/library/semaglutide">Semaglutide</Link>:</strong> Appetite suppression and delayed gastric emptying via central GLP-1 receptor activation</li>
              <li><strong><Link href="/library/mots-c">MOTS-c</Link>:</strong> Activates AMPK in skeletal muscle, functioning as an exercise mimetic and enhancing fatty acid oxidation</li>
              <li><strong><Link href="/library/aod-9604">AOD-9604</Link>:</strong> Direct lipolysis stimulation and lipogenesis inhibition in adipose tissue without glycemic effects</li>
              <li><strong>Synergy:</strong> Three-pronged attack — reduce intake (GLP-1), burn stored fat (AOD-9604), increase metabolic output (MOTS-c)</li>
            </ul>
          </div>

          <h2 id="longevity">Stack 4: Longevity / Anti-Aging</h2>
          <div className="rounded-xl bg-zinc-900/60 border border-zinc-800 p-5 my-6">
            <h4 className="font-bold text-cyan-400 mb-2">GHK-Cu + Epitalon + Sermorelin</h4>
            <p className="text-sm text-zinc-300 mb-3">Targeting multiple hallmarks of aging.</p>
            <ul className="text-sm text-zinc-400 space-y-1">
              <li><strong><Link href="/library/ghk-cu">GHK-Cu</Link>:</strong> Modulates 4,000+ genes toward youthful expression patterns, stimulates collagen/elastin synthesis, reduces inflammatory cytokines</li>
              <li><strong><Link href="/library/epitalon">Epitalon</Link>:</strong> Stimulates telomerase activity, potentially extending telomere length and cellular lifespan</li>
              <li><strong><Link href="/library/sermorelin">Sermorelin</Link>:</strong> Physiological GH optimization restoring age-related GH decline without suppressing natural pituitary function</li>
              <li><strong>Duration:</strong> Cycled — e.g., 3 months on, 1 month off for Epitalon; Sermorelin and GHK-Cu used more continuously</li>
            </ul>
          </div>

          <div className="my-10 rounded-2xl bg-gradient-to-br from-violet-900/40 to-zinc-900 border border-violet-500/30 p-6 shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-violet-500/10 blur-[50px] rounded-full pointer-events-none" />
            <h4 className="text-xl font-bold text-zinc-100 mb-2 flex flex-wrap items-center gap-2"><AlertCircle className="w-5 h-5 text-violet-400" /> Explore Pre-Built Stacks</h4>
            <p className="text-sm text-zinc-300 mb-6 max-w-lg leading-relaxed">Browse our curated peptide stacks with full dosing protocols and mechanism breakdowns.</p>
            <Link href="/stacks" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold transition-all shadow-lg hover:shadow-violet-500/25">View Peptide Stacks <ArrowRight className="w-5 h-5" /></Link>
          </div>

          <h2 id="contraindications">Contraindications & Safety Rules</h2>
          <p className="p-4 bg-violet-900/10 border border-violet-500/20 rounded-xl my-6 text-zinc-300">
            For researchers sourcing these compounds, <a href="https://aminoclub.com?utm_source=affiliate_marketing&code=PEPTIDEX" target="_blank" rel="noopener noreferrer" className="font-semibold text-violet-400 hover:underline">Amino Club provides COA-verified peptides with documented purity testing. Browse peptides &rarr;</a>
          </p>

          <ul>
            <li><strong>Never stack two GLP-1 agonists</strong> (e.g., semaglutide + tirzepatide) — severe GI side effects and hypoglycemia risk</li>
            <li><strong>Avoid IGF-1 LR3 with any history of malignancy</strong> — supraphysiological growth factor levels may promote tumor growth</li>
            <li><strong>Do not mix GHK-Cu in the same syringe</strong> with other peptides — the copper ion can chelate and degrade adjacent peptide structures</li>
            <li><strong>Monitor blood glucose</strong> with any stack involving GH secretagogues + GLP-1 modulators — opposing insulin effects may produce unpredictable glycemic changes</li>
            <li><strong>Get baseline bloodwork</strong> (metabolic panel, IGF-1, lipid panel, CBC) before starting any multi-peptide protocol</li>
          </ul>

          <hr className="border-zinc-800 my-10" />
          <h2 className="text-xl">Sources</h2>
          <ol className="text-sm text-zinc-400 space-y-3 marker:text-zinc-600">
            <li>Teichman, S.L., et al. &quot;Prolonged Stimulation of GH and IGF-I Secretion by CJC-1295.&quot; <em>JCEM</em>, 2006; 91(3): 799-805.</li>
            <li>Sikiric, P., et al. &quot;Brain-gut Axis and Pentadecapeptide BPC 157.&quot; <em>Current Neuropharmacology</em>, 2016; 14(8): 857-865.</li>
            <li>Lee, C., et al. &quot;The mitochondrial-derived peptide MOTS-c promotes metabolic homeostasis.&quot; <em>Cell Metabolism</em>, 2015; 21(3): 443-454.</li>
          </ol>
        </main>
        </AutoLink>
      </div>

      <LibraryCallout currentSlug="peptide-stacking-guide" peptides={[{"name":"BPC-157","slug":"bpc-157"},{"name":"CJC-1295","slug":"cjc-1295"},{"name":"Ipamorelin","slug":"ipamorelin"}]} />

      {/* Citations */}
      <div className="mb-12">
        <CiteThisPage title={POST_TITLE} url={`https://peptidex.app/blog/peptide-stacking-guide`} />
      </div>

      <section className="border-t border-zinc-800 pt-12 mt-12 pb-8">
        <h2 className="text-2xl font-bold text-zinc-100 text-center mb-8">Frequently Asked Questions</h2>
        <div className="max-w-3xl mx-auto space-y-4">
          {faqSchema.mainEntity.map((q, idx) => (<div key={idx} className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6"><h3 className="text-md font-bold text-zinc-200 mb-3">{q.name}</h3><p className="text-zinc-400 text-sm leading-relaxed">{q.acceptedAnswer.text}</p></div>))}
        </div>
      </section>
      
      <ShareBar title={POST_TITLE} url={`https://peptidex.app/blog/peptide-stacking-guide`} />
      <BlogVendorCallout />
      <AuthorBio name={AUTHOR} />
      <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-6 text-center mt-8"><p className="text-xs text-zinc-500 leading-relaxed">This article is for educational and research purposes only. Peptide stacking should be done under the guidance of a qualified healthcare provider. PeptiDex does not sell peptides.</p></div>
    </div>
  );
}
