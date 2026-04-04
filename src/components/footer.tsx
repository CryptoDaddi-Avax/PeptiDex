import Link from 'next/link';
import { ShieldAlert, BookOpen, Beaker, HelpCircle, ArrowRight } from 'lucide-react';
import { getAllPosts } from '@/data/blog';

// The 3 most popular peptide profiles
const POPULAR_PEPTIDES = [
  { name: 'BPC-157', slug: 'bpc-157' },
  { name: 'Semaglutide', slug: 'semaglutide' },
  { name: 'GHK-Cu', slug: 'ghk-cu' },
];

export function Footer() {
  const recentPosts = getAllPosts().slice(0, 3);

  return (
    <footer className="border-t border-zinc-800 bg-zinc-950 mt-12 pb-24 md:pb-12" role="contentinfo">
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          
          {/* Column 1: Brand & Disclaimer */}
          <div className="md:col-span-1 space-y-4">
            <h3 className="text-xl font-bold text-zinc-100">PeptiDex</h3>
            <p className="text-sm text-zinc-400 leading-relaxed">
              The independent, evidence-based peptide research index.
            </p>
            <div className="flex items-start gap-2 pt-2 text-[10px] text-amber-500/80">
              <ShieldAlert className="w-4 h-4 flex-shrink-0" />
              <p>For educational &amp; research purposes only. Not medical advice.</p>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="md:col-span-1 space-y-4">
            <h3 className="text-sm font-bold text-zinc-100 uppercase tracking-widest">Site Map</h3>
            <ul className="space-y-3 text-sm text-zinc-400">
              <li><Link href="/" className="hover:text-violet-400 transition-colors">Home</Link></li>
              <li><Link href="/peptides" className="hover:text-violet-400 transition-colors">Peptide Library</Link></li>
              <li><Link href="/compare" className="hover:text-violet-400 transition-colors">Comparison Hub</Link></li>
              <li><Link href="/blog" className="hover:text-violet-400 transition-colors">Research Blog</Link></li>
              <li><Link href="/faq" className="hover:text-violet-400 transition-colors flex items-center gap-1.5"><HelpCircle className="w-3.5 h-3.5"/> FAQ</Link></li>
            </ul>
          </div>

          {/* Column 3: Explore Peptides */}
          <div className="md:col-span-1 space-y-4">
            <h3 className="text-sm font-bold text-zinc-100 uppercase tracking-widest flex items-center gap-1.5">
              <Beaker className="w-4 h-4 text-emerald-400" /> Popular Profiles
            </h3>
            <ul className="space-y-3 text-sm text-zinc-400">
              {POPULAR_PEPTIDES.map(p => (
                <li key={p.slug}>
                  <Link href={`/peptides/${p.slug}`} className="hover:text-emerald-400 transition-colors flex items-center gap-2 group">
                    {p.name} <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-emerald-400" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Recent Articles */}
          <div className="md:col-span-1 space-y-4">
            <h3 className="text-sm font-bold text-zinc-100 uppercase tracking-widest flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-violet-400" /> Recent Articles
            </h3>
            <ul className="space-y-3 text-sm text-zinc-400">
              {recentPosts.map(post => (
                <li key={post.slug}>
                  <Link href={`/blog/${post.slug}`} className="hover:text-violet-400 transition-colors flex items-center gap-2 group line-clamp-2 leading-tight">
                    {post.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        <div className="mt-12 pt-8 border-t border-zinc-900 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-zinc-600">
          <p>© {new Date().getFullYear()} PeptideX. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/about" className="hover:text-zinc-400 transition-colors">About Us</Link>
            <Link href="/about/editorial-policy" className="hover:text-zinc-400 transition-colors">Editorial Policy</Link>
            <Link href="/disclaimer" className="hover:text-zinc-400 transition-colors">Medical Disclaimer</Link>
            <Link href="/legal" className="hover:text-zinc-400 transition-colors">Privacy &amp; Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
