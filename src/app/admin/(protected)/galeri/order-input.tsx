"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { updateDisplayOrder } from "./actions";

export function OrderInput({ id, order }: { id: string; order: number }) {
  const [isPending, startTransition] = useTransition();

  return (
    <input
      type="number"
      defaultValue={order}
      disabled={isPending}
      onBlur={(e) => {
        const value = Number(e.target.value);
        if (Number.isNaN(value) || value === order) return;
        startTransition(async () => {
          try {
            await updateDisplayOrder(id, value);
          } catch {
            toast.error("Sıra güncellenemedi.");
          }
        });
      }}
      className="h-8 w-16 rounded-md border border-border bg-transparent px-2 text-sm disabled:opacity-50"
    />
  );
}
