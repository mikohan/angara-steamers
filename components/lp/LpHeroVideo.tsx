"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { Volume2 } from "lucide-react";

// Vertical (9:16) hero video. Plays muted on a loop; tap turns sound on and
// restarts it. With no `src` yet it shows the poster photo as a placeholder
// (no play button, so nobody taps a video that isn't there).
export function LpHeroVideo({
  src,
  poster,
  caption,
}: {
  src?: string;
  poster: string;
  caption?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [withSound, setWithSound] = useState(false);

  const turnSoundOn = () => {
    const v = ref.current;
    if (!v) return;
    v.muted = false;
    v.currentTime = 0;
    void v.play();
    setWithSound(true);
  };

  return (
    <div className="relative mx-auto aspect-9/16 w-full max-w-[360px] overflow-hidden rounded-3xl bg-black shadow-2xl">
      {src ? (
        <>
          <video
            ref={ref}
            className="h-full w-full object-cover"
            src={src}
            poster={poster}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          />
          {!withSound && (
            <button
              onClick={turnSoundOn}
              className="absolute inset-0 flex items-end justify-center pb-6"
              aria-label="Play with sound"
            >
              <span className="flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm font-bold text-foreground shadow">
                <Volume2 className="h-4 w-4" /> Tap for sound
              </span>
            </button>
          )}
        </>
      ) : (
        <>
          <Image
            src={poster}
            alt={caption || "Angara Steamers"}
            fill
            priority
            sizes="360px"
            className="object-cover"
          />
        </>
      )}
      {caption && (
        <div className="pointer-events-none absolute left-3 top-3 rounded-full bg-black/55 px-3 py-1 text-xs font-semibold text-white">
          {caption}
        </div>
      )}
    </div>
  );
}
