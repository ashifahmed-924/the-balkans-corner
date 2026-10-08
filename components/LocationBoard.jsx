"use client";

import { useEffect, useRef } from "react";
import { business } from "@/data/balkansCorner";
import { registerGsap } from "@/lib/gsapSetup";
import useReducedMotion from "@/hooks/useReducedMotion";
import GrillPattern from "./GrillPattern";

export default function LocationBoard() {
  const root = useRef(null);
  const reduced = useReducedMotion();
  const digits = business.phoneDisplay.replace(/\s/g, "").split("");

  useEffect(() => {
    if (!root.current || reduced) return;
    const { gsap } = registerGsap();
    const q = gsap.utils.selector(root);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        q("[data-num]"),
        { y: 36, opacity: 0.35 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: root.current, start: "top 70%" },
        }
      );

      gsap.fromTo(
        q("[data-street]"),
        { clipPath: "inset(0 100% 0 0)" },
        {
          clipPath: "inset(0 0% 0 0)",
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: { trigger: root.current, start: "top 70%" },
        }
      );

      gsap.fromTo(
        q("[data-route]"),
        { strokeDashoffset: 1000 },
        {
          strokeDashoffset: 0,
          duration: 1.4,
          ease: "power2.inOut",
          scrollTrigger: { trigger: root.current, start: "top 70%" },
        }
      );

      gsap.fromTo(
        q("[data-digit]"),
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.04,
          duration: 0.35,
          ease: "power2.out",
          scrollTrigger: { trigger: root.current, start: "top 70%" },
        }
      );
    }, root);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      id="visit"
      ref={root}
      className="relative overflow-hidden bg-coal py-12 sm:py-16"
      aria-labelledby="location-heading"
    >
      <GrillPattern variant="mesh" className="text-warm-yellow" opacity={0.05} />

      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        aria-hidden="true"
        viewBox="0 0 1200 400"
        preserveAspectRatio="none"
      >
        <path
          data-route
          d="M40 300 C 300 80, 600 360, 900 120 S 1150 280, 1180 200"
          fill="none"
          stroke="#FFC928"
          strokeWidth="2"
          strokeDasharray="1000"
          strokeDashoffset={reduced ? 0 : 1000}
          opacity="0.5"
        />
      </svg>

      <div className="relative z-10 mx-auto max-w-[1440px] px-4 text-center sm:px-6 lg:px-10">
        <p className="font-mono-tiny text-warm-yellow">TAKEAWAY ORDER BOARD</p>
        <p
          data-num
          className="font-display mx-auto mt-4 w-full max-w-full text-[clamp(5.5rem,28vw,10rem)] leading-none text-warm-yellow"
        >
          27
        </p>
        <h2
          id="location-heading"
          data-street
          className="font-display text-[clamp(2rem,8vw,3.75rem)] text-bone"
          style={reduced ? undefined : { clipPath: "inset(0 100% 0 0)" }}
        >
          BRYANTS RD
        </h2>
        <p className="mt-3 font-display text-xl text-bone/80 sm:text-3xl">
          DANDENONG
          <br />
          VIC 3175
        </p>

        <a
          href={business.phoneHref}
          className="mt-5 inline-flex max-w-full flex-wrap justify-center gap-1 font-display text-xl text-warm-yellow sm:text-3xl"
          data-cursor="GO"
        >
          {digits.map((d, i) => (
            <span key={`${d}-${i}`} data-digit>
              {d}
            </span>
          ))}
        </a>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <a
            href={business.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            data-cursor="GO"
          >
            DIRECTIONS
          </a>
          <a href={business.phoneHref} className="btn-secondary" data-cursor="GO">
            CALL
          </a>
        </div>
      </div>
    </section>
  );
}
