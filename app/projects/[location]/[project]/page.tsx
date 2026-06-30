import { fetchStrapi } from "@/lib/strapi";
import { Project, StrapiResponse } from "@/types";
import { generateProjectPageSeo } from "@/data/meta-data/meta-project";
import { GalleryGrid } from "@/components/GalleryGrid";
import { ProjectImage } from "@/components/ProjectImage";
import { ProjectVideo } from "@/components/ProjectVideo";
import GoogleMap from "@/components/GoogleMap";
import { RichTextRenderer } from "@/components/common/RichTextRenderer";
import { formatDate } from "@/lib/utils";
import { CTA } from "@/components/CTA";
import { LogoTicker } from "@/components/LogoTicker";
import DefaultServiceImage from "@/public/images/og_image.webp";

import { LinkService } from "@/components/LinkService";
import { WaveDivider } from "@/components/common/WaveDivider";
import { Breadcrumbs } from "@/components/common/BreadCrumbs";

// 1. Updated getQuery to filter by BOTH slug and location
const getQuery = (slug: string) => ({
  filters: {
    slug: { $eq: slug },
  },
  populate: {
    media_gallery: true,
    video: true,
    service_page: {
      populate: "*", // Populates all fields inside the service_page component
    },
    location_page: {
      populate: {
        map_component: {
          populate: "*", // Works if map_component is a standard component
        },
        og_image: {
          populate: "*", // Necessary if og_image is a media field/object
        },
      },
    },
  },
});
// 2. Add your generateStaticParams here to enable SSG
export async function generateStaticParams() {
  const response = await fetchStrapi("/projects", {
    fields: ["slug"],
    populate: { location_page: { fields: ["slug"] } },
  });

  const params = (response.data as Project[]).map((project) => ({
    location: project.location_page?.slug || "general",
    project: project.slug,
  }));
  return params;
}
// 1. Generate Metadata and Schema
export async function generateMetadata({
  params,
}: {
  params: { project: string };
}) {
  const { project } = await params;

  // Fetch only necessary data for SEO
  const response: StrapiResponse<Project> = await fetchStrapi(
    "projects",
    getQuery(project),
  );

  const baseUrl = `${process.env.NEXT_PUBLIC_COMPANY_WEBSITE}/projects/${response.data[0].location_page?.slug}/${project}`;
  const { metadata } = generateProjectPageSeo(response, baseUrl);

  return metadata;
}

// 2. Main Page Component
export default async function ProjectPage({
  params,
}: {
  params: Promise<{ project: string }>;
}) {
  const { project } = await params;

  // Fetch full project data

  const response: StrapiResponse<Project> = await fetchStrapi(
    "projects",
    getQuery(project),
  );

  const projectInstance = response.data[0];
  const baseUrl = `${process.env.NEXT_PUBLIC_COMPANY_WEBSITE}/projects/${response.data[0].location_page?.slug}/${project}`;

  // Generate the full SEO object (Metadata + JSON-LD)
  const { jsonLd } = generateProjectPageSeo(response, baseUrl);
  const strapi =
    process.env.NEXT_PUBLIC_STRAPI_URL || "https://cms.angaracleaning.com";
  const serviceImageUrl =
    strapi + projectInstance.service_page?.hero_image.formats?.small.url ||
    DefaultServiceImage;
  const locationImageUrl =
    strapi + projectInstance.location_page?.og_image.url || DefaultServiceImage;
  const removeBread = projectInstance.location_page?.slug || "pillar";
  return (
    <>
      {/* Inject the full JSON-LD Graph */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="py-10">
        {/* <section>
          <pre>{JSON.stringify(jsonLd, null, 2)}</pre>
        </section> */}

        <article className="px-4 mx-auto max-w-7xl">
          {/* <Breadcrumbs className="my-4" removeSegments={[removeBread]} /> */}
          <div>
            <div className="flex justify-between text-muted mb-12">
              <div>
                <span className="hidden md:block">Comletition date:</span>
                <span className="font-semibold text-foreground">
                  {" "}
                  {formatDate(projectInstance.completion_date)}
                </span>
              </div>
              <div>
                <span className="hidden md:block">Location: </span>
                <span className="font-semibold text-foreground">
                  {projectInstance.location_page?.city_name}
                </span>
              </div>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-6">
              {projectInstance.title}
            </h1>
          </div>
          <div>
            {/* Render Project Images */}
            <h3 className="text-2xl font-semibold text-muted">
              Images gallery {projectInstance.title}
            </h3>
            <GalleryGrid>
              {projectInstance.media_gallery.map((img) => (
                <ProjectImage
                  key={img.url}
                  src={img.url}
                  alt={img.alternativeText || projectInstance.title}
                  width={img.width}
                  height={img.height}
                  caption={
                    img.caption
                      ? img.caption
                      : img.alternativeText
                        ? img.alternativeText
                        : projectInstance.title
                  }
                />
              ))}
            </GalleryGrid>
            <GalleryGrid>
              {projectInstance.video?.map((vid) => {
                return (
                  <ProjectVideo
                    key={vid.url}
                    url={vid.url}
                    type={vid.mime}
                    caption={vid.caption}
                  />
                );
              })}
            </GalleryGrid>
          </div>
        </article>
        <section className="py-16 relative overflow-hidden">
          <div className="absolute h-12 border w-full top-1/3 bg-primary/20 blur-2xl"></div>
          <LogoTicker />
        </section>
        {/* Render Markdown SEO Text */}
        <section className="flex justify-center mx-auto max-w-5xl mt-16 px-8 md:px-4 ">
          <RichTextRenderer content={projectInstance.seo_text} />
        </section>
        <section className="max-w-5xl mx-auto px-8 md:px-4">
          <div className="mx-auto grid md:grid-cols-2 gap-6 my-32">
            <LinkService
              href={`/services/${projectInstance.service_page?.service_hub?.slug}/${projectInstance.service_page?.slug}`}
              imageSrc={serviceImageUrl}
              title={`${projectInstance.service_page?.title}`}
              label={`Learn more about our ${projectInstance.service_page?.title}`}
              imageAlt={projectInstance.service_page?.meta_description || ""}
            />
            <LinkService
              href={`/locations/${projectInstance.location_page?.slug}`}
              title={projectInstance.location_page?.city_name}
              label={`Services in ${projectInstance.location_page?.city_name}`}
              imageSrc={locationImageUrl}
              imageAlt={projectInstance.location_page?.meta_description || ""}
            />
          </div>
        </section>
        <section className="py-4 md:py-24 px-8 md:px-16">
          <GoogleMap
            lat={projectInstance.location_page?.map_component.latitude}
            lng={projectInstance.location_page?.map_component.longitude}
            zoom={projectInstance.location_page?.map_component.zoom}
            labelText={projectInstance.title}
          />
        </section>
        <section className="mt-16 relative pt-32 pb-32">
          <div className="absolute top-0 left-0 -z-10 h-[30%] w-full bg-linear-180 from-primary/10 to-background"></div>
          <WaveDivider position="top" fill="var(--color-background)" />
          <CTA />
        </section>
      </main>
    </>
  );
}
