import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { copy, type Lang } from "../../content";
import { Footer, Header } from "../../components";
import { seriesList, bookList, booksInSeries, booksCopy, bookTitle } from "../../books";

export const dynamicParams = false;
export function generateStaticParams() {
  return [{ lang: "uk" }, { lang: "ru" }, { lang: "en" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!(lang in copy)) return {};
  const l = lang as Lang;
  const bc = booksCopy[l];
  const url = `https://simonavilar.com/${lang}/books`;
  const ogImage = {
    url: "https://simonavilar.com/og-image.jpg",
    width: 1200,
    height: 630,
    alt: "Симона Вилар — официальный сайт",
  };
  return {
    title: bc.catalogTitle,
    description: bc.catalogIntro,
    alternates: {
      canonical: url,
      languages: {
        uk: "https://simonavilar.com/uk/books",
        ru: "https://simonavilar.com/ru/books",
        en: "https://simonavilar.com/en/books",
        "x-default": "https://simonavilar.com/ru/books",
      },
    },
    openGraph: {
      title: bc.catalogTitle,
      description: bc.catalogIntro,
      siteName: bc.authorName,
      locale: l === "uk" ? "uk_UA" : l === "en" ? "en_US" : "ru_RU",
      type: "website",
      url,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: bc.catalogTitle,
      description: bc.catalogIntro,
      images: [ogImage.url],
    },
  };
}

export default async function BooksPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: raw } = await params;
  if (!(raw in copy)) notFound();
  const lang = raw as Lang;
  const bc = booksCopy[lang];
  const standalone = bookList.filter((b) => b.series === null);

  return (
    <>
      <Header lang={lang} page="books" />
      <main className="privacyPage shell">
        <header className="privacyHeading">
          <h1>{bc.catalogH1}</h1>
        </header>
        <article className="privacyBody">
          <p className="privacyIntro booksIntro">{bc.catalogIntro}</p>

          {seriesList.map((series) => (
            <section key={series.slug} className="seriesBlock">
              <h2>
                <a href={`/${lang}/books/series/${series.slug}`}>
                  {series.title[lang]}
                </a>
              </h2>
              <p className="seriesDesc">{series.description[lang]}</p>
              <ul className="bookList">
                {booksInSeries(series).map((book) => (
                  <li key={book.slug}>
                    <a href={`/${lang}/books/${book.slug}`}>{bookTitle(book, lang)}</a>
                  </li>
                ))}
              </ul>
            </section>
          ))}

          <section className="seriesBlock">
            <h2>{bc.standaloneHeading}</h2>
            <ul className="bookList">
              {standalone.map((book) => (
                <li key={book.slug}>
                  <a href={`/${lang}/books/${book.slug}`}>{bookTitle(book, lang)}</a>
                </li>
              ))}
            </ul>
          </section>
        </article>
      </main>
      <Footer lang={lang} page="books" />
    </>
  );
}
