"use client";

import {
  useEffect,
  useRef,
  useState,
  MouseEvent as ReactMouseEvent,
  TouchEvent as ReactTouchEvent,
} from "react";
import { Leaf, Clock, Zap } from "lucide-react";

import { ShieldCheck, HeartHandshake, Sparkles } from "lucide-react";

const perks = [
  {
    icon: ShieldCheck,
    title: "1. Eliminate Hidden Threats",
    description:
      "We extract dust mites, allergens, and mold spores from deep within fabrics — contaminants that regular cleaning leaves behind. Constant exposure to them sustains chronic immune inflammation.",
  },
  {
    icon: HeartHandshake,
    title: "2. Safety for Children and Pets",
    description:
      "We select cleaning solutions based on the type of material, taking into account the safety of your entire family and pets.",
  },
  {
    icon: Sparkles,
    title: "3. Furniture That Looks Like New in Just One Visit",
    description:
      "We remove deeply embedded dirt and stains, restoring freshness and a well-maintained appearance to your fabrics. You'll see for yourself just how many hidden contaminants we've extracted.",
  },
];

export const CarpetSliderPerksMites = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [aspectRatio, setAspectRatio] = useState<number>(0.88); // Default to vertical image ratio
  const [sliderX, setSliderX] = useState<number>(0);
  const [imagesLoaded, setImagesLoaded] = useState<boolean>(false);

  const images = useRef<{
    clean: HTMLImageElement;
    dirty: HTMLImageElement;
  } | null>(null);

  // 1. Load Images & Calculate Natural Aspect Ratio
  useEffect(() => {
    const clean = new Image();
    const dirty = new Image();

    let loadedCount = 0;
    const handleLoad = () => {
      loadedCount++;
      if (loadedCount === 2) {
        // Calculate aspect ratio (height / width) based on the natural dimensions of the image
        if (dirty.naturalWidth > 0) {
          const ratio = dirty.naturalHeight / dirty.naturalWidth;
          setAspectRatio(ratio);
        }
        images.current = { clean, dirty };
        setImagesLoaded(true);
      }
    };

    clean.onload = handleLoad;
    dirty.onload = handleLoad;

    clean.src = "/images/rug-after.jpg";
    dirty.src = "/images/rug-before-mites.jpg";
  }, []);

  // 2. Responsive Resizing Based on Dynamic Aspect Ratio
  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      const { width } = entries[0].contentRect;
      if (width === 0) return;

      const height = width * aspectRatio;
      setDimensions({ width, height });
      setSliderX((prev) => (prev === 0 ? width / 2 : prev));
    });

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [aspectRatio]);

  // 3. Render Loop with Crisp Retain & Un-distorted Canvas Scale
  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas || !images.current || !imagesLoaded || dimensions.width === 0)
      return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;

    // Handle High-DPI Display Sharpness
    canvas.width = dimensions.width * dpr;
    canvas.height = dimensions.height * dpr;
    ctx.scale(dpr, dpr);

    // Draw Dirty Image (Before)
    ctx.clearRect(0, 0, dimensions.width, dimensions.height);
    ctx.drawImage(
      images.current.dirty,
      0,
      0,
      dimensions.width,
      dimensions.height,
    );

    // Draw Clean Image (After) with Clip
    ctx.save();
    ctx.beginPath();
    ctx.rect(0, 0, sliderX, dimensions.height);
    ctx.clip();
    ctx.drawImage(
      images.current.clean,
      0,
      0,
      dimensions.width,
      dimensions.height,
    );
    ctx.restore();

    // Divider Line
    ctx.beginPath();
    ctx.moveTo(sliderX, 0);
    ctx.lineTo(sliderX, dimensions.height);
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 4;
    ctx.stroke();

    // Slider Handle Knob
    ctx.beginPath();
    ctx.arc(sliderX, dimensions.height / 2, 18, 0, Math.PI * 2);
    ctx.fillStyle = "#ffffff";
    ctx.fill();
    ctx.strokeStyle = "rgba(0,0,0,0.15)";
    ctx.lineWidth = 2;
    ctx.stroke();
  };

  useEffect(() => {
    requestAnimationFrame(draw);
  }, [sliderX, dimensions, imagesLoaded]);

  // 4. Interaction Handling
  const handleMove = (
    e: ReactMouseEvent<HTMLCanvasElement> | ReactTouchEvent<HTMLCanvasElement>,
  ): void => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const clientX =
      "touches" in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;

    setSliderX(Math.max(0, Math.min(clientX, dimensions.width)));
  };

  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12 p-8">
      <div
        ref={containerRef}
        className="relative w-full md:w-1/2 touch-none select-none"
      >
        <canvas
          ref={canvasRef}
          style={{ width: dimensions.width, height: dimensions.height }}
          onMouseMove={handleMove}
          onTouchMove={handleMove}
          className="w-full h-auto cursor-ew-resize rounded-2xl shadow-2xl border-4 border-primary/20 block"
        />
      </div>

      <div className="w-full md:w-1/2 space-y-10">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
          Professional Care
        </h2>
        <div className="space-y-8">
          {perks.map((perk) => (
            <div key={perk.title} className="flex items-start gap-4">
              <div className="mt-1 p-4 bg-primary/10 rounded-2xl text-primary shrink-0">
                <perk.icon size={32} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-1">
                  {perk.title}
                </h3>
                <p className="text-lg text-muted">{perk.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
