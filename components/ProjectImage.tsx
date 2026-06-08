// components/ProjectImage.tsx
import Image from "next/image";

export function ProjectImage({
  src,
  alt,
  width,
  height,
}: {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}) {
  return (
    <div className="overflow-hidden rounded-lg shadow-md transition-transform hover:scale-[1.02]">
      <Image
        src={process.env.NEXT_PUBLIC_STRAPI_URL + src}
        alt={alt}
        width={width}
        height={height}
        className="w-full h-auto"
      />
    </div>
  );
}
