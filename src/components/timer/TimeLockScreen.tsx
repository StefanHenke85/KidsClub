"use client";

interface TimeLockScreenProps {
  minutesUsed: number;
  limit: number;
}

export default function TimeLockScreen({ minutesUsed, limit }: TimeLockScreenProps) {
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
      <div className="bg-slate-800 rounded-kids-lg p-6 max-w-xs w-full">
        <p className="text-4xl mb-3">🦊</p>
        <p className="text-kids-sm text-slate-300 font-bold">
          &quot;Super gemacht heute! Morgen lernst du weiter. Jetzt ist Erholungszeit!&quot;
        </p>
      </div>
      <p className="text-xs text-slate-600 mt-6">
        Eltern können das Limit in den Einstellungen anpassen.
      </p>
    </div>
  );
}
