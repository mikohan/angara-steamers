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
  const allNavItems = [...safeNavData, ...STATIC_PAGES];

  const currentHub = safeNavData.find((hub) =>
    pathname?.startsWith(`/${hub.slug}`),
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
            Angara
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden sm:flex items-center gap-6 text-sm font-medium">
          {allNavItems.map((item) => (
            <Link
              key={item.slug}
              href={`/${item.slug}`}
              className="hover:text-primary transition-colors text-lg"
            >
              {item.title}
            </Link>
          ))}
          <div className="pl-2 border-l border-muted/20">
            <ThemeToggle />
          </div>
        </nav>

        <MobileMenu navItems={allNavItems} currentHubSlug={currentHub?.slug} />
      </div>

      {/* Dynamic Sub-menu */}
      {currentHub?.service_pages && currentHub.service_pages.length > 0 && (
        <div className="hidden sm:flex border-t bg-background/50 px-6 py-2 gap-6 text-xs uppercase tracking-wider font-semibold text-muted-foreground">
          {currentHub.service_pages.map((page) => (
            <Link
              key={page.slug}
              href={`/${currentHub.slug}/${page.slug}`}
              className="hover:text-primary transition-colors"
            >
              {page.title}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
