"use client";

import { useEffect } from "react";
import type { Lang } from "./content";

const text = {
  uk: {
    title: "Отримувати новини про авторку та наступні публікації",
    subtitle: "Нові публікації, новини та важливі оголошення авторки.",
    placeholder: "Ваш email",
    button: "Підписатися",
    consent: "Підписуючись, ви погоджуєтеся отримувати новини Симони Вілар електронною поштою. Відписатися можна в будь-який момент.",
    privacy: "Політика конфіденційності",
    success: "Перевірте пошту та підтвердьте підписку",
    error: "Не вдалося надіслати форму. Спробуйте ще раз",
    required: "Введіть email",
    invalid: "Перевірте правильність введеного email",
  },
  ru: {
    title: "Получать новости об авторе и следующих публикациях",
    subtitle: "Новые публикации, новости и важные объявления автора.",
    placeholder: "Ваш email",
    button: "Подписаться",
    consent: "Подписываясь, вы соглашаетесь получать новости Симоны Вилар по электронной почте. Отписаться можно в любое время.",
    privacy: "Политика конфиденциальности",
    success: "Проверьте почту и подтвердите подписку",
    error: "Не удалось отправить форму. Попробуйте ещё раз",
    required: "Введите email",
    invalid: "Проверьте правильность введённого email",
  },
  en: {
    title: "Get news about the author and upcoming publications",
    subtitle: "New publications, news, and important announcements from the author.",
    placeholder: "Your email",
    button: "Subscribe",
    consent: "By subscribing, you agree to receive Simona Vilar's news by email. You can unsubscribe at any time.",
    privacy: "Privacy Policy",
    success: "Check your email and confirm your subscription",
    error: "We couldn't submit the form. Please try again",
    required: "Enter your email",
    invalid: "Check that your email address is correct",
  },
} as const;

// Brevo signup form "Website Newsletter RU".
// The visible layout stays fully custom; Brevo's HTML integration is used
// only for submission, validation, double opt-in and CAPTCHA handling.
const BREVO_FORM_ACTION =
  "https://9bfc7f37.sibforms.com/serve/MUIFAApmT5fj474ePss9nlC9yMWNjcfgsRBMmI6nQVA16d5wuEhYj50ITfuFDxfxDzRc5_tp0hTKb0POHndNLDR04Iw8NMM2qiO7loSarrH1KGL9a6OqZAmg6gJlKXvSu5Pykn3nNv1Sr-uP5vW_SBLwqwXReMBqmMrPZR1MAaGmIoTxBl6EdkYKI4r26O6-BFPg1ESENRhIk8IYcg==";

const BREVO_RECAPTCHA_SITE_KEY = "6LeugCouAAAAABGd1c3ExE2qLfiwp5LExdvURal_";

