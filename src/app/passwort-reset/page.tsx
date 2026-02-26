"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

function ResetForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) setError("Ungültiger Link");
  }, [token]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password !== password2) {
      setError("Passwörter stimmen nicht überein");
      return;
    }
    if (password.length < 6) {
      setError("Passwort muss mindestens 6 Zeichen haben");
      return;
    }

    setLoading(true);
    setError(null);

    const res = await fetch("/api/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password }),
    });
    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error ?? "Fehler");
      return;
    }

    setDone(true);
    setTimeout(() => router.push("/login"), 2500);
  }

  if (!token) {
    return (
      <div className="text-center py-4">
        <div className="text-5xl mb-4">❌</div>
        <p className="text-kids-sm text-red-500 font-bold">Ungültiger Reset-Link</p>
        <Link href="/passwort-vergessen" className="mt-4 inline-block text-kidsBlue text-sm underline">
          Neue Anfrage stellen
        </Link>
      </div>
    );
  }

  if (done) {
    return (
      <div className="text-center py-4">
        <div className="text-5xl mb-4">✅</div>
        <h2 className="text-kids-md font-black text-gray-800 dark:text-white mb-2">Passwort geändert!</h2>
        <p className="text-kids-sm text-gray-500 dark:text-gray-400">Du wirst gleich zum Login weitergeleitet...</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <label className="block text-kids-sm font-bold text-gray-700 dark:text-gray-300 mb-1">
          Neues Passwort (mind. 6 Zeichen)
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
      <div>
        <label className="block text-kids-sm font-bold text-gray-700 dark:text-gray-300 mb-1">
          Passwort wiederholen
        </label>
        <input
          type="password"
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
          placeholder="••••••••"
          required
          className={`w-full border-2 rounded-kids px-4 py-3 text-kids-sm bg-white dark:bg-slate-700 text-gray-800 dark:text-white outline-none transition-colors ${
            password2.length > 0 && password !== password2
              ? "border-red-400 focus:border-red-400"
              : "border-gray-200 dark:border-slate-600 focus:border-kidsBlue"
          }`}
        />
        {password2.length > 0 && password !== password2 && (
          <p className="text-xs text-red-500 mt-1">Passwörter stimmen nicht überein</p>
        )}
      </div>

      {error && <p className="text-sm text-red-500 font-semibold text-center">{error}</p>}

      <button
        type="submit"
        disabled={loading || password !== password2 || password.length < 6}
        className="bg-kidsBlue text-white rounded-kids py-3 text-kids-sm font-black shadow-[0_4px_0_#3a9fc9] active:translate-y-1 transition-all disabled:opacity-60"
      >
        {loading ? "⏳ Wird gespeichert..." : "Passwort speichern 🔒"}
      </button>
    </form>
  );
}

export default function PasswortResetPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-kidsBlue/20 to-kidsBg dark:from-slate-900 dark:to-slate-900 flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="text-6xl mb-2">🔒</div>
          <h1 className="text-kids-xl font-black text-gray-800 dark:text-white">Neues Passwort</h1>
          <p className="text-kids-sm text-gray-500 dark:text-gray-400">Gib dein neues Passwort ein</p>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-kids-lg shadow-kids-lg p-6">
          <Suspense fallback={<div className="text-center py-4 text-4xl">⏳</div>}>
            <ResetForm />
          </Suspense>
        </div>

        <div className="mt-4 text-center">
          <Link href="/login" className="text-xs text-gray-400 hover:text-gray-600">
            ← Zurück zum Login
          </Link>
        </div>
      </div>
    </div>
  );
}
