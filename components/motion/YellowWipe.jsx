"use client";

import { useEffect, useRef } from "react";
import { registerGsap } from "@/lib/gsapSetup";
import useReducedMotion from "@/hooks/useReducedMotion";

export default function YellowWipe({ children, className = "" }) {
  const wrap = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!wrap.current || reduced) return;
    const { gsap } = registerGsap();
    const bg = wrap.current.querySelector("[data-wipe]");
    const ctx = gsap.context(() => {
      gsap.fromTo(
        bg,
        { scaleX: 0 },
        {
          scaleX: 1,
          transformOrigin: "left center",
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: wrap.current, start: "top 85%" },
        }
      );
    }, wrap);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <span ref={wrap} className={`relative inline-block px-2 py-0.5 ${className}`}>
      <span
        data-wipe
        className="absolute inset-0 origin-left bg-warm-yellow"
        aria-hidden="true"
        style={reduced ? { transform: "scaleX(1)" } : { transform: "scaleX(0)" }}
      />
      <span className="relative z-10 text-coal font-extrabold">{children}</span>
    </span>
  );
}
