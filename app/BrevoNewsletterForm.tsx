"use client";

import { FormEvent, useEffect, useState } from "react";

type Props = {
  lang: "uk" | "ru" | "en";
  placeholder: string;
  button: string;
  success: string;
  error: string;
  required: string;
  invalid: string;
};

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

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFieldError("");

    if (!email.trim()) {
      setFieldError(required);
      return;
    }
    if (!emailValid) {
      setFieldError(invalid);
      return;
    }
    if (!captchaToken) {
      setStatus("error");
      return;
    }

    setStatus("submitting");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          captchaToken,
        }),
      });
      const result = (await response.json()) as { success?: boolean };

      if (!response.ok || !result.success) {
        setStatus("error");
        return;
      }

      setStatus("success");
      setEmail("");
      setCaptchaToken("");
      (window as CaptchaWindow).grecaptcha?.reset();
    } catch {
      setStatus("error");
    }
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

      <form className="newsletterControlledForm" onSubmit={handleSubmit} noValidate>
        <div className="newsletterEmailField">
          <label className="srOnly" htmlFor={`newsletter-${lang}`}>
            {placeholder}
          </label>
          <input
            id={`newsletter-${lang}`}
            name="EMAIL"
            type="email"
            required
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
      </form>
    </div>
  );
}
