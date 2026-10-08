"use client";

import Image from "next/image";
import { formatPrice } from "@/data/balkansCorner";
import MenuHoverPreview from "./MenuHoverPreview";

export default function MenuRow({ item, index, active, onActivate, onDeactivate }) {
  const handlePointerLeave = () => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      onDeactivate();
    }
  };

  return (
    <li
      className="group relative border-b border-white/10"
      onMouseEnter={onActivate}
      onMouseLeave={handlePointerLeave}
    >
      <div
        className={`absolute inset-0 origin-left bg-warm-yellow/10 transition-transform duration-300 ${
          active ? "scale-x-100" : "scale-x-0"
        }`}
        style={{
          clipPath: "polygon(0 0, 100% 0, 96% 100%, 0 100%)",
        }}
        aria-hidden="true"
      />

      <button
        type="button"
        className="relative z-10 grid w-full grid-cols-[2.25rem_minmax(0,1fr)] items-start gap-x-2 py-3.5 text-left sm:gap-x-6 sm:py-4 lg:grid-cols-[56px_minmax(0,1fr)_auto] lg:pr-48"
        onFocus={onActivate}
        onClick={onActivate}
        aria-expanded={active}
      >
        <span className="font-mono-tiny pt-1 text-smoke">
          {String(index + 1).padStart(2, "0")}
        </span>

        <div
          className={`min-w-0 transition-transform duration-300 ${active ? "lg:translate-x-2" : ""}`}
        >
          <div className="flex items-start justify-between gap-3 lg:block">
            <h3 className="font-display min-w-0 text-lg text-bone sm:text-2xl">{item.name}</h3>
            <span
              className="price-yellow shrink-0 text-right font-display text-sm leading-tight lg:hidden"
              aria-label={formatPrice(item.price)}
            >
              {formatPrice(item.price, { compact: true })}
            </span>
          </div>

          <p className="mt-1 w-full text-sm text-bone/65">{item.description}</p>

          {item.priceSource && (
            <p className="mt-1 text-[10px] uppercase tracking-wider text-smoke">
              Delivery listing price · {item.priceSource}
            </p>
          )}
        </div>

        <span
          className={`price-yellow hidden justify-self-end text-right font-display text-2xl leading-tight transition-transform duration-300 lg:block ${
            active ? "lg:scale-110" : ""
          }`}
        >
          {formatPrice(item.price)}
        </span>
      </button>

      {active && item.image && (
        <div className="relative z-10 mb-4 aspect-[16/9] overflow-hidden lg:hidden">
          <Image
            src={item.image}
            alt={item.name}
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
      )}

      <MenuHoverPreview item={item} visible={active} />
    </li>
  );
}
