import { generateLocationsListSeo } from "@/data/meta-data/locations-meta"; // Adjust path accordingly
import { fetchStrapi } from "@/lib/strapi"; // Your fetch utility
import { LocationPage } from "@/types";

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

  return (
    <>
      {/* 3. Inject JSON-LD into the page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="container mx-auto py-12 px-6">
        <h1 className="text-4xl font-bold mb-12 tracking-tight">
          Our Service Areas
        </h1>

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
                      {cities.map((loc) => (
                        <a
                          key={loc.slug}
                          href={`/locations/${loc.slug}`}
                          className="block p-5 rounded-2xl bg-muted/20 hover:bg-primary/10 transition-all border border-muted/20"
                        >
                          <span className="font-medium text-foreground">
                            {loc.city_name}
                          </span>
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>
    </>
  );
}
