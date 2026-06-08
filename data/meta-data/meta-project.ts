import { Project, StrapiMedia, StrapiResponse } from "@/types";
import { BUSINESS_CONFIG } from "@/data/business-config";
import { Metadata } from "next";

export function generateProjectPageSeo(
  response: StrapiResponse<Project>,
  baseUrl: string,
) {
  const data = response.data[0];
  const canonical = baseUrl;
  const loc = data.location_page;

  // 1. Full Metadata Configuration
  const metadata: Metadata = {
    title: data.meta_title,
    description: data.meta_description,
    alternates: { canonical },
    openGraph: {
      type: "article",
      url: canonical,
      title: data.meta_title,
      description: data.meta_description,
      siteName: BUSINESS_CONFIG.business_name,
      images: data.media_gallery.map((img) => ({
        url:
          process.env.NEXT_PUBLIC_STRAPI_URL +
          (img.formats?.medium?.url || img.url),
        width: 1200,
        height: 630,
        alt: img.alternativeText || data.title,
      })),
    },
  };

  // 2. Comprehensive JSON-LD Graph
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${process.env.NEXT_PUBLIC_COMPANY_WEBSITE}/#organization`,
        name: BUSINESS_CONFIG.business_name,
        url: process.env.NEXT_PUBLIC_COMPANY_WEBSITE,
        logo: `${process.env.NEXT_PUBLIC_COMPANY_WEBSITE}/logo.png`,
        sameAs: BUSINESS_CONFIG.same_as,
        founder: { "@type": "Person", name: BUSINESS_CONFIG.founder },
        contactPoint: {
          "@type": "ContactPoint",
          telephone: BUSINESS_CONFIG.phone,
          email: BUSINESS_CONFIG.email,
          contactType: "customer service",
          areaServed: "US",
          availableLanguage: "English",
        },
      },
      {
        "@type": "ProfessionalService",
        "@id": `${process.env.NEXT_PUBLIC_COMPANY_WEBSITE}/#business`,
        name: BUSINESS_CONFIG.business_name,
        provider: {
          "@id": `${process.env.NEXT_PUBLIC_COMPANY_WEBSITE}/#organization`,
        },
        priceRange: "$$",
        knowsAbout: BUSINESS_CONFIG.knowsAbout,
        openingHoursSpecification: BUSINESS_CONFIG.opening_hours,
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: BUSINESS_CONFIG.rating,
          reviewCount: BUSINESS_CONFIG.review_count,
        },
        // Dynamically inject location/geo data if it exists
        ...(loc && {
          areaServed: { "@type": "City", name: loc.city_name },
          location: {
            "@type": "PostalAddress",
            addressLocality: loc.city_name,
            addressRegion: "CA",
            addressCountry: "US",
          },
          ...(loc.map_component.latitude &&
            loc.map_component.longitude && {
              geo: {
                "@type": "GeoCoordinates",
                latitude: loc.map_component.latitude,
                longitude: loc.map_component.longitude,
              },
            }),
        }),
      },
      {
        "@type": "TechArticle",
        "@id": `${canonical}#article`,
        headline: data.meta_title,
        description: data.meta_description,
        datePublished: data.completion_date,
        image: data.media_gallery.map(
          (img: StrapiMedia) =>
            `${process.env.NEXT_PUBLIC_STRAPI_URL}${img.formats?.small?.url || img.url}`,
        ),
        author: {
          "@id": `${process.env.NEXT_PUBLIC_COMPANY_WEBSITE}/#organization`,
        },
        publisher: {
          "@id": `${process.env.NEXT_PUBLIC_COMPANY_WEBSITE}/#organization`,
        },
        mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
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
            item: `${process.env.NEXT_PUBLIC_COMPANY_WEBSITE}/projects`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: data.title,
            item: canonical,
          },
        ],
      },
    ],
  };

  return { metadata, jsonLd };
}
