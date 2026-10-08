"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import DrawGrillLines from "./motion/DrawGrillLines";
import GrillPattern from "./GrillPattern";
import { formatPrice, menu } from "@/data/balkansCorner";
import { registerGsap } from "@/lib/gsapSetup";
import useReducedMotion from "@/hooks/useReducedMotion";

export default function ChevapiFeature() {
  const root = useRef(null);
  const reduced = useReducedMotion();
  const item = menu.find((m) => m.id === "chevapi-plate");

  useEffect(() => {
    if (!root.current || reduced) return;
    const { gsap } = registerGsap();
    const q = gsap.utils.selector(root);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        q("[data-img]"),
        { scale: 0.9 },
        {
          scale: 1,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: { trigger: root.current, start: "top 70%" },
        }
      );

      gsap.fromTo(
        q("[data-ten]"),
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          scrollTrigger: { trigger: root.current, start: "top 70%" },
        }
      );

      gsap.fromTo(
        q("[data-hot]"),
        { x: -80, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.7,
          delay: 0.15,
          ease: "power3.out",
          scrollTrigger: { trigger: root.current, start: "top 70%" },
        }
      );

      gsap.fromTo(
        q("[data-off]"),
        { clipPath: "inset(100% 0 0 0)" },
        {
          clipPath: "inset(0% 0 0 0)",
          duration: 0.8,
          delay: 0.25,
          ease: "power3.out",
          scrollTrigger: { trigger: root.current, start: "top 70%" },
        }
      );
    }, root);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      ref={root}
      className="relative overflow-hidden py-12 sm:py-16"
      style={{
        background:
          "radial-gradient(circle at 40% 40%, rgba(221,32,40,.95), rgba(111,9,13,.85) 50%, #0B0B0B 85%)",
      }}
      aria-labelledby="chevapi-heading"
    >
      <GrillPattern variant="grill" className="text-warm-yellow" opacity={0.1} />
      <DrawGrillLines count={10} />

      <div className="relative z-10 mx-auto grid max-w-[1440px] items-center gap-6 px-4 sm:px-6 lg:grid-cols-2 lg:gap-8 lg:px-10">
        <div>
          <p className="font-mono-tiny text-warm-yellow">SIGNATURE PLATE</p>
          <h2 id="chevapi-heading" className="font-display mt-3 leading-[0.88] text-bone">
            <span data-ten className="block text-[clamp(2.75rem,12vw,6rem)] sm:text-8xl">
              TEN.
            </span>
            <span data-hot className="block text-[clamp(2.75rem,12vw,6rem)] text-warm-yellow sm:text-8xl">
              HOT.
            </span>
            <span
              data-off
              className="mt-1 block text-[clamp(2.25rem,10vw,4.5rem)] sm:text-7xl"
              style={reduced ? undefined : { clipPath: "inset(100% 0 0 0)" }}
            >
              OFF THE GRILL.
            </span>
          </h2>
          <p className="mt-6 font-display text-2xl text-bone">{item?.name}</p>
          <p className="mt-2 max-w-md text-bone/80">{item?.description}</p>
          <p className="price-yellow mt-5 font-display text-4xl">
            {formatPrice(item?.price)}
          </p>
        </div>

        <div data-img className="relative aspect-square overflow-hidden sm:aspect-[4/3]">
          <Image
            src="/images/balkans-corner/chevapi-plate.jpg"
            alt="Chevapi plate with bread, chips and cabbage slaw"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
            data-cursor="EAT"
          />
        </div>
      </div>
    </section>
  );
}
