import { ServiceHub, ServicePage, StrapiResponse } from "@/types";
import { BUSINESS_CONFIG } from "@/data/business-config";

export function generateHubSeo(
  hub: StrapiResponse<ServiceHub>,
  baseUrl: string,
) {
  // 1. Defensively check for data to prevent "Cannot read properties of undefined"
  if (!hub?.data || hub.data.length === 0) {
    return {
      metadata: { title: "Service | Angara Steamers" },
      jsonLd: [],
    };
  }

  const root = hub.data[0];
  const siteName = BUSINESS_CONFIG.siteName;

  // 2. Comprehensive SEO Metadata with Fallbacks
  // Using optional chaining (?.) and logical OR (||) ensures no crashes
  const metadata = {
    title:
      root?.meta_title ||
      `${root?.title || "Our Services"} | ${BUSINESS_CONFIG.business_name}`,
    description:
      root?.meta_description ||
      `Looking for ${root?.title || "professional"} services in Los Angeles? ${BUSINESS_CONFIG.business_name} offers professional, eco-friendly, and deep cleaning solutions. Call us for a quote.`,
    keywords: `${root?.title || ""}, ${root?.title || ""} cleaning Los Angeles, professional upholstery cleaning, ${BUSINESS_CONFIG.knowsAbout?.join(", ") || ""}, Angara Steamers`,
    alternates: { canonical: baseUrl },
    openGraph: {
      title:
        root?.meta_title ||
        `${root?.title || "Our Services"} | ${BUSINESS_CONFIG.business_name}`,
      description: root?.meta_description || BUSINESS_CONFIG.slogan,
      url: baseUrl,
      siteName: siteName,
      type: "website",
      images: [
        {
          url:
            root?.og_image?.url ||
            `${process.env.NEXT_PUBLIC_SITE_URL}/og-services.jpg`,
          width: 1200,
          height: 630,
          alt: `${root?.title || "Service"} cleaning by ${BUSINESS_CONFIG.business_name}`,
        },
      ],
    },
  };

  // 3. High-Density JSON-LD with Safe Iteration
  const jsonLd = [
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
        {
          "@type": "ListItem",
          position: 2,
          name: "Services",
          item: `${process.env.NEXT_PUBLIC_COMPANY_WEBSITE}/service`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: root?.title || "Service",
          item: baseUrl,
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: root?.title || "Our Services",
      description: root?.meta_description || "",
      url: baseUrl,
      isPartOf: {
        "@type": "WebSite",
        name: siteName,
        url: process.env.NEXT_PUBLIC_COMPANY_WEBSITE,
      },
      mainEntity: {
        "@type": "ItemList",
        itemListElement: (root?.service_pages || []).map(
          (service: ServicePage, index: number) => ({
            "@type": "ListItem",
            position: index + 1,
            name: service?.title || "Service",
            url: `${process.env.NEXT_PUBLIC_COMPANY_WEBSITE}/service/${root?.slug}/${service?.slug}`,
            description:
              service?.meta_description ||
              `Professional ${service?.title || ""} cleaning services.`,
          }),
        ),
      },
      provider: {
        "@type": "ProfessionalService",
        "@id": `${process.env.NEXT_PUBLIC_COMPANY_WEBSITE}/#organization`,
        name: BUSINESS_CONFIG.business_name,
        image: `${process.env.NEXT_PUBLIC_COMPANY_WEBSITE}/logo.png`,
        telephone: BUSINESS_CONFIG.phone,
        email: BUSINESS_CONFIG.email,
        priceRange: BUSINESS_CONFIG.priceRange || "$$",
        areaServed: { "@type": "City", name: "Los Angeles" },
        address: {
          "@type": "PostalAddress",
          addressLocality: "Los Angeles",
          addressRegion: "CA",
          addressCountry: "US",
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: BUSINESS_CONFIG.rating,
          reviewCount: BUSINESS_CONFIG.review_count,
        },
        sameAs: BUSINESS_CONFIG.same_as,
        knowsAbout: BUSINESS_CONFIG.knowsAbout,
      },
    },
  ];

  return { metadata, jsonLd };
}
