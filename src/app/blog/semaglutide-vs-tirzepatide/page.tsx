import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { AutoLink } from '@/components/auto-link';
import Link from 'next/link';
import { Calendar, User, ShieldAlert, BookOpen, AlertCircle, ArrowRight } from 'lucide-react';
import { AuthorBio } from '@/components/author-bio';
import { SHORT_DISCLAIMER } from '@/data/constants';
import { LibraryCallout } from '@/components/library-callout';
import { getAuthorSlug } from '@/data/authors';

const POST_TITLE = 'Semaglutide vs Tirzepatide: Complete Research Comparison';
const POST_DESC = 'A head-to-head comparison of semaglutide and tirzepatide — mechanisms, clinical trial data, weight loss efficacy, side effect profiles, and which GLP-1 performs better in research models.';
const AUTHOR = 'PeptideX Editorial';
const DATE_PUB = '2026-04-12';
const DATE_MOD = '2026-04-12';

export const metadata: Metadata = {
  title: `${POST_TITLE} | PeptiDex Research Blog`,
  description: POST_DESC,
  keywords: 'semaglutide vs tirzepatide, Wegovy vs Mounjaro, GLP-1 comparison, tirzepatide weight loss, semaglutide research, dual agonist peptide, incretin mimetic comparison',
  alternates: {
    canonical: 'https://peptidex.app/blog/semaglutide-vs-tirzepatide',
  },
};

