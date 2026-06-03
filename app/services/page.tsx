import { generateServicesListSeo } from "@/data/meta-data/meta-services";
import { fetchStrapi } from "@/lib/strapi";
import { ServicePage, StrapiResponse } from "@/types";

const getQuery = () => ({
  filters: {},
  populate: ["hero_image", "og_image", "faq", "service_hub"],
});

const baseUrl = `${process.env.NEXT_PUBLIC_COMPANY_WEBSITE}/services`;

export async function generateMetadata() {
  // Use a minimal query for metadata to save performance
  const response: StrapiResponse<ServicePage> = await fetchStrapi(
    "/service-pages",
    getQuery(),
  );
  const { metadata } = generateServicesListSeo(response, baseUrl);
  return metadata;
}

export default async function ServicesPage() {
  const response: StrapiResponse<ServicePage> = await fetchStrapi(
    "/service-pages",
    getQuery(),
  );
  const { jsonLd } = generateServicesListSeo(response, baseUrl);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="container mx-auto py-10">
        <h1 className="text-4xl font-bold mb-8">
          Our Upholstery Cleaning Services
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {response.data.map((service: ServicePage) => (
            <a
              key={service.slug}
              href={`/services/${service.slug}`}
              className="p-6 border rounded-lg hover:shadow-lg transition-shadow"
            >
              <h2 className="text-2xl font-semibold mb-2">{service.title}</h2>
              <p className="text-gray-600">{service.meta_description}</p>
            </a>
          ))}
        </div>
        <section>
          <pre>{JSON.stringify(jsonLd, null, 2)}</pre>
        </section>
      </main>
    </>
  );
}
