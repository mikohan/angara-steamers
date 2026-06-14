import Image from "next/image";
import Link from "next/link";
import { ServicePage } from "@/types"; // Adjust import to your actual type definition

interface ServiceGridProps {
  services?: ServicePage[];
  parentSlug: string;
}
const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL;
export function ServiceGrid({ services, parentSlug }: ServiceGridProps) {
  if (!services || services.length === 0) {
    return (
      <p className="text-muted italic">No services listed at this time.</p>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {services.map((service) => (
        <Link
          key={service.slug}
          href={`/services/${parentSlug}/${service.slug}`}
          className="group block p-6 border rounded-xl bg-background border-primary/10 hover:border-primary/50 transition-all duration-300 hover:shadow-lg touch-feedback"
        >
          {service.hero_image?.url && (
            <div className="relative h-48 w-full mb-4 overflow-hidden rounded-lg">
              <Image
                src={strapiUrl + service.hero_image.url}
                alt={service.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
          )}
          <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
            {service.title}
          </h3>
          <p className="mt-2 text-sm text-muted">View details →</p>
        </Link>
      ))}
    </div>
  );
}
