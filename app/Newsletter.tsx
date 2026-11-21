import type { Lang } from "./content";
import { BrevoNewsletterForm } from "./BrevoNewsletterForm";

const text = {
  uk: {
    title: "Отримувати новини про авторку та наступні публікації",
    subtitle: "Нові публікації, новини та важливі оголошення авторки.",
    iframeTitle: "Форма підписки на новини Симони Вілар",
    consent: "Підписуючись, ви погоджуєтеся отримувати новини Симони Вілар електронною поштою. Відписатися можна в будь-який момент.",
    privacy: "Політика конфіденційності",
  },
  ru: {
    title: "Получать новости об авторе и следующих публикациях",
    subtitle: "Новые публикации, новости и важные объявления автора.",
    iframeTitle: "Форма подписки на новости Симоны Вилар",
    consent: "Подписываясь, вы соглашаетесь получать новости Симоны Вилар по электронной почте. Отписаться можно в любое время.",
    privacy: "Политика конфиденциальности",
  },
  en: {
    title: "Get news about the author and upcoming publications",
    subtitle: "New publications, news, and important announcements from the author.",
    iframeTitle: "Simona Vilar newsletter signup form",
    consent: "By subscribing, you agree to receive Simona Vilar's news by email. You can unsubscribe at any time.",
    privacy: "Privacy Policy",
  },
} as const;

export function Newsletter({ lang }: { lang: Lang }) {
  const t = text[lang];
  return (
    <section id="newsletter" className="newsletter shell" aria-labelledby="newsletter-title">
      <h2 id="newsletter-title">{t.title}</h2>
      <p>{t.subtitle}</p>
      <BrevoNewsletterForm title={t.iframeTitle} />
      <p className="consent">
        {t.consent} <a href={`/${lang}/privacy`}>{t.privacy}</a>
      </p>
    </section>
  );
}
