"use client";

import { useState } from "react";

interface MascotBubbleProps {
  message?: string;
  position?: "left" | "right";
}

export default function MascotBubble({
  message = "Hallo! Ich bin Kiko! 🦊",
  position = "right",
}: MascotBubbleProps) {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div
      className={`fixed bottom-24 ${position === "right" ? "right-4" : "left-4"} z-40 flex items-end gap-2 ${position === "left" ? "flex-row-reverse" : ""}`}
    >
      {message && (
        <div className="relative bg-white dark:bg-slate-700 rounded-kids shadow-kids px-4 py-3 max-w-[180px] mb-2">
          <p className="text-kids-sm font-bold text-gray-700 dark:text-gray-100 leading-snug">{message}</p>
          <button
            onClick={() => setVisible(false)}
            className="absolute -top-2 -right-2 bg-gray-200 dark:bg-slate-600 rounded-full w-6 h-6 text-xs font-bold text-gray-600 dark:text-gray-300 flex items-center justify-center hover:bg-gray-300 dark:hover:bg-slate-500"
            aria-label="Schließen"
          >
            ✕
          </button>
        </div>
      )}
      <div className="text-5xl animate-float select-none cursor-pointer" onClick={() => setVisible(!visible)}>
        🦊
      </div>
    </div>
  );
}
