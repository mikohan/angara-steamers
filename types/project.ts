import type { StrapiBase, StrapiMedia } from "./common";
import type { LocationPage } from "./location";

// ===============================
// Project (collection type)
// ===============================

export interface Project extends StrapiBase {
  title: string;
  slug: string;
  meta_title: string;
  meta_description: string;
  completion_date?: string | null;

  media_gallery: StrapiMedia[]; // multiple media
  video?: StrapiMedia[];

  location_page?: LocationPage | null; // many-to-one
  seo_text: string;
}
