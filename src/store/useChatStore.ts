import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Friend, Message } from "@/types";

// Lokaler Typ für den Legacy-Store (nicht mehr aktiv genutzt)
interface LegacyFriendRequest {
  id: string;
  name: string;
  requestedAt: number;
}

interface ChatStore {
  friends: Friend[];
  messages: Message[];
  friendRequests: LegacyFriendRequest[];
  addFriendRequest: (name: string) => void;
  approveFriend: (id: string) => void;
  rejectFriend: (id: string) => void;

  sendMessage: (friendId: string, text: string, fromMe: boolean) => void;
  getMessages: (friendId: string) => Message[];
}

const AVATAR_COLORS = [
  "#FFD93D", "#6BCFFF", "#6EE7B7", "#C084FC", "#FB923C", "#F472B6",
];

export const useChatStore = create<ChatStore>()(
  persist(
    (set, get) => ({
      friends: [],
      messages: [],
      friendRequests: [],
      addFriendRequest: (name) =>
        set((s) => ({
          friendRequests: [
            ...s.friendRequests,
            { id: crypto.randomUUID(), name, requestedAt: Date.now() },
          ],
        })),
      approveFriend: (id) =>
        set((s) => {
          const req = s.friendRequests.find((r) => r.id === id);
          if (!req) return {};
          const color = AVATAR_COLORS[s.friends.length % AVATAR_COLORS.length];
          return {
            friendRequests: s.friendRequests.filter((r) => r.id !== id),
            friends: [
              ...s.friends,
              { id: req.id, name: req.name, avatarColor: color, approved: true },
            ],
          };
        }),
      rejectFriend: (id) =>
        set((s) => ({
          friendRequests: s.friendRequests.filter((r) => r.id !== id),
        })),
      sendMessage: (friendId, text, fromMe) =>
        set((s) => ({
          messages: [
            ...s.messages,
            {
              id: crypto.randomUUID(),
              friendId,
              text,
              fromMe,
              timestamp: Date.now(),
            },
          ],
        })),
      getMessages: (friendId) =>
        get().messages.filter((m) => m.friendId === friendId),
    }),
    { name: "kidsclub-chat" }
  )
);
