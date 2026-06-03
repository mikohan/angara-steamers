import { LocationPage, StrapiResponse } from "../../types/index";
import { Metadata } from "next";
import { BUSINESS_CONFIG } from "@/data/business-config";
import OG_IMAGE from "@/public/images/og_image.jpg";

/**
 * SEO Generator for Locations Listing Page
 * Includes CollectionPage, ItemList, Organization, and BreadcrumbList schemas.
 */
export function generateLocationsListSeo(
  response: StrapiResponse<LocationPage>,
  baseUrl: string,
) {
  const locations = response.data;
  const canonical = baseUrl;

  // 1. Next.js Metadata
  const metadata: Metadata = {
    title: "Our Service Areas | " + BUSINESS_CONFIG.business_name,
    description:
      "Explore our professional upholstery and carpet cleaning service locations across Los Angeles and surrounding regions. We provide expert care for your home furniture.",
    alternates: { canonical },
    openGraph: {
      type: "website",
      url: canonical,
      title: "Our Service Areas | " + BUSINESS_CONFIG.business_name,
      description:
        "Explore our professional upholstery and carpet cleaning service locations.",
      siteName: BUSINESS_CONFIG.business_name,
      images: [
        {
          url: OG_IMAGE.src,
          width: 1200,
          height: 630,
          alt: "Angara Steamers Service Areas",
        },
      ],
    },
  };

  // 2. CollectionPage + ItemList Schema
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Angara Steamers Service Locations",
    description:
      "List of professional upholstery cleaning service areas in Los Angeles.",
    url: canonical,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: locations.map((loc: LocationPage, index: number) => ({
        "@type": "ListItem",
        position: index + 1,
        name: loc.city_name,
        url: `${process.env.NEXT_PUBLIC_COMPANY_WEBSITE}/locations/${loc.slug}`,
      })),
    },
  };

  // 3. BreadcrumbList Schema
  const breadcrumbSchema = {
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
        name: "Service Areas",
        item: canonical,
      },
    ],
  };

  // 4. Organization Schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: BUSINESS_CONFIG.business_name,
    url: process.env.NEXT_PUBLIC_COMPANY_WEBSITE,
    logo: process.env.NEXT_PUBLIC_STRAPI_URL + "/uploads/logo.png",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: BUSINESS_CONFIG.phone,
      contactType: "customer service",
      areaServed: "US",
      availableLanguage: "en",
    },
    sameAs: BUSINESS_CONFIG.same_as,
  };

  return {
    metadata,
    jsonLd: [collectionSchema, breadcrumbSchema, organizationSchema],
  };
}
