import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import { Header } from "@/components/header";
import { BottomNav } from "@/components/bottom-nav";
import { DisclaimerBanner } from "@/components/disclaimer-banner";
import { FirstVisitModal } from "@/components/first-visit-modal";
import { PWAInstallPrompt } from "@/components/pwa-install-prompt";

const inter = Inter({ subsets: ["latin"], variable: "--font-geist-sans" });

export const metadata: Metadata = {
  metadataBase: new URL("https://peptidex.app"),
  alternates: {
    languages: {
      "en": "https://peptidex.app",
    },
  },
  title: {
    default: "PeptiDex: Independent Peptide Research",
    template: "%s | PeptiDex",
  },
  description: "Explore 30+ research peptides like BPC-157 and Tirzepatide. Access clinical studies, dosage calculators, half-life graphs, and COA databases.",
  keywords: [
    "peptide research", "BPC-157", "TB-500", "Semaglutide", "CJC-1295", "Ipamorelin",
    "peptide dosage calculator", "peptide half-life", "research peptides", "peptide COA",
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
    siteName: "PeptiDex",
    title: "PeptiDex   Research-Grade Peptide Reference & Tools",
    description: "The most comprehensive peptide research platform. Explore 33 peptides with clinical studies, dosage calculators, PK plasma graphs, COA verification, and AI recommendations.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "PeptiDex   Research-Grade Peptide Reference" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "PeptiDex   Research-Grade Peptide Reference & Tools",
    description: "The most comprehensive peptide research platform. Clinical studies, dosage calculators, COA verification, and AI recommendations.",
    images: ["/og-image.png"],
  },
  manifest: "/manifest.json",
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "PeptiDex",
  },
};


export const viewport: Viewport = {
  themeColor: "#09090b",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
             __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "PeptiDex",
              "url": "https://peptidex.app",
              "logo": "https://peptidex.app/logo.png",
              "sameAs": [
                 "https://twitter.com/peptidex",
                 "https://facebook.com/peptidex"
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
              "url": "https://peptidex.app/",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://peptidex.app/search?q={search_term_string}",
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
        <Header />
        <FirstVisitModal />
        <PWAInstallPrompt />
        <main id="main-content" role="main" className="pb-40 min-h-[calc(100vh-64px)]">
          {children}
        </main>
        <div className="hidden md:block fixed bottom-14 left-0 right-0 z-40 pointer-events-none">
          <DisclaimerBanner />
        </div>
        <footer className="hidden md:block fixed bottom-[3.75rem] left-0 right-0 z-40 pointer-events-auto" role="contentinfo">
          <div className="flex items-center justify-center gap-4 py-2">
            <Link href="/about" className="text-[10px] text-zinc-600 hover:text-zinc-400 transition-colors">About</Link>
            <Link href="/about/editorial-policy" className="text-[10px] text-zinc-600 hover:text-zinc-400 transition-colors">Editorial Policy</Link>
            <Link href="/legal" className="text-[10px] text-zinc-600 hover:text-zinc-400 transition-colors">Privacy &amp; Terms</Link>
          </div>
        </footer>
        <BottomNav />
      </body>
    </html>
  );
}
