"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";

const NAV_ITEMS = [
  {
    href: "/",
    emoji: "🏠",
    label: "Start",
    activeBg: "bg-kidsPurple",
    activeGlow: "shadow-[0_4px_12px_rgba(167,139,250,0.6)]",
    inactiveBg: "bg-purple-100 dark:bg-purple-900/30",
  },
  {
    href: "/suche",
    emoji: "🔍",
    label: "Suchen",
    activeBg: "bg-kidsYellow",
    activeGlow: "shadow-[0_4px_12px_rgba(255,209,102,0.7)]",
    inactiveBg: "bg-yellow-100 dark:bg-yellow-900/30",
  },
  {
    href: "/hausaufgaben",
    emoji: "✏️",
    label: "Aufgaben",
    activeBg: "bg-kidsBlue",
    activeGlow: "shadow-[0_4px_12px_rgba(116,194,225,0.6)]",
    inactiveBg: "bg-blue-100 dark:bg-blue-900/30",
  },
  {
    href: "/spiele",
    emoji: "🎮",
    label: "Spielen",
    activeBg: "bg-kidsGreen",
    activeGlow: "shadow-[0_4px_12px_rgba(107,197,160,0.6)]",
    inactiveBg: "bg-green-100 dark:bg-green-900/30",
  },
  {
    href: "/chat",
    emoji: "💬",
    label: "Chatten",
    activeBg: "bg-kidsPink",
    activeGlow: "shadow-[0_4px_12px_rgba(244,143,177,0.6)]",
    inactiveBg: "bg-pink-100 dark:bg-pink-900/30",
  },
];

export default function KidsNavbar() {
  const pathname = usePathname();

  if (pathname.startsWith("/eltern") || pathname.startsWith("/login")) return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50">
      {/* Weicher Übergang nach oben */}
      <div className="h-6 bg-gradient-to-t from-white/90 dark:from-slate-900/90 to-transparent pointer-events-none" />

      <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t-2 border-purple-100 dark:border-slate-700 px-3 pb-safe pt-1">
        <ul className="flex justify-around items-center h-16 max-w-lg mx-auto gap-1">
          {NAV_ITEMS.map(({ href, emoji, label, activeBg, activeGlow, inactiveBg }) => {
            const active = pathname === href || (href !== "/" && pathname.startsWith(href));
            return (
              <li key={href} className="flex-1 flex justify-center">
                <Link
                  href={href}
                  aria-label={label}
                  className="flex flex-col items-center gap-1 w-full max-w-[68px] transition-all duration-200 group"
                >
                  {/* Icon-Bubble */}
                  <span
                    className={clsx(
                      "flex items-center justify-center w-11 h-11 rounded-2xl transition-all duration-200 text-2xl leading-none",
                      active
                        ? [activeBg, activeGlow, "scale-110 -translate-y-1"]
                        : [inactiveBg, "opacity-80 group-hover:scale-105 group-hover:opacity-100"]
                    )}
                  >
                    {emoji}
                  </span>
                  {/* Label */}
                  <span
                    className={clsx(
                      "text-[9px] font-black tracking-wide transition-all duration-200 leading-none",
                      active
                        ? "text-kidsPurple dark:text-purple-300"
                        : "text-gray-400 dark:text-slate-500"
                    )}
                  >
                    {label}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