export default function SemaglutideVsTirzepatidePage() {

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: POST_TITLE,
    description: POST_DESC,
    image: 'https://peptidex.app/og-image.png',
    author: { '@type': 'Organization', name: AUTHOR },
    publisher: {
      '@type': 'Organization',
      name: 'PeptiDex',
      logo: { '@type': 'ImageObject', url: 'https://peptidex.app/logo.png' }
    },
    datePublished: DATE_PUB,
    dateModified: DATE_MOD,
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is the main difference between semaglutide and tirzepatide?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Semaglutide is a single GLP-1 receptor agonist, while tirzepatide is a dual GLP-1/GIP receptor agonist. This means tirzepatide activates two incretin pathways simultaneously, which clinical data suggests may produce greater weight loss and metabolic improvements in many patients.',
        },
      },
      {
        '@type': 'Question',
        name: 'Which peptide produces more weight loss: semaglutide or tirzepatide?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'In head-to-head Phase 3 trials (SURPASS-2), tirzepatide at the highest dose (15 mg) produced a mean weight reduction of 12.4 kg vs 6.2 kg for semaglutide 1 mg over 40 weeks. The SURMOUNT trials showed tirzepatide achieving up to 22.5% body weight reduction at 72 weeks, compared to semaglutide\'s 15-17% in the STEP trials.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do semaglutide and tirzepatide have the same side effects?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Both share similar gastrointestinal side effects including nausea, vomiting, diarrhea, and constipation — typical of the GLP-1 receptor agonist class. However, some clinical data suggests tirzepatide may have slightly lower rates of nausea at equivalent efficacy levels, potentially due to the GIP co-agonism buffering some GI effects.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can you take semaglutide and tirzepatide together?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. Both drugs target the GLP-1 receptor and should not be combined. Concurrent use would dramatically increase the risk of severe gastrointestinal side effects and hypoglycemia. Patients should use one or the other under medical supervision.',
        },
      },
      {
        '@type': 'Question',
        name: 'Are semaglutide and tirzepatide available as oral pills?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Semaglutide is available in both injectable (Wegovy/Ozempic) and oral (Rybelsus/oral Wegovy) forms. The oral Wegovy pill was FDA-approved in December 2025. Tirzepatide is currently injectable-only (Mounjaro/Zepbound), though Eli Lilly has oral formulations in clinical development.',
        },
      },
    ],
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-12 relative space-y-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <Breadcrumbs items={[
        { name: 'Home', url: 'https://peptidex.app/' },
        { name: 'Blog', url: 'https://peptidex.app/blog' },
        { name: POST_TITLE }
      ]} />

      <div className="rounded-xl bg-amber-950/25 border border-amber-500/20 p-4">
        <div className="flex items-start gap-2">
          <ShieldAlert className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-amber-400/80 leading-relaxed font-medium">
            <strong>RESEARCH USE ONLY:</strong> {SHORT_DISCLAIMER}
          </p>
        </div>
      </div>

      <header className="space-y-6">
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-zinc-100 leading-tight">
          {POST_TITLE}
        </h1>
        <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-400 border-t border-b border-zinc-800/50 py-4">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-violet-400" />
            <Link href={`/about/${getAuthorSlug(AUTHOR)}`} className="font-semibold text-zinc-200 hover:text-violet-400 transition-colors">{AUTHOR}</Link>
          </div>
          <div className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-zinc-500" />
            <span>Updated: {DATE_MOD}</span>
          </div>
          <div className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-emerald-500" />
            <span className="text-emerald-400 font-medium">12 Min Read</span>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <aside className="lg:col-span-4 lg:order-2">
          <div className="sticky top-24 rounded-2xl bg-zinc-900/40 border border-zinc-800 p-6 space-y-4 shadow-xl">
            <h3 className="font-bold text-zinc-100 uppercase tracking-widest text-xs">Table of Contents</h3>
            <ul className="space-y-3 text-sm font-medium text-zinc-400">
              <li><a href="#introduction" className="hover:text-violet-400 transition-colors block">1. Why This Comparison Matters</a></li>
              <li><a href="#mechanisms" className="hover:text-violet-400 transition-colors block">2. Mechanism of Action</a></li>
              <li><a href="#trial-data" className="hover:text-violet-400 transition-colors block">3. Clinical Trial Data</a></li>
              <li><a href="#head-to-head" className="hover:text-violet-400 transition-colors block">4. Head-to-Head Results</a></li>
              <li><a href="#side-effects" className="hover:text-violet-400 transition-colors block">5. Side Effect Comparison</a></li>
              <li><a href="#formulations" className="hover:text-violet-400 transition-colors block">6. Available Formulations</a></li>
              <li><a href="#verdict" className="hover:text-violet-400 transition-colors block">7. Research Verdict</a></li>
            </ul>
          </div>
          <div className="mt-8">
            <h3 className="font-bold text-zinc-100 mb-4 text-sm uppercase tracking-widest">Related Profiles</h3>
            <div className="space-y-3">
               <Link href="/library/semaglutide" className="flex items-center justify-between p-3 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-violet-500/50 transition-colors group">
                 <span className="font-semibold text-zinc-200 group-hover:text-violet-400">Semaglutide</span>
                 <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-violet-400 group-hover:translate-x-1 transition-transform" />
               </Link>
               <Link href="/library/tirzepatide" className="flex items-center justify-between p-3 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-violet-500/50 transition-colors group">
                 <span className="font-semibold text-zinc-200 group-hover:text-violet-400">Tirzepatide</span>
                 <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-violet-400 group-hover:translate-x-1 transition-transform" />
               </Link>
               <Link href="/library/retatrutide" className="flex items-center justify-between p-3 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-violet-500/50 transition-colors group">
                 <span className="font-semibold text-zinc-200 group-hover:text-violet-400">Retatrutide</span>
                 <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-violet-400 group-hover:translate-x-1 transition-transform" />
               </Link>
            </div>
          </div>
        </aside>

        <AutoLink>
        <main className="lg:col-span-8 lg:order-1 prose prose-invert prose-zinc max-w-none prose-h2:text-2xl prose-h2:mt-12 prose-h3:text-lg prose-a:text-violet-400 hover:prose-a:text-violet-300">
          <p className="lead text-xl text-zinc-300 font-medium" id="introduction">
            The competition between <strong>semaglutide</strong> and <strong>tirzepatide</strong> represents the most consequential rivalry in modern metabolic pharmacology. Both compounds have redefined what&apos;s achievable in weight management and glycemic control — but they are not the same drug, and the differences matter.
          </p>
          <p>
            This article provides a research-backed, head-to-head comparison of these two incretin-based therapies, covering mechanisms, efficacy data from Phase 3 trials, side effect profiles, and available formulations as of 2026.
          </p>

          <h2 id="mechanisms">Mechanism of Action: Single vs Dual Agonism</h2>
          <p>
            Understanding the fundamental pharmacological difference between these two peptides is essential to interpreting their clinical outcomes.
          </p>

          <h3 className="flex items-center gap-2 text-violet-300 border-b border-zinc-800 pb-2">Semaglutide: The GLP-1 Specialist</h3>
          <p>
            Semaglutide (marketed as Ozempic, Wegovy, and Rybelsus by Novo Nordisk) is a modified analog of human GLP-1 (glucagon-like peptide-1). It binds selectively to the GLP-1 receptor, producing three primary effects: (1) delayed gastric emptying, which increases satiety; (2) enhanced glucose-dependent insulin secretion from pancreatic beta cells; and (3) central appetite suppression via hypothalamic GLP-1 receptor activation.¹
          </p>
          <p>
            The semaglutide molecule has been engineered with a C-18 fatty acid chain and amino acid substitutions that extend its half-life to approximately 7 days, enabling once-weekly dosing. This modification also increases albumin binding in plasma, protecting the peptide from DPP-4 enzymatic degradation.²
          </p>

          <h3 className="flex items-center gap-2 text-emerald-300 border-b border-zinc-800 pb-2">Tirzepatide: The Dual GLP-1/GIP Agonist</h3>
          <p>
            Tirzepatide (marketed as Mounjaro and Zepbound by Eli Lilly) represents a fundamentally different approach. It is a &quot;twincretin&quot; — a single molecule that simultaneously agonizes both the GLP-1 and GIP (glucose-dependent insulinotropic polypeptide) receptors.³
          </p>
          <p>
            The addition of GIP receptor agonism is significant because GIP has been shown to enhance lipid metabolism in adipose tissue, potentiate insulin secretion through a distinct signaling pathway, and may contribute to improved beta-cell function. In preclinical models, GIP receptor activation has been associated with enhanced energy expenditure and reduced fat mass independent of appetite suppression — suggesting that tirzepatide&apos;s dual mechanism attacks obesity through pathways that semaglutide cannot access alone.⁴
          </p>
          <p>
            Tirzepatide has a half-life of approximately 5 days and is administered via once-weekly subcutaneous injection. Its structure incorporates a C-20 fatty diacid moiety for albumin binding and extended duration of action.³
          </p>

          <h2 id="trial-data">Clinical Trial Data: What the Numbers Say</h2>

          <h3 className="flex items-center gap-2 text-violet-300 border-b border-zinc-800 pb-2">Semaglutide: The STEP Program</h3>
          <p>
            The STEP (Semaglutide Treatment Effect in People with Obesity) trial program established the groundbreaking efficacy of semaglutide 2.4 mg for chronic weight management.
          </p>
          <p>
            <strong>STEP 1</strong> (n=1,961): Participants on semaglutide 2.4 mg achieved a mean body weight reduction of <strong>14.9%</strong> at 68 weeks, compared to 2.4% with placebo. 32% of participants achieved ≥20% weight loss.⁵
          </p>
          <p>
            <strong>STEP 3</strong> (n=611): When combined with intensive behavioral therapy, mean weight loss reached <strong>16.0%</strong> at 68 weeks.⁶
          </p>
          <p>
            <strong>STEP 5</strong> (n=304): Over an extended 104-week period, participants maintained a <strong>15.2%</strong> mean weight reduction, demonstrating durability of effect with continued treatment.⁷
          </p>

          <h3 className="flex items-center gap-2 text-emerald-300 border-b border-zinc-800 pb-2">Tirzepatide: The SURMOUNT Program</h3>
          <p>
            The SURMOUNT trial program evaluated tirzepatide specifically for weight management in adults with obesity.
          </p>
          <p>
            <strong>SURMOUNT-1</strong> (n=2,539): Tirzepatide at the highest dose (15 mg) produced a mean weight reduction of <strong>22.5%</strong> at 72 weeks — the largest weight loss ever recorded in a registrational obesity trial. 36.2% of participants achieved ≥25% body weight reduction.⁸
          </p>
          <p>
            <strong>SURMOUNT-2</strong> (n=938): In patients with type 2 diabetes and obesity, tirzepatide 15 mg produced mean weight loss of <strong>14.7%</strong> at 72 weeks — significantly exceeding the ~7% typically seen with semaglutide in diabetic populations.⁹
          </p>
          <p>
            <strong>SURMOUNT-3</strong> (n=579): After a 12-week intensive lifestyle intervention lead-in, participants on tirzepatide 15 mg achieved a total weight reduction of <strong>26.6%</strong> from pre-lead-in baseline.¹⁰
          </p>

          <h2 id="head-to-head">Head-to-Head: SURPASS-2</h2>
          <p>
            The most informative direct comparison comes from the SURPASS-2 trial (n=1,879), which compared tirzepatide (5, 10, and 15 mg) against semaglutide 1 mg in adults with type 2 diabetes.¹¹
          </p>

          <div className="overflow-x-auto my-8">
            <table className="w-full text-left text-sm border-collapse">
              <thead className="bg-zinc-900 border border-zinc-700 text-zinc-300">
                <tr>
                  <th className="px-4 py-3 font-semibold border-b border-zinc-700">Metric</th>
                  <th className="px-4 py-3 font-semibold border-b border-zinc-700">Semaglutide 1 mg</th>
                  <th className="px-4 py-3 font-semibold border-b border-zinc-700">Tirzepatide 5 mg</th>
                  <th className="px-4 py-3 font-semibold border-b border-zinc-700">Tirzepatide 15 mg</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                <tr className="hover:bg-zinc-800/20">
                  <td className="px-4 py-3 border border-zinc-800 font-bold">HbA1c Reduction</td>
                  <td className="px-4 py-3 border border-zinc-800">-1.86%</td>
                  <td className="px-4 py-3 border border-zinc-800">-2.01%</td>
                  <td className="px-4 py-3 border border-zinc-800 text-emerald-400">-2.30%</td>
                </tr>
                <tr className="hover:bg-zinc-800/20">
                  <td className="px-4 py-3 border border-zinc-800 font-bold">Mean Weight Loss (kg)</td>
                  <td className="px-4 py-3 border border-zinc-800">-6.2 kg</td>
                  <td className="px-4 py-3 border border-zinc-800">-7.8 kg</td>
                  <td className="px-4 py-3 border border-zinc-800 text-emerald-400">-12.4 kg</td>
                </tr>
                <tr className="hover:bg-zinc-800/20">
                  <td className="px-4 py-3 border border-zinc-800 font-bold">Patients Reaching &lt;5.7% HbA1c</td>
                  <td className="px-4 py-3 border border-zinc-800">19.6%</td>
                  <td className="px-4 py-3 border border-zinc-800">29.3%</td>
                  <td className="px-4 py-3 border border-zinc-800 text-emerald-400">51.7%</td>
                </tr>
                <tr className="hover:bg-zinc-800/20">
                  <td className="px-4 py-3 border border-zinc-800 font-bold">Nausea Incidence</td>
                  <td className="px-4 py-3 border border-zinc-800">17.9%</td>
                  <td className="px-4 py-3 border border-zinc-800">17.4%</td>
                  <td className="px-4 py-3 border border-zinc-800">22.1%</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p>
            The data from SURPASS-2 showed all three tirzepatide doses to be <strong>superior to semaglutide 1 mg</strong> for both HbA1c reduction and weight loss. Notably, tirzepatide 15 mg produced roughly double the weight loss of semaglutide 1 mg.¹¹ However, it&apos;s important to note that semaglutide 2.4 mg (the obesity-specific dose) was not included in this comparison, so direct extrapolation to Wegovy requires caution.
          </p>

          <h2 id="side-effects">Side Effect Comparison</h2>
          <p>
            Both compounds share a class-level side effect profile dominated by gastrointestinal events, which are most pronounced during the dose-escalation phase.
          </p>
          <p>
            <strong>Semaglutide common adverse events:</strong> Nausea (44%), diarrhea (30%), vomiting (24%), constipation (24%), abdominal pain (20%). These tend to be mild to moderate in severity and decrease significantly after the first 4-8 weeks of treatment.⁵
          </p>
          <p>
            <strong>Tirzepatide common adverse events:</strong> Nausea (31%), diarrhea (23%), vomiting (12%), constipation (11%), decreased appetite (20%). Interestingly, the SURMOUNT data suggests that tirzepatide may produce somewhat lower rates of severe GI events at efficacy-equivalent doses, which some researchers attribute to the GIP component&apos;s anti-emetic properties.⁸
          </p>
          <p>
            Both carry boxed warnings regarding thyroid C-cell tumors observed in rodent models and are contraindicated in patients with personal or family history of medullary thyroid carcinoma or Multiple Endocrine Neoplasia syndrome type 2 (MEN 2).⁵ ⁸
          </p>

          <div className="my-10 rounded-2xl bg-gradient-to-br from-violet-900/40 to-zinc-900 border border-violet-500/30 p-6 shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-violet-500/10 blur-[50px] rounded-full pointer-events-none transition-all group-hover:bg-violet-500/20" />
            <h4 className="text-xl font-bold text-zinc-100 mb-2 flex flex-wrap items-center gap-2">
              <AlertCircle className="w-5 h-5 text-violet-400" /> Research-Grade Compound Sourcing
            </h4>
            <p className="text-sm text-zinc-300 mb-6 max-w-lg leading-relaxed">
              When investigating metabolic peptides in preclinical models, independent HPLC and mass spectrometry purity testing is non-negotiable.
            </p>
            <Link
              href="/vendors"
              rel="nofollow noopener sponsored"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold transition-all shadow-lg hover:shadow-violet-500/25"
            >
              Compare Verified Vendors <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          <h2 id="formulations">Available Formulations in 2026</h2>
          <p>
            <strong>Semaglutide</strong> leads in formulation diversity. As of April 2026, it is available as: injectable Wegovy (0.25-2.4 mg weekly for weight management), injectable Ozempic (0.25-2.0 mg weekly for T2D), oral Rybelsus (3-14 mg daily for T2D), and the newly approved oral Wegovy pill (25 mg daily for weight management — FDA-approved December 2025).¹²
          </p>
          <p>
            <strong>Tirzepatide</strong> is currently available exclusively as a weekly subcutaneous injection: Mounjaro (2.5-15 mg weekly for T2D) and Zepbound (2.5-15 mg weekly for weight management). Eli Lilly has disclosed that oral tirzepatide formulations are in clinical development but has not yet announced pivotal trial results.¹³
          </p>

          <h2 id="verdict">Research Verdict: Which Is Superior?</h2>
          <p>
            Based on the available clinical evidence, <strong>tirzepatide demonstrates superior efficacy</strong> for both weight reduction and glycemic control when compared to semaglutide across multiple trial endpoints. The dual GLP-1/GIP mechanism appears to unlock metabolic pathways that single-agonist GLP-1 therapy cannot fully access.
          </p>
          <p>
            However, semaglutide maintains significant advantages in clinical experience (longer post-market safety data), formulation flexibility (including oral options), and the broadest real-world evidence base of any incretin-based therapy. For researchers and clinicians, the choice between these compounds depends on the specific therapeutic goals, patient tolerance profiles, and access considerations.
          </p>
          <p>
            Looking ahead, the next frontier is the triple-agonist class. <Link href="/library/retatrutide">Retatrutide</Link>, Eli Lilly&apos;s GLP-1/GIP/glucagon receptor triple agonist, achieved 24.2% weight reduction in Phase 2 trials — suggesting that the incretin story has even further to go.¹⁴
          </p>

          <hr className="border-zinc-800 my-10" />

          <h2 className="text-xl">Sources</h2>
          <ol className="text-sm text-zinc-400 space-y-3 marker:text-zinc-600">
            <li>Drucker, D.J. &quot;Mechanisms of Action and Therapeutic Application of Glucagon-like Peptide-1.&quot; <em>Cell Metabolism</em>, 2018; 27(4): 740-756.</li>
            <li>Lau, J., Bloch, P., Schaffer, L., et al. &quot;Discovery of the Once-Weekly Glucagon-Like Peptide-1 (GLP-1) Analogue Semaglutide.&quot; <em>Journal of Medicinal Chemistry</em>, 2015; 58(18): 7370-7380.</li>
            <li>Coskun, T., Sloop, K.W., Loghin, C., et al. &quot;LY3298176, a novel dual GIP and GLP-1 receptor agonist for the treatment of type 2 diabetes mellitus.&quot; <em>Molecular Metabolism</em>, 2018; 18: 3-14.</li>
            <li>Samms, R.J., Coghlan, M.P., Sloop, K.W. &quot;How May GIP Enhance the Therapeutic Efficacy of GLP-1?&quot; <em>Trends in Endocrinology & Metabolism</em>, 2020; 31(6): 410-421.</li>
            <li>Wilding, J.P.H., Batterham, R.L., et al. &quot;Once-Weekly Semaglutide in Adults with Overweight or Obesity.&quot; <em>New England Journal of Medicine</em>, 2021; 384: 989-1002. (STEP 1)</li>
            <li>Wadden, T.A., Bailey, T.S., et al. &quot;Effect of Subcutaneous Semaglutide vs Placebo as an Adjunct to Intensive Behavioral Therapy.&quot; <em>JAMA</em>, 2021; 325(14): 1403-1413. (STEP 3)</li>
            <li>Garvey, W.T., Batterham, R.L., et al. &quot;Two-year effects of semaglutide in adults with overweight or obesity.&quot; <em>Nature Medicine</em>, 2022; 28: 2083-2091. (STEP 5)</li>
            <li>Jastreboff, A.M., Aronne, L.J., et al. &quot;Tirzepatide Once Weekly for the Treatment of Obesity.&quot; <em>New England Journal of Medicine</em>, 2022; 387: 205-216. (SURMOUNT-1)</li>
            <li>Garvey, W.T., Frias, J.P., et al. &quot;Tirzepatide once weekly for the treatment of obesity in people with type 2 diabetes.&quot; <em>The Lancet</em>, 2023; 402(10402): 613-626. (SURMOUNT-2)</li>
            <li>Wadden, T.A., et al. &quot;Tirzepatide after intensive lifestyle intervention in adults with overweight or obesity.&quot; <em>JAMA</em>, 2024; 331(1): 38-48. (SURMOUNT-3)</li>
            <li>Frias, J.P., Davies, M.J., et al. &quot;Tirzepatide versus Semaglutide Once Weekly in Patients with Type 2 Diabetes.&quot; <em>New England Journal of Medicine</em>, 2021; 385: 503-515. (SURPASS-2)</li>
            <li>Novo Nordisk. &quot;Wegovy pill approved in the US as first oral GLP-1 for weight management.&quot; Press release, December 22, 2025.</li>
            <li>Eli Lilly. Mounjaro / Zepbound Prescribing Information. 2024.</li>
            <li>Jastreboff, A.M., Kaplan, L.M., et al. &quot;Triple-Hormone-Receptor Agonist Retatrutide for Obesity.&quot; <em>New England Journal of Medicine</em>, 2023; 389(6): 514-526.</li>
          </ol>

        </main>
        </AutoLink>
      </div>

      <LibraryCallout currentSlug="semaglutide-vs-tirzepatide" peptides={[{"name":"Semaglutide","slug":"semaglutide"},{"name":"Tirzepatide","slug":"tirzepatide"},{"name":"Retatrutide","slug":"retatrutide"}]} />

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
          This article is for educational and research purposes only. Semaglutide and tirzepatide are prescription medications. PeptiDex does not sell pharmaceuticals. Always consult a licensed healthcare provider before starting any medication.
        </p>
      </div>
    </div>
  );
}
