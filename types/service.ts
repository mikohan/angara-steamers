import type { StrapiBase, StrapiMedia, ServiceFaq } from "./common";
import type { ServiceHub } from "./service-hub";

// ===============================
// ServicePage (collection type)
// ===============================

export interface ServicePage extends StrapiBase {
  title: string;
  slug: string;

  meta_title: string;
  meta_description: string;

  h1_heading: string;
  h2_subheadning: string;

  hero_image: StrapiMedia; // required single image
  video?: StrapiMedia | null; // optional single video

  faqs: ServiceFaq[]; // repeatable component

  seo_text: string; // richtext → string

  order: number;

  og_image: StrapiMedia; // required single image

  service_hub?: ServiceHub | null; // many-to-one
}
