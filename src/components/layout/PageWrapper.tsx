"use client";

import { ReactNode } from "react";
import { useRouter } from "next/navigation";

interface PageWrapperProps {
  children: ReactNode;
  title?: string;
  emoji?: string;
  color?: string;
  backHref?: string;
}

export default function PageWrapper({
  children,
  title,
  emoji,
  color = "bg-kidsBg dark:bg-slate-900",
  backHref,
}: PageWrapperProps) {
  const router = useRouter();

  return (
    <main className={`min-h-screen ${color} pb-24 font-kids transition-colors duration-300`}>
      <header className="px-4 pt-6 pb-2">
        <button
          type="button"
          onClick={() => (backHref ? router.push(backHref) : router.back())}
          className="flex items-center gap-1 text-kids-sm font-bold text-gray-500 dark:text-gray-400 mb-3"
        >
          <span className="text-xl leading-none">‹</span> Zurück
        </button>
        {(title || emoji) && (
          <h1 className="text-kids-xl font-black text-gray-800 dark:text-gray-100 flex items-center gap-3">
            {emoji && <span>{emoji}</span>}
            {title}
          </h1>
        )}
      </header>
      <div className="px-4 py-2">{children}</div>
    </main>
  );
}
