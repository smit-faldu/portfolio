"use client";

import * as React from "react";
import { Accordion as AccordionPrimitive } from "radix-ui";

import { cn } from "@/lib/utils";

/**
 * shadcn/ui Accordion, restyled for this design system.
 *
 * The stock chevron is replaced with a monospace +/− marker so the disclosure
 * reads as part of the document's notation rather than as a UI widget. Radix
 * still supplies the keyboard behaviour, roles and height measurement.
 */

function Accordion({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      className={cn("flex w-full flex-col", className)}
      {...props}
    />
  );
}

function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn("w-full", className)}
      {...props}
    />
  );
}

function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          // No `outline-none` here: the global focus-visible ring is the
          // keyboard affordance, and the colour shift alone would not be one.
          "group/trigger t-meta flex items-center gap-3 py-2 text-fg-2 transition-colors duration-300",
          "hover:text-fg-1 focus-visible:text-fg-1 disabled:pointer-events-none disabled:opacity-50",
          className,
        )}
        {...props}
      >
        <span
          aria-hidden
          className={cn(
            "relative grid size-4 shrink-0 place-items-center border border-[var(--edge)]",
            "text-signal transition-colors duration-300",
            "group-hover/trigger:border-[var(--signal-dim)]",
          )}
        >
          <span className="absolute h-px w-2 bg-current" />
          <span className="absolute h-2 w-px bg-current transition-transform duration-400 ease-[var(--ease-out-expo)] group-aria-expanded/trigger:scale-y-0" />
        </span>
        {children}
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className="overflow-hidden data-closed:animate-accordion-up data-open:animate-accordion-down"
      {...props}
    >
      <div className={cn("pt-6 pb-2", className)}>{children}</div>
    </AccordionPrimitive.Content>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
