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

export async function generateStaticParams() {
  const services: StrapiResponse<ServicePage> = await fetchStrapi(
    "service-pages",
    {
      populate: ["service_hub"],
    },
  );

  return services.data
    .filter((service) => service.service_hub?.slug)
    .map((service) => ({
      pillar: service.service_hub!.slug,
      slug: service.slug,
    }));
}

const getQuery = (slug: string) => ({
  filters: { slug: { $eq: slug } },
  populate: {
    hero_image: true,
    og_image: true,
    faq: true,
    service_hub: true,
    projects: { populate: ["location_page", "media_gallery"] },
  },
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ pillar: string; slug: string }>;
}) {
  const { pillar, slug } = await params;
  if (pillar === "projects") return {};

  const response: StrapiResponse<ServicePage> = await fetchStrapi(
    "service-pages",
    getQuery(slug),
  );

  if (!response?.data?.[0]) return { title: "Page Not Found" };

  const service = response.data[0];

  // Canonical Guard: Only generate metadata if the URL pillar matches the DB pillar
  if (service.service_hub?.slug !== pillar) return { title: "Page Not Found" };

  const { metadata } = generateServicePageSeo(
    response,
    `${process.env.NEXT_PUBLIC_COMPANY_WEBSITE}/services/${pillar}/${slug}`,
  );

  return metadata;
}

export default async function ServicePagePage({
  params,
}: {
  params: Promise<{ pillar: string; slug: string }>;
}) {
  const { pillar, slug } = await params;
  const data: StrapiResponse<ServicePage> = await fetchStrapi(
    "service-pages",
    getQuery(slug),
  );

  if (!data?.data?.length) notFound();

  const service = data.data[0];

  // Logic Guard: Force 404 if the pillar in the URL is incorrect
  if (service.service_hub?.slug !== pillar) notFound();

  const statesData: StrapiResponse<State> = await fetchStrapi("states");
  const { combinedJsonLd } = generateServicePageSeo(
    data,
    `${process.env.NEXT_PUBLIC_COMPANY_WEBSITE}/services/${pillar}/${slug}`,
    statesData,
  );

  const heroImageUrl = service.hero_image
    ? process.env.NEXT_PUBLIC_STRAPI_URL + service.hero_image.url
    : "";
  const projects = service.projects || [];

  const latestProjects = projects
    .filter((p): p is typeof p & { createdAt: string } => !!p.createdAt)
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .map((p) => ({ ...p, date: new Date(p.createdAt) }))
    .slice(0, 8);

  const allServices: StrapiResponse<ServicePage> = await fetchStrapi(
    "service-pages",
    { populate: "*" },
  );
  const services = allServices.data;

  const breadcrumbSegments = [
    { label: "Home", path: "/" },
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
            <Hero
              header={service.title}
              heroImage={heroImageUrl}
              video={false}
              subheader={service.h2_subheadning}
            />
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
        {latestProjects.length > 0 && (
          <section>
            <LatestProjectsService
              projects={latestProjects}
              service={service}
            />
          </section>
        )}
        <section className="py-16 md:py-32 mx-4">
          <CTA />
        </section>
        {service.faq?.length > 0 && (
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
