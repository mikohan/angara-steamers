import Link from "next/link";
import { ServiceHub } from "@/types";
import { STATIC_PAGES } from "@/data/links";
import { WaveDivider } from "./WaveDivider";

// Main city pages (LA County + Orange County). Full list on /locations.
const FOOTER_AREAS = [
  { slug: "downtown-los-angeles", name: "Downtown Los Angeles" },
  { slug: "santa-monica", name: "Santa Monica" },
  { slug: "beverly-hills", name: "Beverly Hills" },
  { slug: "playa-vista", name: "Playa Vista" },
  { slug: "marina-del-rey", name: "Marina del Rey" },
  { slug: "woodland-hills", name: "Woodland Hills" },
  { slug: "valley-village", name: "Valley Village" },
  { slug: "santa-clarita-ca", name: "Santa Clarita" },
  { slug: "torrance", name: "Torrance" },
  { slug: "rancho-palos-verdes", name: "Rancho Palos Verdes" },
  { slug: "irvine-central-oc", name: "Irvine" },
  { slug: "orange-county-coastal", name: "Coastal Orange County" },
];

interface FooterProps {
  navItems: ServiceHub[];
}

export function Footer({ navItems }: FooterProps) {
  return (
    <footer className="relative pt-16 md:pt-32 px-12 md:px-4">
      <div className="absolute top-0 left-0 -z-10 h-[30%] w-full bg-linear-180 from-primary/20 to-background"></div>
      <WaveDivider position="top" fill="var(--color-background)" />
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 md:gap-12">
        {/* Branding - Full width on mobile */}
        <div className="flex flex-col gap-3">
          <h2 className="font-bold text-xl tracking-tight">Angara Steamers</h2>
          <p className="text-md text-primary leading-relaxed max-w-xs">
            Premium upholstery and carpet cleaning services in Los Angeles.
          </p>
          <address className="not-italic text-sm leading-relaxed opacity-80">
            Angara Lab LLC
            <br />
            13163 Fountain Park Dr 112
            <br />
            Playa Vista, CA 90094
            <br />
            <a
              href={`tel:${process.env.NEXT_PUBLIC_COMPANY_PHONE_LINK}`}
              className="hover:text-primary transition-colors"
            >
              {process.env.NEXT_PUBLIC_COMPANY_PHONE}
            </a>
            <br />
            <a
              href={`mailto:${process.env.NEXT_PUBLIC_COMPANY_EMAIL}`}
              className="hover:text-primary transition-colors"
            >
              {process.env.NEXT_PUBLIC_COMPANY_EMAIL}
            </a>
          </address>
        </div>

        {/* Dynamic Pillar Anchors */}
        <div className="flex flex-col gap-4">
          <h3 className="font-semibold uppercase tracking-widest opacity-70">
            Services
          </h3>
          <nav className="flex flex-col gap-3">
            {navItems.map((hub) => (
              <Link
                key={hub.slug}
                href={`/services/${hub.slug}`}
                className="py-1 hover:text-primary transition-colors font-medium text-lg md:text-md"
              >
                {hub.title}
              </Link>
            ))}
          </nav>
        </div>

        {/* Service Areas */}
        <div className="flex flex-col gap-4">
          <h3 className="font-semibold uppercase tracking-widest opacity-70">
            Service Areas
          </h3>
          <nav className="flex flex-col gap-2">
            {FOOTER_AREAS.map((a) => (
              <Link
                key={a.slug}
                href={`/locations/${a.slug}`}
                className="py-0.5 hover:text-primary transition-colors text-base"
              >
                {a.name}
              </Link>
            ))}
            <Link
              href="/locations"
              className="py-0.5 hover:text-primary transition-colors text-base font-semibold"
            >
              All service areas
            </Link>
          </nav>
        </div>

        {/* Static Utility Links */}
        <div className="flex flex-col gap-4">
          <h3 className="font-semibold uppercase tracking-widest text-lg opacity-70">
            Company
          </h3>
          <nav className="flex flex-col gap-3">
            {STATIC_PAGES.map((link) => (
              <Link
                key={link.slug}
                href={`/${link.slug}`}
                className="py-1 hover:text-primary transition-colors text-lg md:text-base"
              >
                {link.title}
              </Link>
            ))}
            <Link
              href="/policy"
              className="py-1 hover:text-primary transition-colors text-lg md:text-base font-semibold text-primary-800"
            >
              Privacy Policy
            </Link>
          </nav>
        </div>
      </div>

      {/* Copyright - Centered and spaced */}
      <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-background/20 text-center text-xs text-background/40">
        © {new Date().getFullYear()} Angara Steamers. All rights reserved.
      </div>
    </footer>
  );
}
