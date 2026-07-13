import { cn } from "@/lib/utils";

interface SectionDividerProps {
  /** CSS color at the top of the blend (matches the section above). */
  from: string;
  /** CSS color at the bottom of the blend (matches the section below). */
  to: string;
  className?: string;
}

/**
 * Soft gradient seam between two differently-coloured sections, replacing a
 * hard straight-line color cut with a gradual blend instead of a wave shape.
 */
export function SectionDivider({ from, to, className }: SectionDividerProps) {
  return (
    <div
      aria-hidden
      className={cn("h-14 w-full sm:h-20", className)}
      style={{ background: `linear-gradient(to bottom in oklch, ${from}, ${to})` }}
    />
  );
}
