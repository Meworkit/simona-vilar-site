import type { Lang } from "./content";

const text = {
  uk: { title: "Отримувати новини про авторку та наступні публікації", subtitle: "Нові публікації, новини та важливі оголошення авторки.", placeholder: "Ваш email", button: "Підписатися", consent: "Підписуючись, ви погоджуєтеся отримувати новини Симони Вілар електронною поштою. Відписатися можна в будь-який момент.", privacy: "Політика конфіденційності" },
  ru: { title: "Получать новости об авторе и следующих публикациях", subtitle: "Новые публикации, новости и важные объявления автора.", placeholder: "Ваш email", button: "Подписаться", consent: "Подписываясь, вы соглашаетесь получать новости Симоны Вилар по электронной почте. Отписаться можно в любое время.", privacy: "Политика конфиденциальности" },
  en: { title: "Get news about the author and upcoming publications", subtitle: "New publications, news, and important announcements from the author.", placeholder: "Your email", button: "Subscribe", consent: "By subscribing, you agree to receive Simona Vilar's news by email. You can unsubscribe at any time.", privacy: "Privacy Policy" },
} as const;

// Brevo signup form. Both /ru and /uk submit here — one shared Russian-flow
// list with double opt-in handled entirely by Brevo (see form action's own
// dashboard config for the /ru/subscription-pending and
// /ru/subscription-confirmed redirects). Values below (action URL, EMAIL
// field name, the two hidden fields) are copied verbatim from Brevo's public
// embed code — none of this is a secret, it's the same endpoint Brevo hands
// out for embedding.
const BREVO_FORM_ACTION =
  "https://9bfc7f37.sibforms.com/serve/MUIFAApmT5fj474ePss9nlC9yMWNjcfgsRBMmI6nQVA16d5wuEhYj50ITfuFDxfxDzRc5_tp0hTKb0POHndNLDR04Iw8NMM2qiO7loSarrH1KGL9a6OqZAmg6gJlKXvSu5Pykn3nNv1Sr-uP5vW_SBLwqwXReMBqmMrPZR1MAaGmIoTxBl6EdkYKI4r26O6-BFPg1ESENRhIk8IYcg==";

export function Newsletter({ lang }: { lang: Lang }) {
  const t = text[lang];
  return (
    <section id="newsletter" className="newsletter shell" aria-labelledby="newsletter-title">
      <h2 id="newsletter-title">{t.title}</h2>
      <p>{t.subtitle}</p>
      <form action={BREVO_FORM_ACTION} method="post">
        <label className="srOnly" htmlFor={`newsletter-${lang}`}>{t.placeholder}</label>
        <input
          id={`newsletter-${lang}`}
          name="EMAIL"
          type="email"
          required
          autoComplete="email"
          placeholder={t.placeholder}
        />
        <button type="submit">{t.button}</button>
        {/* Brevo anti-spam honeypot: must stay empty and out of the tab
            order / screen-reader flow, never display:none (some bots skip
            display:none fields on purpose). */}
        <input
          type="text"
          name="email_address_check"
          tabIndex={-1}
          aria-hidden="true"
          autoComplete="off"
          style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
        />
        <input type="hidden" name="locale" value="en" />
      </form>
      <p className="consent">
        {t.consent} <a href={`/${lang}/privacy`}>{t.privacy}</a>
      </p>
    </section>
  );
}
