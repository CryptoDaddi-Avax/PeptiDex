import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { AutoLink } from '@/components/auto-link';
import Link from 'next/link';
import { Calendar, User, ShieldAlert, BookOpen, AlertCircle, ArrowRight } from 'lucide-react';
import { AuthorBio } from '@/components/author-bio';
import { SHORT_DISCLAIMER } from '@/data/constants';
import { LibraryCallout } from '@/components/library-callout';

const POST_TITLE = 'CJC-1295 vs Sermorelin: GHRH Analog Comparison';
const POST_DESC = 'A research-backed comparison of CJC-1295 and Sermorelin — two GHRH analogs used for growth hormone optimization. Covers mechanisms, DAC vs no-DAC, half-life differences, dosing protocols, and clinical outcomes.';
const AUTHOR = 'PeptideX Editorial';
const DATE_PUB = '2026-04-12';
const DATE_MOD = '2026-04-12';

export const metadata: Metadata = {
  title: `${POST_TITLE} | PeptiDex Research Blog`,
  description: POST_DESC,
  keywords: 'CJC-1295 vs sermorelin, GHRH analog comparison, CJC-1295 DAC, sermorelin dosing, growth hormone releasing hormone, GH optimization peptides',
  alternates: { canonical: 'https://peptidex.app/blog/cjc-1295-vs-sermorelin' },
};

