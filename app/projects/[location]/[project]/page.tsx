import { fetchStrapi } from "@/lib/strapi";
import { Project, StrapiResponse } from "@/types";
import { generateProjectPageSeo } from "@/data/meta-data/meta-project";
import Image from "next/image";
import { GalleryGrid } from "@/components/GalleryGrid";
import { ProjectImage } from "@/components/ProjectImage";
import { ProjectVideo } from "@/components/ProjectVideo";
import { VideoComponent } from "@/components/oldComponents/VideoComponent";
import GoogleMap from "@/components/GoogleMap";
// import MarkdownRenderer from "@/components/MarkdownRenderer"; // Ensure this points to your renderer

// 1. Updated getQuery to filter by BOTH slug and location
const getQuery = (slug: string) => ({
  filters: {
    slug: { $eq: slug },
  },
  populate: {
    media_gallery: true,
    video: true,
    location_page: {
      // 1. Populate the location_page relation
      populate: {
        // 2. Populate the nested map component inside it
        map_component: {
          // 3. Include specific fields if needed, or true for all
          populate: "*",
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

  return (
    <>
      {/* Inject the full JSON-LD Graph */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="container mx-auto py-10 px-4">
        {/* <section>
          <pre>{JSON.stringify(jsonLd, null, 2)}</pre>
        </section> */}
        <article className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">{projectInstance.title}</h1>

          {/* Render Project Images */}
          <GalleryGrid>
            {projectInstance.media_gallery.map((img) => (
              <ProjectImage
                key={img.url}
                src={img.url}
                alt={img.alternativeText || projectInstance.title}
                width={img.width}
                height={img.height}
              />
            ))}
          </GalleryGrid>
          <GalleryGrid>
            {projectInstance.video?.map((vid) => {
              console.log(vid.mime);
              return (
                <ProjectVideo
                  key={vid.url}
                  url={vid.url}
                  type={vid.mime}
                  // title={projectInstance.title}
                />
              );
            })}
          </GalleryGrid>

          {/* Render Markdown SEO Text */}
          <div className="prose lg:prose-xl max-w-none">
            Markdown
            {/* <MarkdownRenderer content={project.seo_text} /> */}
          </div>
          <GoogleMap
            lat={projectInstance.location_page?.map_component.latitude}
            lng={projectInstance.location_page?.map_component.longitude}
            zoom={projectInstance.location_page?.map_component.zoom}
          />
        </article>
      </main>
    </>
  );
}
