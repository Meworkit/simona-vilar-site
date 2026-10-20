import { copy, email, type Lang } from "./content";

type LocalizedPage =
  | "biography"
  | "news"
  | "privacy"
  | "subscription-pending"
  | "subscription-confirmed"
  | "books"
  | "stories";

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
  altPaths,
  isHome = false,
}: {
  lang: Lang;
  detail?: boolean;
  page?: LocalizedPage;
  /**
   * Exact ru/uk equivalents of the current page (e.g. a book or series
   * detail route), used instead of the generic `page` lookup so the
   * language switcher preserves the current book/series rather than
   * dropping back to the localized page root.
   */
  altPaths?: Record<Lang, string>;
  /**
   * True only on the homepage: renders the site-name brand mark as the
   * page's single <h1> (for SEO — every other page already has its own
   * <h1> further down, so the brand mark stays a plain <b> there to avoid
   * a duplicate/misplaced heading). Purely semantic — `.brand h1` carries
   * the exact same styling as `.brand b` throughout globals.css.
   */
  isHome?: boolean;
}) {
  const c = copy[lang];
  const navHrefs = [
    `/${lang}/#top`,
    `/${lang}/biography`,
    `/${lang}/books`,
    `/${lang}/stories`,
    `/${lang}/news`,
    `/${lang}/#contact`,
  ];
  const menuLabel = lang === "en" ? "Menu" : "Меню";
  const closeLabel =
    lang === "uk" ? "Закрити меню" : lang === "en" ? "Close menu" : "Закрыть меню";
  const brandName = lang === "uk" ? "Сімона Вілар" : lang === "en" ? "Simona Vilar" : "Симона Вилар";
  return (
    <header>
      <div className="shell head">
        <a className="brand" href={`/${lang}`}>
          {isHome ? <h1>{brandName}</h1> : <b>{brandName}</b>}
          <small>{c.eyebrow}</small>
        </a>
        <input type="checkbox" id="navToggle" className="navToggle" aria-label={menuLabel} />
        <nav id="mainNav" aria-label={menuLabel}>
          <label htmlFor="navToggle" className="navClose" aria-label={closeLabel}>
            ×
          </label>
          {c.nav.map((n, i) => (
            <a key={n} href={navHrefs[i]}>
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
            href={altPaths ? altPaths.uk : localizedPath("uk", page, detail)}
          >
            UA
          </a>
          ·
          <a
            aria-current={lang === "ru" ? "page" : undefined}
            href={altPaths ? altPaths.ru : localizedPath("ru", page, detail)}
          >
            RU
          </a>
          ·
          <a
            aria-current={lang === "en" ? "page" : undefined}
            href={altPaths ? altPaths.en : localizedPath("en", page, detail)}
          >
            EN
          </a>
        </div>
        <label htmlFor="navToggle" className="hamburger" aria-label={menuLabel} aria-controls="mainNav">
          <span></span>
          <span></span>
          <span></span>
        </label>
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
      : lang === "en"
        ? "no longer cooperating with The Mole Publishing House"
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
  altPaths,
}: {
  lang: Lang;
  page?: LocalizedPage;
  detail?: boolean;
  altPaths?: Record<Lang, string>;
}) {
  const brandName = lang === "uk" ? "Сімона Вілар" : lang === "en" ? "Simona Vilar" : "Симона Вилар";
  return (
    <footer>
      <div className="shell foot">
        <div>
          <b>{brandName}</b>
          <a href={`mailto:${email}`}>{email}</a>
        </div>
        <span>© 2026 Simona Vilar</span>
        <div
          className="footerSocials"
          aria-label={lang === "uk" ? "Соціальні мережі" : lang === "en" ? "Social media" : "Социальные сети"}
        >
          <a
            href="https://www.facebook.com/Simona.Vilar/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            title="Facebook"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <path d="M13.7 22v-8h2.7l.4-3h-3.1V9.1c0-.9.3-1.5 1.6-1.5H17V4.9c-.3 0-1.4-.1-2.6-.1-2.6 0-4.4 1.6-4.4 4.5V11H7v3h3v8h3.7Z" />
            </svg>
          </a>
          <a
            href="https://www.youtube.com/@SimVilar"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
            title="YouTube"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1c.5-1.9.5-5.8.5-5.8s0-3.9-.5-5.8ZM9.6 15.6V8.4L15.8 12l-6.2 3.6Z" />
            </svg>
          </a>
        </div>
        <div className="footerLanguages" aria-label="Language">
          <a aria-current={lang === "uk" ? "page" : undefined} href={altPaths ? altPaths.uk : localizedPath("uk", page, detail)}>UA</a>
          <span aria-hidden="true">·</span>
          <a aria-current={lang === "ru" ? "page" : undefined} href={altPaths ? altPaths.ru : localizedPath("ru", page, detail)}>RU</a>
          <span aria-hidden="true">·</span>
          <a aria-current={lang === "en" ? "page" : undefined} href={altPaths ? altPaths.en : localizedPath("en", page, detail)}>EN</a>
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

export function WebPageJsonLd({
  url,
  imageUrl,
  imageWidth,
  imageHeight,
}: {
  url: string;
  imageUrl: string;
  imageWidth: number;
  imageHeight: number;
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    url,
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: imageUrl,
      width: imageWidth,
      height: imageHeight,
    },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
