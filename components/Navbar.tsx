import { fetchStrapi } from "@/lib/strapi";
import { ServiceHub, StrapiResponse } from "@/types";
import { NavbarClient } from "./NavbarClient";

export async function Navbar() {
  // Fetch data during build time (Static)
  const navData: StrapiResponse<ServiceHub> = await fetchStrapi("service-hubs");

  return <NavbarClient navData={navData.data} />;
}
