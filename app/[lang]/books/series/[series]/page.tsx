import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { copy, type Lang } from "../../../../content";
import { Footer, Header } from "../../../../components";
import { seriesList, getSeries, booksInSeries, booksCopy } from "../../../../books";
import { Breadcrumb, BreadcrumbJsonLd } from "../../../../BookComponents";

export const dynamicParams = false;
export function generateStaticParams() {
  return seriesList.flatMap((series) => [
    { lang: "uk", series: series.slug },
    { lang: "ru", series: series.slug },
  ]);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; series: string }>;
}): Promise<Metadata> {
  const { lang, series: seriesSlug } = await params;
  if (!(lang in copy)) return {};
  const series = getSeries(seriesSlug);
  if (!series) return {};
  const l = lang as Lang;
  const bc = booksCopy[l];
  const title =
    l === "uk"
      ? `Серія «${series.title.uk}» — Сімона Вілар`
      : `Серия «${series.title.ru}» — Симона Вилар`;
  const url = `https://simonavilar.com/${lang}/books/series/${seriesSlug}`;
  const ogImage = {
    url: "https://simonavilar.com/og-image.jpg",
    width: 1200,
    height: 630,
    alt: "Симона Вилар — официальный сайт",
  };
  return {
    title,
    description: series.description[l],
    alternates: {
      canonical: url,
      languages: {
        uk: `https://simonavilar.com/uk/books/series/${seriesSlug}`,
        ru: `https://simonavilar.com/ru/books/series/${seriesSlug}`,
        "x-default": `https://simonavilar.com/ru/books/series/${seriesSlug}`,
      },
    },
    openGraph: {
      title,
      description: series.description[l],
      siteName: bc.authorName,
      locale: l === "uk" ? "uk_UA" : "ru_RU",
      type: "website",
      url,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: series.description[l],
      images: [ogImage.url],
    },
  };
}

export default async function SeriesPage({
  params,
}: {
  params: Promise<{ lang: string; series: string }>;
}) {
  const { lang: raw, series: seriesSlug } = await params;
  if (!(raw in copy)) notFound();
  const series = getSeries(seriesSlug);
  if (!series) notFound();
  const lang = raw as Lang;
  const bc = booksCopy[lang];
  const books = booksInSeries(series);
  const altPaths = {
    ru: `/ru/books/series/${seriesSlug}`,
    uk: `/uk/books/series/${seriesSlug}`,
  };
  const breadcrumbItems = [
    { label: bc.breadcrumbRoot, href: `/${lang}/books` },
    { label: series.title[lang], href: `/${lang}/books/series/${seriesSlug}` },
  ];

  return (
    <>
      <Header lang={lang} altPaths={altPaths} />
      <BreadcrumbJsonLd
        items={breadcrumbItems.map((item) => ({
          ...item,
          href: `https://simonavilar.com${item.href}`,
        }))}
      />
      <main className="privacyPage shell">
        <Breadcrumb items={breadcrumbItems} />
        <header className="privacyHeading">
          <h1>
            {lang === "uk" ? "Серія" : "Серия"} «{series.title[lang]}»
          </h1>
        </header>
        <article className="privacyBody">
          <p className="privacyIntro">{series.description[lang]}</p>
          <section className="seriesBlock">
            <h2>{bc.seriesBooksHeading}</h2>
            <ul className="bookList">
              {books.map((book) => (
                <li key={book.slug}>
                  <a href={`/${lang}/books/${book.slug}`}>{book.title}</a>
                </li>
              ))}
            </ul>
          </section>
          <p>
            <a className="back" href={`/${lang}/books`}>
              ← {bc.allBooks}
            </a>
          </p>
        </article>
      </main>
      <Footer lang={lang} altPaths={altPaths} />
    </>
  );
}
