"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import EnemyImage from "@/public/images/enemy.jpg";

export function Enemy() {
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
          <div className="space-y-3">
            <h2 className="heading-h2">
              Get Rid of Hidden Allergens — Restore Your Furniture in Just One
              Visit
            </h2>
            <p className="text-muted text-lg">
              Regular vacuuming misses what’s trapped deep inside your fabrics.
              Our targeted extraction removes hidden irritants while keeping
              your home completely safe for kids and pets.
            </p>
          </div>

          <div className="space-y-5">
            <div className="space-y-1">
              <strong className="block text-primary font-semibold text-lg">
                1. Eliminate Deep-Seated Health Triggers
              </strong>
              <p className="text-foreground">
                We extract dust mites, allergens, and mold spores embedded deep
                within fabric fibers. Removing these hidden contaminants helps
                stop chronic skin itching, asthma flares, and indoor allergy
                reactions.
              </p>
            </div>

            <div className="space-y-1">
              <strong className="block text-primary font-semibold text-lg">
                2. Non-Toxic & Safe for Kids and Pets
              </strong>
              <p className="text-foreground">
                We custom-select gentle, non-toxic cleaning solutions tailored
                specifically to your fabric type. Once dry, your furniture is
                immediately ready for children and pets to lounge on safely.
              </p>
            </div>

            <div className="space-y-1">
              <strong className="block text-primary font-semibold text-lg">
                3. Like-New Look with Visible Results
              </strong>
              <p className="text-foreground">
                We break down deep dirt and stubborn stains to restore the
                original texture and brightness of your upholstery. You’ll see
                the extracted water for yourself—proving exactly what came out
                of your furniture.
              </p>
            </div>
          </div>

          <p className="font-medium italic border-l-4 border-primary pl-4 text-foreground/80 pt-1">
            Experience the relief of a truly clean home with zero chemical
            residue left behind.
          </p>
        </motion.div>

        {/* SINGLE IMAGE SECTION */}
        <motion.div
          className="order-2 md:order-1 w-full max-w-lg relative h-[800px] rounded-3xl overflow-hidden shadow-lg"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <Image
            src={EnemyImage}
            alt="Hidden allergens and dust mites removed from furniture"
            fill
            priority
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </motion.div>
      </div>
    </section>
  );
}
