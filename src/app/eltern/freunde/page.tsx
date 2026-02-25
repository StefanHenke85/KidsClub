"use client";

import { useChatStore } from "@/store/useChatStore";
import KidsCard from "@/components/ui/KidsCard";
import BigButton from "@/components/ui/BigButton";

export default function FreundePage() {
  const { friendRequests, friends, approveFriend, rejectFriend } = useChatStore();

  return (
    <div className="max-w-lg mx-auto flex flex-col gap-4">
      <h2 className="text-kids-lg font-black text-gray-800">Freundschaftsanfragen</h2>

      {friendRequests.length === 0 ? (
        <KidsCard>
          <p className="text-kids-sm text-gray-500 text-center py-4">
            Keine neuen Anfragen 😊
          </p>
        </KidsCard>
      ) : (
        friendRequests.map((req) => (
          <KidsCard key={req.id} className="flex items-center gap-4">
            <span className="text-4xl">👤</span>
            <div className="flex-1">
              <p className="text-kids-md font-black">{req.name}</p>
              <p className="text-xs text-gray-400">
                {new Date(req.requestedAt).toLocaleDateString("de-DE")}
              </p>
            </div>
            <div className="flex gap-2">
              <BigButton color="green" size="sm" onClick={() => approveFriend(req.id)}>✓</BigButton>
              <BigButton color="pink" size="sm" onClick={() => rejectFriend(req.id)}>✕</BigButton>
            </div>
          </KidsCard>
        ))
      )}

      <h2 className="text-kids-lg font-black text-gray-800 mt-4">Genehmigte Freunde</h2>
      {friends.length === 0 ? (
        <KidsCard>
          <p className="text-kids-sm text-gray-500 text-center py-4">Noch keine Freunde</p>
        </KidsCard>
      ) : (
        friends.map((f) => (
          <KidsCard key={f.id} className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center font-black text-white text-lg"
              style={{ background: f.avatarColor }}
            >
              {f.name[0].toUpperCase()}
            </div>
            <p className="text-kids-md font-bold">{f.name}</p>
            <span className="ml-auto text-green-500 font-bold text-sm">✓ Genehmigt</span>
          </KidsCard>
        ))
      )}
    </div>
  );
}
