"use client";

import { useCart } from "@/store/useCart";
import { Trash2, ArrowRight } from "lucide-react";
import Link from "next/link";

export function SidebarLedger() {
  const { cart, removeFromCart } = useCart();
  const total = cart.reduce(
    (sum, item) => sum + item.priceAfter * item.quantity,
    0,
  );

  // We return null or a placeholder if the cart is empty,
  // but we must be consistent with the layout grid.
  return (
    <div className="border border-foreground/20 rounded-3xl overflow-hidden shadow-2xl min-h-[500px] flex flex-col relative bg-background">
      <div className="p-8 flex flex-col h-full">
        <h2 className="text-3xl font-black">Your Selection</h2>

        <div className="flex flex-col flex-1 mt-6">
          <div className="flex-1 overflow-y-auto space-y-3 pr-2">
            {cart.length === 0 ? (
              <p className="text-foreground/50 text-sm italic">
                Your cart is empty.
              </p>
            ) : (
              cart.map((item) => (
                <div
                  key={item.item}
                  className="flex items-center justify-between bg-foreground/10 p-3 rounded-xl border border-foreground/10"
                >
                  <div className="min-w-0">
                    <p className="text-foreground font-bold text-xs truncate">
                      {item.item}
                    </p>
                    <p className="text-foreground/70 text-[10px]">
                      {item.quantity} x ${item.priceAfter.toFixed(2)}
                    </p>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.item)}
                    className="text-foreground/50 hover:text-red-500 p-1"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          <div className="pt-6">
            <p className="text-foreground/70 text-[10px] font-bold uppercase">
              Grand Total
            </p>
            <p className="text-4xl font-black text-foreground mt-1 tabular-nums">
              ${total.toFixed(2)}
            </p>

            <Link href="/cart">
              <button className="mt-4 w-full flex items-center justify-center gap-2 bg-primary text-background py-3 rounded-xl font-bold text-sm hover:scale-[1.02] transition-transform">
                Go to Cart <ArrowRight className="h-4 w-4" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
