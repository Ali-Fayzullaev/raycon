"use client";
import React from "react";
import { motion } from "framer-motion";
import { COLORS } from "@/lib/theme";

const float = {
  initial: { y: 0 },
  animate: {
    y: [0, -10, 0],
    transition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
  },
};

export default function Robo() {
  return (
    <div>
      dsa
    </div>
  );
}