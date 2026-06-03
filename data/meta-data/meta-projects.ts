import { Project } from "@/types";
import { BUSINESS_CONFIG } from "@/data/business-config";
import { Metadata } from "next";

export function generateProjectsListSeo(baseUrl: string, projects: Project[]) {
  const canonical = baseUrl;

  // Define the primary image for OG/Twitter (using the first project's media)
  const primaryImageUrl =
    projects.length > 0 && projects[0].media_gallery?.[0]?.url
      ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${projects[0].media_gallery[0].url}`
      : `${process.env.NEXT_PUBLIC_COPMPANY_WEBSITE}/og-image.png`;

  const metadata: Metadata = {
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_COMPANY_WEBSITE || "https://angarasteamers.com",
    ),
    title: `Upholstery Cleaning Projects & Case Studies | ${BUSINESS_CONFIG.business_name}`,
    description: `Browse our professional upholstery, sofa, and carpet cleaning project results across Los Angeles. See how Angara Steamers restores luxury furniture and removes deep-set stains.`,
    alternates: { canonical },
    openGraph: {
      type: "website",
      url: canonical,
      title: `Upholstery Cleaning Projects & Case Studies | ${BUSINESS_CONFIG.business_name}`,
      description: `View our latest sofa and upholstery restoration projects across Los Angeles. See real results from our high-heat truck-mounted extraction service.`,
      siteName: BUSINESS_CONFIG.business_name,
      images: [
        {
          url: primaryImageUrl,
          width: 1200,
          height: 630,
          alt: `Professional upholstery cleaning projects by ${BUSINESS_CONFIG.business_name}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `Upholstery Cleaning Projects | ${BUSINESS_CONFIG.business_name}`,
      description: `Browse our professional upholstery cleaning case studies in Los Angeles.`,
      images: [primaryImageUrl],
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
          "A comprehensive portfolio of professional sofa and upholstery steam cleaning case studies.",
        url: canonical,
        publisher: {
          "@id": `${process.env.NEXT_PUBLIC_COMPANY_WEBSITE}/#organization`,
        },
      },
      {
        "@type": "ItemList",
        itemListElement: projects.map((project, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: project.title,
          url: `${process.env.NEXT_PUBLIC_COMPANY_WEBSITE}/projects/${project.slug}`,
          image: project.media_gallery?.[0]?.url
            ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${project.media_gallery[0].url}`
            : undefined,
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: process.env.NEXT_PUBLIC_COMPANY_WEBSITE,
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
