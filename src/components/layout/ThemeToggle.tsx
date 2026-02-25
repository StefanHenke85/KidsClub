"use client";

import { useThemeStore } from "@/store/useThemeStore";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <button
      onClick={toggleTheme}
      aria-label={theme === "dark" ? "Helles Design" : "Dunkles Design"}
      className={`
        fixed top-4 right-4 z-50 w-12 h-12 rounded-full flex items-center justify-center
        text-2xl shadow-kids transition-all active:scale-90
        ${theme === "dark"
          ? "bg-slate-700 border-2 border-slate-500"
          : "bg-white border-2 border-gray-200"}
      `}
    >
      {theme === "dark" ? "☀️" : "🌙"}
    </button>
  );
}
