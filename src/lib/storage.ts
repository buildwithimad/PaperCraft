import { PaperValues } from "@/validations/paper";

const STORAGE_KEY = "papercraft_values_v1";

export function savePaperValues(data: PaperValues): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error("Failed to save paper values to localStorage:", error);
  }
}

export function getPaperValues(): PaperValues | null {
  if (typeof window === "undefined") return null;
  try {
    const item = localStorage.getItem(STORAGE_KEY);
    return item ? (JSON.parse(item) as PaperValues) : null;
  } catch (error) {
    console.error("Failed to parse paper values from localStorage:", error);
    return null;
  }
}

export function clearPaperValues(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error("Failed to clear paper values from localStorage:", error);
  }
}