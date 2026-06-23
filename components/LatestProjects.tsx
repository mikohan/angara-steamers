"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, MapPin, ArrowUpRight } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { Project } from "@/types";

interface LatestProjectsProps {
  projects: Project[];
  cityName?: string;
  locationSlug?: string;
}

export function LatestProjects({
  projects,
  cityName,
  locationSlug,
}: LatestProjectsProps) {
  if (!projects?.length) return null;

  const strapiUrl =
    process.env.NEXT_PUBLIC_STRAPI_URL || "https://cms.angaracleaning.com";

  return (
    <section className="relative overflow-hidden bg-background transition-colors duration-300">
      {/* Background Decorative Mesh lines */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-size-[14px_24px] mask-[radial-gradient(ellipse_60%_50%_at_50%_100%,#000_70%,transparent_100%)] opacity-70" />

      <div className="container mx-auto max-w-7xl px-6">
        {/* Header Layout */}
        <div className="mb-12 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end lg:mb-16">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/10 bg-primary/5 px-3 py-1 text-primary backdrop-blur-sm">
              <MapPin className="h-3.5 w-3.5 stroke-[2.5]" />
              <span className="text-xs font-bold tracking-widest uppercase">
                Recent Work
              </span>
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              Latest Upholstery and Carpet Cleaning in{" "}
              <span className="bg-linear-to-r from-primary to-primary-800 bg-clip-text text-transparent">
                {cityName}
              </span>
            </h2>
            <p className="max-w-xl text-base text-muted/90">
              See actual physical deep cleaning results delivered directly to
              your neighborhood properties.
            </p>
          </div>
        </div>

        {/* Premium Grid Canvas */}
        <div className="grid gap-6 sm:grid-cols-4">
          {projects.map((project, index) => {
            // Securely grab the first image out of the media gallery as your thumbnail
            const thumbnailMedia = project.media_gallery?.[0];
            const thumbnailUrl = thumbnailMedia
              ? `${strapiUrl}${thumbnailMedia.url}`
              : "/images/og_image.webp";
            const projectLink = `/projects/${locationSlug}/${project.slug}`;

            return (
              <motion.div
                key={project.id || index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="w-full"
              >
                <Link
                  href={projectLink}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-primary/10 bg-background transition-all duration-300 hover:border-primary/40 hover:shadow-[0_12px_32px_-12px_rgba(0,0,0,0.12)]"
                >
                  {/* Thumbnail Wrap */}
                  <div className="relative aspect-4/3 w-full overflow-hidden bg-muted/10">
                    <Image
                      src={thumbnailUrl}
                      alt={thumbnailMedia?.alternativeText || project.title}
                      fill
                      sizes="(max-w-7xl) 25vw, 50vw"
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-background/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                    {/* Action Circle Button Indicator */}
                    <div className="absolute right-4 bottom-4 flex h-9 w-9 -translate-y-2 items-center justify-center rounded-full bg-background/90 text-foreground opacity-0 shadow-md backdrop-blur-sm transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 dark:bg-background/80">
                      <ArrowUpRight className="h-4 w-4 stroke-[2.5] text-primary" />
                    </div>
                  </div>

                  {/* Context Text Details */}
                  <div className="flex flex-1 flex-col p-5">
                    {/* Meta Timeline Details */}
                    <div className="mb-2.5 flex items-center gap-1.5 text-xs text-muted">
                      <Calendar className="h-3.5 w-3.5" />
                      <time dateTime={project.completion_date}>
                        {formatDate(project.completion_date)}
                      </time>
                    </div>

                    {/* Title Anchor */}
                    <h3 className="line-clamp-2 text-base font-bold tracking-tight text-foreground transition-colors duration-200 group-hover:text-primary md:text-lg">
                      {project.title}
                    </h3>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
