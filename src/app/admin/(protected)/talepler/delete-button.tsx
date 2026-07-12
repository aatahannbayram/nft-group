"use client";

import { useTransition } from "react";
import { Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { deleteInquiry } from "./actions";

export function DeleteButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      type="button"
      aria-label="Sil"
      disabled={isPending}
      onClick={() => {
        if (!confirm("Bu talebi silmek istediğinizden emin misiniz?")) return;
        startTransition(async () => {
          try {
            await deleteInquiry(id);
          } catch {
            toast.error("Talep silinemedi.");
          }
        });
      }}
      className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive disabled:opacity-50"
    >
      {isPending ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Trash2 className="h-4 w-4" />
      )}
    </button>
  );
}
