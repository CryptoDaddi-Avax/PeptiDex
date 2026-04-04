import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

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
      <nav className="flex flex-wrap items-center gap-1.5 text-[13px] text-zinc-500 mb-6" aria-label="Breadcrumb">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <div key={item.name} className="flex items-center gap-1.5">
              {index === 0 && <Home className="w-3 h-3 hidden md:block" />}
              {item.url && !isLast ? (
                <Link
                  href={item.url.replace('https://peptidex.app', '')}
                  className="hover:text-zinc-300 transition-colors"
                >
                  {item.name}
                </Link>
              ) : (
                <span className="text-zinc-300 font-medium">{item.name}</span>
              )}
              {!isLast && <ChevronRight className="w-3 h-3 text-zinc-600" />}
            </div>
          );
        })}
      </nav>
    </>
  );
}
