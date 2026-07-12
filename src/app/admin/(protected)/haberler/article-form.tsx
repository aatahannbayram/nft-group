"use client";

import { useActionState, useRef, useState } from "react";
import Image from "next/image";
import { Loader2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PROJECT_TYPE_LABELS } from "@/lib/admin/labels";
import type { ArticleState } from "./actions";

const TR_CHAR_MAP: Record<string, string> = {
  ı: "i",
  İ: "i",
  ş: "s",
  Ş: "s",
  ğ: "g",
  Ğ: "g",
  ü: "u",
  Ü: "u",
  ö: "o",
  Ö: "o",
  ç: "c",
  Ç: "c",
};

function slugify(input: string) {
  const transliterated = input.replace(/[ıİşŞğĞüÜöÖçÇ]/g, (ch) => TR_CHAR_MAP[ch] ?? ch);
  return transliterated
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

type ArticleDefaults = {
  slug: string;
  image: string;
  category: keyof typeof PROJECT_TYPE_LABELS;
  publishedAt: string;
  featured: boolean;
  published: boolean;
  titleTr: string;
  titleEn: string;
  excerptTr: string;
  excerptEn: string;
  bodyTr: string[];
  bodyEn: string[];
};

export function ArticleForm({
  action,
  defaults,
  submitLabel,
}: {
  action: (prevState: ArticleState, formData: FormData) => Promise<ArticleState>;
  defaults?: ArticleDefaults;
  submitLabel: string;
}) {
  const [state, formAction, isPending] = useActionState<ArticleState, FormData>(
    action,
    undefined,
  );
  const slugTouched = useRef(!!defaults);
  const [slug, setSlug] = useState(defaults?.slug ?? "");

  return (
    <form action={formAction} className="flex max-w-3xl flex-col gap-6">
      <div className="grid grid-cols-1 gap-5 rounded-xl border border-border bg-white p-6 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="titleTr" className="text-xs text-muted-foreground uppercase tracking-wide">
            Başlık (TR)
          </Label>
          <Input
            id="titleTr"
            name="titleTr"
            defaultValue={defaults?.titleTr}
            required
            onChange={(e) => {
              if (!slugTouched.current) setSlug(slugify(e.target.value));
            }}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="titleEn" className="text-xs text-muted-foreground uppercase tracking-wide">
            Başlık (EN)
          </Label>
          <Input id="titleEn" name="titleEn" defaultValue={defaults?.titleEn} required />
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="excerptTr" className="text-xs text-muted-foreground uppercase tracking-wide">
            Özet (TR)
          </Label>
          <Textarea id="excerptTr" name="excerptTr" defaultValue={defaults?.excerptTr} rows={2} required />
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="excerptEn" className="text-xs text-muted-foreground uppercase tracking-wide">
            Özet (EN)
          </Label>
          <Textarea id="excerptEn" name="excerptEn" defaultValue={defaults?.excerptEn} rows={2} required />
        </div>

        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <Label htmlFor="bodyTr" className="text-xs text-muted-foreground uppercase tracking-wide">
            İçerik (TR) — her satır bir paragraf
          </Label>
          <Textarea
            id="bodyTr"
            name="bodyTr"
            defaultValue={defaults?.bodyTr.join("\n")}
            rows={6}
            required
          />
        </div>

        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <Label htmlFor="bodyEn" className="text-xs text-muted-foreground uppercase tracking-wide">
            İçerik (EN) — her satır bir paragraf
          </Label>
          <Textarea
            id="bodyEn"
            name="bodyEn"
            defaultValue={defaults?.bodyEn.join("\n")}
            rows={6}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 rounded-xl border border-border bg-white p-6 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="slug" className="text-xs text-muted-foreground uppercase tracking-wide">
            Slug (URL)
          </Label>
          <Input
            id="slug"
            name="slug"
            value={slug}
            onChange={(e) => {
              slugTouched.current = true;
              setSlug(e.target.value);
            }}
            required
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="category" className="text-xs text-muted-foreground uppercase tracking-wide">
            Kategori
          </Label>
          <Select name="category" defaultValue={defaults?.category} required>
            <SelectTrigger id="category" className="h-9 w-full">
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
          <Label htmlFor="publishedAt" className="text-xs text-muted-foreground uppercase tracking-wide">
            Yayın Tarihi
          </Label>
          <Input
            id="publishedAt"
            name="publishedAt"
            type="date"
            defaultValue={defaults?.publishedAt}
            required
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="image" className="text-xs text-muted-foreground uppercase tracking-wide">
            Görsel {defaults ? "(değiştirmek için seçin)" : ""}
          </Label>
          {defaults?.image && (
            <div className="relative mb-1 h-24 w-36 overflow-hidden rounded-md">
              <Image src={defaults.image} alt="" fill sizes="144px" className="object-cover" />
            </div>
          )}
          <input
            id="image"
            name="image"
            type="file"
            accept="image/jpeg,image/png,image/webp,image/avif"
            required={!defaults}
            className="text-sm file:mr-3 file:rounded-md file:border-0 file:bg-surface-2 file:px-3 file:py-2 file:text-xs file:font-medium"
          />
        </div>

        <label className="flex items-center gap-2 text-sm text-foreground">
          <input type="checkbox" name="featured" defaultChecked={defaults?.featured ?? false} className="h-4 w-4" />
          Anasayfada öne çıkar
        </label>

        <label className="flex items-center gap-2 text-sm text-foreground">
          <input type="checkbox" name="published" defaultChecked={defaults?.published ?? true} className="h-4 w-4" />
          Yayınla
        </label>
      </div>

      {state?.error && <p className="text-xs font-medium text-destructive">{state.error}</p>}

      <Button
        type="submit"
        disabled={isPending}
        className="h-11 w-fit gap-2 self-start rounded-full bg-gold px-6 text-sm font-semibold text-primary-foreground hover:bg-gold hover:brightness-110"
      >
        {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
        {submitLabel}
      </Button>
    </form>
  );
}
