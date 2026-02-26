"use client";

import { useRouter } from "next/navigation";
import { useScreenTimeStore } from "@/store/useScreenTimeStore";
import { useChildSessionStore } from "@/store/useChildSessionStore";

interface TimeLockScreenProps {
  minutesUsed: number;
  limit: number;
}

export default function TimeLockScreen({ minutesUsed, limit }: TimeLockScreenProps) {
  const router = useRouter();
  const setLocked = useScreenTimeStore((s) => s.setLocked);
  const setSession = useChildSessionStore((s) => s.setSession);

  const handleLogout = async () => {
    await fetch("/api/auth/kind-logout", { method: "POST" });
    // Zustand zurücksetzen damit ScreenTimeTimer nicht mehr den LockScreen zeigt
    setSession(null);
    setLocked(false);
    router.push("/login/kind");
  };

  return (
    <div className="fixed inset-0 z-[100] bg-slate-900 flex flex-col items-center justify-center text-center px-6">
      <div className="text-7xl mb-6 animate-bounce-soft">⏰</div>
      <h1 className="text-kids-xl font-black text-white mb-3">
        Pause Zeit!
      </h1>
      <p className="text-kids-sm text-slate-300 mb-2">
        Du hast heute schon {minutesUsed} von {limit} Minuten gespielt.
      </p>
      <p className="text-kids-sm text-slate-400 mb-8">
        Komm morgen wieder! 😊
      </p>
      <div className="bg-slate-800 rounded-kids-lg p-6 max-w-xs w-full mb-6">
        <p className="text-4xl mb-3">🦊</p>
        <p className="text-kids-sm text-slate-300 font-bold">
          &quot;Super gemacht heute! Morgen lernst du weiter. Jetzt ist Erholungszeit!&quot;
        </p>
      </div>
      <button
        type="button"
        onClick={handleLogout}
        className="bg-slate-700 hover:bg-slate-600 text-slate-200 font-bold text-kids-sm px-6 py-3 rounded-kids transition-colors"
      >
        🔓 Abmelden
      </button>
      <p className="text-xs text-slate-600 mt-4">
        Eltern können das Limit in den Einstellungen anpassen.
      </p>
    </div>
  );
}
