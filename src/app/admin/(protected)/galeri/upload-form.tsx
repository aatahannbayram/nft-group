"use client";

import { useActionState, useEffect, useRef } from "react";
import { Loader2, Upload } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PROJECT_TYPE_LABELS } from "@/lib/admin/labels";
import { uploadGalleryItem, type UploadState } from "./actions";

export function UploadForm() {
  const [state, formAction, isPending] = useActionState<UploadState, FormData>(
    uploadGalleryItem,
    undefined,
  );
  const formRef = useRef<HTMLFormElement>(null);

  // Only clear the form once the server action has actually confirmed
  // success — resetting eagerly (before the result is known) would wipe
  // out the admin's input while a validation error is still in flight.
  useEffect(() => {
    if (state?.success) {
      formRef.current?.reset();
      toast.success("Yüklendi.");
    }
  }, [state]);

  return (
    <form
      ref={formRef}
      action={formAction}
      className="flex flex-wrap items-end gap-4 rounded-xl border border-border bg-white p-5"
    >
      <div className="flex min-w-[180px] flex-1 flex-col gap-1.5">
        <Label htmlFor="title" className="text-xs text-muted-foreground uppercase tracking-wide">
          Başlık
        </Label>
        <Input id="title" name="title" required className="h-10" />
      </div>

      <div className="flex min-w-[200px] flex-col gap-1.5">
        <Label htmlFor="category" className="text-xs text-muted-foreground uppercase tracking-wide">
          Kategori
        </Label>
        <Select name="category" required>
          <SelectTrigger id="category" className="h-10 w-full">
            <SelectValue>
              {(value: keyof typeof PROJECT_TYPE_LABELS | null) =>
                value ? PROJECT_TYPE_LABELS[value] : "Kategori seçin"
              }
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {Object.entries(PROJECT_TYPE_LABELS).map(([value, label]) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="file" className="text-xs text-muted-foreground uppercase tracking-wide">
          Fotoğraf
        </Label>
        <input
          id="file"
          name="file"
          type="file"
          accept="image/jpeg,image/png,image/webp,image/avif"
          required
          className="text-sm file:mr-3 file:rounded-md file:border-0 file:bg-surface-2 file:px-3 file:py-2 file:text-xs file:font-medium"
        />
      </div>

      {state?.error && (
        <p className="w-full text-xs font-medium text-destructive">{state.error}</p>
      )}

      <Button
        type="submit"
        disabled={isPending}
        className="h-10 gap-2 rounded-full bg-gold px-6 text-sm font-semibold text-primary-foreground hover:bg-gold hover:brightness-110"
      >
        {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
        Yükle
      </Button>
    </form>
  );
}
