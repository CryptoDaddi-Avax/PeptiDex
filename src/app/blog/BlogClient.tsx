"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, Calendar, User, Clock, BookOpen, Rss } from 'lucide-react';
import { getAllPosts, BLOG_CATEGORIES, formatDate } from '@/data/blog';
import type { BlogCategory } from '@/data/blog';
import './blog-redesign.css';

export default function BlogClient() {
    const allPosts = getAllPosts();
    const [filter, setFilter] = useState<BlogCategory | "All">("All");

    const displayedPosts = filter === "All" ? allPosts : allPosts.filter(p => p.category === filter);
    const featured = displayedPosts[0];
    const gridPosts = displayedPosts.slice(1);

    return (
        <>
            {/* ── Editorial Page Header ── */}
            <header className="blog-hero">
                <div className="blog-hero-grid" />
                <div className="blog-hero-inner">
                    <nav className="blog-breadcrumbs">
                        <Link href="/">Home</Link>
                        <span style={{ color: 'var(--line-strong)' }}>/</span>
                        <span style={{ color: 'var(--gold)' }}>Journal</span>
                    </nav>
                    <div style={{
                        fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.25em',
                        textTransform: 'uppercase' as const, color: 'var(--gold)',
                        marginBottom: 24, display: 'flex', alignItems: 'center', gap: 12
                    }}>
                        <span style={{ width: 32, height: 1, background: 'var(--gold)', display: 'inline-block' }} />
                        § Research & Analysis
                    </div>
                    <h1 style={{
                        fontFamily: 'var(--serif)', fontSize: 'clamp(48px, 7vw, 96px)',
                        fontWeight: 300, lineHeight: 1, letterSpacing: '-0.03em',
                        marginBottom: 24, maxWidth: 1100
                    }}>
                        The <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>Journal</em>.
                    </h1>
                    <p style={{ fontSize: 18, color: 'var(--ink-dim)', maxWidth: 680, lineHeight: 1.6, marginBottom: 32 }}>
                        Evidence-based analysis of clinical studies, emerging compound trends, regulatory developments, and the science behind peptide therapies.
                    </p>
                    <div style={{
                        display: 'flex', alignItems: 'center', gap: 24, paddingTop: 32,
                        borderTop: '1px solid var(--line)', flexWrap: 'wrap' as const
                    }}>
                        <div style={{
                            fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.15em',
                            textTransform: 'uppercase' as const, color: 'var(--ink-mute)'
                        }}>
                            Articles: <strong style={{ color: 'var(--gold)', fontWeight: 500 }}>{allPosts.length}</strong>
                        </div>
                        <Link href="/blog/rss.xml" className="blog-rss"><Rss style={{width:14}}/> RSS Feed</Link>
                    </div>
                </div>
            </header>

            {/* ── Main Content ── */}
            <div style={{ maxWidth: 1400, margin: '0 auto', padding: '48px 48px 80px' }}>
                {/* Filter Tabs */}
                <div className="blog-filters">
                    <button onClick={() => setFilter("All")} className={`blog-filter-btn ${filter === "All" ? "active" : ""}`}>All</button>
                    {BLOG_CATEGORIES.map(cat => (
                        <button key={cat} onClick={() => setFilter(cat)} className={`blog-filter-btn ${filter === cat ? "active" : ""}`}>{cat}</button>
                    ))}
                </div>

                {/* Section Label */}
                <div style={{
                    fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.25em',
                    textTransform: 'uppercase' as const, color: 'var(--gold)',
                    marginBottom: 24, display: 'flex', alignItems: 'center', gap: 12
                }}>
                    <span style={{ width: 32, height: 1, background: 'var(--gold)', display: 'inline-block' }} />
                    § {displayedPosts.length} Articles
                </div>

                {/* Featured Post */}
                {featured && (
                    <Link href={`/blog/${featured.slug}`} className="blog-feat">
                        <div className="blog-feat-img">
                            {featured.image ? (
                                <Image src={featured.image} alt={featured.imageAlt || featured.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 40vw" unoptimized referrerPolicy="no-referrer" />
                            ) : (
                                <div style={{width:'100%', height:'100%', display:'flex', alignItems:'center', justifyContent:'center'}}>
                                    <BookOpen style={{width:48, height:48, color:'var(--line-strong)'}}/>
                                </div>
                            )}
                        </div>
                        <div className="blog-feat-content">
                            <div className="blog-feat-meta">
                                <span className="blog-meta-tag">Latest</span>
                                <span className="blog-feat-cat">{featured.category}</span>
                            </div>
                            <h2 className="blog-feat-title">{featured.title}</h2>
                            <p className="blog-feat-excerpt">{featured.excerpt}</p>
                            <div className="blog-meta-footer">
                                <span className="blog-meta-item"><User style={{width:14}}/> {featured.author}</span>
                                <span className="dot" />
                                <span className="blog-meta-item"><Calendar style={{width:14}}/> {formatDate(featured.datePublished)}</span>
                                <span className="dot" />
                                <span className="blog-meta-item"><Clock style={{width:14}}/> {featured.readingTime}</span>
                            </div>
                        </div>
                    </Link>
                )}

                {/* Post Grid */}
                <div className="blog-grid">
                    {gridPosts.map(post => (
                        <Link key={post.slug} href={`/blog/${post.slug}`} className="blog-card">
                            <div className="blog-card-img">
                                {post.image ? (
                                    <Image src={post.image} alt={post.imageAlt || post.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" unoptimized referrerPolicy="no-referrer" />
                                ) : (
                                    <div style={{width:'100%', height:'100%', display:'flex', alignItems:'center', justifyContent:'center'}}>
                                        <BookOpen style={{width:32, height:32, color:'var(--line-strong)'}}/>
                                    </div>
                                )}
                                <span className="blog-card-cat">{post.category}</span>
                            </div>
                            <div className="blog-card-content">
                                <h2 className="blog-card-title">{post.title}</h2>
                                <p className="blog-card-excerpt">{post.excerpt}</p>
                                <div className="blog-card-footer">
                                    <span className="blog-meta-item"><User style={{width:12}}/> {post.author}</span>
                                    <span className="blog-meta-item"><Calendar style={{width:12}}/> {formatDate(post.datePublished)}</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* SEO Block */}
                <div className="blog-seo">
                    <h2>About This Blog</h2>
                    <p>The PeptiDex Blog is a peer-cited educational resource covering the most important developments in peptide science. Our editorial team reviews published research from PubMed-indexed journals, FDA regulatory filings, and registered clinical trials to deliver accurate, accessible analysis. We do not accept paid placements or sponsored content. All claims are supported by cited sources.</p>
                    <p>All content is for educational purposes only. PeptiDex does not sell peptides or make therapeutic claims.</p>
                </div>
            </div>
        </>
    );
}
