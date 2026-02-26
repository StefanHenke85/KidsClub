"use client";

import { useState } from "react";
import Link from "next/link";

export default function PasswortVergessenPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const res = await fetch("/api/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    setLoading(false);
    if (res.ok) {
      setSent(true);
    } else {
      const data = await res.json();
      setError(data.error ?? "Fehler");
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-kidsBlue/20 to-kidsBg dark:from-slate-900 dark:to-slate-900 flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="text-6xl mb-2">🔑</div>
          <h1 className="text-kids-xl font-black text-gray-800 dark:text-white">Passwort vergessen?</h1>
          <p className="text-kids-sm text-gray-500 dark:text-gray-400">Wir schicken dir einen Reset-Link</p>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-kids-lg shadow-kids-lg p-6">
          {sent ? (
            <div className="text-center py-4">
              <div className="text-5xl mb-4">📬</div>
              <h2 className="text-kids-md font-black text-gray-800 dark:text-white mb-2">E-Mail gesendet!</h2>
              <p className="text-kids-sm text-gray-500 dark:text-gray-400 mb-4">
                Falls <strong>{email}</strong> bei uns registriert ist, bekommst du gleich eine E-Mail mit einem Reset-Link.
              </p>
              <p className="text-xs text-gray-400">Der Link ist 1 Stunde gültig. Bitte auch den Spam-Ordner prüfen.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-kids-sm font-bold text-gray-700 dark:text-gray-300 mb-1">
                  Deine E-Mail-Adresse
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="eltern@beispiel.de"
                  required
                  className="w-full border-2 border-gray-200 dark:border-slate-600 rounded-kids px-4 py-3 text-kids-sm bg-white dark:bg-slate-700 text-gray-800 dark:text-white focus:border-kidsBlue outline-none"
                />
              </div>

              {error && <p className="text-sm text-red-500 font-semibold text-center">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="bg-kidsBlue text-white rounded-kids py-3 text-kids-sm font-black shadow-[0_4px_0_#3a9fc9] active:translate-y-1 transition-all disabled:opacity-60"
              >
                {loading ? "⏳ Wird gesendet..." : "Reset-Link senden 📨"}
              </button>
            </form>
          )}
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
