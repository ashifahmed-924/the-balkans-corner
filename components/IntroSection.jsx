"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import SectionLabel from "./SectionLabel";
import { registerGsap } from "@/lib/gsapSetup";
import useReducedMotion from "@/hooks/useReducedMotion";

const introImages = [
  {
    src: "/images/balkans-corner/intro-spread.jpg",
    alt: "Grill plates and burgers arranged on a dark table",
    className: "aspect-[4/3] sm:col-span-2 sm:aspect-[16/10] lg:col-span-2 lg:row-span-2 lg:aspect-auto lg:min-h-full",
    from: "left",
  },
  {
    src: "/images/balkans-corner/storefront.jpg",
    alt: "The Balkans Corner storefront on Bryants Road",
    className: "aspect-[4/3] lg:aspect-auto lg:min-h-[200px]",
    from: "top",
  },
  {
    src: "/images/balkans-corner/interior.jpg",
    alt: "Warm seating inside The Balkans Corner",
    className: "aspect-[4/3] sm:col-span-2 lg:col-span-1 lg:aspect-auto lg:min-h-[220px]",
    from: "right",
  },
];

function clipFrom(from) {
  if (from === "top") return "inset(0 0 100% 0)";
  if (from === "right") return "inset(0 0 0 100%)";
  if (from === "bottom") return "inset(100% 0 0 0)";
  return "inset(0 100% 0 0)";
}

export default function IntroSection() {
  const root = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!root.current || reduced) return;
    const { gsap } = registerGsap();
    const q = gsap.utils.selector(root);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        q("[data-line]"),
        { scaleY: 0 },
        {
          scaleY: 1,
          transformOrigin: "top",
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: { trigger: root.current, start: "top 70%" },
        }
      );

      gsap.fromTo(
        q("[data-line-text]"),
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: root.current, start: "top 70%" },
        }
      );

      gsap.fromTo(
        q("[data-body]"),
        { opacity: 0, filter: "blur(8px)" },
        {
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.9,
          delay: 0.2,
          scrollTrigger: { trigger: root.current, start: "top 70%" },
        }
      );

      q("[data-frame]").forEach((frame, i) => {
        const from = frame.getAttribute("data-from") || "left";
        const img = frame.querySelector("[data-img]");
        const mask = frame.querySelector("[data-mask]");

        gsap.fromTo(
          img,
          { clipPath: clipFrom(from), scale: 1.08 },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            scale: 1,
            duration: 1.15,
            delay: i * 0.12,
            ease: "power3.out",
            scrollTrigger: { trigger: q("[data-gallery]")[0], start: "top 78%" },
          }
        );

        if (mask) {
          gsap.fromTo(
            mask,
            { scaleX: 1 },
            {
              scaleX: 0,
              transformOrigin: i % 2 === 0 ? "right" : "left",
              duration: 1.05,
              delay: i * 0.1,
              ease: "power3.inOut",
              scrollTrigger: { trigger: q("[data-gallery]")[0], start: "top 78%" },
            }
          );
        }
      });

      gsap.to(q("[data-parallax]"), {
        yPercent: (i) => (i % 2 === 0 ? -8 : 10),
        ease: "none",
        scrollTrigger: {
          trigger: q("[data-gallery]")[0],
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, root);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section ref={root} className="overflow-x-clip bg-coal py-12 sm:py-16" aria-labelledby="intro-heading">
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-10">
        <div className="grid min-w-0 gap-6 lg:grid-cols-[80px_minmax(0,1fr)_minmax(0,1fr)] lg:gap-8">
          <div className="relative flex items-start gap-4">
            <span className="font-display text-5xl text-warm-yellow">01</span>
            <span
              data-line
              className="mt-2 hidden h-24 w-0.5 origin-top bg-warm-yellow lg:block"
              style={{ transform: reduced ? "scaleY(1)" : "scaleY(0)" }}
              aria-hidden="true"
            />
          </div>

          <h2 id="intro-heading" className="font-display min-w-0 text-[clamp(2.25rem,8vw,4.5rem)] leading-[0.95] text-bone">
            <span data-line-text className="block">
              FROM
            </span>
            <span data-line-text className="block text-radiant-red">
              THE BALKANS
            </span>
            <span data-line-text className="block">
              TO DANDENONG.
            </span>
          </h2>

          <div data-body className="flex flex-col justify-end">
            <SectionLabel className="mb-4">Bryants Road</SectionLabel>
            <p className="max-w-md text-lg leading-relaxed text-bone/80">
              The Balkans Corner brings burgers, chevapi, grilled meats and
              Balkan-style plates to Bryants Road in Dandenong.
            </p>
          </div>
        </div>

        <div
          data-gallery
          className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 lg:grid-rows-[minmax(200px,1fr)_minmax(220px,1fr)] lg:gap-4"
        >
          {introImages.map((item, i) => (
            <figure
              key={item.src}
              data-frame
              data-from={item.from}
              className={`relative min-w-0 overflow-hidden ${item.className}`}
            >
              <div
                data-parallax={i > 0 ? "" : undefined}
                className="absolute inset-0 will-change-transform"
              >
                <div
                  data-img
                  className="absolute inset-0"
                  style={
                    reduced
                      ? undefined
                      : { clipPath: clipFrom(item.from), transform: "scale(1.08)" }
                  }
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 55vw"
                    className="object-cover"
                    priority={i === 0}
                  />
                </div>
              </div>
              {!reduced && (
                <div
                  data-mask
                  className={`absolute inset-0 ${
                    i === 0 ? "bg-hot-red" : i === 1 ? "bg-warm-yellow" : "bg-grill-red"
                  }`}
                  aria-hidden="true"
                />
              )}
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
