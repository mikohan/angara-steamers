export interface NavItem {
  title: string;
  slug: string;
}

export interface NavbarProps {
  navItems: NavItem[];
  isUpholstery: boolean;
  isLocations: boolean;
}
