"use client";

import { useState } from "react";
import Link from "next/link";
import { useParentAuth } from "@/hooks/useParentAuth";

export default function LoginPage() {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pin, setPin] = useState("");
  const { login, register, loading, error } = useParentAuth();

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
  const showEmailHint = mode === "register" && email.length > 0 && !emailValid;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (mode === "login") await login(email, password);
    else await register(email, password, pin);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-kidsBlue/20 to-kidsBg dark:from-slate-900 dark:to-slate-900 flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-2">🦊</div>
          <h1 className="text-kids-xl font-black text-gray-800 dark:text-white">KidsClub</h1>
          <p className="text-kids-sm text-gray-500 dark:text-gray-400">Eltern-Bereich</p>
        </div>

        {/* Card */}
        <div className="bg-white dark:bg-slate-800 rounded-kids-lg shadow-kids-lg p-6">
          {/* Tabs */}
          <div className="flex mb-6 bg-gray-100 dark:bg-slate-700 rounded-kids p-1">
            <button
              onClick={() => setMode("login")}
              className={`flex-1 py-2 rounded-kids text-kids-sm font-black transition-all ${
                mode === "login"
                  ? "bg-white dark:bg-slate-600 shadow text-gray-800 dark:text-white"
                  : "text-gray-500 dark:text-gray-400"
              }`}
            >
              Anmelden
            </button>
            <button
              onClick={() => setMode("register")}
              className={`flex-1 py-2 rounded-kids text-kids-sm font-black transition-all ${
                mode === "register"
                  ? "bg-white dark:bg-slate-600 shadow text-gray-800 dark:text-white"
                  : "text-gray-500 dark:text-gray-400"
              }`}
            >
              Registrieren
            </button>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-kids-sm font-bold text-gray-700 dark:text-gray-300 mb-1">
                E-Mail
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="eltern@beispiel.de"
                required
                className={`w-full border-2 rounded-kids px-4 py-3 text-kids-sm bg-white dark:bg-slate-700 text-gray-800 dark:text-white outline-none transition-colors ${
                  showEmailHint
                    ? "border-red-400 focus:border-red-400"
                    : "border-gray-200 dark:border-slate-600 focus:border-kidsBlue"
                }`}
              />
              {showEmailHint && (
                <p className="text-xs text-red-500 mt-1 font-semibold">
                  ⚠️ Bitte eine gültige E-Mail eingeben (z.B. name@gmail.com) — du brauchst sie für einen Passwort-Reset!
                </p>
              )}
              {mode === "register" && email.length > 0 && emailValid && (
                <p className="text-xs text-kidsGreen mt-1 font-semibold">✓ E-Mail sieht gut aus</p>
              )}
            </div>
            <div>
              <label className="block text-kids-sm font-bold text-gray-700 dark:text-gray-300 mb-1">
                Passwort {mode === "register" && "(mind. 6 Zeichen)"}
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                minLength={6}
                className="w-full border-2 border-gray-200 dark:border-slate-600 rounded-kids px-4 py-3 text-kids-sm bg-white dark:bg-slate-700 text-gray-800 dark:text-white focus:border-kidsBlue outline-none"
              />
            </div>

            {mode === "register" && (
              <div>
                <label className="block text-kids-sm font-bold text-gray-700 dark:text-gray-300 mb-1">
                  Eltern-PIN (4 Ziffern) 🔒
                </label>
                <input
                  type="password"
                  inputMode="numeric"
                  maxLength={4}
                  value={pin}
                  onChange={(e) => setPin(e.target.value.replace(/\D/g, "").slice(0, 4))}
                  placeholder="z.B. 1234"
                  required={mode === "register"}
                  className="w-full border-2 border-gray-200 dark:border-slate-600 rounded-kids px-4 py-3 text-kids-sm bg-white dark:bg-slate-700 text-gray-800 dark:text-white focus:border-kidsPurple outline-none font-mono tracking-widest text-center"
                />
                <p className="text-xs text-gray-400 mt-1">
                  Mit dieser PIN öffnest du den Elternbereich. Merke sie dir gut!
                </p>
              </div>
            )}

            {mode === "login" && (
              <div className="text-right -mt-2">
                <Link href="/passwort-vergessen" className="text-xs text-kidsBlue hover:underline">
                  Passwort vergessen?
                </Link>
              </div>
            )}

            {error && (
              <p className="text-sm text-red-500 font-semibold text-center">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading || (mode === "register" && !emailValid)}
              className="bg-kidsBlue text-white rounded-kids py-3 text-kids-sm font-black shadow-[0_4px_0_#3a9fc9] active:translate-y-1 transition-all disabled:opacity-60"
            >
              {loading ? "⏳ Bitte warten..." : mode === "login" ? "Anmelden 🔑" : "Konto erstellen ✨"}
            </button>
          </form>
        </div>

        {/* Kind login link */}
        <div className="mt-6 text-center">
          <p className="text-kids-sm text-gray-500 dark:text-gray-400 mb-2">Du bist ein Kind?</p>
          <Link
            href="/login/kind"
            className="bg-kidsGreen text-white rounded-kids px-6 py-3 text-kids-sm font-black shadow-[0_4px_0_#2daa7a] active:translate-y-1 inline-block transition-all"
          >
            Kind-Login 🦊
          </Link>
        </div>

        <div className="mt-4 text-center">
          <Link href="/" className="text-xs text-gray-400 hover:text-gray-600">
            ← Zurück zur App
          </Link>
        </div>
      </div>
    </div>
  );
}
