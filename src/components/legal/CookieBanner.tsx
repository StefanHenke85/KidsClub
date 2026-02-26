"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const STORAGE_KEY = "kidsclub_cookie_ok";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      setVisible(true);
    }
  }, []);

  const accept = () => {
    localStorage.setItem(STORAGE_KEY, "1");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-20 left-3 right-3 z-[200] sm:left-auto sm:right-4 sm:max-w-sm animate-slide-up">
      <div className="bg-white dark:bg-slate-800 rounded-kids-xl p-4 shadow-[0_8px_0_rgba(167,139,250,0.25),0_12px_32px_rgba(0,0,0,0.12)] border-2 border-purple-200 dark:border-slate-600">
        {/* Emoji Deko */}
        <div className="flex items-start gap-3 mb-3">
          <span className="text-3xl leading-none animate-wobble">🍪</span>
          <div>
            <p className="font-black text-gray-700 dark:text-gray-100 text-sm leading-snug">
              Wir nutzen Cookies
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 leading-relaxed">
              Nur technisch notwendige Cookies – kein Tracking, keine Werbung.{" "}
              <Link href="/datenschutz" className="text-kidsPurple underline underline-offset-2 font-semibold">
                Datenschutz
              </Link>
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={accept}
          className="w-full bg-kidsPurple text-white font-black text-sm rounded-kids py-2.5 shadow-[0_4px_0_#6d28d9] active:translate-y-1 active:shadow-[0_1px_0_#6d28d9] transition-all hover:brightness-105"
        >
          Verstanden & OK! 🎉
        </button>
      </div>
    </div>
  );
}
