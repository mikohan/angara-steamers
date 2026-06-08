import Image from "next/image";
import { Team } from "@/components/oldComponents/Team";
import { VideoReviews } from "@/components/oldComponents/VideoReviews";
import { HeroImage } from "@/components/oldComponents/HeroImage";
import { Testimonials } from "@/components/Testimonials";
import { WhyUs } from "@/components/oldComponents/WhyUs";

export default function HomePage() {
  return (
    <div className="mx-auto">
      <section>
        <HeroImage />
      </section>

      <section>
        <Testimonials />
      </section>

      <section>
        <Team />
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
