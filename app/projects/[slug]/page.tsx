import { fetchStrapi } from "@/lib/strapi";
import { Project, StrapiResponse } from "@/types";
import { generateProjectPageSeo } from "@/data/meta-data/meta-project";
import Image from "next/image";
// import MarkdownRenderer from "@/components/MarkdownRenderer"; // Ensure this points to your renderer

const getQuery = (slug: string) => ({
  filters: {
    slug: {
      $eq: slug,
    },
  },
  populate: ["media_gallery", "video"],
});
// 1. Generate Metadata and Schema
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Fetch only necessary data for SEO
  const response: StrapiResponse<Project> = await fetchStrapi(
    "projects",
    getQuery(slug),
  );

  const baseUrl = `${process.env.NEXT_PUBLIC_COMPANY_WEBSITE}/projects/${slug}`;
  const { metadata } = generateProjectPageSeo(response, baseUrl);

  return metadata;
}

// 2. Main Page Component
export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Fetch full project data

  const response: StrapiResponse<Project> = await fetchStrapi(
    "projects",
    getQuery(slug),
  );

  const project = response.data[0];
  const baseUrl = `${process.env.NEXT_PUBLIC_COMPANY_WEBSITE}/projects/${slug}`;

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
        <section>
          <pre>{JSON.stringify(jsonLd, null, 2)}</pre>
        </section>
        <article className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">{project.title}</h1>

          {/* Render Project Images */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
            {project.media_gallery.map((img) => (
              <Image
                width={img.width}
                height={img.height}
                key={img.url}
                src={process.env.NEXT_PUBLIC_STRAPI_URL + img.url}
                alt={img.alternativeText || project.title}
                className="rounded-lg shadow-md w-full h-auto"
                loading="eager"
              />
            ))}
          </div>

          {/* Render Markdown SEO Text */}
          <div className="prose lg:prose-xl max-w-none">
            Markdown
            {/* <MarkdownRenderer content={project.seo_text} /> */}
          </div>
        </article>
      </main>
    </>
  );
}
