import { AnalyticsScripts } from "@/components/marketing/analytics-scripts";
import { SiteFooter } from "@/components/marketing/site-footer";
import { SiteHeader } from "@/components/marketing/site-header";
import { getSiteSettings } from "@/lib/settings";

export default async function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { ga_measurement_id, meta_pixel_id } = await getSiteSettings();

  return (
    <div className="flex min-h-full flex-1 flex-col">
      <AnalyticsScripts
        gaMeasurementId={ga_measurement_id}
        metaPixelId={meta_pixel_id}
      />
      <SiteHeader />
      <main className="flex-1 pt-28 md:pt-20">{children}</main>
      <SiteFooter />
    </div>
  );
}
