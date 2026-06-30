"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useCart } from "@/store/useCart";
import {
  Plus,
  Minus,
  ShoppingBag,
  Check,
  Trash2,
  ArrowRight,
} from "lucide-react";
import { prices } from "@/data/prices";
import { IPrice } from "@/types";
import Link from "next/link";
import { Breadcrumbs } from "@/components/common/BreadCrumbs";

export default function ServiceListingPage() {
  const [hasHydrated, setHasHydrated] = useState(false);
  const cart = useCart((state) => state.cart);

  useEffect(() => {
    setHasHydrated(true);
  }, []);

  if (!hasHydrated) return null;

  const groupedServices = prices.reduce(
    (acc, service) => {
      if (!acc[service.category]) acc[service.category] = [];
      acc[service.category].push(service);
      return acc;
    },
    {} as Record<string, IPrice[]>,
  );
  const breadcrumbSegments = [
    { label: "Home", path: "/" },
    { label: "Prices", path: "/prices" },
  ];

  return (
    <div className="min-h-screen bg-background p-4 md:p-8 lg:p-12">
      <div className="max-w-6xl mx-auto">
        <Breadcrumbs segments={breadcrumbSegments} className="pb-8 pl-4" />
        <h1 className="my-8 heading-h2">
          Price for Upholstery and Carpet Professional Cleaning
        </h1>
        <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-8 items-start">
          {/* SIDEBAR LEDGER (RIGHT SIDE - FIXED POSITION) */}
          <div className="lg:col-span-4 lg:sticky lg:top-8">
            {cart.length > 0 ? (
              <div className="border border-foreground/20 rounded-3xl overflow-hidden shadow-2xl min-h-[500px] flex flex-col relative bg-background">
                <div className="p-8 flex flex-col h-full">
                  <h2 className="text-3xl font-black">Your Selection</h2>
                  <SidebarLedger />
                </div>
              </div>
            ) : (
              <div className="hidden border border-foreground/20 rounded-3xl overflow-hidden shadow-2xl min-h-[500px] md:flex flex-col relative bg-background">
                <div className="p-8 flex flex-col h-full">
                  <h2 className="text-3xl font-black">Your Selection</h2>
                  <SidebarLedger />
                </div>
              </div>
            )}
          </div>
          {/* SERVICES GRID (LEFT SIDE) */}
          <div className="lg:col-span-8 space-y-12">
            {Object.entries(groupedServices).map(([category, items]) => (
              <div key={category} className="space-y-6">
                <h3 className="text-2xl font-black text-foreground uppercase tracking-wider border-b border-foreground/10 pb-2">
                  {category}
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {items.map((service, idx) => (
                    <BigServiceCard
                      key={`${category}-${idx}`}
                      service={service}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function BigServiceCard({ service }: { service: IPrice }) {
  const addToCart = useCart((state) => state.addToCart);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  const handleDispatch = () => {
    addToCart({ item: service.item, priceAfter: service.priceAfter, quantity });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="flex flex-col rounded-2xl bg-background border border-muted/20 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <Image
          src={service.img}
          alt={service.item}
          fill
          className="object-cover"
          sizes="400px"
        />
        <span className="absolute top-3 left-3 px-2 py-1 rounded text-[10px] font-black uppercase bg-price-green text-white">
          {service.category}
        </span>
      </div>
      <div className="p-5 flex flex-col flex-1 min-w-0">
        <h3 className="font-extrabold text-lg text-foreground truncate">
          {service.item}
        </h3>
        <div className="mt-6 pt-4 border-t border-muted/10 flex items-center justify-between">
          <div className="flex flex-row gap-2 items-center">
            <div className="text-base font-black text-red-600 line-through tabular-nums">
              ${(service.priceBefore * quantity).toFixed(2)}
            </div>
            <div className="text-2xl font-black text-price-green tabular-nums">
              ${(service.priceAfter * quantity).toFixed(2)}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center border border-muted/20 bg-background rounded-lg p-0.5">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="h-10 w-10 flex items-center justify-center hover:bg-muted/10"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-5 text-center font-bold text-sm tabular-nums">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((q) => Math.min(15, q + 1))}
                className="h-10 w-10 flex items-center justify-center hover:bg-muted/10"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <button
              onClick={handleDispatch}
              className={`h-11 w-11 flex items-center justify-center rounded-lg transition-colors ${isAdded ? "bg-price-green text-white" : "bg-foreground text-background"}`}
            >
              {isAdded ? (
                <Check className="h-6 w-6" />
              ) : (
                <ShoppingBag className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function SidebarLedger() {
  const { cart, removeFromCart } = useCart();
  const total = cart.reduce(
    (sum, item) => sum + item.priceAfter * item.quantity,
    0,
  );

  return (
    <div className="flex flex-col flex-1 mt-6">
      <div className="flex-1 overflow-y-auto space-y-3 pr-2">
        {cart.map((item) => (
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
        ))}
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
  );
}
