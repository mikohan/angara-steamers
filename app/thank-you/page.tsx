"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/store/useCart";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import familyPhoto from "@/public/images/family.webp"; // Replace with your generated image path
import { ButtonShiny } from "@/components/common/ButtonShiny";
import { BorderLightButton } from "@/components/common/BorderLightButton";

export default function ThankYouPage() {
  const { cart } = useCart();
  const total = cart.reduce((sum, i) => sum + i.priceAfter * i.quantity, 0);

  return (
    <div className="min-h-screen bg-background py-16 px-4 md:px-8">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Left: Content */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 text-price-green">
            <CheckCircle2 className="w-12 h-12" />
            <h1 className="text-4xl font-black text-foreground">
              Booking Confirmed!
            </h1>
          </div>

          <p className="text-muted-foreground text-lg">
            Thank you for trusting Angara Streamers. Your order has been
            successfully placed. Our team will reach out shortly to finalize
            your appointment details.
          </p>

          <div className="bg-foreground/5 p-6 rounded-2xl border border-foreground/10 space-y-4">
            <h3 className="font-bold uppercase tracking-widest text-xs text-muted-foreground">
              Order Summary
            </h3>
            <div className="space-y-2">
              {cart.map((item) => (
                <div
                  key={item.item}
                  className="flex justify-between text-sm font-semibold"
                >
                  <span>
                    {item.quantity} x {item.item}
                  </span>
                  <span className="tabular-nums">
                    ${(item.priceAfter * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
            <div className="pt-4 border-t border-foreground/10 flex justify-between items-center">
              <span className="font-bold text-lg">Total Paid</span>
              <span className="text-2xl font-black text-teal-800 tabular-nums">
                ${total.toFixed(2)}
              </span>
            </div>
          </div>

          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-primary text-white py-3 px-8 rounded-xl font-bold hover:bg-primary/90 transition-all"
          >
            Back to Home <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Right: Photo */}
        <div className="relative aspect-[4/5] w-full rounded-3xl overflow-hidden shadow-2xl">
          <Image
            src={familyPhoto}
            alt="Happy family"
            fill
            className="object-cover"
            priority
            sizes="500px"
          />
        </div>
      </div>
    </div>
  );
}
