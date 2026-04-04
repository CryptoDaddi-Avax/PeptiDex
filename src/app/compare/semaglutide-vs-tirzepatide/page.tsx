import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { AutoLink } from '@/components/auto-link';
import Link from 'next/link';
import { ChevronRight, ShieldAlert } from 'lucide-react';

const TITLE = 'Semaglutide vs Tirzepatide: How Do They Compare?';
const DESC = 'Head-to-head comparison of semaglutide and tirzepatide: mechanism of action, weight loss data from clinical trials, FDA indications, side effects, dosing, and cost. Evidence-based analysis.';
const SLUG = 'semaglutide-vs-tirzepatide';
const DATE_PUB = '2026-04-03';
const DATE_MOD = '2026-04-03';

export const metadata: Metadata = {
  title: `${TITLE} | PeptideX`,
  description: DESC,
  alternates: { canonical: `https://peptidex.app/compare/${SLUG}` },
  openGraph: { title: TITLE, description: DESC, url: `https://peptidex.app/compare/${SLUG}`, type: 'article', images: [{ url: '/og-image.png', width: 1200, height: 630 }] },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESC, images: ['/og-image.png'] },
};

const FAQS = [
  { q: 'Which causes more weight loss — semaglutide or tirzepatide?', a: 'Tirzepatide has demonstrated greater weight loss in head-to-head clinical data. In the SURMOUNT trials, tirzepatide at the highest dose produced approximately 22.5% total body weight loss over 72 weeks, compared to approximately 15–17% for semaglutide 2.4mg in the STEP trials. This difference is attributed to tirzepatide\'s dual GLP-1/GIP receptor agonism.' },
  { q: 'Are semaglutide and tirzepatide FDA approved?', a: 'Yes, both are FDA approved. Semaglutide is approved as Ozempic (type 2 diabetes), Wegovy (weight management), and Rybelsus (oral, type 2 diabetes). Tirzepatide is approved as Mounjaro (type 2 diabetes) and Zepbound (weight management). Both require a prescription.' },
  { q: 'Can you switch from semaglutide to tirzepatide?', a: 'Switching between semaglutide and tirzepatide should be managed by a healthcare provider. There is no standardized protocol for transitioning between the two, though physicians may initiate tirzepatide at a lower dose when switching from semaglutide. Individual response, insurance coverage, and side effect tolerance are key factors in deciding to switch.' },
  { q: 'What is the main difference between semaglutide and tirzepatide?', a: 'The main difference is their receptor targeting. Semaglutide is a selective GLP-1 receptor agonist, while tirzepatide is a dual GLP-1 and GIP (glucose-dependent insulinotropic polypeptide) receptor agonist. This dual mechanism appears to produce greater effects on weight loss, insulin sensitivity, and appetite suppression in clinical trials.' },
];

