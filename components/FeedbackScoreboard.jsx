"use client";

import { useEffect, useRef, useState } from "react";
import { business, feedbackThemes } from "@/data/balkansCorner";
import { registerGsap } from "@/lib/gsapSetup";
import useReducedMotion from "@/hooks/useReducedMotion";
import SectionLabel from "./SectionLabel";

export default function FeedbackScoreboard() {
  const root = useRef(null);
  const track = useRef(null);
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % feedbackThemes.length);
    }, 2200);
    return () => clearInterval(id);
  }, [reduced]);

  useEffect(() => {
    if (!track.current || reduced) return;
    const { gsap } = registerGsap();
    gsap.fromTo(
      track.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.45, ease: "power2.out" }
    );
  }, [index, reduced]);

  useEffect(() => {
    if (!root.current || reduced) return;
    const { gsap } = registerGsap();
    const ctx = gsap.context(() => {
      gsap.fromTo(
        root.current.querySelector("[data-score]"),
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: root.current, start: "top 75%" },
        }
      );
    }, root);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      ref={root}
      className="bg-coal py-12 sm:py-16"
      aria-labelledby="feedback-heading"
    >
      <div className="mx-auto max-w-[1440px] px-4 text-center sm:px-6 lg:px-10">
        <SectionLabel>Public customer feedback</SectionLabel>
        <h2 id="feedback-heading" className="sr-only">
          Public customer feedback themes
        </h2>

        <div className="scoreboard-mask mx-auto mt-5 max-w-5xl">
          <p
            ref={track}
            className="font-display text-[clamp(1.75rem,10vw,5.5rem)] leading-none text-bone"
            aria-live="polite"
          >
            {feedbackThemes[index]}
          </p>
        </div>

        {business.rating?.value && (
          <p data-score className="mt-6 font-display text-6xl text-warm-yellow sm:text-7xl">
            {business.rating.value}
            <span className="ml-2 text-2xl text-bone/60">/ 5</span>
          </p>
        )}

        <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-bone/65">
          Customers frequently mention generous portions. Current feedback
          highlights burgers, chevapi and freshly prepared food. Recent delivery
          reviews mention strong value and taste. Themes summarised from public
          listings — not direct quotes.
        </p>
        <p className="mt-3 text-xs text-smoke">
          Rating source: {business.rating.source} · verified {business.rating.verifiedAt}
        </p>
      </div>
    </section>
  );
}
