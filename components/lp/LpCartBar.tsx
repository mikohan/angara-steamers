"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ShoppingBag, ArrowRight } from "lucide-react";
import { useCart, cartTotals } from "@/store/useCart";

// Shows the cart total under the price cards once something is added.
export function LpCartBar() {
  const { cart, protection } = useCart();
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  if (!hydrated || cart.length === 0) return null;

  const { total } = cartTotals(cart, protection);
  const count = cart.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-2xl border border-primary/20 bg-primary/5 p-5 sm:flex-row">
      <div className="flex items-center gap-3">
        <ShoppingBag className="h-6 w-6 text-primary" />
        <p className="font-bold">
          {count} {count === 1 ? "item" : "items"} ·{" "}
          <span className="tabular-nums">${total.toFixed(0)}</span>
        </p>
      </div>
      <Link
        href="/cart"
        className="flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-bold text-white hover:opacity-90"
      >
        Book these items <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
