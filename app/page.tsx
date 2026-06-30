import { Team } from "@/components/oldComponents/Team";
import { VideoReviews } from "@/components/oldComponents/VideoReviews";
import { Hero } from "@/components/Hero";
import { Testimonials } from "@/components/Testimonials";
import { WhyUs } from "@/components/oldComponents/WhyUs";
import GoogleMap from "@/components/GoogleMap";
import { WaveDivider } from "@/components/common/WaveDivider";
import SafeShampoos from "@/components/SafeShampoos";
import { SectionWrapper } from "@/components/common/SectionWrapper";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Professional Upholstery & Carpet Cleaning Service in LA | Angara Steamers",
  description:
    "Restore your furniture's freshness with Angara Steamers. Top-rated, safe, and professional upholstery and carpet cleaning across Los Angeles. Fast, reliable results for families and pets.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_COMPANY_WEBSITE || "http://angaraprosteamers.com",
  ),
  openGraph: {
    title: "Angara Steamers | Professional Upholstery Cleaning in LA",
    description:
      "Expert eco-friendly steam cleaning for couches, carpets, and mattresses. Serving all of Los Angeles.",
    url: process.env.NEXT_PUBLIC_COMPANY_WEBSITE,
    siteName: process.env.NEXT_PUBLIC_COMPANY_NAME,
    images: [
      {
        url: "/images/og_image.webp",
        width: 1200,
        height: 630,
        alt: "Angara Steamers Professional Upholstery Cleaning",
      },
    ],
    type: "website",
  },
};

export default function HomePage() {
  return (
    <div className="mx-auto">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            name: process.env.NEXT_PUBLIC_COMPANY_NAME,
            image: "https://angaraprosteamers.com/og-image.jpg",
            url: process.env.NEXT_PUBLIC_COMPANY_WEBSITE,
            telephone: process.env.NEXT_PUBLIC_COMPANY_PHONE,
            email: process.env.NEXT_PUBLIC_COMPANY_EMAIL,
            address: {
              "@type": "PostalAddress",
              addressLocality: "Los Angeles",
              addressRegion: "CA",
              addressCountry: "US",
            },
            geo: {
              "@type": "GeoCoordinates",
              latitude: 33.9792,
              longitude: -118.4138,
            },
            areaServed: { "@type": "City", name: "Los Angeles" },
            priceRange: "$$",
            sameAs: [
              process.env.NEXT_PUBLIC_COMPANY_FB,
              process.env.NEXT_PUBLIC_COMPANY_IG,
            ],
          }),
        }}
      />
      <section className="px-4">
        <Hero video={false} />
      </section>

      <section className="relative pt-32 pb-32">
        <div className="absolute top-0 left-0 -z-10 h-[30%] w-full bg-linear-180 from-primary/10 to-background"></div>
        <div className="absolute bottom-0 left-0 -z-10 h-[30%] w-full bg-linear-180 from-background to-primary/10"></div>
        <WaveDivider position="top" fill="var(--color-background)" />
        <WaveDivider position="bottom" fill="var(--color-background)" />
        <Testimonials />
      </section>

      <section>
        <Team />
      </section>
      <section className="py-32 mx-auto max-w-7xl px-4">
        <GoogleMap lat={33.9792} lng={-118.4138} zoom={14} />
      </section>

      <section className="space-y-4">
        <WhyUs />
      </section>
      <SectionWrapper>
        <SafeShampoos />
      </SectionWrapper>
      <section className="mb-16">
        <VideoReviews />
      </section>
    </div>
  );
}
