import Link from "next/link";
import Image from "next/image";
export default function HomePage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-20 space-y-20">
      <Link href="/about" className="text-2xl font-bold">
        Angara
      </Link>
      <section className="space-y-6">
        <h1 className="text-6xl font-bold">Premium Upholstery Cleaning</h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Angara Steamers brings industrial-grade steam cleaning technology to
          your home. We specialize in deep fabric restoration, stain removal,
          and sanitization.
        </p>
        <Image
          width={500}
          height={600}
          alt="shit"
          src="/vasya_rug.webp"
          className="w-full rounded-3xl shadow-lg"
        />
      </section>

      <section className="grid md:grid-cols-2 gap-12">
        <Image
          width={600}
          height={600}
          alt="shit"
          src="/vasya_rug.webp"
          className="rounded-3xl shadow-xl"
        />
        <div className="space-y-4">
          <h2 className="text-4xl font-semibold">Deep Cleaning Technology</h2>
          <p className="text-muted-foreground text-lg">
            Our machines operate at 212°F steam temperature, ensuring complete
            sanitization and fabric-safe cleaning.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-4xl font-semibold">Why Choose Us?</h2>
        <ul className="space-y-2 text-lg text-muted-foreground">
          <li>• Eco-friendly detergents</li>
          <li>• Fast drying times</li>
          <li>• Professional-grade equipment</li>
          <li>• 100% satisfaction guarantee</li>
        </ul>
      </section>
    </div>
  );
}
