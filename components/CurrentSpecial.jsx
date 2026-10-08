"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { specials } from "@/data/balkansCorner";
import { registerGsap } from "@/lib/gsapSetup";
import useReducedMotion from "@/hooks/useReducedMotion";

export default function CurrentSpecial() {
  const root = useRef(null);
  const reduced = useReducedMotion();
  const special = specials[0];

  useEffect(() => {
    if (!root.current || reduced || !special) return;
    const { gsap } = registerGsap();
    const q = gsap.utils.selector(root);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        q("[data-ticket]"),
        { y: 60, rotate: -4, opacity: 0 },
        {
          y: 0,
          rotate: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: root.current, start: "top 75%" },
        }
      );
    }, root);

    return () => ctx.revert();
  }, [reduced, special]);

  if (!special) {
    return (
      <section className="bg-grill-red py-12" aria-labelledby="grill-heading">
        <div className="mx-auto max-w-[1440px] px-4 text-center sm:px-6">
          <h2 id="grill-heading" className="font-display text-5xl text-bone">
            WHAT&apos;S ON THE GRILL
          </h2>
          <p className="mt-4 text-bone/80">Check the menu board for today&apos;s specials.</p>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={root}
      className="relative overflow-hidden bg-hot-red py-12 sm:py-16"
      aria-labelledby="special-heading"
    >
      <div className="mx-auto grid max-w-[1440px] items-center gap-6 px-4 sm:px-6 lg:grid-cols-2 lg:gap-8 lg:px-10">
        <div
          data-ticket
          className="relative min-w-0 bg-warm-yellow p-6 text-coal shadow-2xl sm:p-12"
          style={reduced ? undefined : { opacity: 0 }}
        >
          <p className="font-mono-tiny text-grill-red">CURRENT SPECIAL</p>
          <h2 id="special-heading" className="font-display mt-3 text-[clamp(2.25rem,10vw,4.5rem)] leading-none sm:text-7xl">
            {special.headline}
          </h2>
          <p className="mt-6 font-display text-2xl sm:text-3xl">{special.name}</p>
          <p className="mt-3 max-w-md text-coal/80">{special.description}</p>
          <p className="mt-4 text-sm font-bold uppercase tracking-wider">
            Availability: {special.availability}
          </p>
          <p className="mt-2 text-xs text-coal/55">Source: {special.source}</p>
          <p className="mt-6 font-display text-2xl">See current menu</p>
        </div>

        <div className="relative aspect-square overflow-hidden sm:aspect-[4/3]">
          <Image
            src={special.image}
            alt={special.name}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
