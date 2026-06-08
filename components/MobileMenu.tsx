"use client";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetClose,
  SheetDescription,
} from "@/components/ui/sheet";
import Link from "next/link";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import { NavbarProps } from "@/types";
import { motion } from "framer-motion";

export function MobileMenu({
  navItems = [],
  currentHubSlug,
  staticItems = [],
}: NavbarProps) {
  const activeHub = navItems.find((h) => h.slug === currentHubSlug);

  return (
    <Sheet>
      <SheetTrigger className="sm:hidden p-3 rounded-xl touch-feedback hover:bg-muted/10 transition-colors">
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="w-full border-none sm:w-[350px] bg-background border-l-0 p-0 shadow-2xl"
      >
        <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
        <SheetDescription className="sr-only">
          Main site navigation for Angara Streamers.
        </SheetDescription>

        <motion.nav
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="flex flex-col h-full py-12 px-8"
        >
          {/* Main Links */}
          <div className="flex flex-col gap-8 mb-12">
            {(navItems || []).map((item) => (
              <SheetClose asChild key={item.slug}>
                <Link
                  href={`/services/${item.slug}`}
                  className="text-3xl font-medium tracking-tight text-foreground/90 hover:text-primary transition-colors"
                >
                  {item.title}
                </Link>
              </SheetClose>
            ))}
            {(staticItems || []).map((item) => (
              <SheetClose asChild key={item.slug}>
                <Link
                  href={`/${item.slug}`}
                  className="text-3xl font-medium tracking-tight text-foreground/90 hover:text-primary transition-colors"
                >
                  {item.title}
                </Link>
              </SheetClose>
            ))}
          </div>

          {/* Service Links */}
          {activeHub?.service_pages && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="space-y-6"
            >
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted">
                {activeHub.title} Services
              </p>
              <div className="flex flex-col gap-4">
                {activeHub.service_pages.map((page) => (
                  <SheetClose asChild key={page.slug}>
                    <Link
                      href={`/${activeHub.slug}/${page.slug}`}
                      className="text-lg text-foreground/70 hover:text-primary transition-colors capitalize"
                    >
                      {page.title}
                    </Link>
                  </SheetClose>
                ))}
              </div>
            </motion.div>
          )}

          <div className="mt-auto pt-12 border-t border-primary/40">
            <ThemeToggle className="bg-primary/40" />
          </div>
        </motion.nav>
      </SheetContent>
    </Sheet>
  );
}
