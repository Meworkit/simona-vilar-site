export interface CrumbItem {
  label: string;
  href: string;
}

/**
 * Visible breadcrumb trail. The last item renders as the current page
 * (not a link); every earlier item is a link, matching the site's plain
 * editorial link style.
 */
export function Breadcrumb({ items }: { items: CrumbItem[] }) {
  return (
    <nav className="breadcrumb" aria-label="Breadcrumb">
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        return (
          <span key={item.href}>
            {isLast ? (
              <span aria-current="page">{item.label}</span>
            ) : (
              <a href={item.href}>{item.label}</a>
            )}
            {!isLast && (
              <span className="breadcrumbSep" aria-hidden="true">
                {" "}
                →{" "}
              </span>
            )}
          </span>
        );
      })}
    </nav>
  );
}

export function BreadcrumbJsonLd({ items }: { items: CrumbItem[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      item: item.href,
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function BookJsonLd({
  name,
  authorName,
  authorUrl,
  seriesName,
}: {
  name: string;
  authorName: string;
  authorUrl: string;
  seriesName?: string;
}) {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Book",
    name,
    author: { "@type": "Person", name: authorName, url: authorUrl },
  };
  if (seriesName) {
    data.isPartOf = { "@type": "BookSeries", name: seriesName };
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
