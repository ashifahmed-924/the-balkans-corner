"use client";

import { useEffect, useRef } from "react";
import { registerGsap } from "@/lib/gsapSetup";
import useReducedMotion from "@/hooks/useReducedMotion";

export default function TextClip({
  children,
  direction = "left",
  className = "",
  delay = 0,
  trigger,
}) {
  const ref = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!ref.current || reduced) return;
    const { gsap } = registerGsap();
    const el = ref.current;
    const from =
      direction === "left"
        ? { clipPath: "inset(0 100% 0 0)" }
        : direction === "right"
          ? { clipPath: "inset(0 0 0 100%)" }
          : direction === "up"
            ? { clipPath: "inset(100% 0 0 0)" }
            : { clipPath: "inset(0 0 100% 0)" };

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        from,
        {
          clipPath: "inset(0 0 0 0)",
          duration: 1,
          delay,
          ease: "power3.out",
          scrollTrigger: trigger
            ? { trigger: trigger.current || el, start: "top 80%" }
            : undefined,
        }
      );
    }, el);

    return () => ctx.revert();
  }, [direction, delay, reduced, trigger]);

  return (
    <div ref={ref} className={className} style={reduced ? undefined : { clipPath: "inset(0 100% 0 0)" }}>
      {children}
    </div>
  );
}
