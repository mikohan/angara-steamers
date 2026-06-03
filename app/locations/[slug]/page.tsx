import { fetchStrapi } from "@/lib/strapi";
import { LocationPage, StrapiResponse } from "@/types";
import { generateWeaponsGradeSeo } from "@/lib/meta-bones";
import { generateBreadcrumbs } from "@/lib/jsonBreadcrumbs";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const getQuery = (slug: string) => ({
  filters: { slug: { $eq: slug } },
  populate: ["state", "region", "og_image", "faq", "map_component", "projects"],
});

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const rawResponse = await fetchStrapi<LocationPage>(
    "location-pages",
    getQuery(slug),
  );

  const { metadata } = generateWeaponsGradeSeo(
    rawResponse,
    `${process.env.NEXT_PUBLIC_COMPANY_WEBSITE}/locations/${slug}`,
  );
  return metadata;
}

export default async function Location({ params }: PageProps) {
  const { slug } = await params;
  const pathname = `/locations/${slug}`;
  const fullUrl = `${process.env.NEXT_PUBLIC_COMPANY_WEBSITE}${pathname}`;

  let rawResponse: StrapiResponse<LocationPage>;

  // 1. Fetch data safely outside of the return statement
  try {
    rawResponse = await fetchStrapi<LocationPage>(
      "location-pages",
      getQuery(slug),
    );
  } catch (error) {
    console.error(error);
    return (
      <main className="p-10 text-red-500">Error loading page content.</main>
    );
  }

  // 2. Handle empty state
  if (!rawResponse?.data) {
    return <main className="p-10">No data found for this location.</main>;
  }

  // 3. Generate data needed for rendering
  const { jsonLd } = generateWeaponsGradeSeo(rawResponse, fullUrl);
  const schema = generateBreadcrumbs(pathname);
  const combinedSchema = JSON.stringify(
    [...jsonLd, schema].filter(Boolean),
    null,
    2,
  );

  // 4. Return the JSX
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: combinedSchema }}
      />

      <main className="p-10">
        {/* <pre>{JSON.stringify(combinedSchema, null, 2)}</pre> */}
        <pre>{combinedSchema}</pre>
      </main>
    </>
  );
}
