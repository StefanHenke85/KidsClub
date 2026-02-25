"use client";

import { useState } from "react";
import PageWrapper from "@/components/layout/PageWrapper";
import KidsCard from "@/components/ui/KidsCard";
import BigButton from "@/components/ui/BigButton";
import { useChatStore } from "@/store/useChatStore";

const EMOJIS = ["😊", "😂", "❤️", "👍", "🎉", "⭐", "🦊", "🐱", "🐶", "🎮", "🍕", "⚽"];

export default function ChatPage() {
  const { friends, messages, sendMessage, addFriendRequest, getMessages } = useChatStore();
  const [activeFriend, setActiveFriend] = useState<string | null>(null);
  const [input, setInput] = useState("");
  const [newFriendName, setNewFriendName] = useState("");
  const [showEmojis, setShowEmojis] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const [addMsg, setAddMsg] = useState("");

  const activeMessages = activeFriend ? getMessages(activeFriend) : [];

  const send = async () => {
    const text = input.trim();
    if (!text || !activeFriend) return;

    const res = await fetch("/api/chat/nachrichten", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    const data = await res.json();

    if (data.blocked) {
      setBlocked(true);
      setTimeout(() => setBlocked(false), 3000);
      setInput("");
      return;
    }

    sendMessage(activeFriend, data.text, true);
    setInput("");
    setShowEmojis(false);
  };

  const requestFriend = () => {
    const name = newFriendName.trim();
    if (!name) return;
    addFriendRequest(name);
    setNewFriendName("");
    setAddMsg("Anfrage gesendet! Deine Eltern müssen sie genehmigen. 👍");
    setTimeout(() => setAddMsg(""), 3000);
  };

  const activeFriendObj = friends.find((f) => f.id === activeFriend);

  return (
    <PageWrapper emoji="💬" title="Chatten" color="bg-purple-50">
      {friends.length === 0 ? (
        /* Noch keine Freunde */
        <KidsCard className="text-center py-8">
          <p className="text-5xl mb-3">👫</p>
          <p className="text-kids-md font-bold text-gray-700 mb-2">Noch keine Freunde!</p>
          <p className="text-kids-sm text-gray-500 mb-5">
            Frag deine Eltern, damit sie Freunde genehmigen können.
          </p>
          <input
            value={newFriendName}
            onChange={(e) => setNewFriendName(e.target.value)}
            placeholder="Name deines Freundes"
            className="w-full border-4 border-kidsPurple rounded-kids px-4 py-3 text-kids-sm font-semibold outline-none mb-3"
          />
          {addMsg && <p className="text-kids-sm font-bold text-green-600 mb-2">{addMsg}</p>}
          <BigButton color="purple" onClick={requestFriend}>
            Freund hinzufügen
          </BigButton>
        </KidsCard>
      ) : !activeFriend ? (
        /* Freundesliste */
        <div className="flex flex-col gap-3">
          {friends.map((f) => {
            const lastMsg = [...messages].reverse().find((m) => m.friendId === f.id);
            return (
              <button
                key={f.id}
                onClick={() => setActiveFriend(f.id)}
                className="w-full text-left"
              >
                <KidsCard className="flex items-center gap-4 active:scale-95 transition-transform">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center font-black text-white text-xl flex-shrink-0"
                    style={{ background: f.avatarColor }}
                  >
                    {f.name[0].toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-kids-md font-black text-gray-800">{f.name}</p>
                    {lastMsg && (
                      <p className="text-sm text-gray-400 truncate">
                        {lastMsg.fromMe ? "Du: " : ""}{lastMsg.text}
                      </p>
                    )}
                  </div>
                </KidsCard>
              </button>
            );
          })}
          {/* Neuen Freund hinzufügen */}
          <div className="flex gap-2 mt-2">
            <input
              value={newFriendName}
              onChange={(e) => setNewFriendName(e.target.value)}
              placeholder="Neuen Freund hinzufügen"
              className="flex-1 border-2 border-gray-200 rounded-kids px-4 py-2 text-kids-sm font-semibold outline-none focus:border-kidsPurple"
            />
            <BigButton color="purple" size="sm" onClick={requestFriend}>+</BigButton>
          </div>
          {addMsg && <p className="text-kids-sm font-bold text-green-600">{addMsg}</p>}
        </div>
      ) : (
        /* Chat-Fenster */
        <div className="flex flex-col h-[calc(100vh-220px)]">
          <div className="flex items-center gap-3 mb-3">
            <button onClick={() => setActiveFriend(null)} className="text-2xl">‹</button>
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center font-black text-white"
              style={{ background: activeFriendObj?.avatarColor }}
            >
              {activeFriendObj?.name[0].toUpperCase()}
            </div>
            <p className="text-kids-md font-black text-gray-800">{activeFriendObj?.name}</p>
          </div>

          {/* Nachrichten */}
          <div className="flex-1 overflow-y-auto flex flex-col gap-3 mb-3">
            {activeMessages.length === 0 && (
              <p className="text-center text-kids-sm text-gray-400 py-8">
                Schreib die erste Nachricht! 😊
              </p>
            )}
            {activeMessages.map((m) => (
              <div key={m.id} className={`flex ${m.fromMe ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[75%] px-4 py-3 rounded-kids-lg text-kids-sm font-semibold ${
                    m.fromMe ? "bg-kidsPurple text-white" : "bg-white shadow-kids text-gray-800"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          {blocked && (
            <p className="text-center text-red-500 font-bold text-kids-sm mb-2">
              Diese Nachricht ist nicht erlaubt! 🚫
            </p>
          )}

          {/* Emoji-Picker */}
          {showEmojis && (
            <div className="flex flex-wrap gap-2 mb-2 bg-white rounded-kids p-3 shadow-kids">
              {EMOJIS.map((e) => (
                <button key={e} onClick={() => setInput((p) => p + e)} className="text-2xl">
                  {e}
                </button>
              ))}
            </div>
          )}

          {/* Eingabe */}
          <div className="flex gap-2">
            <button
              onClick={() => setShowEmojis((p) => !p)}
              className="text-2xl bg-white rounded-kids px-3 shadow-kids"
            >
              😊
            </button>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Schreib etwas..."
              className="flex-1 border-4 border-kidsPurple rounded-kids px-4 py-3 text-kids-sm font-semibold outline-none"
              maxLength={200}
            />
            <BigButton color="purple" size="sm" onClick={send} disabled={!input.trim()}>➤</BigButton>
          </div>
        </div>
      )}
    </PageWrapper>
  );
}
