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

const POST_TITLE = 'MK-677 vs Ipamorelin: Which GH Secretagogue Is Better?';
const POST_DESC = 'A research-backed comparison of MK-677 (ibutamoren) vs ipamorelin — oral vs injectable GH secretagogues compared on mechanism, side effects, half-life, IGF-1 elevation, and stacking protocols.';
const AUTHOR = 'PeptideX Editorial';
const DATE_PUB = '2026-04-12';
const DATE_MOD = '2026-04-12';

export const metadata: Metadata = {
  title: `${POST_TITLE} | PeptiDex Research Blog`,
  description: POST_DESC,
  keywords: 'MK-677 vs ipamorelin, ibutamoren vs ipamorelin, best GH secretagogue, MK-677 results, ipamorelin side effects, oral vs injectable peptide, growth hormone peptide comparison',
  alternates: { canonical: 'https://peptidex.app/blog/mk-677-vs-ipamorelin' },
  openGraph: {
    title: `${POST_TITLE} | PeptiDex Research`,
    description: POST_DESC,
    url: 'https://peptidex.app/blog/mk-677-vs-ipamorelin',
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

export default function MK677VsIpamorelinPage() {
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
      { '@type': 'Question', name: 'Is MK-677 or ipamorelin better for growth hormone release?', acceptedAnswer: { '@type': 'Answer', text: 'Both effectively stimulate GH release via the ghrelin receptor (GHS-R1a), but they have different profiles. MK-677 provides stronger, more sustained GH elevation over 24 hours with oral dosing. Ipamorelin produces shorter, more physiological GH pulses with fewer off-target effects — no significant appetite stimulation, cortisol elevation, or prolactin increase. The "better" choice depends on your priorities: convenience (MK-677) or selectivity (ipamorelin).' } },
      { '@type': 'Question', name: 'Does MK-677 cause water retention?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. MK-677 commonly causes noticeable water retention, particularly in the first 2-4 weeks of use. This is a direct consequence of elevated GH and IGF-1 levels promoting sodium retention. The effect typically stabilizes but does not fully resolve with continued use. Ipamorelin causes significantly less water retention due to its shorter duration of action.' } },
      { '@type': 'Question', name: 'Can you stack MK-677 with ipamorelin?', acceptedAnswer: { '@type': 'Answer', text: 'While both target the same receptor, some research protocols do combine them. However, stacking two ghrelin-pathway agonists increases the risk of GH-related side effects (water retention, insulin resistance, joint stiffness) without necessarily producing proportional benefits. Most clinicians prefer combining ipamorelin with CJC-1295 (a GHRH analog) for synergistic GH release through complementary pathways.' } },
      { '@type': 'Question', name: 'Does MK-677 affect blood sugar?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Multiple clinical trials have shown that MK-677 can increase fasting blood glucose and reduce insulin sensitivity with chronic use. A 2-year trial in healthy elderly adults showed a small but statistically significant increase in fasting glucose. This makes MK-677 potentially problematic for individuals with pre-diabetes or metabolic syndrome. Ipamorelin does not appear to have the same glucose-disrupting effects.' } },
      { '@type': 'Question', name: 'How long should you cycle MK-677 or ipamorelin?', acceptedAnswer: { '@type': 'Answer', text: 'MK-677 is typically studied in cycles of 8-16 weeks followed by a 4-8 week break to monitor metabolic markers and allow insulin sensitivity to recover. Ipamorelin, due to its cleaner side effect profile, is sometimes used for longer durations (12-24 weeks) in clinical settings, often paired with CJC-1295. Bloodwork monitoring (IGF-1, fasting glucose, insulin) is essential with either compound.' } },
    ],
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-12 relative space-y-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <Breadcrumbs items={[{ name: 'Home', url: 'https://peptidex.app/' }, { name: 'Blog', url: 'https://peptidex.app/blog' }, { name: POST_TITLE }]} />

      <div className="rounded-xl bg-amber-950/25 border border-amber-500/20 p-4">
        <div className="flex items-start gap-2">
          <ShieldAlert className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-amber-400/80 leading-relaxed font-medium"><strong>RESEARCH USE ONLY:</strong> {SHORT_DISCLAIMER}</p>
        </div>
      </div>

      <header className="space-y-6">
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-zinc-100 leading-tight">{POST_TITLE}</h1>
        <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-400 border-t border-b border-zinc-800/50 py-4">
          <div className="flex items-center gap-2"><User className="w-4 h-4 text-violet-400" /><Link href={`/about/${getAuthorSlug(AUTHOR)}`} className="font-semibold text-zinc-200 hover:text-violet-400 transition-colors">{AUTHOR}</Link></div>
          <div className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
          <div className="flex items-center gap-2"><Calendar className="w-4 h-4 text-zinc-500" /><span>Updated: {DATE_MOD}</span></div>
          <div className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
          <div className="flex items-center gap-2"><BookOpen className="w-4 h-4 text-emerald-500" /><span className="text-emerald-400 font-medium">9 Min Read</span></div>
        </div>
        <ShareBar title={POST_TITLE} url={`https://peptidex.app/blog/mk-677-vs-ipamorelin`} />
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <aside className="lg:col-span-4 lg:order-2">
          <div className="sticky top-24 rounded-2xl bg-zinc-900/40 border border-zinc-800 p-6 space-y-4 shadow-xl">
            <h3 className="font-bold text-zinc-100 uppercase tracking-widest text-xs">Table of Contents</h3>
            <ul className="space-y-3 text-sm font-medium text-zinc-400">
              <li><a href="#intro" className="hover:text-violet-400 transition-colors block">1. Two Roads to Growth Hormone</a></li>
              <li><a href="#mechanism" className="hover:text-violet-400 transition-colors block">2. Mechanism Comparison</a></li>
              <li><a href="#side-effects" className="hover:text-violet-400 transition-colors block">3. Side Effect Profiles</a></li>
              <li><a href="#clinical-data" className="hover:text-violet-400 transition-colors block">4. Clinical Data</a></li>
              <li><a href="#stacking" className="hover:text-violet-400 transition-colors block">5. Stacking Protocols</a></li>
              <li><a href="#verdict" className="hover:text-violet-400 transition-colors block">6. Which Should You Research?</a></li>
            </ul>
          </div>
          <div className="mt-8">
            <h3 className="font-bold text-zinc-100 mb-4 text-sm uppercase tracking-widest">Related Profiles</h3>
            <div className="space-y-3">
              <Link href="/library/mk-677" className="flex items-center justify-between p-3 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-violet-500/50 transition-colors group"><span className="font-semibold text-zinc-200 group-hover:text-violet-400">MK-677</span><ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-violet-400 group-hover:translate-x-1 transition-transform" /></Link>
              <Link href="/library/ipamorelin" className="flex items-center justify-between p-3 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-violet-500/50 transition-colors group"><span className="font-semibold text-zinc-200 group-hover:text-violet-400">Ipamorelin</span><ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-violet-400 group-hover:translate-x-1 transition-transform" /></Link>
              <Link href="/library/cjc-1295" className="flex items-center justify-between p-3 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-violet-500/50 transition-colors group"><span className="font-semibold text-zinc-200 group-hover:text-violet-400">CJC-1295</span><ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-violet-400 group-hover:translate-x-1 transition-transform" /></Link>
            </div>
          </div>
        </aside>

        <AutoLink>
        <main className="lg:col-span-8 lg:order-1 prose prose-invert prose-zinc max-w-none prose-h2:text-2xl prose-h2:mt-12 prose-h3:text-lg prose-a:text-violet-400 hover:prose-a:text-violet-300">
          <p className="lead text-xl text-zinc-300 font-medium" id="intro">
            <strong>MK-677</strong> and <strong>ipamorelin</strong> both stimulate growth hormone release through the ghrelin receptor (GHS-R1a). But the similarities end there. One is an oral small molecule with 24-hour activity and significant metabolic side effects. The other is an injectable pentapeptide with precise, pulsatile GH release and a remarkably clean profile.
          </p>
          <p>This comparison provides a detailed, research-backed breakdown of how these two GH secretagogues differ in mechanism, clinical outcomes, side effects, and stacking compatibility.</p>
          <p className="p-4 bg-violet-900/10 border border-violet-500/20 rounded-xl my-6 text-zinc-300">
            For researchers sourcing these compounds, <a href="https://aminoclub.com?utm_source=affiliate_marketing&code=PEPTIDEX" target="_blank" rel="noopener noreferrer" className="font-semibold text-violet-400 hover:underline">Amino Club provides COA-verified peptides with documented purity testing. Browse peptides &rarr;</a>
          </p>


          <h2 id="mechanism">Mechanism Comparison</h2>
          <h3 className="flex items-center gap-2 text-violet-300 border-b border-zinc-800 pb-2">MK-677: Sustained Oral Agonism</h3>
          <p>
            <Link href="/library/mk-677">MK-677</Link> (ibutamoren mesylate) is a non-peptide ghrelin mimetic with an oral half-life of approximately 4-6 hours, but its GH-elevating effects persist for up to 24 hours after a single dose.¹ It produces sustained, tonic elevation of GH and IGF-1 rather than discrete physiological pulses.
          </p>
          <p>
            Because MK-677 fully agonizes the ghrelin receptor, it activates all downstream pathways associated with ghrelin — not just GH release. This includes potent appetite stimulation, cortisol modulation, and effects on gastric motility.
          </p>

          <h3 className="flex items-center gap-2 text-emerald-300 border-b border-zinc-800 pb-2">Ipamorelin: Selective Pulsatile Release</h3>
          <p>
            <Link href="/library/ipamorelin">Ipamorelin</Link> is a synthetic pentapeptide with a half-life of approximately 2 hours. It produces a sharp, physiological GH pulse that mimics the body&apos;s natural pulsatile secretion pattern.² Crucially, ipamorelin is the most selective GHRP available — at therapeutic doses, it does not significantly stimulate cortisol, prolactin, or appetite.
          </p>
          <p>
            This selectivity means ipamorelin produces &quot;cleaner&quot; GH elevation: you get the GH pulse without the metabolic noise.
          </p>

          <h2 id="side-effects">Side Effect Comparison</h2>
          <div className="overflow-x-auto my-8">
            <table className="w-full text-left text-sm border-collapse">
              <thead className="bg-zinc-900 border border-zinc-700 text-zinc-300">
                <tr>
                  <th className="px-4 py-3 font-semibold border-b border-zinc-700">Side Effect</th>
                  <th className="px-4 py-3 font-semibold border-b border-zinc-700">MK-677</th>
                  <th className="px-4 py-3 font-semibold border-b border-zinc-700">Ipamorelin</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                <tr><td className="px-4 py-3 border border-zinc-800 font-bold">Appetite Increase</td><td className="px-4 py-3 border border-zinc-800 text-red-400">Significant (~60%)</td><td className="px-4 py-3 border border-zinc-800 text-emerald-400">Minimal</td></tr>
                <tr><td className="px-4 py-3 border border-zinc-800 font-bold">Water Retention</td><td className="px-4 py-3 border border-zinc-800 text-amber-400">Moderate-High</td><td className="px-4 py-3 border border-zinc-800 text-emerald-400">Minimal</td></tr>
                <tr><td className="px-4 py-3 border border-zinc-800 font-bold">Cortisol Elevation</td><td className="px-4 py-3 border border-zinc-800 text-amber-400">Mild increase</td><td className="px-4 py-3 border border-zinc-800 text-emerald-400">None</td></tr>
                <tr><td className="px-4 py-3 border border-zinc-800 font-bold">Insulin Resistance</td><td className="px-4 py-3 border border-zinc-800 text-red-400">Yes (dose-dependent)</td><td className="px-4 py-3 border border-zinc-800 text-emerald-400">Not observed</td></tr>
                <tr><td className="px-4 py-3 border border-zinc-800 font-bold">Prolactin Elevation</td><td className="px-4 py-3 border border-zinc-800 text-amber-400">Mild</td><td className="px-4 py-3 border border-zinc-800 text-emerald-400">None</td></tr>
                <tr><td className="px-4 py-3 border border-zinc-800 font-bold">Sleep Improvement</td><td className="px-4 py-3 border border-zinc-800 text-emerald-400">Significant</td><td className="px-4 py-3 border border-zinc-800 text-emerald-400">Moderate</td></tr>
              </tbody>
            </table>
          </div>

          <h2 id="clinical-data">Clinical Data</h2>
          <p>
            MK-677 has the stronger clinical evidence base for long-term use. The 2-year Nass et al. trial demonstrated sustained IGF-1 elevation, increased fat-free mass (+1.6 kg), and improved body composition in elderly adults without exercise intervention.¹ However, it also showed increased fasting glucose and worsened insulin sensitivity.
          </p>
          <p>
            Ipamorelin has Phase 2 clinical trial data in post-surgical ileus (gut recovery after abdominal surgery) demonstrating safety and GH-releasing efficacy.² Its clinical use as a GH secretagogue for body composition is primarily documented through clinical practice and compounding pharmacy data rather than large registrational trials.
          </p>

          <h2 id="stacking">Optimal Stacking Protocols</h2>
          <p>
            <strong>MK-677</strong> is typically used as a standalone due to its 24-hour duration. It pairs well with compounds from different pathways — such as BPC-157 for recovery or GHK-Cu for anti-aging — but stacking with additional GH secretagogues adds risk without proportional benefit.
          </p>
          <p>
            <strong>Ipamorelin</strong> is optimally stacked with <Link href="/library/cjc-1295">CJC-1295</Link> (a GHRH analog). This combination leverages complementary mechanisms: CJC-1295 primes the pituitary to produce GH, while ipamorelin triggers a clean release pulse. The synergistic effect produces 3-6x greater GH output than either compound alone.³ This is widely regarded as the gold standard GH peptide stack in clinical and research settings.
          </p>

          <h2 id="verdict">Research Verdict</h2>
          <p>
            <strong>Choose MK-677 if:</strong> Convenience (oral dosing) is paramount, you want sustained 24-hour GH/IGF-1 elevation, and you can monitor and manage the metabolic side effects (appetite, glucose, water retention).
          </p>
          <p>
            <strong>Choose Ipamorelin if:</strong> You want the cleanest possible GH secretagogue with minimal side effects, plan to stack with CJC-1295 for synergistic release, and want to maintain physiological pulsatile GH patterns.
          </p>

          <hr className="border-zinc-800 my-10" />
          <h2 className="text-xl">Sources</h2>
          <ol className="text-sm text-zinc-400 space-y-3 marker:text-zinc-600">
            <li>Nass, R., et al. &quot;Effects of an Oral Ghrelin Mimetic on Body Composition and Clinical Outcomes.&quot; <em>Annals of Internal Medicine</em>, 2008; 149: 601-611.</li>
            <li>Raun, K., et al. &quot;Ipamorelin, the first selective growth hormone secretagogue.&quot; <em>European Journal of Endocrinology</em>, 1998; 139(5): 552-561.</li>
            <li>Teichman, S.L., et al. &quot;Prolonged Stimulation of Growth Hormone and Insulin-Like Growth Factor I Secretion by CJC-1295.&quot; <em>JCEM</em>, 2006; 91(3): 799-805.</li>
          </ol>
        </main>
        </AutoLink>
      </div>

      <LibraryCallout currentSlug="mk-677-vs-ipamorelin" peptides={[{"name":"MK-677","slug":"mk-677"},{"name":"Ipamorelin","slug":"ipamorelin"},{"name":"CJC-1295","slug":"cjc-1295"}]} />

      {/* Citations */}
      <div className="mb-12">
        <CiteThisPage title={POST_TITLE} url={`https://peptidex.app/blog/mk-677-vs-ipamorelin`} />
      </div>

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

      
      <ShareBar title={POST_TITLE} url={`https://peptidex.app/blog/mk-677-vs-ipamorelin`} />
      <BlogVendorCallout />

      <AuthorBio name={AUTHOR} />

      <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-6 text-center mt-8">
        <p className="text-xs text-zinc-500 leading-relaxed">
          This article is for educational and research purposes only. MK-677 and ipamorelin are not FDA-approved for body composition enhancement. Both are banned by WADA in competitive sports. PeptiDex does not sell peptides. Consult a healthcare provider before use.
        </p>
      </div>
    </div>
  );
}
