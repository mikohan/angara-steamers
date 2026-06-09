import Image from "next/image";
import React from "react";
import BeforeImage from "@/public/images/before1.avif";
import AfterImage from "@/public/images/after1.avif";

export function CTA() {
  return (
    <section className="bg-background py-16 px-4 md:px-8">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12">
        {/* Left Side: Text & Conversion */}
        <div className="flex-1 flex flex-col gap-6">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            Is your couch looking TIRED?
          </h2>
          <p className="text-xl text-muted">
            We’ll make it look <strong>brand new again!</strong> Instantly
            restore vibrancy, freshness, and comfort to your favorite furniture.
            Eco-friendly cleaning you can trust.
          </p>

          <div className="flex flex-col gap-3 mt-4">
            <button className="bg-primary text-white px-8 py-4 rounded-lg font-bold text-lg hover:opacity-90 transition-transform active:scale-95">
              GET A FREE QUOTE TODAY!
            </button>
            <p className="text-center text-muted font-medium">
              Or Call Us: <span className="text-primary">1-800-FRESHEN</span>
            </p>
          </div>
        </div>

        {/* Right Side: Visual Proof */}
        <div className="flex-1 w-full grid grid-cols-2 gap-4">
          <div className="aspect-square bg-muted/20 rounded-xl overflow-hidden relative">
            {/* Replace with your 'Before' image */}
            <Image
              alt="Before"
              fill
              src={BeforeImage}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          <div className="aspect-square bg-muted/20 rounded-xl overflow-hidden relative">
            {/* Replace with your 'After' image */}
            <Image
              alt="After"
              fill
              src={AfterImage}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>

          {/* Optional: Person Image overlay or caption */}
          {/* <div className="col-span-2 h-48 bg-muted/20 rounded-xl flex items-center justify-center">
            <span className="text-muted">Friendly Staff Image Placeholder</span>
          </div> */}
        </div>
      </div>
    </section>
  );
}
