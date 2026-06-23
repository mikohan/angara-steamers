import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import { cn } from "@/lib/utils";
import { ServicePage } from "@/types";

interface ServiceServiceLinksProps {
  allServices: ServicePage[];
  currentSlug: string;
  className?: string;
  limit?: number;
}

export function ServiceServiceLinks({
  allServices,
  currentSlug,
  className,
  limit = 8,
}: ServiceServiceLinksProps) {
  // Logic: Filter out current page and limit to requested count
  const filteredServices = allServices
    .filter((s) => s.slug !== currentSlug)
    .slice(0, limit);

  if (filteredServices.length === 0) return null;

  return (
    <div className={cn("grid md:grid-cols-4 gap-4 my-8", className)}>
      {filteredServices.map((service) => (
        <Link
          key={service.slug}
          href={service.slug}
          className="group flex items-center gap-4 p-2 rounded-xl border border-primary/20 bg-card hover:border-primary/50 transition-all shadow-sm hover:shadow-md"
        >
          {/* Image Container */}
          <div className="relative w-20 h-20 shrink-0 rounded-md overflow-hidden bg-muted/10">
            <Image
              src={process.env.NEXT_PUBLIC_STRAPI_URL + service.hero_image.url}
              alt={
                service.hero_image.alternativeText || "Service " + service.title
              }
              fill
              sizes="80px"
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
          </div>

          {/* Text Content */}
          <div className="flex flex-col gap-1 w-full">
            <span className="text-xs font-bold uppercase text-primary line-clamp-2">
              Related Service
            </span>
            <h4 className="text-xs font-semibold group-hover:text-primary transition-colors line-clamp-2">
              {service.title}
            </h4>
          </div>

          {/* Arrow */}
          <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
            <span className="bg-primary/10 text-primary p-2 rounded-full block text-sm">
              →
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
