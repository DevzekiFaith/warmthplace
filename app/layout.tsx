import type { Metadata } from "next";
import "./globals.css";
import { CurrencyProvider } from "@/components/CurrencyContext";
import { CartProvider } from "@/components/CartContext";
import { Navbar } from "@/components/Navbar";
import { CartDrawer } from "@/components/CartDrawer";
import { Footer } from "@/components/Footer";
import { SITE_NAME, SITE_TAGLINE, SITE_DESCRIPTION } from "@/lib/constants";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: {
    default: `${SITE_NAME} — ${SITE_TAGLINE}`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  metadataBase: new URL(process.env.SITE_URL || "http://localhost:3000"),
  keywords: [
    "contemporary African art",
    "African art gallery",
    "original African paintings",
    "Lagos art studio",
    "African luxury home decor",
    "burnished terracotta ceramics",
    "adire indigo textiles",
    "African bronze sculpture",
    "fine art prints Africa",
  ],
  icons: {
    icon: [
      { url: "/icon.png", sizes: "512x512", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    shortcut: "/icon.png",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  authors: [{ name: "Warmthplace Art Studio Curatorial Team" }],
  openGraph: {
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
    url: "/",
    siteName: SITE_NAME,
    images: [
      {
        url: "/images/catalogue/indigo-tide.jpg",
        width: 1200,
        height: 630,
        alt: "Warmthplace Art Studio Contemporary Collection",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
    images: ["/images/catalogue/indigo-tide.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/icon.png" type="image/png" sizes="512x512" />
        <link rel="icon" href="/favicon-32x32.png" type="image/png" sizes="32x32" />
        <link rel="icon" href="/favicon-16x16.png" type="image/png" sizes="16x16" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180" />
      </head>
      <body suppressHydrationWarning className="min-h-full flex flex-col">
        <CurrencyProvider>
          <CartProvider>
            <Navbar />
            <main style={{ flexGrow: 1 }}>{children}</main>
            <Footer />
            <CartDrawer />
          </CartProvider>
        </CurrencyProvider>
        <Analytics />
      </body>
    </html>
  );
}
