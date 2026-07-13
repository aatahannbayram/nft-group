import type { ComponentProps, ReactNode } from "react";
import { ArrowDownRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

type PillButtonVariant = "light" | "solid";

const PILL_BASE =
  "group inline-flex w-fit shrink-0 self-start items-center gap-2 rounded-full px-7 py-4 text-sm font-medium shadow-lg transition-all duration-200 ease-out hover:-translate-y-0.5";

const PILL_VARIANTS: Record<PillButtonVariant, string> = {
  light: "bg-white text-navy hover:shadow-xl hover:brightness-105",
  solid: "bg-gold font-semibold text-white hover:shadow-glow-gold hover:brightness-110",
};

const DEFAULT_ICON = (
  <ArrowDownRight className="h-4 w-4 text-current transition-transform duration-200 group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
);

interface PillButtonProps extends ComponentProps<typeof Link> {
  variant?: PillButtonVariant;
  /** Pass a custom icon element, or `false` to render no icon. Defaults to a trailing arrow. */
  icon?: ReactNode | false;
}

/** Shared pill CTA — used standalone or paired with a CircleIconButton (see hero.tsx). */
export function PillButton({
  href,
  children,
  variant = "light",
  icon,
  className,
  ...props
}: PillButtonProps) {
  return (
    <Link href={href} className={cn(PILL_BASE, PILL_VARIANTS[variant], className)} {...props}>
      {children}
      {icon !== false && (icon ?? DEFAULT_ICON)}
    </Link>
  );
}

type CircleIconButtonSize = "md" | "lg";

const CIRCLE_SIZE: Record<CircleIconButtonSize, string> = {
  md: "h-[52px] w-[52px]",
  lg: "h-12 w-12 sm:h-14 sm:w-14",
};

interface CircleIconButtonProps extends ComponentProps<typeof Link> {
  icon: ReactNode;
  size?: CircleIconButtonSize;
}

/** Standalone circular icon CTA — the "circle-icon" half of the pill+circle pairing. */
export function CircleIconButton({
  href,
  icon,
  size = "md",
  className,
  ...props
}: CircleIconButtonProps) {
  return (
    <Link
      href={href}
      className={cn(
        "flex shrink-0 self-start items-center justify-center rounded-full bg-gold text-white shadow-lg transition-all duration-200 ease-out hover:-translate-y-0.5 hover:scale-105 hover:shadow-glow-gold hover:brightness-110",
        CIRCLE_SIZE[size],
        className
      )}
      {...props}
    >
      {icon}
    </Link>
  );
}
