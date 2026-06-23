"use client";

import Lenis from "lenis"; // Import the native class type
import { useLenis } from "lenis/react";
import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    // Type the instance event payload cleanly using Lenis
    const handleScroll = (instance: Lenis) => {
      setIsVisible(instance.scroll > 400);
    };

    lenis.on("scroll", handleScroll);

    return () => {
      lenis.off("scroll", handleScroll);
    };
  }, [lenis]);

  const handleClick = () => {
    lenis?.scrollTo(0, { duration: 1.2 });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={handleClick}
      className="fixed right-8 bottom-8 z-50 flex h-16 w-16 cursor-pointer items-center justify-center rounded-full bg-foreground text-background opacity-60 shadow-xl transition-all duration-300 hover:scale-105 active:scale-95"
      aria-label="Scroll to top"
    >
      <ArrowUp className="h-6 w-6 stroke-[2.5]" />
    </button>
  );
}
