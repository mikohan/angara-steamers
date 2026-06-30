import { Breadcrumbs } from "@/components/common/BreadCrumbs";
import { RichTextRenderer } from "@/components/common/RichTextRenderer";
import { SectionWrapper } from "@/components/common/SectionWrapper";
import { CTA } from "@/components/CTA";
import FAQ from "@/components/FAQ";
import { Hero } from "@/components/Hero";
import { LatestProjectsService } from "@/components/LatestProjectsService";
import { LogoTicker } from "@/components/LogoTicker";
import { Team } from "@/components/oldComponents/Team";
import { VideoReviews } from "@/components/oldComponents/VideoReviews";
import { WhyUs } from "@/components/oldComponents/WhyUs";
import { ServiceServiceLinks } from "@/components/ServiceServiceLinks";
import { Testimonials } from "@/components/Testimonials";
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

// const getQuery = (slug: string) => ({
//   filters: {
//     slug: {
//       $eq: slug,
//     },
//   },
//   populate: ["hero_image", "og_image", "faq", "service_hub", "projects"],
// });
const getQuery = (slug: string) => ({
  filters: {
    slug: {
      $eq: slug,
    },
  },
  populate: {
    hero_image: true,
    og_image: true,
    faq: true,
    service_hub: true,
    projects: {
      populate: ["location_page", "media_gallery"],
    },
  },
});

// 1. Generate Metadata
export async function generateMetadata({
  params,
}: {
  params: Promise<{ pillar: string; slug: string }>;
}) {
  const { pillar, slug } = await params;

  // 1. Ignore collision routes
  if (pillar === "projects") return {};

  // 2. Fetch Data
  const response: StrapiResponse<ServicePage> = await fetchStrapi(
    "service-pages",
    getQuery(slug),
  );

  // 3. Fail-Safe: If no data, return empty metadata instead of crashing
  if (!response?.data?.[0]) {
    console.error(
      `[SEO CRASH PREVENTION]: No service found for /${pillar}/${slug}`,
    );
    return { title: "Page Not Found" };
  }

  // 4. Generate Metadata
  const { metadata } = generateServicePageSeo(
    response,
    `${process.env.NEXT_PUBLIC_COMPANY_WEBSITE}/services/${pillar}/${slug}`,
  );

  return metadata;
}

// 2. Render Page and JSON-LD
export default async function ServicePagePage({
  params,
}: {
  params: { pillar: string; slug: string };
}) {
  const { pillar, slug } = await params;
  const data: StrapiResponse<ServicePage> = await fetchStrapi(
    "service-pages",
    getQuery(slug),
  );
  if (!data?.data?.length) {
    notFound();
  }
  const service = data.data[0];

  const statesData: StrapiResponse<State> = await fetchStrapi("states");
  const { combinedJsonLd } = generateServicePageSeo(
    data,
    `${process.env.NEXT_PUBLIC_COMPANY_WEBSITE}/services/${pillar}/${slug}`,
    statesData,
  );
  const heroImageUrl =
    process.env.NEXT_PUBLIC_STRAPI_URL + service.hero_image.url || "";
  const projects = service.projects || [];
  // console.log(projects[0].location_page);
  const validProjects = projects.filter(
    (p): p is typeof p & { date: string } => p.createdAt !== undefined,
  );
  const latestProjects = [...validProjects]
    .sort(
      (a, b) =>
        new Date(b.createdAt ?? 0).getTime() -
        new Date(a.createdAt ?? 0).getTime(),
    )
    .map((project) => {
      // Check if the date exists; if not, return null to filter it out later
      if (!project.createdAt) return null;

      // Return the project with the valid date
      return {
        ...project,
        date: new Date(project.createdAt),
      };
    })
    // Filter out the nulls so we are left with only projects that have valid dates
    .filter((p): p is typeof p & { date: Date } => p !== null)
    // Now take the top 8
    .slice(0, 8);
  const allServices: StrapiResponse<ServicePage> = await fetchStrapi(
    "service-pages",
    { populate: "*" },
  );
  const services = allServices.data;
  // Inside ServicePagePage component
  const breadcrumbSegments = [
    { label: "Home", path: "/" },
    // { label: "Services", path: "/services" },
    {
      label: service.service_hub?.title || "Category",
      path: `/services/${pillar}`,
    },
    { label: service.title, path: `/services/${pillar}/${slug}` },
  ];
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(combinedJsonLd) }}
      />
      <main>
        <div className="mx-auto max-w-7xl">
          <div className="mx-4 md:mx-0">
            <Breadcrumbs className="my-4" segments={breadcrumbSegments} />
            {/* Inject Schema as a Script Tag */}
            <Hero
              header={data.data[0].title}
              heroImage={heroImageUrl}
              video={false}
              subheader={service.h2_subheadning}
            />
            {/* <pre>{JSON.stringify(combinedJsonLd, null, 2)}</pre> */}
          </div>
        </div>
        <section className="bg-primary/10 py-16 mt-8 md:mt-16">
          <LogoTicker />
        </section>
        <section className="mx-auto max-w-7xl mt-16 md:mt-32">
          <WhyUs />
        </section>
        <section className="mx-auto max-w-7xl">
          <SectionWrapper>
            <Testimonials />
          </SectionWrapper>
        </section>
        <section>
          <Team />
        </section>
        {latestProjects.length && (
          <section>
            <LatestProjectsService
              projects={latestProjects || []}
              service={service}
            />
          </section>
        )}
        <section className="py-16 md:py-32 mx-4">
          <CTA />
        </section>
        {service.faq.length && (
          <SectionWrapper>
            <FAQ items={service.faq} serviceName={service.title} />
          </SectionWrapper>
        )}
        <section className="py-16 md:py-32 mx-auto max-w-5xl px-4 md:px-0">
          <RichTextRenderer content={service.seo_text} />
        </section>
        <SectionWrapper>
          <div className="max-w-7xl px-4 mx-auto">
            <h2 className="heading-h2 text-primary-800">Related services</h2>
            <ServiceServiceLinks
              allServices={services}
              currentSlug={service.slug}
              limit={8}
            />
          </div>
        </SectionWrapper>
        <section className="mx-auto max-w-5xl my-16">
          <CTA className="mx-4" />
        </section>
        <section className="py-16 md:py-32">
          <VideoReviews />
        </section>
      </main>
    </>
  );
}