export default function SemaglutideVsTirzepatidePage() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://peptidex.app/' },
      { '@type': 'ListItem', position: 2, name: 'Compare', item: 'https://peptidex.app/compare' },
      { '@type': 'ListItem', position: 3, name: 'Semaglutide vs Tirzepatide', item: `https://peptidex.app/compare/${SLUG}` },
    ],
  };
  const articleSchema = {
    '@context': 'https://schema.org', '@type': 'Article', headline: TITLE, description: DESC,
    image: 'https://peptidex.app/og-image.png',
    author: { '@type': 'Organization', name: 'PeptideX Editorial Team', url: 'https://peptidex.app/about' },
    publisher: { '@type': 'Organization', name: 'PeptideX', logo: { '@type': 'ImageObject', url: 'https://peptidex.app/logo.png' } },
    datePublished: DATE_PUB, dateModified: DATE_MOD,
    mainEntityOfPage: { '@type': 'WebPage', '@id': `https://peptidex.app/compare/${SLUG}` },
  };
  const faqSchema = {
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: FAQS.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 md:py-12 space-y-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <Breadcrumbs items={[
        { name: 'Home', url: 'https://peptidex.app/' },
        { name: 'Compare', url: 'https://peptidex.app/compare' },
        { name: 'Semaglutide vs Tirzepatide' }
      ]} />

      <header className="space-y-3">
        <p className="text-xs text-zinc-500 font-medium">Updated: {DATE_MOD}</p>
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-zinc-100 leading-tight">{TITLE}</h1>
        <p className="text-[15px] text-zinc-400 leading-relaxed">{DESC}</p>
      </header>

      {/* ═══════ COMPARISON TABLE ═══════ */}
      <section>
        <h2 className="text-xl font-bold text-zinc-100 mb-4">At a Glance</h2>
        <div className="overflow-x-auto rounded-2xl border border-zinc-800">
          <table className="w-full text-left text-sm">
            <thead className="bg-zinc-900/80">
              <tr className="border-b border-zinc-700">
                <th className="px-4 py-3 text-xs font-bold text-zinc-400 uppercase tracking-wider w-1/3">Dimension</th>
                <th className="px-4 py-3 text-xs font-bold text-emerald-400 uppercase tracking-wider w-1/3">Semaglutide</th>
                <th className="px-4 py-3 text-xs font-bold text-blue-400 uppercase tracking-wider w-1/3">Tirzepatide</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/50">
              <tr><td className="px-4 py-3 text-zinc-400 font-medium">Mechanism</td><td className="px-4 py-3 text-zinc-300">GLP-1 receptor agonist (single)</td><td className="px-4 py-3 text-zinc-300">GLP-1 + GIP dual receptor agonist</td></tr>
              <tr><td className="px-4 py-3 text-zinc-400 font-medium">Brand Names</td><td className="px-4 py-3 text-zinc-300">Ozempic, Wegovy, Rybelsus</td><td className="px-4 py-3 text-zinc-300">Mounjaro, Zepbound</td></tr>
              <tr><td className="px-4 py-3 text-zinc-400 font-medium">Manufacturer</td><td className="px-4 py-3 text-zinc-300">Novo Nordisk</td><td className="px-4 py-3 text-zinc-300">Eli Lilly</td></tr>
              <tr><td className="px-4 py-3 text-zinc-400 font-medium">Max Weight Loss</td><td className="px-4 py-3 text-zinc-300">~15–17% (STEP trials)</td><td className="px-4 py-3 text-zinc-300">~22.5% (SURMOUNT trials)</td></tr>
              <tr><td className="px-4 py-3 text-zinc-400 font-medium">Dosing</td><td className="px-4 py-3 text-zinc-300">Weekly SubQ injection (0.25mg–2.4mg)</td><td className="px-4 py-3 text-zinc-300">Weekly SubQ injection (2.5mg–15mg)</td></tr>
              <tr><td className="px-4 py-3 text-zinc-400 font-medium">Oral Available</td><td className="px-4 py-3 text-emerald-400">Yes (Rybelsus, Wegovy pill)</td><td className="px-4 py-3 text-amber-400">In development</td></tr>
              <tr><td className="px-4 py-3 text-zinc-400 font-medium">FDA Approved</td><td className="px-4 py-3 text-emerald-400">Yes (T2D + weight)</td><td className="px-4 py-3 text-emerald-400">Yes (T2D + weight)</td></tr>
              <tr><td className="px-4 py-3 text-zinc-400 font-medium">Common Side Effects</td><td className="px-4 py-3 text-zinc-300">Nausea, vomiting, diarrhea, constipation</td><td className="px-4 py-3 text-zinc-300">Nausea, diarrhea, decreased appetite</td></tr>
              <tr><td className="px-4 py-3 text-zinc-400 font-medium">List Price (US)</td><td className="px-4 py-3 text-zinc-300">~$1,350/month (Wegovy)</td><td className="px-4 py-3 text-zinc-300">~$1,060/month (Zepbound)</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <AutoLink>
      <article className="space-y-10 prose prose-invert prose-zinc max-w-none prose-headings:font-bold prose-h2:text-xl prose-h2:text-zinc-100 prose-h2:mt-0 prose-h2:mb-4 prose-p:text-zinc-300 prose-p:text-[15px] prose-p:leading-relaxed prose-a:text-violet-400 prose-a:no-underline hover:prose-a:underline prose-strong:text-zinc-200">

        <section>
          <h2>Mechanism of Action</h2>
          <p><strong><Link href="/peptides/semaglutide">Semaglutide</Link></strong> is a selective GLP-1 receptor agonist that mimics the incretin hormone GLP-1. When it binds to GLP-1 receptors, it stimulates glucose-dependent insulin secretion, suppresses glucagon release, slows gastric emptying, and acts on hypothalamic appetite centers to reduce hunger and caloric intake.¹ It has a half-life of approximately 7 days, allowing once-weekly dosing.</p>
          <p><strong><Link href="/peptides/tirzepatide">Tirzepatide</Link></strong> is a dual-acting agonist that activates both GLP-1 and GIP (glucose-dependent insulinotropic polypeptide) receptors. The addition of GIP signaling is thought to enhance insulin sensitivity beyond GLP-1 alone, improve fat metabolism, and potentially provide additional appetite suppression.² This dual mechanism is the primary explanation for tirzepatide&apos;s superior weight loss results in clinical trials.</p>
        </section>

        <section>
          <h2>Weight Loss Efficacy</h2>
          <p>In the <strong>STEP trials</strong>, semaglutide 2.4mg produced approximately 14.9% total body weight loss over 68 weeks, with some participants achieving over 20% loss.¹ In the <strong>SURMOUNT-1 trial</strong>, tirzepatide at the highest dose (15mg) produced 22.5% weight loss over 72 weeks — roughly 50% more weight loss than semaglutide at its maximum approved weight management dose.²</p>
          <p>The <strong>SURPASS trials</strong> (which compared tirzepatide against semaglutide 1mg for type 2 diabetes) showed tirzepatide was superior in both A1C reduction and weight loss at all dose levels tested.³ These results make tirzepatide the most effective anti-obesity medication ever evaluated in Phase III clinical trials to date.</p>
        </section>

        <section>
          <h2>Side Effect Profiles</h2>
          <p>Both medications share a similar side effect profile characteristic of GLP-1 agonists. Gastrointestinal effects — primarily nausea, vomiting, diarrhea, and constipation — are the most common adverse events. These are typically most pronounced during the dose-titration phase and generally diminish over time.¹ ²</p>
          <p>In clinical trials, tirzepatide showed comparable or slightly lower rates of nausea compared to semaglutide at equivalent efficacy doses, which some researchers attribute to the GIP receptor co-agonism potentially buffering GI side effects.³ Both medications carry warnings regarding pancreatitis, thyroid C-cell tumors (based on rodent studies), and gallbladder-related events.</p>
        </section>

        <section>
          <h2>Cost and Accessibility</h2>
          <p>Both medications are premium-priced. Wegovy (semaglutide for weight loss) has a US list price of approximately $1,350/month, while Zepbound (tirzepatide for weight loss) lists at approximately $1,060/month.⁴ However, actual out-of-pocket costs depend heavily on insurance coverage, which varies by plan and indication. Generic versions are not yet available for either compound.</p>
          <p>Semaglutide has a broader range of available formulations, including injectable (Ozempic, Wegovy) and oral (Rybelsus, and the recently approved oral Wegovy pill).⁵ Tirzepatide is currently available only as a weekly injection, though oral formulations are in clinical development.</p>
        </section>
      </article>
      </AutoLink>

      {/* ═══════ KEY TAKEAWAYS ═══════ */}
      <section className="rounded-2xl bg-emerald-900/10 border border-emerald-500/20 p-6 space-y-3">
        <h2 className="text-lg font-bold text-zinc-100">Key Takeaways</h2>
        <ul className="space-y-2 text-sm text-zinc-300">
          <li className="flex gap-2"><span className="text-emerald-400 font-bold">•</span>Tirzepatide produces ~50% more weight loss than semaglutide in clinical trials due to its dual GLP-1/GIP mechanism.</li>
          <li className="flex gap-2"><span className="text-emerald-400 font-bold">•</span>Both are FDA approved for type 2 diabetes and chronic weight management with a prescription.</li>
          <li className="flex gap-2"><span className="text-emerald-400 font-bold">•</span>Side effect profiles are similar (GI-dominant), with tirzepatide potentially better tolerated at equivalent efficacy.</li>
          <li className="flex gap-2"><span className="text-emerald-400 font-bold">•</span>Semaglutide has the advantage of oral availability (Rybelsus/oral Wegovy); tirzepatide is injection-only for now.</li>
        </ul>
      </section>

      {/* ═══════ FAQ ═══════ */}
      <section>
        <h2 className="text-xl font-bold text-zinc-100 mb-4">Frequently Asked Questions</h2>
        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <div key={i} className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-5">
              <h3 className="font-semibold text-zinc-200 mb-2 text-sm">{faq.q}</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════ SOURCES ═══════ */}
      <section>
        <h2 className="text-lg font-bold text-zinc-100 mb-3">Sources</h2>
        <ol className="space-y-2 list-decimal list-inside text-sm text-zinc-400">
          <li>Wilding, J.P.H., et al. &quot;Once-Weekly Semaglutide in Adults with Overweight or Obesity.&quot; <em>N. Engl. J. Med.</em>, 2021; 384: 989–1002. (STEP 1)</li>
          <li>Jastreboff, A.M., et al. &quot;Tirzepatide Once Weekly for the Treatment of Obesity.&quot; <em>N. Engl. J. Med.</em>, 2022; 387: 205–216. (SURMOUNT-1)</li>
          <li>Frias, J.P., et al. &quot;Tirzepatide versus Semaglutide Once Weekly in Patients with Type 2 Diabetes.&quot; <em>N. Engl. J. Med.</em>, 2021; 385: 503–515. (SURPASS-2)</li>
          <li>GoodRx. Ozempic, Wegovy, Mounjaro, Zepbound pricing data. Accessed April 2026.</li>
          <li>FDA Approval Letter: Oral Semaglutide (Rybelsus) for Type 2 Diabetes. September 2019.</li>
        </ol>
      </section>

      {/* ═══════ DISCLAIMER ═══════ */}
      <div className="rounded-xl bg-amber-950/20 border border-amber-500/20 p-5">
        <div className="flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-amber-200/70 leading-relaxed">
            This comparison is for educational purposes only. Both semaglutide and tirzepatide are prescription medications. Do not use either medication without a physician&apos;s supervision.{' '}
            <Link href="/disclaimer" className="underline hover:text-amber-200 transition-colors">Read full disclaimer.</Link>
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between pt-6 border-t border-zinc-800 text-xs text-zinc-600">
        <p>Last updated: {DATE_MOD}</p>
        <div className="flex gap-3">
          <Link href="/peptides/semaglutide" className="text-violet-400 hover:text-violet-300 transition-colors">Semaglutide Profile →</Link>
          <Link href="/peptides/tirzepatide" className="text-violet-400 hover:text-violet-300 transition-colors">Tirzepatide Profile →</Link>
        </div>
      </div>
    </div>
  );
}
