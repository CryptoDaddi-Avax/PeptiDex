import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import { Suspense } from "react";
import { AutoLinkProvider } from "@/components/auto-link";
import { GlobalEmbedHandler } from "@/components/global-embed-handler";
import { StickyDiscountBanner } from "@/components/promos/StickyDiscountBanner";
import { ExitIntentModal } from "@/components/promos/ExitIntentModal";
import { AuthProvider } from "@/components/auth/AuthProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://peptidex.app"),
  alternates: {
    languages: {
      "en": "https://peptidex.app",
    },
  },
  title: {
    default: "PeptiDex — Peptide Research Index, Stacks & Reconstitution Tools",
    template: "%s | PeptiDex",
  },
  description: "PeptiDex (peptidex.app) is the independent peptide research index — 51 peptide profiles, 12 evidence-based stacks, free reconstitution & cycle-planning tools, and COA verification. Not affiliated with any tracker app or vendor.",
  keywords: [
    "peptide research", "BPC-157", "TB-500", "Semaglutide", "CJC-1295", "Ipamorelin",
    "peptide reconstitution calculator", "peptide half-life", "research peptides", "peptide COA",
    "peptide stack", "GHK-Cu", "Thymosin Alpha-1", "Retatrutide", "Tirzepatide",
    "peptide interactions", "research chemicals", "peptide suppliers", "peptide guide",
    "pharmacokinetics", "HPLC verified peptides",
  ],
  authors: [{ name: "PeptiDex" }],
  creator: "PeptiDex",
  publisher: "PeptiDex",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "PeptideX",
    title: "PeptiDex Research-Grade Peptide Reference & Tools",
    description: "The most comprehensive peptide research platform. Explore 51 peptides with clinical studies, reconstitution tools, PK plasma graphs, COA verification, and AI recommendations.",
    url: "https://peptidex.app",
    images: [{ url: "https://peptidex.app/api/og?type=default", width: 1200, height: 630, alt: "PeptideX: Evidence-Based Peptide Science" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "PeptiDex Research-Grade Peptide Reference & Tools",
    description: "The most comprehensive peptide research platform. Clinical studies, reconstitution tools, COA verification, and AI recommendations.",
    images: ["https://peptidex.app/api/og?type=default"],
  },
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180" },
      { url: "/apple-touch-icon-152.png", sizes: "152x152" },
      { url: "/apple-touch-icon-120.png", sizes: "120x120" },
      { url: "/apple-touch-icon-76.png", sizes: "76x76" },
    ],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "PeptiDex",
  },
};


export const viewport: Viewport = {
  themeColor: "#0a0a0b",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />

        {/* Google Fonts — Fraunces (serif), Inter (sans), JetBrains Mono (mono) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,300;1,9..144,400&family=JetBrains+Mono:wght@300;400;500&family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />

        {/* SEO / PWA meta tags */}
        <meta name="theme-color" content="#0a0a0b" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="PeptiDex" />
        <meta name="format-detection" content="telephone=no" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#c9a961" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="msapplication-TileColor" content="#0a0a0b" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
             __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "PeptiDex",
              "alternateName": ["PeptiDex Research Index", "peptidex.app"],
              "url": "https://peptidex.app",
              "description": "PeptiDex (peptidex.app) is the independent peptide research index — 51 peptide profiles, 12 evidence-based stacks, free reconstitution & cycle-planning tools, and COA verification. Not affiliated with any tracker app or vendor.",
              "logo": "https://peptidex.app/logo.png",
              "sameAs": [
                 "https://twitter.com/peptidex",
                 "https://facebook.com/peptidex",
                 "https://github.com/peptidex",
                 "https://www.crunchbase.com/organization/peptidex"
              ]
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
             __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "PeptiDex",
              "url": "https://peptidex.app/",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://peptidex.app/library?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased bg-zinc-950 text-zinc-100 min-h-screen`}>
        <GoogleAnalytics gaId="G-FBJ7CJVJK9" />
        {/* Skip to content - accessibility */}
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:px-4 focus:py-2 focus:bg-violet-600 focus:text-white focus:rounded-lg focus:text-sm focus:font-medium">
          Skip to main content
        </a>
        {/* Promo surfaces — banner renders above header, modal is global */}
        <StickyDiscountBanner />
        <ExitIntentModal />
        <AuthProvider>
        <AutoLinkProvider>
          <main id="main-content" role="main">
            {children}
          </main>
        </AutoLinkProvider>
        </AuthProvider>

        <Suspense fallback={null}>
          <GlobalEmbedHandler />
        </Suspense>
      </body>
    </html>
  );
}
