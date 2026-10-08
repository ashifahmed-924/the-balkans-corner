"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { formatPrice, menu } from "@/data/balkansCorner";
import { registerGsap } from "@/lib/gsapSetup";
import useReducedMotion from "@/hooks/useReducedMotion";

const ids = ["hot-chips", "potato-cake", "chicken-tender", "dim-sim"];

export default function SmallBites() {
  const root = useRef(null);
  const reduced = useReducedMotion();
  const items = ids.map((id) => menu.find((m) => m.id === id)).filter(Boolean);

  useEffect(() => {
    if (!root.current || reduced) return;
    const { gsap } = registerGsap();
    const blocks = root.current.querySelectorAll("[data-bite]");

    const ctx = gsap.context(() => {
      blocks.forEach((block) => {
        const price = block.querySelector("[data-price]");
        const img = block.querySelector("[data-img]");
        const tag = block.querySelector("[data-tag]");

        gsap.fromTo(
          price,
          { scale: 1 },
          {
            scale: 1.15,
            duration: 0.35,
            yoyo: true,
            repeat: 1,
            ease: "power2.out",
            scrollTrigger: { trigger: block, start: "top 75%" },
          }
        );

        gsap.fromTo(
          img,
          { yPercent: 6 },
          {
            yPercent: -4,
            ease: "none",
            scrollTrigger: {
              trigger: block,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );

        gsap.fromTo(
          tag,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.45,
            ease: "power3.out",
            scrollTrigger: { trigger: block, start: "top 75%" },
          }
        );
      });
    }, root);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      ref={root}
      className="bg-steel py-12 sm:py-16"
      aria-labelledby="bites-heading"
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        <h2 id="bites-heading" className="font-display text-4xl text-bone sm:text-6xl">
          SMALL
          <span className="text-warm-yellow"> BITES</span>
        </h2>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {items.map((item) => (
            <article
              key={item.id}
              data-bite
              className="relative min-h-[280px] overflow-hidden bg-charcoal"
            >
              <div data-img className="absolute inset-0">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover opacity-50"
                />
              </div>
              <span
                data-tag
                className="absolute right-3 top-3 bg-warm-yellow px-2 py-1 text-[10px] font-extrabold tracking-wider text-coal"
                style={reduced ? undefined : { transform: "scale(0)", opacity: 0 }}
              >
                SIDE
              </span>
              <div className="relative z-10 flex h-full min-h-[280px] flex-col justify-end p-6">
                <h3 className="font-display text-3xl text-bone sm:text-4xl">{item.name}</h3>
                <p data-price className="price-yellow mt-2 font-display text-3xl origin-left">
                  {formatPrice(item.price)}
                  {(item.id === "potato-cake" ||
                    item.id === "chicken-tender" ||
                    item.id === "dim-sim") && (
                    <span className="ml-2 text-sm font-bold text-bone/60">each</span>
                  )}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
