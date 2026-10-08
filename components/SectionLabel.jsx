export default function SectionLabel({ children, className = "" }) {
  return (
    <span
      className={`font-mono-tiny inline-flex items-center gap-2 uppercase text-warm-yellow ${className}`}
    >
      <span className="inline-block h-1.5 w-1.5 rounded-full bg-warm-yellow" aria-hidden="true" />
      {children}
    </span>
  );
}
