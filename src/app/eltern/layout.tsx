"use client";

import { useState } from "react";
import { useParentStore } from "@/store/useParentStore";
import PinGate from "@/components/eltern/PinGate";

export default function ElternLayout({ children }: { children: React.ReactNode }) {
  const { isParentMode, setParentMode } = useParentStore();
  const [unlocked, setUnlocked] = useState(isParentMode);

  if (!unlocked) {
    return <PinGate onSuccess={() => setUnlocked(true)} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 font-kids pb-8">
      <header className="bg-kidsPurple text-white px-5 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-3xl">🔒</span>
          <h1 className="text-kids-lg font-black">Elternbereich</h1>
        </div>
        <button
          onClick={() => { setParentMode(false); setUnlocked(false); }}
          className="bg-white text-kidsPurple font-bold px-4 py-2 rounded-kids text-sm"
        >
          Sperren
        </button>
      </header>
      <main className="px-4 py-4">{children}</main>
    </div>
  );
}
