import { ServicePage, StrapiResponse } from "@/types";
import { BUSINESS_CONFIG } from "@/data/business-config"; // Ensure your config path is correct

export function generateServicesListSeo(
  services: StrapiResponse<ServicePage>,
  baseUrl: string,
) {
  const data = services.data;
  const siteName = BUSINESS_CONFIG.siteName;

  const metadata = {
    title: `Expert Upholstery & Carpet Cleaning Services | ${BUSINESS_CONFIG.business_name}`,
    description: `Professional upholstery and carpet care in Los Angeles. ${BUSINESS_CONFIG.knowsAbout.slice(0, 3).join(", ")}. Book the ${BUSINESS_CONFIG.rating}-star rated team at Angara Steamers today.`,
    alternates: { canonical: baseUrl },
    openGraph: {
      title: `Our Cleaning Services | ${BUSINESS_CONFIG.business_name}`,
      description: BUSINESS_CONFIG.slogan,
      url: baseUrl,
      siteName: siteName,
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_SITE_URL}/og-services.jpg`,
          width: 1200,
          height: 630,
        },
      ],
      type: "website",
    },
  };

  // Structured Data: Combined Entity Graph
  const jsonLd = [
    // 1. Breadcrumbs for Google hierarchy
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: process.env.NEXT_PUBLIC_COMPANY_WEBSITE,
        },
        { "@type": "ListItem", position: 2, name: "Services", item: baseUrl },
      ],
    },
    // 2. CollectionPage with ItemList for Service Discovery
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Professional Upholstery & Textile Cleaning Catalog",
      description: `Comprehensive range of services: ${BUSINESS_CONFIG.knowsAbout.join(", ")}`,
      url: baseUrl,
      mainEntity: {
        "@type": "ItemList",
        itemListElement: data.map((service, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: service.title,
          url: `${baseUrl}/${service.slug}`,
          description:
            service.meta_description ||
            `Professional ${service.title} cleaning by ${BUSINESS_CONFIG.business_name}.`,
        })),
      },
      provider: {
        "@type": "ProfessionalService",
        name: BUSINESS_CONFIG.business_name,
        image: `${process.env.NEXT_PUBLIC_COMPANY_WEBSITE}/logo.png`,
        telephone: BUSINESS_CONFIG.phone,
        email: BUSINESS_CONFIG.email,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Los Angeles",
          addressRegion: "CA",
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: BUSINESS_CONFIG.rating,
          reviewCount: BUSINESS_CONFIG.review_count,
        },
        sameAs: BUSINESS_CONFIG.same_as,
      },
    },
  ];

  return { metadata, jsonLd };
}
