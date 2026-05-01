"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export function ScrollDepthWrapper({ children }: { children: React.ReactNode }) {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!container.current) return;

    // Set initial styles for hardware acceleration
    gsap.set(container.current, {
      willChange: "transform, filter, opacity",
      transformOrigin: "center center",
    });

    // 1. Entry Animation: Animates from blurred/scaled down to normal
    // Trigger starts when the top of the element hits the bottom of the viewport
    // Trigger ends when the top of the element reaches the center of the viewport (or 20% from bottom if tall)
    gsap.fromTo(
      container.current,
      {
        scale: 0.9,
        filter: "blur(10px)",
        opacity: 0.2,
      },
      {
        scale: 1,
        filter: "blur(0px)",
        opacity: 1,
        ease: "none",
        scrollTrigger: {
          trigger: container.current,
          start: "top bottom", 
          end: "top 60%", // Fully in focus when top is at 60% of viewport
          scrub: 0.5,
        },
      }
    );

    // 2. Exit Animation: Animates from normal to blurred/scaled down
    // Trigger starts when the bottom of the element reaches 40% of the viewport (near top)
    // Trigger ends when the bottom of the element hits the top of the viewport
    gsap.fromTo(
      container.current,
      {
        scale: 1,
        filter: "blur(0px)",
        opacity: 1,
      },
      {
        scale: 0.9,
        filter: "blur(10px)",
        opacity: 0.2,
        ease: "none",
        scrollTrigger: {
          trigger: container.current,
          start: "bottom 40%", 
          end: "bottom top", 
          scrub: 0.5,
        },
      }
    );
  }, { scope: container });

  return (
    <div ref={container} className="w-full relative overflow-hidden">
      {children}
    </div>
  );
}
