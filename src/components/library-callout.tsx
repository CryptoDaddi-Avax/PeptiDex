"use client";
import Link from 'next/link';
import { BookOpen, ArrowRight, FlaskConical } from 'lucide-react';
import { blogPosts, getRelatedPosts } from '@/data/blog';

interface LibraryCalloutProps {
  peptides: { name: string; slug: string }[];
  currentSlug: string;
}

export function LibraryCallout({ peptides, currentSlug }: LibraryCalloutProps) {
  const relatedBlogPosts = getRelatedPosts(currentSlug, 2);

  return (
    <section style={{ marginTop: 56, marginBottom: 40 }}>
      <div style={{
        padding: 32,
        background: 'rgba(201,169,97,0.04)',
        border: '1px solid rgba(201,169,97,0.2)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <div style={{
            width: 32, height: 32, background: 'rgba(201,169,97,0.08)',
            border: '1px solid rgba(201,169,97,0.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <FlaskConical style={{ width: 14, height: 14, color: 'var(--gold)' }} />
          </div>
          <div>
            <h3 style={{
              fontFamily: 'var(--serif)', fontSize: 16, fontWeight: 400,
              color: 'var(--gold)', margin: 0,
            }}>Explore in Our Library</h3>
            <p style={{
              fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.1em',
              color: 'var(--ink-mute)', margin: 0,
            }}>Deep-dive research profiles for peptides mentioned in this article</p>
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 0,
          border: '1px solid var(--line)',
          marginBottom: 20,
        }}>
          {peptides.slice(0, 3).map((p) => (
            <Link
              key={p.slug}
              href={`/library/${p.slug}`}
              style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '14px 16px',
                background: 'var(--bg-soft)',
                borderRight: '1px solid var(--line)',
                textDecoration: 'none',
                transition: 'all 0.3s',
              }}
            >
              <BookOpen style={{ width: 14, height: 14, color: 'var(--gold)', flexShrink: 0 }} />
              <div style={{ minWidth: 0 }}>
                <p style={{
                  fontFamily: 'var(--sans)', fontSize: 13, fontWeight: 500,
                  color: 'var(--ink)', margin: 0,
                }}>{p.name}</p>
                <p style={{
                  fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.1em',
                  color: 'var(--ink-mute)', margin: 0,
                }}>Research Profile →</p>
              </div>
            </Link>
          ))}
        </div>

        {relatedBlogPosts.length > 0 && (
          <div style={{ borderTop: '1px solid var(--line)', paddingTop: 16 }}>
            <p style={{
              fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.2em',
              textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 500,
              marginBottom: 10, display: 'flex', alignItems: 'center', gap: 8,
            }}>
              <span style={{ opacity: 0.7 }}>§</span> Related Reading
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {relatedBlogPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '10px 16px',
                    background: 'var(--bg-soft)',
                    border: '1px solid var(--line)',
                    textDecoration: 'none',
                    transition: 'all 0.3s',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 0 }}>
                    <span style={{
                      padding: '2px 8px',
                      background: 'rgba(201,169,97,0.08)',
                      border: '1px solid rgba(201,169,97,0.2)',
                      fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.1em',
                      textTransform: 'uppercase', color: 'var(--gold)',
                      flexShrink: 0,
                    }}>{post.category.split(' ')[0]}</span>
                    <span style={{
                      fontFamily: 'var(--sans)', fontSize: 13, color: 'var(--ink-dim)',
                      overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                    }}>{post.title}</span>
                  </div>
                  <ArrowRight style={{ width: 12, height: 12, color: 'var(--ink-mute)', flexShrink: 0, marginLeft: 8 }} />
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
