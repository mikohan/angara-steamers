import { Team } from "@/components/oldComponents/Team";
import { VideoReviews } from "@/components/oldComponents/VideoReviews";
import { HeroImage } from "@/components/oldComponents/HeroImage";
import { Testimonials } from "@/components/Testimonials";
import { WhyUs } from "@/components/oldComponents/WhyUs";
import GoogleMap from "@/components/GoogleMap";
import { WaveDivider } from "@/components/common/WaveDivider";

export default function HomePage() {
  return (
    <div className="mx-auto">
      <section>
        <HeroImage />
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
      <section className="py-32 mx-auto max-w-7xl">
        <GoogleMap lat={33.9792} lng={-118.4138} zoom={14} />
      </section>

      <section className="space-y-4">
        <WhyUs />
      </section>
      <section>
        <VideoReviews />
      </section>
    </div>
  );
}
