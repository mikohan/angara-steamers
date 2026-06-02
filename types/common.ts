// Define a specific interface for your pagination or metadata
import { StrapiRegion } from "@/types";

export interface StrapiMeta {
  pagination?: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
}
export interface StrapiTextNode {
  type: string;
  text?: string;
  children?: StrapiTextNode[];
  [key: string]: unknown;
}

export type RichTextValue =
  | string
  | StrapiTextNode
  | StrapiTextNode[]
  | null
  | undefined;

// Use 'unknown' instead of 'any' for the wrapper
export interface StrapiResponse<T> {
  data: T[];
  meta?: StrapiMeta;
  error?: {
    status: number;
    name: string;
    message: string;
  };
}
export interface StrapiMedia {
  id: number;
  url: string;
  mime: string;
  size: number;
  width?: number;
  height?: number;
  alternativeText?: string | null;
  caption?: string | null;
  formats?: Record<string, unknown>;
}
export interface StrapiBase {
  id: number;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string | null;
}

export interface ServiceFaq {
  id?: number; // Strapi assigns IDs to components when repeatable
  question: string;
  answer: string;
}

export interface MapConfig {
  id?: number;
  latitude: number;
  longitude: number;
  zoom: number;
}

export interface SeoPageData {
  business_name: string;
  city_name: string;
  region: StrapiRegion;
  slogan: string;
  founding_date: string;
  founding_location: string;
  founder: string;
  knows_about: string[];
  meta_title: string;
  meta_description: string;
  slug: string;
  canonical_url?: string;
  description_markdown: string;
  phone: string;
  email: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  opening_hours: { day: string; open: string; close: string }[];
  area_served: string[];
  same_as: string[];
  certifications: string[];
  awards: string[];
  reviews: { author: string; rating: number; reviewBody: string }[];
  logo_url: string;
  faq: { question: string; answer: string }[];
}
