"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import type { Lang } from "./content";

const text = {
  uk: { title: "Отримувати новини про авторку та наступні публікації", subtitle: "Нові публікації, новини та важливі оголошення авторки.", placeholder: "Ваш email", button: "Підписатися", consent: "Підписуючись, ви погоджуєтеся отримувати новини Симони Вілар електронною поштою. Відписатися можна в будь-який момент.", privacy: "Політика конфіденційності", success: "Дякуємо. Перевірте пошту та підтвердьте підписку." },
  ru: { title: "Получать новости об авторе и следующих публикациях", subtitle: "Новые публикации, новости и важные объявления автора.", placeholder: "Ваш email", button: "Подписаться", consent: "Подписываясь, вы соглашаетесь получать новости Симоны Вилар по электронной почте. Отписаться можно в любое время.", privacy: "Политика конфиденциальности", success: "Спасибо. Проверьте почту и подтвердите подписку." },
} as const;

export function Newsletter({ lang }: { lang: Lang }) {
  const [sent, setSent] = useState(false);
  const formId = lang === "uk" ? process.env.NEXT_PUBLIC_KIT_FORM_ID_UK : process.env.NEXT_PUBLIC_KIT_FORM_ID_RU;
  const t = text[lang];
  function submit(event: FormEvent<HTMLFormElement>) { if (!formId) { event.preventDefault(); return; } setSent(true); }
  return <section className="newsletter shell" aria-labelledby="newsletter-title"><h2 id="newsletter-title">{t.title}</h2><p>{t.subtitle}</p>{sent ? <p className="newsletterSuccess" role="status">{t.success}</p> : <form action={formId ? `https://app.convertkit.com/forms/${formId}/subscriptions` : undefined} method="post" target="kit-submit" onSubmit={submit}><label className="srOnly" htmlFor={`newsletter-${lang}`}>{t.placeholder}</label><input id={`newsletter-${lang}`} name="email_address" type="email" required autoComplete="email" placeholder={t.placeholder}/><button type="submit" disabled={!formId}>{t.button}</button></form>}<p className="consent">{t.consent} <Link href={`/${lang}/privacy`}>{t.privacy}</Link></p><iframe className="kitFrame" name="kit-submit" title="Kit submission"/></section>;
}
