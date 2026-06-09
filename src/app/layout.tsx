import type { Metadata, Viewport } from "next";
import { Crimson_Pro, Geist_Mono, Inter } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import { SessionTrail } from "@/components/SessionTrail";
import "./globals.css";

const GA_ID = "G-G1LDQSFETL";

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

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark light",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://almondai.tech"),
  title: "Almond AI · The company compiler",
  description:
    "One memory for every AI you use. Almond captures decisions inside Claude Code, Cursor, and Figma, then injects them back into every prompt, every doc, every build.",
  openGraph: {
    title: "Almond AI · The company compiler",
    description:
      "Memory, not models. The memory layer for AI-native companies.",
    siteName: "Almond AI",
    type: "website",
    url: "/",
    images: [
      {
        url: "/og-image.png",
        width: 1024,
        height: 576,
        alt: "Almond AI",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Almond AI · The company compiler",
    description: "Memory, not models.",
    images: ["/og-image.png"],
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
      <body className="antialiased">
        {children}
        <SessionTrail />
      </body>
      <GoogleAnalytics gaId={GA_ID} />
    </html>
  );
}
