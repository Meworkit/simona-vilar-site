"use client";

// preview-deploy-marker
// v2-preview-trigger

import { FormEvent, useEffect, useRef, useState } from "react";

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

type CaptchaWindow = typeof window & {
  handleCaptchaResponse?: (token: string) => void;
  handleCaptchaExpired?: () => void;
  grecaptcha?: { reset: () => void };
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
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [fieldError, setFieldError] = useState("");
  const submittedRef = useRef(false);

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const canSubmit = emailValid && Boolean(captchaToken) && status !== "submitting";

  useEffect(() => {
    const w = window as CaptchaWindow;

    w.handleCaptchaResponse = (token: string) => {
      setCaptchaToken(token);
      setStatus("idle");
    };

    w.handleCaptchaExpired = () => {
      setCaptchaToken("");
    };

    if (!document.getElementById("simona-recaptcha-js")) {
      const script = document.createElement("script");
      script.id = "simona-recaptcha-js";
      script.src = `https://www.google.com/recaptcha/api.js?hl=${
        lang === "uk" ? "uk" : lang === "ru" ? "ru" : "en"
      }`;
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    }

    return () => {
      delete w.handleCaptchaResponse;
      delete w.handleCaptchaExpired;
    };
  }, [lang]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    setFieldError("");

    if (!email.trim()) {
      event.preventDefault();
      setFieldError(required);
      return;
    }

    if (!emailValid) {
      event.preventDefault();
      setFieldError(invalid);
      return;
    }

    if (!captchaToken) {
      event.preventDefault();
      setStatus("error");
      return;
    }

    // Do not preventDefault here. The browser must submit this exact form
    // directly to Brevo so Brevo records a real "Form submitted" event and
    // can trigger the form's built-in double opt-in flow.
    submittedRef.current = true;
    setStatus("submitting");
  }

  function handleBrevoFrameLoad() {
    // The hidden iframe also fires once for its initial about:blank document.
    if (!submittedRef.current) return;

    submittedRef.current = false;
    setStatus("success");
    setEmail("");
    setCaptchaToken("");
    (window as CaptchaWindow).grecaptcha?.reset();
  }

  return (
    <div className="newsletterBrevoContainer">
      {status === "error" && (
        <div className="newsletterFormMessage newsletterFormError" role="alert">
          {error}
        </div>
      )}

      {status === "success" && (
        <div className="newsletterFormMessage newsletterFormSuccess" role="status">
          {success}
        </div>
      )}

      <form
        id="sib-form"
        className="newsletterControlledForm"
        action={BREVO_FORM_ACTION}
        method="post"
        target="brevo-newsletter-response"
        data-type="subscription"
        onSubmit={handleSubmit}
        noValidate
      >
        <div className="newsletterEmailField">
          <label className="srOnly" htmlFor="EMAIL">
            {placeholder}
          </label>
          <input
            id="EMAIL"
            name="EMAIL"
            type="email"
            required
            data-required="true"
            autoComplete="email"
            placeholder={placeholder}
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              setStatus("idle");
              setFieldError("");
            }}
            aria-invalid={Boolean(fieldError)}
            aria-describedby={fieldError ? `newsletter-error-${lang}` : undefined}
          />
          {fieldError && (
            <div id={`newsletter-error-${lang}`} className="newsletterFieldError">
              {fieldError}
            </div>
          )}
        </div>

        <div className="newsletterCaptcha">
          <div
            className="g-recaptcha"
            id="sib-captcha"
            data-sitekey={RECAPTCHA_SITE_KEY}
            data-callback="handleCaptchaResponse"
            data-expired-callback="handleCaptchaExpired"
          />
        </div>

        <button type="submit" disabled={!canSubmit} aria-disabled={!canSubmit}>
          {status === "submitting"
            ? lang === "uk"
              ? "Надсилаємо…"
              : lang === "en"
                ? "Submitting…"
                : "Отправляем…"
            : button}
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

      <iframe
        name="brevo-newsletter-response"
        title="Brevo newsletter response"
        className="newsletterResponseFrame"
        onLoad={handleBrevoFrameLoad}
      />
    </div>
  );
}
