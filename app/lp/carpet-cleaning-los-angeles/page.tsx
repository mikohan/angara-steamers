import { Metadata } from "next";
import {
  SearchCheck,
  RotateCcw,
  Lock,
  Camera,
  BadgeDollarSign,
  Sparkles,
  ClipboardCheck,
  ShieldCheck,
  PawPrint,
  CalendarClock,
} from "lucide-react";
import { Hero } from "@/components/Hero";
import { LogoTicker } from "@/components/LogoTicker";
import { CarpetSliderPerks } from "@/components/games/CarpetSliderPerks";
import { Testimonials } from "@/components/Testimonials";
import { LatestProjectsService } from "@/components/LatestProjectsService";
import FAQ from "@/components/FAQ";
import { CTA } from "@/components/CTA";
import { PriceCard } from "@/components/PriceCard";
import { AddOns } from "@/components/AddOns";
import { SectionWrapper } from "@/components/common/SectionWrapper";
import { LpTopBar } from "@/components/lp/LpTopBar";
import { LpStickyBar } from "@/components/lp/LpStickyBar";
import { LpCartBar } from "@/components/lp/LpCartBar";
import { LpFooter } from "@/components/lp/LpFooter";
import { QuoteDialog } from "@/components/QuoteDialog";
import { prices } from "@/data/prices";
import { fetchStrapi } from "@/lib/strapi";
import { firstImage } from "@/lib/utils";
import { ServicePage, StrapiResponse } from "@/types";

const TITLE =
  "Carpet Steam Cleaning in Los Angeles — Exact Price, Safe for Kids & Pets | Angara Steamers";
