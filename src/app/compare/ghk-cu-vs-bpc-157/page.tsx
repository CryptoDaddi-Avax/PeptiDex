import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { ShareBar } from '@/components/share-bar';
import { AutoLink } from '@/components/auto-link';
import Link from 'next/link';
import { ChevronRight, ShieldAlert, ExternalLink } from 'lucide-react';

const TITLE = 'GHK-Cu vs BPC-157: Differences, Uses, and Research Compared';
const DESC = 'A detailed comparison of GHK-Cu and BPC-157 peptides: mechanism of action, primary research applications, safety profiles, and best use cases. Evidence-based analysis with cited sources.';
const SLUG = 'ghk-cu-vs-bpc-157';
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
  { q: 'Can you use GHK-Cu and BPC-157 together?', a: 'Yes, GHK-Cu and BPC-157 are frequently studied in combination. GHK-Cu primarily targets skin regeneration, collagen synthesis, and gene expression modulation, while BPC-157 focuses on musculoskeletal and gastrointestinal tissue repair. Their mechanisms of action are complementary and non-overlapping, making them suitable for combined research protocols.' },
  { q: 'Which is better for wound healing — GHK-Cu or BPC-157?', a: 'Both peptides have demonstrated wound healing properties, but through different mechanisms. GHK-Cu accelerates wound closure primarily through collagen and elastin stimulation and anti-inflammatory cytokine modulation, making it particularly effective for skin wounds. BPC-157 promotes healing through angiogenesis and growth factor upregulation, making it more suited for deep tissue, tendon, and ligament injuries.' },
  { q: 'Is GHK-Cu or BPC-157 FDA approved?', a: 'Neither GHK-Cu nor BPC-157 is currently FDA-approved for human therapeutic use. GHK-Cu is available as a cosmetic ingredient (Copper Tripeptide-1) in topical skincare products. BPC-157 remains an investigational compound studied primarily in preclinical models. Both are available for research purposes.' },
  { q: 'Which peptide has more published research?', a: 'GHK-Cu has a longer publication history, with research dating back to its discovery in 1973 by Dr. Loren Pickart. It has been the subject of over 100 published papers. BPC-157 also has a substantial body of preclinical research with 100+ published studies, though most are animal models. Neither has undergone large-scale Phase III clinical trials.' },
];

