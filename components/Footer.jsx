"use client";

import { useEffect, useRef } from "react";
import BrandMark from "./BrandMark";
import { business } from "@/data/balkansCorner";
import { registerGsap } from "@/lib/gsapSetup";
import useReducedMotion from "@/hooks/useReducedMotion";

function BurgerOutline() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 9h16M5 13h14M6 17h12"
        stroke="#FFC928"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M5 7.5C5 6.1 8 5 12 5s7 1.1 7 2.5"
        stroke="#FFC928"
        strokeWidth="1.8"
      />
      <path
        d="M5 17.5C5 18.9 8 20 12 20s7-1.1 7-2.5"
        stroke="#FFC928"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M14 9h3V6h-3c-1.7 0-3 1.3-3 3v2H8v3h3v7h3v-7h3l1-3h-4V9c0-.6.4-1 1-1Z"
        fill="currentColor"
      />
    </svg>
  );
}

function YoutubeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M22 12.2s0-3.2-.4-4.7c-.2-.8-.9-1.5-1.7-1.7C18.4 5.4 12 5.4 12 5.4s-6.4 0-7.9.4c-.8.2-1.5.9-1.7 1.7C2 9 2 12.2 2 12.2s0 3.2.4 4.7c.2.8.9 1.5 1.7 1.7 1.5.4 7.9.4 7.9.4s6.4 0 7.9-.4c.8-.2 1.5-.9 1.7-1.7.4-1.5.4-4.7.4-4.7Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M10 9.5v5.5l5-2.75-5-2.75Z" fill="currentColor" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M14.5 3v10.2a3.7 3.7 0 1 1-2.6-3.5V7.1c-2.9.4-5.1 2.9-5.1 5.9A5.4 5.4 0 0 0 12.2 18.4c3 0 5.4-2.4 5.4-5.4V8.3A6.6 6.6 0 0 0 21 9.6V6.5a6.5 6.5 0 0 1-4-1.4V3h-2.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

const socialLinks = [
  { key: "instagram", label: "Instagram", Icon: InstagramIcon },
  { key: "facebook", label: "Facebook", Icon: FacebookIcon },
  { key: "youtube", label: "YouTube", Icon: YoutubeIcon },
  { key: "tiktok", label: "TikTok", Icon: TikTokIcon },
];

export default function Footer() {
  const root = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!root.current || reduced) return;
    const { gsap } = registerGsap();
    const line = root.current.querySelector("[data-border]");
    const ctx = gsap.context(() => {
      gsap.fromTo(
        line,
        { scaleX: 0 },
        {
          scaleX: 1,
          transformOrigin: "left",
          duration: 1,
          ease: "power2.out",
          scrollTrigger: { trigger: root.current, start: "top 90%" },
        }
      );
    }, root);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <footer ref={root} className="relative bg-coal pb-6 pt-10">
      <div
        data-border
        className="absolute inset-x-0 top-0 h-0.5 origin-left bg-hot-red"
        style={reduced ? undefined : { transform: "scaleX(0)" }}
        aria-hidden="true"
      />

      <div className="mx-auto grid max-w-[1440px] gap-6 px-4 sm:px-6 lg:grid-cols-3 lg:gap-8 lg:px-10">
        <div className="flex items-start gap-3">
          <BrandMark />
          <BurgerOutline />
        </div>

        <div className="text-bone/80">
          <p className="font-display text-xl text-bone">
            {business.address.street}
          </p>
          <p>
            {business.address.suburb} {business.address.state}{" "}
            {business.address.postcode}
          </p>
        </div>

        <div>
          <a
            href={business.phoneHref}
            className="font-display text-2xl text-warm-yellow"
          >
            {business.phoneDisplay}
          </a>
          <nav className="mt-4 flex flex-wrap gap-4 text-xs font-bold tracking-[0.14em] text-bone/70">
            <a href="#menu" className="hover:text-warm-yellow">
              MENU
            </a>
            <a href="#burgers" className="hover:text-warm-yellow">
              BURGERS
            </a>
            <a href="#classics" className="hover:text-warm-yellow">
              BALKAN CLASSICS
            </a>
            <a href="#visit" className="hover:text-warm-yellow">
              DIRECTIONS
            </a>
          </nav>

          <div className="mt-6 flex flex-wrap items-center gap-3" aria-label="Social media">
            {socialLinks.map(({ key, label, Icon }) => {
              const href = business.social?.[key];
              if (!href) return null;
              return (
                <a
                  key={key}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  data-cursor="GO"
                  className="grid h-11 w-11 place-items-center border border-white/15 text-bone transition-colors hover:border-warm-yellow hover:bg-warm-yellow hover:text-coal"
                >
                  <Icon />
                </a>
              );
            })}
          </div>
        </div>
      </div>

      <p className="mx-auto mt-8 max-w-[1440px] px-4 text-xs text-smoke sm:px-6 lg:px-10">
        © 2026 The Balkans Corner
      </p>
    </footer>
  );
}
