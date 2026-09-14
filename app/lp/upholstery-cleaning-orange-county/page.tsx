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
import { LogoTicker } from "@/components/LogoTicker";
import { CarpetSliderPerks } from "@/components/games/CarpetSliderPerks";
import { CTA } from "@/components/CTA";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
  title:
    "Upholstery Cleaning in Orange County — Safe for Kids & Pets | Angara Steamers",
  description:
    "Professional upholstery cleaning in Orange County, steamed at 200°F with shampoos safe for kids and pets. If a stain comes back, we re-clean it free. Book now.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_COMPANY_WEBSITE || "https://angarasteamers.com",
  ),
  openGraph: {
    title:
      "Upholstery Cleaning in Orange County — Safe for Kids & Pets | Angara Steamers",
    description:
      "Professional upholstery cleaning in Orange County, steamed at 200°F with shampoos safe for kids and pets. If a stain comes back, we re-clean it free. Book now.",
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
            image: "https://angarasteamers.com/og_image.jpg",
            url: process.env.NEXT_PUBLIC_COMPANY_WEBSITE,
            telephone: process.env.NEXT_PUBLIC_COMPANY_PHONE,
            email: process.env.NEXT_PUBLIC_COMPANY_EMAIL,
            address: {
              "@type": "PostalAddress",
              addressLocality: "Los Angeles",
              addressRegion: "CA",
              addressCountry: "US",
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
        <Hero
          video={true}
          header="Odors, Dust, Stains, and Dander — Removal. Upholstery & Carpet Cleaning."
          subheader="Cleaned with safe shampoos, gentle enough for kids and pets. Guaranteed — if the stain comes back, we re-clean it free."
        />
      </section>
      <section className="py-8 md:py-16">
        <LogoTicker />
      </section>
      <section className="py-8 md:py-16">
        <CarpetSliderPerks />
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
      <section className="max-w-6xl mx-auto mb-16">
        <CTA />
      </section>
    </div>
  );
}
