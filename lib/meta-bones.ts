import { LocationPage, StrapiResponse } from "./../types/index";
import { RichTextValue } from "@/types/common";
import { Metadata } from "next";
import { formatPhoneForSchema } from "./dataCleaner";
import OG_IMAGE from "@/public/images/og_image.jpg";

// -------------------------------------
// CONFIGURATION
// -------------------------------------
export const BUSINESS_CONFIG = {
  business_name: process.env.NEXT_PUBLIC_COMPANY_NAME || "Angara Steamers",
  slogan: "Premium Carpet, Couch & Upholstery Cleaning",
  siteName: "Angara Steamers The best Carpet & Upholstery Cleaners",
  founder: "Vladimir Vostrikov",
  founding_date: "2022-4-07",
  founding_location: "Los Angeles, CA",
  phone:
    formatPhoneForSchema(process.env.NEXT_PUBLIC_COMPANY_PHONE || "") ||
    "(213)-598-7763",
  email: process.env.NEXT_PUBLIC_COMPANY_EMAIL || "hello@angaracleaning.com",
  same_as: [
    process.env.NEXT_PUBLIC_COMPANY_IG ||
      "https://www.instagram.com/angara_steamers",
    process.env.NEXT_PUBLIC_COMPANY_FB ||
      "https://www.facebook.com/angara_steamers",
    process.env.NEXT_PUBLIC_COMPANY_GMB ||
      "https://share.google/t8Hz0LTlyNlNw1pqO",
  ],
  opening_hours: [
    { dayOfWeek: "Tuesday", opens: "08:00", closes: "20:00" },
    { dayOfWeek: "Wednesday", opens: "08:00", closes: "20:00" },
    { dayOfWeek: "Thursday", opens: "08:00", closes: "20:00" },
    { dayOfWeek: "Friday", opens: "08:00", closes: "20:00" },
    { dayOfWeek: "Saturday", opens: "09:00", closes: "18:00" },
    { dayOfWeek: "Sunday", opens: "09:00", closes: "18:00" },
    { dayOfWeek: "Monday", opens: "08:00", closes: "20:00" },
  ],
  knowsAbout: [
    "Restoration of stained or worn upholstery",
    "Removal of pet odors and organic stains",
    "High-heat truck-mounted extraction",
    "Rapid-dry textile restoration",
    "Deep-fiber allergen and dust mite extraction",
    "Safe cleaning for luxury and performance fabrics",
    "Residential mattress sanitization",
    "Elimination of deep-set household allergens",
    "Professional fabric fiber maintenance",
    "Sanitization of heavily used home furniture",
  ],
  rating: "4.9",
  review_count: "597",
};

// -------------------------------------
// STRAPI INTERFACES
// -------------------------------------
// export interface StrapiResponse<T> {
//   data: T;
//   meta?: any;
//   error?: { status: number; name: string; message: string };
// }

// -------------------------------------
// SEO GENERATOR (Accepts StrapiResponse)
// -------------------------------------
export function generateWeaponsGradeSeo(
  response: StrapiResponse<LocationPage>,
  baseUrl: string,
) {
  const data = response.data[0];
  const canonical =
    baseUrl || `${process.env.NEXT_PUBLIC_COMPANY_WEBSITE}/${data.slug}`;

  // 1. Next.js Metadata
  const metadata: Metadata = {
    title: data.meta_title,
    description: data.meta_description,
    alternates: { canonical },
    openGraph: {
      type: "website",
      url: canonical,
      title: data.meta_title,
      description: data.meta_description,
      siteName: BUSINESS_CONFIG.business_name,
      images: data.og_image
        ? [
            {
              url:
                process.env.NEXT_PUBLIC_STRAPI_URL + data.og_image.url ||
                OG_IMAGE.src,
              width: data.og_image.width,
              height: data.og_image.height,
              alt: data.og_image.alternativeText || data.meta_title,
            },
          ]
        : [],
    },
  };

  // 2. JSON-LD
  const rootSchema = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "@id": `${canonical}#business`,
    name: BUSINESS_CONFIG.business_name,
    slogan: BUSINESS_CONFIG.slogan,
    image: process.env.NEXT_PUBLIC_STRAPI_URL + data.og_image.url,
    url: canonical,
    telephone: BUSINESS_CONFIG.phone,
    priceRange: "$$",
    knowsAbout: BUSINESS_CONFIG.knowsAbout ?? [],
    address: data.address
      ? {
          "@type": "PostalAddress",
          streetAddress: data.address.street,
          addressLocality: data.address.city,
          addressRegion: data.address.state,
          postalCode: data.address.zip,
          addressCountry: data.address.country,
        }
      : undefined,
    geo: data.map_component
      ? {
          "@type": "GeoCoordinates",
          latitude: data.map_component.latitude,
          longitude: data.map_component.longitude,
        }
      : undefined,
    openingHoursSpecification: BUSINESS_CONFIG.opening_hours.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.dayOfWeek,
      opens: h.opens,
      closes: h.closes,
    })),
    // Data from API (via populated relations)

    // Building the Schema dynamically
    areaServed: [
      data.city_name && { "@type": "City", name: data.city_name },
      data.region?.name && {
        "@type": "AdministrativeArea",
        name: data.region.name,
      },
      data.state?.name && { "@type": "State", name: data.state.name },
    ].filter(Boolean),
    sameAs: data.same_as ?? BUSINESS_CONFIG.same_as,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: BUSINESS_CONFIG.rating,
      reviewCount: BUSINESS_CONFIG.review_count,
      bestRating: 5,
      worstRating: 1,
    },
  };

  // 3. FAQ
  // Helper: flatten Strapi rich text into plain text
  const extractText = (value: RichTextValue): string => {
    if (!value) return "";
    if (typeof value === "string") return value;

    // Strapi rich text array
    if (Array.isArray(value)) {
      return value
        .map((block) => extractText(block.children || block.text || block))
        .join(" ")
        .trim();
    }

    // Rich text object
    if (typeof value === "object") {
      if (value.text) return value.text;
      if (value.children) return extractText(value.children);
    }

    return "";
  };

  // 3. FAQ
  const faqSchema =
    data.faq && data.faq.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: data.faq.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: extractText(f.answer),
            },
          })),
        }
      : null;

  return {
    metadata,
    jsonLd: [rootSchema, faqSchema],
  };
}
