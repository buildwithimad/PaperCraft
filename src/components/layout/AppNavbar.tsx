// AppNavbar.tsx
"use client";

import LogoutButton from "@/components/auth/LogoutButton";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";

interface Props {
  lang: "en" | "ur";
}

export default function AppNavbar({ lang }: Props) {
  return (
    <header className="sticky top-0 z-40 flex h-18 items-center gap-3 border-b bg-background px-4 lg:px-6">
      {/* Leading side (start) */}
      <div className="flex items-center gap-3">
        <SidebarTrigger />
        <Separator orientation="vertical" className="h-5" />
        <h1 className="text-sm font-semibold">PaperCraft</h1>
      </div>

      {/* Trailing side (end) */}
      <div className="ms-auto flex items-center gap-1">
        <LanguageSwitcher />
        <LogoutButton lang={lang} />

        <Separator orientation="vertical" className="mx-1 h-5" />

        <Avatar className="h-8 w-8 rounded-full border">
          <AvatarFallback className="rounded-full text-xs font-medium">
            A
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}