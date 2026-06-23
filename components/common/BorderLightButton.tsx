"use client";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface BorderLightButtonProps extends HTMLMotionProps<"button"> {
  text?: string;
}

export const BorderLightButton = ({ className }: BorderLightButtonProps) => {
  return (
    <div className={cn("box", className)}>
      <span>01</span>
    </div>
  );
};
