"use client";

import { useTransition } from "react";
import { Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { deleteGalleryItem } from "./actions";

export function DeleteButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      type="button"
      aria-label="Sil"
      disabled={isPending}
      onClick={() => {
        if (!confirm("Bu fotoğrafı silmek istediğinizden emin misiniz?")) return;
        startTransition(async () => {
          try {
            await deleteGalleryItem(id);
          } catch {
            toast.error("Fotoğraf silinemedi.");
          }
        });
      }}
      className="flex h-8 w-8 items-center justify-center rounded-md bg-white/90 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive disabled:opacity-50"
    >
      {isPending ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Trash2 className="h-4 w-4" />
      )}
    </button>
  );
}
