"use client";

import { Button } from "@/components/ui/button"; // Adjust this import path if needed

export function PrintButton() {
  return (
    <Button onClick={() => window.print()} variant="default">
      Print Paper
    </Button>
  );
}