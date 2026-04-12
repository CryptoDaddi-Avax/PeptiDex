import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { getAuthorByName, getAuthorSlug, type Author } from '@/data/authors';

export function AuthorBio({ name }: { name: string }) {
  const author = getAuthorByName(name);
  const slug = getAuthorSlug(name);

  // Fallback data if no match
  const displayName = author?.name ?? name;
  const displayTitle = author?.title ?? 'Contributor, PeptiDex';
  const displayBio = author?.bio
    ? author.bio.slice(0, 250) + (author.bio.length > 250 ? '...' : '')
    : 'A contributor to the PeptiDex research platform, dedicated to delivering evidence-based peptide education.';
  const displayImage = author?.image;
  const displayImageAlt = author?.imageAlt ?? `${displayName} — PeptiDex contributor`;

  const initials = displayName
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: displayName,
    jobTitle: displayTitle,
    worksFor: {
      '@type': 'Organization',
      name: 'PeptiDex',
      url: 'https://peptidex.app',
    },
    description: displayBio,
    url: `https://peptidex.app/about/${slug}`,
    ...(author?.image ? { image: `https://peptidex.app${author.image}` } : {}),
  };

  return (
    <section className="rounded-2xl bg-zinc-900/60 border border-zinc-800 p-6 md:p-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-5">About the Author</h3>
      <div className="flex items-start gap-4">
        {/* Avatar — image or fallback initials */}
        <Link href={`/about/${slug}`} className="flex-shrink-0 group">
          {displayImage ? (
            <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-violet-500/30 group-hover:border-violet-500/60 transition-colors relative bg-zinc-800">
              <Image
                src={displayImage}
                alt={displayImageAlt}
                fill
                className="object-cover"
                sizes="56px"
                unoptimized
              />
            </div>
          ) : (
            <div className="w-14 h-14 rounded-full bg-violet-500/15 border-2 border-violet-500/30 group-hover:border-violet-500/60 flex items-center justify-center transition-colors">
              <span className="text-sm font-bold text-violet-400">{initials}</span>
            </div>
          )}
        </Link>

        <div className="flex-1 min-w-0">
          <Link href={`/about/${slug}`} className="hover:text-violet-400 transition-colors">
            <p className="text-base font-bold text-zinc-100">{displayName}</p>
          </Link>
          <p className="text-sm text-violet-400 font-medium mb-3">{displayTitle}</p>
          <p className="text-sm text-zinc-400 leading-relaxed mb-4">{displayBio}</p>
          <Link
            href={`/about/${slug}`}
            className="inline-flex items-center gap-1.5 text-sm text-violet-400 hover:text-violet-300 font-medium transition-colors group"
          >
            View full author profile
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
