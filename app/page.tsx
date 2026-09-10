import { permanentRedirect } from "next/navigation";

// Russian is the default language version of the site. This is a
// permanent (308) redirect straight to the final, non-trailing-slash
// URL so search engines see a single hop rather than a redirect chain.
export default function Home() {
  permanentRedirect("/ru");
}
