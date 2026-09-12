import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { copy, type Lang } from "../../content";
import { Footer, Header, SubscriptionStatus } from "../../components";

export const dynamicParams = false;
export function generateStaticParams() {
  return [{ lang: "uk" }, { lang: "ru" }, { lang: "en" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!(lang in copy)) return {};
  const c = copy[lang as Lang];
  const brand = lang === "en" ? "Simona Vilar" : "Симона Вилар";
  return {
    title: `${c.subscriptionConfirmed.title} — ${brand}`,
    robots: { index: false, follow: false },
  };
}

export default async function SubscriptionConfirmedPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: raw } = await params;
  if (!(raw in copy)) notFound();
  const lang = raw as Lang;
  return (
    <>
      <Header lang={lang} page="subscription-confirmed" />
      <SubscriptionStatus lang={lang} variant="confirmed" />
      <Footer lang={lang} page="subscription-confirmed" />
    </>
  );
}
