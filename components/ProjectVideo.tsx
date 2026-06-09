"use client";

type ProjectVideoProps = {
  url: string;
  type: string;
  caption?: string | null;
};

export function ProjectVideo({ url, type, caption }: ProjectVideoProps) {
  const fullUrl = process.env.NEXT_PUBLIC_STRAPI_URL + url;
  const safeCaption = caption ? caption : "Project Video";

  return (
    <figure className="bg-primary/10 shadow-xl  p-4 rounded-2xl my-8 flex flex-col items-center">
      {/* Video Container */}
      <div className="overflow-hidden rounded-2xl shadow-xl bg-black aspect-9/16 w-full max-w-sm">
        <video
          className="w-full h-full object-cover"
          controls
          preload="auto"
          muted
          playsInline
        >
          <source src={fullUrl} type={type} />
        </video>
      </div>

      {/* Minimalist Caption */}

      <figcaption className="mt-4 text-center text-sm  font-medium line-clamp-6">
        {safeCaption}
      </figcaption>
    </figure>
  );
}
