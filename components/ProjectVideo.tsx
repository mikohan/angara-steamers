"use client";

import { useState } from "react";

type ProjectVideoProps = {
  url: string;
  type: string;
  title?: string;
};

export function ProjectVideo({ url, type, title }: ProjectVideoProps) {
  const [hasError, setHasError] = useState(false);
  const fullUrl = process.env.NEXT_PUBLIC_STRAPI_URL + url;

  if (hasError) return null;

  return (
    <div className="aspect-9/16 overflow-hidden rounded-2xl shadow-xl bg-black  w-full">
      <video
        className="w-full h-full object-cover"
        controls
        preload="auto"
        muted
        playsInline
        aria-label={title || "Project video"}
        onError={() => setHasError(true)}
      >
        <source src={fullUrl} type={type} />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
