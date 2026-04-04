import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { AutoLink } from '@/components/auto-link';
import Link from 'next/link';
import { ChevronRight, ShieldAlert } from 'lucide-react';

const TITLE = 'BPC-157 vs TB-500: A Research Comparison';
const DESC = 'A detailed comparison of BPC-157 and TB-500 (Thymosin Beta-4): origin, mechanism of action, primary research focus, administration, stacking potential, and current research status. Evidence-based analysis.';
const SLUG = 'bpc-157-vs-tb-500';
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
  { q: 'Can you take BPC-157 and TB-500 together?', a: 'Yes, BPC-157 and TB-500 are among the most commonly combined peptides in research protocols. Their mechanisms of action are complementary — BPC-157 promotes healing through angiogenesis and growth factor upregulation, while TB-500 supports repair via actin regulation and cell migration. There are no known negative interactions between the two compounds in published literature.' },
  { q: 'Which is better for tendon injuries — BPC-157 or TB-500?', a: 'BPC-157 has more direct published evidence for tendon repair specifically. Studies have demonstrated accelerated healing of Achilles tendon, rotator cuff, and patellar tendon injuries in animal models. TB-500 has broader tissue repair activity but less tendon-specific research. For tendon injuries specifically, BPC-157 is the more targeted choice; combining both may provide complementary benefits.' },
  { q: 'Is BPC-157 or TB-500 FDA approved?', a: 'Neither BPC-157 nor TB-500 is FDA-approved for human therapeutic use. Both are classified as investigational research compounds. They are not available by prescription through standard pharmacies. The majority of published research on both compounds comes from preclinical animal models.' },
  { q: 'What is the difference between TB-500 and Thymosin Beta-4?', a: 'TB-500 is a synthetic fragment of the full-length Thymosin Beta-4 (Tβ4) protein. The full Thymosin Beta-4 is a 43-amino acid protein produced naturally by the thymus gland. TB-500 contains the active region of Tβ4 responsible for its tissue-repair properties, specifically the actin-binding domain. In research contexts, the terms are sometimes used interchangeably, though TB-500 is technically a synthetic peptide fragment.' },
];

