import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Calendar, User, ShieldCheck } from 'lucide-react';
import { getAuthorByName, getAuthorSlug } from '@/lib/authors';

interface AuthorBylineProps {
  name: string;
  date?: string;
  variant?: 'compact' | 'full';
  className?: string;
}

export function AuthorByline({ name, date, variant = 'full', className = '' }: AuthorBylineProps) {
  const author = getAuthorByName(name);
  const slug = getAuthorSlug(name);

  // Fallback data if no match
  const displayName = author?.name ?? name;
  const displayTitle = author?.title ?? 'Contributor, PeptiDex';
  const displayBio = author?.bio
    ? author.bio.slice(0, 250) + (author.bio.length > 250 ? '...' : '')
    : 'A contributor to the PeptiDex research platform, dedicated to delivering evidence-based peptide education.';
  const displayImage = author?.photo || author?.image;
  const displayImageAlt = author?.imageAlt ?? `${displayName} — PeptiDex contributor`;

  const initials = displayName
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  const isPlaceholder = displayName.startsWith('[') && displayName.endsWith(']');

  // Variant A: Compact
  if (variant === 'compact') {
    return (
      <div className={`flex flex-wrap items-center gap-3 text-sm text-zinc-400 ${className}`} itemScope itemType="https://schema.org/Person">
        <div className="flex items-center gap-2">
          <User className="w-4 h-4 text-violet-400" aria-hidden="true" />
          <Link 
            href={`/team/${slug}`} 
            className="font-medium text-zinc-200 hover:text-violet-400 transition-colors"
            itemProp="url"
          >
            <span itemProp="name">{displayName}</span>
          </Link>
          {!isPlaceholder && (
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" aria-label="Verified author" />
          )}
        </div>
        
        {date && (
          <>
            <span className="w-1 h-1 rounded-full bg-zinc-700" aria-hidden="true" />
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-zinc-500" aria-hidden="true" />
              <span>Last reviewed {date}</span>
            </div>
          </>
        )}
      </div>
    );
  }

  // Variant B: Full
  return (
    <section 
      className={`rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 ${className}`}
      itemScope 
      itemType="https://schema.org/Person"
    >
      <meta itemProp="name" content={displayName} />
      <meta itemProp="jobTitle" content={displayTitle} />
      <meta itemProp="url" content={`https://peptidex.app/team/${slug}`} />
      {displayImage && <meta itemProp="image" content={`https://peptidex.app${displayImage}`} />}
      
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xs font-bold font-mono text-violet-400 tracking-widest uppercase">§ About the Author</span>
        {!isPlaceholder && (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-semibold text-emerald-400 uppercase tracking-wider">
            <ShieldCheck className="w-3 h-3" /> Verified
          </span>
        )}
      </div>

      <div className="flex flex-col sm:flex-row items-start gap-5">
        {/* Avatar */}
        <Link href={`/team/${slug}`} className="flex-shrink-0" tabIndex={-1} aria-hidden="true">
          {displayImage ? (
            <div className="w-16 h-16 rounded-xl overflow-hidden border border-zinc-700 relative bg-zinc-800">
              <Image
                src={displayImage}
                alt={displayImageAlt}
                fill
                className="object-cover"
                sizes="64px"
                unoptimized
              />
            </div>
          ) : (
            <div className="w-16 h-16 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center">
              <span className="text-lg font-bold text-violet-400">{initials}</span>
            </div>
          )}
        </Link>

        {/* Bio */}
        <div className="flex-1 min-w-0">
          <Link href={`/team/${slug}`} className="group block mb-1">
            <h3 className="text-lg font-bold text-zinc-100 group-hover:text-violet-400 transition-colors">
              {displayName}
            </h3>
          </Link>
          <p className="text-sm font-mono text-violet-400/80 mb-2">{displayTitle}</p>
          <p className="text-sm text-zinc-400 leading-relaxed mb-4" itemProp="description">
            {displayBio}
          </p>
          <Link
            href={`/team/${slug}`}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-violet-400 uppercase tracking-wider hover:text-violet-300 transition-colors"
          >
            View profile <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
