import { getSiteSettings } from "@/lib/settings";
import { SettingsForm } from "./settings-form";

export default async function IcerikPage() {
  const settings = await getSiteSettings();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display text-2xl font-bold tracking-tight text-foreground">
          İçerik
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Sitenin genelinde (footer, iletişim ve hakkımızda sayfaları) kullanılan
          iletişim bilgileri. Buradaki değişiklikler anında yayına yansır.
        </p>
      </div>

      <SettingsForm defaults={settings} />
    </div>
  );
}
