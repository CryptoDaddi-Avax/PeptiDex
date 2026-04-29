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
    <section style={{
      padding: 24,
      background: 'var(--bg-soft)',
      border: '1px solid var(--line)',
    }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <h3 style={{
        fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.25em',
        textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 20,
        display: 'flex', alignItems: 'center', gap: 8,
      }}>
        <span style={{ opacity: 0.7 }}>§</span> About the Author
      </h3>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
        {/* Avatar */}
        <Link href={`/about/${slug}`} style={{ flexShrink: 0 }}>
          {displayImage ? (
            <div style={{
              width: 56, height: 56, overflow: 'hidden',
              border: '1px solid var(--line)',
              position: 'relative', background: 'var(--bg)',
            }}>
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
            <div style={{
              width: 56, height: 56,
              background: 'rgba(201,169,97,0.08)',
              border: '1px solid rgba(201,169,97,0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--gold)' }}>{initials}</span>
            </div>
          )}
        </Link>

        <div style={{ flex: 1, minWidth: 0 }}>
          <Link href={`/about/${slug}`} style={{ textDecoration: 'none' }}>
            <p style={{
              fontFamily: 'var(--sans)', fontSize: 15, fontWeight: 600,
              color: 'var(--ink)', margin: 0, transition: 'color 0.2s',
            }}>{displayName}</p>
          </Link>
          <p style={{
            fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.1em',
            color: 'var(--gold)', marginBottom: 12, marginTop: 2,
          }}>{displayTitle}</p>
          <p style={{
            fontFamily: 'var(--sans)', fontSize: 13, color: 'var(--ink-dim)',
            lineHeight: 1.6, marginBottom: 16,
          }}>{displayBio}</p>
          <Link
            href={`/about/${slug}`}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.15em',
              textTransform: 'uppercase', color: 'var(--gold)',
              textDecoration: 'none', transition: 'opacity 0.2s',
            }}
          >
            View Full Profile <ArrowRight style={{ width: 12, height: 12 }} />
          </Link>
        </div>
      </div>
    </section>
  );
}
