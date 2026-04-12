"use client";
import Link from 'next/link';
import { BookOpen, ArrowRight, FlaskConical } from 'lucide-react';
import { blogPosts, getRelatedPosts } from '@/data/blog';

interface LibraryCalloutProps {
  /** Peptide slugs to feature, e.g. ['bpc-157', 'ghk-cu'] */
  peptides: { name: string; slug: string }[];
  /** Current blog slug for related post calculation */
  currentSlug: string;
}

/**
 * "Explore in Our Library" callout box for the bottom of blog posts.
 * Links to 2-3 relevant peptide library pages + 1-2 related blog posts.
 */
export function LibraryCallout({ peptides, currentSlug }: LibraryCalloutProps) {
  const relatedBlogPosts = getRelatedPosts(currentSlug, 2);

  return (
    <section className="mt-14 mb-10">
      {/* Peptide Library Links */}
      <div className="rounded-2xl border border-violet-500/20 bg-gradient-to-br from-violet-500/5 via-zinc-900/80 to-zinc-900/60 p-6 backdrop-blur-sm">
        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-8 h-8 rounded-xl bg-violet-500/20 flex items-center justify-center">
            <FlaskConical className="w-4 h-4 text-violet-400" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-violet-300">Explore in Our Library</h3>
            <p className="text-[10px] text-zinc-500">Deep-dive research profiles for peptides mentioned in this article</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 mb-5">
          {peptides.slice(0, 3).map((p) => (
            <Link
              key={p.slug}
              href={`/library/${p.slug}`}
              className="group flex items-center gap-3 p-3 rounded-xl bg-zinc-800/50 border border-zinc-700/50 hover:border-violet-500/30 hover:bg-zinc-800/80 transition-all"
            >
              <div className="w-7 h-7 rounded-lg bg-violet-500/10 flex items-center justify-center flex-shrink-0">
                <BookOpen className="w-3.5 h-3.5 text-violet-400" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-zinc-200 group-hover:text-violet-300 transition-colors truncate">{p.name}</p>
                <p className="text-[10px] text-zinc-500">Research Profile →</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Related Blog Posts */}
        {relatedBlogPosts.length > 0 && (
          <div className="border-t border-zinc-800/50 pt-4">
            <p className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold mb-2.5">Related Reading</p>
            <div className="space-y-2">
              {relatedBlogPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group flex items-center justify-between p-2.5 rounded-lg hover:bg-zinc-800/40 transition-colors"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-violet-500/10 text-violet-400 font-semibold uppercase tracking-wider flex-shrink-0">{post.category.split(' ')[0]}</span>
                    <span className="text-sm text-zinc-300 group-hover:text-violet-300 transition-colors truncate">{post.title}</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-zinc-600 group-hover:text-violet-400 flex-shrink-0 ml-2 transition-colors" />
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
