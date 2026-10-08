import Image from "next/image";

export default function MenuHoverPreview({ item, visible }) {
  if (!item?.image) return null;

  return (
    <div
      className={`pointer-events-none absolute right-0 top-1/2 z-30 hidden w-44 -translate-y-1/2 overflow-hidden border border-warm-yellow/40 bg-charcoal shadow-lg transition-all duration-300 lg:block ${
        visible ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0"
      }`}
      aria-hidden="true"
    >
      <div className="relative aspect-square w-full">
        <Image src={item.image} alt="" fill sizes="176px" className="object-cover" />
      </div>
    </div>
  );
}
