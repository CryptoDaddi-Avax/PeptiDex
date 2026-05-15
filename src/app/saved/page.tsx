'use client';

import Link from 'next/link';
import { useSavedItems, type SavedItemType } from '@/hooks/useSavedItems';
import { Heart, BookOpen, Beaker, Target, FileText } from 'lucide-react';
import './saved-redesign.css';

const TYPE_CONFIG: Record<SavedItemType, { label: string; icon: typeof BookOpen; href: (slug: string) => string }> = {
    peptide: { label: 'Peptides', icon: Beaker, href: (slug) => `/library/${slug}` },
    stack: { label: 'Stacks', icon: BookOpen, href: (slug) => `/stacks/${slug}` },
    goal: { label: 'Goals', icon: Target, href: (slug) => `/best/${slug}` },
    blog: { label: 'Articles', icon: FileText, href: (slug) => `/blog/${slug}` },
};

const TYPE_ORDER: SavedItemType[] = ['peptide', 'stack', 'goal', 'blog'];

export default function SavedPage() {
    const { items, remove, loaded } = useSavedItems();

    if (!loaded) {
        return (
            <main id="main-content">
                <header className="page-header">
                    <div className="page-header-grid" />
                    <div className="page-header-wrap">
                        <div className="breadcrumb">
                            <Link href="/">Home</Link>
                            <span className="sep">/</span>
                            <span className="current">Saved</span>
                        </div>
                        <div className="section-label">§ Your Library</div>
                        <h1 className="page-title">
                            Saved <em>items</em><br />&amp; bookmarks.
                        </h1>
                        <p className="page-subtitle">Loading your saved items…</p>
                    </div>
                </header>
            </main>
        );
    }

    // Group by type
    const grouped = TYPE_ORDER.map((type) => ({
        type,
        config: TYPE_CONFIG[type],
        items: items.filter((i) => i.type === type),
    })).filter((g) => g.items.length > 0);

    return (
        <main id="main-content">
                <header className="page-header">
                    <div className="page-header-grid" />
                    <div className="page-header-wrap">
                        <div className="breadcrumb">
                            <Link href="/">Home</Link>
                            <span className="sep">/</span>
                            <span className="current">Saved</span>
                        </div>
                        <div className="section-label">§ Your Library</div>
                        <h1 className="page-title">
                            Saved <em>items</em><br />&amp; bookmarks.
                        </h1>
                        <p className="page-subtitle">
                            {items.length > 0
                                ? `${items.length} item${items.length !== 1 ? 's' : ''} saved. Stored locally in your browser.`
                                : 'Bookmark peptide profiles, goal pages, and stacks for quick access.'}
                        </p>
                    </div>
                </header>

                <div className="container">
                    {items.length === 0 ? (
                        <div className="saved-empty">
                            <div className="icon">★</div>
                            <h2>Nothing saved <em>yet</em>.</h2>
                            <p>
                                Bookmark peptide profiles, save goal pages, and flag stacks you want to
                                come back to. Saved items appear here for quick access.
                            </p>
                            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                                <Link href="/library" className="btn-primary">
                                    <span>Browse the library</span>
                                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                                        <path d="M1 8h14M9 2l6 6-6 6" stroke="currentColor" strokeWidth="1.5" />
                                    </svg>
                                </Link>
                                <Link href="/stacks" className="btn-ghost">View stacks</Link>
                            </div>
                        </div>
                    ) : (
                        <div className="saved-list">
                            {grouped.map(({ type, config, items: groupItems }) => (
                                <div key={type} style={{ marginBottom: 48 }}>
                                    <div className="section-label">{config.label}</div>
                                    {groupItems.map((item) => {
                                        const Icon = config.icon;
                                        return (
                                            <div key={`${item.type}-${item.slug}`} className="saved-item">
                                                <div className="saved-icon">
                                                    <Icon size={18} />
                                                </div>
                                                <Link href={config.href(item.slug)} style={{ textDecoration: 'none', color: 'inherit' }}>
                                                    <h4>{item.title}</h4>
                                                    <div className="saved-meta">
                                                        {item.type} · Saved {new Date(item.savedAt).toLocaleDateString()}
                                                    </div>
                                                </Link>
                                                <div className="saved-actions">
                                                    <button
                                                        className="saved-remove"
                                                        onClick={() => remove(item.type, item.slug)}
                                                        aria-label="Remove"
                                                        title="Remove from saved"
                                                    >
                                                        <Heart size={14} fill="var(--gold)" stroke="var(--gold)" />
                                                    </button>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                
            </main>
    );
}
