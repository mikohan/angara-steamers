import { prices } from "@/data/prices";
import { IPrice } from "@/types";
import { Breadcrumbs } from "@/components/common/BreadCrumbs";
import type { Metadata, Viewport } from "next";
import { ServiceGrid } from "@/components/PriceServiceGrid";
import { SidebarLedger } from "@/components/SidebarLegger"; // Move your existing SidebarLedger here

export const metadata: Metadata = {
  /* ... your metadata code ... */
};
export const viewport: Viewport = { width: "device-width", initialScale: 1 };

export default function ServiceListingPage() {
  const groupedServices = prices.reduce(
    (acc, service) => {
      if (!acc[service.category]) acc[service.category] = [];
      acc[service.category].push(service);
      return acc;
    },
    {} as Record<string, IPrice[]>,
  );

  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: prices.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Service",
        name: service.item,
        offers: { "@type": "Offer", price: service.priceAfter.toFixed(2) },
      },
    })),
  };

  return (
    <main className="min-h-screen bg-background p-4 md:p-8 lg:p-12">
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
          <div className="lg:col-span-4 lg:sticky lg:top-8">
            <SidebarLedger />
          </div>
          <ServiceGrid groupedServices={groupedServices} />
        </div>
      </div>
    </main>
  );
}
