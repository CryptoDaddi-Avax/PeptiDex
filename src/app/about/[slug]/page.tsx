import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronRight, ExternalLink, ArrowRight, BookOpen, Calendar, BadgeCheck, Award } from 'lucide-react';
import { getAllAuthorSlugs, getAuthorBySlug, getAuthorSlug, getCanonicalSlug } from '@/data/authors';
import { blogPosts, formatDate } from '@/data/blog';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllAuthorSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { slug } = await props.params;
  const author = getAuthorBySlug(slug);
  if (!author) return {};

  const canonicalSlug = getCanonicalSlug(slug);

  return {
    title: `${author.name} — ${author.title}`,
    description: author.bio.slice(0, 160),
    alternates: {
      canonical: `https://peptidex.app/team/${canonicalSlug}`,
    },
    openGraph: {
      title: `${author.name} — ${author.title}`,
      description: author.bio.slice(0, 160),
      url: `https://peptidex.app/team/${canonicalSlug}`,
      type: 'profile',
      images: [{ url: author.image, width: 400, height: 400 }],
    },
  };
}

export default async function AuthorProfilePage(props: Props) {
  const { slug } = await props.params;
  const author = getAuthorBySlug(slug);
  if (!author) notFound();

  // Get blog posts by this author
  const authorPosts = blogPosts
    .filter((p) => getAuthorSlug(p.author) === slug)
    .sort((a, b) => new Date(b.datePublished).getTime() - new Date(a.datePublished).getTime());

  // JSON-LD Person Schema
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: author.name,
    jobTitle: author.title,
    image: `https://peptidex.app${author.image}`,
    description: author.bio,
    url: `https://peptidex.app/about/${slug}`,
    worksFor: {
      '@type': 'Organization',
      name: 'PeptiDex',
      url: 'https://peptidex.app',
    },
    sameAs: author.sameAs.length > 0 ? author.sameAs : undefined,
    knowsAbout: author.expertise,
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://peptidex.app/' },
      { '@type': 'ListItem', position: 2, name: 'About', item: 'https://peptidex.app/about' },
      { '@type': 'ListItem', position: 3, name: author.name, item: `https://peptidex.app/about/${slug}` },
    ],
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-12 space-y-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm text-zinc-500" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-zinc-300 transition-colors">Home</Link>
        <ChevronRight className="w-4 h-4" />
        <Link href="/about" className="hover:text-zinc-300 transition-colors">About</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-zinc-300 font-medium">{author.name}</span>
      </nav>

      {/* ═══════ HERO: AUTHOR PROFILE ═══════ */}
      <header className="rounded-2xl bg-gradient-to-br from-zinc-900/80 via-zinc-900/60 to-violet-950/30 border border-zinc-800 p-6 md:p-10 relative overflow-hidden">
        {/* Decorative glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-violet-500/5 blur-[80px] rounded-full pointer-events-none" />

        <div className="flex flex-col md:flex-row items-start gap-6 md:gap-8 relative z-10">
          {/* Avatar */}
          <div className="w-28 h-28 md:w-36 md:h-36 rounded-2xl overflow-hidden border-2 border-violet-500/30 shadow-lg shadow-violet-500/10 flex-shrink-0 relative bg-zinc-800">
            <Image
              src={author.image}
              alt={author.imageAlt}
              fill
              className="object-cover"
              sizes="144px"
              unoptimized
              priority
            />
          </div>

          <div className="flex-1 space-y-4">
            {/* Name + Title */}
            <div>
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-zinc-100">
                  {author.name}
                </h1>
                <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                  <BadgeCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-[10px] font-semibold text-emerald-400 uppercase tracking-wider">Verified Author</span>
                </div>
              </div>
              <p className="text-sm md:text-base text-violet-400 font-medium mt-1">{author.title}</p>
            </div>

            {/* Bio */}
            <p className="text-sm md:text-[15px] text-zinc-300 leading-relaxed">
              {author.bio}
            </p>

            {/* Credential Links */}
            <div className="flex flex-wrap gap-2.5 pt-1">
              {author.links.map((cred) => (
                <a
                  key={cred.label}
                  href={cred.url}
                  target={cred.url.startsWith('/') ? undefined : '_blank'}
                  rel={cred.url.startsWith('/') ? undefined : 'noopener noreferrer'}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-400 hover:text-violet-400 transition-colors border border-zinc-800 rounded-lg px-3 py-1.5 hover:border-violet-500/30 bg-zinc-950/50"
                >
                  <ExternalLink className="w-3 h-3" />
                  {cred.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* ═══════ EXPERTISE AREAS ═══════ */}
      <section>
        <div className="flex items-center gap-2.5 mb-5">
          <Award className="w-5 h-5 text-violet-400" />
          <h2 className="text-xl font-bold text-zinc-100">Areas of Expertise</h2>
        </div>
        <div className="flex flex-wrap gap-2.5">
          {author.expertise.map((area) => (
            <span
              key={area}
              className="px-4 py-2 rounded-xl bg-violet-500/10 border border-violet-500/20 text-sm font-medium text-violet-300"
            >
              {area}
            </span>
          ))}
        </div>
      </section>

      {/* ═══════ PUBLISHED ARTICLES ═══════ */}
      <section>
        <div className="flex items-center gap-2.5 mb-5">
          <BookOpen className="w-5 h-5 text-emerald-400" />
          <h2 className="text-xl font-bold text-zinc-100">
            Published Articles ({authorPosts.length})
          </h2>
        </div>

        {authorPosts.length > 0 ? (
          <div className="space-y-3">
            {authorPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="flex items-start gap-4 p-4 rounded-xl bg-zinc-900/40 border border-zinc-800/60 hover:border-violet-500/30 transition-all group"
              >
                {/* Image thumbnail */}
                {post.image && (
                  <div className="w-20 h-14 rounded-lg overflow-hidden flex-shrink-0 relative bg-zinc-800 hidden sm:block">
                    <Image
                      src={post.image}
                      alt={post.imageAlt || post.title}
                      fill
                      className="object-cover"
                      sizes="80px"
                      unoptimized
                    />
                  </div>
                )}

                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-bold text-zinc-100 group-hover:text-violet-400 transition-colors line-clamp-1 mb-1">
                    {post.title}
                  </h3>
                  <p className="text-xs text-zinc-500 line-clamp-1 mb-2">{post.excerpt}</p>
                  <div className="flex items-center gap-3 text-[11px] text-zinc-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {formatDate(post.datePublished)}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-500 font-medium">
                      {post.category}
                    </span>
                  </div>
                </div>

                <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:text-violet-400 group-hover:translate-x-1 transition-all flex-shrink-0 mt-2" />
              </Link>
            ))}
          </div>
        ) : (
          <div className="rounded-xl bg-zinc-900/40 border border-zinc-800/60 p-6 text-center">
            <p className="text-sm text-zinc-500">No published articles yet.</p>
          </div>
        )}
      </section>

      {/* ═══════ CTA: BACK TO TEAM ═══════ */}
      <div className="rounded-2xl bg-zinc-900/40 border border-zinc-800 p-6 text-center">
        <p className="text-sm text-zinc-400 mb-4">
          Learn more about our editorial standards and the full PeptiDex team.
        </p>
        <Link
          href="/about"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-sm font-bold transition-all shadow-lg hover:shadow-violet-500/25"
        >
          Meet the Full Team <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Disclaimer */}
      <div className="border-t border-zinc-800 pt-6">
        <p className="text-xs text-zinc-500 leading-relaxed text-center">
          PeptiDex is an independent educational platform. Author credentials are self-reported and verified internally. 
          Nothing on this page constitutes medical advice. All content is for research and educational purposes only.
        </p>
      </div>
    </div>
  );
}
