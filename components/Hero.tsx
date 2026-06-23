import { GoogleStars } from "./oldComponents/GoogleStars";
import { AvatarGroup } from "./oldComponents/AvatarGroup";
import { Button } from "@/components/ui/button"; // Shadcn Button
import { X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogDescription,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog"; // Shadcn Dialog
import Image from "next/image";
import MyImage from "@/public/oldMedia/couch/hero-me-color.png";
import { VideoComponent } from "./oldComponents/VideoComponent";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { cn } from "@/lib/utils";

interface IProps {
  className?: string;
  header?: string;
  subheader?: string;
  heroImage?: string;
  video: boolean;
}
function Hero({ header, className, heroImage, video, subheader }: IProps) {
  const h1 = header
    ? header
    : "Couch and Upholstery Professional Steam Cleaning in LA";
  const heroImageUrl = heroImage ? heroImage : MyImage.src;
  const h2 = subheader
    ? subheader
    : "We restore freshness, remove odors, and save your furniture time & money. Professional, safe, fast.";
  return (
    <section
      className={cn(
        "pt-8 md:pt-16 pb-16 bg-background mx-auto max-w-7xl md:px-0",
        className,
      )}
    >
      <div className="md:flex justify-center w-full items-center">
        <div className="md:flex-1">
          <div className="inline-flex gap-2 w-full justify-center">
            <AvatarGroup />
            <GoogleStars starsCount={5} rating="" />
          </div>

          <div className="flex flex-col md:items-center">
            <h1 className="md:text-left mt-4 md:mt-12 text-3xl md:text-6xl font-bold tracking-tight">
              {h1}
            </h1>

            <p className="md:text-left text-lg md:text-xl text-muted-foreground mt-4 md:mt-8">
              {h2}
            </p>

            <div className="w-full flex flex-col md:flex-row gap-8 mt-12 md:mt-12 justify-center">
              {/* Shadcn Button Pattern */}
              <Button
                size="xl"
                className="rounded-full px-8 text-white text-lg font-bold"
              >
                Get a Free Quote
              </Button>

              {/* Shadcn Dialog Pattern (Replaces ModalDaisy) */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="xl"
                    className="rounded-full px-8 border-primary/50 text-lg font-bold"
                  >
                    Watch Our Process
                  </Button>
                </DialogTrigger>
                <DialogContent
                  showCloseButton={false}
                  className="max-w-4xl ring-0 overflow-hidden flex flex-col items-center justify-center"
                >
                  <VisuallyHidden>
                    <DialogTitle>Our Upholstery Cleaning Process</DialogTitle>
                    <DialogDescription>
                      A short video showing our steam cleaning technique.
                    </DialogDescription>
                  </VisuallyHidden>

                  {/* Container that forces the video to stay in the box */}
                  <div className="relative px-4 md:px-0 w-full max-h-[80vh] aspect-video">
                    <VideoComponent
                      source="/oldMedia/videos/process.mp4"
                      className="w-full"
                    />
                  </div>

                  {/* X button visibility fix */}
                  <DialogClose className="absolute right-12 top-12 z-50 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 flex items-center justify-center">
                    <X className="h-8 w-8" strokeWidth={2.5} />
                  </DialogClose>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>

        <div className="mt-16 md:mt-0 md:flex-1 flex justify-center ">
          {!video && (
            <div className="relative aspect-4/5 w-full max-w-sm md:max-w-md h-auto">
              <Image
                fetchPriority="high"
                src={heroImageUrl}
                priority
                alt="Professional upholstery cleaning in Los Angeles"
                className="rounded-2xl object-cover shadow-2xl w-full h-full"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          )}
          {video && (
            <div className="relative aspect-9/16 w-full max-w-sm md:max-w-md h-auto">
              <VideoComponent source="/oldMedia/videos/process.mp4" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
export { Hero };
