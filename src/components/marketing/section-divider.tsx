import { cn } from "@/lib/utils";

interface SectionDividerProps {
  /** CSS color at the top of the blend (matches the section above). */
  from: string;
  /** CSS color at the bottom of the blend (matches the section below). */
  to: string;
  /**
   * Midpoint color. Defaults to steel — when `from` is a near-white,
   * near-zero-chroma color, interpolating straight to a saturated dark
   * navy (even in oklch) still dips through a washed-out gray band,
   * because there's almost no chroma to interpolate from. Routing through
   * an actual mid-tone brand color avoids that "muddy" gap.
   */
  via?: string;
  className?: string;
}

/**
 * Soft gradient seam between two differently-coloured sections, replacing a
 * hard straight-line color cut with a gradual blend instead of a wave shape.
 */
export function SectionDivider({
  from,
  to,
  via = "var(--steel)",
  className,
}: SectionDividerProps) {
  return (
    <div
      aria-hidden
      className={cn("h-14 w-full sm:h-20", className)}
      style={{
        background: `linear-gradient(to bottom in oklch, ${from}, ${via}, ${to})`,
      }}
    />
  );
}