export default function Bpc157VsTb500Page() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://peptidex.app/' },
      { '@type': 'ListItem', position: 2, name: 'Compare', item: 'https://peptidex.app/compare' },
      { '@type': 'ListItem', position: 3, name: 'BPC-157 vs TB-500', item: `https://peptidex.app/compare/${SLUG}` },
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
        { name: 'BPC-157 vs TB-500' }
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
                <th className="px-4 py-3 text-xs font-bold text-emerald-400 uppercase tracking-wider w-1/3">BPC-157</th>
                <th className="px-4 py-3 text-xs font-bold text-blue-400 uppercase tracking-wider w-1/3">TB-500</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/50">
              <tr><td className="px-4 py-3 text-zinc-400 font-medium">Full Name</td><td className="px-4 py-3 text-zinc-300">Body Protection Compound-157</td><td className="px-4 py-3 text-zinc-300">Thymosin Beta-4 fragment (Tβ4)</td></tr>
              <tr><td className="px-4 py-3 text-zinc-400 font-medium">Origin</td><td className="px-4 py-3 text-zinc-300">Synthetic (derived from human gastric juice)</td><td className="px-4 py-3 text-zinc-300">Synthetic fragment of naturally occurring Tβ4</td></tr>
              <tr><td className="px-4 py-3 text-zinc-400 font-medium">Amino Acids</td><td className="px-4 py-3 text-zinc-300">15 amino acids</td><td className="px-4 py-3 text-zinc-300">43 amino acids (full Tβ4)</td></tr>
              <tr><td className="px-4 py-3 text-zinc-400 font-medium">Primary Mechanism</td><td className="px-4 py-3 text-zinc-300">Angiogenesis, VEGF/EGF upregulation, NO modulation</td><td className="px-4 py-3 text-zinc-300">Actin regulation, cell migration, anti-inflammation</td></tr>
              <tr><td className="px-4 py-3 text-zinc-400 font-medium">Primary Focus</td><td className="px-4 py-3 text-zinc-300">Tendons, ligaments, GI tract, localized injuries</td><td className="px-4 py-3 text-zinc-300">Systemic tissue repair, cardiac repair, inflammation</td></tr>
              <tr><td className="px-4 py-3 text-zinc-400 font-medium">Route</td><td className="px-4 py-3 text-zinc-300">SubQ injection, oral (gastric stable)</td><td className="px-4 py-3 text-zinc-300">SubQ or IM injection</td></tr>
              <tr><td className="px-4 py-3 text-zinc-400 font-medium">Oral Stability</td><td className="px-4 py-3 text-emerald-400">Yes — stable in gastric acid</td><td className="px-4 py-3 text-amber-400">No — requires injection</td></tr>
              <tr><td className="px-4 py-3 text-zinc-400 font-medium">Stacking</td><td className="px-4 py-3 text-zinc-300">Commonly combined with TB-500</td><td className="px-4 py-3 text-zinc-300">Commonly combined with BPC-157</td></tr>
              <tr><td className="px-4 py-3 text-zinc-400 font-medium">FDA Status</td><td className="px-4 py-3 text-amber-400">Not approved</td><td className="px-4 py-3 text-amber-400">Not approved</td></tr>
              <tr><td className="px-4 py-3 text-zinc-400 font-medium">Research Status</td><td className="px-4 py-3 text-zinc-300">100+ preclinical studies</td><td className="px-4 py-3 text-zinc-300">Extensive preclinical + some clinical</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <AutoLink>
      <article className="space-y-10 prose prose-invert prose-zinc max-w-none prose-headings:font-bold prose-h2:text-xl prose-h2:text-zinc-100 prose-h2:mt-0 prose-h2:mb-4 prose-p:text-zinc-300 prose-p:text-[15px] prose-p:leading-relaxed prose-a:text-violet-400 prose-a:no-underline hover:prose-a:underline prose-strong:text-zinc-200">

        <section>
          <h2>Origin and Discovery</h2>
          <p><strong><Link href="/peptides/bpc-157">BPC-157</Link></strong> (Body Protection Compound-157) is a synthetic 15-amino acid peptide derived from a protective protein found in human gastric juice. It was first identified and characterized by researchers at the University of Zagreb in the 1990s, led by Professor Predrag Sikiric. Its gastric origin gives it a unique property among peptides: exceptional stability in acidic environments, which enables oral administration.¹</p>
          <p><strong><Link href="/peptides/tb-500">TB-500</Link></strong> is a synthetic version of the active region of Thymosin Beta-4 (Tβ4), a 43-amino acid protein naturally produced by the thymus gland and found in virtually all human cells. Thymosin Beta-4 was first isolated in 1981 from calf thymus tissue. TB-500 specifically contains the actin-binding domain (amino acids 17–23) responsible for the protein&apos;s primary tissue-repair activity.²</p>
        </section>

        <section>
          <h2>Mechanism of Action</h2>
          <p><strong>BPC-157</strong> exerts its healing effects primarily through <strong>angiogenesis</strong> — the formation of new blood vessels at injury sites. It upregulates vascular endothelial growth factor (VEGF), epidermal growth factor (EGF), and transforming growth factor beta (TGF-β). It also modulates the nitric oxide (NO) system, which plays a central role in inflammation and vascular function. Additionally, BPC-157 influences the FAK-paxillin signaling pathway, essential for cell adhesion and migration during tissue repair.¹ ³</p>
          <p><strong>TB-500</strong> works through a fundamentally different mechanism centered on <strong>actin regulation</strong>. As an actin-sequestering peptide, it promotes cell migration by allowing cells to move toward damaged tissue more effectively. It also reduces inflammation by downregulating pro-inflammatory cytokines and has demonstrated cardioprotective effects in animal models of myocardial infarction. TB-500&apos;s systemic distribution makes it effective for widespread tissue repair rather than localized injuries.² ⁴</p>
        </section>

        <section>
          <h2>Primary Research Applications</h2>
          <p><strong>BPC-157 excels in localized tissue repair.</strong> Published studies demonstrate efficacy in healing Achilles tendons, rotator cuff tears, medial collateral ligament injuries, muscle damage, bone fractures, and gastrointestinal conditions including inflammatory bowel disease, gastric ulcers, and esophageal damage. Its protective effects on the GI tract are among its most unique characteristics.¹ ³</p>
          <p><strong>TB-500 is stronger in systemic repair.</strong> Research has focused on cardiac tissue repair after myocardial infarction, traumatic brain injury recovery, corneal healing, dermal wound repair, and broad anti-inflammatory activity. TB-500&apos;s influence on actin dynamics gives it applications in conditions where cell migration is a rate-limiting factor in recovery.² ⁴</p>
        </section>

        <section>
          <h2>The BPC-157 + TB-500 Stack</h2>
          <p>Combining BPC-157 and TB-500 is one of the most common research protocols in the peptide space. The rationale is mechanistic complementarity: BPC-157 creates new blood vessel infrastructure and delivers growth factors to injury sites, while TB-500 facilitates the migration of repair cells to those same sites. Together, they address two different bottlenecks in the tissue repair process.⁵</p>
          <p>In research protocols, they are typically administered concurrently via separate subcutaneous injections. No published studies have identified negative interactions between the two compounds. This combination is particularly popular in research models involving musculoskeletal injuries where both localized repair and systemic anti-inflammatory support are desired.</p>
        </section>
      </article>
      </AutoLink>

      {/* ═══════ KEY TAKEAWAYS ═══════ */}
      <section className="rounded-2xl bg-emerald-900/10 border border-emerald-500/20 p-6 space-y-3">
        <h2 className="text-lg font-bold text-zinc-100">Key Takeaways</h2>
        <ul className="space-y-2 text-sm text-zinc-300">
          <li className="flex gap-2"><span className="text-emerald-400 font-bold">•</span>BPC-157 and TB-500 target different healing mechanisms — angiogenesis/growth factors vs. actin regulation/cell migration.</li>
          <li className="flex gap-2"><span className="text-emerald-400 font-bold">•</span>BPC-157 is better studied for localized injuries (tendons, GI tract); TB-500 for systemic repair (cardiac, widespread inflammation).</li>
          <li className="flex gap-2"><span className="text-emerald-400 font-bold">•</span>BPC-157 is one of the rare peptides with oral bioavailability; TB-500 requires injection.</li>
          <li className="flex gap-2"><span className="text-emerald-400 font-bold">•</span>They are the most commonly stacked healing peptides, with complementary, non-overlapping mechanisms.</li>
          <li className="flex gap-2"><span className="text-emerald-400 font-bold">•</span>Neither is FDA-approved. Both are investigational research compounds.</li>
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
          <li>Sikiric, P., et al. &quot;Brain-gut axis and pentadecapeptide BPC 157: Theoretical and practical implications.&quot; <em>Curr. Neuropharmacol.</em>, 2016; 14(8): 857–865.</li>
          <li>Goldstein, A.L., Hannappel, E., Kleinman, H.K. &quot;Thymosin β4: actin-sequestering protein moonlights to repair injured tissues.&quot; <em>Trends Mol. Med.</em>, 2005; 11(9): 421–429.</li>
          <li>Chang, C.H., et al. &quot;BPC 157 enhances the tendon-to-bone healing.&quot; <em>J. Orthop. Res.</em>, 2023.</li>
          <li>Bock-Marquette, I., et al. &quot;Thymosin β4 activates integrin-linked kinase and promotes cardiac cell migration, survival and cardiac repair.&quot; <em>Nature</em>, 2004; 432: 466–472.</li>
          <li>Gwyer, D., Wragg, N.M., Wilson, S.L. &quot;Gastric pentadecapeptide body protection compound BPC 157 and its role in accelerating musculoskeletal soft tissue healing.&quot; <em>Cell Tissue Res.</em>, 2019; 377: 153–159.</li>
        </ol>
      </section>

      {/* ═══════ DISCLAIMER ═══════ */}
      <div className="rounded-xl bg-amber-950/20 border border-amber-500/20 p-5">
        <div className="flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-amber-200/70 leading-relaxed">
            This comparison is for educational purposes only. Neither BPC-157 nor TB-500 is FDA-approved for human therapeutic use. Consult a healthcare provider before using any peptide.{' '}
            <Link href="/disclaimer" className="underline hover:text-amber-200 transition-colors">Read full disclaimer.</Link>
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between pt-6 border-t border-zinc-800 text-xs text-zinc-600">
        <p>Last updated: {DATE_MOD}</p>
        <div className="flex gap-3">
          <Link href="/peptides/bpc-157" className="text-violet-400 hover:text-violet-300 transition-colors">BPC-157 Profile →</Link>
          <Link href="/peptides/tb-500" className="text-violet-400 hover:text-violet-300 transition-colors">TB-500 Profile →</Link>
        </div>
      </div>
    </div>
  );
}
