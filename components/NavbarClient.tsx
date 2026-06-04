"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import { MobileMenu } from "./MobileMenu";
import { ServiceHub } from "@/types";

export function NavbarClient({ navData }: { navData: ServiceHub[] }) {
  const pathname = usePathname();

  // Defensive check: Ensure navData exists before processing
  const safeNavData = Array.isArray(navData) ? navData : [];

  // Safe path checks
  const isUpholstery = pathname?.startsWith("/upholstery") ?? false;
  const isLocations = pathname?.startsWith("/carpet") ?? false;

  return (
    <header className="sticky top-0 z-50 backdrop-blur shadow-xl shadow-primary/20">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="font-bold text-xl">
          Angara
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden sm:flex items-center gap-6 text-sm font-medium">
          {safeNavData.map((item) => (
            <Link
              key={item?.slug}
              href={`/${item?.slug ?? ""}`}
              className="hover:text-primary"
            >
              {item?.title ?? "Service"}
            </Link>
          ))}
          <ThemeToggle />
        </nav>

        {/* Mobile Menu - Pass safe data */}
        <MobileMenu
          navItems={safeNavData}
          isUpholstery={isUpholstery}
          isLocations={isLocations}
        />
      </div>

      {/* Upholstery Sub-menu - ONLY renders on Upholstery pages */}
      {isUpholstery && (
        <div className="hidden sm:flex border-t bg-background/50 px-6 py-2 gap-6 text-xs">
          <Link href="/upholstery" className="hover:text-primary">
            Sofa Cleaning
          </Link>
          <Link href="/upholstery" className="hover:text-primary">
            Mattress
          </Link>
        </div>
      )}
    </header>
  );
}
