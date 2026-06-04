import { generateHubSeo } from "@/data/meta-data/meta-services";
import { fetchStrapi } from "@/lib/strapi";
import { StrapiResponse, ServiceHub } from "@/types";
import { notFound } from "next/navigation";

interface PageProps {
  params: { pillar: string };
}
//Static params generation
export async function generateStaticParams() {
  const services: StrapiResponse<ServiceHub> = await fetchStrapi(
    "service-hubs",
    {
      fields: ["slug"],
    },
  );

  const paths = services.data.map((item: ServiceHub) => ({
    pillar: item.slug,
  }));
  // console.log("GENERATING STATIC PATHS:", paths);
  return paths;
}

// Generate metaData
export async function generateMetadata({ params }: PageProps) {
  const { pillar } = await params;

  try {
    const response: StrapiResponse<ServiceHub> = await fetchStrapi(
      "service-hubs",
      {
        filters: { slug: { $eq: pillar } },
        populate: ["service_pages"],
      },
    );

    if (!response?.data?.length) {
      return { title: "Page Not Found" };
    }

    const baseUrl = `${process.env.NEXT_PUBLIC_COMPANY_WEBSITE}/${pillar}`;
    const { metadata } = generateHubSeo(response, baseUrl);
    return metadata;
  } catch (error) {
    console.error("Metadata fetch failed for:", pillar, error);
    // Return default metadata so the page still builds even if Strapi is unhappy
    return { title: "Our Services | Angara Steamers" };
  }
}

// Page itself code

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ pillar: string }>;
}) {
  const { pillar } = await params;
  // console.log(pillar);
  // 2. Fetch only the data for THIS specific pillar
  // This acts as your "existence check"
  const getQuery = (pillar: string) => ({
    filters: { slug: { $eq: pillar } },
    populate: ["service_pages"],
  });
  const response: StrapiResponse<ServiceHub> = await fetchStrapi(
    "service-hubs",
    getQuery(pillar),
  );

  // 3. If no hub exists with this slug, return 404 immediately
  if (!response?.data?.length) {
    notFound();
  }

  const baseUrl = `${process.env.NEXT_PUBLIC_COMPANY_WEBSITE}/${pillar}`;
  const { jsonLd } = generateHubSeo(response, baseUrl);

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
          {response.data.map((hub) => (
            <div
              key={hub.slug}
              className="p-6 border rounded-lg hover:shadow-lg transition-shadow"
            >
              {/* 1. Hub Section */}
              <h2 className="text-2xl font-semibold mb-4 text-primary">
                {hub.title}
              </h2>

              {/* 2. Nested Service Pages Section */}
              <ul className="space-y-2">
                {hub.service_pages && hub.service_pages.length > 0 ? (
                  hub.service_pages.map((service) => (
                    <li key={service.slug}>
                      <a
                        href={`/${hub.slug}/${service.slug}`}
                        className="text-sm text-gray-700 hover:text-primary hover:underline transition-colors"
                      >
                        {service.title}
                      </a>
                    </li>
                  ))
                ) : (
                  <li className="text-xs text-gray-400 italic">
                    No services listed
                  </li>
                )}
              </ul>
            </div>
          ))}
        </div>
        <section>
          <pre>{JSON.stringify(jsonLd, null, 2)}</pre>
        </section>
      </main>
    </>
  );
}
