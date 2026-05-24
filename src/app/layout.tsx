import type { Metadata } from "next";
import { Crimson_Pro, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const crimsonPro = Crimson_Pro({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-crimson-pro",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Almond AI · Coming Soon",
  description:
    "Almond AI builds tools for the mind. Test your memory with a mind game.",
  openGraph: {
    title: "Almond AI · Coming Soon",
    description: "Almond AI. Tools for the mind. Coming soon.",
    siteName: "Almond AI",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Almond AI",
    description: "Tools for the mind. Coming soon.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${crimsonPro.variable} ${geistMono.variable}`}
    >
      <body className="antialiased">{children}</body>
    </html>
  );
}
