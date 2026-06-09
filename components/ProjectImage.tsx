// components/ProjectImage.tsx
import Image from "next/image";

export function ProjectImage({
  src,
  alt,
  width,
  height,
  caption,
}: {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  caption?: string | null;
}) {
  return (
    <figure className="bg-primary/10 shadow-xl  p-4 rounded-2xl my-8 flex flex-col items-center justify-between">
      {/* Video Container */}
      <div className="overflow-hidden rounded-lg shadow-md transition-transform hover:scale-[1.02]">
        <Image
          src={process.env.NEXT_PUBLIC_STRAPI_URL + src}
          alt={alt}
          width={width}
          height={height}
          className="w-full h-auto"
        />
      </div>

      {/* Minimalist Caption */}

      <figcaption className="text-center text-sm mt-4 line-clamp-6">
        {caption}
      </figcaption>
    </figure>
  );
}
