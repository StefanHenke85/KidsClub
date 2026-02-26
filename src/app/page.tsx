"use client";

import Link from "next/link";
import MascotBubble from "@/components/layout/MascotBubble";
import { useChildSessionStore } from "@/store/useChildSessionStore";
import XpBar from "@/components/progress/XpBar";
import { getMascotEmoji, getMascotGreeting } from "@/lib/mascots";

const FEATURES = [
  {
    href: "/suche",
    emoji: "🔍",
    label: "Kindersichere\nSuche",
    sub: "Sicher surfen",
    bg: "bg-gradient-to-br from-yellow-300 to-amber-200",
    border: "border-yellow-400",
    shadow: "shadow-[0_7px_0_#d97706]",
    activeShadow: "shadow-[0_3px_0_#d97706]",
    dot: "bg-yellow-500",
    glow: "hover:shadow-[0_7px_0_#d97706,0_0_20px_rgba(251,191,36,0.4)]",
  },
  {
    href: "/hausaufgaben",
    emoji: "✏️",
    label: "Hausaufgaben-\nHilfe",
    sub: "KI-Lernbegleiter",
    bg: "bg-gradient-to-br from-sky-300 to-blue-200",
    border: "border-sky-400",
    shadow: "shadow-[0_7px_0_#0369a1]",
    activeShadow: "shadow-[0_3px_0_#0369a1]",
    dot: "bg-sky-500",
    glow: "hover:shadow-[0_7px_0_#0369a1,0_0_20px_rgba(14,165,233,0.4)]",
  },
  {
    href: "/spiele",
    emoji: "🎮",
    label: "Lernspiele",
    sub: "Mathe · Deutsch · mehr",
    bg: "bg-gradient-to-br from-emerald-300 to-green-200",
    border: "border-emerald-400",
    shadow: "shadow-[0_7px_0_#047857]",
    activeShadow: "shadow-[0_3px_0_#047857]",
    dot: "bg-emerald-500",
    glow: "hover:shadow-[0_7px_0_#047857,0_0_20px_rgba(16,185,129,0.4)]",
  },
  {
    href: "/chat",
    emoji: "💬",
    label: "Freunde-Chat",
    sub: "Sicher schreiben",
    bg: "bg-gradient-to-br from-violet-300 to-purple-200",
    border: "border-violet-400",
    shadow: "shadow-[0_7px_0_#6d28d9]",
    activeShadow: "shadow-[0_3px_0_#6d28d9]",
    dot: "bg-violet-500",
    glow: "hover:shadow-[0_7px_0_#6d28d9,0_0_20px_rgba(139,92,246,0.4)]",
  },
];

// Schwebende Deko-Elemente – rein dekorativ, für Screenreader ausgeblendet
const DECO = [
  { emoji: "⭐", pos: "top-4 left-3",     anim: "animate-twinkle",    size: "text-2xl" },
  { emoji: "✨", pos: "top-8 right-4",    anim: "animate-sparkle",    size: "text-xl"  },
  { emoji: "🌟", pos: "top-3 left-1/3",  anim: "animate-float-slow", size: "text-lg"  },
  { emoji: "⭐", pos: "bottom-6 right-5", anim: "animate-twinkle",    size: "text-xl"  },
  { emoji: "✦",  pos: "bottom-10 left-6", anim: "animate-sparkle",    size: "text-base opacity-60" },
  { emoji: "🎈", pos: "top-6 right-1/4", anim: "animate-float",      size: "text-xl"  },
];

