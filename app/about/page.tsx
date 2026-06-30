import Link from "next/link";
import { HeroAbout } from "@/components/HeroAbout";
import { Breadcrumbs } from "@/components/common/BreadCrumbs";
import MeVasya from "@/public/images/me_vasya.webp";
import { Problem } from "@/components/Problem";
import { VideoReviews } from "@/components/oldComponents/VideoReviews";
import { SectionWrapper } from "@/components/common/SectionWrapper";
import { Prices } from "@/components/Prices";
export default function AboutPage() {
  // Inside ServicePagePage component
  const breadcrumbSegments = [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
  ];
  return (
    <main>
      <div className="mx-auto max-w-7xl px-4 md:px-0">
        <Breadcrumbs segments={breadcrumbSegments} />
        <HeroAbout
          video="/oldMedia/videos/LandPage1.mp4"
          poster={MeVasya.src}
        />
      </div>
      <SectionWrapper>
        <section>
          <Problem />
        </section>
      </SectionWrapper>

      <section className="pb-16">
        <VideoReviews />
      </section>
      <section>
        <Prices />
      </section>
    </main>
  );
}
