"use client";

import { useEffect, useState } from "react";

type Props = {
  lang: "uk" | "ru" | "en";
  placeholder: string;
  button: string;
  success: string;
  error: string;
  required: string;
  invalid: string;
};

const BREVO_FORM_ACTION =
  "https://9bfc7f37.sibforms.com/serve/MUIFAApmT5fj474ePss9nlC9yMWNjcfgsRBMmI6nQVA16d5wuEhYj50ITfuFDxfxDzRc5_tp0hTKb0POHndNLDR04Iw8NMM2qiO7loSarrH1KGL9a6OqZAmg6gJlKXvSu5Pykn3nNv1Sr-uP5vW_SBLwqwXReMBqmMrPZR1MAaGmIoTxBl6EdkYKI4r26O6-BFPg1ESENRhIk8IYcg==";

const RECAPTCHA_SITE_KEY = "6LeZySouAAAAABAAXTpRYkSmVPM0GPgU1gcLb1Sc";

type BrevoWindow = typeof window & {
  REQUIRED_CODE_ERROR_MESSAGE?: string;
  LOCALE?: string;
  EMAIL_INVALID_MESSAGE?: string;
  SMS_INVALID_MESSAGE?: string;
  REQUIRED_ERROR_MESSAGE?: string;
  GENERIC_INVALID_MESSAGE?: string;
  INVALID_NUMBER?: string;
  INVALID_DATE?: string;
  REQUIRED_MULTISELECT_MESSAGE?: string;
  translation?: Record<string, unknown>;
  AUTOHIDE?: boolean;
  handleCaptchaResponse?: (token: string) => void;
  handleCaptchaExpired?: () => void;
};

export function BrevoNewsletterForm({
  lang,
  placeholder,
  button,
  success,
  error,
  required,
  invalid,
}: Props) {
  const [email, setEmail] = useState("");
  const [captchaToken, setCaptchaToken] = useState("");

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const canSubmit = emailValid && Boolean(captchaToken);

  useEffect(() => {
    const w = window as BrevoWindow;

    w.REQUIRED_CODE_ERROR_MESSAGE = "Please choose a country code";
    w.LOCALE = "en";
    w.EMAIL_INVALID_MESSAGE = invalid;
    w.SMS_INVALID_MESSAGE = invalid;
    w.REQUIRED_ERROR_MESSAGE = required;
    w.GENERIC_INVALID_MESSAGE = invalid;
    w.INVALID_NUMBER = invalid;
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

    w.handleCaptchaResponse = (token: string) => {
      setCaptchaToken(token);
      document.getElementById("sib-captcha")?.dispatchEvent(new Event("captchaChange"));
    };

    w.handleCaptchaExpired = () => {
      setCaptchaToken("");
      document.getElementById("sib-captcha")?.dispatchEvent(new Event("captchaChange"));
    };

    const addScript = (id: string, src: string) =>
      new Promise<void>((resolve, reject) => {
        const existing = document.getElementById(id) as HTMLScriptElement | null;
        if (existing) {
          if (existing.dataset.loaded === "true") {
            resolve();
          } else {
            existing.addEventListener("load", () => resolve(), { once: true });
          }
          return;
        }

        const script = document.createElement("script");
        script.id = id;
        script.src = src;
        script.async = true;
        script.defer = true;
        script.onload = () => {
          script.dataset.loaded = "true";
          resolve();
        };
        script.onerror = () => reject(new Error(`Failed to load ${src}`));
        document.body.appendChild(script);
      });

    const captchaLang = lang === "uk" ? "uk" : lang === "ru" ? "ru" : "en";

    addScript(
      "simona-brevo-recaptcha",
      `https://www.google.com/recaptcha/api.js?hl=${captchaLang}`,
    )
      .then(() =>
        addScript(
          "simona-brevo-main",
          "https://sibforms.com/forms/end-form/build/main.js",
        ),
      )
      .catch((err) => console.error("Brevo newsletter script load failed", err));

    return () => {
      delete w.handleCaptchaResponse;
      delete w.handleCaptchaExpired;
    };
  }, [invalid, lang, required]);

  return (
    <div id="sib-form-container" className="newsletterBrevoContainer">
      <div
        id="error-message"
        className="sib-form-message-panel newsletterFormMessage newsletterFormError"
        role="alert"
      >
        <div className="sib-form-message-panel__text sib-form-message-panel__text--center">
          <span className="sib-form-message-panel__inner-text">{error}</span>
        </div>
      </div>

      <div
        id="success-message"
        className="sib-form-message-panel newsletterFormMessage newsletterFormSuccess"
        role="status"
      >
        <div className="sib-form-message-panel__text sib-form-message-panel__text--center">
          <span className="sib-form-message-panel__inner-text">{success}</span>
        </div>
      </div>

      <div id="sib-container" className="newsletterBrevoInner">
        <form
          id="sib-form"
          className="newsletterControlledForm"
          method="POST"
          action={BREVO_FORM_ACTION}
          data-type="subscription"
        >
          <div className="sib-input newsletterEmailField">
            <div className="form__entry entry_block">
              <div className="form__label-row">
                <label className="srOnly" htmlFor="EMAIL">
                  {placeholder}
                </label>
                <div className="entry__field">
                  <input
                    className="input"
                    type="text"
                    id="EMAIL"
                    name="EMAIL"
                    autoComplete="email"
                    value={email}
                    placeholder={placeholder}
                    data-required="true"
                    required
                    onChange={(event) => setEmail(event.target.value)}
                  />
                </div>
              </div>
              <label
                className="entry__error entry__error--primary newsletterFieldError"
                aria-live="polite"
              />
            </div>
          </div>

          <div className="sib-captcha sib-form-block newsletterCaptcha">
            <div className="form__entry entry_block">
              <div className="form__label-row">
                <div
                  className="g-recaptcha sib-visible-recaptcha"
                  id="sib-captcha"
                  data-sitekey={RECAPTCHA_SITE_KEY}
                  data-callback="handleCaptchaResponse"
                  data-expired-callback="handleCaptchaExpired"
                />
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
            disabled={!canSubmit}
            aria-disabled={!canSubmit}
          >
            {button}
          </button>

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
  );
}
