"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { formatPrice, menu } from "@/data/balkansCorner";
import { registerGsap } from "@/lib/gsapSetup";
import useReducedMotion from "@/hooks/useReducedMotion";
import SectionLabel from "./SectionLabel";

export default function DrinksSection() {
  const root = useRef(null);
  const reduced = useReducedMotion();
  const drinks = menu.filter(
    (m) => m.category === "Drinks" || m.category === "Coffee"
  );

  useEffect(() => {
    if (!root.current || reduced) return;
    const { gsap } = registerGsap();
    const q = gsap.utils.selector(root);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        q("[data-drink-name]"),
        { x: -15, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          stagger: 0.06,
          duration: 0.55,
          ease: "power2.out",
          scrollTrigger: { trigger: root.current, start: "top 70%" },
        }
      );

      gsap.fromTo(
        q("[data-drink-img]"),
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: root.current, start: "top 70%" },
        }
      );

      gsap.fromTo(
        q("[data-line]"),
        { scaleX: 0 },
        {
          scaleX: 1,
          transformOrigin: "left",
          duration: 1.2,
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
      className="bg-[#2a2a2a] py-12 sm:py-16"
      aria-labelledby="drinks-heading"
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        <SectionLabel>Barista board</SectionLabel>
        <h2 id="drinks-heading" className="font-display mt-3 text-4xl leading-[0.95] text-bone sm:text-6xl">
          COFFEE.
          <br />
          COLD.
          <br />
          <span className="text-warm-yellow">DONE.</span>
        </h2>

        <div
          data-line
          className="mt-6 h-0.5 origin-left bg-warm-yellow"
          style={reduced ? undefined : { transform: "scaleX(0)" }}
          aria-hidden="true"
        />

        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_280px] lg:gap-8">
          <ul className="divide-y divide-white/10">
            {drinks.map((item) => (
              <li
                key={item.id}
                className="flex items-baseline justify-between gap-3 py-3 sm:gap-4"
              >
                <span data-drink-name className="min-w-0 font-display text-lg text-bone sm:text-2xl">
                  {item.name}
                </span>
                <span
                  className="price-yellow shrink-0 text-right font-display text-sm leading-tight sm:text-lg"
                  aria-label={formatPrice(item.price)}
                >
                  <span className="lg:hidden">{formatPrice(item.price, { compact: true })}</span>
                  <span className="hidden lg:inline">{formatPrice(item.price)}</span>
                </span>
              </li>
            ))}
          </ul>

          <div className="grid grid-cols-2 gap-3 lg:grid-cols-1">
            <div data-drink-img className="relative aspect-square overflow-hidden">
              <Image
                src="/images/balkans-corner/coffee.jpg"
                alt="Coffee cup"
                fill
                sizes="280px"
                className="object-cover"
              />
            </div>
            <div data-drink-img className="relative aspect-square overflow-hidden">
              <Image
                src="/images/balkans-corner/glass-bottle.jpg"
                alt="Cold bottled drink"
                fill
                sizes="280px"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
