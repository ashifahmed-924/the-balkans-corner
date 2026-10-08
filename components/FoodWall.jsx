"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gallery } from "@/data/balkansCorner";
import { registerGsap } from "@/lib/gsapSetup";
import useReducedMotion from "@/hooks/useReducedMotion";
import SectionLabel from "./SectionLabel";

const rowA = gallery.filter((_, i) => i % 2 === 0);
const rowB = gallery.filter((_, i) => i % 2 === 1);

const tilts = [-2.5, 1.5, -1, 2, -1.8, 1.2, -2, 0.8, 1.6];

function tileSize(item) {
  if (item.w === "tall") return "h-32 w-24 sm:h-40 sm:w-28 lg:h-44 lg:w-32";
  if (item.w === "wide") return "h-32 w-44 sm:h-40 sm:w-52 lg:h-44 lg:w-56";
  return "h-32 w-32 sm:h-40 sm:w-40 lg:h-44 lg:w-44";
}

function Rail({ items, direction, reduced, offsetClass = "" }) {
  const track = useRef(null);
  const loop = [...items, ...items, ...items];

  useEffect(() => {
    if (!track.current || reduced) return;
    const { gsap } = registerGsap();
    const el = track.current;
    let tween;

    const start = () => {
      const segment = el.scrollWidth / 3;
      if (segment < 10) return;

      gsap.set(el, { x: direction === "left" ? 0 : -segment });
      tween = gsap.to(el, {
        x: direction === "left" ? -segment : 0,
        duration: direction === "left" ? 26 : 32,
        ease: "none",
        repeat: -1,
      });
    };

    const frame = requestAnimationFrame(() => requestAnimationFrame(start));

    const pause = () => tween?.pause();
    const play = () => tween?.play();
    el.addEventListener("pointerenter", pause);
    el.addEventListener("pointerleave", play);

    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener("pointerenter", pause);
      el.removeEventListener("pointerleave", play);
      tween?.kill();
    };
  }, [direction, reduced, items]);

  return (
    <div className={`overflow-hidden ${offsetClass}`}>
      <div
        ref={track}
        className="flex w-max gap-2.5 will-change-transform sm:gap-3.5"
        data-rail
      >
        {loop.map((item, i) => {
          const tilt = tilts[i % tilts.length];
          return (
            <figure
              key={`${item.id}-${i}`}
              className={`group relative shrink-0 overflow-hidden border border-white/10 bg-charcoal ${tileSize(item)}`}
              style={{ transform: `rotate(${tilt}deg)` }}
            >
              <div
                data-tile
                className="absolute inset-0"
                style={reduced ? undefined : { clipPath: "inset(14% 14% 14% 14%)" }}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="220px"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                />
              </div>
            </figure>
          );
        })}
      </div>
    </div>
  );
}

function StaticBrick() {
  return (
    <div className="mt-6 columns-2 gap-2.5 sm:columns-3 sm:gap-3 lg:columns-4 lg:gap-3.5">
      {gallery.map((item, i) => {
        const tilt = tilts[i % tilts.length];
        const tall = item.w === "tall" || i % 5 === 2;
        return (
          <figure
            key={item.id}
            className={`relative mb-2.5 break-inside-avoid overflow-hidden border border-white/10 bg-charcoal sm:mb-3.5 ${
              tall ? "aspect-[3/4]" : i % 3 === 0 ? "aspect-[4/3]" : "aspect-square"
            }`}
            style={{ transform: `rotate(${tilt * 0.35}deg)` }}
          >
            <Image
              src={item.src}
              alt={item.alt}
              fill
              sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 22vw"
              className="object-cover"
            />
          </figure>
        );
      })}
    </div>
  );
}

export default function FoodWall() {
  const root = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!root.current || reduced) return;
    const { gsap } = registerGsap();
    const q = gsap.utils.selector(root);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        q("[data-rail-wrap]"),
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          stagger: 0.16,
          ease: "power3.out",
          scrollTrigger: { trigger: root.current, start: "top 75%" },
        }
      );

      gsap.fromTo(
        q("[data-tile]"),
        { clipPath: "inset(14% 14% 14% 14%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 0.7,
          stagger: { each: 0.05, from: "random" },
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
      className="overflow-x-clip bg-soft-black py-12 sm:py-16"
      aria-labelledby="wall-heading"
    >
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-10">
        <SectionLabel>Order wall</SectionLabel>
        <h2 id="wall-heading" className="font-display mt-3 text-4xl text-bone sm:text-6xl">
          FOOD
          <span className="text-radiant-red"> WALL</span>
        </h2>
        <p className="mt-3 max-w-lg text-sm text-bone/65">
          Fresh off the grill — pinned like tickets on the counter wall.
        </p>
      </div>

      {reduced ? (
        <div className="mx-auto mt-2 w-full max-w-[960px] px-4 sm:px-6 lg:px-10">
          <StaticBrick />
        </div>
      ) : (
        <div className="mt-8 space-y-3.5 sm:mt-10 sm:space-y-4">
          <div data-rail-wrap>
            <Rail items={rowA} direction="left" reduced={reduced} />
          </div>
          <div data-rail-wrap>
            <Rail
              items={rowB.length ? rowB : rowA}
              direction="right"
              reduced={reduced}
              offsetClass="pl-10 sm:pl-20"
            />
          </div>
        </div>
      )}
    </section>
  );
}
