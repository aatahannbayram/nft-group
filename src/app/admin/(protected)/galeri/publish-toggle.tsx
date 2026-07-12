"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { togglePublished } from "./actions";

export function PublishToggle({
  id,
  published,
}: {
  id: string;
  published: boolean;
}) {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={isPending}
      onClick={() => {
        startTransition(async () => {
          try {
            await togglePublished(id, !published);
          } catch {
            toast.error("Güncellenemedi.");
          }
        });
      }}
      className="disabled:opacity-50"
    >
      <Badge
        variant={published ? "default" : "outline"}
        className={published ? "bg-gold text-primary-foreground" : "text-muted-foreground"}
      >
        {published ? "Yayında" : "Taslak"}
      </Badge>
    </button>
  );
}
