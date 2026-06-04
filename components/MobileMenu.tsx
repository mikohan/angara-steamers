"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import { NavbarProps } from "@/types";

export function MobileMenu({
  navItems = [],
  isUpholstery,
  isLocations,
}: NavbarProps) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Control body scroll only when open
  useEffect(() => {
    if (mounted) {
      document.body.style.overflow = open ? "hidden" : "unset";
    }
  }, [open, mounted]);

  // Prevent rendering anything until mounted to avoid hydration errors
  if (!mounted) return null;

  return createPortal(
    <>
      <button
        onClick={() => setOpen(true)}
        className="p-2 sm:hidden touch-feedback"
        aria-label="Open Menu"
      >
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <div
        className={`fixed inset-0 z-25 transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      >
        <div
          className="absolute inset-0 bg-background/80 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />

        <div
          className={`absolute right-0 top-0 h-full w-72 bg-background border-l border-muted/20 shadow-2xl transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"}`}
        >
          <div className="flex justify-between items-center p-6 border-b border-muted/20">
            <span className="font-semibold">Menu</span>
            <button
              onClick={() => setOpen(false)}
              className="p-2 text-2xl"
              aria-label="Close Menu"
            >
              ×
            </button>
          </div>

          <nav className="flex flex-col p-6 gap-6">
            {/* Safe Mapping with fallback */}
            {(navItems ?? []).map((item) => (
              <Link
                key={item?.slug}
                href={`/${item?.slug ?? ""}`}
                onClick={() => setOpen(false)}
                className="text-xl font-medium"
              >
                {item?.title ?? "Service"}
              </Link>
            ))}

            {(isUpholstery || isLocations) && (
              <div className="pt-6 border-t border-muted/20 flex flex-col gap-4 text-sm text-muted-foreground uppercase font-bold tracking-widest">
                {isUpholstery ? "Upholstery Services" : "Service Areas"}

                {isUpholstery && (
                  <>
                    <Link
                      href="/upholstery"
                      className="text-base text-foreground capitalize"
                      onClick={() => setOpen(false)}
                    >
                      Sofa Cleaning
                    </Link>
                    <Link
                      href="/upholstery"
                      className="text-base text-foreground capitalize"
                      onClick={() => setOpen(false)}
                    >
                      Mattress Cleaning
                    </Link>
                  </>
                )}

                {isLocations && (
                  <>
                    <Link
                      href="/locations/playa-vista"
                      className="text-base text-foreground capitalize"
                      onClick={() => setOpen(false)}
                    >
                      Playa Vista
                    </Link>
                    <Link
                      href="/locations/culver-city"
                      className="text-base text-foreground capitalize"
                      onClick={() => setOpen(false)}
                    >
                      Culver City
                    </Link>
                  </>
                )}
              </div>
            )}

            <div className="mt-auto pt-6 border-t border-muted/20">
              <ThemeToggle />
            </div>
          </nav>
        </div>
      </div>
    </>,
    document.body,
  );
}
