import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { copy, email, type Lang } from "../content";
import { biography } from "../biography";
import { Newsletter } from "../Newsletter";
import { Footer, Header, Statement, WebPageJsonLd } from "../components";
import { StoryPreview } from "../StoryPreview";
import { homepageStories, storiesCopy } from "../stories";
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
  const c = copy[lang as Lang],
    url = `https://simonavilar.com/${lang}`,
    brand = lang === "uk" ? "Сімона Вілар" : lang === "en" ? "Simona Vilar" : "Симона Вилар";
  const ogImage = {
    url: "https://simonavilar.com/biography-photo.jpg",
    width: 2000,
    height: 1335,
    alt: c.photo,
  };
  return {
    title: c.title,
    description: c.description,
    alternates: {
      canonical: url,
      languages: {
        uk: "https://simonavilar.com/uk",
        ru: "https://simonavilar.com/ru",
        en: "https://simonavilar.com/en",
        "x-default": "https://simonavilar.com/ru",
      },
    },
    openGraph: {
      title: c.title,
      description: c.description,
      siteName: brand,
      locale: lang === "uk" ? "uk_UA" : lang === "en" ? "en_US" : "ru_RU",
      type: "website",
      url,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: c.title,
      description: c.description,
      images: [ogImage.url],
    },
  };
}
export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: r } = await params;
  if (!(r in copy)) notFound();
  const lang = r as Lang,
    c = copy[lang];
  return (
    <>
      <Header lang={lang} isHome />
      <WebPageJsonLd
        url={`https://simonavilar.com/${lang}`}
        imageUrl="https://simonavilar.com/biography-photo.jpg"
        imageWidth={2000}
        imageHeight={1335}
      />
      <main id="top">
        <section id="statement" className="statementSection shell">
          <Statement lang={lang} />
        </section>
        <section id="about" className="about">
          <Placeholder text={c.photo} />
          <div className="aboutCopy">
            <div className="titleRow">
              <h2>{c.aboutTitle}</h2>
              <span />
            </div>
            {c.about.map((p) => (
              <p className="aboutp" key={p}>
                {p}
              </p>
            ))}
            <a className="more bioLink" href={`/${lang}/biography`}>
              {biography[lang].read} →
            </a>
          </div>
        </section>
        <section id="news" className="news section shell">
          <div className="titleRow newsTitleRow">
            <a href={`/${lang}/news`} aria-label={c.news}>
              <h2>{c.news}</h2>
            </a>
            <span />
            <a className="allNewsLink" href={`/${lang}/news`}>
              {lang === "uk" ? "Усі новини" : lang === "en" ? "All news" : "Все новости"} →
            </a>
          </div>
          <div data-nosnippet="">
            <a className="card" href={`/${lang}/news/official-statement`}>
              <time>08.09.2026</time>
              <div>
                <h3>{c.statement}</h3>
                <p>{c.articleParas.join(" ")}</p>
                <strong>{c.signature}</strong>
              </div>
              <span>{c.read} →</span>
            </a>
          </div>
        </section>
        <section className="homeStories section shell">
          <div className="titleRow homeStoriesTitleRow">
            <h2>{storiesCopy[lang].latestTitle}</h2>
            <span />
            <a className="allNewsLink" href={`/${lang}/stories`}>
              {storiesCopy[lang].allStories} →
            </a>
          </div>
          <div className="homeStoriesList">
            {homepageStories.map((story) => (
              <StoryPreview key={story.id} story={story} lang={lang} compact featured />
            ))}
          </div>
        </section>
        <Newsletter lang={lang} />
        <section id="contact" className="contact section shell">
          <h2>{c.contact}</h2>
          <p>{c.contactText}</p>
          <a href={`mailto:${email}`}>{email}</a>
        </section>
      </main>
      <Footer lang={lang} />
    </>
  );
}
function Placeholder({ text }: { text: string }) {
  return <div className="portrait" role="img" aria-label={text} />;
}
