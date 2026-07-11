// app/cart/CartClient.tsx
"use client";

import { useCart } from "@/store/useCart";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Minus, Plus, Trash2, ArrowLeft, CreditCard } from "lucide-react";
import { Breadcrumbs } from "@/components/common/BreadCrumbs";

export default function CartClient() {
  const [hasHydrated, setHasHydrated] = useState<boolean>(false);
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);

    const items = cart.map((item) => ({
      name: item.item,
      price: item.priceAfter,
      quantity: item.quantity,
    }));

    const response = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items }),
    });

    const { url } = await response.json();

    if (url) {
      window.location.href = url;
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    setHasHydrated(true);
  }, []);

  if (!hasHydrated) {
    return (
      <div className="container mx-auto max-w-6xl p-8 min-h-[60vh] flex items-center justify-center">
        <p className="text-muted text-sm font-semibold animate-pulse">
          Loading items tree...
        </p>
      </div>
    );
  }

  const subtotal = cart.reduce(
    (sum, entry) => sum + entry.priceAfter * entry.quantity,
    0,
  );
  const total = subtotal;

  const breadcrumbSegments = [
    { label: "Home", path: "/" },
    { label: "Cart", path: "/cart" },
  ];

  if (cart.length === 0) {
    return (
      <div className="container mx-auto max-w-3xl px-6 py-24 text-center space-y-6">
        <Breadcrumbs segments={breadcrumbSegments} />
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
          🛒
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight">
          Your cart is empty
        </h1>
        <p className="text-muted max-w-sm mx-auto text-sm">
          Looks like you haven&apos;t added any clean service packages or
          options yet. Let&apos;s change that!
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-xl bg-primary text-white font-bold py-3 px-6 hover:bg-primary/90 transition-all"
        >
          <ArrowLeft className="h-4 w-4" /> Explore Services
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-6xl px-6 py-12 md:py-20">
      <Breadcrumbs segments={breadcrumbSegments} />
      <div className="flex items-center justify-between mb-8 border-b border-muted/10 pb-4">
        <h1 className="text-3xl font-black tracking-tight text-foreground">
          Shopping Cart
        </h1>
        <button
          onClick={clearCart}
          className="text-xs font-semibold text-red-600 hover:underline cursor-pointer"
        >
          Clear All Items
        </button>
      </div>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          {cart.map((product) => (
            <div
              key={product.item}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-muted/5 rounded-2xl border border-muted/20"
            >
              <div className="space-y-1">
                <h3 className="font-bold text-lg text-foreground">
                  {product.item}
                </h3>
                <p className="text-xs text-muted">
                  ${product.priceAfter.toFixed(2)} each
                </p>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-6">
                <div className="flex items-center gap-1 border border-muted/20 bg-background rounded-lg p-1 shadow-sm">
                  <button
                    onClick={() =>
                      updateQuantity(product.item, product.quantity - 1)
                    }
                    disabled={product.quantity <= 1}
                    className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground hover:bg-muted/10 disabled:opacity-30"
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </button>
                  <span className="w-8 text-center font-bold text-sm tabular-nums">
                    {product.quantity}
                  </span>
                  <button
                    onClick={() =>
                      updateQuantity(product.item, product.quantity + 1)
                    }
                    className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground hover:bg-muted/10"
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right w-20 font-black text-foreground text-lg tabular-nums">
                    ${(product.priceAfter * product.quantity).toFixed(2)}
                  </div>
                  <button
                    onClick={() => removeFromCart(product.item)}
                    className="text-muted-foreground hover:text-red-600 p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors cursor-pointer"
                    aria-label="Remove item"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-28 rounded-3xl bg-muted/5 border border-muted/20 p-6 space-y-6 shadow-sm">
            <h2 className="text-xl font-bold tracking-tight">Order Summary</h2>

            <div className="space-y-3 text-sm border-b border-muted/10 pb-4">
              <div className="flex justify-between text-muted">
                <span>Subtotal</span>
                <span className="font-semibold tabular-nums">
                  ${subtotal.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="flex justify-between items-baseline font-bold text-lg text-foreground">
              <span>Total Cost</span>
              <span className="text-2xl font-black text-teal-800 dark:text-teal-400 tabular-nums">
                ${total.toFixed(2)}
              </span>
            </div>

            <button
              onClick={() => handleCheckout()}
              className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-foreground text-background font-bold py-4 transition-all hover:bg-foreground/90 active:scale-[0.98]"
            >
              <CreditCard className="h-4 w-4" /> Proceed to Checkout
            </button>

            <Link
              href="/"
              className="block text-center text-xs text-muted hover:text-foreground transition-colors underline"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
