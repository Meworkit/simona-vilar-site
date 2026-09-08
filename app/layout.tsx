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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk">
      <body>{children}</body>
    </html>
  );
}
