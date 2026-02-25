"use client";

import { useState, useRef, useEffect } from "react";
import PageWrapper from "@/components/layout/PageWrapper";
import KidsCard from "@/components/ui/KidsCard";
import BigButton from "@/components/ui/BigButton";
import type { ChatMessage } from "@/types";

const SUBJECTS = [
  { id: "mathe",     emoji: "🔢", label: "Mathe"      },
  { id: "deutsch",   emoji: "📖", label: "Deutsch"    },
  { id: "sachkunde", emoji: "🌍", label: "Sachkunde"  },
  { id: "englisch",  emoji: "🇬🇧", label: "Englisch"   },
];

export default function HausaufgabenPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [subject, setSubject] = useState("mathe");
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;

    setApiError("");
    const userMsg: ChatMessage = { role: "user", content: `[${SUBJECTS.find(s=>s.id===subject)?.label}] ${text}` };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    let res: Response;
    try {
      res = await fetch("/api/hausaufgaben", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });
    } catch {
      setMessages((prev) => [...prev, { role: "assistant", content: "Keine Verbindung. Bist du online? 🌐" }]);
      setLoading(false);
      return;
    }

    // Fehlerfall: JSON-Fehlermeldung vom Server
    if (!res.ok) {
      const errData = await res.json().catch(() => ({ error: "Unbekannter Fehler" }));
      if (res.status === 503) {
        setApiError("⚠️ Kein API-Key konfiguriert! Bitte GEMINI_API_KEY in .env.local eintragen und Server neu starten.");
      } else {
        setApiError(errData.error ?? "Serverfehler");
      }
      setMessages((prev) => [...prev, { role: "assistant", content: "Hoppla! Kiko schläft gerade. Versuch es gleich nochmal! 😴" }]);
      setLoading(false);
      return;
    }

    if (!res.body) {
      setMessages((prev) => [...prev, { role: "assistant", content: "Hoppla! Etwas hat nicht geklappt. 😊" }]);
      setLoading(false);
      return;
    }

    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let aiText = "";

    setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        aiText += decoder.decode(value, { stream: true });
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = { role: "assistant", content: aiText };
          return updated;
        });
      }
    } catch {
      // Stream unterbrochen
    }

    setLoading(false);
  };

  return (
    <PageWrapper emoji="✏️" title="Hausaufgaben" color="bg-blue-50 dark:bg-slate-900" backHref="/">
      {/* API-Key Warnung */}
      {apiError && (
        <div className="mb-3 bg-red-100 dark:bg-red-900/40 border-2 border-red-300 rounded-kids px-4 py-3 text-sm font-bold text-red-700 dark:text-red-300">
          {apiError}
        </div>
      )}

      {/* Fach wählen */}
      <div className="flex gap-2 flex-wrap mb-4">
        {SUBJECTS.map((s) => (
          <button
            key={s.id}
            onClick={() => setSubject(s.id)}
            className={`px-4 py-2 rounded-kids font-bold text-kids-sm transition-all ${
              subject === s.id
                ? "bg-kidsBlue dark:bg-blue-700 shadow-kids text-gray-800 dark:text-white"
                : "bg-white dark:bg-slate-700 text-gray-500 dark:text-gray-300 border-2 border-gray-200 dark:border-slate-600"
            }`}
          >
            {s.emoji} {s.label}
          </button>
        ))}
      </div>

      {/* Chat */}
      <KidsCard className="min-h-[350px] flex flex-col gap-3 mb-4 dark:bg-slate-800">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-40 gap-3 text-center">
            <span className="text-5xl animate-float">🦊</span>
            <p className="text-kids-sm font-bold text-gray-600 dark:text-gray-300">
              Hallo! Ich bin Kiko. Stell mir deine Frage! 😊
            </p>
          </div>
        )}
        {messages.map((m, i) => (
          <div
            key={i}
            className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
          >
            {m.role === "assistant" && (
              <span className="text-2xl mr-2 self-end">🦊</span>
            )}
            <div
              className={`max-w-[80%] px-4 py-3 rounded-kids-lg text-kids-sm font-semibold leading-relaxed ${
                m.role === "user"
                  ? "bg-kidsBlue dark:bg-blue-700 text-gray-800 dark:text-white"
                  : "bg-white dark:bg-slate-700 border-2 border-gray-100 dark:border-slate-600 text-gray-800 dark:text-gray-100"
              }`}
            >
              {m.content || (loading && i === messages.length - 1 ? "..." : "")}
            </div>
          </div>
        ))}
        {loading && messages[messages.length - 1]?.content === "" && (
          <div className="flex justify-start">
            <span className="text-2xl mr-2">🦊</span>
            <div className="bg-white dark:bg-slate-700 border-2 border-gray-100 dark:border-slate-600 px-4 py-3 rounded-kids-lg">
              <span className="animate-pulse text-kids-sm font-semibold text-gray-500 dark:text-gray-400">Kiko denkt nach...</span>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </KidsCard>

      {/* Eingabe */}
      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder={`Frage für ${SUBJECTS.find((s) => s.id === subject)?.label}...`}
          className="flex-1 border-4 border-kidsBlue dark:border-blue-600 rounded-kids px-4 py-3 text-kids-sm font-semibold outline-none focus:border-kidsPurple dark:bg-slate-700 dark:text-white dark:placeholder-gray-400"
          disabled={loading}
        />
        <BigButton color="blue" size="sm" onClick={sendMessage} disabled={loading || !input.trim()}>
          ➤
        </BigButton>
      </div>

      {messages.length > 0 && (
        <button
          onClick={() => setMessages([])}
          className="mt-3 text-sm text-gray-400 dark:text-gray-500 underline"
        >
          Neues Gespräch starten
        </button>
      )}
    </PageWrapper>
  );
}
