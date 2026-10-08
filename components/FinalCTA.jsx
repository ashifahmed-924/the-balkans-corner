"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { business } from "@/data/balkansCorner";
import { registerGsap } from "@/lib/gsapSetup";
import useReducedMotion from "@/hooks/useReducedMotion";

export default function FinalCTA() {
  const root = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!root.current || reduced) return;
    const { gsap } = registerGsap();
    const q = gsap.utils.selector(root);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        q("[data-hungry]"),
        { letterSpacing: "0.22em" },
        {
          letterSpacing: "0.02em",
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: root.current, start: "top 70%" },
        }
      );
      gsap.fromTo(
        q("[data-food]"),
        { y: 100, rotate: 5 },
        {
          y: 0,
          rotate: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: root.current, start: "top 70%" },
        }
      );
      gsap.fromTo(
        q("[data-cta]"),
        { scale: 0.9 },
        {
          scale: 1,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: { trigger: root.current, start: "top 70%" },
        }
      );
      gsap.fromTo(
        q("[data-glow]"),
        { scale: 0.8 },
        {
          scale: 1,
          duration: 1.1,
          ease: "power2.out",
          scrollTrigger: { trigger: root.current, start: "top 70%" },
        }
      );
    }, root);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      ref={root}
      className="relative overflow-hidden py-14 sm:py-20"
      aria-labelledby="cta-heading"
    >
      <div data-glow className="glow-red absolute inset-0" aria-hidden="true" />

      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-4 pb-16 text-center sm:px-6 sm:pb-20 lg:px-10">
        <h2
          id="cta-heading"
          data-hungry
          className="font-display text-[clamp(3.25rem,14vw,8rem)] leading-none text-bone"
        >
          HUNGRY?
        </h2>
        <p className="mt-4 font-display text-xl text-warm-yellow sm:text-4xl">
          BURGERS. CHEVAPI. GRILL.
        </p>

        <div className="mt-6 flex flex-col items-stretch justify-center gap-3 min-[480px]:flex-row min-[480px]:flex-wrap min-[480px]:items-center">
          <a href="#menu" data-cta className="btn-primary" data-cursor="VIEW">
            SEE THE MENU
          </a>
          <a
            href={business.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
            data-cursor="GO"
          >
            GET DIRECTIONS
          </a>
          <a href={business.phoneHref} className="btn-secondary">
            CALL NOW
          </a>
        </div>
      </div>

      <div
        data-food
        className="pointer-events-none absolute -bottom-10 right-0 w-[50%] max-w-sm sm:w-[42%] sm:max-w-lg lg:right-[-6%] lg:max-w-xl"
      >
        <div className="relative aspect-square">
          <Image
            src="/images/balkans-corner/cta-food.jpg"
            alt=""
            fill
            sizes="45vw"
            className="object-contain drop-shadow-2xl"
          />
        </div>
      </div>
    </section>
  );
}
