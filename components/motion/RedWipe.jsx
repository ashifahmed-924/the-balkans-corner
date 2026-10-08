"use client";

import { useEffect, useRef } from "react";
import { registerGsap } from "@/lib/gsapSetup";
import useReducedMotion from "@/hooks/useReducedMotion";

export default function RedWipe({ children, className = "" }) {
  const wrap = useRef(null);
  const mask = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!wrap.current || !mask.current || reduced) return;
    const { gsap } = registerGsap();
    const ctx = gsap.context(() => {
      gsap.fromTo(
        mask.current,
        { scaleX: 1 },
        {
          scaleX: 0,
          transformOrigin: "right center",
          duration: 1.1,
          ease: "power3.inOut",
          scrollTrigger: { trigger: wrap.current, start: "top 75%" },
        }
      );
    }, wrap);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <div ref={wrap} className={`relative overflow-hidden ${className}`}>
      {children}
      {!reduced && (
        <div
          ref={mask}
          className="pointer-events-none absolute inset-0 origin-right bg-hot-red"
          aria-hidden="true"
        />
      )}
    </div>
  );
}
