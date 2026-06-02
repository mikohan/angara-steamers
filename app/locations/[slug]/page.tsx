import { fetchStrapi } from "@/lib/strapi";
import { LocationPage, StrapiResponse } from "@/types";
import { generateWeaponsGradeSeo } from "@/lib/meta-bones";

import { generateBreadcrumbs } from "@/lib/jsonBreadcrumbs";

interface PageProps {
  params: Promise<{ slug: string }>;
}
export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;

  // Define the query object matching your URL parameters
  const query = {
    filters: {
      slug: {
        $eq: slug,
      },
    },
    populate: [
      "state",
      "region",
      "og_image",
      "faq",
      "map_component",
      "projects",
    ],
  };

  const rawResponse: StrapiResponse<LocationPage> = await fetchStrapi(
    "location-pages",
    query,
  );

  const { metadata } = generateWeaponsGradeSeo(
    rawResponse,
    `${process.env.NEXT_PUBLIC_COMPANY_WEBSITE}/locations/${slug}`,
  );
  return metadata;
}

export default async function Location({ params }: PageProps) {
  let data = null;
  let error = null;
  const { slug } = await params;
  const pathname = `/locations/${slug}`;

  // Now pass this to your breadcrumb helper
  const schema = generateBreadcrumbs(pathname);

  // Define the query object matching your URL parameters
  const query = {
    filters: {
      slug: {
        $eq: slug,
      },
    },
    populate: [
      "state",
      "region",
      "og_image",
      "faq",
      "map_component",
      "projects",
    ],
  };

  const rawResponse: StrapiResponse<LocationPage> = await fetchStrapi(
    "location-pages",
    query,
  );
  console.log(rawResponse);

  const { jsonLd } = generateWeaponsGradeSeo(
    rawResponse,
    `${process.env.NEXT_PUBLIC_COMPANY_WEBSITE}/locations/${slug}`,
  );

  // 2. Data fetching happens outside the JSX return
  try {
    const response = await fetchStrapi<LocationPage>("location-pages", query);
    data = response.data;
  } catch (e) {
    error = e instanceof Error ? e.message : "Unknown error";
  }

  // 3. Simple UI rendering based on the result
  if (error) {
    return <main className="p-10 text-red-500">Error: {error}</main>;
  }

  if (!data) {
    return <main className="p-10">Loading or No Data...</main>;
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([...jsonLd, schema].filter(Boolean)),
        }}
      />

      <main className="p-10">
        {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
        <pre>
          {JSON.stringify([...jsonLd, schema].filter(Boolean), null, 2)}
        </pre>
        {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      </main>
    </>
  );
}
