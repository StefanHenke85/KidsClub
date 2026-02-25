"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useParentAuth } from "@/hooks/useParentAuth";

export default function ElternLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { logout } = useParentAuth();
  const [checking, setChecking] = useState(true);
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    // Try to load children – if 401 we redirect to login
    fetch("/api/kinder")
      .then((r) => {
        if (r.status === 401) router.replace("/login");
        else setAuthed(true);
      })
      .catch(() => router.replace("/login"))
      .finally(() => setChecking(false));
  }, [router]);

  if (checking) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-slate-900 flex items-center justify-center">
        <div className="text-4xl animate-spin">⏳</div>
      </div>
    );
  }

  if (!authed) return null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 font-kids pb-8">
      <header className="bg-kidsPurple dark:bg-purple-900 text-white px-5 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-3xl">🔒</span>
          <h1 className="text-kids-lg font-black">Elternbereich</h1>
        </div>
        <button
          onClick={logout}
          className="bg-white text-kidsPurple font-bold px-4 py-2 rounded-kids text-sm"
        >
          Abmelden
        </button>
      </header>
      <main className="px-4 py-4">{children}</main>
    </div>
  );
}
