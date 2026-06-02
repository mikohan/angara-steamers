import type { StrapiBase } from "./common";
import type { LocationPage } from "./location";

// ===============================
// State (collection type)
// ===============================

export interface State extends StrapiBase {
  name: string;
  state_code: string;

  // one-to-one relation
  location_page?: LocationPage | null;
}
