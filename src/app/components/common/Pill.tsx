import React from "react";
import { Sparkles } from "lucide-react";
import { COLORS } from "@/lib/theme";

export default function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium"
      style={{
        borderColor: COLORS.primary,
        color: COLORS.primary,
        background: COLORS.mint,
      }}
    >
      <Sparkles className="h-3.5 w-3.5" /> {children}
    </span>
  );
}

