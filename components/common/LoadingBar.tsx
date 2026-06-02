"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import "./nprogress.css";

export function LoadingBar() {
  const pathname = usePathname();

  // Start progress bar when pathname changes
  useEffect(() => {
    NProgress.start();
  }, [pathname]);

  // Stop progress bar when the page hydrates
  useEffect(() => {
    NProgress.done();
  });

  return null;
}
