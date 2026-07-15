import type { Metadata } from "next";
import Script from "next/script";
import { ThemeProvider } from "@/components/Context/ThemeProvider";
import SmoothScroll from "@/components/GlobalComponent/SmoothScroll";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { inter, spaceGrotesk, jetbrainsMono } from './fonts'

export const metadata: Metadata = {
  metadataBase: new URL("https://muhammad-umer-porfolio.vercel.app"),
  title: "Muhammad Umer Nadeem - Frontend, WordPress & Shopify Developer",
  description:
    "I build fast, conversion-focused websites using React, WordPress, Shopify, and modern UI systems.",
  keywords: [
    "Muhammad Umer Nadeem",
    "Frontend Developer",
    "WordPress Developer",
    "Shopify Developer",
    "React Developer",
    "Next.js Developer Pakistan",
    "Shopify Liquid Developer",
  ],
  authors: [{ name: "Muhammad Umer Nadeem" }],
  robots: { index: true, follow: true },
  openGraph: {
    title: "Muhammad Umer Nadeem - Frontend, WordPress & Shopify Developer",
    description:
      "I build fast, conversion-focused websites using React, WordPress, Shopify, and modern UI systems.",
    url: "https://muhammad-umer-porfolio.vercel.app",
    siteName: "Muhammad Umer Nadeem",
    images: [{ url: "/img/og-image.png", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Umer Nadeem - Frontend, WordPress & Shopify Developer",
    description:
      "I build fast, conversion-focused websites using React, WordPress, Shopify, and modern UI systems.",
    images: ["/Sarib_Img/og-image.png"],
  },
  icons: { icon: "/favicon.ico" },
  verification: {
    google: "Fx4HLxU_jN8VsZQq1Ti1hrdW1Ur2nrnSfeedmWLlqek",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <head>
        {/* Inline script to prevent theme flash */}
        <Script
          id="theme-script"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('portfolio-theme');
                  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  
                  if (theme === 'dark' || (!theme && prefersDark)) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.add('light');
                  }
                } catch (e) {
                  document.documentElement.classList.add('dark');
                }
              })();
            `,
          }}
        />

        {/* JSON-LD Person Schema */}
        <Script
          id="person-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Muhammad Umer Nadeem",
              jobTitle: "Frontend & WordPress Developer",
              url: "https://muhammad-umer-porfolio.vercel.app",
              email: "notyourbotbut@gmail.com",
              sameAs: [
                "https://github.com/sarib2005",
                "https://www.linkedin.com/in/sarib-ali-khan/",
              ],
            }),
          }}
        />
      </head>
      <body>
        <ThemeProvider>
          <SmoothScroll>
            {children}
          </SmoothScroll>
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
