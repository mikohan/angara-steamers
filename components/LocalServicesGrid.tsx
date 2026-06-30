"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { ServicePage } from "@/types";

interface LocalServicesGridProps {
  services: ServicePage[];
  cityName: string;
}

export default function LocalServicesGrid({
  services,
  cityName,
}: LocalServicesGridProps) {
  if (!services?.length) return null;

  const strapiUrl =
    process.env.NEXT_PUBLIC_STRAPI_URL || "https://cms.angaracleaning.com";

  // Sort services cleanly by their ordered weight property assigned in Strapi
  const sortedServices = [...services].sort(
    (a, b) => (a.order || 0) - (b.order || 0),
  );

  return (
    <div className="w-full transition-colors duration-300">
      <div className="container mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className="mb-14 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/10 bg-primary/5 px-3 py-1 text-primary backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5 stroke-[2.5]" />
            <span className="text-xs font-bold tracking-widest uppercase">
              Premium Solutions
            </span>
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Deep Cleaning Services Available in{" "}
            <span className="bg-linear-to-r from-primary to-primary-800 bg-clip-text text-transparent">
              {cityName}
            </span>
          </h2>
          <p className="text-base text-muted/90 max-w-xl">
            Explore our specialized cleaning options executed by local certified
            professionals right in {cityName}.
          </p>
        </div>

        {/* 2-Column Visual Image Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4 w-full">
          {sortedServices.map((service, index) => {
            // Safe Image Compilation
            const imgTarget = service.hero_image || service.og_image;
            const thumbnailUrl = imgTarget?.url
              ? `${strapiUrl}${imgTarget.url}`
              : "/images/placeholder-service.webp";

            // Advanced Dynamic URL Assembly matching: /services/[hub-slug]/[service-slug]
            const hubSlug = service.service_hub?.slug;
            const serviceSlug = service.slug;

            // Ensure we have at least a serviceSlug before building the path
            const absolutePath = serviceSlug
              ? hubSlug
                ? `/services/${hubSlug}/${serviceSlug}`
                : `/services/${hubSlug}/${serviceSlug}`
              : "/services/upholstery"; // Fallback if the slug is missing entirely

            return (
              <motion.div
                key={service.id || index}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="w-full flex"
              >
                <Link
                  href={absolutePath}
                  className="group relative flex w-full flex-col overflow-hidden rounded-3xl border border-primary/10 shadow-xl bg-background transition-all duration-500 hover:border-primary/30 hover:shadow-[0_24px_60px_-15px_rgba(0,0,0,0.15)]"
                >
                  {/* Thumbnail Image Frame container (Cinematic 16:10 Ratio) */}
                  <div className="relative aspect-16/10 w-full shrink-0 overflow-hidden bg-muted/10">
                    <Image
                      src={thumbnailUrl}
                      alt={imgTarget?.alternativeText || service.title}
                      fill
                      sizes="(max-w-7xl) 50vw, 100vw"
                      priority={index < 2}
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />

                    {/* Premium Ambient Dark Overlay Blend */}
                    <div className="absolute inset-0 bg-linear-to-t from-background/80 via-background/10 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-40" />

                    {/* Floating Action Circle Button */}
                    <div className="absolute right-6 bottom-6 flex h-11 w-11 items-center justify-center rounded-full bg-background/90 text-primary opacity-0 shadow-xl backdrop-blur-md transition-all duration-500 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0">
                      <ArrowUpRight className="h-5 w-5 stroke-[2.5]" />
                    </div>
                  </div>

                  {/* Component Description Details Canvas */}
                  <div className="flex flex-1 flex-col p-8 justify-between">
                    <div className="space-y-3">
                      <h3 className="text-xl font-bold tracking-tight text-foreground transition-colors duration-200 group-hover:text-primary md:text-2xl">
                        {service.title} in {cityName}
                      </h3>

                      {/* Secondary fallback rendering for meta/subheading lines */}
                      {service.h2_subheadning && (
                        <p className="text-sm text-muted line-clamp-2 leading-relaxed">
                          {service.h2_subheadning}
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
