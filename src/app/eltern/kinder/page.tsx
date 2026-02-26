"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface KindRow {
  id: string;
  name: string;
  age: number | null;
  grade: number;
  login_code: string;
  avatar_emoji: string;
  mascot_animal: string;
  mascot_name: string;
  bundesland: string;
  daily_limit_minutes: number;
  xp_total: number | null;
  level: number | null;
  streak_days: number | null;
}

export default function KinderPage() {
  const router = useRouter();
  const [kinder, setKinder] = useState<KindRow[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const res = await fetch("/api/kinder");
    const data = await res.json();
    setKinder(data.children ?? []);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function deleteKind(id: string, name: string) {
    if (!confirm(`${name} wirklich löschen? Alle Fortschritte werden gelöscht.`)) return;
    await fetch(`/api/kinder/${id}`, { method: "DELETE" });
    load();
  }

  return (
    <div className="max-w-lg mx-auto py-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-kids-lg font-black text-gray-800 dark:text-white">👧🧒 Meine Kinder</h2>
        <Link
          href="/eltern/kinder/new"
          className="bg-kidsGreen text-white rounded-kids px-4 py-2 text-kids-sm font-black shadow-[0_4px_0_#2daa7a] active:translate-y-1 transition-all"
        >
          + Hinzufügen
        </Link>
      </div>

      {loading ? (
        <div className="text-center py-8 text-4xl">⏳</div>
      ) : kinder.length === 0 ? (
        <div className="text-center py-8">
          <div className="text-5xl mb-3">👶</div>
          <p className="text-kids-sm text-gray-500 dark:text-gray-400">Noch keine Kinder angelegt.</p>
          <Link href="/eltern/kinder/new" className="mt-4 inline-block bg-kidsGreen text-white rounded-kids px-6 py-3 text-kids-sm font-black">
            Erstes Kind anlegen
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {kinder.map((k) => (
            <div key={k.id} className="bg-white dark:bg-slate-800 rounded-kids shadow-kids p-4">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-4xl">{k.avatar_emoji}</span>
                <div className="flex-1">
                  <p className="text-kids-md font-black text-gray-800 dark:text-white">{k.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Klasse {k.grade} · Level {k.level ?? 1} · {k.xp_total ?? 0} XP
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500 dark:text-gray-400">Code</p>
                  <p className="text-kids-md font-black text-kidsPurple tracking-widest">{k.login_code}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Link
                  href={`/eltern/fortschritt?kind=${k.id}`}
                  className="flex-1 text-center bg-kidsBlue/10 dark:bg-blue-900/20 text-kidsBlue dark:text-blue-400 rounded-kids py-2 text-xs font-bold"
                >
                  📊 Fortschritt
                </Link>
                <button
                  onClick={() => router.push(`/eltern/kinder/${k.id}`)}
                  className="bg-kidsYellow/20 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 rounded-kids px-3 py-2 text-xs font-bold"
                >
                  ✏️
                </button>
                <button
                  onClick={() => deleteKind(k.id, k.name)}
                  className="bg-red-50 dark:bg-red-900/20 text-red-500 rounded-kids px-3 py-2 text-xs font-bold"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Link href="/eltern" className="block text-center text-xs text-gray-400 mt-6">
        ← Zurück
      </Link>
    </div>
  );
}
