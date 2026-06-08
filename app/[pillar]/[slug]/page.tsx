import { generateServicePageSeo } from "@/data/meta-data/meta-service";
import { fetchStrapi } from "@/lib/strapi";
import { ServicePage, State, StrapiResponse } from "@/types";
import { notFound } from "next/navigation";

// 1. Tell Next.js which paths to pre-render at build time
// app/[pillar]/[slug]/page.tsx

export async function generateStaticParams() {
  // 1. Fetch all services from Strapi
  const services: StrapiResponse<ServicePage> = await fetchStrapi(
    "service-pages",
    {
      populate: ["service_hub"],
    },
  );

  // 2. Filter out items where service_hub is missing and map safely
  return services.data
    .filter((service) => service.service_hub?.slug) // Ensure hub and slug exist
    .map((service) => ({
      pillar: service.service_hub!.slug, // ! tells TS "we checked this above"
      slug: service.slug,
    }));
}

const getQuery = (slug: string) => ({
  filters: {
    slug: {
      $eq: slug,
    },
  },
  populate: ["hero_image", "og_image", "faq", "service_hub"],
});

// 1. Generate Metadata
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  const data: StrapiResponse<ServicePage> = await fetchStrapi(
    `service-pages`,
    getQuery(slug),
  );

  const { metadata } = generateServicePageSeo(
    data,
    `${process.env.NEXT_PUBLIC_COMPANY_WEBSITE}/services/${slug}`,
  );
  return metadata;
}

// 2. Render Page and JSON-LD
export default async function ServicePagePage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  const data: StrapiResponse<ServicePage> = await fetchStrapi(
    "service-pages",
    getQuery(slug),
  );
  if (!data?.data?.length) {
    notFound();
  }

  const statesData: StrapiResponse<State> = await fetchStrapi("states");
  const { combinedJsonLd } = generateServicePageSeo(
    data,
    `${process.env.NEXT_PUBLIC_COMPANY_WEBSITE}/services/${slug}`,
    statesData,
  );

  return (
    <main>
      {/* Inject Schema as a Script Tag */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(combinedJsonLd) }}
      />

      <h1>{data.data[0].title}</h1>
      {/* Rest of your page content */}
      {/* <pre>{JSON.stringify(combinedJsonLd, null, 2)}</pre> */}
    </main>
  );
}
