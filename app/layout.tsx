import type { Metadata } from "next";
import Script from "next/script";
import { ThemeProvider } from "@/components/Context/ThemeProvider";
import SmoothScroll from "@/components/GlobalComponent/SmoothScroll";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { inter, spaceGrotesk, jetbrainsMono } from './fonts'

export const metadata: Metadata = {
  metadataBase: new URL("https://m-umer-portfolio.vercel.app/"),
  title: "Muhammad Umer Nadeem | Software Engineer | Laravel & Backend Developer",
  description:
    "Backend-focused Software Engineer specializing in Laravel, PHP, MySQL, RESTful APIs, scalable SaaS applications, ERP systems, and modern full-stack web development.",
  keywords: [
    "Muhammad Umer Nadeem",
    "Software Engineer",
    "Backend Developer",
    "Laravel Developer",
    "PHP Developer",
    "Full Stack Developer",
    "React Developer",
    "REST API Developer",
    "MySQL",
    "Redis",
    "Stripe Integration",
    "ERP Developer",
    "SaaS Developer",
    "Pakistan Software Engineer",
    "Lahore Software Engineer",
  ],
  authors: [{ name: "Muhammad Umer Nadeem" }],
  robots: { index: true, follow: true },
  openGraph: {
    title:
      "Muhammad Umer Nadeem | Software Engineer | Laravel & Backend Developer",
    description:
      "Building scalable SaaS platforms, business applications, RESTful APIs, and modern web solutions using Laravel, PHP, MySQL, React, and cloud infrastructure.",
    url: "https://m-umer-portfolio.vercel.app/",
    siteName: "Muhammad Umer Nadeem",
    images: [{ url: "/img/og-image.png", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Umer Nadeem | Software Engineer | Laravel & Backend Developer",
    description: "Backend-foused Software Engineer building scalable Laravel applications, SaaS platforms, REST APIs, and modern web solutions.",
    images: ["/img/og-image.png"],
  },
  icons: { icon: "/favicon.ico" },
  verification: {
    google: "c2Ado4i-tWzdT2Dp4rKCUY8j9EqyY1M_pw5XLiXRuqk",
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
              jobTitle: "Software Engineer",
              url: "https://m-umer-portfolio.vercel.app/",
              email: "mailto:umernadeem005@gmail.com",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Lahore",
                addressCountry: "Pakistan"
              },
              knowsAbout: [
                "Laravel",
                "PHP",
                "MySQL",
                "RESTful APIs",
                "React",
                "Redis",
                "Stripe",
                "CloudPanel",
                "Linux",
                "Software Architecture",
                "System Design",
                "ERP Development",
                "SaaS Development"
              ],
              sameAs: [
                "https://github.com/Muhammad-Umer-Nadeem",
                "https://www.linkedin.com/in/muhammad-umer-nadeem/",
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
