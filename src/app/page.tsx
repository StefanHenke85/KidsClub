"use client";

import Link from "next/link";
import MascotBubble from "@/components/layout/MascotBubble";
import { useChildSessionStore } from "@/store/useChildSessionStore";
import XpBar from "@/components/progress/XpBar";

const FEATURES = [
  {
    href: "/suche",
    emoji: "🔍",
    label: "Suchen",
    sub: "Sicher im Internet",
    bg: "bg-kidsYellow dark:bg-yellow-700",
    shadow: "shadow-[0_7px_0_#c9a800] dark:shadow-[0_7px_0_#854d0e]",
  },
  {
    href: "/hausaufgaben",
    emoji: "✏️",
    label: "Hausaufgaben",
    sub: "Kiko hilft dir!",
    bg: "bg-kidsBlue dark:bg-blue-700",
    shadow: "shadow-[0_7px_0_#3a9fc9] dark:shadow-[0_7px_0_#1d4ed8]",
  },
  {
    href: "/spiele",
    emoji: "🎮",
    label: "Spielen",
    sub: "Mathe, Deutsch & mehr",
    bg: "bg-kidsGreen dark:bg-emerald-700",
    shadow: "shadow-[0_7px_0_#2daa7a] dark:shadow-[0_7px_0_#065f46]",
  },
  {
    href: "/chat",
    emoji: "💬",
    label: "Chatten",
    sub: "Mit meinen Freunden",
    bg: "bg-kidsPurple dark:bg-purple-700",
    shadow: "shadow-[0_7px_0_#8b36d4] dark:shadow-[0_7px_0_#581c87]",
  },
];

export default function HomePage() {
  const { session } = useChildSessionStore();

  return (
    <main className="min-h-screen bg-kidsBg dark:bg-slate-900 font-kids pb-24 transition-colors duration-300">
      {/* Header */}
      <header className="px-5 pt-14 pb-4">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-5xl animate-float">🦊</span>
          <div>
            <h1 className="text-kids-xl font-black text-gray-800 dark:text-gray-100 leading-tight">
              {session ? `Hallo, ${session.name}!` : "KidsClub"}
            </h1>
            <p className="text-kids-sm text-gray-500 dark:text-gray-400 font-semibold">
              {session ? `Klasse ${session.grade} · Dein sicherer Bereich!` : "Dein sicherer Bereich!"}
            </p>
          </div>
          {session && (
            <div className="ml-auto text-right">
              <p className="text-xs text-gray-400 dark:text-gray-500">Klasse {session.grade}</p>
            </div>
          )}
        </div>
        {session && (
          <XpBar xpTotal={session.xpTotal} level={session.level} compact />
        )}
        {!session && (
          <Link
            href="/login/kind"
            className="inline-flex items-center gap-2 bg-kidsGreen/10 dark:bg-green-900/20 border border-kidsGreen/30 rounded-kids px-3 py-2 text-xs font-bold text-kidsGreen dark:text-green-400"
          >
            🔑 Anmelden für XP & Badges
          </Link>
        )}
      </header>

      {/* 2×2 Feature Grid */}
      <section className="px-4 grid grid-cols-2 gap-4 max-w-lg mx-auto">
        {FEATURES.map(({ href, emoji, label, sub, bg, shadow }) => (
          <Link
            key={href}
            href={href}
            className={`
              ${bg} ${shadow}
              rounded-kids-lg p-5 flex flex-col items-center justify-center gap-2
              text-center active:translate-y-1 transition-all duration-150
              min-h-[150px] select-none
            `}
          >
            <span className="text-5xl">{emoji}</span>
            <span className="text-kids-md font-black text-gray-800 dark:text-white">{label}</span>
            <span className="text-xs font-semibold text-gray-700 dark:text-gray-200">{sub}</span>
          </Link>
        ))}
      </section>

      {/* Eltern-Link */}
      <div className="mt-8 text-center flex flex-col gap-2">
        {session && (
          <button
            type="button"
            onClick={async () => {
              await fetch("/api/auth/kind-logout", { method: "POST" });
              useChildSessionStore.getState().setSession(null);
            }}
            className="text-xs text-gray-400 dark:text-gray-500"
          >
            🚪 Abmelden
          </button>
        )}
        <Link
          href="/eltern"
          className="text-sm text-gray-400 dark:text-gray-500 font-semibold underline underline-offset-2"
        >
          🔒 Elternbereich
        </Link>
      </div>

      <MascotBubble message={session ? `Super! Weiter so, ${session.name}! 🌟` : "Hallo! Was möchtest du heute machen? 😊"} />
    </main>
  );
}
