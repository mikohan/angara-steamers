"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { ThemeToggle } from "@/components/common/ThemeToggle";

export function MobileMenu({
  navItems,
}: {
  navItems: { label: string; href: string }[];
}) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    document.body.style.overflow = open ? "hidden" : "unset";
  }, [open]);

  if (!mounted) return null;

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="p-2 sm:hidden touch-feedback"
      >
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {createPortal(
        <div
          className={`fixed inset-0 z-[100] transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        >
          <div
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <div
            className={`absolute right-0 top-0 h-full w-72 bg-background border-l border-muted/20 shadow-2xl transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"}`}
          >
            <div className="flex justify-between items-center p-6 border-b border-muted/20">
              <span className="font-semibold">Menu</span>
              <button onClick={() => setOpen(false)} className="p-2">
                ✕
              </button>
            </div>
            <nav className="flex flex-col p-6 gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="text-xl py-2"
                >
                  {item.label}
                </Link>
              ))}
              <div className="mt-4 pt-4 border-t border-muted/20">
                <ThemeToggle />
              </div>
            </nav>
          </div>
        </div>,
        document.body,
      )}
    </>
  );
}
