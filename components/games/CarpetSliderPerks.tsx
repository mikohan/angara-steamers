"use client";

import {
  useEffect,
  useRef,
  useState,
  MouseEvent as ReactMouseEvent,
  TouchEvent as ReactTouchEvent,
} from "react";
import { Leaf, Clock, Zap } from "lucide-react";

const perks = [
  {
    icon: Leaf,
    title: "Eco-Friendly",
    description:
      "Best-in-class non-toxic shampoos safe for your family and pets.",
  },
  {
    icon: Clock,
    title: "Always On Time",
    description: "We respect your schedule with punctual, reliable service.",
  },
  {
    icon: Zap,
    title: "Powerful Extraction",
    description: "High-pressure equipment that leaves your carpet almost dry.",
  },
];

export const CarpetSliderPerks = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [sliderX, setSliderX] = useState<number>(0);
  const images = useRef<{
    clean: HTMLImageElement;
    dirty: HTMLImageElement;
  } | null>(null);

  // 1. Responsive Resizing
  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      const { width } = entries[0].contentRect;
      const height = width * 0.5625; // Maintain 16:9 aspect ratio
      setDimensions({ width, height });
      setSliderX(width / 2); // Initial center
    });

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // 2. Load Images
  useEffect(() => {
    const clean = new Image();
    const dirty = new Image();
    clean.src = "/images/rug-after.jpg";
    dirty.src = "/images/rug-before.jpg";
    images.current = { clean, dirty };
  }, []);

  // 3. Render Loop
  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas || !images.current || dimensions.width === 0) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(images.current.dirty, 0, 0, canvas.width, canvas.height);

    ctx.save();
    ctx.beginPath();
    ctx.rect(0, 0, sliderX, canvas.height);
    ctx.clip();
    ctx.drawImage(images.current.clean, 0, 0, canvas.width, canvas.height);
    ctx.restore();

    // Divider Line
    ctx.beginPath();
    ctx.moveTo(sliderX, 0);
    ctx.lineTo(sliderX, canvas.height);
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 6;
    ctx.stroke();
  };

  useEffect(() => {
    requestAnimationFrame(draw);
  }, [sliderX, dimensions]);

  // 4. Precise Event Handling
  const handleMove = (
    e: ReactMouseEvent<HTMLCanvasElement> | ReactTouchEvent<HTMLCanvasElement>,
  ): void => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Use nativeEvent.offsetX for the most accurate positioning relative to the element
    const clientX =
      "touches" in e
        ? e.touches[0].clientX - canvas.getBoundingClientRect().left
        : (e.nativeEvent as MouseEvent).offsetX;

    setSliderX(Math.max(0, Math.min(clientX, dimensions.width)));
  };

  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12 p-8">
      <div
        ref={containerRef}
        className="relative w-full md:w-3/5 touch-none select-none"
      >
        <canvas
          ref={canvasRef}
          width={dimensions.width}
          height={dimensions.height}
          onMouseMove={handleMove}
          onTouchMove={handleMove}
          className="w-full h-auto cursor-ew-resize rounded-2xl shadow-2xl border-4 border-primary/20 block"
        />
      </div>

      <div className="w-full md:w-2/5 space-y-10">
        <h2 className="text-5xl md:text-6xl font-bold tracking-tight text-foreground">
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
