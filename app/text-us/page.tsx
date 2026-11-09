import { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { MessageSquareText } from "lucide-react";
import { Breadcrumbs } from "@/components/common/BreadCrumbs";

export const metadata: Metadata = {
  title: "Text Us | Angara Steamers",
  description:
    "Send Angara Steamers a text about upholstery, carpet or rug cleaning in Los Angeles and Orange County.",
  alternates: {
    canonical: "/text-us",
  },
  openGraph: {
    title: "Text Us | Angara Steamers",
    description: "Send us a text about your cleaning job.",
    url: "/text-us",
    siteName: "Angara Steamers",
    type: "website",
    images: [
      {
        url: "/images/og_image.webp",
        width: 1200,
        height: 630,
        alt: "Angara Steamers Professional Upholstery Cleaning",
      },
    ],
  },
};

const breadcrumbSegments = [
  { label: "Home", path: "/" },
  { label: "Text Us", path: "/text-us" },
];

export default function TextUsPage() {
  return (
    <div className="min-h-[70vh] bg-background py-16 px-4 md:px-8 max-w-3xl mx-auto">
      <Breadcrumbs segments={breadcrumbSegments} />

      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <MessageSquareText className="w-10 h-10 text-primary" />
          <h1 className="text-4xl font-black text-foreground">Text Us</h1>
        </div>

        <p className="text-lg text-muted-foreground">
          Have a question about cleaning your couch, chairs, rugs or carpet?
          Open the chat button in the bottom corner of this page, leave your
          name and phone number, and we will text you back.
        </p>

        <p className="text-muted-foreground">
          We text about your quote, your booking and your cleaning. Message
          frequency varies. Message and data rates may apply. Reply STOP to
          opt out, or HELP for help. Read our{" "}
          <Link href="/policy" className="text-primary underline">
            Privacy Policy
          </Link>{" "}
          and{" "}
          <Link href="/policy#terms" className="text-primary underline">
            Terms of Service
          </Link>
          .
        </p>
      </div>

      <Script
        src="https://widgets.leadconnectorhq.com/loader.js"
        data-resources-url="https://widgets.leadconnectorhq.com/chat-widget/loader.js"
        data-widget-id="6af14d943c83530a4297300a"
        data-source="WEB_USER"
        strategy="afterInteractive"
      />
    </div>
  );
}
