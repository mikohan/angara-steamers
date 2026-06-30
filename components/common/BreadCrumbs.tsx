import Link from "next/link";
import { BreadcrumbsProps } from "@/types";

export const Breadcrumbs = ({ segments, className }: BreadcrumbsProps) => {
  return (
    <nav
      aria-label="Breadcrumb"
      className={`text-sm text-muted-foreground ${className || ""}`}
    >
      <ol className="flex items-center space-x-2">
        {segments.map((segment, index) => (
          <li key={segment.path} className="flex items-center">
            {index > 0 && <span className="mx-2">/</span>}
            {index === segments.length - 1 ? (
              <span className="font-medium text-foreground">
                {segment.label}
              </span>
            ) : (
              <Link href={segment.path} className="hover:text-primary">
                {segment.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};
