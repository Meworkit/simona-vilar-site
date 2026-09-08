import Link from "next/link";
import { copy, email, type Lang } from "./content";
export function Header({
  lang,
  detail = false,
  page,
}: {
  lang: Lang;
  detail?: boolean;
  page?: "biography" | "news" | "privacy";
}) {
  const c = copy[lang],
    other = lang === "uk" ? "ru" : "uk",
    path = detail
      ? `/${other}/news/official-statement`
      : page === "biography"
        ? `/${other}/biography`
        : page === "news"
          ? `/${other}/news`
          : page === "privacy"
            ? `/${other}/privacy`
            : `/${other}/`;
  return (
    <header>
      <div className="shell head">
        <Link className="brand" href={`/${lang}/`}>
          <b>{lang === "uk" ? "Сімона Вілар" : "Симона Вилар"}</b>
          <small>{c.eyebrow}</small>
        </Link>
        <nav>
          {c.nav.map((n, i) => (
            <a
              key={n}
              href={
                i === 1
                  ? `/${lang}/biography`
                  : i === 2
                    ? `/${lang}/news`
                    : `/${lang}/#${["top", "about", "news", "contact"][i]}`
              }
            >
              {n}
            </a>
          ))}
        </nav>
        <span className="feather" aria-hidden="true">
          ❧
        </span>
        <div className="langs" aria-label="Language">
          <Link
            aria-current={lang === "uk" ? "page" : undefined}
            href={
              lang === "uk"
                ? detail
                  ? "/uk/news/official-statement"
                  : "/uk/"
                : page
                  ? `/${page === "privacy" ? "uk/privacy" : page === "news" ? "uk/news" : "uk/biography"}`
                  : path
            }
          >
            UA
          </Link>
          ·
          <Link
            aria-current={lang === "ru" ? "page" : undefined}
            href={
              lang === "ru"
                ? detail
                  ? "/ru/news/official-statement"
                  : "/ru/"
                : page
                  ? `/${page === "privacy" ? "ru/privacy" : page === "news" ? "ru/news" : "ru/biography"}`
                  : path
            }
          >
            RU
          </Link>
        </div>
      </div>
    </header>
  );
}
export function Statement({
  lang,
  link = false,
}: {
  lang: Lang;
  link?: boolean;
}) {
  const c = copy[lang];
  const emphasized =
    lang === "uk"
      ? "не співпрацюю з видавництвом The Mole Publishing House"
      : "не сотрудничаю с издательством The Mole Publishing House";
  return (
    <article className="statement">
      <div className="statementMark" aria-hidden="true">
        !
      </div>
      <div>
        <p className="statementDate">{c.date}</p>
        <h2>{c.statement}</h2>
        <div className="statementText">
          {c.paras.map((p) => {
            const [before, after] = p.split(emphasized);
            return (
              <p key={p}>
                {after === undefined ? p : <>{before}<strong>{emphasized}</strong>{after}</>}
              </p>
            );
          })}
          <p>
            {c.offer} <a href={`mailto:${email}`}>{email}</a>
          </p>
          <p>{c.notice}</p>
          <p className="sign">{c.signature}</p>
          <time className="statementPublished" dateTime="2026-09-07">
            {c.date}
          </time>
        </div>
        {link && (
          <Link className="more" href={`/${lang}/news/official-statement`}>
            {c.read} →
          </Link>
        )}
      </div>
    </article>
  );
}
export function Footer({ lang }: { lang: Lang }) {
  return (
    <footer>
      <div className="shell foot">
        <div>
          <b>Симона Вилар</b>
          <a href={`mailto:${email}`}>{email}</a>
        </div>
        <span>© 2026 Simona Vilar</span>
        <div className="footerLanguages" aria-label="Language">
          <Link aria-current={lang === "uk" ? "page" : undefined} href="/uk/">UA</Link>
          <span aria-hidden="true">·</span>
          <Link aria-current={lang === "ru" ? "page" : undefined} href="/ru/">RU</Link>
        </div>
      </div>
    </footer>
  );
}
