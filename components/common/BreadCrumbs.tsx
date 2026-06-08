"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Breadcrumbs() {
  const pathname = usePathname();

  // Split path into segments
  const segments = pathname.split("/").filter((segment) => segment !== "");

  // Don't show breadcrumbs on the home page
  if (segments.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className="px-4 sm:px-6 py-4">
      <ol className="flex items-center space-x-2 text-xs text-primary-800 uppercase tracking-wider font-semibold">
        <li>
          <Link href="/" className="hover:text-primary transition-colors">
            Home
          </Link>
        </li>
        {segments.map((segment, index) => {
          const href = `/${segments.slice(0, index + 1).join("/")}`;
          const isLast = index === segments.length - 1;

          return (
            <li key={href} className="flex items-center">
              <span className="mx-2 text-muted">/</span>
              {isLast ? (
                <span className="text-primary-800 capitalize">
                  {segment.replace(/-/g, " ")}
                </span>
              ) : (
                <Link
                  href={href}
                  className="hover:text-primary transition-colors capitalize"
                >
                  {segment.replace(/-/g, " ")}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
