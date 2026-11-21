import type { Lang } from "./content";
import { BrevoNewsletterForm } from "./BrevoNewsletterForm";

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
      <BrevoNewsletterForm
        lang={lang}
        placeholder={t.placeholder}
        button={t.button}
        success={
          lang === "uk"
            ? "Перевірте пошту та підтвердьте підписку"
            : lang === "en"
              ? "Check your email and confirm your subscription"
              : "Проверьте почту и подтвердите подписку"
        }
        error={
          lang === "uk"
            ? "Не вдалося надіслати форму. Спробуйте ще раз"
            : lang === "en"
              ? "We couldn't submit the form. Please try again"
              : "Не удалось отправить форму. Попробуйте ещё раз"
        }
        required={
          lang === "uk" ? "Введіть email" : lang === "en" ? "Enter your email" : "Введите email"
        }
        invalid={
          lang === "uk"
            ? "Перевірте правильність введеного email"
            : lang === "en"
              ? "Check that your email address is correct"
              : "Проверьте правильность введённого email"
        }
      />
      <p className="consent">
        {t.consent} <a href={`/${lang}/privacy`}>{t.privacy}</a>
      </p>
    </section>
  );
}
