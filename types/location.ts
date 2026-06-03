import {
  StrapiBase,
  StrapiMedia,
  MapConfig,
  ServiceFaq,
  SeoPageData,
} from "./common";
import { Project } from "./project";
import { State } from "./state";

// ===============================
// Blocks (Strapi v5 "blocks" field)
// ===============================

export interface StrapiBlockNode {
  type: string;
  children?: StrapiBlockNode[];
  text?: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  code?: boolean;
  [key: string]: string | number | boolean | StrapiBlockNode[] | undefined;
}

export type StrapiBlock = StrapiBlockNode;

// ===============================
// MAIN CONTENT TYPE: LocationPage
// ===============================

export interface LocationPage extends StrapiBase, SeoPageData {
  city_name: string;
  slug: string;
  meta_title: string;
  meta_description: string;
  h1_heading: string;
  h2_subheadning: string;
  seo_text: StrapiBlock[];

  state?: State | null;
  region: StrapiRegion;
  location_faq: ServiceFaq[];

  projects: Project[];

  map_component: MapConfig;

  og_image: StrapiMedia;
}

// ===============================
// Strapi API Response Wrapper
// ===============================

// export interface StrapiResponse<T> {
//   data: T;
//   meta?: {
//     pagination?: {
//       page: number;
//       pageSize: number;
//       pageCount: number;
//       total: number;
//     };
//   };
// }
export interface StrapiRegion {
  id: number;
  slug: string;
  name: string;
}
