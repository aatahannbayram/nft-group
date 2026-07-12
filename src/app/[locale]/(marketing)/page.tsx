import { Hero } from "@/components/marketing/hero";
import { ServicesSection } from "@/components/marketing/services-section";
import { StatsSection } from "@/components/marketing/stats-section";
import { CapabilityStatement } from "@/components/marketing/capability-statement";
import { NewsTeaser } from "@/components/marketing/news-teaser";
import { FieldStrip } from "@/components/marketing/field-strip";
import { AboutTeaser } from "@/components/marketing/about-teaser";
import { FaqSection } from "@/components/marketing/faq-section";
import { CtaBanner } from "@/components/marketing/cta-banner";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesSection />
      <StatsSection />
      <CapabilityStatement />
      <FieldStrip />
      <AboutTeaser />
      <FaqSection />
      <NewsTeaser />
      <CtaBanner />
    </>
  );
}
