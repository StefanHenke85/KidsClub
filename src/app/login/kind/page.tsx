"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useChildSessionStore } from "@/store/useChildSessionStore";
import type { GradeLevel } from "@/types";

const DIGIT_LABELS: Record<string, string> = {
  "✕": "Code löschen",
  "←": "Letzte Ziffer löschen",
};

export default function KindLoginPage() {
  const router = useRouter();
  const { setSession } = useChildSessionStore();
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleCodeKey(digit: string) {
    if (code.length < 4) setCode((c) => c + digit);
  }

  function handleCodeDelete() {
    setCode((c) => c.slice(0, -1));
  }

  async function handleLogin() {
    if (!name.trim() || code.length !== 4) return;
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/kind-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), code }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error); setCode(""); return; }

      setSession({
        childId: data.child.id,
        name: data.child.name,
        grade: data.child.grade as GradeLevel,
        avatarEmoji: data.child.avatarEmoji,
        parentId: data.child.parentId,
        xpTotal: data.child.xpTotal ?? 0,
        level: data.child.level ?? 1,
        mascotAnimal: data.child.mascotAnimal ?? "fuchs",
        mascotName: data.child.mascotName ?? "Kiko",
        bundesland: data.child.bundesland ?? "NRW",
      });
      router.push("/");
    } catch {
      setError("Netzwerkfehler");
    } finally {
      setLoading(false);
    }
  }

  const digits = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "✕", "0", "←"];

  return (
    <div className="min-h-screen bg-gradient-to-b from-kidsGreen/20 to-kidsBg dark:from-slate-900 dark:to-slate-900 flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-6">
          <div aria-hidden="true" className="text-6xl mb-2 animate-float">🦊</div>
          <h1 className="text-kids-xl font-black text-gray-800 dark:text-white">Hallo!</h1>
          <p className="text-kids-sm text-gray-500 dark:text-gray-400">Gib deinen Namen und Code ein</p>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-kids-lg shadow-kids-lg p-6">
          {/* Name input */}
          <div className="mb-4">
            <label htmlFor="kind-name" className="block text-kids-sm font-black text-gray-700 dark:text-gray-200 mb-2">
              <span aria-hidden="true">👋</span> Wie heißt du?
            </label>
            <input
              id="kind-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Dein Name"
              autoComplete="given-name"
              className="w-full border-2 border-gray-200 dark:border-slate-600 rounded-kids px-4 py-3 text-kids-sm bg-white dark:bg-slate-700 text-gray-800 dark:text-white focus:border-kidsGreen outline-none text-center font-black"
            />
          </div>

          {/* Code display */}
          <div className="mb-4">
            <p className="block text-kids-sm font-black text-gray-700 dark:text-gray-200 mb-2 text-center" id="code-label">
              <span aria-hidden="true">🔑</span> Dein 4-stelliger Code
            </p>
            <div
              className="flex justify-center gap-3 mb-4"
              role="status"
              aria-live="polite"
              aria-label={`${code.length} von 4 Ziffern eingegeben`}
              aria-labelledby="code-label"
            >
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  aria-hidden="true"
                  className={`w-14 h-14 rounded-kids border-2 flex items-center justify-center text-2xl font-black transition-all ${
                    code[i]
                      ? "border-kidsGreen bg-kidsGreen/10 text-gray-800 dark:text-white"
                      : "border-gray-200 dark:border-slate-600 text-gray-300"
                  }`}
                >
                  {code[i] ? "●" : "○"}
                </div>
              ))}
            </div>
          </div>

          {/* Number pad */}
          <div className="grid grid-cols-3 gap-2 mb-4" role="group" aria-label="Zahlenfeld">
            {digits.map((d) => (
              <button
                key={d}
                aria-label={DIGIT_LABELS[d] ?? `Ziffer ${d}`}
                onClick={() => {
                  if (d === "✕") setCode("");
                  else if (d === "←") handleCodeDelete();
                  else handleCodeKey(d);
                }}
                className={`py-3 rounded-kids text-kids-sm font-black transition-all active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-kidsGreen ${
                  d === "✕"
                    ? "bg-red-100 dark:bg-red-900/30 text-red-500"
                    : d === "←"
                    ? "bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-300"
                    : "bg-gray-100 dark:bg-slate-700 text-gray-800 dark:text-white hover:bg-kidsGreen/20"
                }`}
              >
                {d}
              </button>
            ))}
          </div>

          {error && (
            <p role="alert" className="text-sm text-red-500 font-bold text-center mb-3">{error}</p>
          )}

          <button
            onClick={handleLogin}
            disabled={loading || name.trim().length === 0 || code.length !== 4}
            aria-busy={loading ? "true" : "false"}
            className="w-full bg-kidsGreen text-white rounded-kids py-3 text-kids-sm font-black shadow-[0_4px_0_#2daa7a] active:translate-y-1 transition-all disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-kidsGreen"
          >
            {loading ? "Einen Moment..." : "Los geht's!"}
          </button>
        </div>

        <div className="mt-4 text-center">
          <Link href="/login" className="text-xs text-gray-400 hover:text-gray-600 focus-visible:outline-2 focus-visible:outline-gray-400 focus-visible:outline-offset-2 rounded">
            ← Eltern-Login
          </Link>
        </div>
      </div>
    </div>
  );
}
