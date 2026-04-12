import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { AutoLink } from '@/components/auto-link';
import Link from 'next/link';
import { Calendar, User, ShieldAlert, BookOpen, AlertCircle, ArrowRight } from 'lucide-react';
import { AuthorBio } from '@/components/author-bio';
import { SHORT_DISCLAIMER } from '@/data/constants';
import { LibraryCallout } from '@/components/library-callout';
import { getAuthorSlug } from '@/data/authors';
import { BlogVendorCallout } from '@/components/blog-vendor-callout';

const POST_TITLE = 'MOTS-c: The Mitochondrial Peptide for Energy & Metabolism';
const POST_DESC = 'A deep dive into MOTS-c — the mitochondrial-derived peptide that mimics exercise, activates AMPK, and shows remarkable potential for metabolic regulation, longevity, and age-related disease prevention.';
const AUTHOR = 'PeptideX Editorial';
const DATE_PUB = '2026-04-12';
const DATE_MOD = '2026-04-12';

export const metadata: Metadata = {
  title: `${POST_TITLE} | PeptiDex Research Blog`,
  description: POST_DESC,
  keywords: 'MOTS-c peptide, mitochondrial peptide, MOTS-c exercise mimetic, AMPK activation, MOTS-c metabolism, MOTS-c longevity, mitochondria-derived peptide',
  alternates: { canonical: 'https://peptidex.app/blog/mots-c-mitochondrial-peptide' },
};

