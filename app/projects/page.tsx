import { fetchStrapi } from "@/lib/strapi";
import { Project, StrapiResponse } from "@/types";
import { generateProjectsListSeo } from "@/data/meta-data/meta-projects";
import Image from "next/image";
import { Breadcrumbs } from "@/components/common/BreadCrumbs";
import { LogoTicker } from "@/components/LogoTicker";
import { CTA } from "@/components/CTA";

export async function generateMetadata() {
  const baseUrl = `${process.env.NEXT_PUBLIC_COMPANY_WEBSITE}/projects`;
  // We use an empty array here as metadata doesn't strictly require the list
  const { metadata } = generateProjectsListSeo(baseUrl, []);
  return metadata;
}

export default async function ProjectsPage() {
  const getQuery = () => ({
    // populate: ["media_gallery", "video", "location_page"],
    populate: {
      location_page: {
        fields: ["slug"],
      },
      media_gallery: true,
      video: true,
    },
  });
  const baseUrl = `${process.env.NEXT_PUBLIC_COMPANY_WEBSITE}/projects`;
  const response: StrapiResponse<Project> = await fetchStrapi(
    "/projects",
    getQuery(),
  );
  const projects = response.data;

  const { jsonLd } = generateProjectsListSeo(baseUrl, projects);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main>
        <section className="container max-w-7xl mx-auto py-10 px-4">
          <Breadcrumbs className="my-4" />
          <header className="mb-12">
            <h1 className="text-5xl font-extrabold mb-6">
              Upholstery & Sofa Cleaning Projects
            </h1>
            <div className="max-w-3xl">
              <p>
                At Angara Steamers, we document our results to demonstrate the
                power of professional, high-heat truck-mounted steam extraction.
                From high-traffic sofas in Beverly Hills to pet-stained
                upholstery in Playa Vista, our case studies showcase the
                restoration of luxury fabrics using environmentally safe,
                biological enzyme treatments.
              </p>
            </div>
          </header>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
            {projects.map((project) => (
              <article
                key={project.slug}
                className="border flex flex-col gap-4 justify-between border-primary/10 shadow-2xl rounded-xl overflow-hidden hover:shadow-xl transition-shadow"
              >
                {project.media_gallery?.[0] && (
                  <Image
                    src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${project.media_gallery[0].url}`}
                    alt={
                      project.media_gallery[0].alternativeText || project.title
                    }
                    className="w-full h-64 object-cover"
                    height={project.media_gallery[0].height}
                    width={project.media_gallery[0].width}
                    loading="eager"
                  />
                )}
                <div className="p-6 flex flex-col gap-4 h-full justify-between">
                  <h2 className="text-2xl font-bold mb-2">{project.title}</h2>
                  <p className="text-muted mb-4">
                    {project.seo_text.substring(0, 100)}...
                  </p>
                  <a
                    href={`/projects/${project.location_page?.slug}/${project.slug}`}
                    className="text-primary font-semibold hover:underline"
                  >
                    View Case Study &rarr;
                  </a>
                </div>
              </article>
            ))}
          </div>
          {/* <section>
          <pre>{JSON.stringify(jsonLd, null, 2)}</pre>
        </section> */}
        </section>
        <section className="py-16">
          <LogoTicker />
        </section>
        <section className="my-16">
          <CTA />
        </section>
      </main>
    </>
  );
}
