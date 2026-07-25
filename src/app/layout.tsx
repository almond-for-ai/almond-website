import type { Metadata, Viewport } from "next";
import { Crimson_Pro, Geist_Mono, Inter } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import { GrainOverlay } from "@/components/GrainOverlay";
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
  title: "Almond AI · Coming Soon",
  description:
    "Almond AI builds tools for the mind. Something is growing under the husk. Join the waitlist.",
  openGraph: {
    title: "Almond AI · Coming Soon",
    description:
      "Tools for the mind. Something is growing under the husk. Join the waitlist.",
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
    title: "Almond AI",
    description: "Tools for the mind. Something is growing under the husk.",
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
        <GrainOverlay />
      </body>
      <GoogleAnalytics gaId={GA_ID} />
    </html>
  );
}
