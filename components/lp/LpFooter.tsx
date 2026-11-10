import Link from "next/link";

// Minimal footer for ad landing pages: who we are, how to reach us, policy.
export function LpFooter() {
  const phoneHref =
    process.env.NEXT_PUBLIC_COMPANY_PHONE_LINK || "+12135987763";
  const phoneTitle = process.env.NEXT_PUBLIC_COMPANY_PHONE || "(213) 598-7763";
  const email = process.env.NEXT_PUBLIC_COMPANY_EMAIL || "info@angarasteamers.com";

  return (
    <footer className="border-t border-muted/20 px-4 pt-10 pb-28 md:pb-10 text-center text-sm text-muted">
      <p className="font-bold text-foreground">Angara Steamers</p>
      <p className="mt-1">
        Angara Lab LLC · 13163 Fountain Park Dr 112, Playa Vista, CA 90094
      </p>
      <p className="mt-1">
        <a href={`tel:${phoneHref}`} className="hover:text-primary">
          {phoneTitle}
        </a>{" "}
        ·{" "}
        <a href={`mailto:${email}`} className="hover:text-primary">
          {email}
        </a>
      </p>
      <p className="mt-3">
        <Link href="/policy" className="underline hover:text-primary">
          Privacy Policy
        </Link>
      </p>
    </footer>
  );
}
