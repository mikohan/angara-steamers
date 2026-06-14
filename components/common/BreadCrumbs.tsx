"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface BreadcrumbsProps {
  className?: string;
  removeSegments?: string[]; // Pass parts of the URL you want to hide
}

// Utility to format labels
const formatLabel = (segment: string) =>
  segment.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());

export function Breadcrumbs({
  className,
  removeSegments = [],
}: BreadcrumbsProps) {
  const pathname = usePathname();

  const segments = pathname
    .split("/")
    .filter((s) => s !== "" && !removeSegments.includes(s));

  if (segments.length === 0) return null;

  // We need the original path to construct correct links
  const originalSegments = pathname.split("/").filter(Boolean);

  const crumbs = segments.map((segment) => {
    // Find where this segment exists in the original path to build the correct href
    const index = originalSegments.indexOf(segment);
    const href = `/${originalSegments.slice(0, index + 1).join("/")}`;

    return { href, label: formatLabel(segment) };
  });

  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex items-center text-xs uppercase tracking-wider font-semibold">
        <li>
          <Link href="/" className="text-primary underline hover:opacity-50">
            Home
          </Link>
        </li>
        {crumbs.map((crumb, index) => {
          const isLast = index === crumbs.length - 1;
          return (
            <li key={crumb.href} className="flex items-center">
              <span className="mx-2 text-muted">/</span>
              {isLast ? (
                <span className="text-primary">{crumb.label}</span>
              ) : (
                <Link
                  href={crumb.href}
                  className="text-primary underline hover:opacity-50"
                >
                  {crumb.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
