"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import PageWrapper from "@/components/layout/PageWrapper";
import KidsCard from "@/components/ui/KidsCard";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import type { SearchResult } from "@/types";

const QUICK_SEARCHES = ["Tiere", "Dinosaurier", "Weltraum", "Ritter", "Piraten", "Natur"];

export default function SuchePage() {
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState("");

  const { data, isFetching } = useQuery({
    queryKey: ["suche", search],
    queryFn: async () => {
      const res = await fetch(`/api/suche?q=${encodeURIComponent(search)}`);
      return res.json() as Promise<{ results: SearchResult[] }>;
    },
    enabled: search.length > 1,
  });

  const doSearch = (q?: string) => {
    const term = q ?? query.trim();
    if (term) setSearch(term);
  };

  return (
    <PageWrapper emoji="🔍" title="Suchen" color="bg-yellow-50 dark:bg-slate-900" backHref="/">
      {/* Suchleiste */}
      <div className="flex gap-2 mb-4">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && doSearch()}
          placeholder="Was möchtest du wissen?"
          className="flex-1 border-4 border-kidsYellow dark:border-yellow-600 rounded-kids px-4 py-3 text-kids-sm font-semibold outline-none focus:border-kidsOrange bg-white dark:bg-slate-700 dark:text-white dark:placeholder-gray-400"
        />
        <button
          onClick={() => doSearch()}
          className="bg-kidsYellow dark:bg-yellow-600 px-5 rounded-kids font-black text-2xl shadow-[0_5px_0_#c9a800] dark:shadow-[0_5px_0_#854d0e] active:translate-y-1 transition-transform"
          aria-label="Suchen"
        >
          🔍
        </button>
      </div>

      {/* Schnellsuchen */}
      {!search && (
        <div className="mb-5">
          <p className="text-kids-sm font-bold text-gray-500 dark:text-gray-400 mb-2">Beliebte Themen:</p>
          <div className="flex gap-2 flex-wrap">
            {QUICK_SEARCHES.map((q) => (
              <button
                key={q}
                onClick={() => { setQuery(q); doSearch(q); }}
                className="bg-white dark:bg-slate-700 border-2 border-kidsYellow dark:border-yellow-600 rounded-kids px-4 py-2 text-kids-sm font-bold text-gray-700 dark:text-gray-200 hover:bg-kidsYellow dark:hover:bg-yellow-700 transition-colors"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Ergebnisse */}
      {isFetching && <LoadingSpinner text="Kiko sucht..." />}

      {!isFetching && data?.results && data.results.length > 0 && (
        <div className="flex flex-col gap-3">
          {data.results.map((r, i) => (
            <a
              key={i}
              href={r.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${r.title} – öffnet in neuem Tab`}
              className="block rounded-kids-lg bg-white dark:bg-slate-700 border-2 border-yellow-200 dark:border-yellow-700/50 shadow-md hover:shadow-lg active:scale-[0.98] transition-all focus-visible:outline-2 focus-visible:outline-kidsYellow focus-visible:outline-offset-2"
            >
              <div className="p-4 flex items-start gap-3">
                {r.favicon ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={r.favicon} alt="" aria-hidden="true" className="w-8 h-8 mt-0.5 rounded-md flex-shrink-0 object-contain bg-gray-100 dark:bg-slate-600 p-1" />
                ) : (
                  <span aria-hidden="true" className="w-8 h-8 mt-0.5 rounded-md flex-shrink-0 bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center text-base">🔗</span>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-base font-black text-kidsBlue dark:text-blue-300 leading-tight mb-1">{r.title}</p>
                  {r.snippet && (
                    <p className="text-sm text-gray-600 dark:text-gray-200 leading-snug line-clamp-2">{r.snippet}</p>
                  )}
                  <p className="text-xs text-gray-400 dark:text-gray-400 mt-1.5 truncate">{r.url}</p>
                </div>
              </div>
            </a>
          ))}
        </div>
      )}

      {!isFetching && search && data?.results?.length === 0 && (
        <KidsCard className="text-center py-8">
          <p className="text-4xl mb-3">🔎</p>
          <p className="text-kids-md font-bold text-gray-600 dark:text-gray-300">
            Nichts gefunden für &quot;{search}&quot;
          </p>
          <p className="text-kids-sm text-gray-400 dark:text-gray-500">Versuch andere Wörter!</p>
        </KidsCard>
      )}

      {/* Sicherheitshinweis */}
      <p className="text-center text-xs text-gray-400 dark:text-gray-500 mt-6 font-semibold">
        🔒 Alle Suchergebnisse sind kindgerecht gefiltert
      </p>
    </PageWrapper>
  );
}
