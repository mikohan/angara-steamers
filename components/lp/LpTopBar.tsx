"use client";

import Image from "next/image";
import { Phone } from "lucide-react";
import { QuoteDialog } from "@/components/QuoteDialog";
import ASLogo from "@/public/images/logo_as_drops.webp";

// Slim header for ad landing pages: logo, phone, one button. No menu.
export function LpTopBar() {
  const phoneHref =
    process.env.NEXT_PUBLIC_COMPANY_PHONE_LINK || "+12135987763";
  const phoneTitle = process.env.NEXT_PUBLIC_COMPANY_PHONE || "(213) 598-7763";

  return (
    <header className="sticky top-0 z-50 bg-background/90 backdrop-blur-md shadow-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="relative h-8 w-8">
            <Image src={ASLogo} fill priority alt="Angara Steamers" sizes="32px" />
          </div>
          <span className="font-bold tracking-tight">Angara Steamers</span>
        </div>
        <div className="flex items-center gap-3">
          <a
            href={`tel:${phoneHref}`}
            className="hidden sm:flex items-center gap-2 font-bold text-foreground hover:text-primary"
          >
            <Phone className="h-4 w-4" /> {phoneTitle}
          </a>
          <QuoteDialog>
            <button className="rounded-full bg-primary px-4 py-2 text-sm font-bold text-white hover:opacity-90">
              Get exact price
            </button>
          </QuoteDialog>
        </div>
      </div>
    </header>
  );
}
