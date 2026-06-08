import { ServiceHub } from "./service-hub";

export interface NavItem extends ServiceHub {
  title: string;
  slug: string;
}

export interface NavbarProps {
  navItems: ServiceHub[] | NavItem[];
  staticItems: ServiceHub[] | NavItem[];
  isUpholstery?: boolean;
  isLocations?: boolean;
  isCarpet?: boolean;
  currentHubSlug?: string;
}
