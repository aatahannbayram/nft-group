"use client";

import * as React from "react";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { ScrollReveal } from "@/components/marketing/scroll-reveal";

export interface Feature {
  imageSrc: string;
  imageAlt: string;
  title: string;
  description: string;
  href: string;
}

export interface FeatureGridProps {
  features: Feature[];
  className?: string;
}

const FeatureCard: React.FC<{ feature: Feature }> = ({ feature }) => (
  <Link
    href={feature.href}
    className={cn(
      "group",
      "flex flex-col sm:flex-row items-start gap-6",
      "p-6 rounded-lg border",
      "bg-card text-card-foreground",
      "transition-all duration-300",
      "hover:shadow-md hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    )}
  >
    <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-md">
      <Image
        src={feature.imageSrc}
        alt={feature.imageAlt}
        fill
        sizes="96px"
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
    </div>

    <div className="flex h-full flex-1 flex-col justify-between">
      <div>
        <h3 className="mb-1 text-lg font-semibold text-foreground">
          {feature.title}
        </h3>
        <p className="text-sm text-muted-foreground">{feature.description}</p>
      </div>
      <div className="mt-4 flex justify-end">
        <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1 group-hover:text-gold" />
      </div>
    </div>
  </Link>
);

const FeatureGrid = React.forwardRef<HTMLDivElement, FeatureGridProps>(
  ({ features, className }, ref) => {
    if (!features || features.length === 0) {
      return null;
    }

    return (
      <div
        ref={ref}
        className={cn("grid grid-cols-1 gap-6 lg:grid-cols-2", className)}
      >
        {features.map((feature, index) => (
          <ScrollReveal key={feature.href} delay={index * 0.08}>
            <FeatureCard feature={feature} />
          </ScrollReveal>
        ))}
      </div>
    );
  },
);
FeatureGrid.displayName = "FeatureGrid";

export { FeatureGrid };
