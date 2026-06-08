import Link from "next/link";
import { ServiceHub } from "@/types";
import { STATIC_PAGES } from "@/data/links";

interface FooterProps {
  navItems: ServiceHub[];
}

export function Footer({ navItems }: FooterProps) {
  return (
    <footer className="bg-black text-white py-12 md:py-16 px-12 md:px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 md:gap-12">
        {/* Branding - Full width on mobile */}
        <div className="flex flex-col gap-3">
          <h2 className="font-bold text-xl tracking-tight">Angara Steamers</h2>
          <p className="text-md text-background/60 leading-relaxed max-w-xs">
            Premium upholstery and carpet cleaning services in Los Angeles.
          </p>
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
                href={`/${hub.slug}`}
                className="py-1 hover:text-primary transition-colors font-medium text-lg md:text-md"
              >
                {hub.title}
              </Link>
            ))}
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
