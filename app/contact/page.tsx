// app/contact/page.tsx
import { Metadata } from "next";
import { ContactPageContent } from "@/components/ContactPageContent";

export const metadata: Metadata = {
  title: "Contact Angara Steamers | Upholstery & Carpet Cleaning in LA",
  description:
    "Get in touch with Angara Steamers for professional upholstery, carpet, and mattress cleaning services in Los Angeles. Request a free quote today.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Angara Steamers | Upholstery & Carpet Cleaning in LA",
    description:
      "Professional upholstery and carpet cleaning services in the Los Angeles area.",
    url: "/contact",
    siteName: "Angara Steamers",
    type: "website",
  },
};

export default function ContactPage() {
  return <ContactPageContent />;
}
