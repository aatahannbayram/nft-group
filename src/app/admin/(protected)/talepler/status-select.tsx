"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { INQUIRY_STATUS_LABELS } from "@/lib/admin/labels";
import { updateInquiryStatus } from "./actions";

type Status = keyof typeof INQUIRY_STATUS_LABELS;

export function StatusSelect({ id, status }: { id: string; status: Status }) {
  const [isPending, startTransition] = useTransition();

  return (
    <Select
      value={status}
      disabled={isPending}
      onValueChange={(value) => {
        startTransition(async () => {
          try {
            await updateInquiryStatus(id, value as Status);
          } catch {
            toast.error("Durum güncellenemedi.");
          }
        });
      }}
    >
      <SelectTrigger className="h-8 w-[150px] text-xs">
        <SelectValue>
          {(value: Status) => INQUIRY_STATUS_LABELS[value]}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {Object.entries(INQUIRY_STATUS_LABELS).map(([value, label]) => (
          <SelectItem key={value} value={value}>
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
