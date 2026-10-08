"use client";

import { useEffect, useRef } from "react";
import { registerGsap } from "@/lib/gsapSetup";
import useReducedMotion from "@/hooks/useReducedMotion";

export default function DrawGrillLines({ count = 10, className = "" }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!ref.current || reduced) return;
    const { gsap } = registerGsap();
    const lines = ref.current.querySelectorAll("span");
    const ctx = gsap.context(() => {
      gsap.fromTo(
        lines,
        { scaleY: 0 },
        {
          scaleY: 1,
          transformOrigin: "bottom",
          duration: 0.45,
          stagger: 0.06,
          ease: "power2.out",
          scrollTrigger: { trigger: ref.current, start: "top 70%" },
        }
      );
    }, ref);
    return () => ctx.revert();
  }, [reduced, count]);

  return (
    <div
      ref={ref}
      className={`pointer-events-none absolute inset-x-6 bottom-8 flex h-24 items-end justify-between gap-1 sm:inset-x-12 ${className}`}
      aria-hidden="true"
    >
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className="w-[2px] flex-1 max-w-[6px] origin-bottom rounded-full bg-warm-yellow/70"
          style={{
            height: `${55 + (i % 3) * 15}%`,
            transform: reduced ? "scaleY(1)" : "scaleY(0)",
          }}
        />
      ))}
    </div>
  );
}
