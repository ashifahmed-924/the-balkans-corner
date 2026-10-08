"use client";

import { useEffect, useRef, useState } from "react";
import useReducedMotion from "@/hooks/useReducedMotion";

export default function CustomCursor() {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const [label, setLabel] = useState("");
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    setEnabled(fine && !reduced);
  }, [reduced]);

  useEffect(() => {
    if (!enabled || !ref.current) return;
    const el = ref.current;

    const move = (e) => {
      el.style.left = `${e.clientX}px`;
      el.style.top = `${e.clientY}px`;
    };

    const over = (e) => {
      const target = e.target.closest("[data-cursor]");
      if (target) {
        setLabel(target.getAttribute("data-cursor") || "");
        el.classList.add("expanded");
      } else {
        setLabel("");
        el.classList.remove("expanded");
      }
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    document.documentElement.classList.add("cursor-none");

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      document.documentElement.classList.remove("cursor-none");
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div ref={ref} className="custom-cursor" aria-hidden="true">
      {label}
    </div>
  );
}
