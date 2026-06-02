import Link from "next/link";
import Image from "next/image";
import { Hero } from "@/components/sections/Hero";
export default function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-20 space-y-20">
      <Hero />
      <section className="space-y-6">
        <Link href="/" className="text-2xl font-bold">
          Angara
        </Link>
        <h1 className="text-6xl font-bold">Our Story</h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Angara Steamers started with a simple mission: deliver the
          highest-quality upholstery cleaning service in Los Angeles. Today, we
          serve hundreds of homes every month with unmatched precision and care.
        </p>
        <Image
          alt="sls"
          width={500}
          height={600}
          src="/vasya_rug.webp"
          className="w-full rounded-3xl shadow-lg"
        />
      </section>

      <section className="grid md:grid-cols-2 gap-12">
        <div className="space-y-4">
          <h2 className="text-4xl font-semibold">Local Expertise</h2>
          <p className="text-muted-foreground text-lg">
            Our team understands the unique climate and fabric challenges in LA
            homes. From microfiber to velvet, we know how to treat each material
            safely.
          </p>
        </div>

        <Image
          alt="sls"
          width={500}
          height={600}
          src="/vasya_rug.webp"
          className="w-full rounded-3xl shadow-lg"
        />
      </section>

      <section className="space-y-4">
        <h2 className="text-4xl font-semibold">Our Values</h2>
        <p className="text-muted-foreground text-lg">
          Quality, transparency, and customer satisfaction. Every technician is
          trained to deliver consistent results with zero shortcuts.
        </p>
      </section>
    </div>
  );
}
