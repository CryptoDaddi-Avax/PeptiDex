import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, Calendar, User, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Peptide Research Blog | Studies, News & Sourcing Guides, PeptiDex',
  description: 'Stay current with the latest peptide research. Weekly breakdowns of clinical studies, protocol guides, vendor COA alerts, and sourcing tips.',
  alternates: {
    canonical: 'https://peptidex.app/blog',
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://peptidex.app/' },
    { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://peptidex.app/blog' },
  ],
};

const CATEGORIES = ['All', 'Research', 'Protocols', 'Vendor News', 'Stacks', 'Beginner Guides'];

const PLACEHOLDER_POSTS = [
  {
    title: 'BPC-157 vs TB-500: What the Research Actually Shows',
    slug: 'bpc-157-vs-tb-500',
    excerpt: 'An in-depth analysis of the synergistic mechanisms between BPC-157 and TB-500 for musculoskeletal tissue repair and inflammation reduction.',
    category: 'Research',
    date: 'March 28, 2026',
    author: 'Dr. E. Vance',
    image: '/images/blog/bpc_tb_dna.png'
  },
  {
    title: 'Best Peptides for Fat Loss: A Research Review',
    slug: 'best-peptides-for-fat-loss',
    excerpt: 'Comparing GLP-1 agonists, AOD-9604, and MOTS-c across clinical trials to determine the most effective peptide pathways for lipid oxidation.',
    category: 'Protocols',
    date: 'March 20, 2026',
    author: 'Editorial Team',
    image: '/images/blog/fat_loss_lipid.png'
  },
  {
    title: 'How to Read a Peptide COA (And Why It Matters)',
    slug: 'how-to-read-a-peptide-coa',
    excerpt: 'Avoid dangerous synthesis byproducts by learning how to properly analyze independent HPLC and mass spectrometry reports before sourcing.',
    category: 'Vendor News',
    date: 'March 15, 2026',
    author: 'Dr. E. Vance',
    image: '/images/blog/coa_lab_graph.png'
  },
  {
    title: 'Ipamorelin vs CJC-1295: Stack Comparison Guide',
    slug: 'ipamorelin-vs-cjc-1295',
    excerpt: 'Understanding the synergistic GHRP and GHRH relationship that maximizes endogenous growth hormone pulses without cortisol spikes.',
    category: 'Stacks',
    date: 'March 10, 2026',
    author: 'Editorial Team',
    image: '/images/blog/cjc_growth_hormone.png'
  },
  {
    title: 'Best Peptide Vendors 2026: Our Sourcing Criteria',
    slug: 'best-peptide-vendors-2026',
    excerpt: 'A transparent look into our rigorous 5-point vetting process used to evaluate and rank research chemical suppliers globally.',
    category: 'Vendor News',
    date: 'March 05, 2026',
    author: 'Editorial Team',
    image: '/images/blog/vendor_secure_crate.png'
  },
  {
    title: 'Are Research Peptides Legal? A Country-by-Country Guide',
    slug: 'are-research-peptides-legal',
    excerpt: 'Navigating the complex regulatory landscape of purchasing, owning, and researching peptides across North America, Europe, and Australia.',
    category: 'Beginner Guides',
    date: 'February 28, 2026',
    author: 'Legal Dept',
    image: '/images/blog/legal_gavel_hologram.png'
  },
];

export default function BlogIndexPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 md:py-12 relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Breadcrumbs UI */}
      <nav className="flex items-center gap-2 text-sm text-zinc-500 mb-8" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-zinc-300 transition-colors">Home</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-zinc-300 font-medium">Blog</span>
      </nav>

      {/* Hero Header */}
      <section className="space-y-6 mb-12">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-zinc-100 leading-tight max-w-4xl">
          Peptide Research Blog, Studies, Protocols &amp; Sourcing News
        </h1>
        <p className="text-lg text-zinc-400 max-w-2xl leading-relaxed">
          Stay current with the latest peptide research. We break down clinical studies, map out protocol frameworks, investigate vendor COA transparency, and provide essential sourcing tips for independent researchers.
        </p>
      </section>

      {/* Categories Filter */}
      <section className="mb-12">
        <div className="flex flex-wrap items-center gap-3">
          {CATEGORIES.map((cat, idx) => (
            <button
              key={idx}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-200 border ${
                idx === 0 
                  ? 'bg-violet-600 border-violet-500 text-white' 
                  : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Blog Post Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {PLACEHOLDER_POSTS.map((post, idx) => (
          <article 
            key={idx} 
            className="flex flex-col bg-zinc-900/40 border border-zinc-800/60 rounded-2xl overflow-hidden hover:bg-zinc-900 transition-colors duration-300 group"
          >
            <Link href={`/blog/${post.slug}`} className="block w-full h-48 border-b border-zinc-800 relative overflow-hidden group/image">
                {post.image ? (
                  <Image src={post.image} alt={post.title} fill className="object-cover transition-transform duration-700 group-hover/image:scale-105" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
                ) : (
                  <div className="w-full h-full bg-zinc-800/50" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/20 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-tr from-violet-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute bottom-4 left-4 z-10">
                  <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest bg-violet-500/20 text-violet-100 rounded border border-violet-500/40 backdrop-blur-md">
                    {post.category}
                  </span>
                </div>
            </Link>

            <div className="p-6 flex flex-col flex-grow">
              <Link href={`/blog/${post.slug}`}>
                <h2 className="text-xl font-bold text-zinc-100 mb-3 group-hover:text-violet-400 transition-colors line-clamp-2">
                  {post.title}
                </h2>
              </Link>
              <p className="text-sm text-zinc-400 leading-relaxed mb-6 flex-grow line-clamp-3">
                {post.excerpt}
              </p>
              
              <div className="flex items-center justify-between pt-4 border-t border-zinc-800/50 mt-auto">
                <div className="flex items-center gap-3 text-xs text-zinc-500 font-medium">
                  <div className="flex items-center gap-1.5 align-middle">
                    <User className="w-3.5 h-3.5 mb-[1px]" />
                    <span>{post.author}</span>
                  </div>
                  <div className="w-1 h-1 bg-zinc-700 justify-center rounded-full" />
                  <div className="flex items-center gap-1.5 align-middle">
                    <Calendar className="w-3.5 h-3.5 mb-[1px]" />
                    <span>{post.date}</span>
                  </div>
                </div>
                  <Link href={`/blog/${post.slug}`} className="text-violet-500 group-hover:translate-x-1 transition-transform">
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </article>
        ))}
      </section>

      {/* SEO Educational Block */}
      <section className="mt-12 p-6 md:p-8 rounded-3xl bg-zinc-900/30 border border-zinc-800/50">
        <h3 className="text-xl font-bold text-zinc-100 mb-4">Advancing Medical Research Literacy</h3>
        <p className="text-sm text-zinc-400 leading-relaxed text-justify">
          The field of synthetic peptide research is evolving rapidly, with novel clinical trials continuously reshaping our understanding of systemic pharmacology. This blog serves as a centralized educational repository, aggregating independent data sets to provide clear, actionable insights for laboratory researchers. By breaking down complex metabolic signaling pathways, analyzing the synergistic interactions of multi-compound protocols, and keeping a firm pulse on global Vendor standards (like independent HPLC/MS COA vetting), we aim to elevate the standard of scientific literacy within the independent research community. Note that all investigations covered in these publications strictly profile preclinical mechanisms; no compounds discussed herein are intended or authorized for direct human therapeutic use.
        </p>
      </section>
    </div>
  );
}
