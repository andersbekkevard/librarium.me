"use client";

import { CheckCircleIcon, WarningCircleIcon } from "@phosphor-icons/react";
import { useSyncExternalStore } from "react";
import { cn } from "./ui";

type Toast = { id: number; tone: "success" | "error"; text: string };

let toasts: Toast[] = [];
let nextId = 0;
const listeners = new Set<() => void>();
const emit = () => listeners.forEach((l) => l());

export function toast(text: string, tone: Toast["tone"] = "success") {
  const id = ++nextId;
  toasts = [...toasts.slice(-2), { id, tone, text }];
  emit();
  setTimeout(() => {
    toasts = toasts.filter((t) => t.id !== id);
    emit();
  }, tone === "error" ? 6000 : 3500);
}

/** Runs an action; reports failure as a toast (and success too, when a message is given). */
export async function attempt(action: Promise<unknown>, success?: string): Promise<boolean> {
  try {
    await action;
    if (success) toast(success);
    return true;
  } catch (e) {
    toast(e instanceof Error ? e.message : "Something went wrong. Please try again.", "error");
    return false;
  }
}

const subscribe = (l: () => void) => (listeners.add(l), () => void listeners.delete(l));
const NONE: Toast[] = [];

export function Toaster() {
  const items = useSyncExternalStore(subscribe, () => toasts, () => NONE);
  return (
    <div aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-4 z-[60] flex flex-col items-center gap-2 px-4 sm:items-end sm:pr-6">
      {items.map((t) => (
        <div
          key={t.id}
          role={t.tone === "error" ? "alert" : "status"}
          className={cn(
            "pointer-events-auto flex max-w-sm items-start gap-2.5 rounded-xl border bg-popover px-4 py-3 text-sm shadow-xl animate-toast",
            t.tone === "error" ? "border-status-error/30" : "border-brand-accent/30",
          )}
        >
          {t.tone === "error" ? <WarningCircleIcon className="mt-0.5 size-4 shrink-0 text-status-error" weight="fill" /> : <CheckCircleIcon className="mt-0.5 size-4 shrink-0 text-status-success" weight="fill" />}
          <span className="text-foreground">{t.text}</span>
        </div>
      ))}
    </div>
  );
}
