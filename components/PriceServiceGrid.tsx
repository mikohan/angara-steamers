"use client";

import { useState } from "react";
import Image from "next/image";
import { useCart } from "@/store/useCart";
import { Plus, Minus, ShoppingBag, Check } from "lucide-react";
import { IPrice } from "@/types";

export function ServiceGrid({
  groupedServices,
}: {
  groupedServices: Record<string, IPrice[]>;
}) {
  return (
    <div className="lg:col-span-8 space-y-12">
      {Object.entries(groupedServices).map(([category, items]) => (
        <div key={category} className="space-y-6">
          <h3 className="text-2xl font-black text-foreground uppercase tracking-wider border-b border-foreground/10 pb-2">
            {category}
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {items.map((service, idx) => (
              <BigServiceCard key={`${category}-${idx}`} service={service} />
            ))}
          </div>
        </div>
      ))}
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
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-extrabold text-lg text-foreground truncate">
          {service.item}
        </h3>
        <div className="mt-6 pt-4 border-t border-muted/10 flex items-center justify-between">
          <div className="flex flex-row gap-2 items-center">
            <div className="text-base font-black text-red-600 line-through tabular-nums">
              ${(service.priceBefore * quantity).toFixed(0)}
            </div>
            <div className="text-2xl font-black text-price-green tabular-nums">
              ${(service.priceAfter * quantity).toFixed(0)}
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
              className={`h-11 w-11 flex items-center justify-center rounded-lg ${isAdded ? "bg-price-green text-white" : "bg-foreground text-background"}`}
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
