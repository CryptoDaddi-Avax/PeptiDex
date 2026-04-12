import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { AutoLink } from '@/components/auto-link';
import Link from 'next/link';
import { Calendar, User, ShieldAlert, BookOpen, AlertCircle, ArrowRight } from 'lucide-react';
import { AuthorBio } from '@/components/author-bio';
import { SHORT_DISCLAIMER } from '@/data/constants';
import { LibraryCallout } from '@/components/library-callout';

const POST_TITLE = 'Retatrutide: The Triple-Agonist Peptide Explained';
const POST_DESC = 'A comprehensive research guide to retatrutide — the first GLP-1/GIP/glucagon triple receptor agonist, its Phase 3 trial status, mechanism of action, dosing protocols, and what it means for the future of metabolic medicine.';
const AUTHOR = 'PeptideX Editorial';
const DATE_PUB = '2026-04-12';
const DATE_MOD = '2026-04-12';

export const metadata: Metadata = {
  title: `${POST_TITLE} | PeptiDex Research Blog`,
  description: POST_DESC,
  keywords: 'retatrutide, triple agonist peptide, GLP-1 GIP glucagon, retatrutide Phase 3, retatrutide weight loss, LY3437943, triple incretin agonist',
  alternates: { canonical: 'https://peptidex.app/blog/retatrutide-explained' },
};

