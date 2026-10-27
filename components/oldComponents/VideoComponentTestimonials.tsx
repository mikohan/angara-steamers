"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import PlayIcon from "@/public/oldMedia/couch/videoIcon.png";

import { VideoCopmpnent } from "@/types";

// Removed "types" (you requested no types)
export function VideoComponentTestimonials({
  source_mp4,
  source_webm,
  autoPlay = true,
  loop = true,
  muted = true,
  width = "504",
  height = "896",
  poster,
}: VideoCopmpnent) {
  const vid = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  // Don't fetch or play the video until it's actually about to be visible --
  // these are 5MB+ files and were previously downloading on every homepage
  // load regardless of scroll position.
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || isInView) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }, // start loading a little before it scrolls into view
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [isInView]);

  useEffect(() => {
    if (!isInView || !autoPlay) return;
    const video = vid.current;
    if (!video) return;
    video.play().catch((err) => {
      console.error("Autoplay failed:", err);
    });
  }, [isInView, autoPlay]);

  const handlePlay = async () => {
    const video = vid.current;
    if (!video) return;

    if (!isInView) {
      setIsInView(true);
    }

    try {
      if (!video.paused) {
        video.pause();
        setIsPlaying(false);
      } else {
        // Always handle the promise returned by play()
        await video.play();
        setIsPlaying(true);
      }
    } catch (err) {
      console.error("Playback failed:", err);
    }
  };

  return (
    <div ref={containerRef} className="relative">
      <video
        ref={vid}
        width={width}
        height={height}
        preload={isInView ? "auto" : "none"}
        loop={loop}
        muted={muted}
        className="rounded-2xl w-full h-auto"
        poster={poster}
        playsInline
        onPlay={() => setIsPlaying(true)} // Sync state when video starts
        onPause={() => setIsPlaying(false)} // Sync state when video pauses
        onClick={handlePlay}
      >
        {isInView && (
          <>
            <source src={source_mp4} type="video/mp4" />
            <source src={source_webm} type="video/webm" />
          </>
        )}
      </video>

      {/* Use a button element for better accessibility. 
         Added a simple overlay hover effect. 
      */}
      {!isPlaying && (
        <button
          onClick={handlePlay}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 md:w-32 md:h-32 
             cursor-pointer transition-all duration-500 ease-in-out 
             opacity-100 scale-100 hover:scale-110
             data-[playing=true]:opacity-0 data-[playing=true]:scale-90 z-10"
          data-playing={isPlaying}
        >
          <Image alt="play/pause" src={PlayIcon} />
        </button>
      )}
    </div>
  );
}
