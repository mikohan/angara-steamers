import Image from "next/image";
import Star from "@/public/oldMedia/couch/star.svg";

interface GoogleProps {
  rating: string;
  text?: string | undefined;
  starsCount: number;
  inline?: boolean | undefined;
}

function GoogleStars({ rating, text, starsCount, inline = true }: GoogleProps) {
  const rat = rating ?? "4.99";
  const cnt = starsCount ?? 5;
  const inln = inline ? "flex gap-2" : "block";

  return (
    <div className={`${inln} items-center`}>
      <div className="inline-flex gap-1">
        {new Array(cnt).fill(0).map((_, i) => (
          <div key={i} className="relative h-5 w-5">
            <Image
              src={Star}
              alt="Review stars"
              priority
              fill
              className="object-contain"
            />
          </div>
        ))}
      </div>
      <div className="text-sm font-semibold tracking-wider">
        {rat} {text}
      </div>
    </div>
  );
}
export { GoogleStars };
