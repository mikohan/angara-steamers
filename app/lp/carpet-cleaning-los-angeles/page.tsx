import { Metadata } from "next";
import Image from "next/image";
import { Check } from "lucide-react";
import { Testimonials } from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import { CTA } from "@/components/CTA";
import { PriceCard } from "@/components/PriceCard";
import { AddOns } from "@/components/AddOns";
import { SectionWrapper } from "@/components/common/SectionWrapper";
import { GoogleStars } from "@/components/oldComponents/GoogleStars";
import { VideoComponentTestimonials } from "@/components/oldComponents/VideoComponentTestimonials";
import { LpTopBar } from "@/components/lp/LpTopBar";
import { LpStickyBar } from "@/components/lp/LpStickyBar";
import { LpCartBar } from "@/components/lp/LpCartBar";
import { LpFooter } from "@/components/lp/LpFooter";
import { LpHeroVideo } from "@/components/lp/LpHeroVideo";
import { QuoteDialog } from "@/components/QuoteDialog";
import { BUSINESS_CONFIG } from "@/data/business-config";
import { prices } from "@/data/prices";
import { fetchStrapi } from "@/lib/strapi";
import { splitMedia } from "@/lib/utils";
import { ServicePage, StrapiResponse } from "@/types";
import VladAtWork from "@/public/oldMedia/couch/hero-me-color.png";
import VladAndVasilii from "@/public/images/me_vasya.webp";
import Review1Poster from "@/public/oldMedia/couch/test1.jpg";
import Review2Poster from "@/public/oldMedia/couch/test2.jpg";
import Review3Poster from "@/public/oldMedia/couch/test3.jpg";

// Hero video: put the vertical (9:16) file in /public/videos/ and set the
// path here, e.g. "/videos/lp-carpet-vlad.mp4". Empty = photo placeholder.
const HERO_VIDEO_SRC = "";

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

// Carpet and area-rug service pages from the CMS: real job photos and the FAQ.
async function getCarpetServices(): Promise<ServicePage[]> {
  const res: StrapiResponse<ServicePage> = await fetchStrapi("service-pages", {
    filters: { slug: { $in: ["carpet-cleaning", "area-rugs"] } },
    populate: {
      faq: true,
      projects: { populate: ["location_page", "media_gallery"] },
    },
  });
  return res?.data || [];
}

// Reviews about Angara's steam cleaning (carpets, rugs, couches).
const ANGARA_REVIEWS = [
  "Brianna Villa",
  "Bankroll Bombshell",
  "Blanka Dominguez",
  "Woman in the World",
  "Luis Ortiz",
  "Rosa Chen",
  "Betsy Brooks",
  "Dias Sarbay",
];

// How we work, in Vlad's words.
const promises = [
  "I look at every stain first and tell you which will come out, which will fade and which will stay. You decide before you pay.",
  "The price from your photos is the price you pay at the door.",
  "Before we leave, we walk the room together. Point at any spot, and we go over it again right then.",
  "Hot steam and safe shampoos, so kids and pets are back on the carpet the same day.",
  "Pet hair removal is on us: a $50 add-on, free with your carpet clean.",
];

const steps = [
  {
    title: "Send a photo",
    text: "Tap “Get my exact price”, tell us how many rooms and send a photo or two.",
  },
  {
    title: "Get your exact price",
    text: "We text you back fast with your price and the open times near you.",
  },
  {
    title: "We steam clean",
    text: "Pet hair out, stains treated, then hot steam pulls dirt, dust mites and odors out of the fibers.",
  },
  {
    title: "Walk the room with us",
    text: "You check every spot with the technician before he leaves.",
  },
];

const videoReviews = [
  { mp4: "/videos/rev1.mp4", webm: "/videos/rev1.webm", poster: Review1Poster.src },
  { mp4: "/videos/rev2.mp4", webm: "/videos/rev2.webm", poster: Review2Poster.src },
  { mp4: "/videos/rev3.mp4", webm: "/videos/rev3.webm", poster: Review3Poster.src },
];

function GetPriceButton({
  label = "Get my exact price",
  className = "",
}: {
  label?: string;
  className?: string;
}) {
  return (
    <QuoteDialog>
      <button
        className={`w-full rounded-full bg-primary px-8 py-4 text-lg font-bold text-white shadow-lg transition-transform hover:opacity-90 active:scale-95 sm:w-auto ${className}`}
      >
        {label}
      </button>
    </QuoteDialog>
  );
}

