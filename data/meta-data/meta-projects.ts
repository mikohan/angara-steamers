import { Project } from "@/types";
import { BUSINESS_CONFIG } from "@/data/business-config";
import { Metadata } from "next";
import { firstImage } from "@/lib/utils";

export function generateProjectsListSeo(baseUrl: string, projects: Project[]) {
  const canonical = baseUrl;
  const companyWebsite =
    process.env.NEXT_PUBLIC_COMPANY_WEBSITE || "https://angarasteamers.com";

  // Define primary image
  const firstProjectImage =
    projects.length > 0 ? firstImage(projects[0].media_gallery) : undefined;
  const primaryImageUrl = firstProjectImage?.url
    ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${firstProjectImage.url}`
    : `${companyWebsite}/og-image.png`;

  const metadata: Metadata = {
    metadataBase: new URL(companyWebsite),
    title: `Upholstery Cleaning Projects & Case Studies | ${BUSINESS_CONFIG.business_name}`,
    description: `Browse our professional upholstery, sofa, and carpet cleaning project results across Los Angeles. See how Angara Steamers restores luxury furniture.`,
    alternates: { canonical },
    openGraph: {
      type: "website",
      url: canonical,
      title: `Upholstery Cleaning Projects | ${BUSINESS_CONFIG.business_name}`,
      description: `View our latest sofa and upholstery restoration projects.`,
      siteName: BUSINESS_CONFIG.business_name,
      images: [
        {
          url: primaryImageUrl,
          width: 1200,
          height: 630,
          alt: "Cleaning projects",
        },
      ],
    },
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${canonical}#collection`,
        name: "Angara Steamers Cleaning Projects",
        description:
          "Portfolio of professional sofa and upholstery steam cleaning case studies.",
        url: canonical,
        publisher: { "@id": `${companyWebsite}/#organization` },
      },
      {
        "@type": "ItemList",
        "@id": `${canonical}#list`,
        mainEntityOfPage: { "@id": `${canonical}#collection` },
        itemListElement: projects.map((project, index) => {
          // Construct the correct path: /projects/[location]/[project]
          const locSlug = project.location_page?.slug || "general";
          const projectUrl = `${companyWebsite}/projects/${locSlug}/${project.slug}`;

          return {
            "@type": "ListItem",
            position: index + 1,
            name: project.title,
            url: projectUrl,
            image: firstImage(project.media_gallery)?.url
              ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${firstImage(project.media_gallery)!.url}`
              : undefined,
          };
        }),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: companyWebsite,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Projects",
            item: canonical,
          },
        ],
      },
    ],
  };

  return { metadata, jsonLd };
}
