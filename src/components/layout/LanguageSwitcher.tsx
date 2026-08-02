// LanguageSwitcher.tsx
"use client";

import { Check, Globe } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Locale = "en" | "ur";

const LOCALES: { value: Locale; label: string; nativeLabel: string }[] = [
  { value: "en", label: "English", nativeLabel: "English" },
  { value: "ur", label: "Urdu", nativeLabel: "اردو" },
];

function getLocaleFromPathname(pathname: string): Locale {
  const segment = pathname.split("/")[1];
  return segment === "ur" ? "ur" : "en";
}

function buildLocalizedPath(pathname: string, nextLocale: Locale): string {
  const segments = pathname.split("/");
  const currentSegment = segments[1];

  if (currentSegment === "en" || currentSegment === "ur") {
    segments[1] = nextLocale;
    return segments.join("/") || "/";
  }

  // No locale segment present in the pathname — prefix it instead of replacing.
  return `/${nextLocale}${pathname === "/" ? "" : pathname}`;
}

export function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();

  const currentLocale = getLocaleFromPathname(pathname);
  const currentLocaleData =
    LOCALES.find((locale) => locale.value === currentLocale) ?? LOCALES[0];

  const handleLocaleChange = (nextLocale: Locale) => {
    if (nextLocale === currentLocale) return;

    const nextPath = buildLocalizedPath(pathname, nextLocale);
    router.push(nextPath);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="outline"
            className="rounded-lg cursor-pointer border shadow-none"
            aria-label="Change language"
          >
            <Globe className="h-4 w-4" />
            <span className="hidden sm:inline">
              {currentLocaleData.nativeLabel}
            </span>
          </Button>
        }
      />

      <DropdownMenuContent align="end" className="rounded-lg border shadow-none">
        {LOCALES.map((locale) => (
          <DropdownMenuItem
            key={locale.value}
            onClick={() => handleLocaleChange(locale.value)}
            className="flex items-center justify-between gap-2"
          >
            <span>{locale.nativeLabel}</span>
            {locale.value === currentLocale && (
              <Check className="h-4 w-4" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default LanguageSwitcher;