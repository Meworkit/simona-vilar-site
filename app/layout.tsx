import type { Metadata } from "next";
import "./globals.css";

const ogImage = {
  url: "https://simonavilar.com/og-image.jpg",
  width: 1200,
  height: 630,
  alt: "Симона Вилар — официальный сайт",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://simonavilar.com"),
  icons: {
    icon: [{ url: "/favicon.png", type: "image/png", sizes: "512x512" }],
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    images: [ogImage.url],
  },
};

// Conservative author schema: only verified facts already published
// elsewhere on the site (name, pen name, site URL, occupation). No awards,
// publisher relationships, social profiles, or other unverified claims.
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Симона Вилар",
  alternateName: "Наталия Гавриленко",
  url: "https://simonavilar.com",
  jobTitle: "Писательница",
};

// Helps search engines resolve the site's name (distinct from the Person
// schema above, which describes the author). Only verified facts: no
// SearchAction or other unverified capability is claimed.
const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Симона Вилар",
  alternateName: "Simona Vilar",
  url: "https://simonavilar.com/",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
