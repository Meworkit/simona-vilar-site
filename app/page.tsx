import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {
  const languages =
    (await headers()).get("accept-language")?.toLowerCase() ?? "";
  const preferred = languages
    .split(",")
    .map((item) => item.trim().split(";")[0])
    .find((code) => code.startsWith("uk") || code.startsWith("ru"));
  redirect(preferred?.startsWith("ru") ? "/ru/" : "/uk/");
}
