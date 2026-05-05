import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronRight, ExternalLink, BadgeCheck, Award, GraduationCap, Building2 } from 'lucide-react';
import {
  getAllAuthorSlugs,
  getAuthorBySlug,
  getAuthorSlug,
  getCanonicalSlug,
  getPersonSchema,
} from '@/lib/authors';
import { blogPosts } from '@/data/blog';
import { MedicalDisclaimer } from '@/components/medical-disclaimer';

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

  const cleanBio = author.bio.replace(/\[.*?\]/g, '').trim();
  const description = (cleanBio || `${author.name}, ${author.title} at PeptiDex.`).slice(0, 160);

  const canonicalSlug = getCanonicalSlug(slug);

  return {
    title: `${author.name} — ${author.title} | PeptiDex`,
    description,
    alternates: { canonical: `https://peptidex.app/team/${canonicalSlug}` },
    openGraph: {
      title: `${author.name} — ${author.title}`,
      description,
      url: `https://peptidex.app/team/${canonicalSlug}`,
      type: 'profile',
      images: author.photo ? [{ url: author.photo, width: 400, height: 400 }] : undefined,
    },
  };
}

function isPlaceholder(s: string): boolean {
  return s.startsWith('[') && s.endsWith(']');
}

function bioParagraphs(bio: string): string[] {
  return bio.split(/\n\s*\n/).filter((p) => p.trim().length > 0);
}

