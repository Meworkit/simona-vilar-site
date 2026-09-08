import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { biography } from "../../biography";
import { Newsletter } from "../../Newsletter";
import { Footer, Header } from "../../components";
import { copy, type Lang } from "../../content";

export const dynamicParams = false;
export function generateStaticParams() { return [{ lang: "uk" }, { lang: "ru" }]; }

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!(lang in biography)) return {};
  const l = lang as Lang;
  const title = `${biography[l].title} — Симона Вилар`;
  const url = `https://simonavilar.com/${lang}/biography`;
  return { title, description: biography[l].paragraphs[0], alternates: { canonical: url, languages: { uk: "/uk/biography", ru: "/ru/biography" } }, openGraph: { title, description: biography[l].paragraphs[0], siteName: "Симона Вилар", locale: l === "uk" ? "uk_UA" : "ru_RU", type: "article", url } };
}

export default async function BiographyPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params;
  if (!(raw in copy)) notFound();
  const lang = raw as Lang;
  const b = biography[lang];
  return <><Header lang={lang} page="biography"/><main className="bioPage shell"><a className="back" href={`/${lang}/`}>← {b.back}</a><div className="bioHeading"><h1>{b.title}</h1></div><div className="bioLayout"><div className="bioPortrait" role="img" aria-label={copy[lang].photo}/><article className="bioText">{b.paragraphs.map((p)=><p key={p}>{p}</p>)}</article></div></main><Newsletter lang={lang}/><Footer lang={lang} page="biography"/></>;
}
