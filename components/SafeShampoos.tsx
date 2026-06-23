"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const GRID_IMAGES = [
  {
    id: "img-1",
    src: "https://picsum.photos/seed/upholstery1/800/600",
    alt: "Professional upholstery cleaning process",
    className: "col-span-2 h-64",
    sizes: "(max-width: 768px) 100vw, 50vw",
    hasShimmer: true,
  },
  {
    id: "img-2",
    src: "https://picsum.photos/seed/upholstery2/400/400",
    alt: "Family and pets on clean furniture",
    className: "h-40",
    sizes: "(max-width: 768px) 50vw, 25vw",
  },
  {
    id: "img-3",
    src: "https://picsum.photos/seed/upholstery3/400/400",
    alt: "Fresh clean living room",
    className: "h-40",
    sizes: "(max-width: 768px) 50vw, 25vw",
  },
];

export default function SafeShampoos() {
  return (
    <section className="py-16 px-4 max-w-6xl mx-auto">
      <div className="flex flex-col md:grid md:grid-cols-2 gap-12 items-center">
        {/* TEXT SECTION */}
        <motion.div
          className="order-1 md:order-2 space-y-6"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <div className="space-y-4">
            <h2 className="heading-h2">About Shampoos We use</h2>
            <p className="text-muted text-lg">
              Pure, Clean, and Safe for Everyone Your home is where your kids
              play and your pets lounge. That is why we use professional-grade
              shampoos designed to keep your space healthy, vibrant, and soft.
            </p>
          </div>

          <div className="space-y-6">
            <p className="text-foreground">
              <strong className="block text-primary">
                Family & Pet Ready:
              </strong>
              Our cleaning process is designed with your smallest family members
              in mind. From the moment your furniture is dry, it is ready for
              your kids to play on and your pets to curl up on, comfortably and
              securely.
            </p>
            <p className="text-foreground">
              <strong className="block text-primary">The Look of New:</strong>
              Experience the satisfaction of furniture that looks refreshed and
              feels revitalized. Our shampoos lift away deep-set dirt, bringing
              back the original, bright look of your favorite pieces.
            </p>
            <p className="text-foreground">
              <strong className="block text-primary">
                A Natural, Fresh Environment:
              </strong>
              We leave your home feeling airy and crisp. You’ll walk into a room
              that smells like a gentle, clean breeze, creating the perfect,
              cozy atmosphere for your family.
            </p>
            <p className="text-foreground">
              <strong className="block text-primary">Soft to the Touch:</strong>
              Beyond just looking clean, your upholstery will feel gentle and
              soft under your hands. It’s the kind of clean that makes your home
              feel brand new again.
            </p>
          </div>

          <p className="font-medium italic border-l-4 border-primary pl-4 text-foreground/80">
            Everything we do is focused on your comfort and peace of mind. Your
            home deserves a clean that feels just as good as it looks.
          </p>
        </motion.div>

        {/* BENTO GRID */}
        <div className="order-2 md:order-1 grid grid-cols-2 gap-3 w-full max-w-lg">
          {GRID_IMAGES.map((img) => (
            <motion.div
              key={img.id}
              className={`${img.className} relative rounded-3xl overflow-hidden touch-feedback`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                priority={img.hasShimmer}
                className="object-cover"
                sizes={img.sizes}
              />
              {img.hasShimmer && <div className="shimmer-strip" />}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
