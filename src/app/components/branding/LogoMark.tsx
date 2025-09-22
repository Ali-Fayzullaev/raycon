import React from "react";
import { COLORS } from "@/lib/theme";

export default function LogoMark() {
  return (
    <div
      className="font-black tracking-tight text-xl"
      style={{ color: COLORS.primary }}
    >
      RAYCON
      <span className="font-extrabold" style={{ color: COLORS.dark }}>
        CRM
      </span>
    </div>
  );
}
