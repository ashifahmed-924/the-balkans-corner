"use client";

import { useEffect, useRef } from "react";
import { registerGsap } from "@/lib/gsapSetup";
import useReducedMotion from "@/hooks/useReducedMotion";

export default function ImageReveal({ children, className = "", from = "bottom" }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!ref.current || reduced) return;
    const { gsap } = registerGsap();
    const clip =
      from === "bottom"
        ? { clipPath: "inset(100% 0 0 0)" }
        : from === "top"
          ? { clipPath: "inset(0 0 100% 0)" }
          : from === "left"
            ? { clipPath: "inset(0 100% 0 0)" }
            : { clipPath: "inset(0 0 0 100%)" };

    const ctx = gsap.context(() => {
      gsap.fromTo(ref.current, clip, {
        clipPath: "inset(0 0 0 0)",
        duration: 1.15,
        ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 80%" },
      });
    }, ref);
    return () => ctx.revert();
  }, [from, reduced]);

  return (
    <div
      ref={ref}
      className={`overflow-hidden ${className}`}
      style={reduced ? undefined : { clipPath: "inset(100% 0 0 0)" }}
    >
      {children}
    </div>
  );
}
