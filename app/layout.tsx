import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./styles/buttons.css";
import "./globals.css";
import { LoadingBar } from "@/components/common/LoadingBar";
import { ThemeProvider } from "next-themes";
import { SmoothScroll } from "@/components/common/SmoothScroll";
import { GoogleTagManager } from "@next/third-parties/google";
import { fetchStrapi } from "@/lib/strapi";
import { StrapiResponse, ServiceHub } from "@/types";
import { NavbarClient } from "@/components/NavbarClient";
import { Footer } from "@/components/common/Footer";
import { STATIC_PAGES } from "@/data/links";
import ScrollToTop from "@/components/common/ScrollToTop";

const GTM = process.env.NEXT_PUBLIC_GTM || "GTM-TJF7Q4JF";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_COMPANY_WEBSITE || "https://angarasteamers.com",
  ),
  alternates: {
    canonical: "/",
  },
  title: "Professional Upholstery & Carpet Cleaning Service in LA",
  description:
    "Restore your furniture's freshness with Angara Steamers. We provide top-rated, safe, and professional upholstery and carpet cleaning across Los Angeles. Fast, reliable results for families and pets.",
};
const navData: StrapiResponse<ServiceHub> = await fetchStrapi("service-hubs", {
  populate: ["service_pages"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <GoogleTagManager gtmId={GTM} />
      <body className="min-h-full flex flex-col">
        <LoadingBar />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SmoothScroll>
            <NavbarClient staticItems={STATIC_PAGES} navItems={navData.data} />
            <main className="flex-1">{children}</main>
            <Footer navItems={navData.data} />
            <ScrollToTop />
          </SmoothScroll>
        </ThemeProvider>
        <div id="portal-root"></div>
      </body>
    </html>
  );
}
