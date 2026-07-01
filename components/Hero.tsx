"use client";

import { useState } from "react";
import { GoogleStars } from "./oldComponents/GoogleStars";
import { AvatarGroup } from "./oldComponents/AvatarGroup";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogDescription,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import Image from "next/image";
import MyImage from "@/public/oldMedia/couch/hero-me-color.png";
import { VideoComponent } from "./oldComponents/VideoComponent";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { cn } from "@/lib/utils";
import { ButtonShiny } from "./common/ButtonShiny";
import { QuoteDialog } from "./QuoteDialog";

interface IProps {
  className?: string;
  header?: string;
  subheader?: string;
  heroImage?: string;
  video: boolean;
}

function Hero({ header, className, heroImage, video, subheader }: IProps) {
  const [isOpen, setIsOpen] = useState(false);

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
        "pt-8 md:pt-16 pb-16 bg-background mx-auto max-w-7xl px-4 md:px-0",
        className,
      )}
    >
      <div className="md:flex justify-center w-full items-center gap-12">
        <div className="md:flex-1">
          <div className="inline-flex gap-2 w-full justify-center md:justify-start">
            <AvatarGroup />
            <GoogleStars starsCount={5} rating="" />
          </div>

          <div className="flex flex-col md:items-start text-center md:text-left">
            <h1 className="mt-4 md:mt-12 text-3xl md:text-6xl font-bold tracking-tight">
              {h1}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mt-4 md:mt-8">
              {h2}
            </p>

            <div className="w-full flex flex-col md:flex-row gap-4 mt-8 md:mt-12 justify-center md:justify-start">
              <QuoteDialog>
                <ButtonShiny
                  size="lg"
                  className="rounded-full px-8 text-white text-lg font-bold"
                >
                  Get a Free Quote
                </ButtonShiny>
              </QuoteDialog>

              <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="xxl"
                    className="rounded-full px-8 border-primary/50 text-lg font-bold"
                  >
                    Watch Our Process
                  </Button>
                </DialogTrigger>
                <DialogContent
                  showCloseButton={false}
                  className="max-w-sm w-[90vw] p-0 overflow-hidden ring-0 border-none flex flex-col items-center justify-center bg-transparent"
                >
                  <VisuallyHidden>
                    <DialogTitle>Our Upholstery Cleaning Process</DialogTitle>
                    <DialogDescription>
                      A short video showing our steam cleaning technique.
                    </DialogDescription>
                  </VisuallyHidden>

                  {/* Vertical container (9:16) */}
                  <div className="relative w-full aspect-9/16 bg-black rounded-2xl overflow-hidden max-w-[90%] md:max-w-full">
                    {isOpen && (
                      <VideoComponent
                        source="/oldMedia/videos/test1.mp4"
                        className="w-full h-full"
                        autoPlay={true}
                        muted={true}
                      />
                    )}
                  </div>
                  <DialogClose className="absolute right-10 md:right-4 top-4 rounded-full p-3 transition-opacity hover:bg-neutral-100 focus:outline-none">
                    <X className="size-8" strokeWidth={2.5} />
                    <span className="sr-only">Close</span>
                  </DialogClose>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>

        {/* Hero Image or Hero Video */}
        <div className="mt-16 md:mt-0 md:flex-1 flex justify-center">
          {!video && (
            <div className="relative aspect-4/5 w-full max-w-sm h-auto">
              <Image
                fetchPriority="high"
                src={heroImageUrl}
                priority
                alt="Professional upholstery cleaning"
                className="rounded-2xl object-cover shadow-2xl w-full h-full"
                fill
                sizes="(max-width: 768px) 100vw, 500px"
              />
            </div>
          )}
          {video && (
            <div className="relative aspect-9/16 w-full max-w-sm h-auto rounded-2xl overflow-hidden shadow-2xl">
              <VideoComponent
                source="/oldMedia/videos/test3.mp4"
                className="w-full h-full"
                autoPlay={true}
                muted={true}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export { Hero };
