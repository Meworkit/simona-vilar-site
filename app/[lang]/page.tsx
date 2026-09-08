import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { copy, email, type Lang } from "../content";
import { biography } from "../biography";
import { Newsletter } from "../Newsletter";
import { Footer, Header, Statement } from "../components";
export const dynamicParams = false;
export function generateStaticParams() {
  return [{ lang: "uk" }, { lang: "ru" }];
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!(lang in copy)) return {};
  const c = copy[lang as Lang],
    url = `https://simonavilar.com/${lang}/`;
  return {
    title: c.title,
    description: c.description,
    alternates: { canonical: url, languages: { uk: "/uk/", ru: "/ru/" } },
    openGraph: {
      title: c.title,
      description: c.description,
      siteName: "Симона Вилар",
      locale: lang === "uk" ? "uk_UA" : "ru_RU",
      type: "website",
      url,
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
      <Header lang={lang} />
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
                <Link className="more bioLink" href={`/${lang}/biography`}>
                  {biography[lang].read} →
                </Link>
                <p className="literaryLine">— {c.line}</p>
          </div>
        </section>
        <section id="news" className="news section shell">
          <div className="titleRow newsTitleRow">
            <Link href={`/${lang}/news`} aria-label={c.news}>
              <h2>{c.news}</h2>
            </Link>
            <span />
            <Link className="allNewsLink" href={`/${lang}/news`}>
              {lang === "uk" ? "Усі новини" : "Все новости"} →
            </Link>
          </div>
          <Link className="card" href={`/${lang}/news/official-statement`}>
            <time>07.09.2026</time>
            <div>
              <h3>{c.statement}</h3>
                  <p>{c.paras.slice(1, 3).join(" ")}</p>
              <strong>{c.signature}</strong>
            </div>
            <span>{c.read} →</span>
          </Link>
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
