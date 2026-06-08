import { VideoCopmpnent } from "@/types";
import { cn } from "@/lib/utils";

export function VideoComponent({
  source,
  autoPlay = true,
  loop = true,
  muted = true,
  width = "720",
  height = "1280", // Fixed typo here
  className,
}: VideoCopmpnent) {
  return (
    <video
      // Pass src directly for better reactivity
      src={source}
      width={width}
      height={height}
      controls
      preload="auto"
      autoPlay={autoPlay}
      loop={loop}
      muted={muted}
      className={cn("rounded-2xl w-full h-full object-cover", className)}
      playsInline
    >
      <track kind="subtitles" srcLang="en" label="English" />
      Your browser does not support the video tag.
    </video>
  );
}
