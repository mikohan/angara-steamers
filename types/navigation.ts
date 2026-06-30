export interface BreadcrumbItem {
  path: string;
  label: string;
}

export interface BreadcrumbsProps {
  className?: string;
  segments: BreadcrumbItem[];
}
