import { useTranslations } from "next-intl";
import { FeaturedProject } from "@/components/marketing/featured-project";
import { ProjectsGallery } from "@/components/marketing/projects-gallery";

export default function ProjectsPage() {
  const t = useTranslations("projects");

  return (
    <>
      <FeaturedProject />

      <section className="mx-auto max-w-6xl px-6 py-20 md:py-24">
        <p className="font-stencil text-xs font-semibold tracking-[0.25em] text-gold uppercase">
          {t("pageEyebrow")}
        </p>
        <h1 className="mt-3 max-w-2xl text-balance font-display text-2xl font-bold tracking-tight md:text-3xl">
          {t("pageTitle")}
        </h1>
        <p className="mt-3 max-w-xl text-muted-foreground">{t("pageIntro")}</p>

        <div className="mt-12">
          <ProjectsGallery />
        </div>
      </section>
    </>
  );
}
