"use client";

import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import PageWrapper from "@/components/layout/PageWrapper";
import KidsCard from "@/components/ui/KidsCard";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

interface FriendEntry {
  my_child_id: string;
  friend_id: string;
  friend_name: string;
  friend_avatar: string;
}

export default function ChatPage() {
  const router = useRouter();

  const { data, isLoading } = useQuery<{ friendships: FriendEntry[] }>({
    queryKey: ["chat-friends"],
    queryFn: async () => {
      const res = await fetch("/api/freunde");
      if (!res.ok) throw new Error("Fehler");
      return res.json();
    },
  });

  // Deduplizieren: Ein Freund kann über mehrere eigene Kinder verbunden sein
  const seen = new Set<string>();
  const friends: FriendEntry[] = [];
  for (const f of data?.friendships ?? []) {
    if (!seen.has(f.friend_id)) {
      seen.add(f.friend_id);
      friends.push(f);
    }
  }

  return (
    <PageWrapper emoji="💬" title="Chatten" color="bg-purple-50 dark:bg-slate-900" backHref="/">
      {isLoading ? (
        <LoadingSpinner text="Lädt Freunde..." />
      ) : friends.length === 0 ? (
        <KidsCard className="text-center py-10">
          <p className="text-5xl mb-3">👫</p>
          <p className="text-kids-md font-bold text-gray-700 dark:text-gray-200 mb-2">
            Noch keine Freunde!
          </p>
          <p className="text-kids-sm text-gray-500 dark:text-gray-400">
            Bitte deine Eltern, im Elternbereich einen Freund hinzuzufügen.
          </p>
        </KidsCard>
      ) : (
        <div className="flex flex-col gap-3">
          {friends.map((f) => (
            <button
              key={f.friend_id}
              type="button"
              onClick={() => router.push(`/chat/${f.friend_id}`)}
              className="w-full text-left"
            >
              <KidsCard className="flex items-center gap-4 active:scale-95 transition-transform hover:shadow-kids-hover">
                <span className="text-4xl flex-shrink-0">{f.friend_avatar}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-kids-md font-black text-gray-800 dark:text-white">
                    {f.friend_name}
                  </p>
                  <p className="text-sm text-gray-400 dark:text-gray-500">Tippe zum Chatten ›</p>
                </div>
              </KidsCard>
            </button>
          ))}
        </div>
      )}
    </PageWrapper>
  );
}
