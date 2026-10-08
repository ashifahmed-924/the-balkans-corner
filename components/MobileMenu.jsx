"use client";

import { useEffect, useRef } from "react";
import { registerGsap } from "@/lib/gsapSetup";
import useReducedMotion from "@/hooks/useReducedMotion";
import BrandMark from "./BrandMark";
import { business } from "@/data/balkansCorner";

const links = [
  { href: "#burgers", label: "BURGERS" },
  { href: "#classics", label: "BALKAN CLASSICS" },
  { href: "#menu", label: "MENU" },
  { href: "#visit", label: "VISIT" },
];

export default function MobileMenu({ open, onClose }) {
  const panel = useRef(null);
  const items = useRef([]);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!panel.current) return;
    const { gsap } = registerGsap();

    if (open) {
      document.body.style.overflow = "hidden";
      if (reduced) {
        gsap.set(panel.current, { autoAlpha: 1 });
        gsap.set(items.current, { x: 0, opacity: 1 });
        return;
      }
      const ctx = gsap.context(() => {
        gsap.set(panel.current, { autoAlpha: 1 });
        gsap.fromTo(
          items.current,
          { x: -60, opacity: 0 },
          { x: 0, opacity: 1, stagger: 0.08, duration: 0.55, ease: "power3.out", delay: 0.1 }
        );
      }, panel);
      return () => ctx.revert();
    }

    document.body.style.overflow = "";
    gsap.set(panel.current, { autoAlpha: 0 });
  }, [open, reduced]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape" && open) onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <div
      ref={panel}
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation"
      className="fixed inset-0 z-[60] flex flex-col opacity-0 invisible"
      style={{
        background:
          "radial-gradient(circle at 30% 20%, rgba(221,32,40,.95), rgba(111,9,13,.92) 45%, #0B0B0B 80%)",
      }}
    >
      <div className="flex items-center justify-between px-5 py-4">
        <BrandMark compact />
        <button
          type="button"
          onClick={onClose}
          className="grid h-12 w-12 place-items-center bg-warm-yellow text-coal font-extrabold"
          aria-label="Close menu"
        >
          ✕
        </button>
      </div>

      <nav className="flex flex-1 flex-col justify-center gap-3 overflow-y-auto px-5 py-6 sm:gap-4 sm:px-8" aria-label="Mobile">
        {links.map((link, i) => (
          <a
            key={link.href}
            href={link.href}
            onClick={onClose}
            ref={(el) => {
              items.current[i] = el;
            }}
            className="font-display text-[clamp(1.75rem,8vw,3rem)] leading-none text-bone"
          >
            {link.label}
          </a>
        ))}
      </nav>

      <div className="grid grid-cols-1 gap-2 border-t border-white/10 p-4 min-[400px]:grid-cols-3">
        <a href={business.phoneHref} className="btn-primary text-center text-xs">
          CALL
        </a>
        <a
          href={business.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary text-center text-xs"
        >
          DIRECTIONS
        </a>
        <a
          href={business.orderUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary text-center text-xs"
        >
          ORDER
        </a>
      </div>
    </div>
  );
}
