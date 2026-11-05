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

/** File name without extension, lowercased: "video_cover.jpg" -> "video_cover". */
function mediaStem(media: StrapiMedia): string {
  return (media.name || "").replace(/\.[^.]+$/, "").toLowerCase();
}

/**
 * A video cover is an image uploaded next to its video and named "<video name>_cover",
 * e.g. "video.mp4" + "video_cover.jpg". It is shown as the video's poster, never as a job photo.
 */
export function isVideoCover(media?: StrapiMedia | null): boolean {
  return !!media && isImageMedia(media) && /[_-]cover$/.test(mediaStem(media));
}

export function splitMedia(media: StrapiMedia[] = []) {
  return {
    images: media.filter((m) => isImageMedia(m) && !isVideoCover(m)),
    videos: media.filter(isVideoMedia),
    covers: media.filter(isVideoCover),
  };
}

/** Poster for a video: its "<name>_cover" image, or the only cover when there is one video. */
export function videoCover(
  video: StrapiMedia,
  covers: StrapiMedia[],
  videoCount: number,
): StrapiMedia | undefined {
  const own = covers.find(
    (c) => mediaStem(c).replace(/[_-]cover$/, "") === mediaStem(video),
  );
  return own || (videoCount === 1 && covers.length === 1 ? covers[0] : undefined);
}

/** Card thumbnail: the first job photo, else a video cover. */
export function firstImage(
  media: StrapiMedia[] = [],
): StrapiMedia | undefined {
  return (
    media.find((m) => isImageMedia(m) && !isVideoCover(m)) ||
    media.find(isVideoCover)
  );
}
