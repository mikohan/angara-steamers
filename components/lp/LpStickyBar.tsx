"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Phone } from "lucide-react";
import { QuoteDialog } from "@/components/QuoteDialog";

// Bottom bar on phones: call or get a price, always one tap away.
// Rendered into <body>: the page transition in app/template.tsx animates
// with a transform, and a transformed parent would pin a fixed bar to the
// page instead of the screen.
export function LpStickyBar() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const phoneHref =
    process.env.NEXT_PUBLIC_COMPANY_PHONE_LINK || "+12135987763";

  if (!mounted) return null;

  return createPortal(
    <div className="fixed bottom-0 left-0 right-0 z-50 grid grid-cols-2 gap-2 border-t border-muted/20 bg-background/95 p-3 backdrop-blur-md md:hidden">
      <a
        href={`tel:${phoneHref}`}
        className="flex items-center justify-center gap-2 rounded-xl border border-primary/40 py-3 font-bold text-foreground"
      >
        <Phone className="h-4 w-4" /> Call
      </a>
      <QuoteDialog>
        <button className="rounded-xl bg-primary py-3 font-bold text-white">
          Get exact price
        </button>
      </QuoteDialog>
    </div>,
    document.body,
  );
}
