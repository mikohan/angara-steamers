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

  return (
    <>
      {/* 3. Inject JSON-LD into the page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="container mx-auto py-10">
        <h1 className="text-4xl font-bold mb-8">Our Service Areas</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {response.data.map((loc) => (
            <a
              key={loc.slug}
              href={`/locations/${loc.slug}`}
              className="p-6 border rounded-lg hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold">{loc.city_name}</h2>
              <p className="text-gray-600">
                Professional upholstery cleaning in {loc.city_name}.
              </p>
            </a>
          ))}
        </div>
        <section>{JSON.stringify(jsonLd, null, 2)}</section>
      </main>
    </>
  );
}
