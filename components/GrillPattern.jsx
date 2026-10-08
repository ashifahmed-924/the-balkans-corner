const patterns = {
  grill: (
    <pattern id="grill" width="20" height="20" patternUnits="userSpaceOnUse">
      <rect width="20" height="20" fill="transparent" />
      <line x1="0" y1="0" x2="0" y2="20" stroke="currentColor" strokeWidth="1.5" />
      <line x1="10" y1="0" x2="10" y2="20" stroke="currentColor" strokeWidth="1.5" />
    </pattern>
  ),
  mesh: (
    <pattern id="mesh" width="12" height="12" patternUnits="userSpaceOnUse">
      <path d="M0 0H12V12H0Z" fill="transparent" />
      <path d="M0 0L12 12M12 0L0 12" stroke="currentColor" strokeWidth="0.5" />
    </pattern>
  ),
  wrapper: (
    <pattern id="wrapper" width="24" height="24" patternUnits="userSpaceOnUse" patternTransform="rotate(-30)">
      <rect width="24" height="24" fill="transparent" />
      <rect width="12" height="24" fill="currentColor" opacity="0.35" />
    </pattern>
  ),
  balkan: (
    <pattern id="balkan" width="32" height="32" patternUnits="userSpaceOnUse">
      <rect width="32" height="32" fill="transparent" />
      <rect x="0" y="0" width="8" height="8" fill="currentColor" opacity="0.4" />
      <rect x="16" y="16" width="8" height="8" fill="currentColor" opacity="0.4" />
      <circle cx="24" cy="8" r="2" fill="currentColor" opacity="0.35" />
      <circle cx="8" cy="24" r="2" fill="currentColor" opacity="0.35" />
    </pattern>
  ),
};

export default function GrillPattern({
  variant = "grill",
  className = "",
  opacity = 0.08,
}) {
  const id = `p-${variant}`;
  return (
    <svg
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      aria-hidden="true"
      style={{ opacity }}
    >
      <defs>
        {variant === "grill" && (
          <pattern id={id} width="20" height="20" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="0" y2="20" stroke="currentColor" strokeWidth="1.5" />
            <line x1="10" y1="0" x2="10" y2="20" stroke="currentColor" strokeWidth="1.5" />
          </pattern>
        )}
        {variant === "mesh" && (
          <pattern id={id} width="12" height="12" patternUnits="userSpaceOnUse">
            <path d="M0 0L12 12M12 0L0 12" stroke="currentColor" strokeWidth="0.5" />
          </pattern>
        )}
        {variant === "wrapper" && (
          <pattern
            id={id}
            width="24"
            height="24"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(-30)"
          >
            <rect width="12" height="24" fill="currentColor" />
          </pattern>
        )}
        {variant === "balkan" && (
          <pattern id={id} width="32" height="32" patternUnits="userSpaceOnUse">
            <rect x="0" y="0" width="8" height="8" fill="currentColor" />
            <rect x="16" y="16" width="8" height="8" fill="currentColor" />
            <circle cx="24" cy="8" r="2" fill="currentColor" />
            <circle cx="8" cy="24" r="2" fill="currentColor" />
          </pattern>
        )}
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}

// silence unused
void patterns;
