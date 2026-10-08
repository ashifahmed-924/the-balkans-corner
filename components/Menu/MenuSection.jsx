"use client";

import { useEffect, useRef, useState } from "react";
import MenuCategoryRail from "./MenuCategoryRail";
import MenuGroup from "./MenuGroup";
import SectionLabel from "../SectionLabel";
import { getMenuByCategory, menuCategories } from "@/data/balkansCorner";
import { registerGsap } from "@/lib/gsapSetup";
import useReducedMotion from "@/hooks/useReducedMotion";

export default function MenuSection() {
  const [active, setActive] = useState(menuCategories[0]);
  const root = useRef(null);
  const marker = useRef(null);
  const reduced = useReducedMotion();
  const items = getMenuByCategory(active);

  useEffect(() => {
    if (!root.current || !marker.current || reduced) return;
    const { gsap } = registerGsap();
    const buttons = root.current.querySelectorAll("[aria-pressed='true']");
    const activeBtn = buttons[buttons.length - 1] || buttons[0];
    if (!activeBtn) return;
    const parent = activeBtn.parentElement;
    if (!parent) return;
    const top = activeBtn.offsetTop;
    gsap.to(marker.current, {
      y: top,
      height: activeBtn.offsetHeight,
      duration: 0.35,
      ease: "power2.out",
    });
  }, [active, reduced]);

  return (
    <section
      id="menu"
      ref={root}
      className="overflow-x-clip bg-coal py-12 texture-charcoal sm:py-16"
      aria-labelledby="menu-heading"
    >
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-10">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div className="min-w-0">
            <SectionLabel>Order board</SectionLabel>
            <h2 id="menu-heading" className="font-display mt-3 text-4xl text-bone sm:text-6xl">
              FULL
              <br />
              <span className="text-warm-yellow">MENU</span>
            </h2>
          </div>
          <p className="max-w-sm text-sm text-bone/60">
            Prices shown from public delivery listings where verified. In-store
            pricing may differ.
          </p>
        </div>

        <div className="grid min-w-0 gap-5 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-6">
          <div className="relative min-w-0">
            <div
              ref={marker}
              className="pointer-events-none absolute left-0 top-0 hidden w-1 bg-warm-yellow lg:block"
              aria-hidden="true"
            />
            <MenuCategoryRail
              categories={menuCategories}
              active={active}
              onChange={setActive}
            />
          </div>
          <div className="min-w-0">
            <p className="font-mono-tiny mb-4 text-warm-yellow">{active}</p>
            <MenuGroup key={active} items={items} />
          </div>
        </div>
      </div>
    </section>
  );
}
