"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-background py-20 lg:py-32">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-12 px-6 lg:flex-row">
        {/* Left: Image / Visual Area */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative w-full lg:w-1/2"
        >
          <div className="aspect-[4/3] w-full rounded-3xl bg-muted/20 shadow-2xl flex items-center justify-center border border-muted/20">
            {/* Replace this div with your Image component later */}
            <span className="text-muted font-medium">
              Upholstery Cleaning Preview
            </span>
          </div>

          {/* Social Proof Badge (Floating) */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="absolute -bottom-6 -left-6 rounded-2xl bg-background p-4 shadow-lg border border-muted/20"
          >
            <p className="text-sm font-semibold text-foreground">
              ⭐ Rated 4.9/5
            </p>
            <p className="text-xs text-muted">Over 500+ couches cleaned</p>
          </motion.div>
        </motion.div>

        {/* Right: Text Content */}
        <div className="w-full lg:w-1/2 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
              Professional <span className="text-primary">Steam Cleaning</span>{" "}
              for Your Home
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Angara Streamers uses advanced steam technology to lift stains,
              allergens, and odors. Restore your furniture to its original glory
              without harsh chemicals.
            </p>
          </motion.div>

          <motion.div
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Link
              href="/upholstery"
              className="rounded-full bg-primary px-8 py-3 text-white font-medium touch-feedback hover:opacity-90"
            >
              Book Now
            </Link>
            <Link
              href="/features"
              className="rounded-full bg-muted/20 px-8 py-3 text-foreground font-medium touch-feedback hover:bg-muted/30"
            >
              See Our Process
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
