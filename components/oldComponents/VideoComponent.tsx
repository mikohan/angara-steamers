import { VideoCopmpnent } from "@/types";
import { cn } from "@/lib/utils";
import Poster from "@/public/vasya_rug.webp";

export function VideoComponent({
  source_webm,
  source_mp4,
  autoPlay = true,
  loop = true,
  muted = true,
  width = "720",
  height = "1280", // Fixed typo here
  className,
  poster = Poster.src,
}: VideoCopmpnent) {
  return (
    <video
      // Pass src directly for better reactivity
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
    >
      {/* <!-- Browser tries WebM (VP9) first for better compression --> */}
      <source src={source_webm} type="video/webm" />
      {/* <!-- Fallback to MP4 (H.264) for Safari/iOS --> */}
      <source src={source_mp4} type="video/mp4" />
      <track kind="subtitles" srcLang="en" label="English" />
      Your browser does not support the video tag.
    </video>
  );
}
