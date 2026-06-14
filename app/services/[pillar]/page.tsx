import { Breadcrumbs } from "@/components/common/BreadCrumbs";
import { CTA } from "@/components/CTA";
import { LogoTicker } from "@/components/LogoTicker";
import { Hero } from "@/components/Hero";
import { ServiceGrid } from "@/components/ServiseGrid";
import { Testimonials } from "@/components/Testimonials";
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
  params: { pillar: string };
}) {
  const { pillar } = await params;
  // console.log(pillar);
  // 2. Fetch only the data for THIS specific pillar
  // This acts as your "existence check"
  const getQuery = (pillar: string) => ({
    filters: { slug: { $eq: pillar } },
    populate: ["service_pages", "service_pages.hero_image"],
  });
  const response: StrapiResponse<ServiceHub> = await fetchStrapi(
    "service-hubs",
    getQuery(pillar),
  );

  // 3. If no hub exists with this slug, return 404 immediately
  if (!response?.data?.length) {
    notFound();
  }

  const servicesData = await response.data[0];

  const baseUrl = `${process.env.NEXT_PUBLIC_COMPANY_WEBSITE}/${pillar}`;
  const { jsonLd } = generateHubSeo(response, baseUrl);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main>
        <section className="px-4 mx-auto max-w-7xl">
          <Breadcrumbs className="my-4" removeSegments={["services"]} />
          <Hero video />
        </section>

        <section>{/* <pre>{JSON.stringify(jsonLd, null, 2)}</pre> */}</section>
        <section className="py-16 bg-primary/10 mb-16">
          <LogoTicker />
        </section>
        <section className="px-4 max-w-7xl mx-auto mb-16">
          {/* Pass the array directly to the Grid component */}
          <h2 className="heading-h2 text-center py-8 md:py-16">
            {servicesData.meta_title}
          </h2>
          <ServiceGrid
            services={servicesData.service_pages}
            parentSlug={pillar}
          />
        </section>
        <section className="px-4 my-16 max-w-7xl mx-auto">
          <Testimonials />
        </section>
        <section className="px-4 max-w-5xl mx-auto my-32">
          <CTA />
        </section>
      </main>
    </>
  );
}
