"use client";

import { usePathname } from "next/navigation";

// Renders its children everywhere except on the listed paths.
export function HideOnPaths({
  paths,
  children,
}: {
  paths: string[];
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  if (pathname && paths.includes(pathname)) return null;
  return <>{children}</>;
}
