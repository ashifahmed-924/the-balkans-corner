export default function BrandMark({ className = "", compact = false }) {
  return (
    <div className={`leading-none ${className}`} aria-label="The Balkans Corner">
      <span className="font-display block text-[0.65rem] tracking-[0.2em] text-warm-yellow">
        THE
      </span>
      <span
        className={`font-display block tracking-tight text-bone ${
          compact ? "text-lg" : "text-xl sm:text-2xl"
        }`}
      >
        BALKANS
      </span>
      <span
        className={`font-display block tracking-[0.18em] text-radiant-red ${
          compact ? "text-[0.7rem]" : "text-sm"
        }`}
      >
        CORNER
      </span>
    </div>
  );
}
