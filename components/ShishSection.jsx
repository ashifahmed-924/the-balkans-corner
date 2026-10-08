"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import YellowWipe from "./motion/YellowWipe";
import { formatPrice, menu } from "@/data/balkansCorner";
import { registerGsap } from "@/lib/gsapSetup";
import useReducedMotion from "@/hooks/useReducedMotion";

export default function ShishSection() {
  const root = useRef(null);
  const reduced = useReducedMotion();
  const lamb = menu.find((m) => m.id === "lamb-shish");
  const chicken = menu.find((m) => m.id === "chicken-shish");

  useEffect(() => {
    if (!root.current || reduced) return;
    const { gsap } = registerGsap();
    const q = gsap.utils.selector(root);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        q("[data-left]"),
        { clipPath: "inset(100% 0 0 0)" },
        {
          clipPath: "inset(0% 0 0 0)",
          duration: 1.15,
          ease: "power3.out",
          scrollTrigger: { trigger: root.current, start: "top 70%" },
        }
      );
      gsap.fromTo(
        q("[data-right]"),
        { clipPath: "inset(0 0 100% 0)" },
        {
          clipPath: "inset(0 0 0% 0)",
          duration: 1.15,
          ease: "power3.out",
          scrollTrigger: { trigger: root.current, start: "top 70%" },
        }
      );
      gsap.fromTo(
        q("[data-divider]"),
        { scaleY: 0 },
        {
          scaleY: 1,
          transformOrigin: "top",
          duration: 0.9,
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
      className="relative bg-coal py-12 sm:py-16"
      aria-labelledby="shish-heading"
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        <h2 id="shish-heading" className="font-display mb-6 text-4xl text-bone sm:text-6xl">
          SHISH
          <span className="text-radiant-red"> GRILL</span>
        </h2>

        <div className="relative grid gap-6 lg:grid-cols-2 lg:gap-0">
          <article className="relative">
            <div
              data-left
              className="relative aspect-[4/3] max-h-[420px] overflow-hidden sm:max-h-[480px]"
              style={reduced ? undefined : { clipPath: "inset(100% 0 0 0)" }}
            >
              <Image
                src="/images/balkans-corner/lamb-shish.jpg"
                alt="Lamb shish plate"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="mt-5">
              <h3 className="font-display text-3xl text-bone">{lamb?.name}</h3>
              <p className="mt-2 max-w-md text-sm text-bone/70">{lamb?.description}</p>
              <div className="mt-4">
                <YellowWipe>{formatPrice(lamb?.price)}</YellowWipe>
              </div>
            </div>
          </article>

          <div
            data-divider
            className="pointer-events-none absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-radiant-red to-transparent shadow-[0_0_12px_#F13B34] lg:block"
            style={{ transform: reduced ? undefined : "scaleY(0)" }}
            aria-hidden="true"
          />

          <article className="relative lg:pl-10">
            <div
              data-right
              className="relative aspect-[4/3] max-h-[420px] overflow-hidden sm:max-h-[480px]"
              style={reduced ? undefined : { clipPath: "inset(0 0 100% 0)" }}
            >
              <Image
                src="/images/balkans-corner/chicken-shish.jpg"
                alt="Chicken shish plate"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="mt-5">
              <h3 className="font-display text-3xl text-bone">{chicken?.name}</h3>
              <p className="mt-2 max-w-md text-sm text-bone/70">{chicken?.description}</p>
              <div className="mt-4">
                <YellowWipe>{formatPrice(chicken?.price)}</YellowWipe>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
