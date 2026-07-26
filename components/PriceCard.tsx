"use client";

import Image, { StaticImageData } from "next/image";
import { useCart } from "@/store/useCart";
import { useState } from "react";
import { Minus, Plus, ShoppingBag, Check } from "lucide-react";

interface PriceCardProps {
  img: StaticImageData;
  category: string;
  item: string;
  priceBefore: number;
  priceAfter: number;
}

export const PriceCard = ({
  img,
  category,
  item,
  priceBefore,
  priceAfter,
}: PriceCardProps) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [isAdded, setIsAdded] = useState(false);
  const addToCart = useCart((state) => state.addToCart);

  const discount = parseFloat(
    process.env.NEXT_PUBLIC_PRICE_AFTER_DISCOUNT || "0",
  );
  const finalPriceBefore = discount
    ? priceBefore - priceBefore * discount
    : priceBefore;
  const finalPriceAfter = discount
    ? priceAfter - priceAfter * discount
    : priceAfter;

  const handleAddToCart = () => {
    addToCart({ item, priceAfter: finalPriceAfter, quantity });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="rounded-2xl bg-muted/10 border border-muted/20 p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="h-48 w-full relative mb-4">
        <Image
          priority
          className="object-cover rounded-xl"
          fill
          alt={item}
          src={img}
          sizes="300px"
        />
        <div className="absolute top-3 left-3 py-1 px-3 rounded-lg bg-price-green/90">
          <p className="text-xs text-white font-bold uppercase">{category}</p>
        </div>
      </div>

      <div className="bg-background rounded-xl py-4 px-4 border border-muted/20">
        <div className="text-xl font-black mb-4 truncate">{item}</div>
        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-col">
            <span className="line-through text-red-600 text-base font-semibold">
              ${finalPriceBefore.toFixed(0)}
            </span>
            <span className="text-2xl text-primary font-black">
              ${(finalPriceAfter * quantity).toFixed(0)}
            </span>
          </div>
          <div className="flex items-center gap-1 border border-muted/20 rounded-lg p-1">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="h-10 w-10 flex items-center justify-center hover:bg-muted/10 rounded-md"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="w-6 text-center font-bold text-sm">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity((q) => Math.min(20, q + 1))}
              className="h-10 w-10 flex items-center justify-center hover:bg-muted/10 rounded-md"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>

        <button
          onClick={handleAddToCart}
          className={`w-full mt-4 py-2 rounded-lg text-lg font-bold flex items-center justify-center gap-2 transition-all ${
            isAdded
              ? "bg-price-green text-white"
              : "bg-primary text-white hover:bg-primary/90"
          }`}
        >
          {isAdded ? (
            <>
              Added <Check className="w-5 h-5" />
            </>
          ) : (
            <>
              Add to Cart <ShoppingBag className="w-5 h-5" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};
