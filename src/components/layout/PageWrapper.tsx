"use client";

import { ReactNode } from "react";
import { useRouter } from "next/navigation";

interface PageWrapperProps {
  children: ReactNode;
  title?: string;
  emoji?: string;
  color?: string;
  backHref?: string;
  /** Dekorative Hintergrundfarbe des Headers – Tailwind gradient string */
  headerGradient?: string;
}

const DEFAULT_GRADIENT = "from-violet-400 via-purple-300 to-indigo-300";

export default function PageWrapper({
  children,
  title,
  emoji,
  color = "bg-kidsBg dark:bg-[#0f0c1a]",
  backHref,
  headerGradient = DEFAULT_GRADIENT,
}: PageWrapperProps) {
  const router = useRouter();

  return (
    <main className={`min-h-screen ${color} pb-28 font-kids transition-colors duration-300`}>
      {/* Verspielter Header mit Gradient + Welle */}
      <header className={`relative bg-gradient-to-br ${headerGradient} px-4 pt-8 pb-12 overflow-hidden`}>
        {/* Dekorative Punkte */}
        <div
          className="absolute inset-0 pointer-events-none opacity-30"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />
        {/* Dekorative Blob-Kreise */}
        <div className="absolute -top-6 -right-6 w-28 h-28 bg-white/20 rounded-full blur-xl" />
        <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-white/15 rounded-full blur-lg" />

        {/* Zurück-Button */}
        <button
          type="button"
          onClick={() => (backHref ? router.push(backHref) : router.back())}
          className="relative z-10 flex items-center gap-1.5 bg-white/30 hover:bg-white/45 active:scale-95 transition-all rounded-full px-3 py-1.5 text-white font-bold text-sm mb-4 shadow-sm"
        >
          <span className="text-lg leading-none">‹</span> Zurück
        </button>

        {/* Titel */}
        {(title || emoji) && (
          <div className="relative z-10 flex items-center gap-3 max-w-lg mx-auto">
            {emoji && (
              <span className="text-5xl animate-float drop-shadow-md leading-none sticker">
                {emoji}
              </span>
            )}
            {title && (
              <h1 className="text-kids-xl font-black text-white drop-shadow-md leading-tight">
                {title}
              </h1>
            )}
          </div>
        )}

        {/* Wellenform unten */}
        <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none">
          <svg viewBox="0 0 1200 48" preserveAspectRatio="none" className="w-full h-10 fill-kidsBg dark:fill-[#0f0c1a]">
            <path d="M0,32 C200,0 400,48 600,24 C800,0 1000,48 1200,24 L1200,48 L0,48 Z" />
          </svg>
        </div>
      </header>

      <div className="px-4 py-4 max-w-lg mx-auto">{children}</div>
    </main>
  );
}
