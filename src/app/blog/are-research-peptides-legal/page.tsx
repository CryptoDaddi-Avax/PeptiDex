import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { ShareBar } from '@/components/share-bar';
import { AutoLink } from '@/components/auto-link';
import { RelatedPosts } from '@/components/related-posts';
import Link from 'next/link';
import { ChevronRight, Calendar, User, ArrowRight, ShieldAlert, BookOpen, AlertCircle } from 'lucide-react';
import { CiteThisPage } from '@/components/cite-page';
import { AuthorBio } from '@/components/author-bio';
import { FeedbackModal } from '@/components/feedback-modal';
import { SHORT_DISCLAIMER } from '@/data/constants';
import { LibraryCallout } from '@/components/library-callout';
import { getAuthorSlug } from '@/data/authors';
import { BlogVendorCallout } from '@/components/blog-vendor-callout';

const POST_TITLE = 'Are Research Peptides Legal? A Country-by-Country Guide';
const POST_DESC = 'Navigating the complex regulatory landscape of purchasing, owning, and researching peptides across North America, Europe, and Australia.';
const AUTHOR = 'Legal Dept';
const DATE_PUB = '2026-02-28';
const DATE_MOD = '2026-04-01';

export const metadata: Metadata = {
  title: `${POST_TITLE} | PeptiDex Research Blog`,
  description: POST_DESC,
  keywords: "are research peptides legal, research peptide laws USA, peptide legal status 2026, research chemical regulations, buying peptides legally",
  alternates: {
    canonical: 'https://peptidex.app/blog/are-research-peptides-legal',
  },
  openGraph: {
    title: `${POST_TITLE} | PeptiDex Research`,
    description: POST_DESC,
    url: 'https://peptidex.app/blog/are-research-peptides-legal',
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

export default function BlogPostTemplate() {
  
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://peptidex.app/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://peptidex.app/blog' },
      { '@type': 'ListItem', position: 3, name: POST_TITLE, item: 'https://peptidex.app/blog/are-research-peptides-legal' },
    ],
  };

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: POST_TITLE,
    description: POST_DESC,
    keywords: metadata.keywords,
    image: 'https://peptidex.app/og-image.png',
    author: { '@type': 'Person', name: AUTHOR },
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
        name: 'Are peptides illegal to buy in the USA?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The vast majority of research peptides sit in a regulatory gray area. In the USA, they are fully legal to purchase strictly as Research Chemicals intended for in-vitro or non-human animal research. They are unequivocally illegal to purchase with the intent of unprescribed human consumption.',
        },
      },
      {
        '@type': 'Question',
        name: 'What does For Research Use Only (FRUO) mean?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'That language legally insulates the distributor from liability by classifying the transaction under the scope of laboratory chemical supply rather than pharmaceutical dispensation.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can Customs seize my research peptides?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'If importing internationally, Customs may scrutinize or seize the shipment if the documentation doesn’t clearly identify it as an unregulated research chemical or if local border constraints explicitly ban that specific molecule (for example, WADA-banned substances moving through strict European sectors).',
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
        { name: '{POST_TITLE}' }
      ]} />

      <div className="rounded-xl bg-amber-950/25 border border-amber-500/20 p-4">
        <div className="flex items-start gap-2">
          <ShieldAlert className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-amber-400/80 leading-relaxed font-medium">
            <strong>CRITICAL LEGAL DISCLAIMER:</strong> This article explicitly does not substitute for qualified legal or medical counsel. {SHORT_DISCLAIMER}
          </p>
        </div>
      </div>

      <header className="space-y-6 border-b border-zinc-800/50 pb-8">
        <h1 className="text-3xl md:text-5xl lg:text-5xl font-extrabold tracking-tight text-zinc-100 leading-tight">
          {POST_TITLE}
        </h1>
        <div className="text-sm font-semibold text-zinc-500 uppercase tracking-widest">
           Last Updated: March 2026
        </div>
        
        <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-400">
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
            <span className="text-emerald-400 font-medium">9 Min Read</span>
          </div>
        </div>
        <ShareBar title={POST_TITLE} url={`https://peptidex.app/blog/are-research-peptides-legal`} />
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <aside className="lg:col-span-4 lg:order-2">
          <div className="sticky top-24 rounded-2xl bg-zinc-900/40 border border-zinc-800 p-6 space-y-4 shadow-xl">
            <h3 className="font-bold text-zinc-100 uppercase tracking-widest text-xs">Table of Contents</h3>
            <ul className="space-y-3 text-sm font-medium text-zinc-400">
              <li><a href="#research-only" className="hover:text-violet-400 transition-colors block">1. The "Research Use Only" Provision</a></li>
              <li><a href="#table" className="hover:text-violet-400 transition-colors block">2. Country-by-Country Breakdown Table</a></li>
              <li><a href="#what-makes-legal" className="hover:text-violet-400 transition-colors block">3. Intent Makes the Crime</a></li>
            </ul>
          </div>
        </aside>

        <AutoLink>
        <main className="lg:col-span-8 lg:order-1 prose prose-invert prose-zinc max-w-none prose-h2:text-2xl prose-h2:mt-12 prose-h3:text-lg prose-a:text-violet-400 hover:prose-a:text-violet-300">
          <p className="lead text-xl text-zinc-300 font-medium" id="research-only">
            It is imperative to understand the boundary conditions surrounding the procurement of peptide compounds, which broadly sit behind a protective, yet fragile, barrier known as the "For Research Use Only" (FRUO) exemption.
          </p>
          <p>
            Operating dynamically outside FDA approval mandates, chemical suppliers are legally permitted to synthesize and transport laboratory chemicals explicitly and exclusively to institutions and private researchers analyzing the properties in a controlled layout.
          </p>
          <p className="p-4 bg-violet-900/10 border border-violet-500/20 rounded-xl my-6 text-zinc-300">
            For researchers sourcing these compounds, <a href="https://aminoclub.com?utm_source=affiliate_marketing&code=PEPTIDEX" target="_blank" rel="noopener noreferrer" className="font-semibold text-violet-400 hover:underline">Amino Club provides COA-verified peptides with documented purity testing. Browse peptides &rarr;</a>
          </p>


          <h2 id="table">Country-by-Country Legal Landscape</h2>
          <div className="overflow-x-auto my-8">
            <table className="w-full text-left text-sm whitespace-nowrap border-collapse">
              <thead className="bg-zinc-900 border border-zinc-700 text-zinc-300">
                <tr>
                  <th className="px-4 py-3 font-semibold border-b border-zinc-700">Region</th>
                  <th className="px-4 py-3 font-semibold border-b border-zinc-700">Legal Status</th>
                  <th className="px-4 py-3 font-semibold border-b border-zinc-700">Key Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                <tr className="hover:bg-zinc-800/20 transition-colors">
                  <td className="px-4 py-3 font-bold border border-zinc-800">USA</td>
                  <td className="px-4 py-3 border border-zinc-800 text-emerald-400">Contextually Legal</td>
                  <td className="px-4 py-3 border border-zinc-800">Legal to purchase strictly as Research Chemicals. Cannot be sold, labeled, or intended for human use.</td>
                </tr>
                <tr className="hover:bg-zinc-800/20 transition-colors">
                  <td className="px-4 py-3 font-bold border border-zinc-800">UK</td>
                  <td className="px-4 py-3 border border-zinc-800 text-emerald-400">Contextually Legal</td>
                  <td className="px-4 py-3 border border-zinc-800">Governed primarily under poisons and chemical act restrictions. Similar research-only loop.</td>
                </tr>
                <tr className="hover:bg-zinc-800/20 transition-colors">
                  <td className="px-4 py-3 font-bold border border-zinc-800">Canada</td>
                  <td className="px-4 py-3 border border-zinc-800 text-amber-400">Strictly Enforced</td>
                  <td className="px-4 py-3 border border-zinc-800">Health Canada tightly intercepts imports mimicking pharmaceuticals. Highly restrictive.</td>
                </tr>
                <tr className="hover:bg-zinc-800/20 transition-colors">
                  <td className="px-4 py-3 font-bold border border-zinc-800">Australia</td>
                  <td className="px-4 py-3 border border-zinc-800 text-red-500">Heavily Banned/Prescription</td>
                  <td className="px-4 py-3 border border-zinc-800">TGA classifies almost all peptides under Schedule 4 (Prescription Only medication). Very high customs seizure rate.</td>
                </tr>
                <tr className="hover:bg-zinc-800/20 transition-colors">
                  <td className="px-4 py-3 font-bold border border-zinc-800">EU</td>
                  <td className="px-4 py-3 border border-zinc-800 text-amber-400">Fragmented</td>
                  <td className="px-4 py-3 border border-zinc-800">Varies radically by country. Eastern EU allows free research trading, while Western hubs (Germany/France) intercept.</td>
                </tr>
                <tr className="hover:bg-zinc-800/20 transition-colors">
                  <td className="px-4 py-3 font-bold border border-zinc-800">New Zealand</td>
                  <td className="px-4 py-3 border border-zinc-800 text-red-500">Prescription Only</td>
                  <td className="px-4 py-3 border border-zinc-800">Medsafe strictly regulates compounds parallel to Australia. Cannot be imported organically.</td>
                </tr>
                <tr className="hover:bg-zinc-800/20 transition-colors">
                  <td className="px-4 py-3 font-bold border border-zinc-800">Japan</td>
                  <td className="px-4 py-3 border border-zinc-800 text-amber-400">Restricted</td>
                  <td className="px-4 py-3 border border-zinc-800">A strict ceiling limits import volume exclusively for certified academic/scientific organizations.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="my-10 rounded-2xl bg-gradient-to-br from-violet-900/40 to-zinc-900 border border-violet-500/30 p-6 shadow-xl relative overflow-hidden group">
            <h4 className="text-xl font-bold text-zinc-100 mb-2 flex flex-wrap items-center gap-2">
              <AlertCircle className="w-5 h-5 text-violet-400" /> Sourcing Confidently
            </h4>
            <p className="text-sm text-zinc-300 mb-6 max-w-lg leading-relaxed">
              We list vendors operating fully within compliant research boundaries located across global markets. Ensure you act consistently with regional statutes by sourcing via verified domestic laboratories where possible.
            </p>
            <Link 
              href="/vendors" 
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold transition-all shadow-lg hover:shadow-violet-500/25"
            >
              View Vetted Research Vendors <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          <h2 id="what-makes-legal">Intent Makes the Crime</h2>
          <p>
            In territories like the USA and the UK, the compound itself is not listed on analog or scheduling documents (outside of a few narrow athletic bans via WADA). Rather, it is the <strong>intent</strong> that defines legality. The moment a researcher communicates intent to ingest the raw testing chemicals, the transaction ceases to be a laboratory chemical sale and becomes the distribution of an unapproved drug. Respecting the research division is paramount.
          </p>

        </main>
        </AutoLink>
      </div>

      
      {/* Explore in Our Library */}
      <LibraryCallout currentSlug="are-research-peptides-legal" peptides={[{"name":"BPC-157","slug":"bpc-157"},{"name":"Semaglutide","slug":"semaglutide"},{"name":"Thymosin Alpha-1","slug":"thymosin-alpha-1"}]} />
{/* Citations */}
      <div className="mb-12">
        <CiteThisPage title={POST_TITLE} url={`https://peptidex.app/blog/are-research-peptides-legal`} />
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

      
      <ShareBar title={POST_TITLE} url={`https://peptidex.app/blog/are-research-peptides-legal`} />
      <BlogVendorCallout />

      <AuthorBio name={AUTHOR} />

      {/* Fact-checked date + Feedback */}
      <div className="flex items-center justify-between pt-6 border-t border-zinc-800/50 text-xs text-zinc-600">
        <span>Last fact-checked: <time dateTime="2026-04-01">2026-04-01</time></span>
        <FeedbackModal pageUrl="https://peptidex.app/blog/are-research-peptides-legal" />
      </div>

      <section className="pt-12 mt-12 border-t border-zinc-800/50">
         <h2 className="text-2xl font-bold text-zinc-100 mb-6">Related Information</h2>
         <div className="flex flex-col md:flex-row gap-4">
            <Link href="/about" className="flex-1 p-4 rounded-xl border border-zinc-800 bg-zinc-900/40 hover:bg-zinc-800 transition-colors">
               <h3 className="font-bold text-zinc-200 mb-2">About PeptiDex</h3>
               <p className="text-sm text-zinc-500">Read our strict editorial standards and research mission.</p>
            </Link>
         </div>
      </section>

    </div>
  );
}
