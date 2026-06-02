import { StrapiMedia, StrapiBase } from "./common";
import { ServicePage } from "./service";
// ===============================
// Minimal ServicePage reference
// (expand when you send schema)
// ===============================

// ===============================
// ServiceHub (collection type)
// ===============================

export interface ServiceHub extends StrapiBase {
  title: string;
  slug: string;

  h1_heading: string;
  h2_subheading: string;

  meta_title: string;
  meta_description: string;

  image?: StrapiMedia | null; // single image
  video?: StrapiMedia | null; // single video

  seo_text_markdown?: string | null; // richtext → string

  order?: number | null;

  og_image: StrapiMedia; // required single image

  service_pages: ServicePage[]; // one-to-many
}
