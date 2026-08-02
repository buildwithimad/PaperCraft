"use client";

import { LogOut } from "lucide-react";

import { logoutAction } from "@/actions/auth";
import { Button } from "@/components/ui/button";

interface Props {
  lang?: "en" | "ur";
}

export default function LogoutButton({
  lang = "en",
}: Props) {
  return (
    <form action={logoutAction}>
      <Button
        type="submit"
        variant="ghost"
        className="w-full cursor-pointer justify-start text-destructive hover:text-destructive"
      >
        <LogOut className="mr-2 h-4 w-4" />

        {lang === "ur"
          ? "لاگ آؤٹ"
          : "Logout"}
      </Button>
    </form>
  );
}