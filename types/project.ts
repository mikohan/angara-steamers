import type { StrapiBase, StrapiMedia } from "./common";
import type { LocationPage } from "./location";
import { ServicePage } from "./service";

// ===============================
// Project (collection type)
// ===============================

export interface Project extends StrapiBase {
  title: string;
  slug: string;
  meta_title: string;
  meta_description: string;
  completion_date?: string;

  media_gallery: StrapiMedia[]; // multiple media
  video?: StrapiMedia[];

  location_page?: LocationPage | null; // many-to-one
  service_page?: ServicePage | null;
  seo_text: string;
}
