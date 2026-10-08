"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { registerGsap } from "@/lib/gsapSetup";
import useReducedMotion from "@/hooks/useReducedMotion";

export default function HeroBillboard() {
  const root = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!root.current) return;
    const { gsap } = registerGsap();
    const q = gsap.utils.selector(root);

    if (reduced) {
      gsap.set(q("[data-hero]"), { clearProps: "all", opacity: 1, x: 0, scale: 1, rotate: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        q("[data-glow]"),
        { scale: 0.8, opacity: 0.7 },
        { scale: 1, opacity: 1, duration: 0.7 },
        0
      )
        .fromTo(
          q("[data-balkan]"),
          { clipPath: "inset(0 100% 0 0)" },
          { clipPath: "inset(0 0% 0 0)", duration: 0.55 },
          0.15
        )
        .fromTo(
          q("[data-grill]"),
          { clipPath: "inset(100% 0 0 0)" },
          { clipPath: "inset(0% 0 0 0)", duration: 0.55 },
          0.35
        )
        .fromTo(
          q("[data-burgers]"),
          { letterSpacing: "0.12em", opacity: 0 },
          { letterSpacing: "0.01em", opacity: 1, duration: 0.55 },
          0.55
        )
        .fromTo(
          q("[data-burger-img]"),
          { x: 120, rotate: 5, scale: 1.12 },
          { x: 0, rotate: 0, scale: 1, duration: 0.85 },
          0.35
        )
        .fromTo(
          q("[data-cta-bg]"),
          { scaleX: 0 },
          { scaleX: 1, transformOrigin: "left", duration: 0.4 },
          0.95
        )
        .fromTo(q("[data-cta-text]"), { opacity: 0 }, { opacity: 1, duration: 0.3 }, 1.2)
        .fromTo(
          q("[data-label]"),
          { y: 16, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.08, duration: 0.4 },
          1.15
        );

      gsap.to(q("[data-burger-img]"), {
        yPercent: -6,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
      gsap.to(q("[data-glow]"), {
        scale: 1.1,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
      gsap.to(q("[data-balkan]"), {
        xPercent: -3,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
      gsap.to(q("[data-grill]"), {
        xPercent: 2,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
      gsap.to(q("[data-burgers]"), {
        x: 20,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, root);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      id="top"
      ref={root}
      className="relative min-h-[100svh] overflow-hidden bg-coal texture-charcoal"
      aria-label="Hero"
    >
      <div
        data-glow
        data-hero
        className="glow-red absolute inset-0 opacity-90"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto grid min-h-[100svh] w-full max-w-[1440px] items-center gap-5 px-4 pb-10 pt-24 sm:gap-6 sm:px-6 sm:pb-12 sm:pt-28 lg:grid-cols-[1fr_1.1fr] lg:px-10 lg:pb-8">
        <div className="order-1 min-w-0 lg:order-none">
          <p
            data-label
            data-hero
            className="font-mono-tiny mb-4 text-warm-yellow"
          >
            DANDENONG · VIC
          </p>

          <h1 className="font-display leading-[0.85] text-bone">
            <span
              data-balkan
              data-hero
              className="block text-[clamp(3.25rem,15vw,7.5rem)]"
            >
              BALKAN
            </span>
            <span
              data-grill
              data-hero
              className="block text-[clamp(3.25rem,15vw,7.5rem)]"
            >
              GRILL
            </span>
          </h1>

          <p
            data-burgers
            data-hero
            className="font-display mt-2 text-[clamp(2.5rem,12vw,6rem)] leading-none text-outline-yellow"
          >
            BURGERS
          </p>

          <p data-label data-hero className="mt-5 max-w-md text-base text-bone/80 sm:text-lg">
            Balkan classics. Burgers. Grill plates.
          </p>

          <div className="mt-6 flex flex-col gap-3 min-[400px]:flex-row">
            <a href="#menu" className="btn-primary relative w-full min-[400px]:w-auto" data-cursor="VIEW">
              <span data-cta-bg className="absolute inset-0 origin-left bg-warm-yellow" aria-hidden="true" />
              <span data-cta-text className="relative z-10">
                SEE THE MENU
              </span>
            </a>
            <a
              href="#visit"
              className="btn-secondary w-full min-[400px]:w-auto"
              data-cursor="GO"
              data-label
              data-hero
            >
              GET DIRECTIONS
            </a>
          </div>
        </div>

        <div
          data-burger-img
          data-hero
          className="relative order-2 mx-auto w-full max-w-[min(100%,28rem)] sm:max-w-[min(100%,32rem)] lg:absolute lg:right-[-6%] lg:top-1/2 lg:w-[55%] lg:max-w-none lg:-translate-y-1/2"
          data-cursor="EAT"
        >
          <div className="relative aspect-square overflow-hidden sm:aspect-[4/5] lg:aspect-[5/6]">
            <Image
              src="/images/balkans-corner/hero-burger.jpg"
              alt="Stacked grill-style burger with melted cheese on a wooden board"
              fill
              priority
              sizes="(max-width: 1024px) 90vw, 55vw"
              className="object-cover object-center"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-coal/50 via-transparent to-transparent lg:bg-gradient-to-l" />
          </div>
        </div>
      </div>
    </section>
  );
}
