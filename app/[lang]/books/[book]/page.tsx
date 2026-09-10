import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { copy, type Lang } from "../../../content";
import { Footer, Header } from "../../../components";
import { Newsletter } from "../../../Newsletter";
import {
  bookList,
  getBook,
  seriesForBook,
  booksInSeries,
  booksCopy,
} from "../../../books";
import { Breadcrumb, BreadcrumbJsonLd, BookJsonLd } from "../../../BookComponents";

export const dynamicParams = false;
export function generateStaticParams() {
  return bookList.flatMap((book) => [
    { lang: "uk", book: book.slug },
    { lang: "ru", book: book.slug },
  ]);
}

function metaDescription(lang: Lang, title: string, seriesTitle?: string): string {
  if (lang === "uk") {
    return seriesTitle
      ? `«${title}» — історичний роман Сімони Вілар із циклу «${seriesTitle}». Про книжку та інші твори авторки на офіційному сайті.`
      : `«${title}» — історичний роман Сімони Вілар. Про книжку та інші твори авторки на офіційному сайті.`;
  }
  return seriesTitle
    ? `«${title}» — исторический роман Симоны Вилар из цикла «${seriesTitle}». О книге и других произведениях автора на официальном сайте.`
    : `«${title}» — исторический роман Симоны Вилар. О книге и других произведениях автора на официальном сайте.`;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; book: string }>;
}): Promise<Metadata> {
  const { lang, book: bookSlug } = await params;
  if (!(lang in copy)) return {};
  const book = getBook(bookSlug);
  if (!book) return {};
  const l = lang as Lang;
  const bc = booksCopy[l];
  const series = seriesForBook(book);
  const title =
    l === "uk"
      ? `${book.title} — Сімона Вілар | Офіційний сайт`
      : `${book.title} — Симона Вилар | Официальный сайт`;
  const description = metaDescription(l, book.title, series?.title[l]);
  const url = `https://simonavilar.com/${lang}/books/${bookSlug}`;
  const ogImage = {
    url: "https://simonavilar.com/og-image.jpg",
    width: 1200,
    height: 630,
    alt: "Симона Вилар — официальный сайт",
  };
  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        uk: `https://simonavilar.com/uk/books/${bookSlug}`,
        ru: `https://simonavilar.com/ru/books/${bookSlug}`,
        "x-default": `https://simonavilar.com/ru/books/${bookSlug}`,
      },
    },
    openGraph: {
      title,
      description,
      siteName: bc.authorName,
      locale: l === "uk" ? "uk_UA" : "ru_RU",
      type: "book",
      url,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage.url],
    },
  };
}

export default async function BookPage({
  params,
}: {
  params: Promise<{ lang: string; book: string }>;
}) {
  const { lang: raw, book: bookSlug } = await params;
  if (!(raw in copy)) notFound();
  const book = getBook(bookSlug);
  if (!book) notFound();
  const lang = raw as Lang;
  const bc = booksCopy[lang];
  const series = seriesForBook(book);
  const otherBooks = series
    ? booksInSeries(series).filter((b) => b.slug !== book.slug)
    : [];
  const altPaths = {
    ru: `/ru/books/${bookSlug}`,
    uk: `/uk/books/${bookSlug}`,
  };
  const breadcrumbItems = [
    { label: bc.breadcrumbRoot, href: `/${lang}/books` },
    ...(series
      ? [{ label: series.title[lang], href: `/${lang}/books/series/${series.slug}` }]
      : []),
    { label: book.title, href: `/${lang}/books/${bookSlug}` },
  ];
  const authorUrl = `https://simonavilar.com/${lang}`;

  return (
    <>
      <Header lang={lang} altPaths={altPaths} />
      <BreadcrumbJsonLd
        items={breadcrumbItems.map((item) => ({
          ...item,
          href: `https://simonavilar.com${item.href}`,
        }))}
      />
      <BookJsonLd
        name={book.title}
        authorName={bc.authorName}
        authorUrl={authorUrl}
        seriesName={series?.title[lang]}
      />
      <main className="privacyPage shell">
        <Breadcrumb items={breadcrumbItems} />
        <header className="privacyHeading">
          <h1>{book.title}</h1>
        </header>
        <article className="privacyBody">
          <p className="bookMeta">
            <strong>{bc.author}:</strong> {bc.authorName}
          </p>
          {series && (
            <p className="bookMeta">
              <strong>{bc.series}:</strong>{" "}
              <a href={`/${lang}/books/series/${series.slug}`}>
                {series.title[lang]}
              </a>
            </p>
          )}

          <div className="bookCta">
            <p className="bookCtaText">{bc.ctaText}</p>
            <a href="#newsletter" className="bookCtaButton">
              {bc.ctaButton}
            </a>
          </div>

          <p className="bookDesc">{book.description[lang]}</p>

          {otherBooks.length > 0 && (
            <section className="relatedBooks">
              <h2>{bc.otherSeriesBooks}</h2>
              <ul className="bookList">
                {otherBooks.map((b) => (
                  <li key={b.slug}>
                    <a href={`/${lang}/books/${b.slug}`}>{b.title}</a>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <p>
            <a className="back" href={`/${lang}/books`}>
              ← {bc.allBooks}
            </a>
          </p>
        </article>
      </main>
      <Newsletter lang={lang} />
      <Footer lang={lang} altPaths={altPaths} />
    </>
  );
}
