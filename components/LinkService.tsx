import Link from "next/link";
import Image, { StaticImageData } from "next/image";

interface NavCardProps {
  title?: string;
  imageSrc: string | StaticImageData; // URL or path to the image
  imageAlt: string; // Accessibility text
  href: string;
  label?: string;
}

export function LinkService({
  title,
  imageSrc,
  imageAlt,
  href,
  label,
}: NavCardProps) {
  return (
    <Link
      href={href}
      className="group flex flex-col p-4 rounded-xl bg-primary-800/10 hover:border-primary transition-all shadow-sm hover:shadow-lg overflow-hidden"
    >
      <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      <div className="flex flex-col justify-between grow">
        <h3 className="text-lg font-bold  group-hover:text-primary transition-colors">
          {title}
        </h3>
        <div className="mt-4 flex items-center text-sm font-semibold text-primary">
          {label}
          <span className="ml-2 group-hover:translate-x-1 transition-transform">
            →
          </span>
        </div>
      </div>
    </Link>
  );
}
