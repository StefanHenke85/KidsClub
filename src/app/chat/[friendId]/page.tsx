"use client";

import { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import PageWrapper from "@/components/layout/PageWrapper";
import KidsCard from "@/components/ui/KidsCard";
import BigButton from "@/components/ui/BigButton";
import type { ChatMessage } from "@/types";

const EMOJIS = ["😊", "😂", "❤️", "👍", "🎉", "⭐", "🦊", "🐱", "🐶", "🎮", "🍕", "⚽"];

export default function ChatFenster() {
  const { friendId } = useParams<{ friendId: string }>();
  const qc = useQueryClient();
  const [input, setInput] = useState("");
  const [showEmojis, setShowEmojis] = useState(false);
  const [blockedMsg, setBlockedMsg] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Freundname aus der Freundesliste holen
  const { data: friendsData } = useQuery<{ friendships: { friend_id: string; friend_name: string; friend_avatar: string }[] }>({
    queryKey: ["chat-friends"],
    queryFn: async () => {
      const res = await fetch("/api/freunde");
      if (!res.ok) throw new Error("Fehler");
      return res.json();
    },
    staleTime: 60_000,
  });

  const friendInfo = friendsData?.friendships?.find((f) => f.friend_id === friendId);

  // Nachrichten laden (polling alle 5s)
  const { data: msgData } = useQuery<{ messages: ChatMessage[] }>({
    queryKey: ["messages", friendId],
    queryFn: async () => {
      const res = await fetch(`/api/nachrichten?with=${friendId}`);
      if (!res.ok) throw new Error("Fehler");
      return res.json();
    },
    refetchInterval: 5000,
  });

  const messages = msgData?.messages ?? [];

  // Auto-scroll ans Ende
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  const sendMsg = useMutation({
    mutationFn: async (text: string) => {
      const res = await fetch("/api/nachrichten", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ toChildId: friendId, text }),
      });
      return res.json();
    },
    onSuccess: (data) => {
      if (data.blocked) {
        setBlockedMsg(true);
        setTimeout(() => setBlockedMsg(false), 3000);
      } else {
        qc.invalidateQueries({ queryKey: ["messages", friendId] });
      }
    },
  });

  const send = () => {
    const text = input.trim();
    if (!text) return;
    setInput("");
    setShowEmojis(false);
    sendMsg.mutate(text);
  };

  return (
    <PageWrapper
      emoji="💬"
      title={friendInfo ? `${friendInfo.friend_avatar} ${friendInfo.friend_name}` : "Chat"}
      color="bg-purple-50 dark:bg-slate-900"
      backHref="/chat"
    >
      <div className="flex flex-col h-[calc(100vh-220px)]">
        {/* Nachrichten */}
        <div className="flex-1 overflow-y-auto flex flex-col gap-3 mb-3 pr-1">
          {messages.length === 0 && (
            <KidsCard className="text-center py-8">
              <p className="text-4xl mb-2">👋</p>
              <p className="text-kids-sm text-gray-500 dark:text-gray-400">
                Schreib die erste Nachricht an {friendInfo?.friend_name ?? "deinen Freund"}!
              </p>
            </KidsCard>
          )}
          {messages.map((m) => (
            <div key={m.id} className={`flex ${m.fromMe ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[75%] px-4 py-3 rounded-2xl text-kids-sm font-semibold break-words select-none ${
                  m.fromMe
                    ? "bg-kidsPurple text-white rounded-br-sm"
                    : "bg-white dark:bg-slate-700 shadow-kids text-gray-800 dark:text-white rounded-bl-sm"
                }`}
                onCopy={(e) => e.preventDefault()}
                onCut={(e) => e.preventDefault()}
                onContextMenu={(e) => e.preventDefault()}
              >
                {m.text}
                <p className={`text-xs mt-1 ${m.fromMe ? "text-purple-200" : "text-gray-400"}`}>
                  {new Date(m.createdAt).toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" })}
                </p>
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Geblockte Nachricht */}
        {blockedMsg && (
          <p className="text-center text-red-500 font-bold text-kids-sm mb-2 animate-bounce">
            Diese Nachricht ist nicht erlaubt! 🚫
          </p>
        )}

        {/* Emoji-Picker */}
        {showEmojis && (
          <div className="flex flex-wrap gap-2 mb-2 bg-white dark:bg-slate-700 rounded-kids p-3 shadow-kids">
            {EMOJIS.map((e) => (
              <button
                key={e}
                type="button"
                onClick={() => setInput((p) => p + e)}
                className="text-2xl hover:scale-110 transition-transform"
              >
                {e}
              </button>
            ))}
          </div>
        )}

        {/* Eingabe */}
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setShowEmojis((p) => !p)}
            className="text-2xl bg-white dark:bg-slate-700 rounded-kids px-3 shadow-kids"
            aria-label="Emojis"
          >
            😊
          </button>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder="Schreib etwas..."
            maxLength={200}
            className="flex-1 border-4 border-kidsPurple dark:border-purple-700 rounded-kids px-4 py-3 text-kids-sm font-semibold outline-none bg-white dark:bg-slate-700 dark:text-white"
          />
          <BigButton color="purple" size="sm" onClick={send} disabled={!input.trim() || sendMsg.isPending}>
            ➤
          </BigButton>
        </div>
      </div>
    </PageWrapper>
  );
}
