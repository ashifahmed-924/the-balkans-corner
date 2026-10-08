"use client";

import { useEffect, useRef } from "react";
import { business } from "@/data/balkansCorner";
import { registerGsap } from "@/lib/gsapSetup";
import useReducedMotion from "@/hooks/useReducedMotion";

const days = [
  ["Monday", business.hours.monday],
  ["Tuesday", business.hours.tuesday],
  ["Wednesday", business.hours.wednesday],
  ["Thursday", business.hours.thursday],
  ["Friday", business.hours.friday],
  ["Saturday", business.hours.saturday],
  ["Sunday", business.hours.sunday],
];

function todayIndex() {
  // JS: 0 Sun ... 6 Sat → map to our array Mon=0
  const d = new Date().getDay();
  return d === 0 ? 6 : d - 1;
}

export default function HoursSection() {
  const root = useRef(null);
  const reduced = useReducedMotion();
  const today = todayIndex();

  useEffect(() => {
    if (!root.current || reduced) return;
    const { gsap } = registerGsap();
    const rows = root.current.querySelectorAll("[data-hour-row]");

    const ctx = gsap.context(() => {
      gsap.fromTo(
        rows,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.07,
          duration: 0.45,
          ease: "power2.out",
          scrollTrigger: { trigger: root.current, start: "top 75%" },
        }
      );
    }, root);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      ref={root}
      className="bg-deep-red py-12 sm:py-16"
      aria-labelledby="hours-heading"
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr] lg:gap-8">
          <div>
            <h2 id="hours-heading" className="font-display text-[clamp(3rem,14vw,6rem)] leading-none text-bone sm:text-8xl">
              OPEN
              <br />
              <span className="text-warm-yellow">LATE</span>
            </h2>
            <p className="mt-6 max-w-sm text-sm text-bone/75">{business.hoursNote}</p>
          </div>

          <ul className="min-w-0 divide-y divide-bone/15 border border-bone/20 bg-black/25 font-mono-tiny text-bone">
            {days.map(([day, hours], i) => (
              <li
                key={day}
                data-hour-row
                className="flex items-center justify-between gap-3 px-3 py-3 text-xs tracking-wider sm:gap-4 sm:px-4 sm:text-base"
              >
                <span className="flex min-w-0 items-center gap-2 uppercase sm:gap-3">
                  {i === today && (
                    <span
                      className="inline-block h-2 w-2 shrink-0 rounded-full bg-warm-yellow"
                      aria-label="Today"
                    />
                  )}
                  {day}
                </span>
                <span className="shrink-0 text-right text-warm-yellow">{hours}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
