import { generateServicePageSeo } from "@/lib/meta-service";
import { fetchStrapi } from "@/lib/strapi";
import { ServicePage, StrapiResponse } from "@/types";

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
  const { combinedJsonLd } = generateServicePageSeo(
    data,
    `${process.env.NEXT_PUBLIC_COMPANY_WEBSITE}/services/${slug}`,
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
      <pre>{JSON.stringify(combinedJsonLd, null, 2)}</pre>
    </main>
  );
}
