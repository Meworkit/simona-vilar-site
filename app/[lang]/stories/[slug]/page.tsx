import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { copy, type Lang } from "../../../content";
import { Footer, Header } from "../../../components";
import { getStory, relatedBook, stories, storiesCopy, storyTypeLabel } from "../../../stories";

const siteUrl = "https://simonavilar.com";

export const dynamicParams = false;

export function generateStaticParams() {
  return stories.flatMap((story) =>
    (["ru", "uk", "en"] as Lang[]).map((lang) => ({ lang, slug: story.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!(lang in copy)) return {};
  const story = getStory(slug);
  if (!story) return {};
  const l = lang as Lang;
  const url = `${siteUrl}/${l}/stories/${story.slug}`;
  const imageUrl = `${siteUrl}${story.image}`;
  const brand = l === "uk" ? "Сімона Вілар" : l === "en" ? "Simona Vilar" : "Симона Вилар";
  return {
    title: story.seoTitle[l],
    description: story.metaDescription[l],
    alternates: {
      canonical: url,
      languages: {
        ru: `${siteUrl}/ru/stories/${story.slug}`,
        uk: `${siteUrl}/uk/stories/${story.slug}`,
        en: `${siteUrl}/en/stories/${story.slug}`,
        "x-default": `${siteUrl}/ru/stories/${story.slug}`,
      },
    },
    openGraph: {
      title: story.seoTitle[l],
      description: story.metaDescription[l],
      siteName: brand,
      locale: l === "uk" ? "uk_UA" : l === "en" ? "en_US" : "ru_RU",
      type: "article",
      url,
      publishedTime: story.publishedAt,
      modifiedTime: story.modifiedAt,
      images: [
        {
          url: imageUrl,
          width: story.imageWidth,
          height: story.imageHeight,
          alt: story.imageAlt[l],
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: story.seoTitle[l],
      description: story.metaDescription[l],
      images: [imageUrl],
    },
  };
}

export default async function StoryPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang: raw, slug } = await params;
  if (!(raw in copy)) notFound();
  const story = getStory(slug);
  if (!story) notFound();
  const lang = raw as Lang;
  const labels = storiesCopy[lang];
  const related = relatedBook(story, lang);
  const altPaths = {
    ru: `/ru/stories/${slug}`,
    uk: `/uk/stories/${slug}`,
    en: `/en/stories/${slug}`,
  };
  const storyUrl = `${siteUrl}/${lang}/stories/${slug}`;
  const imageUrl = `${siteUrl}${story.image}`;
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: story.title[lang],
    description: story.metaDescription[lang],
    image: [imageUrl],
    author: { "@id": `${siteUrl}/#simona-vilar` },
    datePublished: story.publishedAt,
    dateModified: story.modifiedAt,
    mainEntityOfPage: { "@type": "WebPage", "@id": storyUrl },
    inLanguage: lang,
    ...(related
      ? {
          about: {
            "@type": "Book",
            name: related.title,
            url: `${siteUrl}/${lang}/books/${related.book.slug}`,
          },
        }
      : {}),
  };

  return (
    <>
      <meta name="robots" content="index, follow, max-image-preview:large" />
      <Header lang={lang} altPaths={altPaths} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <main className="storyPage shell">
        <nav className="storyBreadcrumb" aria-label="Breadcrumb">
          <a href={`/${lang}/stories`}>{labels.sectionTitle}</a>
          <span aria-hidden="true">/</span>
          <span>{storyTypeLabel(story, lang)}</span>
        </nav>
        <article className="storyArticle">
          <header className="storyArticleHeading">
            <h1>{story.title[lang]}</h1>
          </header>
          <figure className="storyHero" style={{ maxWidth: Math.min(story.imageWidth, 850) }}>
            <Image
              src={story.image}
              alt={story.imageAlt[lang]}
              width={story.imageWidth}
              height={story.imageHeight}
              sizes="(max-width: 850px) 100vw, 850px"
              priority
            />
          </figure>
          <div className="storyReading">
            {story.type !== "excerpt" && (
              <p className="storyIntro">{story.preview[lang]}</p>
            )}
            <div className="storyText">
              {story.body[lang].map((paragraph, index) => (
                <p className={paragraph === "…" ? "storyEllipsis" : undefined} key={index}>
                  {paragraph.split("\n").map((line, lineIndex) => (
                    <span key={lineIndex}>
                      {lineIndex > 0 && <br />}
                      {line}
                    </span>
                  ))}
                </p>
              ))}
            </div>
            {related && (
              <section className="storyRelatedBook">
                <p>{labels.bookSection}</p>
                <h2>{related.title}</h2>
                {related.seriesTitle && <p>{related.seriesTitle}</p>}
                <a href={`/${lang}/books/${related.book.slug}`}>{labels.bookDetails} →</a>
              </section>
            )}
            <a className="storyBack" href={`/${lang}/stories`}>
              ← {labels.allStories}
            </a>
          </div>
        </article>
      </main>
      <Footer lang={lang} altPaths={altPaths} />
    </>
  );
}
