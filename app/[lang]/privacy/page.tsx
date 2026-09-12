import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer, Header } from "../../components";
import { email, type Lang } from "../../content";

const privacy = {
  ru: {
    title: "Политика конфиденциальности",
    updated: "Последнее обновление: 8 сентября 2026 года",
    intro: "Настоящая Политика конфиденциальности объясняет, как обрабатываются персональные данные пользователей, которые подписываются на новости Симоны Вилар на сайте simonavilar.com.",
    back: "Вернуться на главную",
    sections: [
      { title: "1. Кто обрабатывает данные", paragraphs: ["Ответственным за обработку персональных данных является:", "Наталия Гавриленко, литературный псевдоним Симона Вилар", "По вопросам конфиденциальности и обработки персональных данных можно обращаться по адресу:", "EMAIL"] },
      { title: "2. Какие данные мы собираем", paragraphs: ["При подписке на рассылку мы можем обрабатывать:"], list: ["адрес электронной почты;", "выбранный язык сайта — русский или украинский;", "статус подписки и подтверждения подписки;", "информацию об отписке от рассылки;", "технические данные, необходимые сервису рассылки для работы и безопасности подписки."], after: ["Мы не запрашиваем через форму подписки имя, адрес, платежные данные или специальные категории персональных данных."] },
      { title: "3. Для чего используются данные", paragraphs: ["Ваш адрес электронной почты используется исключительно для отправки:"], list: ["новостей Симоны Вилар;", "информации о новых публикациях;", "новостей о творчестве автора;", "важных официальных объявлений."], after: ["Мы не используем подписку для рассылок третьих лиц и не продаём данные подписчиков."] },
      { title: "4. Основание обработки", paragraphs: ["Основанием для обработки адреса электронной почты является ваше согласие.", "Подписка оформляется добровольно. При использовании подтверждения подписки вы также можете получить письмо с просьбой подтвердить свой адрес электронной почты.", "Вы можете отозвать согласие в любой момент, воспользовавшись ссылкой «Отписаться» в любом письме или написав на EMAIL.", "Отзыв согласия не влияет на законность обработки данных, осуществлённой до момента отзыва."] },
      { title: "5. Сервис рассылки Brevo", paragraphs: ["Для управления подписками на рассылку и отправки писем используется сервис Brevo.", "Адрес электронной почты, который вы указываете в форме подписки на сайте, обрабатывается через Brevo как поставщика технических услуг рассылки, действующего от имени владельца рассылки.", "Отписаться от рассылки можно в любой момент по ссылке, указанной в каждом письме.", "Поскольку Brevo и некоторые его поставщики услуг могут находиться за пределами страны проживания пользователя, персональные данные могут обрабатываться за рубежом."] },
      { title: "6. Срок хранения", paragraphs: ["Данные хранятся, пока пользователь подписан на рассылку.", "После отписки информация может сохраняться в минимальном объёме, необходимом для фиксации факта отписки и предотвращения дальнейшей отправки писем.", "Пользователь также может обратиться с просьбой удалить свои данные."] },
      { title: "7. Ваши права", paragraphs: ["В зависимости от применимого законодательства пользователь может иметь право:"], list: ["узнать, какие данные о нём обрабатываются;", "получить копию своих данных;", "исправить неточные данные;", "потребовать удаления данных;", "ограничить обработку;", "отозвать согласие;", "получить данные в переносимом формате, если это применимо;", "подать жалобу в компетентный орган по защите персональных данных."], after: ["Для реализации этих прав необходимо написать на:", "EMAIL"] },
      { title: "8. Изменения политики", paragraphs: ["Настоящая Политика может обновляться, если изменится способ работы сайта, рассылки или используемых сервисов.", "Актуальная версия всегда публикуется на simonavilar.com."] },
    ],
  },
  uk: {
    title: "Політика конфіденційності",
    updated: "Останнє оновлення: 8 вересня 2026 року",
    intro: "Ця Політика конфіденційності пояснює, як обробляються персональні дані користувачів, які підписуються на новини Сімони Вілар на сайті simonavilar.com.",
    back: "Повернутися на головну",
    sections: [
      { title: "1. Хто обробляє дані", paragraphs: ["Відповідальною за обробку персональних даних є:", "Наталія Гавриленко, літературний псевдонім Сімона Вілар", "З питань конфіденційності та обробки персональних даних можна звертатися за адресою:", "EMAIL"] },
      { title: "2. Які дані ми збираємо", paragraphs: ["Під час підписки на розсилку ми можемо обробляти:"], list: ["адресу електронної пошти;", "обрану мову сайту — українську або російську;", "статус підписки та її підтвердження;", "інформацію про відписку від розсилки;", "технічні дані, необхідні сервісу розсилки для роботи та безпеки підписки."], after: ["Через форму підписки ми не запитуємо ім’я, адресу, платіжні дані або спеціальні категорії персональних даних."] },
      { title: "3. Для чого використовуються дані", paragraphs: ["Ваша адреса електронної пошти використовується виключно для надсилання:"], list: ["новин Сімони Вілар;", "інформації про нові публікації;", "новин про творчість авторки;", "важливих офіційних оголошень."], after: ["Ми не використовуємо підписку для розсилок третіх осіб і не продаємо дані підписників."] },
      { title: "4. Підстава обробки", paragraphs: ["Підставою для обробки адреси електронної пошти є ваша згода.", "Підписка є добровільною. У разі використання підтвердження підписки ви також можете отримати лист із проханням підтвердити свою адресу електронної пошти.", "Ви можете відкликати згоду в будь-який момент, скориставшись посиланням «Відписатися» у будь-якому листі або написавши на EMAIL.", "Відкликання згоди не впливає на законність обробки даних, здійсненої до моменту її відкликання."] },
      { title: "5. Сервіс розсилки Brevo", paragraphs: ["Для управління підписками на розсилку та надсилання листів використовується сервіс Brevo.", "Адреса електронної пошти, яку ви вказуєте у формі підписки на сайті, обробляється через Brevo як постачальника технічних послуг розсилки, що діє від імені власника розсилки.", "Відписатися від розсилки можна в будь-який момент за посиланням, вказаним у кожному листі.", "Оскільки Brevo та деякі його постачальники послуг можуть бути розташовані за межами країни проживання користувача, персональні дані можуть оброблятися за кордоном."] },
      { title: "6. Строк зберігання", paragraphs: ["Дані зберігаються, доки користувач підписаний на розсилку.", "Після відписки інформація може зберігатися в мінімальному обсязі, необхідному для фіксації факту відписки та запобігання подальшому надсиланню листів.", "Користувач також може звернутися з проханням видалити свої дані."] },
      { title: "7. Ваші права", paragraphs: ["Залежно від застосовного законодавства користувач може мати право:"], list: ["дізнатися, які дані про нього обробляються;", "отримати копію своїх даних;", "виправити неточні дані;", "вимагати видалення даних;", "обмежити обробку;", "відкликати згоду;", "отримати дані у переносимому форматі, якщо це застосовно;", "подати скаргу до компетентного органу із захисту персональних даних."], after: ["Для реалізації цих прав необхідно написати на:", "EMAIL"] },
      { title: "8. Зміни політики", paragraphs: ["Ця Політика може оновлюватися, якщо зміниться спосіб роботи сайту, розсилки або використовуваних сервісів.", "Актуальна версія завжди публікується на simonavilar.com."] },
    ],
  },
  en: {
    title: "Privacy Policy",
    updated: "Last updated: September 8, 2026",
    intro: "This Privacy Policy explains how the personal data of users who subscribe to Simona Vilar's newsletter on simonavilar.com is processed.",
    back: "Back to home",
    sections: [
      { title: "1. Who processes the data", paragraphs: ["The party responsible for processing personal data is:", "Natalia Gavrilenko, writing under the literary pen name Simona Vilar", "For questions about privacy and the processing of personal data, please contact:", "EMAIL"] },
      { title: "2. What data we collect", paragraphs: ["When you subscribe to the newsletter, we may process:"], list: ["your email address;", "the site language you selected — Russian, Ukrainian, or English;", "your subscription and subscription-confirmation status;", "information about unsubscribing from the newsletter;", "technical data the newsletter service needs to operate and keep the subscription secure."], after: ["We do not request a name, address, payment details, or special categories of personal data through the subscription form."] },
      { title: "3. What the data is used for", paragraphs: ["Your email address is used solely to send:"], list: ["Simona Vilar's news;", "information about new publications;", "news about the author's work;", "important official announcements."], after: ["We do not use the subscription for third-party mailings, and we do not sell subscriber data."] },
      { title: "4. Legal basis for processing", paragraphs: ["The legal basis for processing your email address is your consent.", "Subscribing is voluntary. If subscription confirmation is used, you may also receive an email asking you to confirm your email address.", "You may withdraw your consent at any time by using the \"Unsubscribe\" link in any email, or by writing to EMAIL.", "Withdrawing consent does not affect the lawfulness of processing carried out before the withdrawal."] },
      { title: "5. Brevo newsletter service", paragraphs: ["The Brevo service is used to manage newsletter subscriptions and send emails.", "The email address you provide in the subscription form on the website is processed through Brevo as a technical newsletter service provider, acting on behalf of the newsletter's owner.", "You can unsubscribe from the newsletter at any time using the link included in every email.", "Because Brevo and some of its service providers may be located outside your country of residence, personal data may be processed abroad."] },
      { title: "6. Retention period", paragraphs: ["Data is retained for as long as the user remains subscribed to the newsletter.", "After unsubscribing, a minimal amount of information may be retained as needed to record the fact of unsubscribing and to prevent further emails from being sent.", "Users may also request that their data be deleted."] },
      { title: "7. Your rights", paragraphs: ["Depending on the applicable law, users may have the right to:"], list: ["find out what data about them is being processed;", "receive a copy of their data;", "correct inaccurate data;", "request deletion of their data;", "restrict processing;", "withdraw consent;", "receive their data in a portable format, where applicable;", "lodge a complaint with the competent personal-data protection authority."], after: ["To exercise these rights, please write to:", "EMAIL"] },
      { title: "8. Changes to this policy", paragraphs: ["This Policy may be updated if the way the website, the newsletter, or the services used changes.", "The current version is always published at simonavilar.com."] },
    ],
  },
} as const;

