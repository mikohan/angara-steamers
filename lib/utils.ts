import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import qs from "qs";
import type { StrapiMedia } from "@/types";

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

// Project (and other) media_gallery fields now hold a mix of images and
// videos in one array -- these helpers split/pick by mime type so callers
// don't have to assume the first item (or every item) is an image.
export function isImageMedia(media?: StrapiMedia | null): boolean {
  return !!media?.mime?.startsWith("image/");
}

export function isVideoMedia(media?: StrapiMedia | null): boolean {
  return !!media?.mime?.startsWith("video/");
}

export function splitMedia(media: StrapiMedia[] = []) {
  return {
    images: media.filter(isImageMedia),
    videos: media.filter(isVideoMedia),
  };
}

export function firstImage(
  media: StrapiMedia[] = [],
): StrapiMedia | undefined {
  return media.find(isImageMedia);
}
