import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://framefeature.com"),
  alternates: {
    canonical: "https://framefeature.com",
    languages: {
      "en-US": "https://framefeature.com",
      "en-IN": "https://framefeature.in",
    },
  },
  title: {
    default: "Frame Feature | Best Photographer and Visual Expert in Delhi",
    template: "%s | Frame Feature",
  },
  description:
    "Exploring how cameras, editing, and AI tools combine to turn ideas into clear, compelling visual content and structured storytelling.",
  keywords: [
    "Visual Storytelling",
    "AI Workflows",
    "Photography Frames",
    "Content Strategy",
    "Frame Feature",
    "Amaan",
    "Next.js Portfolio",
  ],
  authors: [{ name: "Amaan" }],
  openGraph: {
    title: "Frame Feature | Best Photographer and Visual Expert in Delhi",
    description:
      "Turning ideas into visual content using cameras, editing, and generative AI workflows.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
      suppressHydrationWarning
    >
      <head>
        {/* Google tag (gtag.js) */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-38S9C99JX7"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
        >
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-38S9C99JX7');
          `}
        </Script>
      </head>
      <body
        className="min-h-full flex flex-col bg-[#0A0A0C] text-white selection:bg-[#FF5E14] selection:text-white"
        suppressHydrationWarning
      >
        <Header />
        <main className="flex-1 w-full">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