export default function GhkCuVsBpc157Page() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://peptidex.app/' },
      { '@type': 'ListItem', position: 2, name: 'Compare', item: 'https://peptidex.app/compare' },
      { '@type': 'ListItem', position: 3, name: 'GHK-Cu vs BPC-157', item: `https://peptidex.app/compare/${SLUG}` },
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
        { name: 'GHK-Cu vs BPC-157' }
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
                <th className="px-4 py-3 text-xs font-bold text-violet-400 uppercase tracking-wider w-1/3">GHK-Cu</th>
                <th className="px-4 py-3 text-xs font-bold text-emerald-400 uppercase tracking-wider w-1/3">BPC-157</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/50">
              <tr><td className="px-4 py-3 text-zinc-400 font-medium">Full Name</td><td className="px-4 py-3 text-zinc-300">Glycyl-L-histidyl-L-lysine copper complex</td><td className="px-4 py-3 text-zinc-300">Body Protection Compound-157</td></tr>
              <tr><td className="px-4 py-3 text-zinc-400 font-medium">Origin</td><td className="px-4 py-3 text-zinc-300">Naturally occurring (human blood plasma)</td><td className="px-4 py-3 text-zinc-300">Synthetic (derived from gastric juice protein)</td></tr>
              <tr><td className="px-4 py-3 text-zinc-400 font-medium">Primary Mechanism</td><td className="px-4 py-3 text-zinc-300">Gene expression modulation, collagen/elastin synthesis, copper delivery</td><td className="px-4 py-3 text-zinc-300">Angiogenesis, growth factor upregulation, nitric oxide modulation</td></tr>
              <tr><td className="px-4 py-3 text-zinc-400 font-medium">Primary Applications</td><td className="px-4 py-3 text-zinc-300">Anti-aging, skin regeneration, wound healing, hair growth</td><td className="px-4 py-3 text-zinc-300">Tendon/ligament repair, gut healing, musculoskeletal injury</td></tr>
              <tr><td className="px-4 py-3 text-zinc-400 font-medium">Route</td><td className="px-4 py-3 text-zinc-300">Topical (most common), SubQ injection</td><td className="px-4 py-3 text-zinc-300">SubQ injection, oral (stable in gastric acid)</td></tr>
              <tr><td className="px-4 py-3 text-zinc-400 font-medium">Research Depth</td><td className="px-4 py-3 text-zinc-300">100+ papers since 1973</td><td className="px-4 py-3 text-zinc-300">100+ papers, mostly preclinical</td></tr>
              <tr><td className="px-4 py-3 text-zinc-400 font-medium">FDA Status</td><td className="px-4 py-3 text-amber-400">Not approved (cosmetic ingredient)</td><td className="px-4 py-3 text-amber-400">Not approved (investigational)</td></tr>
              <tr><td className="px-4 py-3 text-zinc-400 font-medium">Safety Profile</td><td className="px-4 py-3 text-zinc-300">No serious adverse events reported</td><td className="px-4 py-3 text-zinc-300">Generally well-tolerated in animal models</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <AutoLink>
      <article className="space-y-10 prose prose-invert prose-zinc max-w-none prose-headings:font-bold prose-h2:text-xl prose-h2:text-zinc-100 prose-h2:mt-0 prose-h2:mb-4 prose-p:text-zinc-300 prose-p:text-[15px] prose-p:leading-relaxed prose-a:text-violet-400 prose-a:no-underline hover:prose-a:underline prose-strong:text-zinc-200">

        <section>
          <h2>Mechanism of Action</h2>
          <p><strong><Link href="/peptides/ghk-cu">GHK-Cu</Link></strong> operates primarily through gene expression modulation. Research from the Broad Institute&apos;s Connectivity Map found that it influences over 4,000 human genes — approximately 6% of the human genome — shifting expression patterns in aged cells toward younger profiles.¹ It upregulates genes involved in collagen synthesis, antioxidant defense, and blood vessel growth, while downregulating genes associated with inflammation and tissue destruction. Its copper ion delivery also supports essential enzymatic processes including superoxide dismutase activity.</p>
          <p><strong><Link href="/peptides/bpc-157">BPC-157</Link></strong> works through a different set of pathways. It promotes angiogenesis (new blood vessel formation), upregulates growth factor receptors (particularly VEGF and EGF), and modulates the nitric oxide system. Its gastric origin gives it unique stability in acidic environments, which is why it has shown efficacy for gastrointestinal conditions in preclinical models.² BPC-157 also influences the FAK-paxillin pathway, which is essential for cell migration during tissue repair.³</p>
        </section>

        <section>
          <h2>Primary Research Applications</h2>
          <p><strong>GHK-Cu excels in skin biology and anti-aging.</strong> Clinical trials have demonstrated its ability to increase skin density, reduce fine lines and wrinkles, and stimulate collagen production at rates exceeding vitamin C and retinoic acid.⁴ It is also studied for wound healing (with systemic effects demonstrated across species), hair growth promotion, and broad anti-inflammatory activity.⁵</p>
          <p><strong>BPC-157 is strongest in musculoskeletal and gastrointestinal repair.</strong> Preclinical studies show accelerated healing of tendons, ligaments, muscles, and bones. It has also demonstrated protective effects in models of inflammatory bowel disease, gastric ulcers, and liver damage.² Its tissue-repair mechanisms make it the peptide most commonly associated with injury recovery in research literature.</p>
        </section>

        <section>
          <h2>Safety Profiles</h2>
          <p>Both peptides have favorable safety profiles in published literature. GHK-Cu, as a naturally occurring compound in human plasma, has no documented serious adverse effects across decades of research and clinical use as a cosmetic ingredient. BPC-157 has been well-tolerated in extensive animal studies with no reported toxicity, mutagenicity, or organ damage, though comprehensive human safety data from controlled trials is limited.²</p>
        </section>

        <section>
          <h2>Which Should You Consider?</h2>
          <p><strong>Choose GHK-Cu if</strong> your research interest is primarily in skin health, anti-aging, wound healing, or gene expression modulation. Its topical availability and endogenous origin make it the most accessible and lowest-risk option for dermatological applications.</p>
          <p><strong>Choose BPC-157 if</strong> your research focus is on musculoskeletal injury recovery, tendon/ligament repair, or gastrointestinal healing. Its unique gastric stability allows for oral administration in certain protocols.</p>
          <p><strong>Consider both together</strong> if your research covers systemic repair and regeneration — their mechanisms are complementary with no known negative interactions.</p>
        </section>
      </article>
      </AutoLink>

      {/* ═══════ KEY TAKEAWAYS ═══════ */}
      <section className="rounded-2xl bg-violet-900/10 border border-violet-500/20 p-6 space-y-3">
        <h2 className="text-lg font-bold text-zinc-100">Key Takeaways</h2>
        <ul className="space-y-2 text-sm text-zinc-300">
          <li className="flex gap-2"><span className="text-violet-400 font-bold">•</span>GHK-Cu and BPC-157 target fundamentally different biological systems — skin/gene expression vs. musculoskeletal/GI repair.</li>
          <li className="flex gap-2"><span className="text-violet-400 font-bold">•</span>GHK-Cu is naturally occurring and available topically; BPC-157 is synthetic and primarily administered via injection.</li>
          <li className="flex gap-2"><span className="text-violet-400 font-bold">•</span>Neither is FDA-approved for therapeutic use. Both have strong preclinical evidence but limited controlled human trial data.</li>
          <li className="flex gap-2"><span className="text-violet-400 font-bold">•</span>They are frequently combined in research due to complementary, non-overlapping mechanisms.</li>
        </ul>
      </section>

      <ShareBar title={TITLE} url={`https://peptidex.app/compare/${SLUG}`} />

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
          <li>Pickart, L., Vasquez-Soltero, J.M., Margolina, A. &quot;Regenerative and Protective Actions of the GHK-Cu Peptide in the Light of the New Gene Data.&quot; <em>Int. J. Mol. Sci.</em>, 2018; 19(7): 1987.</li>
          <li>Sikiric, P., et al. &quot;Brain-gut axis and pentadecapeptide BPC 157: Theoretical and practical implications.&quot; <em>Curr. Neuropharmacol.</em>, 2016; 14(8): 857–865.</li>
          <li>Chang, C.H., et al. &quot;BPC 157 enhances the tendon-to-bone healing in a rat model of rotator cuff tear.&quot; <em>J. Orthop. Res.</em>, 2023.</li>
          <li>Leyden, J.J., et al. Clinical study evaluating GHK-Cu cream in 71 photoaged women. <em>J. Am. Acad. Dermatol.</em>, 2002.</li>
          <li>Pickart, L., Margolina, A. &quot;GHK Peptide as a Natural Modulator of Multiple Cellular Pathways in Skin Regeneration.&quot; <em>BioMed Res. Int.</em>, 2015; 2015: 648108.</li>
        </ol>
      </section>

      {/* ═══════ DISCLAIMER ═══════ */}
      <div className="rounded-xl bg-amber-950/20 border border-amber-500/20 p-5">
        <div className="flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-amber-200/70 leading-relaxed">
            This comparison is for educational purposes only and does not constitute medical advice. Neither GHK-Cu nor BPC-157 is FDA-approved for human therapeutic use. Consult a healthcare provider before using any peptide compound.{' '}
            <Link href="/disclaimer" className="underline hover:text-amber-200 transition-colors">Read full disclaimer.</Link>
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between pt-6 border-t border-zinc-800 text-xs text-zinc-600">
        <p>Last updated: {DATE_MOD}</p>
        <div className="flex gap-3">
          <Link href="/peptides/ghk-cu" className="text-violet-400 hover:text-violet-300 transition-colors">GHK-Cu Profile →</Link>
          <Link href="/peptides/bpc-157" className="text-violet-400 hover:text-violet-300 transition-colors">BPC-157 Profile →</Link>
        </div>
      </div>
    </div>
  );
}
