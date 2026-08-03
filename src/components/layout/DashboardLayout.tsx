// DashboardLayout.tsx
"use client";

import { montserrat } from "@/lib/font";
import { cn } from "@/lib/utils";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";

import AppNavbar from "./AppNavbar";
import AppSidebar from "./AppSidebar";

interface Props {
  lang: "en" | "ur";
  children: React.ReactNode;
}

export default function DashboardLayout({ lang, children }: Props) {
  const isUrdu = lang === "ur";

  return (
    <div
      className={cn(
        "min-h-screen bg-[#FAFAFA] font-sans text-foreground antialiased",
        montserrat.variable
      )}
      dir={isUrdu ? "rtl" : "ltr"}
    >
      <TooltipProvider>
        <SidebarProvider defaultOpen>
          <AppSidebar lang={lang} />

          <SidebarInset>
            <AppNavbar lang={lang} />

            <main className="flex-1 p-4 md:p-6 lg:p-8">{children}</main>
          </SidebarInset>
        </SidebarProvider>
      </TooltipProvider>
    </div>
  );
}