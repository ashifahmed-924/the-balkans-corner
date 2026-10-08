"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import useReducedMotion from "@/hooks/useReducedMotion";

function knockoutWhite(src) {
  return new Promise((resolve) => {
    const img = new window.Image();
    img.decoding = "async";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth || img.width;
      canvas.height = img.naturalHeight || img.height;
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      if (!ctx) {
        resolve(src);
        return;
      }

      ctx.drawImage(img, 0, 0);
      const frame = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const { data } = frame;

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        const brightness = (r + g + b) / 3;
        const lowSat = max - min < 28;

        // Studio white / soft halo → transparent; keep burger color + ground shadow
        if (lowSat && brightness > 175) {
          const t = Math.min(1, (brightness - 175) / 55);
          data[i + 3] = Math.round(data[i + 3] * (1 - t));
        }
      }

      ctx.putImageData(frame, 0, 0);
      resolve(canvas.toDataURL("image/png"));
    };
    img.onerror = () => resolve(src);
    img.src = src;
  });
}

export default function BurgerTurntable({
  frames = [],
  fallbackSrc,
  alt,
  className = "",
}) {
  const reduced = useReducedMotion();
  const src = fallbackSrc || frames[0];
  const [cutout, setCutout] = useState(src);

  useEffect(() => {
    if (!src) return;
    let alive = true;
    setCutout(src);
    knockoutWhite(src).then((url) => {
      if (alive) setCutout(url);
    });
    return () => {
      alive = false;
    };
  }, [src]);

  if (!src) return null;

  const isData = cutout.startsWith("data:");

  return (
    <div
      className={`burger-turntable relative mx-auto aspect-square w-full select-none ${className}`}
      role="img"
      aria-label={`${alt}. Continuously rotating view.`}
    >
      <div
        className={`burger-turntable__stage relative flex h-full w-full items-center justify-center ${
          reduced ? "" : "burger-turntable__spin"
        }`}
      >
        <div className="relative h-[90%] w-[90%]">
          {isData ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={cutout}
              alt=""
              className="h-full w-full object-contain object-center"
              draggable={false}
            />
          ) : (
            <Image
              src={cutout}
              alt=""
              fill
              sizes="(max-width: 640px) 72vw, 320px"
              className="object-contain object-center"
              priority
              draggable={false}
            />
          )}
        </div>
      </div>
    </div>
  );
}
