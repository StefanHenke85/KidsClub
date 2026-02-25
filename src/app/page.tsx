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
    desc: "Finde Infos zu jedem Thema – kindersicher gefiltert",
    bg: "bg-kidsYellow dark:bg-yellow-700",
    shadow: "shadow-[0_7px_0_#c9a800] dark:shadow-[0_7px_0_#854d0e]",
  },
  {
    href: "/hausaufgaben",
    emoji: "✏️",
    label: "Hausaufgaben",
    sub: "Kiko hilft dir!",
    desc: "Der Fuchs Kiko erklärt dir Schritt für Schritt",
    bg: "bg-kidsBlue dark:bg-blue-700",
    shadow: "shadow-[0_7px_0_#3a9fc9] dark:shadow-[0_7px_0_#1d4ed8]",
  },
  {
    href: "/spiele",
    emoji: "🎮",
    label: "Spielen & Lernen",
    sub: "XP sammeln!",
    desc: "Mathe, Deutsch & Logik – passend zu deiner Klasse",
    bg: "bg-kidsGreen dark:bg-emerald-700",
    shadow: "shadow-[0_7px_0_#2daa7a] dark:shadow-[0_7px_0_#065f46]",
  },
  {
    href: "/chat",
    emoji: "💬",
    label: "Chatten",
    sub: "Mit meinen Freunden",
    desc: "Schreibe sicher mit Freunden – von Eltern genehmigt",
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
              {session ? `Hallo, ${session.name}! 👋` : "KidsClub"}
            </h1>
            <p className="text-kids-sm text-gray-500 dark:text-gray-400 font-semibold">
              {session ? `Klasse ${session.grade} · Dein sicherer Bereich!` : "Lernen macht Spaß!"}
            </p>
          </div>
        </div>
        {session ? (
          <XpBar xpTotal={session.xpTotal} level={session.level} compact />
        ) : (
          <Link
            href="/login/kind"
            className="inline-flex items-center gap-2 bg-kidsGreen/10 dark:bg-green-900/20 border-2 border-kidsGreen/40 rounded-kids px-4 py-2 text-kids-sm font-black text-kidsGreen dark:text-green-400"
          >
            🔑 Anmelden für XP &amp; Badges
          </Link>
        )}
      </header>

      {/* Feature Cards */}
      <section className="px-4 flex flex-col gap-3 max-w-lg mx-auto">
        {FEATURES.map(({ href, emoji, label, sub, desc, bg, shadow }) => (
          <Link
            key={href}
            href={href}
            className={`
              ${bg} ${shadow}
              rounded-kids-lg px-5 py-4 flex items-center gap-4
              active:translate-y-1 transition-all duration-150 select-none
            `}
          >
            <span className="text-5xl flex-shrink-0">{emoji}</span>
            <div className="flex-1 min-w-0">
              <p className="text-kids-md font-black text-gray-800 dark:text-white leading-tight">{label}</p>
              <p className="text-xs font-bold text-gray-700 dark:text-gray-200">{sub}</p>
              <p className="text-xs text-gray-600 dark:text-gray-300 mt-0.5 leading-snug">{desc}</p>
            </div>
            <span className="text-3xl text-gray-700 dark:text-gray-300 flex-shrink-0">›</span>
          </Link>
        ))}
      </section>

      {/* Eltern / Abmelden */}
      <div className="mt-8 text-center flex flex-col gap-2">
        {session && (
          <button
            type="button"
            onClick={async () => {
              await fetch("/api/auth/kind-logout", { method: "POST" });
              useChildSessionStore.getState().setSession(null);
            }}
            className="text-xs text-gray-400 dark:text-gray-500 underline"
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

      <MascotBubble
        message={session
          ? `Super! Weiter so, ${session.name}! 🌟`
          : "Hallo! Ich bin Kiko. Womit kann ich helfen? 😊"}
      />
    </main>
  );
}
