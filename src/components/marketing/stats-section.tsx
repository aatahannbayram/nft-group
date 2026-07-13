"use client";

import { useEffect, useRef } from "react";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";
import { ClipboardCheck, Layers, MapPin, Ship } from "lucide-react";
import { useTranslations } from "next-intl";
import { services } from "@/lib/constants";
import { ScrollReveal } from "@/components/marketing/scroll-reveal";

function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const reducedMotion = useReducedMotion();
  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, (v) => Math.round(v).toString());

  useEffect(() => {
    if (!inView) return;
    if (reducedMotion) {
      motionValue.set(value);
      return;
    }
    const controls = animate(motionValue, value, {
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1],
    });
    return () => controls.stop();
  }, [inView, motionValue, reducedMotion, value]);

  return (
    <span ref={ref} className="tabular-nums">
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}

export function StatsSection() {
  const t = useTranslations("home");

  const disciplineCount = services.length;

  return (
    <section className="relative hidden w-full bg-background sm:block">
      <div className="mx-auto max-w-7xl px-6 pb-16 md:px-16 lg:px-20">
        <ScrollReveal className="glass-accent shadow-glow-navy relative -mt-8 overflow-hidden rounded-3xl px-6 py-10 sm:-mt-12 sm:px-10 sm:py-12">
          <div
            aria-hidden
            className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-navy via-steel to-navy"
          />
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4 sm:gap-y-6">
            <div className="flex min-w-0 flex-col items-center gap-2 text-center sm:items-start sm:text-left">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-steel/10 text-steel">
                <Layers className="h-5 w-5" strokeWidth={2} />
              </span>
              <span className="font-display text-3xl font-bold tracking-tight text-navy sm:text-4xl">
                <Counter value={disciplineCount} />
              </span>
              <span className="text-sm text-muted-foreground">
                {t("statDisciplines")}
              </span>
            </div>

            <div className="flex min-w-0 flex-col items-center gap-2 text-center sm:items-start sm:text-left">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-steel/10 text-steel">
                <Ship className="h-5 w-5" strokeWidth={2} />
              </span>
              <span className="font-display text-3xl font-bold tracking-tight text-navy sm:text-4xl">
                <Counter value={200} suffix="+" />
              </span>
              <span className="text-sm text-muted-foreground">
                {t("heroTrustLabel")}
              </span>
            </div>

            <div className="flex min-w-0 flex-col items-center gap-2 text-center sm:items-start sm:text-left">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-steel/10 text-steel">
                <ClipboardCheck className="h-5 w-5" strokeWidth={2} />
              </span>
              <span className="font-display text-3xl font-bold tracking-tight text-navy sm:text-4xl">
                <Counter value={2} />
              </span>
              <span className="text-sm text-muted-foreground">
                {t("statProjectTypes")}
              </span>
            </div>

            <div className="flex min-w-0 flex-col items-center gap-2 text-center sm:items-start sm:text-left">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-steel/10 text-steel">
                <MapPin className="h-5 w-5" strokeWidth={2} />
              </span>
              <span className="font-display text-lg font-bold tracking-tight text-balance text-navy sm:text-xl">
                {t("statLocation")}
              </span>
              <span className="text-sm text-muted-foreground">
                {t("statLocationCaption")}
              </span>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
