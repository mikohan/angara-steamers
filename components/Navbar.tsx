import Link from "next/link";
// import { MobileMenu } from "./MobileMenu";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import { MobileMenu } from "./MobileMenu";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Pricing", href: "/pricing" },
  { label: "Contact", href: "/contacts" },
  { label: "Test", href: "/test" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur shadow-xl shadow-primary/20">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <div className="h-7 w-7 rounded-xl bg-primary" /> Angara
        </Link>

        <nav className="hidden sm:flex items-center gap-6 text-sm font-medium">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
          <ThemeToggle />
          <Link
            href="#"
            className="rounded-full bg-primary px-4 py-2 text-white touch-feedback"
          >
            Get started
          </Link>
        </nav>

        <MobileMenu navItems={navItems} />
      </div>
    </header>
  );
}
