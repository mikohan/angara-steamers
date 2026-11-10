"use client";

import { useState } from "react";
import { useCart, PROTECTION_LABEL } from "@/store/useCart";
import { Plus, Minus, ShoppingBag, Check } from "lucide-react";
import { addOns, IAddOn } from "@/data/addons";

export function AddOns({ className = "" }: { className?: string }) {
  return (
    <div className={`space-y-6 ${className}`}>
      <h3 className="text-2xl font-black text-foreground uppercase tracking-wider border-b border-foreground/10 pb-2">
        Add-ons
      </h3>
      <div className="grid md:grid-cols-2 gap-6">
        {addOns.map((addOn) => (
          <AddOnCard key={addOn.item} addOn={addOn} />
        ))}
        <ProtectionCard />
      </div>
    </div>
  );
}

function ProtectionCard() {
  const protection = useCart((state) => state.protection);
  const setProtection = useCart((state) => state.setProtection);

  return (
    <div className="flex flex-col rounded-2xl bg-background border border-muted/20 p-5 shadow-sm md:col-span-2">
      <h4 className="font-extrabold text-lg text-foreground">
        {PROTECTION_LABEL}
      </h4>
      <p className="text-sm text-muted mt-1">
        Applied after the steam clean. Spills bead up on the surface, so you
        can wipe them off.
      </p>
      <div className="mt-4 pt-4 border-t border-muted/10 flex items-center justify-between">
        <div className="flex flex-col">
          <div className="text-2xl font-black text-price-green">30%</div>
          <div className="text-xs font-semibold text-muted">
            of your order total
          </div>
        </div>
        <button
          onClick={() => setProtection(!protection)}
          className={`h-11 px-4 flex items-center justify-center gap-2 rounded-lg font-bold ${protection ? "bg-price-green text-white" : "bg-foreground text-background"}`}
        >
          {protection ? (
            <>
              Added <Check className="h-5 w-5" />
            </>
          ) : (
            "Add to order"
          )}
        </button>
      </div>
    </div>
  );
}

function AddOnCard({ addOn }: { addOn: IAddOn }) {
  const addToCart = useCart((state) => state.addToCart);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  const handleAdd = () => {
    addToCart({ item: addOn.item, priceAfter: addOn.price, quantity });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="flex flex-col rounded-2xl bg-background border border-muted/20 p-5 shadow-sm">
      <h4 className="font-extrabold text-lg text-foreground">{addOn.item}</h4>
      <p className="text-sm text-muted mt-1">{addOn.description}</p>
      <div className="mt-4 pt-4 border-t border-muted/10 flex items-center justify-between">
        <div className="flex flex-col">
          <div className="text-2xl font-black text-price-green tabular-nums">
            ${(addOn.price * quantity).toFixed(0)}
          </div>
          <div className="text-xs font-semibold text-muted">per piece</div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center border border-muted/20 bg-background rounded-lg p-0.5">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="h-10 w-10 flex items-center justify-center hover:bg-muted/10"
              aria-label="Fewer pieces"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="w-5 text-center font-bold text-sm tabular-nums">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity((q) => Math.min(15, q + 1))}
              className="h-10 w-10 flex items-center justify-center hover:bg-muted/10"
              aria-label="More pieces"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
          <button
            onClick={handleAdd}
            aria-label={`Add ${addOn.item} to cart`}
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
  );
}