export default function HomePage() {
  const { session } = useChildSessionStore();
  const mascotEmoji = session ? getMascotEmoji(session.mascotAnimal) : "🦊";
  const mascotMsg = session
    ? getMascotGreeting(session.mascotName, session.name, session.mascotAnimal)
    : "Hallo! Ich bin Kiko. Ich helfe dir beim Lernen! 😊";

  return (
    <main id="main-content" className="min-h-screen font-kids pb-36 transition-colors duration-300">

      {/* ── Hero-Header ── */}
      <header className="relative overflow-hidden hero-gradient px-4 pt-10 pb-16">
        {/* Dekorative schwebende Elemente – für Screenreader ausgeblendet */}
        {DECO.map((d, i) => (
          <span
            key={i}
            aria-hidden="true"
            className={`absolute pointer-events-none select-none ${d.pos} ${d.anim} ${d.size}`}
          >
            {d.emoji}
          </span>
        ))}

        {/* Wellen-Trennlinie – dekorativ */}
        <div aria-hidden="true" className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none">
          <svg
            viewBox="0 0 1200 56"
            preserveAspectRatio="none"
            className="w-full h-12 fill-[#EDE8FF] dark:fill-[#0f0c1a]"
          >
            <path d="M0,28 C150,56 350,0 600,28 C850,56 1050,0 1200,28 L1200,56 L0,56 Z" />
          </svg>
        </div>

        <div className="max-w-lg mx-auto relative z-10">
          {session ? (
            /* ── Eingeloggt ── */
            <div className="flex items-center gap-4 mb-5">
              <span aria-hidden="true" className="text-7xl animate-float drop-shadow-lg sticker leading-none">
                {mascotEmoji}
              </span>
              <div>
                <h1 className="text-kids-xl font-black text-white drop-shadow-md leading-tight">
                  Hallo, {session.name}!
                </h1>
                <p className="text-sm text-white/85 font-semibold mt-0.5">
                  {session.mascotName} ist dabei · Klasse {session.grade}
                </p>
              </div>
            </div>
          ) : (
            /* ── Nicht eingeloggt ── */
            <div className="text-center mb-5">
              <div aria-hidden="true" className="text-9xl mb-3 animate-float drop-shadow-xl leading-none sticker">🦊</div>
              <h1 className="text-4xl font-black text-white mb-1 drop-shadow-md">KidsClub</h1>
              <p className="text-white/95 font-black text-xl">Deine sichere Lernwelt</p>
              <p className="text-white/75 text-sm mt-1 font-semibold">Klasse 1–13 · elternüberwacht · 100% sicher</p>
            </div>
          )}

          {session ? (
            <XpBar xpTotal={session.xpTotal} level={session.level} compact />
          ) : (
            <div className="flex flex-col gap-3 mt-5 max-w-sm mx-auto">
              <Link
                href="/login/kind"
                className="bg-white text-kidsPurple rounded-kids py-4 text-kids-sm font-black text-center shadow-[0_6px_0_rgba(109,40,217,0.3)] active:translate-y-1 active:shadow-[0_2px_0_rgba(109,40,217,0.3)] transition-all hover:brightness-105 focus-visible:outline-2 focus-visible:outline-kidsPurple focus-visible:outline-offset-2"
              >
                <span aria-hidden="true">🔑</span> Als Kind anmelden
              </Link>
              <Link
                href="/login"
                className="bg-white/30 text-white rounded-kids py-3 text-sm font-bold text-center border-2 border-white/50 active:translate-y-1 transition-all hover:bg-white/40 focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
              >
                <span aria-hidden="true">👪</span> Eltern-Bereich &amp; Registrierung
              </Link>
            </div>
          )}
        </div>
      </header>

      {/* ── Stats-Chips (nur ausgeloggt) ── */}
      {!session && (
        <div className="px-4 py-5 max-w-lg mx-auto">
          <div className="flex gap-2 flex-wrap justify-center" role="list" aria-label="KidsClub Merkmale">
            {[
              { emoji: "📚", text: "5 Fächer" },
              { emoji: "🏫", text: "13 Klassen" },
              { emoji: "🏆", text: "15 Abzeichen" },
              { emoji: "🔒", text: "100% sicher" },
            ].map((s) => (
              <div
                key={s.text}
                role="listitem"
                className="flex items-center gap-1.5 bg-white dark:bg-slate-800 rounded-full px-4 py-2 text-sm font-bold text-gray-600 dark:text-gray-300 shadow-md border-2 border-purple-100 dark:border-slate-700"
              >
                <span aria-hidden="true" className="text-base">{s.emoji}</span>
                <span>{s.text}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Feature-Kacheln ── */}
      <section className="px-4 pt-2 pb-4 max-w-lg mx-auto w-full" aria-label="Bereiche">
        <h2 className="text-kids-sm font-black text-gray-500 dark:text-gray-400 mb-4 uppercase tracking-widest text-center">
          {session ? "Was machst du heute?" : "Was kann KidsClub?"}
        </h2>

        <div className="grid grid-cols-2 gap-4 sm:gap-5">
          {FEATURES.map(({ href, emoji, label, sub, bg, border, shadow, glow, dot }) => (
            <Link
              key={href}
              href={href}
              aria-label={label.replace("\n", " ")}
              className={`
                ${bg} ${shadow} ${glow}
                border-2 ${border}
                rounded-kids-xl
                px-3 py-5 sm:px-5 sm:py-6
                flex flex-col items-center text-center gap-3
                active:translate-y-1 transition-all duration-150
                hover:scale-[1.03]
                focus-visible:outline-4 focus-visible:outline-kidsPurple focus-visible:outline-offset-2
              `}
            >
              <span aria-hidden="true" className="text-5xl sm:text-6xl animate-float leading-none sticker">
                {emoji}
              </span>
              <div>
                <p className="text-sm sm:text-base font-black text-gray-700 leading-tight whitespace-pre-line">
                  {label}
                </p>
                <p className="text-xs text-gray-500 mt-1 leading-tight font-semibold">{sub}</p>
              </div>
              <span aria-hidden="true" className={`w-3 h-3 rounded-full ${dot} opacity-80 shadow-sm`} />
            </Link>
          ))}
        </div>
      </section>

      {/* ── Dekorativer Trennstrich ── */}
      <div aria-hidden="true" className="max-w-lg mx-auto px-4 my-4 flex items-center gap-3 opacity-40">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-purple-300 to-transparent" />
        <span className="text-lg">✦</span>
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-purple-300 to-transparent" />
      </div>

      {/* ── Footer-Links ── */}
      <div className="text-center flex flex-col gap-2 px-4 pb-2">
        {session && (
          <button
            type="button"
            onClick={async () => {
              await fetch("/api/auth/kind-logout", { method: "POST" });
              useChildSessionStore.getState().setSession(null);
            }}
            aria-label={`Abmelden als ${session.name}`}
            className="text-xs text-gray-400 dark:text-gray-500 underline underline-offset-2 hover:text-gray-600 transition-colors focus-visible:outline-2 focus-visible:outline-gray-400 focus-visible:outline-offset-2 rounded"
          >
            <span aria-hidden="true">🚪</span> Abmelden ({session.name})
          </button>
        )}
        <Link
          href="/eltern"
          className="text-sm text-gray-400 dark:text-gray-500 font-semibold underline underline-offset-2 hover:text-gray-600 transition-colors focus-visible:outline-2 focus-visible:outline-gray-400 focus-visible:outline-offset-2 rounded"
        >
          <span aria-hidden="true">🔒</span> Elternbereich
        </Link>
        <div className="flex justify-center gap-4 mt-1">
          <Link href="/impressum" className="text-xs text-gray-400 dark:text-gray-500 underline underline-offset-2 hover:text-gray-600 transition-colors">
            Impressum
          </Link>
          <span aria-hidden="true" className="text-xs text-gray-300 dark:text-gray-600">·</span>
          <Link href="/datenschutz" className="text-xs text-gray-400 dark:text-gray-500 underline underline-offset-2 hover:text-gray-600 transition-colors">
            Datenschutz
          </Link>
        </div>
      </div>

      <MascotBubble message={mascotMsg} emoji={mascotEmoji} />
    </main>
  );
}
