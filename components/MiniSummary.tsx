"use client";

import { useCart } from "@/store/useCart";
import { ShoppingBag, Trash2 } from "lucide-react";

export const MiniCartSummary = () => {
  const { cart, removeFromCart } = useCart();
  const cartTotal = cart.reduce((sum, i) => sum + i.priceAfter * i.quantity, 0);
  const cartCount = cart.reduce((sum, i) => sum + i.quantity, 0);

  if (cart.length === 0) return null;

  return (
    /* md:w-1/2 makes it half-width on tablets and up, mx-auto centers it */
    <div className="w-full md:w-1/2 mx-auto md:mx-0 bg-background border border-primary/10 shadow-xl shadow-primary/5 p-6 rounded-2xl mb-12">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg text-primary">
            <ShoppingBag className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-foreground">Your Booking</h3>
            <p className="text-xs text-muted-foreground">
              {cartCount} items selected
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs uppercase font-bold tracking-wider text-muted-foreground">
            Total
          </p>
          <p className="text-2xl font-black text-teal-800 tabular-nums">
            ${cartTotal.toFixed(0)}
          </p>
        </div>
      </div>

      <div className="space-y-3 border-t border-muted/20 pt-4">
        {cart.map((item) => (
          <div
            key={item.item}
            className="flex items-center justify-between text-sm"
          >
            <div className="flex items-center gap-2">
              <span className="font-bold text-primary">{item.quantity}x</span>
              <span className="text-foreground">{item.item}</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="font-semibold tabular-nums">
                ${(item.priceAfter * item.quantity).toFixed(0)}
              </span>
              <button
                onClick={() => removeFromCart(item.item)}
                className="text-muted-foreground hover:text-red-500 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <button className="w-full mt-6 bg-primary text-white py-3 rounded-xl font-bold hover:bg-primary/90 transition-all shadow-md shadow-primary/20">
        Proceed to Checkout
      </button>
    </div>
  );
};
