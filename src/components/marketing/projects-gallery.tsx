"use client";

import { useState } from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { useTranslations } from "next-intl";
import { services, type ServiceSlug } from "@/lib/constants";
import { galleryItems } from "@/lib/gallery-data";
import { cn } from "@/lib/utils";
import { ScrollReveal } from "@/components/marketing/scroll-reveal";

type FilterValue = ServiceSlug | "all";

export function ProjectsGallery() {
  const t = useTranslations("services");
  const tProjects = useTranslations("projects");
  const [filter, setFilter] = useState<FilterValue>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered =
    filter === "all"
      ? galleryItems
      : galleryItems.filter((item) => item.category === filter);

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        <FilterButton active={filter === "all"} onClick={() => setFilter("all")}>
          {tProjects("filterAll")}
        </FilterButton>
        {services.map((service) => (
          <FilterButton
            key={service.slug}
            active={filter === service.slug}
            onClick={() => setFilter(service.slug)}
          >
            {t(`${service.messageKey}.title`)}
          </FilterButton>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {filtered.map((item, index) => (
          <ScrollReveal key={item.id} delay={(index % 8) * 0.05} y={16}>
            <button
              type="button"
              onClick={() => setLightboxIndex(index)}
              className="photo-tone group relative block aspect-[4/5] w-full overflow-hidden rounded-2xl shadow-sm ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <Image
                src={item.image}
                alt=""
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </button>
          </ScrollReveal>
        ))}
      </div>

      <Lightbox
        open={lightboxIndex !== null}
        close={() => setLightboxIndex(null)}
        index={lightboxIndex ?? 0}
        slides={filtered.map((item) => ({ src: item.image }))}
        styles={{ container: { backgroundColor: "rgba(0,0,0,0.92)" } }}
      />
    </div>
  );
}

function FilterButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full border px-4 py-2 text-[13px] font-medium transition-all duration-300",
        active
          ? "shadow-glow-gold border-gold bg-gold text-primary-foreground"
          : "border-border bg-white text-muted-foreground hover:-translate-y-0.5 hover:border-gold/40 hover:text-foreground hover:shadow-md",
      )}
    >
      {children}
    </button>
  );
}
