"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { formatPrice, menu } from "@/data/balkansCorner";
import { registerGsap } from "@/lib/gsapSetup";
import useReducedMotion from "@/hooks/useReducedMotion";
import GrillPattern from "./GrillPattern";

export default function CevapiRollFeature() {
  const root = useRef(null);
  const reduced = useReducedMotion();
  const item = menu.find((m) => m.id === "cevapi-roll");

  useEffect(() => {
    if (!root.current || reduced) return;
    const { gsap } = registerGsap();
    const q = gsap.utils.selector(root);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        q("[data-img]"),
        { rotate: -5 },
        {
          rotate: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: root.current, start: "top 70%" },
        }
      );
      gsap.fromTo(
        q("[data-headline]"),
        { scaleX: 0.8 },
        {
          scaleX: 1,
          transformOrigin: "left",
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: { trigger: root.current, start: "top 70%" },
        }
      );
      gsap.fromTo(
        q("[data-sticker]"),
        { scale: 0.5, rotate: 12 },
        {
          scale: 1,
          rotate: -3,
          duration: 0.7,
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
      className="relative overflow-hidden bg-warm-yellow py-12 text-coal sm:py-16"
      aria-labelledby="roll-heading"
    >
      <GrillPattern variant="wrapper" className="text-coal" opacity={0.06} />

      <div className="relative z-10 mx-auto grid max-w-[1440px] items-center gap-6 px-4 sm:px-6 lg:grid-cols-2 lg:gap-8 lg:px-10">
        <div>
          <span
            data-sticker
            className="inline-block rotate-[-3deg] bg-hot-red px-3 py-1 font-display text-sm text-bone"
          >
            BALKAN CLASSIC
          </span>
          <h2
            id="roll-heading"
            data-headline
            className="font-display mt-4 text-[clamp(3.5rem,16vw,7rem)] leading-[0.85]"
          >
            ROLL IT.
          </h2>
          <p className="mt-4 font-display text-2xl">{item?.name}</p>
          <p className="mt-2 max-w-md text-coal/75">{item?.description}</p>
          <p className="mt-5 font-display text-4xl text-grill-red">
            {formatPrice(item?.price)}
          </p>
        </div>

        <div data-img className="relative mx-auto aspect-square w-full max-w-lg overflow-hidden">
          <Image
            src="/images/balkans-corner/cevapi-roll.jpg"
            alt="Cevapi roll with cabbage slaw and sauce"
            fill
            sizes="(max-width: 1024px) 100vw, 40vw"
            className="object-cover"
            data-cursor="EAT"
          />
        </div>
      </div>
    </section>
  );
}
