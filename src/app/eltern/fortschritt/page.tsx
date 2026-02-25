"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import XpBar from "@/components/progress/XpBar";
import BadgeGrid from "@/components/progress/BadgeGrid";
import StreakDisplay from "@/components/progress/StreakDisplay";
import WeeklyChart from "@/components/progress/WeeklyChart";
import type { DashboardData } from "@/types";

export default function FortschrittPage() {
  const params = useSearchParams();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [children, setChildren] = useState<{ id: string; name: string; avatar_emoji: string }[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(params.get("kind"));

  useEffect(() => {
    fetch("/api/kinder").then((r) => r.json()).then((d) => {
      setChildren(d.children ?? []);
      if (!selectedId && d.children?.[0]) setSelectedId(d.children[0].id);
    });
  }, [selectedId]);

  useEffect(() => {
    if (!selectedId) return;
    setLoading(true);
    fetch(`/api/progress/dashboard?childId=${selectedId}`)
      .then((r) => r.json())
      .then((d) => setData(d))
      .finally(() => setLoading(false));
  }, [selectedId]);

  return (
    <div className="max-w-lg mx-auto py-4">
      <h2 className="text-kids-lg font-black text-gray-800 dark:text-white mb-4">📊 Lernfortschritt</h2>

      {/* Child selector */}
      {children.length > 1 && (
        <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
          {children.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedId(c.id)}
              className={`flex-shrink-0 flex items-center gap-2 rounded-kids px-3 py-2 text-xs font-bold transition-all ${
                selectedId === c.id
                  ? "bg-kidsPurple text-white"
                  : "bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300"
              }`}
            >
              <span>{c.avatar_emoji}</span>
              <span>{c.name}</span>
            </button>
          ))}
        </div>
      )}

      {loading ? (
        <div className="text-center py-12 text-4xl">⏳</div>
      ) : !data ? (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">Keine Daten verfügbar.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {/* Header card */}
          <div className="bg-white dark:bg-slate-800 rounded-kids-lg shadow-kids p-4">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-4xl">{data.child.avatarEmoji}</span>
              <div>
                <p className="text-kids-lg font-black text-gray-800 dark:text-white">{data.child.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Klasse {data.child.grade} · {data.todayMinutes}/{data.child.dailyLimitMinutes} Min heute
                </p>
              </div>
            </div>
            <XpBar xpTotal={data.progress.xpTotal} level={data.progress.level} />
          </div>

          {/* Streak + Weekly */}
          <div className="grid grid-cols-2 gap-4">
            <StreakDisplay streak={data.progress.streakDays} />
            <div className="bg-white dark:bg-slate-800 rounded-kids shadow-kids p-3 text-center">
              <div className="text-3xl mb-1">⏱️</div>
              <p className="text-kids-lg font-black text-kidsBlue">{data.todayMinutes}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Min heute</p>
              <p className="text-xs text-gray-400 mt-1">
                Limit: {data.child.dailyLimitMinutes} Min
              </p>
            </div>
          </div>

          {/* Weekly Chart */}
          <WeeklyChart data={data.weekSessions} />

          {/* Badges */}
          <div className="bg-white dark:bg-slate-800 rounded-kids-lg shadow-kids p-4">
            <p className="text-kids-sm font-black text-gray-700 dark:text-gray-200 mb-3">
              🏅 Abzeichen ({data.badges.length}/{15})
            </p>
            <BadgeGrid earned={data.badges} showAll />
          </div>

          {/* Login code reminder */}
          <div className="bg-kidsPurple/10 dark:bg-purple-900/20 rounded-kids p-3 text-center">
            <p className="text-xs text-gray-600 dark:text-gray-400">
              Login-Code von {data.child.name}:
              <span className="font-black text-kidsPurple dark:text-purple-400 ml-2 tracking-widest text-kids-sm">
                {data.child.loginCode}
              </span>
            </p>
          </div>
        </div>
      )}

      <Link href="/eltern" className="block text-center text-xs text-gray-400 mt-6">
        ← Zurück
      </Link>
    </div>
  );
}
