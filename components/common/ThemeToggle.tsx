"use client";

import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

export function ThemeToggle({ className }: { className?: string }) {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(() => true);
  }, []);
  // Skeleton fallback to prevent layout shift during hydration
  if (!mounted) {
    return (
      <div
        className={cn(
          "h-10 w-10 shrink-0 rounded-xl bg-muted/20 animate-pulse",
          className,
        )}
      />
    );
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label="Toggle Theme"
      className={cn(
        "flex h-10 w-10 items-center justify-center rounded-xl  transition-all active:scale-95 touch-feedback",
        className,
      )}
    >
      {theme === "dark" ? (
        <Moon className="h-5 w-5 dark:text-foreground light:text-background" />
      ) : (
        <Sun className="h-5 w-5 dark:text-foreground light:text-background" />
      )}
    </button>
  );
}
