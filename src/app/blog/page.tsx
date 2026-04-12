import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, Calendar, User, ArrowRight, Clock, BookOpen, Rss } from 'lucide-react';
import { getAllPosts, BLOG_CATEGORIES, formatDate } from '@/data/blog';
import type { BlogCategory } from '@/data/blog';
import { getAuthorSlug } from '@/data/authors';

export const metadata: Metadata = {
  title: 'PeptideX Blog — Peptide Science, Research News & Analysis',
  description: 'Stay current with evidence-based peptide research. Expert analysis of clinical studies, emerging compound trends, regulatory updates, and the science behind peptide therapies.',
  alternates: {
    canonical: 'https://peptidex.app/blog',
    types: { 'application/rss+xml': '/blog/rss.xml' },
  },
  openGraph: {
    title: 'PeptideX Blog — Peptide Science, Research News & Analysis',
    description: 'Evidence-based peptide research analysis, clinical study breakdowns, and regulatory updates from the PeptideX editorial team.',
    url: 'https://peptidex.app/blog',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PeptideX Blog — Peptide Science & Research News',
    description: 'Evidence-based peptide research analysis and clinical study breakdowns.',
    images: ['/og-image.png'],
  },
};

const CATEGORY_COLORS: Record<BlogCategory, { bg: string; text: string; border: string }> = {
  'Research News': { bg: 'bg-emerald-500/15', text: 'text-emerald-300', border: 'border-emerald-500/30' },
  'Peptide Trends': { bg: 'bg-violet-500/15', text: 'text-violet-300', border: 'border-violet-500/30' },
  'Science Explainers': { bg: 'bg-blue-500/15', text: 'text-blue-300', border: 'border-blue-500/30' },
  'Industry Analysis': { bg: 'bg-amber-500/15', text: 'text-amber-300', border: 'border-amber-500/30' },
  'Regulatory Updates': { bg: 'bg-rose-500/15', text: 'text-rose-300', border: 'border-rose-500/30' },
};

