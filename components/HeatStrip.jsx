"use client";

import { useEffect, useRef } from "react";
import { heatStripItems } from "@/data/balkansCorner";
import { registerGsap } from "@/lib/gsapSetup";
import useReducedMotion from "@/hooks/useReducedMotion";

function BurgerIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M3 10h18M4 14h16M5 7h14a2 2 0 0 1 2 2v1H3V9a2 2 0 0 1 2-2Zm1 10h12a2 2 0 0 0 2-2H4a2 2 0 0 0 2 2Z" stroke="#0B0B0B" strokeWidth="1.6" />
    </svg>
  );
}

export default function HeatStrip() {
  const track = useRef(null);
  const reduced = useReducedMotion();
  const items = [...heatStripItems, ...heatStripItems];

  useEffect(() => {
    if (!track.current || reduced) return;
    const { gsap } = registerGsap();
    const ctx = gsap.context(() => {
      const width = track.current.scrollWidth / 2;
      gsap.to(track.current, {
        x: -width,
        duration: 28,
        ease: "none",
        repeat: -1,
      });
    }, track);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      className="relative overflow-hidden bg-warm-yellow py-2.5"
      aria-label="Menu highlights marquee"
    >
      <div
        ref={track}
        className="flex w-max items-center gap-6 whitespace-nowrap will-change-transform"
      >
        {items.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="font-display flex items-center gap-6 text-lg text-coal sm:text-xl"
          >
            {item}
            <BurgerIcon />
          </span>
        ))}
      </div>
    </section>
  );
}
