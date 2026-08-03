// AppSidebar.tsx
"use client";

import {
    FileText,
    FolderOpen,
    Home,
    PlusCircle
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Separator } from "@/components/ui/separator";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";

const translations = {
  en: {
    app: "PaperCraft",
    subtitle: "Professional Question Builder",
    main: "Main",
    system: "System",
    dashboard: "Dashboard",
    create: "Create Paper",
    papers: "All Papers",
    templates: "Templates",
    settings: "Settings",
  },
  ur: {
    app: "پیپر کرافٹ",
    subtitle: "پروفیشنل سوالیہ پرچہ ساز",
    main: "مین",
    system: "سسٹم",
    dashboard: "ڈیش بورڈ",
    create: "نیا پیپر",
    papers: "تمام پیپرز",
    templates: "ٹیمپلیٹس",
    settings: "سیٹنگز",
  },
};

interface Props {
  lang: "en" | "ur";
}

export default function AppSidebar({ lang }: Props) {
  const pathname = usePathname();
  const t = translations[lang];
  const isUrdu = lang === "ur";

  const items = [
    {
      title: t.dashboard,
      href: `/${lang}`,
      icon: Home,
    },
    {
      title: t.create,
      href: `/${lang}/paper`,
      icon: PlusCircle,
    },
    {
      title: t.papers,
      href: `/${lang}/papers`,
      icon: FolderOpen,
    },
  ];

  return (
    <Sidebar collapsible="icon" variant="sidebar" side={isUrdu ? "right" : "left"}>
      <SidebarHeader className="border-b">
        <div className="flex items-center gap-2.5 px-3 py-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border bg-background">
            <FileText className="h-4 w-4 text-foreground" />
          </div>
          <div className="min-w-0 group-data-[collapsible=icon]:hidden">
            <h2 className="truncate text-sm font-semibold leading-tight">
              {t.app}
            </h2>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{t.main}</SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    render={<Link href={item.href} />}
                    isActive={pathname === item.href}
                    tooltip={item.title}
                    className="data-[active=true]:bg-primary data-[active=true]:text-primary-foreground transition-all duration-200 rounded-lg hover:bg-sidebar-accent/50"
                  >
                    <item.icon className="h-4 w-4" />
                    <span className="font-medium">{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t">
        <SidebarGroup>
          <SidebarGroupLabel>{t.system}</SidebarGroupLabel>

         
        </SidebarGroup>

        <Separator className="my-1 group-data-[collapsible=icon]:hidden" />

        <div className="px-3 py-2 text-xs text-muted-foreground group-data-[collapsible=icon]:hidden">
          PaperCraft v1.0
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}