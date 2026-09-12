import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { biography } from "../../biography";
import { Newsletter } from "../../Newsletter";
import { Footer, Header } from "../../components";
import { copy, type Lang } from "../../content";

export const dynamicParams = false;
export function generateStaticParams() { return [{ lang: "uk" }, { lang: "ru" }, { lang: "en" }]; }

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!(lang in biography)) return {};
  const l = lang as Lang;
  const brand = l === "uk" ? "Сімона Вілар" : l === "en" ? "Simona Vilar" : "Симона Вилар";
  const title = `${biography[l].title} — ${brand}`;
  const url = `https://simonavilar.com/${lang}/biography`;
  const ogImage = { url: "https://simonavilar.com/og-image.jpg", width: 1200, height: 630, alt: "Симона Вилар — официальный сайт" };
  return { title, description: biography[l].paragraphs[0], alternates: { canonical: url, languages: { uk: "https://simonavilar.com/uk/biography", ru: "https://simonavilar.com/ru/biography", en: "https://simonavilar.com/en/biography", "x-default": "https://simonavilar.com/ru/biography" } }, openGraph: { title, description: biography[l].paragraphs[0], siteName: brand, locale: l === "uk" ? "uk_UA" : l === "en" ? "en_US" : "ru_RU", type: "article", url, images: [ogImage] }, twitter: { card: "summary_large_image", title, description: biography[l].paragraphs[0], images: [ogImage.url] } };
}

export default async function BiographyPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params;
  if (!(raw in copy)) notFound();
  const lang = raw as Lang;
  const b = biography[lang];
  return <><Header lang={lang} page="biography"/><main className="bioPage shell"><a className="back" href={`/${lang}`}>← {b.back}</a><div className="bioHeading"><h1>{b.title}</h1></div><div className="bioLayout"><div className="bioPortrait" role="img" aria-label={copy[lang].photo}/><article className="bioText">{b.paragraphs.map((p)=><p key={p}>{p}</p>)}</article></div></main><Newsletter lang={lang}/><Footer lang={lang} page="biography"/></>;
}
