"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import { MobileMenu } from "./MobileMenu";
import { NavbarProps } from "@/types";
import { STATIC_PAGES } from "@/data/links";
import Image from "next/image";
import ASLogo from "@/public/images/new_logo_as.webp";

// Define your static pages here

export function NavbarClient({ navItems }: NavbarProps) {
  const pathname = usePathname();
  const safeNavData = Array.isArray(navItems) ? navItems : [];

  // Merge dynamic Strapi hubs with static pages

  const currentHub = safeNavData.find((hub) =>
    pathname?.startsWith(`/services/${hub.slug}`),
  );

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md shadow-sm ">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <div className="flex gap-4 items-center">
          <div className="relative h-8 w-16">
            <Image
              src={ASLogo}
              fill
              priority
              alt="Angara Steamers Logo"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>

          <Link
            href="/"
            className="font-bold text-2xl tracking-tight text-primary"
          >
            Angara<span className="text-foreground">Steamers</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden sm:flex items-center gap-6 font-medium">
          {safeNavData.map((item) => (
            <Link
              key={item.slug}
              href={`/services/${item.slug}`}
              className="relative transition-all duration-300 hover:text-primary after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full hover:scale-105 text-primary-800"
            >
              {item.title}
            </Link>
          ))}
          {STATIC_PAGES.map((item) => (
            <Link
              key={item.slug}
              href={`/${item.slug}`}
              className="relative transition-all duration-300 hover:text-primary after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full hover:scale-105 text-primary-800"
            >
              {item.title}
            </Link>
          ))}
          <div className="pl-2 border-l border-primary/20 text-primary-800">
            <ThemeToggle />
          </div>
        </nav>

        <MobileMenu
          navItems={safeNavData}
          staticItems={STATIC_PAGES}
          currentHubSlug={currentHub?.slug}
        />
      </div>

      {/* Dynamic Sub-menu */}
      {currentHub?.service_pages && currentHub.service_pages.length > 0 && (
        <div className="hidden sm:flex sm:justify-end bg-background/50 px-8 py-2 gap-6 text-xs tracking-tight font-semibold text-muted">
          {currentHub.service_pages.map((page) => (
            <Link
              key={page.slug}
              href={`/services/${currentHub.slug}/${page.slug}`}
              className="transition-all duration-300 hover:text-primary after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full hover:scale-105"
            >
              {page.title}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