export default async function CarpetCleaningLandingPage() {
  const services = await getCarpetServices();
  const service = services.find((s) => s.slug === "carpet-cleaning");
  const strapiUrl =
    process.env.NEXT_PUBLIC_STRAPI_URL || "https://cms.angaracleaning.com";

  // Real photos from carpet and rug jobs, newest jobs first.
  const seen = new Set<string>();
  const jobPhotos = services
    .flatMap((s) => s.projects || [])
    .filter((p) => {
      const key = String(p.id ?? p.slug);
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .sort(
      (a, b) =>
        new Date(b.createdAt ?? 0).getTime() -
        new Date(a.createdAt ?? 0).getTime(),
    )
    .flatMap((p) =>
      splitMedia(p.media_gallery)
        .images.slice(0, 3)
        .map((m) => ({
          url: `${strapiUrl}${m.url}`,
          alt: m.alternativeText || p.title || "Carpet cleaning job",
        })),
    )
    .slice(0, 6);

  const carpetPrices = prices.filter((p) =>
    ["Carpets", "Area Rugs"].includes(p.category),
  );

  return (
    <div className="mx-auto">
      <LpTopBar />

      {/* 1. Hero: headline, vertical video, one button */}
      <section className="mx-auto max-w-6xl px-4 pt-6 pb-12 md:pt-14 md:pb-20">
        <div className="grid items-center gap-8 md:grid-cols-2 md:gap-12">
          <div className="text-center md:text-left">
            <div className="flex justify-center md:justify-start">
              <GoogleStars starsCount={5} rating={BUSINESS_CONFIG.rating} text="" />
            </div>
            <h1 className="mt-4 text-3xl font-bold tracking-tight md:text-5xl">
              Carpet steam cleaning in LA. You know the exact price before we
              start.
            </h1>
            <p className="mt-4 text-lg text-muted md:text-xl">
              Hot steam pulls dirt, dust mites and pet odors out of your
              carpet. Safe for kids and pets the same day. Pet hair removal
              free ($50 value).
            </p>
            <div className="mt-6 hidden md:block">
              <GetPriceButton />
              <p className="mt-3 text-sm text-muted">
                We reply in minutes · We take 14 jobs a week
              </p>
            </div>
          </div>
          <div>
            <LpHeroVideo
              src={HERO_VIDEO_SRC || undefined}
              poster={VladAtWork.src}
              caption="Vlad, owner"
            />
            <div className="mt-6 text-center md:hidden">
              <GetPriceButton />
              <p className="mt-3 text-sm text-muted">
                We reply in minutes · We take 14 jobs a week
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Who we are + how we work, in Vlad's voice */}
      <SectionWrapper>
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 md:grid-cols-2 md:gap-12">
          <div className="relative mx-auto aspect-4/5 w-full max-w-sm overflow-hidden rounded-3xl shadow-xl">
            <Image
              src={VladAndVasilii}
              alt="Vasilii and Vlad of Angara Steamers"
              fill
              sizes="(max-width: 768px) 100vw, 400px"
              className="object-cover"
            />
            <div className="absolute bottom-3 left-3 rounded-full bg-black/55 px-3 py-1 text-xs font-semibold text-white">
              Vasilii &amp; Vlad
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Hi, I&apos;m Vlad.
            </h2>
            <p className="mt-3 text-lg text-muted">
              Vasilii and I run Angara Steamers. Every job is done by one of
              our own technicians. Here is how we work:
            </p>
            <ul className="mt-6 space-y-4">
              {promises.map((p) => (
                <li key={p} className="flex gap-3">
                  <Check className="mt-1 h-5 w-5 shrink-0 text-primary" />
                  <span className="text-foreground">{p}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </SectionWrapper>

      {/* 3. Real job photos */}
      {jobPhotos.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-12 md:py-20">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Real carpets we cleaned
          </h2>
          <p className="mt-3 text-lg text-muted">
            Photos from our own jobs around Los Angeles.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
            {jobPhotos.map((ph) => (
              <div
                key={ph.url}
                className="relative aspect-square overflow-hidden rounded-2xl"
              >
                <Image
                  src={ph.url}
                  alt={ph.alt}
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 4. Prices with add to cart */}
      <section id="prices" className="mx-auto max-w-6xl px-4 py-12 md:py-20">
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
          Carpet &amp; rug prices
        </h2>
        <p className="mt-3 text-lg text-muted">
          What you see is what you pay. Add items to your cart, or tap “Get my
          exact price” and send photos.
        </p>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {carpetPrices.map((p) => (
            <PriceCard key={p.item} {...p} />
          ))}
        </div>
        <AddOns className="mt-12" only={["Pet hair removal"]} />
        <LpCartBar />
      </section>

      {/* 5. Video reviews: real customers on camera */}
      <SectionWrapper>
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Our customers, in their own words
          </h2>
          <div className="mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 md:grid md:grid-cols-3 md:overflow-visible">
            {videoReviews.map((v) => (
              <div
                key={v.mp4}
                className="w-[75%] shrink-0 snap-center md:w-auto"
              >
                <VideoComponentTestimonials
                  source_mp4={v.mp4}
                  source_webm={v.webm}
                  autoPlay={false}
                  muted={false}
                  loop={false}
                  poster={v.poster}
                />
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* 6. How it works */}
      <section className="mx-auto max-w-6xl px-4 py-12 md:py-20">
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
          How it works
        </h2>
        <ol className="mt-8 grid gap-4 md:grid-cols-4">
          {steps.map((s, i) => (
            <li
              key={s.title}
              className="flex gap-4 rounded-2xl border border-muted/20 p-5 md:block"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary font-bold text-white">
                {i + 1}
              </span>
              <div>
                <h3 className="text-lg font-bold md:mt-4">{s.title}</h3>
                <p className="mt-1 text-sm text-muted">{s.text}</p>
              </div>
            </li>
          ))}
        </ol>
        <div className="mt-10 text-center">
          <GetPriceButton />
        </div>
      </section>

      {/* 7. Meet your technician */}
      <SectionWrapper>
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 md:grid-cols-2 md:gap-12">
          <div className="md:order-2">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Meet your technician
            </h2>
            <p className="mt-3 text-lg text-muted">
              Vasilii does most of our carpet jobs. He shows you every stain
              before he starts, and walks the room with you before he leaves.
              Same person, same care, every visit.
            </p>
          </div>
          <div className="relative mx-auto aspect-4/5 w-full max-w-sm overflow-hidden rounded-3xl shadow-xl md:order-1">
            <Image
              src={VladAndVasilii}
              alt="Vasilii, Angara Steamers technician"
              fill
              sizes="(max-width: 768px) 100vw, 400px"
              className="object-cover scale-[1.8] origin-top-left"
            />
            <div className="absolute bottom-3 left-3 rounded-full bg-black/55 px-3 py-1 text-xs font-semibold text-white">
              Vasilii, technician
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* 8. Written reviews */}
      <section className="mx-auto max-w-7xl">
        <Testimonials only={ANGARA_REVIEWS} />
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
