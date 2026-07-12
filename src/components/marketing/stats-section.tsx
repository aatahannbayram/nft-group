"use client";

import { useEffect, useRef } from "react";
import { animate, motion, useInView, useMotionValue, useTransform } from "framer-motion";
import { MapPin } from "lucide-react";
import { useTranslations } from "next-intl";
import { galleryItems } from "@/lib/gallery-data";
import { services } from "@/lib/constants";
import { ScrollReveal } from "@/components/marketing/scroll-reveal";

function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, (v) => Math.round(v).toString());

  useEffect(() => {
    if (!inView) return;
    const controls = animate(motionValue, value, {
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1],
    });
    return () => controls.stop();
  }, [inView, motionValue, value]);

  return (
    <span ref={ref} className="tabular-nums">
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}

export function StatsSection() {
  const t = useTranslations("home");

  const fieldWorkCount = galleryItems.length;
  const disciplineCount = services.length;

  return (
    <section className="relative w-full bg-white">
      <div className="mx-auto max-w-7xl px-6 pb-16 md:px-16 lg:px-20">
        <ScrollReveal className="glass shadow-glow-gold -mt-8 rounded-3xl px-6 py-10 sm:-mt-12 sm:px-10 sm:py-12">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 sm:gap-6">
            <div className="flex flex-col items-center gap-1 text-center sm:items-start sm:text-left">
              <span className="font-display text-4xl font-bold tracking-tight text-navy sm:text-5xl">
                <Counter value={disciplineCount} />
              </span>
              <span className="text-sm text-muted-foreground">
                {t("statDisciplines")}
              </span>
            </div>

            <div className="flex flex-col items-center gap-1 text-center sm:items-start sm:text-left">
              <span className="font-display text-4xl font-bold tracking-tight text-navy sm:text-5xl">
                <Counter value={fieldWorkCount} suffix="+" />
              </span>
              <span className="text-sm text-muted-foreground">
                {t("statFieldWork")}
              </span>
            </div>

            <div className="flex flex-col items-center gap-1 text-center sm:items-start sm:text-left">
              <span className="font-display text-4xl font-bold tracking-tight text-navy sm:text-5xl">
                <Counter value={2} />
              </span>
              <span className="text-sm text-muted-foreground">
                {t("statProjectTypes")}
              </span>
            </div>

            <div className="flex flex-col items-center gap-1.5 text-center sm:items-start sm:text-left">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gold/10 text-gold">
                <MapPin className="h-5 w-5" strokeWidth={2} />
              </span>
              <span className="text-sm text-muted-foreground">
                {t("statLocation")}
              </span>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
