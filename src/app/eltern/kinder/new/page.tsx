"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MASCOTS } from "@/lib/mascots";

const GRADES = Array.from({ length: 13 }, (_, i) => i + 1);

const BUNDESLAENDER = [
  { code: "BW", name: "Baden-Württemberg" },
  { code: "BY", name: "Bayern" },
  { code: "BE", name: "Berlin" },
  { code: "BB", name: "Brandenburg" },
  { code: "HB", name: "Bremen" },
  { code: "HH", name: "Hamburg" },
  { code: "HE", name: "Hessen" },
  { code: "MV", name: "Mecklenburg-Vorpommern" },
  { code: "NI", name: "Niedersachsen" },
  { code: "NRW", name: "Nordrhein-Westfalen" },
  { code: "RP", name: "Rheinland-Pfalz" },
  { code: "SL", name: "Saarland" },
  { code: "SN", name: "Sachsen" },
  { code: "ST", name: "Sachsen-Anhalt" },
  { code: "SH", name: "Schleswig-Holstein" },
  { code: "TH", name: "Thüringen" },
];

export default function NewKindPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [grade, setGrade] = useState(1);
  const [loginCode, setLoginCode] = useState("");
  const [mascotAnimal, setMascotAnimal] = useState("fuchs");
  const [mascotName, setMascotName] = useState("Kiko");
  const [dailyLimit, setDailyLimit] = useState(60);
  const [bundesland, setBundesland] = useState("NRW");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function generateCode() {
    setLoginCode(String(Math.floor(1000 + Math.random() * 9000)));
  }

  function handleMascotSelect(id: string, defaultName: string) {
    setMascotAnimal(id);
    const currentDefault = MASCOTS.find((m) => m.id === mascotAnimal)?.defaultName ?? "";
    if (!mascotName || mascotName === currentDefault) {
      setMascotName(defaultName);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (loginCode.length !== 4 || !/^\d{4}$/.test(loginCode)) {
      setError("Code muss genau 4 Ziffern haben");
      return;
    }
    setLoading(true);
    setError(null);

    const selectedMascot = MASCOTS.find((m) => m.id === mascotAnimal);
    const res = await fetch("/api/kinder", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name.trim(),
        age: age ? parseInt(age) : null,
        grade,
        loginCode,
        avatarEmoji: selectedMascot?.emoji ?? "🦊",
        mascotAnimal,
        mascotName: mascotName.trim() || selectedMascot?.defaultName || "Kiko",
        dailyLimitMinutes: dailyLimit,
        bundesland,
      }),
    });
    const data = await res.json();
    if (!res.ok) { setError(data.error); setLoading(false); return; }
    router.push("/eltern/kinder");
  }

  const selectedMascot = MASCOTS.find((m) => m.id === mascotAnimal);

  return (
    <div className="max-w-lg mx-auto py-4">
      <h2 className="text-kids-lg font-black text-gray-800 dark:text-white mb-4">
        👶 Kind anlegen
      </h2>

      <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-800 rounded-kids-lg shadow-kids p-5 flex flex-col gap-4">

        {/* Mascot picker */}
        <div>
          <label className="block text-kids-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
            Maskottchen wählen
          </label>
          <div className="flex flex-wrap gap-2 mb-3">
            {MASCOTS.map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => handleMascotSelect(m.id, m.defaultName)}
                title={m.hint}
                className={`text-3xl w-12 h-12 rounded-kids transition-all flex items-center justify-center ${
                  mascotAnimal === m.id
                    ? "bg-kidsPurple/20 border-2 border-kidsPurple scale-110"
                    : "bg-gray-100 dark:bg-slate-700 border-2 border-transparent"
                }`}
              >
                {m.emoji}
              </button>
            ))}
          </div>
          {selectedMascot && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
              {selectedMascot.emoji} {selectedMascot.hint}
            </p>
          )}
          <label className="block text-kids-sm font-bold text-gray-700 dark:text-gray-300 mb-1">
            Name des Maskottchens
          </label>
          <input
            type="text"
            value={mascotName}
            onChange={(e) => setMascotName(e.target.value)}
            placeholder={selectedMascot?.defaultName ?? "Kiko"}
            maxLength={20}
            className="w-full border-2 border-gray-200 dark:border-slate-600 rounded-kids px-4 py-2 text-kids-sm bg-white dark:bg-slate-700 text-gray-800 dark:text-white focus:border-kidsPurple outline-none"
          />
        </div>

        {/* Name */}
        <div>
          <label className="block text-kids-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Name des Kindes *</label>
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

        {/* Bundesland */}
        <div>
          <label className="block text-kids-sm font-bold text-gray-700 dark:text-gray-300 mb-1">
            Bundesland *
          </label>
          <select
            value={bundesland}
            onChange={(e) => setBundesland(e.target.value)}
            title="Bundesland auswählen"
            className="w-full border-2 border-gray-200 dark:border-slate-600 rounded-kids px-4 py-2 text-kids-sm bg-white dark:bg-slate-700 text-gray-800 dark:text-white focus:border-kidsBlue outline-none"
          >
            {BUNDESLAENDER.map((bl) => (
              <option key={bl.code} value={bl.code}>{bl.name}</option>
            ))}
          </select>
          <p className="text-xs text-gray-400 mt-1">
            Kiko passt die Hausaufgaben-Hilfe an den Lehrplan deines Bundeslandes an.
          </p>
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
