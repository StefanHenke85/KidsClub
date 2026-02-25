"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const AVATARS = ["🦊", "🐱", "🐶", "🐼", "🦁", "🐸", "🦄", "🐧", "🐻", "🐨"];
const GRADES = Array.from({ length: 13 }, (_, i) => i + 1);

export default function NewKindPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [grade, setGrade] = useState(1);
  const [loginCode, setLoginCode] = useState("");
  const [avatarEmoji, setAvatarEmoji] = useState("🦊");
  const [dailyLimit, setDailyLimit] = useState(60);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function generateCode() {
    setLoginCode(String(Math.floor(1000 + Math.random() * 9000)));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (loginCode.length !== 4 || !/^\d{4}$/.test(loginCode)) {
      setError("Code muss genau 4 Ziffern haben");
      return;
    }
    setLoading(true);
    setError(null);

    const res = await fetch("/api/kinder", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name.trim(),
        age: age ? parseInt(age) : null,
        grade,
        loginCode,
        avatarEmoji,
        dailyLimitMinutes: dailyLimit,
      }),
    });
    const data = await res.json();
    if (!res.ok) { setError(data.error); setLoading(false); return; }
    router.push("/eltern/kinder");
  }

  return (
    <div className="max-w-lg mx-auto py-4">
      <h2 className="text-kids-lg font-black text-gray-800 dark:text-white mb-4">
        👶 Kind anlegen
      </h2>

      <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-800 rounded-kids-lg shadow-kids p-5 flex flex-col gap-4">
        {/* Avatar */}
        <div>
          <label className="block text-kids-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Avatar</label>
          <div className="flex flex-wrap gap-2">
            {AVATARS.map((a) => (
              <button
                key={a}
                type="button"
                onClick={() => setAvatarEmoji(a)}
                className={`text-3xl w-12 h-12 rounded-kids transition-all ${
                  avatarEmoji === a ? "bg-kidsGreen/20 border-2 border-kidsGreen" : "bg-gray-100 dark:bg-slate-700"
                }`}
              >
                {a}
              </button>
            ))}
          </div>
        </div>

        {/* Name */}
        <div>
          <label className="block text-kids-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Name *</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="z.B. Max"
            required
            className="w-full border-2 border-gray-200 dark:border-slate-600 rounded-kids px-4 py-2 text-kids-sm bg-white dark:bg-slate-700 text-gray-800 dark:text-white focus:border-kidsGreen outline-none"
          />
        </div>

        {/* Age + Grade */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-kids-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Alter</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="z.B. 8"
              min={5}
              max={20}
              className="w-full border-2 border-gray-200 dark:border-slate-600 rounded-kids px-4 py-2 text-kids-sm bg-white dark:bg-slate-700 text-gray-800 dark:text-white focus:border-kidsGreen outline-none"
            />
          </div>
          <div>
            <label className="block text-kids-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Klasse *</label>
            <select
              value={grade}
              onChange={(e) => setGrade(parseInt(e.target.value))}
              className="w-full border-2 border-gray-200 dark:border-slate-600 rounded-kids px-4 py-2 text-kids-sm bg-white dark:bg-slate-700 text-gray-800 dark:text-white focus:border-kidsGreen outline-none"
            >
              {GRADES.map((g) => (
                <option key={g} value={g}>Klasse {g}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Login Code */}
        <div>
          <label className="block text-kids-sm font-bold text-gray-700 dark:text-gray-300 mb-1">
            Login-Code (4 Ziffern) *
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={loginCode}
              onChange={(e) => setLoginCode(e.target.value.replace(/\D/g, "").slice(0, 4))}
              placeholder="z.B. 1234"
              maxLength={4}
              required
              className="flex-1 border-2 border-gray-200 dark:border-slate-600 rounded-kids px-4 py-2 text-kids-sm bg-white dark:bg-slate-700 text-gray-800 dark:text-white focus:border-kidsGreen outline-none font-mono tracking-widest"
            />
            <button
              type="button"
              onClick={generateCode}
              className="bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-300 rounded-kids px-3 py-2 text-xs font-bold"
            >
              🎲 Zufällig
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-1">Das Kind braucht diesen Code zum Anmelden.</p>
        </div>

        {/* Daily limit */}
        <div>
          <label className="block text-kids-sm font-bold text-gray-700 dark:text-gray-300 mb-1">
            Tägliches Zeitlimit: {dailyLimit} Minuten
          </label>
          <input
            type="range"
            min={15}
            max={180}
            step={15}
            value={dailyLimit}
            onChange={(e) => setDailyLimit(parseInt(e.target.value))}
            className="w-full accent-kidsGreen"
          />
          <div className="flex justify-between text-xs text-gray-400">
            <span>15 Min</span>
            <span>3 Std</span>
          </div>
        </div>

        {error && (
          <p className="text-sm text-red-500 font-bold">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="bg-kidsGreen text-white rounded-kids py-3 text-kids-sm font-black shadow-[0_4px_0_#2daa7a] active:translate-y-1 transition-all disabled:opacity-60"
        >
          {loading ? "⏳ Speichern..." : "✓ Kind anlegen"}
        </button>
      </form>
    </div>
  );
}
