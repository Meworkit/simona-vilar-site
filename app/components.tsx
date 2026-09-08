import Link from "next/link";
import { copy, email, type Lang } from "./content";

type LocalizedPage = "biography" | "news" | "privacy";

function localizedPath(
  lang: Lang,
  page?: LocalizedPage,
  detail = false,
) {
  if (detail) return `/${lang}/news/official-statement`;
  if (page) return `/${lang}/${page}`;
  return `/${lang}`;
}

export function Header({
  lang,
  detail = false,
  page,
}: {
  lang: Lang;
  detail?: boolean;
  page?: LocalizedPage;
}) {
  const c = copy[lang];
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
            href={localizedPath("uk", page, detail)}
          >
            UA
          </Link>
          ·
          <Link
            aria-current={lang === "ru" ? "page" : undefined}
            href={localizedPath("ru", page, detail)}
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
              <p className={after === undefined ? undefined : "statementKey"} key={p}>
                {after === undefined ? p : <>{before}<strong>{emphasized}</strong>{after}</>}
              </p>
            );
          })}
          <p>
            {c.offer} <a href={`mailto:${email}`}>{email}</a>
          </p>
          <p>{c.notice}</p>
          <div className="statementMeta">
            <p className="sign">{c.signature}</p>
            <time className="statementPublished" dateTime="2026-09-07">
              {c.date}
            </time>
          </div>
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
export function Footer({
  lang,
  page,
  detail = false,
}: {
  lang: Lang;
  page?: LocalizedPage;
  detail?: boolean;
}) {
  return (
    <footer>
      <div className="shell foot">
        <div>
          <b>Симона Вилар</b>
          <a href={`mailto:${email}`}>{email}</a>
        </div>
        <span>© 2026 Simona Vilar</span>
        <div className="footerLanguages" aria-label="Language">
          <Link aria-current={lang === "uk" ? "page" : undefined} href={localizedPath("uk", page, detail)}>UA</Link>
          <span aria-hidden="true">·</span>
          <Link aria-current={lang === "ru" ? "page" : undefined} href={localizedPath("ru", page, detail)}>RU</Link>
        </div>
      </div>
    </footer>
  );
}
