import Link from 'next/link';

export interface BreadcrumbItem {
  name: string;
  url?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      ...(item.url ? { item: item.url } : {}),
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <nav
        className="blog-breadcrumbs"
        style={{
          display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 12,
          fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.2em',
          textTransform: 'uppercase', color: 'var(--ink-mute)', marginBottom: 24,
        }}
        aria-label="Breadcrumb"
      >
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <div key={item.name} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              {item.url && !isLast ? (
                <Link
                  href={item.url.replace('https://peptidex.app', '')}
                  style={{ color: 'var(--ink-mute)', textDecoration: 'none' }}
                >
                  {item.name}
                </Link>
              ) : (
                <span style={{ color: isLast ? 'var(--gold)' : 'var(--ink-dim)', fontWeight: 500 }}>{item.name}</span>
              )}
              {!isLast && <span style={{ color: 'var(--line-strong)' }}>/</span>}
            </div>
          );
        })}
      </nav>
    </>
  );
}
