"use client"

import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion"
import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"

function Accordion({ className, ...props }: AccordionPrimitive.Root.Props) {
  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      className={cn("flex flex-col gap-3", className)}
      {...props}
    />
  )
}

function AccordionItem({ className, ...props }: AccordionPrimitive.Item.Props) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn(
        "glass overflow-hidden rounded-2xl px-6 transition-all duration-300 hover:shadow-md data-panel-open:shadow-lg sm:px-7",
        className
      )}
      {...props}
    />
  )
}

function AccordionTrigger({
  className,
  children,
  ...props
}: AccordionPrimitive.Trigger.Props) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "group flex flex-1 items-center justify-between gap-4 py-5 text-left font-display text-base font-semibold text-foreground transition-colors hover:text-navy focus-visible:outline-none",
          className
        )}
        {...props}
      >
        {children}
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold/10 text-gold transition-all duration-300 group-data-panel-open:rotate-180 group-data-panel-open:bg-gold group-data-panel-open:text-white">
          <ChevronDown className="h-4 w-4" />
        </span>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

function AccordionPanel({
  className,
  children,
  ...props
}: AccordionPrimitive.Panel.Props) {
  return (
    <AccordionPrimitive.Panel
      data-slot="accordion-panel"
      className={cn(
        "h-[var(--accordion-panel-height)] overflow-hidden text-sm transition-[height] duration-300 ease-out data-ending-style:h-0 data-starting-style:h-0",
        className
      )}
      {...props}
    >
      <div className="pb-5 pr-10 text-muted-foreground">{children}</div>
    </AccordionPrimitive.Panel>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionPanel }
