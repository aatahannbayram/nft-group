"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import {
  Building2,
  Hammer,
  Loader2,
  Mail,
  MessageSquare,
  Phone,
  User,
  Wallet,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { inquirySchema, projectTypes, type InquiryInput } from "@/lib/validations/inquiry";
import { submitInquiry } from "@/app/[locale]/(marketing)/iletisim/actions";
import { cn } from "@/lib/utils";

const fieldClass =
  "h-12 rounded-md border-border bg-surface-2 pl-10 text-[15px] focus-visible:border-gold focus-visible:ring-gold/25";

export function InquiryForm() {
  const t = useTranslations("contact.form");
  const tTypes = useTranslations("contact.projectTypes");
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<InquiryInput>({
    resolver: zodResolver(inquirySchema),
  });

  const projectType = watch("projectType");

  const onSubmit = (data: InquiryInput) => {
    startTransition(async () => {
      const result = await submitInquiry(data);
      if (result.success) {
        toast.success(t("success"));
        reset();
      } else {
        toast.error(result.error ?? t("error"));
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="name" className="text-xs text-muted-foreground uppercase tracking-wide">
            {t("name")}
          </Label>
          <div className="relative">
            <User className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="name"
              autoComplete="name"
              className={fieldClass}
              aria-invalid={!!errors.name}
              {...register("name")}
            />
          </div>
          {errors.name && (
            <p className="text-xs text-destructive">{errors.name.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="company" className="text-xs text-muted-foreground uppercase tracking-wide">
            {t("company")}
          </Label>
          <div className="relative">
            <Building2 className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="company"
              autoComplete="organization"
              className={fieldClass}
              {...register("company")}
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="phone" className="text-xs text-muted-foreground uppercase tracking-wide">
            {t("phone")}
          </Label>
          <div className="relative">
            <Phone className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="phone"
              type="tel"
              autoComplete="tel"
              className={fieldClass}
              aria-invalid={!!errors.phone}
              {...register("phone")}
            />
          </div>
          {errors.phone && (
            <p className="text-xs text-destructive">{errors.phone.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="email" className="text-xs text-muted-foreground uppercase tracking-wide">
            {t("email")}
          </Label>
          <div className="relative">
            <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="email"
              type="email"
              autoComplete="email"
              className={fieldClass}
              aria-invalid={!!errors.email}
              {...register("email")}
            />
          </div>
          {errors.email && (
            <p className="text-xs text-destructive">{errors.email.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="projectType" className="text-xs text-muted-foreground uppercase tracking-wide">
            {t("projectType")}
          </Label>
          <div className="relative">
            <Hammer className="pointer-events-none absolute left-3.5 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Select
              value={projectType}
              onValueChange={(value) =>
                setValue("projectType", value as InquiryInput["projectType"], {
                  shouldValidate: true,
                })
              }
            >
              <SelectTrigger
                id="projectType"
                className={cn(fieldClass, "w-full justify-between pr-3")}
              >
                <SelectValue>
                  {(value: InquiryInput["projectType"] | null) =>
                    value ? tTypes(value) : t("projectType")
                  }
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {projectTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {tTypes(type)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {errors.projectType && (
            <p className="text-xs text-destructive">
              {errors.projectType.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="budgetRange" className="text-xs text-muted-foreground uppercase tracking-wide">
            {t("budgetRange")}
          </Label>
          <div className="relative">
            <Wallet className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="budgetRange"
              className={fieldClass}
              {...register("budgetRange")}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="message" className="text-xs text-muted-foreground uppercase tracking-wide">
          {t("message")}
        </Label>
        <div className="relative">
          <MessageSquare className="pointer-events-none absolute left-3.5 top-4 h-4 w-4 text-muted-foreground" />
          <Textarea
            id="message"
            rows={5}
            className="rounded-md border-border bg-surface-2 pl-10 pt-3.5 text-[15px] focus-visible:border-gold focus-visible:ring-gold/25"
            aria-invalid={!!errors.message}
            {...register("message")}
          />
        </div>
        {errors.message && (
          <p className="text-xs text-destructive">{errors.message.message}</p>
        )}
      </div>

      <Button
        type="submit"
        disabled={isPending}
        size="lg"
        className="h-12 gap-2 self-start rounded-full bg-gold px-8 text-[15px] font-semibold text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold hover:shadow-glow-gold hover:brightness-110"
      >
        {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
        {isPending ? t("submitting") : t("submit")}
      </Button>
    </form>
  );
}
