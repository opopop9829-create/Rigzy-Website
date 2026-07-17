"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";
import { Project } from "@/data/projects";
import ProjectTextOverlays from "./ProjectTextOverlays";

interface ProjectScrollProps {
  project: Project;
}

export default function ProjectScroll({ project }: ProjectScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef<number>(0);

  const [imagesLoaded, setImagesLoaded] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingPhase, setLoadingPhase] = useState("Initializing raw footage...");

  // Use framer-motion to track scroll progress over the 500vh sticky container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Calculate loading text phases based on percentage loaded
  useEffect(() => {
    const pct = Math.round((imagesLoaded / 120) * 100);
    if (pct < 25) {
      setLoadingPhase("Importing raw footage...");
    } else if (pct < 50) {
      setLoadingPhase("Synchronizing sound design...");
    } else if (pct < 75) {
      setLoadingPhase("Applying LUT & color science...");
    } else if (pct < 100) {
      setLoadingPhase("Rendering cinematic sequence...");
    } else {
      setLoadingPhase("Ready");
    }
  }, [imagesLoaded]);

  // Preload all 120 images when the project changes
  useEffect(() => {
    setIsLoading(true);
    setImagesLoaded(0);
    imagesRef.current = [];
    currentFrameRef.current = 0;

    const totalFrames = 120;
    const tempImages: HTMLImageElement[] = [];

    for (let i = 1; i <= totalFrames; i++) {
      const img = new Image();
      img.src = `${project.folderPath}/${i}.webp`;
      
      img.onload = () => {
        setImagesLoaded((prev) => {
          const nextVal = prev + 1;
          if (nextVal === totalFrames) {
            setIsLoading(false);
            // Draw initial frame
            setTimeout(() => {
              resizeCanvas();
            }, 100);
          }
          return nextVal;
        });
      };

      img.onerror = () => {
        // Fallback for missing frames
        setImagesLoaded((prev) => {
          const nextVal = prev + 1;
          if (nextVal === totalFrames) {
            setIsLoading(false);
            setTimeout(() => {
              resizeCanvas();
            }, 100);
          }
          return nextVal;
        });
      };

      tempImages.push(img);
    }
    imagesRef.current = tempImages;
  }, [project]);

  // Core drawing logic for the canvas (fits inside viewport, respects aspect ratio, crisp details)
  const drawFrame = (index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = imagesRef.current[index];
    if (img && (img.complete || img.naturalWidth > 0)) {
      const dpr = window.devicePixelRatio || 1;
      const canvasWidth = canvas.width / dpr;
      const canvasHeight = canvas.height / dpr;

      // Clear the canvas
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);

      // Calculate object-fit contain
      const imgWidth = img.naturalWidth || 1920;
      const imgHeight = img.naturalHeight || 1080;
      
      const wr = canvasWidth / imgWidth;
      const hr = canvasHeight / imgHeight;
      const ratio = Math.min(wr, hr); // "contain"

      const w = imgWidth * ratio;
      const h = imgHeight * ratio;
      const x = (canvasWidth - w) / 2;
      const y = (canvasHeight - h) / 2;

      ctx.drawImage(img, 0, 0, imgWidth, imgHeight, x, y, w, h);
    }
  };

  // Adjust canvas size to match the parent client rectangle (factoring in DPR for high-DPI displays)
  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    // Use viewport dimensions
    const width = window.innerWidth;
    const height = window.innerHeight;
    const dpr = window.devicePixelRatio || 1;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.scale(dpr, dpr);
      drawFrame(currentFrameRef.current);
    }
  };

  // Listen to frame changes via scroll progress
  useMotionValueEvent(scrollYProgress, "change", (latestValue) => {
    if (isLoading || imagesRef.current.length === 0) return;
    const frameIndex = Math.min(119, Math.floor(latestValue * 120));
    if (frameIndex !== currentFrameRef.current) {
      currentFrameRef.current = frameIndex;
      requestAnimationFrame(() => drawFrame(frameIndex));
    }
  });

  // Watch for window resize events
  useEffect(() => {
    window.addEventListener("resize", resizeCanvas);
    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [isLoading]);

  const loadPercent = Math.round((imagesLoaded / 120) * 100);

  return (
    <div ref={containerRef} className="relative h-[500vh] w-full">
      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black flex items-center justify-center">
        {/* Canvas Renderer */}
        <canvas
          ref={canvasRef}
          className="block max-w-full max-h-full pointer-events-none"
        />

        {/* Cinematic Loading Overlay */}
        {isLoading && (
          <div className="absolute inset-0 bg-black flex flex-col items-center justify-center z-50 transition-opacity duration-500">
            <div className="relative w-64 h-1 bg-zinc-800 rounded-full overflow-hidden mb-4">
              <div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-violet-500 to-indigo-500 transition-all duration-100 ease-out"
                style={{ width: `${loadPercent}%` }}
              />
            </div>
            <div className="font-mono text-xs tracking-[0.2em] text-zinc-400 uppercase animate-pulse">
              {loadingPhase}
            </div>
            <div className="font-mono text-lg font-bold text-violet-400 mt-2">
              {loadPercent}%
            </div>
          </div>
        )}

        {/* Text Overlays - layered over the canvas */}
        {!isLoading && (
          <ProjectTextOverlays scrollYProgress={scrollYProgress} project={project} />
        )}
      </div>
    </div>
  );
}
