"use client";

interface WeekDay {
  day: string;
  xp: number;
  games: number;
}

interface WeeklyChartProps {
  data: WeekDay[];
}

const DAY_LABELS: Record<string, string> = {
  "0": "So", "1": "Mo", "2": "Di", "3": "Mi", "4": "Do", "5": "Fr", "6": "Sa",
};

function getDayLabel(dateStr: string): string {
  const d = new Date(dateStr);
  return DAY_LABELS[String(d.getDay())] ?? dateStr.slice(-2);
}

export default function WeeklyChart({ data }: WeeklyChartProps) {
  const maxXp = Math.max(...data.map((d) => Number(d.xp)), 1);

  // Fill in missing days for last 7 days
  const today = new Date();
  const days: WeekDay[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const key = d.toISOString().split("T")[0];
    const found = data.find((r) => r.day === key);
    days.push(found ?? { day: key, xp: 0, games: 0 });
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-kids p-4 shadow-kids">
      <p className="text-kids-sm font-black text-gray-700 dark:text-gray-200 mb-3">
        📊 Diese Woche
      </p>
      <div className="flex items-end gap-1 h-24">
        {days.map((d) => {
          const heightPct = maxXp > 0 ? (Number(d.xp) / maxXp) * 100 : 0;
          const isToday = d.day === today.toISOString().split("T")[0];
          return (
            <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
              <div className="flex-1 w-full flex items-end">
                <div
                  className={`w-full rounded-t-sm transition-all duration-500 ${
                    isToday ? "bg-kidsYellow" : "bg-kidsBlue dark:bg-blue-600"
                  }`}
                  style={{ height: `${Math.max(heightPct, d.xp > 0 ? 5 : 0)}%` }}
                  title={`${d.xp} XP, ${d.games} Spiele`}
                />
              </div>
              <span className={`text-xs font-bold ${isToday ? "text-kidsYellow" : "text-gray-500 dark:text-gray-400"}`}>
                {getDayLabel(d.day)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
