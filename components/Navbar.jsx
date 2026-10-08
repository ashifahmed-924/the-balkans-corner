"use client";

import { useEffect, useState } from "react";
import BrandMark from "./BrandMark";
import MobileMenu from "./MobileMenu";
import { business } from "@/data/balkansCorner";

const navLinks = [
  { href: "#burgers", label: "BURGERS" },
  { href: "#classics", label: "BALKAN CLASSICS" },
  { href: "#menu", label: "MENU" },
  { href: "#visit", label: "VISIT" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 w-full max-w-[100vw] transition-all duration-300 ${
          scrolled ? "nav-scrolled" : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex w-full max-w-[1440px] items-center justify-between gap-3 px-4 py-3 sm:gap-4 sm:px-6 lg:px-10">
          <a href="#top" className="min-w-0 shrink" aria-label="The Balkans Corner home">
            <BrandMark compact />
          </a>

          <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-xs font-bold tracking-[0.14em] text-bone/85 transition-colors hover:text-warm-yellow"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <a
              href={business.orderUrl || business.phoneHref}
              target={business.orderUrl ? "_blank" : undefined}
              rel={business.orderUrl ? "noopener noreferrer" : undefined}
              className="btn-primary hidden !min-h-11 !px-4 !py-2 text-xs lg:inline-flex"
              data-cursor="EAT"
            >
              ORDER / CALL
            </a>
            <button
              type="button"
              className="grid h-11 w-11 place-items-center bg-warm-yellow text-coal sm:h-12 sm:w-12 lg:hidden"
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen(true)}
            >
              <span className="flex flex-col gap-1.5" aria-hidden="true">
                <span className="block h-0.5 w-5 bg-coal" />
                <span className="block h-0.5 w-5 bg-coal" />
                <span className="block h-0.5 w-5 bg-coal" />
              </span>
            </button>
          </div>
        </div>
      </header>
      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </>
  );
}
