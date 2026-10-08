"use client";

import { useEffect, useRef } from "react";
import { registerGsap } from "@/lib/gsapSetup";
import useReducedMotion from "@/hooks/useReducedMotion";

export default function PriceTag({ children, className = "", rotate = true }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!ref.current || reduced) return;
    const { gsap } = registerGsap();
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { scale: 0.5, rotate: rotate ? -8 : 0, opacity: 0 },
        {
          scale: 1,
          rotate: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: ref.current, start: "top 85%" },
        }
      );
    }, ref);
    return () => ctx.revert();
  }, [reduced, rotate]);

  return (
    <span
      ref={ref}
      className={`inline-block bg-warm-yellow px-3 py-1 font-display text-coal ${className}`}
    >
      {children}
    </span>
  );
}
