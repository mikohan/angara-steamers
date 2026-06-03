import { StrapiResponse } from "@/types";
import qs from "qs";

const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL?.replace(/\/$/, "") ||
  "https://cms.angaracleaning.com";
const API_TOKEN = process.env.STRAPI_API_TOKEN;

interface FetchOptions extends RequestInit {
  headers?: Record<string, string>;
}

// Added <T> here so the function accepts the type argument you pass when calling it
export async function fetchStrapi<T>(
  path: string,
  urlParamsObject: Record<string, unknown> = {},
  options: FetchOptions = { cache: "no-store" },
): Promise<StrapiResponse<T>> {
  try {
    const sanitizedPath = path.startsWith("/") ? path.slice(1) : path;
    const queryString = qs.stringify(urlParamsObject, {
      encodeValuesOnly: true,
    });

    // Add &publicationState=preview to the URL string
    const url = `${STRAPI_URL}/api/${sanitizedPath}${queryString ? `?${queryString}` : ""}`;
    console.log(url);

    const mergedOptions: RequestInit = {
      ...options,
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
        "Content-Type": "application/json",
        ...options.headers,
      },
    };

    const response = await fetch(url, mergedOptions);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.error?.message || `HTTP error! status: ${response.status}`,
      );
    }

    return data;
  } catch (error) {
    console.error("Fetch Error:", error);
    throw error;
  }
}
