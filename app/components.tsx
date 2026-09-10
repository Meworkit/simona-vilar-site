import { copy, email, type Lang } from "./content";

type LocalizedPage =
  | "biography"
  | "news"
  | "privacy"
  | "subscription-pending"
  | "subscription-confirmed";

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
        <a className="brand" href={`/${lang}`}>
          <b>{lang === "uk" ? "Сімона Вілар" : "Симона Вилар"}</b>
          <small>{c.eyebrow}</small>
        </a>
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
          <a
            aria-current={lang === "uk" ? "page" : undefined}
            href={localizedPath("uk", page, detail)}
          >
            UA
          </a>
          ·
          <a
            aria-current={lang === "ru" ? "page" : undefined}
            href={localizedPath("ru", page, detail)}
          >
            RU
          </a>
        </div>
      </div>
    </header>
  );
}
export function Statement({
  lang,
  link = false,
  full = false,
}: {
  lang: Lang;
  link?: boolean;
  full?: boolean;
}) {
  const c = copy[lang];
  const emphasized =
    lang === "uk"
      ? "не співпрацюю з видавництвом The Mole Publishing House"
      : "не сотрудничаю с издательством The Mole Publishing House";
  const paras = full ? c.articleParas : c.paras;
  const offer = full ? c.articleOffer : c.offer;
  return (
    <article className="statement">
      <div className="statementMark" aria-hidden="true">
        !
      </div>
      <div>
        <h2>{c.statement}</h2>
        <div className="statementText">
          {full && <p>{c.articleIntro}</p>}
          {paras.map((p) => {
            const [before, after] = p.split(emphasized);
            return (
              <p className={after === undefined ? undefined : "statementKey"} key={p}>
                {after === undefined ? p : <>{before}<strong>{emphasized}</strong>{after}</>}
              </p>
            );
          })}
          <p>
            {offer} <a href={`mailto:${email}`}>{email}</a>
          </p>
          {full && <p>{c.articleNotice}</p>}
          {full && <p>{c.articleClosing}</p>}
          <div className="statementMeta">
            {full ? (
              <>
                <p className="sign">{c.signature}</p>
                <time className="statementPublished" dateTime="2026-09-08">
                  {c.articleDate}
                </time>
              </>
            ) : (
              <p className="sign">
                {c.signature},{" "}
                <time className="statementPublished" dateTime="2026-09-08">
                  {c.date}
                </time>
              </p>
            )}
          </div>
        </div>
        {link && (
          <a className="more" href={`/${lang}/news/official-statement`}>
            {c.read} →
          </a>
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
          <a aria-current={lang === "uk" ? "page" : undefined} href={localizedPath("uk", page, detail)}>UA</a>
          <span aria-hidden="true">·</span>
          <a aria-current={lang === "ru" ? "page" : undefined} href={localizedPath("ru", page, detail)}>RU</a>
        </div>
      </div>
    </footer>
  );
}
export function SubscriptionStatus({
  lang,
  variant,
}: {
  lang: Lang;
  variant: "pending" | "confirmed";
}) {
  const c = copy[lang];
  const data = variant === "pending" ? c.subscriptionPending : c.subscriptionConfirmed;
  return (
    <main className="statusPage">
      <div className={`statusCard${variant === "confirmed" ? " statusCardConfirmed" : ""}`}>
        <span className="statusAccent" aria-hidden="true" />
        <h1>{data.title}</h1>
        {data.body.map((p) => (
          <p key={p}>{p}</p>
        ))}
        {"secondary" in data && <p className="statusSecondary">{data.secondary}</p>}
        {"closing" in data && <p className="statusClosing">{data.closing}</p>}
        <a className="statusButton" href={`/${lang}`}>
          {data.button}
        </a>
      </div>
    </main>
  );
}
