import { prices } from "@/data/prices";
import { IPrice } from "@/types";
import { Breadcrumbs } from "@/components/common/BreadCrumbs";
import type { Metadata, Viewport } from "next";
import { ServiceGrid } from "@/components/PriceServiceGrid";
import { SidebarLedger } from "@/components/SidebarLegger";

// SEO Metadata Configuration
export const metadata: Metadata = {
  title: "Professional Upholstery and Carpet Cleaning Prices | Angara Steamers",
  description:
    "View transparent pricing for professional upholstery and carpet cleaning services. Book eco-friendly, expert cleaning for your home or office in Los Angeles.",
  keywords: [
    "carpet cleaning prices",
    "upholstery cleaning cost",
    "professional cleaning services",
    "Angara Steamers",
    "Los Angeles cleaning",
  ],
  alternates: {
    canonical: "/prices",
  },
  robots: {
    index: true,
    follow: true,
  },
};

// Viewport must be a separate export to avoid Next.js warnings
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function ServiceListingPage() {
  // Grouping logic performed on the server
  const groupedServices = prices.reduce(
    (acc, service) => {
      if (!acc[service.category]) {
        acc[service.category] = [];
      }
      acc[service.category].push(service);
      return acc;
    },
    {} as Record<string, IPrice[]>,
  );

  // Structured Data (JSON-LD)
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: prices.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Service",
        name: service.item,
        description: `Professional ${service.category} service by Angara Steamers.`,
        provider: {
          "@type": "Organization",
          name: "Angara Steamers",
          url: "https://angarasteamers.com",
        },
        offers: {
          "@type": "Offer",
          priceCurrency: "USD",
          price: service.priceAfter.toFixed(0),
        },
      },
    })),
  };

  return (
    <main className="min-h-screen bg-background p-4 md:p-8 lg:p-12">
      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <div className="max-w-6xl mx-auto">
        <Breadcrumbs
          segments={[
            { label: "Home", path: "/" },
            { label: "Prices", path: "/prices" },
          ]}
          className="pb-8 pl-4"
        />

        <h1 className="my-8 heading-h2">
          Price for Upholstery and Carpet Professional Cleaning
        </h1>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* SIDEBAR LEDGER - STICKY POSITIONING */}
          <div className="lg:col-span-4 lg:sticky lg:top-8">
            <SidebarLedger />
          </div>

          {/* SERVICES GRID */}
          <ServiceGrid groupedServices={groupedServices} />
        </div>
      </div>
    </main>
  );
}
