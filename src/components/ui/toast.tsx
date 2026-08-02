"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

type ToastVariant = "default" | "destructive";

interface ToastOptions {
  title: string;
  variant?: ToastVariant;
}

interface ToastItem extends Required<ToastOptions> {
  id: string;
}

const TOAST_EVENT = "papercraft-toast";

export function toast({
  title,
  variant = "default",
}: ToastOptions) {
  if (typeof window === "undefined") {
    return;
  }

  window.dispatchEvent(
    new CustomEvent<ToastItem>(TOAST_EVENT, {
      detail: {
        id: crypto.randomUUID(),
        title,
        variant,
      },
    })
  );
}

export function Toaster() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  useEffect(() => {
    const handleToast = (event: Event) => {
      const toastEvent = event as CustomEvent<ToastItem>;

      setToasts((currentToasts) => [...currentToasts, toastEvent.detail]);

      window.setTimeout(() => {
        setToasts((currentToasts) =>
          currentToasts.filter((item) => item.id !== toastEvent.detail.id)
        );
      }, 3500);
    };

    window.addEventListener(TOAST_EVENT, handleToast);

    return () => {
      window.removeEventListener(TOAST_EVENT, handleToast);
    };
  }, []);

  return (
    <div className="fixed right-4 bottom-4 z-[100] flex w-[calc(100%-2rem)] max-w-sm flex-col gap-2">
      {toasts.map((item) => (
        <div
          key={item.id}
          role="status"
          className={cn(
            "rounded-lg border bg-background px-4 py-3 text-sm text-foreground",
            item.variant === "destructive" &&
              "border-destructive/40 text-destructive"
          )}
        >
          {item.title}
        </div>
      ))}
    </div>
  );
}