export default function BlogIndexPage() {
  const allPosts = getAllPosts();

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://peptidex.app/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://peptidex.app/blog' },
    ],
  };

  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'PeptideX Blog',
    description: 'Evidence-based peptide research analysis, clinical study breakdowns, and regulatory updates.',
    url: 'https://peptidex.app/blog',
    publisher: {
      '@type': 'Organization',
      name: 'PeptideX',
      url: 'https://peptidex.app',
    },
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }} />

      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm text-zinc-500 mb-8" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-zinc-300 transition-colors">Home</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-zinc-300 font-medium">Blog</span>
      </nav>

      {/* ═══════ HERO ═══════ */}
      <header className="space-y-5 mb-12">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="space-y-3 max-w-3xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-100 leading-tight">
              PeptideX Blog
            </h1>
            <p className="text-sm text-violet-400 font-semibold uppercase tracking-widest">
              Peptide Science, Research News &amp; Analysis
            </p>
          </div>
          <Link
            href="/blog/rss.xml"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-xs font-semibold text-zinc-400 hover:text-orange-400 hover:border-orange-500/30 transition-colors"
          >
            <Rss className="w-3.5 h-3.5" /> RSS Feed
          </Link>
        </div>
        <p className="text-[15px] text-zinc-400 leading-relaxed max-w-2xl">
          Evidence-based analysis of clinical studies, emerging compound trends, regulatory developments, and the science behind peptide therapies. Every claim is cited. Every article is reviewed.
        </p>
      </header>

      {/* ═══════ CATEGORY FILTERS ═══════ */}
      <section className="mb-10">
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-4 py-2 rounded-full text-sm font-semibold bg-violet-600 border border-violet-500 text-white">
            All
          </span>
          {BLOG_CATEGORIES.map((cat) => {
            const colors = CATEGORY_COLORS[cat];
            return (
              <span
                key={cat}
                className={`px-4 py-2 rounded-full text-sm font-semibold ${colors.bg} ${colors.text} border ${colors.border} cursor-default`}
              >
                {cat}
              </span>
            );
          })}
        </div>
      </section>

      {/* ═══════ FEATURED POST ═══════ */}
      {allPosts.length > 0 && (() => {
        const featured = allPosts[0];
        const colors = CATEGORY_COLORS[featured.category];
        return (
          <section className="mb-12">
            <Link
              href={`/blog/${featured.slug}`}
              className="block rounded-2xl border border-zinc-800 bg-gradient-to-br from-zinc-900/80 to-zinc-950 overflow-hidden hover:border-violet-500/30 transition-all group"
            >
              <div className="grid grid-cols-1 md:grid-cols-5 gap-0">
                {/* Image */}
                <div className="md:col-span-2 h-56 md:h-auto relative bg-zinc-800/50 overflow-hidden">
                  {featured.image ? (
                    <Image src={featured.image} alt={featured.imageAlt || featured.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" sizes="(max-width: 768px) 100vw, 40vw" unoptimized referrerPolicy="no-referrer" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-violet-900/30 to-zinc-900 flex items-center justify-center">
                      <BookOpen className="w-12 h-12 text-violet-500/30" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-zinc-950/60 hidden md:block" />
                </div>
                {/* Content */}
                <div className="md:col-span-3 p-6 md:p-8 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-violet-400">Latest</span>
                    <span className={`px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest ${colors.bg} ${colors.text} rounded-full border ${colors.border}`}>
                      {featured.category}
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-extrabold text-zinc-100 mb-3 group-hover:text-violet-400 transition-colors leading-snug">
                    {featured.title}
                  </h2>
                  <p className="text-sm text-zinc-400 leading-relaxed mb-5 line-clamp-2">
                    {featured.excerpt}
                  </p>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-500 font-medium">
                    <div className="flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5" />
                      <span>{featured.author}</span>
                    </div>
                    <div className="w-1 h-1 bg-zinc-700 rounded-full" />
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{formatDate(featured.datePublished)}</span>
                    </div>
                    <div className="w-1 h-1 bg-zinc-700 rounded-full" />
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{featured.readingTime}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </section>
        );
      })()}

      {/* ═══════ POST GRID ═══════ */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {allPosts.slice(1).map((post) => {
          const colors = CATEGORY_COLORS[post.category];
          return (
            <article
              key={post.slug}
              className="flex flex-col bg-zinc-900/40 border border-zinc-800/60 rounded-2xl overflow-hidden hover:border-zinc-700 transition-all duration-300 group"
            >
              {/* Image */}
              <Link href={`/blog/${post.slug}`} className="block w-full h-48 relative overflow-hidden bg-zinc-800/30">
                {post.image ? (
                  <Image src={post.image} alt={post.imageAlt || post.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" unoptimized referrerPolicy="no-referrer" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-zinc-800/50 to-zinc-900 flex items-center justify-center">
                    <BookOpen className="w-8 h-8 text-zinc-700" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/20 to-transparent" />
                <div className="absolute bottom-3 left-3 z-10">
                  <span className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest ${colors.bg} ${colors.text} rounded border ${colors.border} backdrop-blur-md`}>
                    {post.category}
                  </span>
                </div>
              </Link>

              {/* Content */}
              <div className="p-5 flex flex-col flex-grow">
                <Link href={`/blog/${post.slug}`}>
                  <h2 className="text-lg font-bold text-zinc-100 mb-2 group-hover:text-violet-400 transition-colors line-clamp-2 leading-snug">
                    {post.title}
                  </h2>
                </Link>
                <p className="text-sm text-zinc-400 leading-relaxed mb-5 flex-grow line-clamp-2">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between pt-3 border-t border-zinc-800/50 mt-auto">
                  <div className="flex items-center gap-3 text-[11px] text-zinc-500 font-medium">
                    <div className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      <span>{post.author}</span>
                    </div>
                    <div className="w-1 h-1 bg-zinc-700 rounded-full" />
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{formatDate(post.datePublished)}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-zinc-600">
                    <Clock className="w-3 h-3" />
                    <span>{post.readingTime}</span>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </section>

      {/* ═══════ SEO CONTENT BLOCK ═══════ */}
      <section className="rounded-2xl bg-zinc-900/30 border border-zinc-800/50 p-6 md:p-8 space-y-4">
        <h2 className="text-lg font-bold text-zinc-100">About This Blog</h2>
        <p className="text-sm text-zinc-400 leading-relaxed">
          The PeptideX Blog is a peer-cited educational resource covering the most important developments in peptide science. Our editorial team reviews published research from PubMed-indexed journals, FDA regulatory filings, and registered clinical trials to deliver accurate, accessible analysis. We do not accept paid placements or sponsored content. All claims are supported by cited sources.
        </p>
        <p className="text-xs text-zinc-500 leading-relaxed italic">
          All content is for educational purposes only. PeptideX does not sell peptides or make therapeutic claims. <Link href="/disclaimer" className="text-violet-400 hover:text-violet-300 transition-colors">Read our full medical disclaimer.</Link>
        </p>
      </section>
    </div>
  );
}
