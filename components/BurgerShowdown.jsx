"use client";

import { useEffect, useRef, useState } from "react";
import { formatPrice, getFeaturedBurgers } from "@/data/balkansCorner";
import { registerGsap } from "@/lib/gsapSetup";
import useReducedMotion from "@/hooks/useReducedMotion";
import SectionLabel from "./SectionLabel";
import BurgerTurntable from "./motion/BurgerTurntable";

const MEDIA_BOX =
  "relative mx-auto flex w-full max-w-[17.5rem] justify-center sm:max-w-[19rem] lg:max-w-[20rem]";

const PANEL =
  "relative grid w-full shrink-0 grow-0 basis-full snap-center snap-always justify-items-center gap-3 overflow-hidden px-5 py-8 text-center sm:gap-4 sm:px-8 sm:py-10 lg:basis-auto lg:grow lg:justify-items-stretch lg:snap-none lg:grid-cols-2 lg:gap-6 lg:px-12 lg:py-12 lg:text-left";

function buildPanels(burgers) {
  const [americana, chicken, cheese] = burgers;

  return [
    {
      key: "americana",
      item: americana,
      num: "01",
      line1: "THE",
      line2: "AMERICANA",
      panelClass: "bg-grill-red",
      numClass: "text-bone/70",
      titleClass: "text-bone",
      bodyClass: "text-bone/85",
    },
    {
      key: "chicken",
      item: chicken,
      num: "02",
      line1: "CHICKEN",
      line2: "CLASSIC",
      panelClass: "bg-coal",
      numClass: "text-warm-yellow",
      titleClass: "text-warm-yellow",
      bodyClass: "text-bone/80",
    },
    {
      key: "cheese",
      item: cheese,
      num: "03",
      line1: "CHEESE",
      line2: "BURGER",
      panelClass: "bg-bone text-coal",
      numClass: "text-grill-red",
      titleClass: "text-coal",
      bodyClass: "text-coal/75",
    },
  ];
}

export default function BurgerShowdown() {
  const root = useRef(null);
  const scroller = useRef(null);
  const reduced = useReducedMotion();
  const panels = buildPanels(getFeaturedBurgers());
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!root.current || reduced) return;
    const { gsap } = registerGsap();
    const q = gsap.utils.selector(root);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        q("[data-panel-media]"),
        { y: 56, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: { trigger: root.current, start: "top 70%" },
        }
      );

      gsap.fromTo(
        q("[data-panel-copy]"),
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power2.out",
          stagger: 0.12,
          scrollTrigger: { trigger: root.current, start: "top 70%" },
        }
      );
    }, root);

    return () => ctx.revert();
  }, [reduced]);

  useEffect(() => {
    const el = scroller.current;
    if (!el) return;

    const onScroll = () => {
      const width = el.clientWidth || 1;
      const index = Math.round(el.scrollLeft / width);
      setActive(Math.min(Math.max(index, 0), panels.length - 1));
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [panels.length]);

  const goTo = (index) => {
    const el = scroller.current;
    if (!el) return;
    el.scrollTo({ left: index * el.clientWidth, behavior: "smooth" });
    setActive(index);
  };

  return (
    <section
      id="burgers"
      ref={root}
      className="bg-soft-black py-12 sm:py-16"
      aria-labelledby="showdown-heading"
    >
      <div className="mx-auto mb-6 max-w-[1440px] px-4 sm:px-6 lg:px-10">
        <SectionLabel>Section 03</SectionLabel>
        <h2 id="showdown-heading" className="font-display mt-3 text-4xl text-bone sm:text-6xl">
          BURGER
          <br />
          <span className="text-warm-yellow">SHOWDOWN</span>
        </h2>
      </div>

      <div
        ref={scroller}
        className="scrollbar-none flex w-full snap-x snap-mandatory overflow-x-auto overscroll-x-contain lg:flex-col lg:overflow-visible lg:snap-none"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        aria-roledescription="carousel"
        aria-label="Featured burgers"
      >
        {panels.map((panel, i) => (
          <article
            key={panel.key}
            className={`${PANEL} ${panel.panelClass}`}
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${panels.length}`}
          >
            <div data-panel-media className={MEDIA_BOX}>
              <BurgerTurntable
                frames={panel.item?.frames}
                fallbackSrc={panel.item?.image}
                alt={panel.item?.name || `${panel.line1} ${panel.line2}`}
              />
            </div>
            <div data-panel-copy className="relative z-10 min-w-0 w-full max-w-md lg:max-w-none lg:pl-2">
              <p className={`font-mono-tiny ${panel.numClass}`}>{panel.num}</p>
              <h3
                className={`font-display mt-1 text-4xl leading-[0.95] sm:text-6xl lg:text-7xl ${panel.titleClass}`}
              >
                {panel.line1}
                <br />
                {panel.line2}
              </h3>
              <p className={`mt-3 mx-auto max-w-md lg:mx-0 ${panel.bodyClass}`}>
                {panel.item?.description}
              </p>
              <p className="price-yellow mt-4 font-display text-4xl">
                {formatPrice(panel.item?.price)}
              </p>
            </div>
          </article>
        ))}
      </div>

      <div
        className="mt-5 flex items-center justify-center gap-2.5 lg:hidden"
        role="tablist"
        aria-label="Burger slides"
      >
        {panels.map((panel, i) => (
          <button
            key={panel.key}
            type="button"
            role="tab"
            aria-selected={active === i}
            aria-label={`Show burger ${i + 1}`}
            onClick={() => goTo(i)}
            className={`h-2.5 w-2.5 rounded-full transition-colors ${
              active === i ? "bg-warm-yellow" : "bg-bone/35"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
