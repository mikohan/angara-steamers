import Image from "next/image";
import Star from "@/public/oldMedia/couch/star.svg";
import BriannaVilla from "@/public/oldMedia/couch/avatars/brianna-villa.png";
import BankrollBombshell from "@/public/oldMedia/couch/avatars/bankroll-bombshell.png";
import { BUSINESS_CONFIG } from "@/data/business-config";

// "4.9 on Google" badge: real Angara reviewers' faces (the ones with photos), stars, rating and a
// link to the Google Business Profile.
// Google "G" icon: download the official icon from Google's Business Profile
// marketing kit, save it as public/images/google-g.svg, then import it here
// and pass it in as `googleIcon` (it shows instead of the word "Google").
export function GoogleRatingBadge({
  googleIcon,
}: {
  googleIcon?: string;
}) {
  const gmb =
    process.env.NEXT_PUBLIC_COMPANY_GMB || "https://share.google/oDULc3KpCXQC52z9f";
  const faces = [BriannaVilla, BankrollBombshell];

  return (
    <a
      href={gmb}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-3 rounded-full border border-muted/20 bg-background py-1.5 pl-1.5 pr-4 shadow-sm transition-shadow hover:shadow-md"
    >
      <span className="flex -space-x-2">
        {faces.map((f, i) => (
          <span
            key={i}
            className="relative h-8 w-8 overflow-hidden rounded-full ring-2 ring-background"
          >
            <Image src={f} alt="Customer" fill sizes="32px" className="object-cover" />
          </span>
        ))}
      </span>
      <span className="flex flex-col leading-tight">
        <span className="flex items-center gap-1.5">
          <span className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} className="relative h-3.5 w-3.5">
                <Image src={Star} alt="" fill sizes="14px" />
              </span>
            ))}
          </span>
          <span className="text-sm font-bold text-foreground">
            {BUSINESS_CONFIG.rating}
          </span>
          <span className="text-sm text-muted">on</span>
          {googleIcon ? (
            <span className="relative h-4 w-4">
              <Image src={googleIcon} alt="Google" fill sizes="16px" />
            </span>
          ) : (
            <span className="text-sm font-bold text-foreground">Google</span>
          )}
        </span>
        <span className="text-xs font-semibold text-primary underline-offset-2 hover:underline">
          Read our reviews
        </span>
      </span>
    </a>
  );
}