const DESCRIPTION =
  "Hot steam carpet cleaning in Los Angeles. Exact price before we start, safe for kids and pets the same day, free pet hair removal. We take 14 jobs a week.";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
  title: TITLE,
  description: DESCRIPTION,
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_COMPANY_WEBSITE || "https://angarasteamers.com",
  ),
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${process.env.NEXT_PUBLIC_COMPANY_WEBSITE}/lp/carpet-cleaning-los-angeles`,
    siteName: process.env.NEXT_PUBLIC_COMPANY_NAME,
    images: [
      {
        url: "/images/og_image.webp",
        width: 1200,
        height: 630,
        alt: "Angara Steamers carpet steam cleaning",
      },
    ],
    type: "website",
  },
};

// Carpet service page from the CMS: real carpet projects (photos) and the FAQ.
async function getCarpetService(): Promise<ServicePage | undefined> {
  const res: StrapiResponse<ServicePage> = await fetchStrapi("service-pages", {
    filters: { slug: { $eq: "carpet-cleaning" } },
    populate: {
      faq: true,
      projects: { populate: ["location_page", "media_gallery"] },
    },
  });
  return res?.data?.[0];
}

const offerPoints = [
  {
    icon: BadgeDollarSign,
    title: "Exact price first",
    text: "Send photos, get your price. The price we quote is the price you pay.",
  },
  {
    icon: ShieldCheck,
    title: "Safe for kids & pets",
    text: "Hot steam and safe shampoos. Your family can use the room the same day.",
  },
  {
    icon: PawPrint,
    title: "Free pet hair removal",
    text: "We pull the fur out of the carpet before the steam clean. A $50 value, free.",
  },
  {
    icon: CalendarClock,
    title: "14 jobs a week",
    text: "Two technicians, a set number of jobs. Book early to get the day you want.",
  },
];

const guarantees = [
  {
    icon: SearchCheck,
    title: "Honest stain check",
    text: "Before we start, we look at every stain and tell you which will come out, which will fade and which will stay. You decide before you pay.",
  },
  {
    icon: RotateCcw,
    title: "Re-clean on the spot",
    text: "Before we leave, walk the room with us. Any spot you are unhappy with, we go over again right then, free.",
  },
  {
    icon: Lock,
    title: "Price lock",
    text: "The price from your photos is the price you pay at the door.",
  },
];

const steps = [
  {
    icon: Camera,
    title: "Send a photo",
    text: "Tap \"Get exact price\", tell us how many rooms, and send a photo or two.",
  },
  {
    icon: BadgeDollarSign,
    title: "Get your exact price",
    text: "We reply fast with your price and the open times near you.",
  },
  {
    icon: Sparkles,
    title: "Deep steam clean",
    text: "Pet hair removal, stain treatment, then hot steam extraction pulls dirt, dust mites and odors out of the fibers.",
  },
  {
    icon: ClipboardCheck,
    title: "Walk-through",
    text: "You check every spot with the technician before he leaves.",
  },
];

function GetPriceButton({ label = "Get my exact price" }: { label?: string }) {
  return (
    <QuoteDialog>
      <button className="rounded-full bg-primary px-8 py-4 text-lg font-bold text-white shadow-lg hover:opacity-90 active:scale-95 transition-transform">
        {label}
      </button>
    </QuoteDialog>
  );
}

export default async function CarpetCleaningLandingPage() {
  const service = await getCarpetService();
  const strapiUrl =
    process.env.NEXT_PUBLIC_STRAPI_URL || "https://cms.angaracleaning.com";

  const projects = (service?.projects || [])
    .filter((p): p is typeof p & { createdAt: string } => !!p.createdAt)
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .map((p) => ({ ...p, date: new Date(p.createdAt) }))
    .slice(0, 4);

  // Hero photo: newest real carpet job photo, when the CMS has one.
  const heroMedia = projects.length
    ? firstImage(projects[0].media_gallery)
    : undefined;
  const heroImage = heroMedia ? `${strapiUrl}${heroMedia.url}` : undefined;

  const carpetPrices = prices.filter((p) =>
    ["Carpets", "Area Rugs"].includes(p.category),
  );

  return (
    <div className="mx-auto">
      <LpTopBar />

      {/* 1. Hero: promise + one action */}
      <section className="px-4">
        <Hero
          video={false}
          heroImage={heroImage}
          header="Carpet Steam Cleaning in Los Angeles. Exact Price Before We Start."
          subheader="Hot steam pulls dirt, dust mites and pet odors out of your carpet. Safe for kids and pets the same day. Free pet hair removal ($50 value)."
        />
      </section>

      {/* 2. The offer in four points */}
      <section className="mx-auto max-w-6xl px-4 pb-12">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {offerPoints.map((o) => (
            <div
              key={o.title}
              className="rounded-2xl border border-primary/15 bg-primary/5 p-5"
            >
              <o.icon className="h-7 w-7 text-primary" />
              <h3 className="mt-3 text-lg font-bold">{o.title}</h3>
              <p className="mt-1 text-sm text-muted">{o.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-8">
        <LogoTicker />
      </section>

      {/* 3. Interactive before / after */}
      <section className="py-8 md:py-16">
        <CarpetSliderPerks />
      </section>

      {/* 4. Prices with add to cart */}
      <section id="prices" className="mx-auto max-w-6xl px-4 py-12 md:py-20">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
          Carpet &amp; rug prices
        </h2>
        <p className="mt-3 text-lg text-muted">
          Exact prices. What you see is what you pay. Add items to your cart,
          or tap &quot;Get my exact price&quot; and send photos.
        </p>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {carpetPrices.map((p) => (
            <PriceCard key={p.item} {...p} />
          ))}
        </div>
        <AddOns className="mt-12" only={["Pet hair removal"]} />
        <LpCartBar />
      </section>

      {/* 5. Guarantees */}
      <SectionWrapper>
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            Our three promises
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {guarantees.map((g) => (
              <div
                key={g.title}
                className="rounded-2xl bg-background p-6 shadow-sm border border-muted/20"
              >
                <g.icon className="h-8 w-8 text-primary" />
                <h3 className="mt-4 text-xl font-bold">{g.title}</h3>
                <p className="mt-2 text-muted">{g.text}</p>
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* 6. How it works */}
      <section className="mx-auto max-w-6xl px-4 py-12 md:py-20">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
          How it works
        </h2>
        <ol className="mt-8 grid gap-6 md:grid-cols-4">
          {steps.map((s, i) => (
            <li key={s.title} className="rounded-2xl border border-muted/20 p-6">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-white font-bold">
                  {i + 1}
                </span>
                <s.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mt-4 text-lg font-bold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted">{s.text}</p>
            </li>
          ))}
        </ol>
        <div className="mt-10 flex justify-center">
          <GetPriceButton />
        </div>
      </section>

      {/* 7. Real carpet jobs */}
      {service && projects.length > 0 && (
        <section className="py-12">
          <LatestProjectsService projects={projects} service={service} />
        </section>
      )}

      {/* 8. Reviews */}
      <section className="mx-auto max-w-7xl">
        <SectionWrapper>
          <Testimonials />
        </SectionWrapper>
      </section>

      {/* 9. FAQ */}
      {service?.faq && service.faq.length > 0 && (
        <SectionWrapper>
          <FAQ items={service.faq} serviceName={service.title} />
        </SectionWrapper>
      )}

      {/* 10. Final form */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <CTA />
      </section>

      <LpFooter />
      <LpStickyBar />
    </div>
  );
}
