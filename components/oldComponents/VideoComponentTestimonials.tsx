"use client";
import Image from "next/image";
import { useRef } from "react";
import PlayIcon from "@/public/oldMedia/couch/videoIcon.png";
import { useState } from "react";

import { VideoCopmpnent } from "@/types";

// Removed "types" (you requested no types)
export function VideoComponentTestimonials({
  source,
  autoPlay = true,
  loop = true,
  muted = true,
  width = "720",
  height = "1280",
  poster,
}: VideoCopmpnent) {
  const vid = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(autoPlay); // 2. Initialize state
  const handlePlay = async () => {
    const video = vid.current;
    if (!video) return;

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
    <div className="relative">
      <video
        ref={vid}
        width={width}
        height={height}
        preload="auto"
        autoPlay={autoPlay}
        loop={loop}
        muted={muted}
        className="rounded-2xl"
        poster={poster}
        playsInline
        onPlay={() => setIsPlaying(true)} // Sync state when video starts
        onPause={() => setIsPlaying(false)} // Sync state when video pauses
        onClick={handlePlay}
      >
        <source src={source} type="video/mp4" />
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
