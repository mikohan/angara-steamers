import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import qs from "qs";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const formatDate = (dateString?: string | null) => {
  const date = dateString ? dateString : "01/01/2026";
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
};

export function stringUrl(
  path: string,
  urlParamsObject: Record<string, unknown> = {},
) {
  const STRAPI_URL =
    process.env.NEXT_PUBLIC_STRAPI_URL?.replace(/\/$/, "") ||
    "https://cms.angaracleaning.com";

  const sanitizedPath = path.startsWith("/") ? path.slice(1) : path;
  const queryString = qs.stringify(urlParamsObject, {
    encodeValuesOnly: true,
  });

  // Add &publicationState=preview to the URL string
  const url = `${STRAPI_URL}/api/${sanitizedPath}${queryString ? `?${queryString}` : ""}`;
  console.log("This is fetching url:", url);
}
