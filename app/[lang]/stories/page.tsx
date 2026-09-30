import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { copy, type Lang } from "../../content";
import { Footer, Header } from "../../components";
import { StoryPreview } from "../../StoryPreview";
import { stories, storiesCopy } from "../../stories";

export const dynamicParams = false;

export function generateStaticParams() {
  return [{ lang: "ru" }, { lang: "uk" }, { lang: "en" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!(lang in copy)) return {};
  const l = lang as Lang;
  const labels = storiesCopy[l];
  const brand = l === "uk" ? "Сімона Вілар" : l === "en" ? "Simona Vilar" : "Симона Вилар";
  const title = `${labels.sectionTitle} — ${brand}`;
  const url = `https://simonavilar.com/${l}/stories`;
  return {
    title,
    description: labels.indexDescription,
    alternates: {
      canonical: url,
      languages: {
        ru: "https://simonavilar.com/ru/stories",
        uk: "https://simonavilar.com/uk/stories",
        en: "https://simonavilar.com/en/stories",
        "x-default": "https://simonavilar.com/ru/stories",
      },
    },
    openGraph: {
      title,
      description: labels.indexDescription,
      siteName: brand,
      locale: l === "uk" ? "uk_UA" : l === "en" ? "en_US" : "ru_RU",
      type: "website",
      url,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: labels.indexDescription,
    },
  };
}

export default async function StoriesPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: raw } = await params;
  if (!(raw in copy)) notFound();
  const lang = raw as Lang;
  const labels = storiesCopy[lang];

  return (
    <>
      <Header lang={lang} page="stories" />
      <main className="storiesPage shell">
        <header className="storiesHeading">
          <p>{labels.eyebrow}</p>
          <h1>{labels.sectionTitle}</h1>
        </header>
        <div className="storiesList">
          {stories.map((story) => (
            <StoryPreview key={story.id} story={story} lang={lang} />
          ))}
        </div>
      </main>
      <Footer lang={lang} page="stories" />
    </>
  );
}
