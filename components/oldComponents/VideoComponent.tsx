"use client";
import { VideoCopmpnent } from "@/types";

import { cn } from "@/lib/utils";
import Poster from "@/public/vasya_rug.webp";
import { useRef, useEffect } from "react";

export function VideoComponent({
  source,
  autoPlay = true,
  loop = true,
  muted = true,
  width = "720",
  height = "1280", // Fixed typo here
  className,
  poster = Poster.src,
}: VideoCopmpnent) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (autoPlay && videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.log("Autoplay prevented:", error);
      });
    }
  }, [autoPlay]);
  return (
    <video
      // Pass src directly for better reactivity
      ref={videoRef}
      width={width}
      height={height}
      controls
      preload="auto"
      autoPlay={autoPlay}
      loop={loop}
      muted={muted}
      className={cn("rounded-2xl w-full h-full object-cover", className)}
      playsInline
      poster={poster}
      webkit-playsinline="true"
    >
      <source type="video/mp4" src={source} />
      <track kind="subtitles" srcLang="en" label="English" />
      Your browser does not support the video tag.
    </video>
  );
}
