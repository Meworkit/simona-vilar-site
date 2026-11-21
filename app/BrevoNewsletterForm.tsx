"use client";

import { useEffect } from "react";

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

export function BrevoNewsletterForm({
  lang,
  placeholder,
  button,
  success,
  error,
  required,
  invalid,
}: Props) {
  useEffect(() => {
    const w = window as typeof window & Record<string, unknown>;

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

    (window as typeof window & { handleCaptchaResponse?: () => void }).handleCaptchaResponse = () => {
      document.getElementById("sib-captcha")?.dispatchEvent(new Event("captchaChange"));
    };

    const addScript = (id: string, src: string) =>
      new Promise<void>((resolve, reject) => {
        const existing = document.getElementById(id) as HTMLScriptElement | null;
        if (existing) {
          if (existing.dataset.loaded === "true") resolve();
          else existing.addEventListener("load", () => resolve(), { once: true });
          return;
        }
        const script = document.createElement("script");
        script.id = id;
        script.src = src;
        script.async = true;
        script.onload = () => {
          script.dataset.loaded = "true";
          resolve();
        };
        script.onerror = () => reject(new Error(`Failed to load ${src}`));
        document.body.appendChild(script);
      });

    // Load Google's widget first so g-recaptcha-response can be generated,
    // then load Brevo's handler after all expected DOM nodes already exist.
    addScript(
      "simona-brevo-recaptcha",
      `https://www.google.com/recaptcha/api.js?hl=${lang === "uk" ? "uk" : lang === "ru" ? "ru" : "en"}`,
    )
      .then(() =>
        addScript(
          "simona-brevo-main",
          "https://sibforms.com/forms/end-form/build/main.js",
        ),
      )
      .catch((err) => {
        console.error("Newsletter integration script failed", err);
      });
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
          action={BREVO_FORM_ACTION}
          method="post"
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
                    id="EMAIL"
                    name="EMAIL"
                    type="email"
                    required
                    data-required="true"
                    autoComplete="email"
                    placeholder={placeholder}
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
            {button}
          </button>

          <div className="sib-captcha newsletterCaptcha">
            <div className="form__entry entry_block">
              <div className="form__label-row">
                <div
                  className="g-recaptcha sib-visible-recaptcha"
                  id="sib-captcha"
                  data-sitekey={RECAPTCHA_SITE_KEY}
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
  );
}
