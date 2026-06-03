import { ServicePage, State, StrapiResponse } from "../../types/index";
import { BUSINESS_CONFIG } from "@/data/business-config";
import { Metadata } from "next";

export function generateServicePageSeo(
  response: StrapiResponse<ServicePage>,
  baseUrl: string,
  states?: StrapiResponse<State>,
) {
  const data = response.data[0];
  const canonical = baseUrl;
  const statesData = states
    ? states.data
    : [{ name: "California" }, { name: "Nevada" }];

  function generateSafeFaqSchema(faq: ServicePage["faq"]) {
    // 1. Safety Check: Ensure faqs exists and has at least one item
    // if (!faq || !Array.isArray(faq) || faq.length === 0) {
    //   return null;
    // }

    // 2. Map only if safe
    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faq.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: {
          "@type": "Answer",
          // Ensure text is a string (handles potential rich text objects)
          text:
            typeof f.answer === "string" ? f.answer : JSON.stringify(f.answer),
        },
      })),
    };
  }

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
      images: [
        {
          url: process.env.NEXT_PUBLIC_STRAPI_URL + data.og_image.url,
          width: 1200,
          height: 630,
          alt: data.og_image.alternativeText || data.title,
        },
      ],
    },
  };

  // 2. Schema Graph
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://www.angaracleaning.com/#organization",
        name: BUSINESS_CONFIG.business_name,
        url: process.env.NEXT_PUBLIC_COMPANY_WEBSITE,
        logo: process.env.NEXT_PUBLIC_STRAPI_URL + "/uploads/logo.png",
        sameAs: BUSINESS_CONFIG.same_as,
        founder: { "@type": "Person", name: BUSINESS_CONFIG.founder },
        contactPoint: {
          "@type": "ContactPoint",
          telephone: BUSINESS_CONFIG.phone,
          contactType: "customer service",
          areaServed: ["US"],
          availableLanguage: ["en"],
        },
      },
      {
        "@type": "ProfessionalService",
        "@id": process.env.NEXT_PUBLIC_COMPANY_WEBSITE + "#business",
        name: BUSINESS_CONFIG.business_name,
        provider: {
          "@id": process.env.NEXT_PUBLIC_COMPANY_WEBSITE + "#organization",
        },
        image: process.env.NEXT_PUBLIC_STRAPI_URL + data.hero_image.url,
        priceRange: "$$",
        description: data.meta_description,
        knowsAbout: BUSINESS_CONFIG.knowsAbout,
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: BUSINESS_CONFIG.rating,
          reviewCount: BUSINESS_CONFIG.review_count,
          bestRating: 5,
          worstRating: 1,
        },
        areaServed: statesData.map((state) => ({
          "@type": "State",
          name: state.name,
        })),
      },
      {
        "@type": "Service",
        "@id": process.env.NEXT_PUBLIC_COMPANY_WEBSITE + "#service",
        name: data.title,
        provider: {
          "@id": process.env.NEXT_PUBLIC_COMPANY_WEBSITE + "#business",
        },
        serviceType: data.title,
        description: data.meta_description,
        areaServed: { "@type": "State", name: "California" },
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
            name: "Services",
            item: `${process.env.NEXT_PUBLIC_COMPANY_WEBSITE}/services`,
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
  const faqSchema = generateSafeFaqSchema(data.faq);
  const combinedJsonLd = [jsonLd, faqSchema].filter(Boolean);
  return { metadata, combinedJsonLd };
}
