import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer, Header } from "../../../components";
import { SongVideoFrame } from "../../../SongVideo";
import { arthurSongNews, isArthurNewsLang } from "../../../news";

const siteUrl = "https://simonavilar.com";

export const dynamicParams = false;

export function generateStaticParams() {
  return [{ lang: "ru" }, { lang: "uk" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isArthurNewsLang(lang)) return {};
  const url = `${siteUrl}/${lang}/news/${arthurSongNews.slug}`;
  const imageUrl = `${siteUrl}${arthurSongNews.image[lang]}`;
  const title = `${arthurSongNews.articleTitle[lang]} — ${lang === "uk" ? "Сімона Вілар" : "Симона Вилар"}`;
  const description = arthurSongNews.description[lang];
  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        ru: `${siteUrl}/ru/news/${arthurSongNews.slug}`,
        uk: `${siteUrl}/uk/news/${arthurSongNews.slug}`,
        "x-default": `${siteUrl}/ru/news/${arthurSongNews.slug}`,
      },
    },
    openGraph: {
      title,
      description,
      type: "article",
      url,
      siteName: lang === "uk" ? "Сімона Вілар" : "Симона Вилар",
      locale: lang === "uk" ? "uk_UA" : "ru_RU",
      publishedTime: arthurSongNews.publishedAt,
      images: [{ url: imageUrl, width: 1280, height: 720, alt: arthurSongNews.imageAlt[lang] }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

export default async function ArthurSongNewsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isArthurNewsLang(lang)) notFound();
  const altPaths = {
    ru: `/ru/news/${arthurSongNews.slug}`,
    uk: `/uk/news/${arthurSongNews.slug}`,
    en: "/en/news",
  };

  return (
    <>
      <meta name="robots" content="index, follow, max-image-preview:large" />
      <Header lang={lang} altPaths={altPaths} />
      <main className="newsArticle shell">
        <a className="back" href={`/${lang}/news`}>
          ← {arthurSongNews.backLabel[lang]}
        </a>
        <article>
          <header className="newsArticleHeading">
            <time dateTime={arthurSongNews.publishedAt}>{arthurSongNews.displayDate}</time>
            <h1>{arthurSongNews.articleTitle[lang]}</h1>
          </header>
          <div className="newsArticleBody">
            {arthurSongNews.body[lang].map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <SongVideoFrame
              videoId={arthurSongNews.videoId[lang]}
              title={arthurSongNews.playerTitle[lang]}
            />
            <p className="newsBookLink">
              <a href={`/${lang}/books/rytsar-sveta`}>{arthurSongNews.bookLink[lang]}</a>
            </p>
          </div>
        </article>
      </main>
      <Footer lang={lang} altPaths={altPaths} />
    </>
  );
}
