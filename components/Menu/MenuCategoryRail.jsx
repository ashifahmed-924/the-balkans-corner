export default function MenuCategoryRail({ categories, active, onChange }) {
  return (
    <div className="flex w-full min-w-0 gap-2 overflow-x-auto overscroll-x-contain pb-2 lg:sticky lg:top-28 lg:flex-col lg:overflow-visible lg:pb-0">
      {categories.map((cat) => {
        const isActive = active === cat;
        return (
          <button
            key={cat}
            type="button"
            onClick={() => onChange(cat)}
            className={`min-h-11 shrink-0 px-4 py-2 text-left text-xs font-extrabold tracking-[0.12em] uppercase transition-colors ${
              isActive
                ? "bg-warm-yellow text-coal"
                : "border border-white/15 text-bone hover:border-warm-yellow hover:text-warm-yellow"
            }`}
            aria-pressed={isActive}
          >
            {cat}
          </button>
        );
      })}
    </div>
  );
}