export default async function TeamProfilePage(props: Props) {
  const { slug } = await props.params;
  const author = getAuthorBySlug(slug);
  if (!author) notFound();

  const authorPosts = blogPosts
    .filter((p) => getAuthorSlug(p.author) === slug)
    .sort((a, b) => new Date(b.datePublished).getTime() - new Date(a.datePublished).getTime());

  const personSchema = getPersonSchema(author);
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://peptidex.app/' },
      { '@type': 'ListItem', position: 2, name: 'Team', item: 'https://peptidex.app/team' },
      { '@type': 'ListItem', position: 3, name: author.name, item: `https://peptidex.app/team/${slug}` },
    ],
  };

  const verifiedSameAs = author.sameAs.filter((s) => !isPlaceholder(s));
  const realCredentials = author.credentials.filter((c) => !isPlaceholder(c));
  const realAlumni = (author.alumniOf ?? []).filter((a) => !isPlaceholder(a));
  const isUnverified = isPlaceholder(author.name);

  return (
    <main className="max-w-4xl mx-auto px-4 py-8 md:py-12 space-y-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <nav className="flex items-center gap-2 text-sm text-zinc-500" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-zinc-300">Home</Link>
        <ChevronRight className="w-4 h-4" />
        <Link href="/team" className="hover:text-zinc-300">Team</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-zinc-300 font-medium line-clamp-1">{author.name}</span>
      </nav>

      <header className="rounded-2xl bg-gradient-to-br from-zinc-900/80 via-zinc-900/60 to-violet-950/30 border border-zinc-800 p-6 md:p-10">
        <div className="flex flex-col md:flex-row items-start gap-6 md:gap-8">
          <div className="w-28 h-28 md:w-36 md:h-36 rounded-2xl overflow-hidden border-2 border-violet-500/30 flex-shrink-0 relative bg-zinc-800">
            {author.photo && !isPlaceholder(author.imageAlt) ? (
              <Image
                src={author.photo}
                alt={author.imageAlt}
                fill
                className="object-cover"
                sizes="144px"
                unoptimized
                priority
              />
            ) : (
              <span className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-zinc-400">
                {author.name.replace(/\[.*?\]/g, '?').split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase() || '?'}
              </span>
            )}
          </div>

          <div className="flex-1 space-y-4 min-w-0">
            <div>
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-zinc-100">
                  {author.name}
                </h1>
                {isUnverified ? (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-[10px] font-semibold text-amber-400 uppercase tracking-wider">
                    Placeholder — credentials pending
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-semibold text-emerald-400 uppercase tracking-wider">
                    <BadgeCheck className="w-3 h-3" /> Verified
                  </span>
                )}
              </div>
              <p className="text-sm md:text-base text-violet-400 font-medium mt-1">{author.title}</p>
              {author.worksFor && !isPlaceholder(author.worksFor) && (
                <p className="text-sm text-zinc-400 flex items-center gap-1.5 mt-1">
                  <Building2 className="w-3.5 h-3.5" /> {author.worksFor}
                </p>
              )}
            </div>

            <div className="space-y-3 text-sm md:text-[15px] text-zinc-300 leading-relaxed">
              {bioParagraphs(author.bio).map((p, i) => (
                <p key={i} className={isPlaceholder(p) ? 'italic text-amber-400/70' : ''}>
                  {p}
                </p>
              ))}
            </div>

            {verifiedSameAs.length > 0 && (
              <div className="flex flex-wrap gap-2.5 pt-2">
                {author.links
                  .filter((l) => verifiedSameAs.includes(l.url))
                  .map((link) => (
                    <a
                      key={link.url}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-400 hover:text-violet-400 transition-colors border border-zinc-800 rounded-lg px-3 py-1.5 hover:border-violet-500/30 bg-zinc-950/50"
                    >
                      <ExternalLink className="w-3 h-3" />
                      {link.label}
                    </a>
                  ))}
              </div>
            )}
          </div>
        </div>
      </header>

      {realCredentials.length > 0 && (
        <section>
          <h2 className="flex items-center gap-2 text-xl font-bold text-zinc-100 mb-5">
            <GraduationCap className="w-5 h-5 text-violet-400" /> Credentials
          </h2>
          <ul className="space-y-2">
            {realCredentials.map((c) => (
              <li
                key={c}
                className="flex items-start gap-2.5 text-sm text-zinc-300 rounded-lg bg-zinc-900/40 border border-zinc-800/60 px-4 py-2.5"
              >
                <BadgeCheck className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {realAlumni.length > 0 && (
        <section>
          <h2 className="flex items-center gap-2 text-xl font-bold text-zinc-100 mb-5">
            <GraduationCap className="w-5 h-5 text-blue-400" /> Education
          </h2>
          <ul className="space-y-2">
            {realAlumni.map((a) => (
              <li key={a} className="text-sm text-zinc-300">
                {a}
              </li>
            ))}
          </ul>
        </section>
      )}

      {author.specialties.filter((s) => !isPlaceholder(s)).length > 0 && (
        <section>
          <h2 className="flex items-center gap-2 text-xl font-bold text-zinc-100 mb-5">
            <Award className="w-5 h-5 text-violet-400" /> Specialties
          </h2>
          <div className="flex flex-wrap gap-2.5">
            {author.specialties
              .filter((s) => !isPlaceholder(s))
              .map((s) => (
                <span
                  key={s}
                  className="px-4 py-2 rounded-xl bg-violet-500/10 border border-violet-500/20 text-sm font-medium text-violet-300"
                >
                  {s}
                </span>
              ))}
          </div>
        </section>
      )}

      {authorPosts.length > 0 && (
        <section>
          <h2 className="flex items-center gap-2 text-xl font-bold text-zinc-100 mb-5">
            Articles by {author.name.replace(/\[.*?\]/g, '').trim() || 'this author'} ({authorPosts.length})
          </h2>
          <div className="space-y-3">
            {authorPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="block p-4 rounded-xl bg-zinc-900/40 border border-zinc-800/60 hover:border-violet-500/30 transition-all"
              >
                <h3 className="text-sm font-bold text-zinc-100 mb-1">{post.title}</h3>
                <p className="text-xs text-zinc-500 line-clamp-1">{post.excerpt}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      <MedicalDisclaimer variant="compact" />
    </main>
  );
}