export default function RetatrutideExplainedPage() {

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
      { '@type': 'Question', name: 'What is retatrutide?', acceptedAnswer: { '@type': 'Answer', text: 'Retatrutide (LY3437943) is an investigational triple receptor agonist developed by Eli Lilly that simultaneously activates the GLP-1, GIP, and glucagon receptors. It represents the first molecule of its class to reach Phase 3 clinical development for obesity and type 2 diabetes.' } },
      { '@type': 'Question', name: 'How much weight loss does retatrutide produce?', acceptedAnswer: { '@type': 'Answer', text: 'In the Phase 2 trial published in the New England Journal of Medicine, participants on the highest dose (12 mg) lost a mean of 24.2% of their body weight over 48 weeks — the largest weight loss ever recorded in an obesity drug trial at the time of publication. Phase 3 confirmatory data is expected in 2026.' } },
      { '@type': 'Question', name: 'How does retatrutide compare to tirzepatide?', acceptedAnswer: { '@type': 'Answer', text: 'Tirzepatide is a dual GLP-1/GIP agonist that produced up to 22.5% weight loss in SURMOUNT-1. Retatrutide adds glucagon receptor agonism to that dual mechanism, which promotes direct hepatic fat oxidation and thermogenesis. Phase 2 data suggests this third pathway may provide an additional 2-5% incremental weight loss beyond tirzepatide.' } },
      { '@type': 'Question', name: 'What are the side effects of retatrutide?', acceptedAnswer: { '@type': 'Answer', text: 'The most common side effects in Phase 2 trials were gastrointestinal: nausea (25-46%), diarrhea (17-25%), vomiting (8-20%), and constipation (8-14%). These are consistent with the GLP-1 receptor agonist class and were most severe during dose escalation. Serious adverse events were rare.' } },
      { '@type': 'Question', name: 'When will retatrutide be FDA-approved?', acceptedAnswer: { '@type': 'Answer', text: 'Retatrutide is currently in Phase 3 trials (TRIUMPH program). Based on typical regulatory timelines, an FDA submission could come in late 2026 or 2027, with potential approval in 2027-2028. However, this depends on Phase 3 trial readouts and regulatory review speed.' } },
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
          <div className="flex items-center gap-2"><User className="w-4 h-4 text-violet-400" /><span className="font-semibold text-zinc-200">{AUTHOR}</span></div>
          <div className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
          <div className="flex items-center gap-2"><Calendar className="w-4 h-4 text-zinc-500" /><span>Updated: {DATE_MOD}</span></div>
          <div className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
          <div className="flex items-center gap-2"><BookOpen className="w-4 h-4 text-emerald-500" /><span className="text-emerald-400 font-medium">11 Min Read</span></div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <aside className="lg:col-span-4 lg:order-2">
          <div className="sticky top-24 rounded-2xl bg-zinc-900/40 border border-zinc-800 p-6 space-y-4 shadow-xl">
            <h3 className="font-bold text-zinc-100 uppercase tracking-widest text-xs">Table of Contents</h3>
            <ul className="space-y-3 text-sm font-medium text-zinc-400">
              <li><a href="#intro" className="hover:text-violet-400 transition-colors block">1. The Next Frontier in Metabolic Peptides</a></li>
              <li><a href="#triple-mechanism" className="hover:text-violet-400 transition-colors block">2. Triple Receptor Mechanism</a></li>
              <li><a href="#phase-2" className="hover:text-violet-400 transition-colors block">3. Phase 2 Trial Data</a></li>
              <li><a href="#vs-tirzepatide" className="hover:text-violet-400 transition-colors block">4. Retatrutide vs Tirzepatide</a></li>
              <li><a href="#phase-3" className="hover:text-violet-400 transition-colors block">5. Phase 3: The TRIUMPH Program</a></li>
              <li><a href="#safety" className="hover:text-violet-400 transition-colors block">6. Safety & Side Effects</a></li>
            </ul>
          </div>
          <div className="mt-8">
            <h3 className="font-bold text-zinc-100 mb-4 text-sm uppercase tracking-widest">Related Profiles</h3>
            <div className="space-y-3">
              <Link href="/library/retatrutide" className="flex items-center justify-between p-3 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-violet-500/50 transition-colors group">
                <span className="font-semibold text-zinc-200 group-hover:text-violet-400">Retatrutide</span>
                <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-violet-400 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/library/tirzepatide" className="flex items-center justify-between p-3 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-violet-500/50 transition-colors group">
                <span className="font-semibold text-zinc-200 group-hover:text-violet-400">Tirzepatide</span>
                <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-violet-400 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/library/semaglutide" className="flex items-center justify-between p-3 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-violet-500/50 transition-colors group">
                <span className="font-semibold text-zinc-200 group-hover:text-violet-400">Semaglutide</span>
                <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-violet-400 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </aside>

        <AutoLink>
        <main className="lg:col-span-8 lg:order-1 prose prose-invert prose-zinc max-w-none prose-h2:text-2xl prose-h2:mt-12 prose-h3:text-lg prose-a:text-violet-400 hover:prose-a:text-violet-300">
          <p className="lead text-xl text-zinc-300 font-medium" id="intro">
            In the rapidly evolving landscape of incretin-based metabolic therapies, <strong>retatrutide</strong> stands alone. It is the first — and currently only — molecule to simultaneously activate three hormone receptors: GLP-1, GIP, and glucagon. And its early clinical data has stunned researchers.
          </p>
          <p>
            Developed by Eli Lilly under the research designation LY3437943, retatrutide produced the largest weight loss ever documented in a registrational-pathway obesity trial at the time of its Phase 2 publication: <strong>24.2% mean body weight reduction over 48 weeks</strong>.¹ This guide breaks down what makes retatrutide unique, how it compares to existing dual-agonists like <Link href="/library/tirzepatide">tirzepatide</Link>, and what the Phase 3 program means for the future of obesity pharmacotherapy.
          </p>

          <h2 id="triple-mechanism">The Triple Receptor Mechanism</h2>
          <p>
            Understanding retatrutide requires understanding how each of its three target receptors contributes to metabolic regulation independently — and what happens when all three are activated simultaneously.
          </p>

          <h3 className="flex items-center gap-2 text-violet-300 border-b border-zinc-800 pb-2">GLP-1 Receptor: Appetite & Glucose Control</h3>
          <p>
            The GLP-1 (glucagon-like peptide-1) component mirrors the mechanism seen in <Link href="/library/semaglutide">semaglutide</Link> and tirzepatide. GLP-1 receptor activation delays gastric emptying, enhances glucose-dependent insulin secretion, and suppresses appetite via central hypothalamic signaling. This is the primary driver of reduced caloric intake.²
          </p>

          <h3 className="flex items-center gap-2 text-emerald-300 border-b border-zinc-800 pb-2">GIP Receptor: Lipid Metabolism & Beta-Cell Support</h3>
          <p>
            Glucose-dependent insulinotropic polypeptide (GIP) receptor agonism, shared with tirzepatide, enhances insulin secretion through a pathway complementary to GLP-1. Critically, GIP signaling has been linked to improved lipid handling in adipose tissue and may contribute to the distribution of weight loss (favoring fat mass over lean mass).³
          </p>

          <h3 className="flex items-center gap-2 text-amber-300 border-b border-zinc-800 pb-2">Glucagon Receptor: The Thermogenic Differentiator</h3>
          <p>
            This is what makes retatrutide fundamentally different. Glucagon receptor activation directly stimulates hepatic lipid oxidation (fat burning in the liver), increases energy expenditure through thermogenesis, and promotes amino acid catabolism. In isolation, glucagon would raise blood glucose — but when combined with GLP-1/GIP agonism, the glycemic effects are counterbalanced while the metabolic benefits (fat oxidation, energy expenditure) are preserved.⁴
          </p>
          <p>
            In summary: GLP-1 reduces intake, GIP optimizes lipid handling, and glucagon burns stored energy. It&apos;s a three-pronged metabolic attack.
          </p>

          <h2 id="phase-2">Phase 2 Trial Data: Record-Breaking Results</h2>
          <p>
            The Phase 2 dose-finding trial, published in the <em>New England Journal of Medicine</em> in June 2023, enrolled 338 adults with obesity (BMI ≥30) or overweight (BMI ≥27) with at least one weight-related comorbidity.¹
          </p>
          <p>
            Results at 48 weeks across dose groups:
          </p>
          <ul>
            <li><strong>1 mg:</strong> -8.7% mean body weight reduction</li>
            <li><strong>4 mg:</strong> -17.1% mean body weight reduction</li>
            <li><strong>8 mg:</strong> -22.8% mean body weight reduction</li>
            <li><strong>12 mg:</strong> -24.2% mean body weight reduction</li>
            <li><strong>Placebo:</strong> -2.1% mean body weight reduction</li>
          </ul>
          <p>
            At the 12 mg dose, <strong>26% of participants lost more than 30% of their body weight</strong> — a threshold previously considered near-surgical territory. No prior pharmacotherapy had come close to these figures in a non-surgical population.¹
          </p>
          <p>
            Importantly, the weight loss trajectory at 48 weeks had not yet plateaued in the higher-dose groups, suggesting that longer treatment durations could yield even greater reductions.
          </p>

          <h2 id="vs-tirzepatide">Retatrutide vs Tirzepatide: A Framework Comparison</h2>
          <div className="overflow-x-auto my-8">
            <table className="w-full text-left text-sm border-collapse">
              <thead className="bg-zinc-900 border border-zinc-700 text-zinc-300">
                <tr>
                  <th className="px-4 py-3 font-semibold border-b border-zinc-700">Feature</th>
                  <th className="px-4 py-3 font-semibold border-b border-zinc-700">Tirzepatide</th>
                  <th className="px-4 py-3 font-semibold border-b border-zinc-700">Retatrutide</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                <tr className="hover:bg-zinc-800/20"><td className="px-4 py-3 border border-zinc-800 font-bold">Receptor Targets</td><td className="px-4 py-3 border border-zinc-800">GLP-1 + GIP</td><td className="px-4 py-3 border border-zinc-800 text-emerald-400">GLP-1 + GIP + Glucagon</td></tr>
                <tr className="hover:bg-zinc-800/20"><td className="px-4 py-3 border border-zinc-800 font-bold">Peak Weight Loss</td><td className="px-4 py-3 border border-zinc-800">22.5% (SURMOUNT-1)</td><td className="px-4 py-3 border border-zinc-800 text-emerald-400">24.2% (Phase 2)</td></tr>
                <tr className="hover:bg-zinc-800/20"><td className="px-4 py-3 border border-zinc-800 font-bold">Energy Expenditure Effect</td><td className="px-4 py-3 border border-zinc-800">Minimal</td><td className="px-4 py-3 border border-zinc-800 text-emerald-400">Significant (via glucagon)</td></tr>
                <tr className="hover:bg-zinc-800/20"><td className="px-4 py-3 border border-zinc-800 font-bold">Liver Fat Reduction</td><td className="px-4 py-3 border border-zinc-800">Moderate</td><td className="px-4 py-3 border border-zinc-800 text-emerald-400">Substantial (glucagon-mediated)</td></tr>
                <tr className="hover:bg-zinc-800/20"><td className="px-4 py-3 border border-zinc-800 font-bold">FDA Status (April 2026)</td><td className="px-4 py-3 border border-zinc-800 text-emerald-400">Approved</td><td className="px-4 py-3 border border-zinc-800">Phase 3</td></tr>
              </tbody>
            </table>
          </div>
          <p>
            A critical differentiator is retatrutide&apos;s impact on hepatic steatosis (fatty liver disease). In the Phase 2 trial, participants with non-alcoholic fatty liver disease (NAFLD) showed mean liver fat reductions exceeding 80% — suggesting retatrutide could become a first-in-class treatment for NASH/MAFLD, a condition with no currently approved pharmacotherapy.⁵
          </p>

          <h2 id="phase-3">Phase 3: The TRIUMPH Program</h2>
          <p>
            Eli Lilly has enrolled patients across multiple Phase 3 trials under the TRIUMPH umbrella:
          </p>
          <ul>
            <li><strong>TRIUMPH-1:</strong> Retatrutide vs placebo in adults with obesity (BMI ≥30)</li>
            <li><strong>TRIUMPH-2:</strong> Retatrutide vs placebo in adults with T2D and obesity</li>
            <li><strong>TRIUMPH-3:</strong> Retatrutide for MASH (metabolic dysfunction-associated steatohepatitis)</li>
            <li><strong>TRIUMPH-4:</strong> Cardiovascular outcomes trial</li>
          </ul>
          <p>
            Initial Phase 3 readouts are anticipated in late 2026. If the TRIUMPH data confirms the Phase 2 results, retatrutide could receive FDA priority review designation, potentially reaching the market by 2027-2028.⁶
          </p>

          <h2 id="safety">Safety & Side Effect Profile</h2>
          <p>
            The Phase 2 side effect profile was broadly consistent with the GLP-1 agonist class. The most common treatment-emergent adverse events at the 12 mg dose were:
          </p>
          <ul>
            <li><strong>Nausea:</strong> 45.8%</li>
            <li><strong>Diarrhea:</strong> 25.0%</li>
            <li><strong>Vomiting:</strong> 20.8%</li>
            <li><strong>Constipation:</strong> 14.6%</li>
            <li><strong>Decreased appetite:</strong> 25.0%</li>
          </ul>
          <p>
            GI events were most common during the dose-escalation period and generally resolved with continued treatment. No pancreatitis or medullary thyroid carcinoma events were observed. The glucagon component raised theoretical concerns about hepatotoxicity, but liver enzyme elevations were generally mild and transient.¹
          </p>

          <hr className="border-zinc-800 my-10" />
          <h2 className="text-xl">Sources</h2>
          <ol className="text-sm text-zinc-400 space-y-3 marker:text-zinc-600">
            <li>Jastreboff, A.M., Kaplan, L.M., et al. &quot;Triple-Hormone-Receptor Agonist Retatrutide for Obesity — A Phase 2 Trial.&quot; <em>New England Journal of Medicine</em>, 2023; 389(6): 514-526.</li>
            <li>Drucker, D.J. &quot;GLP-1 receptor agonists and the cardiovascular system.&quot; <em>Nature Reviews Cardiology</em>, 2024.</li>
            <li>Samms, R.J., Coghlan, M.P., Sloop, K.W. &quot;How May GIP Enhance the Therapeutic Efficacy of GLP-1?&quot; <em>Trends in Endocrinology & Metabolism</em>, 2020; 31(6): 410-421.</li>
            <li>Day, J.W., et al. &quot;A new glucagon and GLP-1 co-agonist eliminates obesity in rodents.&quot; <em>Nature Chemical Biology</em>, 2009; 5: 749-757.</li>
            <li>Hartman, M.L., et al. &quot;Effects of Novel Dual GIP and GLP-1 Receptor Agonist Tirzepatide on Biomarkers of Nonalcoholic Steatohepatitis.&quot; <em>Diabetes Care</em>, 2020.</li>
            <li>Eli Lilly and Company. &quot;Lilly Initiates TRIUMPH Phase 3 Clinical Program for Retatrutide.&quot; Press release, 2024.</li>
          </ol>
        </main>
        </AutoLink>
      </div>

      <LibraryCallout currentSlug="retatrutide-explained" peptides={[{"name":"Retatrutide","slug":"retatrutide"},{"name":"Tirzepatide","slug":"tirzepatide"},{"name":"Semaglutide","slug":"semaglutide"}]} />

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

      <AuthorBio name={AUTHOR} />

      <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-6 text-center mt-8">
        <p className="text-xs text-zinc-500 leading-relaxed">
          This article is for educational purposes only. Retatrutide is an investigational compound not yet approved by any regulatory agency. PeptiDex does not sell pharmaceuticals. Always consult a licensed healthcare provider.
        </p>
      </div>
    </div>
  );
}