export default function MOTSCDeepDivePage() {
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
      { '@type': 'Question', name: 'What is MOTS-c?', acceptedAnswer: { '@type': 'Answer', text: 'MOTS-c (Mitochondrial Open Reading Frame of the Twelve S rRNA Type-c) is a 16-amino acid peptide encoded within the mitochondrial genome — making it one of only a handful of known mitochondrial-derived peptides (MDPs). It functions as a metabolic regulator that targets skeletal muscle, activating AMPK and enhancing glucose uptake, fatty acid oxidation, and overall energy metabolism.' } },
      { '@type': 'Question', name: 'How does MOTS-c mimic exercise?', acceptedAnswer: { '@type': 'Answer', text: 'MOTS-c activates AMPK (AMP-activated protein kinase), the same master metabolic sensor activated during physical exercise. AMPK activation triggers glucose uptake in skeletal muscle, fatty acid oxidation, mitochondrial biogenesis, and insulin sensitization — metabolic effects that closely mirror the benefits of endurance exercise at the molecular level.' } },
      { '@type': 'Question', name: 'Does MOTS-c help with weight loss?', acceptedAnswer: { '@type': 'Answer', text: 'In animal studies, MOTS-c has prevented diet-induced obesity and insulin resistance in mice fed a high-fat diet. It promotes fat oxidation (converting stored fat into energy) rather than fat storage. While these results are promising, large-scale controlled human trials for weight loss have not yet been completed.' } },
      { '@type': 'Question', name: 'What are the side effects of MOTS-c?', acceptedAnswer: { '@type': 'Answer', text: 'Published research has reported minimal adverse effects from MOTS-c administration. The first-in-human clinical trial (2024) demonstrated safety and tolerability at multiple dose levels in healthy volunteers. Potential side effects based on mechanism may include transient hypoglycemia (due to enhanced glucose uptake) and mild GI discomfort.' } },
      { '@type': 'Question', name: 'Is MOTS-c the same as SS-31 (Elamipretide)?', acceptedAnswer: { '@type': 'Answer', text: 'No. Both target mitochondrial function but through different mechanisms. MOTS-c is an endogenous mitochondrial-derived peptide that activates AMPK in skeletal muscle. SS-31 (Elamipretide) is a synthetic tetrapeptide that targets cardiolipin in the inner mitochondrial membrane to stabilize electron transport chain function and reduce oxidative stress. They are complementary but distinct compounds.' } },
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
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <aside className="lg:col-span-4 lg:order-2">
          <div className="sticky top-24 rounded-2xl bg-zinc-900/40 border border-zinc-800 p-6 space-y-4 shadow-xl">
            <h3 className="font-bold text-zinc-100 uppercase tracking-widest text-xs">Table of Contents</h3>
            <ul className="space-y-3 text-sm font-medium text-zinc-400">
              <li><a href="#intro" className="hover:text-violet-400 transition-colors block">1. From the Mitochondria</a></li>
              <li><a href="#mechanism" className="hover:text-violet-400 transition-colors block">2. Mechanism of Action</a></li>
              <li><a href="#exercise" className="hover:text-violet-400 transition-colors block">3. The Exercise Mimetic</a></li>
              <li><a href="#aging" className="hover:text-violet-400 transition-colors block">4. MOTS-c and Aging</a></li>
              <li><a href="#clinical" className="hover:text-violet-400 transition-colors block">5. Human Clinical Data</a></li>
              <li><a href="#vs-ss31" className="hover:text-violet-400 transition-colors block">6. MOTS-c vs SS-31</a></li>
            </ul>
          </div>
          <div className="mt-8">
            <h3 className="font-bold text-zinc-100 mb-4 text-sm uppercase tracking-widest">Related Profiles</h3>
            <div className="space-y-3">
              <Link href="/library/mots-c" className="flex items-center justify-between p-3 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-violet-500/50 transition-colors group"><span className="font-semibold text-zinc-200 group-hover:text-violet-400">MOTS-c</span><ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-violet-400 group-hover:translate-x-1 transition-transform" /></Link>
              <Link href="/library/ss-31" className="flex items-center justify-between p-3 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-violet-500/50 transition-colors group"><span className="font-semibold text-zinc-200 group-hover:text-violet-400">SS-31 (Elamipretide)</span><ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-violet-400 group-hover:translate-x-1 transition-transform" /></Link>
              <Link href="/library/aod-9604" className="flex items-center justify-between p-3 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-violet-500/50 transition-colors group"><span className="font-semibold text-zinc-200 group-hover:text-violet-400">AOD-9604</span><ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-violet-400 group-hover:translate-x-1 transition-transform" /></Link>
            </div>
          </div>
        </aside>

        <AutoLink>
        <main className="lg:col-span-8 lg:order-1 prose prose-invert prose-zinc max-w-none prose-h2:text-2xl prose-h2:mt-12 prose-h3:text-lg prose-a:text-violet-400 hover:prose-a:text-violet-300">
          <p className="lead text-xl text-zinc-300 font-medium" id="intro">
            Your mitochondria don&apos;t just produce energy. They also produce signaling peptides — and <strong>MOTS-c</strong> may be the most consequential one discovered to date.
          </p>
          <p>
            First identified in 2015 by Dr. Changhan David Lee&apos;s lab at the University of Southern California, <Link href="/library/mots-c">MOTS-c</Link> is a 16-amino acid peptide encoded within the mitochondrial 12S rRNA gene. Unlike virtually all other peptides in the body (which are encoded by nuclear DNA), MOTS-c originates from the mitochondrial genome — making it part of a small but rapidly growing class of molecules called mitochondrial-derived peptides (MDPs).¹
          </p>
          <p className="p-4 bg-violet-900/10 border border-violet-500/20 rounded-xl my-6 text-zinc-300">
            For researchers sourcing these compounds, <a href="https://aminoclub.com?utm_source=affiliate_marketing&code=PEPTIDEX" target="_blank" rel="noopener noreferrer" className="font-semibold text-violet-400 hover:underline">Amino Club provides COA-verified peptides with documented purity testing. Browse peptides &rarr;</a>
          </p>

          <p>
            What makes MOTS-c remarkable is its role as a metabolic regulator that effectively <strong>mimics the molecular benefits of exercise</strong>. In an era where metabolic disease is the leading driver of chronic illness worldwide, a naturally occurring compound that mimics exercise at the cellular level has captured the attention of researchers across endocrinology, gerontology, and sports science.
          </p>

          <h2 id="mechanism">Mechanism of Action: Targeting AMPK</h2>
          <p>
            MOTS-c&apos;s primary target is <strong>AMPK (AMP-activated protein kinase)</strong> — widely described as the master metabolic sensor of the cell. AMPK is activated when cellular energy levels drop (i.e., when the AMP:ATP ratio increases), which naturally occurs during exercise.¹
          </p>
          <p>When MOTS-c activates AMPK in skeletal muscle, it triggers a cascade of metabolic effects:</p>
          <ul>
            <li><strong>Enhanced glucose uptake:</strong> Skeletal muscle cells pull glucose from the bloodstream independently of insulin, improving blood sugar regulation</li>
            <li><strong>Increased fatty acid oxidation:</strong> Stored fat is mobilized and converted to energy in the mitochondria</li>
            <li><strong>Mitochondrial biogenesis:</strong> New mitochondria are produced, increasing the cell&apos;s total energy production capacity</li>
            <li><strong>Insulin sensitization:</strong> AMPK activation improves downstream insulin signaling, reversing insulin resistance</li>
            <li><strong>Inhibition of the folate cycle:</strong> MOTS-c accumulates in the nucleus during stress and directly regulates gene expression related to the methionine-folate cycle, influencing cellular stress resistance²</li>
          </ul>
          <p>
            This AMPK-centric mechanism places MOTS-c in the same pharmacological category as metformin (the most widely prescribed diabetes drug in the world) and AICAR (a research compound used to study exercise mimicry) — but as an endogenous peptide rather than a synthetic small molecule.
          </p>

          <h2 id="exercise">The Exercise Mimetic: What the Animal Data Shows</h2>
          <p>
            The most striking preclinical finding came from Dr. Lee&apos;s original 2015 paper in <em>Cell Metabolism</em>: mice administered MOTS-c and fed a high-fat diet completely avoided diet-induced obesity and insulin resistance — effects indistinguishable from regular exercise in control groups.¹
          </p>
          <p>
            Subsequent studies expanded these findings:
          </p>
          <ul>
            <li>MOTS-c improved exercise capacity and endurance in aged mice, restoring physical performance to near-youthful levels³</li>
            <li>MOTS-c administration protected against age-related metabolic decline, preserving skeletal muscle function and insulin sensitivity in older animals⁴</li>
            <li>Endogenous MOTS-c levels increase in skeletal muscle following exercise in both mice and humans, suggesting it functions as an endogenous exercise-response signal⁵</li>
          </ul>
          <p>
            The implication is powerful: MOTS-c may represent one of the molecular mechanisms through which exercise produces its metabolic benefits. And if that mechanism can be amplified exogenously, it could have profound applications for patients who cannot exercise due to injury, disability, or severe metabolic disease.
          </p>

          <h2 id="aging">MOTS-c and Aging</h2>
          <p>
            Circulating MOTS-c levels decline with age.⁴ This decline corroborates the broader observation that mitochondrial function deteriorates as organisms age — and raises the question of whether MOTS-c supplementation could counteract age-related metabolic decline.
          </p>
          <p>
            In aged mice (equivalent to ~65-year-old humans), MOTS-c treatment:
          </p>
          <ul>
            <li>Improved insulin sensitivity and glucose tolerance to near-youthful levels</li>
            <li>Increased physical endurance capacity</li>
            <li>Reduced age-related inflammation markers</li>
            <li>Preserved skeletal muscle mass and function (potentially combating sarcopenia)³ ⁴</li>
          </ul>
          <p>
            These findings position MOTS-c alongside other longevity peptides like <Link href="/library/epitalon">Epitalon</Link> and <Link href="/library/ghk-cu">GHK-Cu</Link> — but with a distinct focus on metabolic aging rather than telomere or gene expression dynamics.
          </p>

          <h2 id="clinical">Human Clinical Data</h2>
          <p>
            In 2024, the first-in-human clinical trial of MOTS-c was published, marking a significant milestone for mitochondrial-derived peptide (MDP) research.⁶ The Phase 1 dose-escalation study evaluated safety and pharmacokinetics of subcutaneous MOTS-c administration in healthy volunteers at multiple dose levels.
          </p>
          <p>
            Key findings:
          </p>
          <ul>
            <li><strong>Safety:</strong> MOTS-c was well-tolerated with no dose-limiting toxicities or serious adverse events</li>
            <li><strong>Pharmacokinetics:</strong> Dose-proportional increases in plasma MOTS-c levels were confirmed</li>
            <li><strong>Metabolic signals:</strong> Preliminary metabolic biomarker data showed trends consistent with AMPK activation, though the trial was not powered for efficacy</li>
          </ul>
          <p>
            While this represents early-stage evidence, the clean safety profile supports advancement to Phase 2 efficacy trials targeting metabolic syndrome, type 2 diabetes, and age-related metabolic decline.
          </p>

          <h2 id="vs-ss31">MOTS-c vs SS-31: Two Mitochondrial Strategies</h2>
          <p>
            Both MOTS-c and <Link href="/library/ss-31">SS-31 (Elamipretide)</Link> target mitochondrial function, but through entirely different mechanisms:
          </p>
          <div className="overflow-x-auto my-8">
            <table className="w-full text-left text-sm border-collapse">
              <thead className="bg-zinc-900 border border-zinc-700 text-zinc-300">
                <tr>
                  <th className="px-4 py-3 font-semibold border-b border-zinc-700">Feature</th>
                  <th className="px-4 py-3 font-semibold border-b border-zinc-700">MOTS-c</th>
                  <th className="px-4 py-3 font-semibold border-b border-zinc-700">SS-31 (Elamipretide)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                <tr><td className="px-4 py-3 border border-zinc-800 font-bold">Origin</td><td className="px-4 py-3 border border-zinc-800">Endogenous (mitochondrial genome)</td><td className="px-4 py-3 border border-zinc-800">Synthetic tetrapeptide</td></tr>
                <tr><td className="px-4 py-3 border border-zinc-800 font-bold">Primary Target</td><td className="px-4 py-3 border border-zinc-800">AMPK in skeletal muscle</td><td className="px-4 py-3 border border-zinc-800">Cardiolipin in inner mitochondrial membrane</td></tr>
                <tr><td className="px-4 py-3 border border-zinc-800 font-bold">Primary Effect</td><td className="px-4 py-3 border border-zinc-800">Metabolic regulation, exercise mimicry</td><td className="px-4 py-3 border border-zinc-800">ETC stabilization, ROS reduction</td></tr>
                <tr><td className="px-4 py-3 border border-zinc-800 font-bold">Key Application</td><td className="px-4 py-3 border border-zinc-800">Metabolic disease, obesity, aging</td><td className="px-4 py-3 border border-zinc-800">Mitochondrial myopathies, heart failure, aging</td></tr>
                <tr><td className="px-4 py-3 border border-zinc-800 font-bold">Clinical Stage</td><td className="px-4 py-3 border border-zinc-800">Phase 1 completed</td><td className="px-4 py-3 border border-zinc-800">Phase 3 (multiple indications)</td></tr>
              </tbody>
            </table>
          </div>
          <p>These compounds are complementary rather than competitive — MOTS-c optimizes metabolic output while SS-31 preserves mitochondrial structural integrity. Some researchers are exploring combination protocols.</p>

          <hr className="border-zinc-800 my-10" />
          <h2 className="text-xl">Sources</h2>
          <ol className="text-sm text-zinc-400 space-y-3 marker:text-zinc-600">
            <li>Lee, C., et al. &quot;The mitochondrial-derived peptide MOTS-c promotes metabolic homeostasis and reduces obesity and insulin resistance.&quot; <em>Cell Metabolism</em>, 2015; 21(3): 443-454.</li>
            <li>Kim, K.H., et al. &quot;MOTS-c: An equal opportunity insulin sensitizer.&quot; <em>Journal of Molecular Medicine</em>, 2023.</li>
            <li>Reynolds, J.C., et al. &quot;MOTS-c is an exercise-induced mitochondrial-encoded regulator of age-dependent physical decline and muscle homeostasis.&quot; <em>Nature Communications</em>, 2021; 12: 470.</li>
            <li>D&apos;Souza, R.F., et al. &quot;Circulatory MOTS-c is decreased with advancing age and exercise.&quot; <em>Aging Cell</em>, 2020; 19(6): e13150.</li>
            <li>von Walden, F., et al. &quot;MOTS-c increases following acute and chronic exercise in humans.&quot; <em>Cell Reports Medicine</em>, 2024.</li>
            <li>Lee, C.D., et al. &quot;First-in-Human Phase 1 Study of the Mitochondrial-Derived Peptide MOTS-c.&quot; <em>Nature Medicine</em>, 2024.</li>
          </ol>
        </main>
        </AutoLink>
      </div>

      <LibraryCallout currentSlug="mots-c-mitochondrial-peptide" peptides={[{"name":"MOTS-c","slug":"mots-c"},{"name":"SS-31","slug":"ss-31"},{"name":"Epitalon","slug":"epitalon"}]} />

      <section className="border-t border-zinc-800 pt-12 mt-12 pb-8">
        <h2 className="text-2xl font-bold text-zinc-100 text-center mb-8">Frequently Asked Questions</h2>
        <div className="max-w-3xl mx-auto space-y-4">
          {faqSchema.mainEntity.map((q, idx) => (<div key={idx} className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6"><h3 className="text-md font-bold text-zinc-200 mb-3">{q.name}</h3><p className="text-zinc-400 text-sm leading-relaxed">{q.acceptedAnswer.text}</p></div>))}
        </div>
      </section>
      <BlogVendorCallout />
      <AuthorBio name={AUTHOR} />
      <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-6 text-center mt-8"><p className="text-xs text-zinc-500 leading-relaxed">This article is for educational and research purposes only. MOTS-c is investigational and not FDA-approved. PeptiDex does not sell peptides. Consult a healthcare provider.</p></div>
    </div>
  );
}
