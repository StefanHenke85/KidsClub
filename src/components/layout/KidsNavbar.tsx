"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";

const NAV_ITEMS = [
  { href: "/",             emoji: "🏠", label: "Start"         },
  { href: "/suche",        emoji: "🔍", label: "Suchen"        },
  { href: "/hausaufgaben", emoji: "✏️", label: "Hausaufgaben"  },
  { href: "/spiele",       emoji: "🎮", label: "Spielen"       },
  { href: "/chat",         emoji: "💬", label: "Chatten"       },
];

export default function KidsNavbar() {
  const pathname = usePathname();

  if (pathname.startsWith("/eltern")) return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-slate-800 border-t-4 border-kidsPurple dark:border-purple-700 shadow-lg transition-colors duration-300">
      <ul className="flex justify-around items-center h-20 max-w-lg mx-auto px-2">
        {NAV_ITEMS.map(({ href, emoji, label }) => {
          const active = pathname === href || (href !== "/" && pathname.startsWith(href));
          return (
            <li key={href}>
              <Link
                href={href}
                aria-label={label}
                className={clsx(
                  "flex flex-col items-center gap-1 px-3 py-2 rounded-kids transition-all",
                  active
                    ? "bg-kidsPurple dark:bg-purple-700 text-white scale-110 shadow-kids"
                    : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-700"
                )}
              >
                <span className={clsx("text-2xl", active && "animate-bounce-soft")}>
                  {emoji}
                </span>
                <span className="text-xs font-bold hidden sm:block">{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
