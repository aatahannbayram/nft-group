"use client";

import { useActionState, useEffect } from "react";
import { Loader2, Save } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { SettingKey } from "@/lib/settings";
import { updateSettings, type SettingsState } from "./actions";

export function SettingsForm({
  defaults,
}: {
  defaults: Record<SettingKey, string>;
}) {
  const [state, formAction, isPending] = useActionState<SettingsState, FormData>(
    updateSettings,
    undefined,
  );

  useEffect(() => {
    if (state?.success) toast.success("Kaydedildi.");
  }, [state]);

  return (
    <form action={formAction} className="flex max-w-lg flex-col gap-6">
      <div className="flex flex-col gap-5 rounded-xl border border-border bg-white p-6">
        <h2 className="text-sm font-semibold text-foreground">İletişim Bilgileri</h2>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="contact_phone" className="text-xs text-muted-foreground uppercase tracking-wide">
            Telefon
          </Label>
          <Input
            id="contact_phone"
            name="contact_phone"
            defaultValue={defaults.contact_phone}
            required
            className="h-11"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="contact_email" className="text-xs text-muted-foreground uppercase tracking-wide">
            E-posta
          </Label>
          <Input
            id="contact_email"
            name="contact_email"
            type="email"
            defaultValue={defaults.contact_email}
            required
            className="h-11"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="contact_address" className="text-xs text-muted-foreground uppercase tracking-wide">
            Adres
          </Label>
          <Input
            id="contact_address"
            name="contact_address"
            defaultValue={defaults.contact_address}
            required
            className="h-11"
          />
        </div>
      </div>

      <div className="flex flex-col gap-5 rounded-xl border border-border bg-white p-6">
        <div>
          <h2 className="text-sm font-semibold text-foreground">Analytics ve Takip</h2>
          <p className="mt-1 text-xs text-muted-foreground">
            Boş bırakılırsa ilgili izleme kodu siteye eklenmez.
          </p>
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="ga_measurement_id" className="text-xs text-muted-foreground uppercase tracking-wide">
            Google Analytics Measurement ID
          </Label>
          <Input
            id="ga_measurement_id"
            name="ga_measurement_id"
            placeholder="G-XXXXXXXXXX"
            defaultValue={defaults.ga_measurement_id}
            className="h-11 font-mono text-sm"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="meta_pixel_id" className="text-xs text-muted-foreground uppercase tracking-wide">
            Meta Pixel ID
          </Label>
          <Input
            id="meta_pixel_id"
            name="meta_pixel_id"
            placeholder="123456789012345"
            defaultValue={defaults.meta_pixel_id}
            className="h-11 font-mono text-sm"
          />
        </div>
      </div>

      {state?.error && (
        <p className="text-xs font-medium text-destructive">{state.error}</p>
      )}

      <Button
        type="submit"
        disabled={isPending}
        className="h-11 w-fit gap-2 self-start rounded-full bg-gold px-6 text-sm font-semibold text-primary-foreground hover:bg-gold hover:brightness-110"
      >
        {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
        Kaydet
      </Button>
    </form>
  );
}
