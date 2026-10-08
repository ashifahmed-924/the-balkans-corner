import { business } from "@/data/balkansCorner";

export default function HalalStrip() {
  if (!business.halal?.listed) return null;

  return (
    <section
      className="border-y border-warm-yellow/30 bg-coal py-3.5"
      aria-label="Halal information"
    >
      <div className="mx-auto flex max-w-[1440px] flex-col items-start justify-between gap-3 px-4 sm:flex-row sm:items-center sm:px-6 lg:px-10">
        <p className="font-display text-xl text-warm-yellow sm:text-2xl">
          HALAL DINING
        </p>
        <p className="max-w-xl text-sm text-bone/75">{business.halal.wording}</p>
      </div>
    </section>
  );
}