export function Newsletter({ lang }: { lang: Lang }) {
  const t = text[lang];
  const captchaLang = lang === "uk" ? "uk" : lang === "ru" ? "ru" : "en";

  useEffect(() => {
    const w = window as typeof window & Record<string, any>;

    w.REQUIRED_CODE_ERROR_MESSAGE = "Please choose a country code";
    w.LOCALE = "en";
    w.EMAIL_INVALID_MESSAGE = t.invalid;
    w.SMS_INVALID_MESSAGE = t.invalid;
    w.REQUIRED_ERROR_MESSAGE = t.required;
    w.GENERIC_INVALID_MESSAGE = t.invalid;
    w.INVALID_NUMBER = t.invalid;
    w.INVALID_DATE = "Please enter a valid date";
    w.REQUIRED_MULTISELECT_MESSAGE = "Please select at least 1 option";
    w.translation = {
      common: {
        selectedList: "{quantity} list selected",
        selectedLists: "{quantity} lists selected",
        selectedOption: "{quantity} selected",
        selectedOptions: "{quantity} selected",
      },
    };
    w.AUTOHIDE = false;
    w.handleCaptchaResponse = () => {
      const captcha = document.getElementById("sib-captcha");
      if (captcha) captcha.dispatchEvent(new Event("captchaChange"));
    };

    const ensureScript = (
      id: string,
      src: string,
      options: { async?: boolean; defer?: boolean } = {},
    ) => {
      if (document.getElementById(id)) return;
      const script = document.createElement("script");
      script.id = id;
      script.src = src;
      script.async = options.async ?? false;
      script.defer = options.defer ?? false;
      document.body.appendChild(script);
    };

    // Brevo's own JavaScript intercepts the form POST so the visitor stays
    // on simonavilar.com and sees the inline success/error message.
    ensureScript(
      "brevo-form-main-js",
      "https://sibforms.com/forms/end-form/build/main.js",
      { defer: true },
    );

    // Brevo configured this form with Google reCAPTCHA. Loading it only
    // after the component mounts guarantees that the widget container is
    // already present in the DOM and g-recaptcha-response can be generated.
    ensureScript(
      "brevo-recaptcha-js",
      `https://www.google.com/recaptcha/api.js?hl=${captchaLang}`,
      { async: true, defer: true },
    );
  }, [captchaLang, t.invalid, t.required]);

  return (
    <section id="newsletter" className="newsletter shell" aria-labelledby="newsletter-title">
      <h2 id="newsletter-title">{t.title}</h2>
      <p>{t.subtitle}</p>

      <div id="sib-form-container" className="newsletterBrevoContainer">
        <div
          id="error-message"
          className="sib-form-message-panel newsletterFormMessage newsletterFormError"
          role="alert"
        >
          <div className="sib-form-message-panel__text sib-form-message-panel__text--center">
            <span className="sib-form-message-panel__inner-text">{t.error}</span>
          </div>
        </div>

        <div
          id="success-message"
          className="sib-form-message-panel newsletterFormMessage newsletterFormSuccess"
          role="status"
        >
          <div className="sib-form-message-panel__text sib-form-message-panel__text--center">
            <span className="sib-form-message-panel__inner-text">{t.success}</span>
          </div>
        </div>

        <div id="sib-container" className="newsletterBrevoInner">
          <form
            id="sib-form"
            action={BREVO_FORM_ACTION}
            method="post"
            data-type="subscription"
          >
            <div className="sib-input newsletterEmailField">
              <div className="form__entry entry_block">
                <div className="form__label-row">
                  <label className="srOnly" htmlFor={`newsletter-${lang}`}>
                    {t.placeholder}
                  </label>
                  <div className="entry__field">
                    <input
                      className="input"
                      id={`newsletter-${lang}`}
                      name="EMAIL"
                      type="email"
                      required
                      data-required="true"
                      autoComplete="email"
                      placeholder={t.placeholder}
                    />
                  </div>
                </div>
                <label
                  className="entry__error entry__error--primary newsletterFieldError"
                  aria-live="polite"
                />
              </div>
            </div>

            <button
              className="sib-form-block__button sib-form-block__button-with-loader"
              form="sib-form"
              type="submit"
            >
              <svg
                className="sib-hide-loader-icon newsletterLoader"
                viewBox="0 0 512 512"
                aria-hidden="true"
              >
                <path d="M460.116 373.846l-20.823-12.022c-5.541-3.199-7.54-10.159-4.663-15.874 30.137-59.886 28.343-131.652-5.386-189.946-33.641-58.394-94.896-95.833-161.827-99.676C261.028 55.961 256 50.751 256 44.352V20.309c0-6.904 5.808-12.337 12.703-11.982 83.556 4.306 160.163 50.864 202.11 123.677 42.063 72.696 44.079 162.316 6.031 236.832-3.14 6.148-10.75 8.461-16.728 5.01z" />
              </svg>
              {t.button}
            </button>

            <div className="sib-captcha newsletterCaptcha">
              <div className="form__entry entry_block">
                <div className="form__label-row">
                  <div
                    className="g-recaptcha sib-visible-recaptcha"
                    id="sib-captcha"
                    data-sitekey={BREVO_RECAPTCHA_SITE_KEY}
                    data-callback="handleCaptchaResponse"
                  />
                </div>
                <label
                  className="entry__error entry__error--primary newsletterFieldError"
                  aria-live="polite"
                />
              </div>
            </div>

            <input
              type="text"
              name="email_address_check"
              value=""
              className="input--hidden"
              tabIndex={-1}
              aria-hidden="true"
              autoComplete="off"
              readOnly
            />
            <input type="hidden" name="locale" value="en" />
          </form>
        </div>
      </div>

      <p className="consent">
        {t.consent} <a href={`/${lang}/privacy`}>{t.privacy}</a>
      </p>
    </section>
  );
}