export default function CJCVsSermorelin() {
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
      { '@type': 'Question', name: 'What is the difference between CJC-1295 and Sermorelin?', acceptedAnswer: { '@type': 'Answer', text: 'Both are synthetic GHRH analogs that stimulate the pituitary gland to release growth hormone. The key difference is half-life: Sermorelin has a very short half-life of 10-20 minutes, requiring daily or twice-daily injections. CJC-1295 (especially with DAC) has a half-life of 6-8 days, enabling once- or twice-weekly dosing. CJC-1295 also produces more sustained IGF-1 elevation, while Sermorelin produces more physiological, pulsatile GH release.' } },
      { '@type': 'Question', name: 'What is CJC-1295 with DAC vs without DAC?', acceptedAnswer: { '@type': 'Answer', text: 'DAC stands for Drug Affinity Complex — a modification that allows CJC-1295 to bind to serum albumin, dramatically extending its half-life from ~30 minutes (without DAC, also called Modified GRF 1-29) to 6-8 days (with DAC). CJC-1295 with DAC provides sustained GH elevation, while CJC-1295 without DAC (Mod GRF 1-29) provides shorter GH pulses more similar to Sermorelin.' } },
      { '@type': 'Question', name: 'Is Sermorelin FDA-approved?', acceptedAnswer: { '@type': 'Answer', text: 'Sermorelin was FDA-approved in 1997 under the brand name Geref for diagnosing and treating growth hormone deficiency in children. While the branded product was discontinued in 2008 for commercial reasons, sermorelin remains available through compounding pharmacies for off-label clinical use and is one of the most well-characterized GHRH analogs in clinical practice.' } },
      { '@type': 'Question', name: 'Can you combine CJC-1295 and Sermorelin?', acceptedAnswer: { '@type': 'Answer', text: 'This combination is generally not recommended as both compounds target the same GHRH receptor on the pituitary. Using both simultaneously would provide redundant stimulation without meaningful synergistic benefit. Instead, either compound is typically paired with a GHRP (like Ipamorelin) for complementary GH release through the ghrelin pathway.' } },
      { '@type': 'Question', name: 'Which is better for anti-aging: CJC-1295 or Sermorelin?', acceptedAnswer: { '@type': 'Answer', text: 'For anti-aging and longevity protocols, Sermorelin is often preferred by clinicians due to its more physiological GH release pattern (mimicking natural pulsatility) and its longer clinical safety track record. CJC-1295 with DAC is preferred when dosing convenience is important. Both effectively raise IGF-1 to age-appropriate levels when dosed correctly.' } },
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
          <div className="flex items-center gap-2"><User className="w-4 h-4 text-violet-400" /><span className="font-semibold text-zinc-200">{AUTHOR}</span></div>
          <div className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
          <div className="flex items-center gap-2"><Calendar className="w-4 h-4 text-zinc-500" /><span>Updated: {DATE_MOD}</span></div>
          <div className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
          <div className="flex items-center gap-2"><BookOpen className="w-4 h-4 text-emerald-500" /><span className="text-emerald-400 font-medium">9 Min Read</span></div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <aside className="lg:col-span-4 lg:order-2">
          <div className="sticky top-24 rounded-2xl bg-zinc-900/40 border border-zinc-800 p-6 space-y-4 shadow-xl">
            <h3 className="font-bold text-zinc-100 uppercase tracking-widest text-xs">Table of Contents</h3>
            <ul className="space-y-3 text-sm font-medium text-zinc-400">
              <li><a href="#intro" className="hover:text-violet-400 transition-colors block">1. GHRH Analogs Explained</a></li>
              <li><a href="#sermorelin" className="hover:text-violet-400 transition-colors block">2. Sermorelin Deep Dive</a></li>
              <li><a href="#cjc" className="hover:text-violet-400 transition-colors block">3. CJC-1295: DAC vs No-DAC</a></li>
              <li><a href="#comparison" className="hover:text-violet-400 transition-colors block">4. Head-to-Head Table</a></li>
              <li><a href="#stacking" className="hover:text-violet-400 transition-colors block">5. Optimal Stacking</a></li>
              <li><a href="#verdict" className="hover:text-violet-400 transition-colors block">6. Research Verdict</a></li>
            </ul>
          </div>
          <div className="mt-8">
            <h3 className="font-bold text-zinc-100 mb-4 text-sm uppercase tracking-widest">Related Profiles</h3>
            <div className="space-y-3">
              <Link href="/library/cjc-1295" className="flex items-center justify-between p-3 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-violet-500/50 transition-colors group"><span className="font-semibold text-zinc-200 group-hover:text-violet-400">CJC-1295</span><ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-violet-400 group-hover:translate-x-1 transition-transform" /></Link>
              <Link href="/library/sermorelin" className="flex items-center justify-between p-3 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-violet-500/50 transition-colors group"><span className="font-semibold text-zinc-200 group-hover:text-violet-400">Sermorelin</span><ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-violet-400 group-hover:translate-x-1 transition-transform" /></Link>
              <Link href="/library/ipamorelin" className="flex items-center justify-between p-3 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-violet-500/50 transition-colors group"><span className="font-semibold text-zinc-200 group-hover:text-violet-400">Ipamorelin</span><ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-violet-400 group-hover:translate-x-1 transition-transform" /></Link>
            </div>
          </div>
        </aside>

        <AutoLink>
        <main className="lg:col-span-8 lg:order-1 prose prose-invert prose-zinc max-w-none prose-h2:text-2xl prose-h2:mt-12 prose-h3:text-lg prose-a:text-violet-400 hover:prose-a:text-violet-300">
          <p className="lead text-xl text-zinc-300 font-medium" id="intro">
            <strong>CJC-1295</strong> and <strong>Sermorelin</strong> are both synthetic analogs of growth hormone-releasing hormone (GHRH), the hypothalamic hormone that tells the pituitary gland to produce and release GH. But they differ dramatically in half-life, dosing frequency, and the nature of the GH release they produce.
          </p>
          <p>Understanding these differences is essential for researchers and clinicians selecting the appropriate GHRH analog for specific protocols — whether the goal is anti-aging optimization, body composition improvement, or recovery support.</p>

          <h2 id="sermorelin">Sermorelin: The Pioneer GHRH Analog</h2>
          <p>
            <Link href="/library/sermorelin">Sermorelin</Link> (GRF 1-29 NH₂) is a 29-amino acid synthetic peptide corresponding to the first 29 amino acids of the 44-amino acid native GHRH molecule. It was FDA-approved in 1997 under the brand name Geref for diagnosing and treating pediatric growth hormone deficiency.¹
          </p>
          <p>
            Sermorelin binds to the GHRH receptor on pituitary somatotroph cells, stimulating transcription, synthesis, and pulsatile release of endogenous GH. Its half-life is extremely short — approximately 10-20 minutes — meaning its effects are brief, pulsatile, and highly physiological.
          </p>
          <p>
            Clinical data from the original registration trials showed that sermorelin: increased growth velocity in GH-deficient children, elevated IGF-1 levels to age-appropriate ranges, and maintained normal pituitary-hypothalamic feedback mechanisms (unlike exogenous GH which suppresses them).¹
          </p>
          <p>
            In adult clinical practice, sermorelin is commonly prescribed by anti-aging and integrative medicine practitioners at doses of 200-300 mcg subcutaneously before bed, leveraging the natural nocturnal GH surge.
          </p>

          <h2 id="cjc">CJC-1295: The Engineered Upgrade</h2>
          <p>
            <Link href="/library/cjc-1295">CJC-1295</Link> is a 30-amino acid synthetic GHRH analog that exists in two forms:
          </p>
          <h3 className="flex items-center gap-2 text-violet-300 border-b border-zinc-800 pb-2">CJC-1295 without DAC (Mod GRF 1-29)</h3>
          <p>
            Also known as Modified GRF 1-29, this version has four amino acid substitutions that improve metabolic stability compared to sermorelin, extending half-life to approximately 30 minutes. It produces GH pulses similar to sermorelin but with slightly greater amplitude and duration. It is typically dosed 2-3 times daily or before bed.
          </p>
          <h3 className="flex items-center gap-2 text-emerald-300 border-b border-zinc-800 pb-2">CJC-1295 with DAC</h3>
          <p>
            The Drug Affinity Complex (DAC) modification adds a reactive chemical group that allows CJC-1295 to covalently bond with serum albumin after injection. This dramatically extends the functional half-life to approximately 6-8 days, producing sustained GH and IGF-1 elevation with once-weekly dosing.²
          </p>
          <p>
            A pivotal clinical study by Teichman et al. demonstrated that a single subcutaneous injection of CJC-1295 with DAC produced sustained IGF-1 elevation lasting 6-14 days, with peak IGF-1 increase of 1.5-3x baseline. Multiple doses raised mean IGF-1 by 2x with no evidence of tachyphylaxis.²
          </p>

          <h2 id="comparison">Head-to-Head Comparison</h2>
          <div className="overflow-x-auto my-8">
            <table className="w-full text-left text-sm border-collapse">
              <thead className="bg-zinc-900 border border-zinc-700 text-zinc-300">
                <tr>
                  <th className="px-4 py-3 font-semibold border-b border-zinc-700">Feature</th>
                  <th className="px-4 py-3 font-semibold border-b border-zinc-700">Sermorelin</th>
                  <th className="px-4 py-3 font-semibold border-b border-zinc-700">CJC-1295 (no DAC)</th>
                  <th className="px-4 py-3 font-semibold border-b border-zinc-700">CJC-1295 (with DAC)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                <tr><td className="px-4 py-3 border border-zinc-800 font-bold">Half-Life</td><td className="px-4 py-3 border border-zinc-800">10-20 min</td><td className="px-4 py-3 border border-zinc-800">~30 min</td><td className="px-4 py-3 border border-zinc-800 text-emerald-400">6-8 days</td></tr>
                <tr><td className="px-4 py-3 border border-zinc-800 font-bold">Dosing Frequency</td><td className="px-4 py-3 border border-zinc-800">Daily (before bed)</td><td className="px-4 py-3 border border-zinc-800">2-3x daily or nightly</td><td className="px-4 py-3 border border-zinc-800 text-emerald-400">1-2x weekly</td></tr>
                <tr><td className="px-4 py-3 border border-zinc-800 font-bold">GH Pattern</td><td className="px-4 py-3 border border-zinc-800 text-emerald-400">Pulsatile (most physiological)</td><td className="px-4 py-3 border border-zinc-800 text-emerald-400">Pulsatile</td><td className="px-4 py-3 border border-zinc-800">Sustained/tonic</td></tr>
                <tr><td className="px-4 py-3 border border-zinc-800 font-bold">IGF-1 Elevation</td><td className="px-4 py-3 border border-zinc-800">Moderate</td><td className="px-4 py-3 border border-zinc-800">Moderate-High</td><td className="px-4 py-3 border border-zinc-800 text-emerald-400">High (sustained)</td></tr>
                <tr><td className="px-4 py-3 border border-zinc-800 font-bold">FDA History</td><td className="px-4 py-3 border border-zinc-800 text-emerald-400">Approved (1997)</td><td className="px-4 py-3 border border-zinc-800">Investigational</td><td className="px-4 py-3 border border-zinc-800">Investigational</td></tr>
                <tr><td className="px-4 py-3 border border-zinc-800 font-bold">Clinical Data</td><td className="px-4 py-3 border border-zinc-800 text-emerald-400">Extensive</td><td className="px-4 py-3 border border-zinc-800">Moderate</td><td className="px-4 py-3 border border-zinc-800">Moderate</td></tr>
              </tbody>
            </table>
          </div>

          <h2 id="stacking">Optimal Stacking</h2>
          <p>
            Both sermorelin and CJC-1295 are optimally paired with <Link href="/library/ipamorelin">Ipamorelin</Link> — a selective GHRP that triggers GH release via the complementary ghrelin pathway. This GHRH + GHRP combination produces synergistic GH amplification (3-6x greater pulses) through a dual-pathway mechanism.³
          </p>
          <p>
            <strong>Sermorelin + Ipamorelin:</strong> Best for physiological pulsatile GH release, anti-aging protocols, and long-term use where natural GH patterns are prioritized.
          </p>
          <p>
            <strong>CJC-1295 (w/DAC) + Ipamorelin:</strong> Best for sustained IGF-1 elevation, body composition goals, and protocols where dosing convenience is important.
          </p>

          <h2 id="verdict">Research Verdict</h2>
          <p>
            <strong>For anti-aging and longevity:</strong> Sermorelin&apos;s shorter half-life and physiological pulsatile release pattern more closely mimic natural GH secretion, which many clinicians prefer for long-term health optimization.
          </p>
          <p>
            <strong>For body composition and performance:</strong> CJC-1295 with DAC provides stronger, more sustained GH/IGF-1 elevation with greater convenience and compliance due to weekly dosing.
          </p>
          <p>Both are well-tolerated with comparable side effect profiles (mild water retention, occasional headache, transient fatigue).</p>

          <hr className="border-zinc-800 my-10" />
          <h2 className="text-xl">Sources</h2>
          <ol className="text-sm text-zinc-400 space-y-3 marker:text-zinc-600">
            <li>Walker, R.F. &quot;Sermorelin: A better approach to management of adult-onset growth hormone insufficiency?&quot; <em>Clinical Interventions in Aging</em>, 2006; 1(4): 307-308.</li>
            <li>Teichman, S.L., et al. &quot;Prolonged Stimulation of Growth Hormone and Insulin-Like Growth Factor I Secretion by CJC-1295.&quot; <em>JCEM</em>, 2006; 91(3): 799-805.</li>
            <li>Raun, K., et al. &quot;Ipamorelin, the first selective growth hormone secretagogue.&quot; <em>European Journal of Endocrinology</em>, 1998; 139(5): 552-561.</li>
          </ol>
        </main>
        </AutoLink>
      </div>

      <LibraryCallout currentSlug="cjc-1295-vs-sermorelin" peptides={[{"name":"CJC-1295","slug":"cjc-1295"},{"name":"Sermorelin","slug":"sermorelin"},{"name":"Ipamorelin","slug":"ipamorelin"}]} />

      <section className="border-t border-zinc-800 pt-12 mt-12 pb-8">
        <h2 className="text-2xl font-bold text-zinc-100 text-center mb-8">Frequently Asked Questions</h2>
        <div className="max-w-3xl mx-auto space-y-4">
          {faqSchema.mainEntity.map((q, idx) => (<div key={idx} className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6"><h3 className="text-md font-bold text-zinc-200 mb-3">{q.name}</h3><p className="text-zinc-400 text-sm leading-relaxed">{q.acceptedAnswer.text}</p></div>))}
        </div>
      </section>
      <AuthorBio name={AUTHOR} />
      <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-6 text-center mt-8"><p className="text-xs text-zinc-500 leading-relaxed">This article is for educational and research purposes only. Consult a healthcare provider before using any peptide compound. PeptiDex does not sell peptides.</p></div>
    </div>
  );
}
