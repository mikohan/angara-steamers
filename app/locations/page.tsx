import { Breadcrumbs } from "@/components/common/BreadCrumbs";
import { CTA } from "@/components/CTA";
import { generateLocationsListSeo } from "@/data/meta-data/locations-meta"; // Adjust path accordingly
import { fetchStrapi } from "@/lib/strapi"; // Your fetch utility
import { LocationPage } from "@/types";
import Image from "next/image";

// 1. Define Metadata for Next.js
const getQuery = () => ({
  populate: ["state", "region", "og_image", "faq", "map_component", "projects"],
});

const baseUrl = `${process.env.NEXT_PUBLIC_COMPANY_WEBSITE}/locations`;
export async function generateMetadata() {
  const response = await fetchStrapi<LocationPage>(
    "/location-pages",
    getQuery(),
  );

  const { metadata } = generateLocationsListSeo(response, baseUrl);
  return metadata;
}

// 2. Page Component
export default async function LocationsPage() {
  const response = await fetchStrapi<LocationPage>(
    "/location-pages",
    getQuery(),
  );

  // Generate the Schema
  const { jsonLd } = generateLocationsListSeo(response, baseUrl);
  // 1. Group the data
  const groupedLocations = response.data.reduce(
    (acc, loc) => {
      const state = loc.state?.name || "Other";
      const region = loc.region?.name || "General";

      if (!acc[state]) acc[state] = {};
      if (!acc[state][region]) acc[state][region] = [];

      acc[state][region].push(loc);
      return acc;
    },
    {} as Record<string, Record<string, typeof response.data>>,
  );

  const breadcrumbSegments = [
    { label: "Home", path: "/" },
    { label: "Service Areas", path: "/locations" },
  ];
  return (
    <>
      {/* 3. Inject JSON-LD into the page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="container mx-auto py-12 px-6 max-w-7xl">
        <Breadcrumbs segments={breadcrumbSegments} className="mt-4 mb-8" />
        <div className="max-w-5xl">
          <h1 className="text-4xl font-bold tracking-tight">
            Professional Upholstery Cleaning Services in Service Areas
          </h1>
          <h2 className="mb-12 mt-4">
            Expert textile restoration for high-end homes and commercial
            properties. Serving your neighborhood with certified, eco-friendly
            deep cleaning and allergen extraction.
          </h2>
        </div>
        <div className="space-y-16">
          {Object.entries(groupedLocations).map(([state, regions]) => (
            <section key={state}>
              <h2 className="text-3xl font-bold mb-8 text-primary">{state}</h2>

              <div className="space-y-10">
                {Object.entries(regions).map(([region, cities]) => (
                  <div key={region}>
                    <h3 className="text-xl font-semibold mb-4 text-foreground/80 border-l-4 border-primary pl-4">
                      {region}
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      {cities.map((loc) => {
                        const img =
                          (process.env.NEXT_PUBLIC_STRAPI_URL ||
                            "https://cms.angaracleaning.com") +
                            loc.og_image.formats?.thumbnail.url ||
                          "images/og_image.webp";
                        return (
                          <div
                            key={loc.slug}
                            className="p-4 rounded-xl bg-primary/10 flex flex-col gap-4 justify-between"
                          >
                            <Image
                              src={img}
                              alt={loc.city_name}
                              width={300}
                              height={200}
                            />
                            <a href={`/locations/${loc.slug}`}>
                              <span className="font-medium text-sm text-foreground">
                                {loc.city_name}
                              </span>
                            </a>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
        <section className="my-16 md:my-32">
          <CTA />
        </section>
      </main>
    </>
  );
}