function Paragraph({ children }: { children: string }) {
  if (children === "EMAIL") return <p><a className="privacyEmail" href={`mailto:${email}`}>{email}</a></p>;
  const parts = children.split("EMAIL");
  return <p>{parts[0]}{parts.length > 1 && <a className="privacyEmail" href={`mailto:${email}`}>{email}</a>}{parts[1]}</p>;
}

export const dynamicParams = false;
export function generateStaticParams() { return [{ lang: "uk" }, { lang: "ru" }, { lang: "en" }]; }
export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> { const { lang } = await params; if (!(lang in privacy)) return {}; const p = privacy[lang as Lang]; const brand = lang === "uk" ? "Сімона Вілар" : lang === "en" ? "Simona Vilar" : "Симона Вилар"; const title = `${p.title} — ${brand}`; const url = `https://simonavilar.com/${lang}/privacy`; const ogImage = { url: "https://simonavilar.com/og-image.jpg", width: 1200, height: 630, alt: "Симона Вилар — официальный сайт" }; return { title, description: p.intro, alternates: { canonical: url, languages: { uk: "https://simonavilar.com/uk/privacy", ru: "https://simonavilar.com/ru/privacy", en: "https://simonavilar.com/en/privacy", "x-default": "https://simonavilar.com/ru/privacy" } }, openGraph: { title, description: p.intro, siteName: brand, locale: lang === "uk" ? "uk_UA" : lang === "en" ? "en_US" : "ru_RU", type: "website", url, images: [ogImage] }, twitter: { card: "summary_large_image", title, description: p.intro, images: [ogImage.url] } }; }

export default async function PrivacyPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params;
  if (!(raw in privacy)) notFound();
  const lang = raw as Lang, p = privacy[lang];
  return <><Header lang={lang} page="privacy"/><main className="privacyPage shell"><a className="back" href={`/${lang}`}>← {p.back}</a><header className="privacyHeading"><h1>{p.title}</h1><p>{p.updated}</p></header><article className="privacyBody"><p className="privacyIntro">{p.intro}</p>{p.sections.map(section=><section key={section.title}><h2>{section.title}</h2>{section.paragraphs?.map(item=><Paragraph key={item}>{item}</Paragraph>)}{"list" in section && section.list && <ul>{section.list.map(item=><li key={item}>{item}</li>)}</ul>}{"after" in section && section.after?.map(item=><Paragraph key={item}>{item}</Paragraph>)}</section>)}</article></main><Footer lang={lang} page="privacy"/></>;
}
