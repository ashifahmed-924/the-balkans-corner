"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { formatPrice, getClassics } from "@/data/balkansCorner";
import { registerGsap } from "@/lib/gsapSetup";
import useReducedMotion from "@/hooks/useReducedMotion";
import SectionLabel from "./SectionLabel";
import GrillPattern from "./GrillPattern";

export default function BalkanClassics() {
  const classics = getClassics();
  const [active, setActive] = useState(0);
  const root = useRef(null);
  const imgA = useRef(null);
  const imgB = useRef(null);
  const showA = useRef(true);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !imgA.current || !imgB.current) return;
    const { gsap } = registerGsap();
    const next = showA.current ? imgB.current : imgA.current;
    const prev = showA.current ? imgA.current : imgB.current;
    gsap.set(next, { opacity: 0 });
    gsap.to(next, { opacity: 0.15, duration: 0.45, ease: "power2.out" });
    gsap.to(prev, { opacity: 0, duration: 0.45, ease: "power2.out" });
    showA.current = !showA.current;
  }, [active, reduced]);

  useEffect(() => {
    if (!root.current || reduced) return;
    const { gsap } = registerGsap();
    const rows = root.current.querySelectorAll("[data-row]");
    const ctx = gsap.context(() => {
      gsap.fromTo(
        rows,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.08,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: { trigger: root.current, start: "top 75%" },
        }
      );
    }, root);
    return () => ctx.revert();
  }, [reduced]);

  const activeItem = classics[active];

  return (
    <section
      id="classics"
      ref={root}
      className="relative overflow-hidden bg-bone py-12 text-coal sm:py-16"
      aria-labelledby="classics-heading"
    >
      <GrillPattern variant="balkan" className="text-coal" opacity={0.04} />

      <div className="pointer-events-none absolute inset-0 hidden lg:block" aria-hidden="true">
        <div ref={imgA} className="absolute inset-0 opacity-0">
          <Image
            src={activeItem?.image || "/images/balkans-corner/chevapi-plate.jpg"}
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div ref={imgB} className="absolute inset-0 opacity-0">
          <Image
            src={activeItem?.image || "/images/balkans-corner/chevapi-plate.jpg"}
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        <SectionLabel className="!text-grill-red">
          <span className="text-grill-red">Grill ticket index</span>
        </SectionLabel>
        <h2
          id="classics-heading"
          className="font-display mt-3 text-5xl leading-[0.9] sm:text-7xl lg:text-8xl"
        >
          NOT
          <br />
          JUST
          <br />
          BURGERS.
        </h2>

        <ul className="mt-8 divide-y divide-coal/15 border-y border-coal/15">
          {classics.map((item, i) => {
            const isActive = active === i;
            return (
              <li key={item.id} data-row>
                <button
                  type="button"
                  className={`group grid w-full grid-cols-[2.5rem_minmax(0,1fr)] items-start gap-2 py-3.5 text-left transition-colors sm:gap-6 sm:py-4 lg:grid-cols-[64px_minmax(0,1fr)_auto] ${
                    isActive ? "text-grill-red" : "text-coal"
                  }`}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                >
                  <span className="font-mono-tiny pt-2 text-smoke">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="min-w-0">
                    <span className="flex items-start justify-between gap-3 lg:block">
                      <span
                        className={`font-display flex min-w-0 items-center gap-2 text-xl sm:text-3xl ${
                          isActive ? "lg:translate-x-3" : ""
                        } transition-transform duration-300`}
                      >
                        {isActive && (
                          <span className="inline-block h-2 w-2 shrink-0 rounded-full bg-warm-yellow" />
                        )}
                        <span className="min-w-0">{item.name}</span>
                      </span>
                      <span
                        className={`shrink-0 text-right font-display text-sm leading-tight lg:hidden ${
                          isActive
                            ? "bg-warm-yellow px-2 py-1 text-coal"
                            : "text-coal"
                        }`}
                        aria-label={formatPrice(item.price)}
                      >
                        {formatPrice(item.price, { compact: true })}
                      </span>
                    </span>
                    <span className="mt-1 block w-full text-sm text-coal/65 lg:max-w-xl">
                      {item.description}
                    </span>
                  </span>
                  <span
                    className={`hidden whitespace-nowrap justify-self-end text-right font-display text-2xl leading-tight lg:block ${
                      isActive
                        ? "bg-warm-yellow px-2 py-1 text-coal"
                        : "text-coal"
                    }`}
                  >
                    {formatPrice(item.price)}
                  </span>
                </button>

                {isActive && (
                  <div className="relative mb-5 aspect-[16/9] overflow-hidden lg:hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="100vw"
                      className="object-cover"
                    />
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
